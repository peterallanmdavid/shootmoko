/*!
 * Angular Material Design
 * WIP Banner
 */
 'use strict';

(function(){
angular.module('ngMaterial', [ 'ng', 'ngAnimate', 'material.services.attrBind', 'material.services.compiler', 'material.services.popup', 'material.services.position', 'material.services.registry', 'material.services.throttle', "material.components.backdrop","material.components.button","material.components.card","material.components.checkbox","material.components.content","material.components.dialog","material.components.form","material.components.icon","material.components.list","material.components.radioButton","material.components.scrollHeader","material.components.sidenav","material.components.slider","material.components.tabs","material.components.toast","material.components.toolbar","material.components.whiteframe"]);
/**
 * @ngdoc module
 * @name material.components.animate
 * @description
 *
 * Ink and Popup Effects
 */
angular.module('material.animations', [
  'ngAnimateStylers', 
  'ngAnimateSequence', 
  'material.services.position',
  'material.services.throttle'
])
  .service('$materialEffects', [ 
    '$animateSequence', 
    '$ripple', 
    '$rootElement', 
    '$position', 
    '$$rAF', 
    MaterialEffects
  ])
  .directive('materialRipple', [
    '$materialEffects', 
    '$interpolate', 
    '$throttle', 
    MaterialRippleDirective
  ]);

/**
 * @ngdoc service
 * @name $materialEffects
 * @module material.components.animate
 *
 * @description
 * The `$materialEffects` service provides a simple API for various
 * Material Design effects:
 *
 * 1) to animate ink bars and ripple effects, and
 * 2) to perform popup open/close effects on any DOM element.
 *
 * @returns A `$materialEffects` object with the following properties:
 * - `{function(canvas,options)}` `inkRipple` - Renders ripple ink
 * waves on the specified canvas
 * - `{function(element,styles,duration)}` `inkBar` - starts ink bar
 * animation on specified DOM element
 * - `{function(element,parentElement,clickElement)}` `popIn` - animated show of element overlayed on parent element
 * - `{function(element,parentElement)}` `popOut` - animated close of popup overlay
 *
 */
function MaterialEffects($animateSequence, $ripple, $rootElement, $position, $$rAF) {


  var styler = angular.isDefined( $rootElement[0].animate ) ? 'webAnimations' :
               angular.isDefined( window['TweenMax'] || window['TweenLite'] ) ? 'gsap'   :
               angular.isDefined( window['jQuery'] ) ? 'jQuery' : 'default';
               
  // Publish API for effects...

  return {
    inkRipple: animateInkRipple,
    inkBar: animateInkBar,
    popIn: popIn,
    popOut: popOut
  };

  // **********************************************************
  // API Methods
  // **********************************************************

  /**
   * Use the canvas animator to render the ripple effect(s).
   */
  function animateInkRipple( canvas, options )
  {    
    return new $ripple(canvas, options);
  }


  /**
   * Make instance of a reusable sequence and
   * auto-run the sequence on the element (if defined)
   */
  function animateInkBar(element, styles, duration ) {
    var animate = $animateSequence({ styler: styler }).animate,
      sequence = animate( {}, styles, safeDuration(duration || 350) );

    return angular.isDefined(element) ? sequence.run(element) : sequence;
  }


  /**
   *
   */
  function popIn(element, parentElement, clickElement) {
    var startPos;
    var endPos = $position.positionElements(parentElement, element, 'center');
    if (clickElement) {
      var dialogPos = $position.position(element);
      var clickPos = $position.offset(clickElement);
      startPos = {
        left: clickPos.left - dialogPos.width / 2,
        top: clickPos.top - dialogPos.height / 2
      };
    } else {
      startPos = endPos;
    }

    element.css({
      '-webkit-transform': translateString(startPos.left, startPos.top, 0) + ' scale(0.2)',
      opacity: 0
    });
    
    // TODO once ngAnimateSequence bugs are fixed, this can be switched to use that
    $$rAF(function() {
      element.css({
        '-webkit-transform': '',
        opacity: ''
      });
      element.addClass('active');
    });
  }

  /**
   *
   *
   */
  function popOut(element, parentElement) {
    var endPos = $position.positionElements(parentElement, element, 'bottom-center');

    element.addClass('dialog-changing').css({
      '-webkit-transform': translateString(endPos.left, endPos.top, 0) + ' scale(0.5)',
      opacity: 0
    });
  }


  // **********************************************************
  // Utility Methods
  // **********************************************************


  function translateString(x, y, z) {
    return 'translate3d(' + Math.floor(x) + 'px,' + Math.floor(y) + 'px,' + Math.floor(z) + 'px)';
  }


  /**
   * Support values such as 0.65 secs or 650 msecs
   */
  function safeDuration(value) {
    var duration = isNaN(value) ? 0 : Number(value);
    return (duration < 1.0) ? (duration * 1000) : duration;
  }

  /**
   * Convert all values to decimal;
   * eg 150 msecs -> 0.15sec
   */
  function safeVelocity(value) {
    var duration = isNaN(value) ? 0 : Number(value);
    return (duration > 100) ? (duration / 1000) :
      (duration > 10 ) ? (duration / 100) :
        (duration > 1  ) ? (duration / 10) : duration;
  }

}

/**
 * @ngdoc directive
 * @name materialRipple
 * @module material.components.animate
 *
 * @restrict E
 *
 * @description
 * The `<material-ripple/>` directive implements the Material Design ripple ink effects within a specified
 * parent container.
 *
 * @param {string=} start Indicates where the wave ripples should originate in the parent container area.
 * 'center' will force the ripples to always originate in the horizontal and vertical.
 * @param {number=} initial-opacity Value indicates the initial opacity of each ripple wave
 * @param {number=} opacity-decay-velocity Value indicates the speed at which each wave will fade out
 *
 * @usage
 * ```
 * <hljs lang="html">
 *   <material-ripple initial-opacity="0.9" opacity-decay-velocity="0.89"></material-ripple>
 * </hljs>
 * ```
 */
function MaterialRippleDirective($materialEffects, $interpolate, $throttle) {
  return {
    restrict: 'E',
    compile: compileWithCanvas
  };

  /**
   * Use Javascript and Canvas to render ripple effects
   *
   * Note: attribute start="" has two (2) options: `center` || `pointer`; which
   * defines the start of the ripple center.
   *
   * @param element
   * @returns {Function}
   */
  function compileWithCanvas( element, attrs ) {
    var RIGHT_BUTTON = 2;
    var options  = calculateOptions(element, attrs);
    var tag =
      '<canvas ' +
        'class="material-ink-ripple {{classList}}"' +
        'style="top:{{top}}; left:{{left}}" >' +
      '</canvas>';

    element.replaceWith(
      angular.element( $interpolate(tag)(options) )
    );

    return function linkCanvas( scope, element ){

      var ripple, watchMouse,
          parent = element.parent(),
          makeRipple = $throttle({
            start : function() {
              ripple = ripple || $materialEffects.inkRipple( element[0], options );
              watchMouse = watchMouse || buildMouseWatcher(parent, makeRipple);

              // Ripples start with left mouseDowns (or taps)
              parent.on('mousedown', makeRipple);
            },
            throttle : function(e, done) {
              if ( effectAllowed() )
              {
                switch(e.type)
                {
                  case 'mousedown' :
                    // If not right- or ctrl-click...
                    if (!e.ctrlKey && (e.button !== RIGHT_BUTTON))
                    {
                      watchMouse(true);
                      ripple.createAt( options.forceToCenter ? null : localToCanvas(e) );
                    }
                    break;

                  default:
                    watchMouse(false);

                    // Draw of each wave/ripple in the ink only occurs
                    // on mouseup/mouseleave

                    ripple.draw( done );
                    break;
                }
              } else {
                done();
              }
            },
            end : function() {
              watchMouse(false);
            }
          })();


      // **********************************************************
      // Utility Methods
      // **********************************************************

      /**
       * If the ripple canvas been removed from the DOM, then remove the `mousedown` listener.
       * If the ripple parent is disabled, then simply ignore the mousedown event.
       * NOTE: first check the `scope` for disabled flags, then check the parent element
       * for a disabled attribute.
       *
       * @returns {*|boolean}
       */
      function effectAllowed() {
        var scope = element.scope();
        return hasInkFlag(scope) ? isInkEnabled(scope) : !hasDisabledParent(element);

        /**
         * Does the element's scope chain have a `disabled` attribute ?
         */
        function hasInkFlag(scope) {
          return scope ? (angular.isDefined(scope.disabled) || angular.isDefined(scope.inkEnabled)) : false;
        }

        /**
         * Determine the value of the scope.disabled attribute
         */
        function isInkEnabled(scope) {
          return angular.isDefined(scope.disabled)   ? !scope.disabled :
                 angular.isDefined(scope.inkEnabled) ? scope.inkEnabled : true;
        }

        /**
         * Ignore the scope chain and check the element's parent attribute for a
         * `disabled` attribute (value of attribute is **ignored**).
         */
        function hasDisabledParent(element){
          return !!element.parent()[0].attributes.getNamedItem('disabled');
        }
      }

      /**
       * Build mouse event listeners for the specified element
       * @param element Angular element that will listen for bubbling mouseEvents
       * @param handlerFn Function to be invoked with the mouse event
       * @returns {Function}
       */
      function buildMouseWatcher(element, handlerFn) {
        // Return function to easily toggle on/off listeners
        return function watchMouse(active) {
          angular.forEach("mouseup,mouseleave".split(","), function(eventType) {
            var fn = active ? element.on : element.off;
            fn.apply(element, [eventType, handlerFn]);
          });
        }
      }
      /**
       * Convert the mouse down coordinates from `parent` relative
       * to `canvas` relative; needed since the event listener is on
       * the parent [e.g. tab element]
       */
      function localToCanvas(e)
      {
        var canvas = element[0].getBoundingClientRect();

        return  {
          x : e.clientX - canvas.left,
          y : e.clientY - canvas.top
        };
      }

    }

    function calculateOptions(element, attrs)
    {
      return angular.extend( getBounds(element), {
        classList : (attrs.class || ""),
        forceToCenter : (attrs.start == "center"),
        initialOpacity : getFloatValue( attrs, "initialOpacity" ),
        opacityDecayVelocity : getFloatValue( attrs, "opacityDecayVelocity" )
      });

      function getBounds(element) {
        var node = element[0];
        var styles  =  node.ownerDocument.defaultView.getComputedStyle( node, null ) || { };

        return  {
          left : (styles.left == "auto" || !styles.left) ? "0px" : styles.left,
          top : (styles.top == "auto" || !styles.top) ? "0px" : styles.top,
          width : getValue( styles, "width" ),
          height : getValue( styles, "height" )
        };
      }

      function getFloatValue( map, key, defaultVal )
      {
        return angular.isDefined( map[key] ) ? +map[key] : defaultVal;
      }

      function getValue( map, key, defaultVal )
      {
        var val = map[key];
        return (angular.isDefined( val ) && (val !== ""))  ? map[key] : defaultVal;
      }
    }

  }



}

angular.module('material.animations')
  .service('$ripple', [
    '$$rAF', 
    MaterialRippleService
  ]);
/**
 * Port of the Polymer Paper-Ripple code
 * This service returns a reference to the Ripple class
 *
 * @group Paper Elements
 * @element paper-ripple
 * @homepage github.io
 */

function MaterialRippleService($$rAF) {
  var now = Date.now;

  if (window.performance && performance.now) {
    now = performance.now.bind(performance);
  }

  /**
   * Unlike angular.extend() will always overwrites destination,
   * mixin() only overwrites the destination if it is undefined; so
   * pre-existing destination values are **not** modified.
   */
  var mixin = function (dst) {
    angular.forEach(arguments, function(obj) {
      if (obj !== dst) {
        angular.forEach(obj, function(value, key) {
          // Only mixin if destination value is undefined
          if ( angular.isUndefined(dst[key]) )
            {
              dst[key] = value;
            }
        });
      }
    });
    return dst;
  };

  // **********************************************************
  // Ripple Class
  // **********************************************************

  return (function(){

    /**
     *  Ripple creates a `paper-ripple` which is a visual effect that other quantum paper elements can
     *  use to simulate a rippling effect emanating from the point of contact.  The
     *  effect can be visualized as a concentric circle with motion.
     */
    function Ripple(canvas, options) {

      this.canvas = canvas;
      this.waves = [];
      this.cAF = undefined;

      return angular.extend(this, mixin(options || { }, {
        onComplete: angular.noop,   // Completion hander/callback
        initialOpacity: 0.6,        // The initial default opacity set on the wave.
        opacityDecayVelocity: 1.7,  // How fast (opacity per second) the wave fades out.
        backgroundFill: true,
        pixelDensity: 1
      }));
    }

    /**
     *  Define class methods
     */
    Ripple.prototype = {

      /**
       *
       */
      createAt : function (startAt) {
        var canvas = this.adjustBounds(this.canvas);
        var width = canvas.width / this.pixelDensity;
        var height = canvas.height / this.pixelDensity;
        var recenter = this.canvas.classList.contains("recenteringTouch");

        // Auto center ripple if startAt is not defined...
        startAt = startAt || { x: Math.round(width / 2), y: Math.round(height / 2) };

        this.waves.push( createWave(canvas, width, height, startAt, recenter ) );
        this.cancelled = false;

        this.animate();
      },

      /**
       *
       */
      draw : function (done) {
        this.onComplete = done;

        for (var i = 0; i < this.waves.length; i++) {
          // Declare the next wave that has mouse down to be mouse'ed up.
          var wave = this.waves[i];
          if (wave.isMouseDown) {
            wave.isMouseDown = false
            wave.mouseDownStart = 0;
            wave.tUp = 0.0;
            wave.mouseUpStart = now();
            break;
          }
        }
        this.animate();
      },

      /**
       *
       */
      cancel : function () {
        this.cancelled = true;
        return this;
      },

      /**
       *  Stop or start rendering waves for the next animation frame
       */
      animate : function (active) {
        if (angular.isUndefined(active)) active = true;

        if (active === false) {
          if (angular.isDefined(this.cAF)) {
            this._loop = null;
            this.cAF();

            // Notify listeners [via callback] of animation completion
            this.onComplete();
          }
        } else {
          if (!this._loop) {
            this._loop = angular.bind(this, function () {
              var ctx = this.canvas.getContext('2d');
              ctx.scale(this.pixelDensity, this.pixelDensity);

              this.onAnimateFrame(ctx);
            });
          }
          this.cAF = $$rAF(this._loop);
        }
      },

      /**
       *
       */
      onAnimateFrame : function (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var deleteTheseWaves = [];
        // wave animation values
        var anim = {
          initialOpacity: this.initialOpacity,
          opacityDecayVelocity: this.opacityDecayVelocity,
          height: ctx.canvas.height,
          width: ctx.canvas.width
        };

        for (var i = 0; i < this.waves.length; i++) {
          var wave = this.waves[i];

          if ( !this.cancelled ) {

            if (wave.mouseDownStart > 0) {
              wave.tDown =  now() - wave.mouseDownStart;
            }
            if (wave.mouseUpStart > 0) {
              wave.tUp = now() - wave.mouseUpStart;
            }

            // Obtain the instantaneous size and alpha of the ripple.
            // Determine whether there is any more rendering to be done.

            var radius = waveRadiusFn(wave.tDown, wave.tUp, anim);
            var maximumWave = waveAtMaximum(wave, radius, anim);
            var waveDissipated = waveDidFinish(wave, radius, anim);
            var shouldKeepWave = !waveDissipated || !maximumWave;

            if (!shouldKeepWave) {

              deleteTheseWaves.push(wave);

            } else {


              drawWave( wave, angular.extend( anim, {
                radius : radius,
                backgroundFill : this.backgroundFill,
                ctx : ctx
              }));

            }
          }
        }

        if ( this.cancelled ) {
          // Clear all waves...
          deleteTheseWaves = deleteTheseWaves.concat( this.waves );
        }
        for (var i = 0; i < deleteTheseWaves.length; ++i) {
          removeWave( deleteTheseWaves[i], this.waves );
        }

        if (!this.waves.length) {
          // If there is nothing to draw, clear any drawn waves now because
          // we're not going to get another requestAnimationFrame any more.
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          // stop animations
          this.animate(false);

        } else if (!waveDissipated && !maximumWave) {
          this.animate();
        }

        return this;
      },

      /**
       *
       */
      adjustBounds : function (canvas) {
        // Default to parent container to define bounds
        var self = this,
        src = canvas.parentNode.getBoundingClientRect(),  // read-only
        bounds = { width: src.width, height: src.height };

        angular.forEach("width height".split(" "), function (style) {
          var value = (self[style] != "auto") ? self[style] : undefined;

          // Allow CSS to explicitly define bounds (instead of parent container
          if (angular.isDefined(value)) {
            bounds[style] = sanitizePosition(value);
            canvas.setAttribute(style, bounds[style] * self.pixelDensity + "px");
          }

        });

        // NOTE: Modified from polymer implementation
        canvas.setAttribute('width', bounds.width * this.pixelDensity + "px");
        canvas.setAttribute('height', bounds.height * this.pixelDensity + "px");

        function sanitizePosition(style) {
          var val = style.replace('px', '');
          return val;
        }

        return canvas;
      }

    };

    // Return class reference

    return Ripple;
  })();




  // **********************************************************
  // Private Wave Methods
  // **********************************************************

  /**
   *
   */
  function waveRadiusFn(touchDownMs, touchUpMs, anim) {
    // Convert from ms to s.
    var waveMaxRadius = 150;
    var touchDown = touchDownMs / 1000;
    var touchUp = touchUpMs / 1000;
    var totalElapsed = touchDown + touchUp;
    var ww = anim.width, hh = anim.height;
    // use diagonal size of container to avoid floating point math sadness
    var waveRadius = Math.min(Math.sqrt(ww * ww + hh * hh), waveMaxRadius) * 1.1 + 5;
    var duration = 1.1 - .2 * (waveRadius / waveMaxRadius);
    var tt = (totalElapsed / duration);

    var size = waveRadius * (1 - Math.pow(80, -tt));
    return Math.abs(size);
  }

  /**
   *
   */
  function waveOpacityFn(td, tu, anim) {
    // Convert from ms to s.
    var touchDown = td / 1000;
    var touchUp = tu / 1000;

    return (tu <= 0) ? anim.initialOpacity : Math.max(0, anim.initialOpacity - touchUp * anim.opacityDecayVelocity);
  }

  /**
   *
   */
  function waveOuterOpacityFn(td, tu, anim) {
    // Convert from ms to s.
    var touchDown = td / 1000;
    var touchUp = tu / 1000;

    // Linear increase in background opacity, capped at the opacity
    // of the wavefront (waveOpacity).
    var outerOpacity = touchDown * 0.3;
    var waveOpacity = waveOpacityFn(td, tu, anim);
    return Math.max(0, Math.min(outerOpacity, waveOpacity));
  }


  /**
   * Determines whether the wave should be completely removed.
   */
  function waveDidFinish(wave, radius, anim) {
    var waveMaxRadius = 150;
    var waveOpacity = waveOpacityFn(wave.tDown, wave.tUp, anim);
    // If the wave opacity is 0 and the radius exceeds the bounds
    // of the element, then this is finished.
    if (waveOpacity < 0.01 && radius >= Math.min(wave.maxRadius, waveMaxRadius)) {
      return true;
    }
    return false;
  };

  /**
   *
   */
  function waveAtMaximum(wave, radius, anim) {
    var waveMaxRadius = 150;
    var waveOpacity = waveOpacityFn(wave.tDown, wave.tUp, anim);
    if (waveOpacity >= anim.initialOpacity && radius >= Math.min(wave.maxRadius, waveMaxRadius)) {
      return true;
    }
    return false;
  }

  /**
   *  Wave is created on mouseDown
   */
  function createWave(elem, width, height, startAt, recenter ) {
    var wave = {
      startPosition : startAt,
      containerSize : Math.max(width, height),
      waveColor: window.getComputedStyle(elem).color,
      maxRadius : distanceFromPointToFurthestCorner(startAt, {w: width, h: height}) * 0.75,

      isMouseDown : true,
      mouseDownStart : now(),
      mouseUpStart : 0.0,

      tDown : 0.0,
      tUp : 0.0
    };

    if ( recenter ) {
      wave.endPosition = {x: width / 2, y: height / 2};
      wave.slideDistance = dist(wave.startPosition, wave.endPosition);
    }

    return wave;
  }

  /**
   *
   */
  function removeWave(wave, buffer) {
    if (buffer && buffer.length) {
      var pos = buffer.indexOf(wave);
      buffer.splice(pos, 1);
    }
  }

  function drawWave ( wave, anim ) {

    // Calculate waveColor and alphas; if we do a background
    // fill fade too, work out the correct color.

    anim.waveColor = cssColorWithAlpha(
      wave.waveColor,
      waveOpacityFn(wave.tDown, wave.tUp, anim)
    );

    if ( anim.backgroundFill ) {
      anim.backgroundFill = cssColorWithAlpha(
        wave.waveColor,
        waveOuterOpacityFn(wave.tDown, wave.tUp, anim)
      );
    }

    // Position of the ripple.
    var x = wave.startPosition.x;
    var y = wave.startPosition.y;

    // Ripple gravitational pull to the center of the canvas.
    if ( wave.endPosition ) {

      // This translates from the origin to the center of the view  based on the max dimension of
      var translateFraction = Math.min(1, anim.radius / wave.containerSize * 2 / Math.sqrt(2));

      x += translateFraction * (wave.endPosition.x - wave.startPosition.x);
      y += translateFraction * (wave.endPosition.y - wave.startPosition.y);
    }

    // Draw the ripple.
    renderRipple(anim.ctx, x, y, anim.radius, anim.waveColor, anim.backgroundFill);

    // Render the ripple on the target canvas 2-D context
    function renderRipple(ctx, x, y, radius, innerColor, outerColor) {
      if (outerColor) {
        ctx.fillStyle = outerColor || 'rgba(252, 252, 158, 1.0)';
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
      }
      ctx.beginPath();

      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = innerColor || 'rgba(252, 252, 158, 1.0)';
      ctx.fill();

      ctx.closePath();
    }
  }


  /**
   *
   */
  function cssColorWithAlpha(cssColor, alpha) {
    var parts = cssColor ? cssColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/) : null;
    if (typeof alpha == 'undefined') {
      alpha = 1;
    }
    if (!parts) {
      return 'rgba(255, 255, 255, ' + alpha + ')';
    }
    return 'rgba(' + parts[1] + ', ' + parts[2] + ', ' + parts[3] + ', ' + alpha + ')';
  }

  /**
   *
   */
  function dist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  /**
   *
   */
  function distanceFromPointToFurthestCorner(point, size) {
    var tl_d = dist(point, {x: 0, y: 0});
    var tr_d = dist(point, {x: size.w, y: 0});
    var bl_d = dist(point, {x: 0, y: size.h});
    var br_d = dist(point, {x: size.w, y: size.h});
    return Math.max(tl_d, tr_d, bl_d, br_d);
  }

}

/**
 * @ngdoc module
 * @name material.components.backdrop
 * @description
 * Backdrop is a masking layer used behind modal elements
 *
 */
angular.module('material.components.backdrop', [
  'material.services.popup'
])
  .service('$materialBackdrop', [
    '$materialPopup',
    '$timeout',
    '$rootElement',
    MaterialBackdropService
  ]);

/**
 * @ngdoc service
 * @name $materialBackdrop
 * @module material.components.backdrop
 * @description
 * Backdrop service to popup an masking layer overlaying the specified target element
 * or fallback $rootElement.
 *
 *  @param {integer=} selected Index of the active/selected tab
 */
function MaterialBackdropService($materialPopup, $timeout, $rootElement) {

  return function showBackdrop(options, clickFn) {
    var appendTo = options.appendTo || $rootElement;
    var opaque = options.opaque;

    return $materialPopup({
      template: '<material-backdrop class="ng-enter">',
      appendTo: appendTo
    }).then( function(backdrop) {
      clickFn && backdrop.element.on('click', function(ev) {
        $timeout(function() {
          clickFn(ev);
        });
      });
      opaque && backdrop.element.addClass('opaque');

      return backdrop;
    });
  };
}

/**
 * @ngdoc module
 * @name material.components.buttons
 * @description
 *
 * Button
 */
angular.module('material.components.button', [
  'material.animations',
])
  .directive('materialButton', [
    MaterialButtonDirective
  ]);

/**
 * @ngdoc directive
 * @name materialButton
 * @order 0
 *
 * @restrict E
 *
 * @description
 * `<material-button type="" disabled noink>` is a button directive with optional ink ripples (default enabled).
 *
 * @param {boolean=} noink Flag indicates use of ripple ink effects
 * @param {boolean=} disabled Flag indicates if the tab is disabled: not selectable with no ink effects
 * @param {string=} type Optional attribute to specific button types (useful for forms); such as 'submit', etc.
 *
 * @usage
 * <hljs lang="html">
 *  <material-button>Button</material-button>
 *  <br/>
 *  <material-button noink class="material-button-colored">
 *    Button (noInk)
 *  </material-button>
 *  <br/>
 *  <material-button disabled class="material-button-colored">
 *    Colored (disabled)
 *  </material-button>
 * </hljs>
 */
function MaterialButtonDirective() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<material-ripple start="center" initial-opacity="0.25" opacity-decay-velocity="0.75"></material-ripple>',
    link: function(scope, element, attr, ctrl, transclude) {

      // Put the content of the <material-button> inside after the ripple

      transclude(scope, function(clone) {
        element.append(clone);
      });

      //

      configureInk(attr.noink);
      configureButton(attr.type);

      /**
       * If the inkRipple is disabled, then remove the ripple area....
       * NOTE: <material-ripple/> directive replaces itself with `<canvas.material-ink-ripple />` element
       * @param isDisabled
       */
      function configureInk(noInk) {
        if ( noInk ) {
          element.find('canvas').remove();
        }
      }

      /**
       * If a type attribute is specified, dynamically insert a <button> element.
       * This is vital to allow <material-button> to be used as form buttons
       * @param type
       */
      function configureButton(type) {
        var hasButton = !!element.find('button');
        if (type && !hasButton) {
          var innerButton = angular.element('<button>')
                .attr('type', type)
                .addClass('material-inner-button');
          element.append(innerButton);
        }
      }
    }
  };

}

/**
 * @ngdoc module
 * @name material.components.card
 *
 * @description
 * Card components.
 */
angular.module('material.components.card', [
])
  .directive('materialCard', [
    materialCardDirective 
  ]);

function materialCardDirective() {
  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
    }
  };
}

/**
 * @ngdoc module
 * @name material.components.checkbox
 * @description Checkbox module!
 */
angular.module('material.components.checkbox', [
  'material.animations'
])
  .directive('materialCheckbox', [
    materialCheckboxDirective
  ]);

/**
 * @ngdoc directive
 * @name materialCheckbox
 * @module material.components.checkbox
 * @restrict E
 *
 * @description
 * Checkbox directive!
 *
 * @param {expression=} ngModel An expression to bind this checkbox to.
 */
function materialCheckboxDirective() {

  var CHECKED_CSS = 'material-checked';

  return {
    restrict: 'E',
    scope: true,
    transclude: true,
    template: '<div class="material-container">' +
                '<material-ripple start="center" class="circle" material-checked="{{ checked }}" ></material-ripple>' +
                '<div class="material-icon"></div>' +
              '</div>' +
              '<div ng-transclude class="material-label"></div>',
    link: link
  };

  // **********************************************************
  // Private Methods
  // **********************************************************

  function link(scope, element, attr) {
    var input = element.find('input');
    var ngModelCtrl = angular.element(input).controller('ngModel');
    scope.checked = false;

    if(!ngModelCtrl || input[0].type !== 'checkbox') return;

    // watch the ng-model $viewValue
    scope.$watch(
      function () { return ngModelCtrl.$viewValue; },
      function () {
        scope.checked = input[0].checked;

        element.attr('aria-checked', scope.checked);
        if(scope.checked) {
          element.addClass(CHECKED_CSS);
        } else {
          element.removeClass(CHECKED_CSS);
        }
      }
    );

    // add click listener to directive element to manually
    // check the inner input[checkbox] and set $viewValue
    var listener = function(ev) {
      scope.$apply(function() {
        input[0].checked = !input[0].checked;
        ngModelCtrl.$setViewValue(input[0].checked, ev && ev.type);
      });
    };
    element.on('click', listener);

  }

}



/**
 * @ngdoc module
 * @name material.components.content
 *
 * @description
 * Scrollable content
 */
angular.module('material.components.content', [
  'material.services.registry'
])
  .controller('$materialContentController', [
    '$scope', 
    '$element', 
    '$attrs', 
    '$materialComponentRegistry', 
    materialContentController
  ])
  .factory('$materialContent', [
    '$materialComponentRegistry', 
    materialContentService
  ])
  .directive('materialContent', [
    materialContentDirective
  ]);

function materialContentController($scope, $element, $attrs, $materialComponentRegistry) {
  $materialComponentRegistry.register(this, $attrs.componentId || 'content');

  this.getElement = function() {
    return $element;
  };
}

function materialContentService($materialComponentRegistry) {
  return function(handle) {
    var instance = $materialComponentRegistry.get(handle);
    if(!instance) {
      $materialComponentRegistry.notFoundError(handle);
    }
    return instance;
  };
}


function materialContentDirective() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="material-content" ng-transclude></div>',
    controller: '$materialContentController',
    link: function($scope, $element, $attr) {
    }
  };
}

/**
 * @ngdoc module
 * @name material.components.dialog
 */
angular.module('material.components.dialog', [
  'material.animations',
  'material.components.backdrop',
  'material.services.popup'
])
  .directive('materialDialog', [
    MaterialDialogDirective
  ])
  .factory('$materialDialog', [
    '$timeout',
    '$materialPopup',
    '$rootElement',
    '$materialBackdrop',
    '$materialEffects',
    MaterialDialogService
  ]);

function MaterialDialogDirective() {
  return {
    restrict: 'E'
  };
}

/**
 * @ngdoc service
 * @name $materialDialog
 * @module material.components.dialog
 * @kind optionFunction
 *
 * @description
 *
 * The $materialDialog service opens a dialog over top of the app. 
 *
 * See the overview page for an example.
 *
 * The `$materialDialog` service can be used as a function, which when called will open a
 * dialog. Note: the dialog is always given an isolate scope.
 *
 * It takes one parameter, `options`, which is an object with the following parameters:
 *
 * @returns {function} `hideDialog` - A function which, when called, will hide the dialog.
 *
 * @param {string=} templateUrl The url of a template that will be used as the content
 * of the dialog. Restrictions: the template must have an outer `material-dialog` element. 
 * Inside, use an element with class `dialog-content` for the dialog's content, and use
 * an element with class `dialog-actions` for the dialog's actions.
 * @param {string=} template Same as templateUrl, except this is an actual template string.
 * @param {DOMClickEvent=} targetEvent A click's event object. When passed in as an option, 
 * the location of the click will be used as the starting point for the opening animation
 * of the the dialog.
 * @param {boolean=} hasBackdrop Whether there should be an opaque backdrop behind the dialog.
 *   Default true.
 * @param {boolean=} clickOutsideToClose Whether the user can click outside the dialog to
 *   close it. Default true.
 * @param {boolean=} escapeToClose Whether the user can press escape to close the dialog.
 *   Default true.
 * @param {string=} controller The controller to associate with the dialog. The controller
 * will be injected with the local `$hideDialog`, which is a method used to hide the dialog.
 * @param {object=} locals An object containing key/value pairs. The keys will be used as names
 * of values to inject into the controller. For example, `locals: {three: 3}` would inject
 * `three` into the controller, with the value 3.
 * @param {element=} appendTo The element to append the dialog to. Defaults to appending
 *   to the root element of the application.
 * @param {object=} resolve Similar to locals, except it takes promises as values, and the
 * dialog will not open until all of the promises resolve.
 * @param {string=} controllerAs An alias to assign the controller to on the scope.
 */
function MaterialDialogService($timeout, $materialPopup, $rootElement, $materialBackdrop, $materialEffects) {
  var recentDialog;

  return showDialog;

  /**
   * TODO fully document this
   * Supports all options from $materialPopup, in addition to `duration` and `position`
   */
  function showDialog(options) {
    options = angular.extend({
      appendTo: $rootElement,
      hasBackdrop: true, // should have an opaque backdrop
      clickOutsideToClose: true, // should have a clickable backdrop to close
      escapeToClose: true,
      // targetEvent: used to find the location to start the dialog from
      targetEvent: null,
      transformTemplate: function(template) {
        return '<div class="material-dialog-container">' + template + '</div>';
      },
      // Also supports all options from $materialPopup
    }, options || {});

    // Incase the user provides a raw dom element, always wrap it in jqLite
    options.appendTo = angular.element(options.appendTo); 

    var backdropInstance;

    // Close the old dialog
    recentDialog && recentDialog.then(function(destroyDialog) {
      destroyDialog();
    });

    recentDialog = $materialPopup(options).then(function(dialog) {

      // Controller will be passed a `$hideDialog` function
      dialog.locals.$hideDialog = destroyDialog;
      dialog.enter(function() {
        if (options.escapeToClose) {
          $rootElement.on('keyup', onRootElementKeyup);
        }

        if (options.hasBackdrop) {
          backdropInstance = $materialBackdrop({
            appendTo: options.appendTo,
            opaque: options.hasBackdrop
          });
          backdropInstance.then(function(drop) {
            drop.enter();
          });
        }

        if (options.clickOutsideToClose) {
          dialog.element.on('click', dialogClickOutside);
        }
      });

      var popInTarget = options.targetEvent && options.targetEvent.target && 
        angular.element(options.targetEvent.target);

      $materialEffects.popIn(
        dialog.element,
        options.appendTo,
        popInTarget
      );

      return destroyDialog;

      function destroyDialog() {
        if (backdropInstance) {
          backdropInstance.then(function(drop) {
            drop.destroy();
          });
        }
        if (options.escapeToClose) {
          $rootElement.off('keyup', onRootElementKeyup);
        }
        if (options.clickOutsideToClose) {
          dialog.element.off('click', dialogClickOutside);
        }
        $materialEffects.popOut(dialog.element, $rootElement);

        // TODO(ajoslin): use element.animate() and ngAnimateStyler instead of
        // this $timeout.
        $timeout(dialog.destroy, 200);
      }
      function onRootElementKeyup(e) {
        if (e.keyCode == 27) {
          $timeout(destroyDialog);
        }
      }
      function dialogClickOutside(e) {
        // If we click the flex container outside the backdrop
        if (e.target === dialog.element[0]) {
          $timeout(destroyDialog);
        }
      }
    });

    return recentDialog;
  }
}

/**
 * @ngdoc module
 * @name material.components.form
 * @description
 * Form
 */
angular.module('material.components.form', [])
  .directive('materialInputGroup', [
    materialInputGroupDirective
  ]);

/**
 * @ngdoc directive
 * @name materialInputGroup
 * @module material.components.form
 * @description
 * Material Input Group
 */
function materialInputGroupDirective() {
  return {
    restrict: 'C',
    link: function($scope, $element, $attr) {
      // Grab the input child, and just do nothing if there is no child
      var input = $element[0].querySelector('input');
      if(!input) { return; }

      input = angular.element(input);
      var ngModelCtrl = input.controller('ngModel');

      // When the input value changes, check if it "has" a value, and 
      // set the appropriate class on the input group
      if (ngModelCtrl) {
        $scope.$watch(
          function() { return ngModelCtrl.$viewValue; },
          onInputChange
        );
      }
      input.on('input', onInputChange);

      // When the input focuses, add the focused class to the group
      input.on('focus', function(e) {
        $element.addClass('material-input-focused');
      });
      // When the input blurs, remove the focused class from the group
      input.on('blur', function(e) {
        $element.removeClass('material-input-focused');
      });

      function onInputChange() {
        $element.toggleClass('material-input-has-value', !!input.val());
      }
    }
  };
}

/**
 * @ngdoc module
 * @name material.components.icon
 * @description
 * Icon
 */
angular.module('material.components.icon', [])
  .directive('materialIcon', [
    materialIconDirective
  ]);

/**
 * @ngdoc directive
 * @name materialIcon
 * @module material.components.icon
 * @restrict E
 * @description
 * Icon
 */
function materialIconDirective() {
  return {
    restrict: 'E',
    template: '<object class="material-icon"></object>',
    compile: function(element, attr) {
      var object = angular.element(element[0].children[0]);
      if(angular.isDefined(attr.icon)) {
        object.attr('data', attr.icon);
      }
    }
  };
}

/**
 * @ngdoc module
 * @name material.components.list
 * @description
 * List module
 */
angular.module('material.components.list', [])

.directive('materialList', [
  materialListDirective
])
.directive('materialItem', [
  materialItemDirective
]);

/**
 * @ngdoc directive
 * @name materialList
 * @module material.components.list
 * @restrict E
 *
 * @description
 * materialList is a list container for material-items
 */
function materialListDirective() {
  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
    }
  };
}

/**
 * @ngdoc directive
 * @name materialItem
 * @module material.components.list
 * @restrict E
 * @description
 * materialItem is a list item
 */
function materialItemDirective() {
  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
    }
  };
}


/**
 * @ngdoc module
 * @name material.components.radioButton
 * @description radioButton module!
 */
angular.module('material.components.radioButton', [
  'material.animations'
])
  .directive('materialRadioButton', [
    materialRadioButtonDirective 
  ])
  .directive('materialRadioGroup', [
    materialRadioGroupDirective 
  ]);


/**
 * @ngdoc directive
 * @name materialRadioButton
 * @module material.components.radioButton
 * @restrict E
 *
 * @description
 * radioButton directive!
 *
 * @param {expression=} ngModel An expression to bind this radioButton to.
 */
function materialRadioButtonDirective() {

  var CHECKED_CSS = 'material-checked';

  return {
    restrict: 'E',
    require: '^materialRadioGroup',
    scope: true,
    transclude: true,
    template: '<div class="material-container">' +
                '<material-ripple start="center" class="circle"></material-ripple>' +
                '<div class="material-off"></div>' +
                '<div class="material-on"></div>' +
              '</div>' +
              '<div ng-transclude class="material-label"></div>',
    link: link
  };

  // **********************************************************
  // Private Methods
  // **********************************************************

  function link(scope, element, attr, rgCtrl) {
    var input = element.find('input');
    var ngModelCtrl = angular.element(input).controller('ngModel');
    scope.checked = false;

    if(!ngModelCtrl || input[0].type !== 'radio') return;

    // the radio group controller decides if this
    // radio button should be checked or not
    scope.check = function(val) {
      // update the directive's DOM/design
      scope.checked = !!val;
      element.attr('aria-checked', scope.checked);
      if(scope.checked) {
        element.addClass(CHECKED_CSS);
      } else {
        element.removeClass(CHECKED_CSS);
      }
    };

    // watch the ng-model $viewValue
    scope.$watch(
      function () { return ngModelCtrl.$viewValue; },
      function (val) {
        // tell the radio group controller that this
        // radio button should be the checked one
        if(input[0].checked) {
          rgCtrl.check(scope);
        }
      }
    );

    // add click listener to directive element to manually
    // check the inner input[radio] and set $viewValue
    var listener = function(ev) {
      scope.$apply(function() {
        ngModelCtrl.$setViewValue(input.val(), ev && ev.type);
        input[0].checked = true;
      });
    };
    element.on('click', listener);

    // register this radio button in its radio group
    rgCtrl.add(scope);

    // on destroy, remove this radio button from its radio group
    scope.$on('$destroy', function(){
      if(input[0].checked) {
        ngModelCtrl.$setViewValue(null);
      }
      rgCtrl.remove(scope);
    });
  }

}


/**
 * @ngdoc directive
 * @name radioGroup
 * @module material.components.radioGroup
 * @restrict E
 *
 * @description
 * radioGroup directive!
 */
function materialRadioGroupDirective() {

  return {
    restrict: 'E',
    controller: controller
  };

  function controller($scope) {
    var radioButtons = [];
    var checkedRadioButton = null;

    this.add = addRadioButton;
    this.remove = removeRadioButton;
    this.check = checkRadioButton;

    function addRadioButton(rbScope) {
      return radioButtons.push(rbScope);
    }

    function removeRadioButton(rbScope) {
      for(var i=0; i<radioButtons.length; i++) {
        if(radioButtons[i] === rbScope) {
          if(rbScope === checkedRadioButton) {
            checkedRadioButton = null;
          }
          return radioButtons.splice(i, 1);
        }
      }
    }

    function checkRadioButton(rbScope) {
      if(checkedRadioButton === rbScope) return;

      checkedRadioButton = rbScope;

      angular.forEach(radioButtons, function(rb) {
        rb.check(rb === checkedRadioButton);
      });
    }

  }

}

/**
 * @ngdoc module
 * @name material.components.scrollHeader
 *
 * @description
 * Scrollable content
 */
angular.module('material.components.scrollHeader', [
  'material.components.content',
  'material.services.registry'
])
  .directive('scrollHeader', [
    '$materialContent', 
    '$timeout', 
    materialScrollHeader 
  ]);

/**
 * @ngdoc directive
 * @name scrollHeader
 * @module material.components.scrollHeader
 * @restrict A
 * @description
 * Scrollable header
 */
function materialScrollHeader($materialContent, $timeout) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var target = $element[0],

        // Full height of the target
        height = target.offsetHeight,

        // Condensed height is set through condensedHeight or defaults to 1/3 the 
        // height of the target
        condensedHeight = $attr.condensedHeight || (height / 3),

        // Calculate the difference between the full height and the condensed height
        margin = height - condensedHeight,

        // Current "y" position of scroll
        y = 0,
      
        // Store the last scroll top position
        prevScrollTop = 0;

      // Perform a simple Y translate
      var translate = function(y) {
        target.style.webkitTransform = target.style.transform = 'translate3d(0, ' + y + 'px, 0)';
      }


      // Transform the header as we scroll
      var transform = function(y) {
        translate(-y);
      }

      // Shrink the given target element based on the scrolling
      // of the scroller element.
      var shrink = function(scroller) {
        var scrollTop = scroller.scrollTop;

        y = Math.min(height, Math.max(0, y + scrollTop - prevScrollTop));

        // If we are scrolling back "up", show the header condensed again
        if (prevScrollTop > scrollTop && scrollTop > margin) {
          y = Math.max(y, margin);
        }

        window.requestAnimationFrame(transform.bind(this, y));
      };

      // Wait for next digest to ensure content has loaded
      $timeout(function() {
        var element = $materialContent('content').getElement();

        element.on('scroll', function(e) {
          shrink(e.target);

          prevScrollTop = e.target.scrollTop;
        });
      });
    }
  };
}

/**
 * @ngdoc module
 * @name material.components.sidenav
 *
 * @description
 * A Sidenav QP component.
 */
angular.module('material.components.sidenav', [
  'material.services.registry'
])
  .factory('$materialSidenav', [
    '$materialComponentRegistry', 
    materialSidenavService 
  ])
  .directive('materialSidenav', [
    materialSidenavDirective 
  ])
  .controller('$materialSidenavController', [
    '$scope',
    '$element',
    '$attrs',
    '$timeout',
    '$document',
    '$materialSidenav',
    '$materialComponentRegistry',
    materialSidenavController 
  ]);
  
/**
 * @ngdoc object
 * @name materialSidenavController
 * @module material.components.sidenav
 *
 * @description
 * The controller for materialSidenav components.
 */
function materialSidenavController($scope, $element, $attrs, $timeout, 
    $document, $materialSidenav, $materialComponentRegistry) {

  var self = this;

  $materialComponentRegistry.register(this, $attrs.componentId);

  // Process a click event on the body to close if necessary
  var bodyClick = function(e) {
    var node = e.target;
    while(node) {
      if(node === $element[0]) {
        // Don't allow clicks originating in the sidenav to close it
        return true;
      }
      node = node.parentNode;
    }

    $scope.$apply(function() {
      self.close();
      onClose();
    });
  };
  /**
   * If the side nav is open, listen for clicks on the content to close it.
   */
  var onOpen = function() {
    $document[0].body.classList.add('material-sidenav-open');

    // Defer the event binding to avoid a false click
    $timeout(function() {
      angular.element($document[0].body).on('click', bodyClick);
    });
  };

  var onClose = function() {
    $document[0].body.classList.remove('material-sidenav-open');
    angular.element($document[0].body).off('click', bodyClick);
  };

  this.isOpen = function() {
    return !!$scope.isOpen;
  };

  /**
   * Toggle the side menu to open or close depending on its current state.
   */
  this.toggle = function() {
    $scope.isOpen = !$scope.isOpen;
    if($scope.isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  /**
   * Open the side menu
   */
  this.open = function() {
    $scope.isOpen = true;
    onOpen();
  };

  /**
   * Close the side menu
   */
  this.close = function() {
    $scope.isOpen = false;
    onClose();
  };
}

/**
 * @ngdoc service
 * @name $materialSidenav
 * @module material.components.sidenav
 *
 * @description
 * $materialSidenav makes it easy to interact with multiple sidenavs
 * in an app.
 *
 * @usage
 *
 * ```javascript
 * // Toggle the given sidenav
 * $materialSidenav.toggle(componentId);
 * // Open the given sidenav
 * $materialSidenav.open(componentId);
 * // Close the given sidenav
 * $materialSidenav.close(componentId);
 * ```
 */
function materialSidenavService($materialComponentRegistry) {
  return function(handle) {
    var instance = $materialComponentRegistry.get(handle);
    if(!instance) {
      $materialComponentRegistry.notFoundError(handle);
    }

    return {
      isOpen: function() {
        if (!instance) { return; }
        return instance.isOpen();
      },
      /**
       * Toggle the given sidenav
       * @param handle the specific sidenav to toggle
       */
      toggle: function() {
        if(!instance) { return; }
        instance.toggle();
      },
      /**
       * Open the given sidenav
       * @param handle the specific sidenav to open
       */
      open: function(handle) {
        if(!instance) { return; }
        instance.open();
      },
      /**
       * Close the given sidenav
       * @param handle the specific sidenav to close
       */
      close: function(handle) {
        if(!instance) { return; }
        instance.close();
      }
    };
  };
}

/**
 * @ngdoc directive
 * @name materialSidenav
 * @module material.components.sidenav
 * @restrict E
 *
 * @description
 *
 * A Sidenav component that can be opened and closed programatically.
 *
 * @example
 * <material-sidenav>
 * </material-sidenav>
 */
function materialSidenavDirective() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    template: '<div class="material-sidenav-inner" ng-transclude></div>',
    controller: '$materialSidenavController',
    link: function($scope, $element, $attr) {
      $scope.$watch('isOpen', function(v) {
        if(v) {
          $element.addClass('open');
        } else {
          $element.removeClass('open');
        }
      });
    }
  };
}

/**
 * @ngdoc module
 * @name material.components.slider
 * @description Slider module!
 */
angular.module('material.components.slider', [])
  .directive('materialSlider', [
    '$window', 
    materialSliderDirective 
  ]);

/**
 * @ngdoc directive
 * @name materialSlider
 * @module material.components.slider
 * @restrict E
 *
 * @description
 * Slider directive!
 *
 */
function materialSliderDirective($window) {

  var MIN_VALUE_CSS = 'material-slider-min';
  var ACTIVE_CSS = 'material-active';

  function rangeSettings(rangeEle) {
    return {
      min: parseInt( rangeEle.min !== "" ? rangeEle.min : 0, 10 ),
      max: parseInt( rangeEle.max !== "" ? rangeEle.max : 100, 10 ),
      step: parseInt( rangeEle.step !== "" ? rangeEle.step : 1, 10 )
    };
  }

  return {
    restrict: 'E',
    scope: true,
    transclude: true,
    template: '<div class="material-track" ng-transclude></div>',
    link: link
  };

  // **********************************************************
  // Private Methods
  // **********************************************************

  function link(scope, element, attr) {
    var input = element.find('input');
    var ngModelCtrl = angular.element(input).controller('ngModel');

    if(!ngModelCtrl || input[0].type !== 'range') return;

    var rangeEle = input[0];
    var trackEle = angular.element( element[0].querySelector('.material-track') );

    trackEle.append('<div class="material-fill"><div class="material-thumb"></div></div>');
    var fillEle = trackEle[0].querySelector('.material-fill');

    if(input.attr('step')) {
      var settings = rangeSettings(rangeEle);
      var tickCount = (settings.max - settings.min) / settings.step;
      var tickMarkersEle = angular.element('<div class="material-tick-markers material-display-flex"></div>');
      for(var i=0; i<tickCount; i++) {
        tickMarkersEle.append('<div class="material-tick material-flex"></div>');
      }
      trackEle.append(tickMarkersEle);
    }

    input.on('mousedown touchstart', function(e){
      trackEle.addClass(ACTIVE_CSS);
    });

    input.on('mouseup touchend', function(e){
      trackEle.removeClass(ACTIVE_CSS);
    });


    function render() {
      var settings = rangeSettings(rangeEle);
      var adjustedValue = parseInt(ngModelCtrl.$viewValue, 10) - settings.min;
      var fillRatio = (adjustedValue / (settings.max - settings.min));

      fillEle.style.width = (fillRatio * 100) + '%';

      if(fillRatio <= 0) {
        element.addClass(MIN_VALUE_CSS);
      } else {
        element.removeClass(MIN_VALUE_CSS);
      }

    }

    scope.$watch( function () { return ngModelCtrl.$viewValue; }, render );

  }

}


/**
 * @ngdoc module
 * @name material.components.tabs
 * @description
 *
 * Tabs
 */
angular.module('material.components.tabs', [
  'material.animations',
  'material.services.attrBind',
  'material.services.registry'
])
  .controller('materialTabsController', [
    '$scope', 
    '$attrs', 
    '$materialComponentRegistry', 
    '$timeout', 
    TabsController 
  ])
  .directive('materialTabs', [
    '$compile', 
    '$timeout', 
    '$materialEffects', 
    '$animate',
    TabsDirective
  ])
  .directive('materialTab', [ 
    '$attrBind', 
    TabDirective  
  ]);

/**
 * @ngdoc directive
 * @name materialTabs
 * @module material.components.tabs
 * @order 0
 *
 * @restrict E
 *
 * @description
 * The `<material-tabs>` tag identifies the outer directive and serves as the container for the tabs functionality; specified
 * using nested `<material-tab>` markup tags. The `<material-tab>` directive is used to specify a tab label for the **header button**
 * and optional tab view content that should be associated with each tab button.
 *
 * Any markup (other than **`<material-tab>`** tags) will be transcluded into the tab header area BEFORE the tab buttons.
 *
 * Additional Features:
 *
 * - Content can include any markup.
 * - If a tab is disabled while active/selected, then the next tab will be auto-selected.
 * - If the currently active tab is the last tab, then the next tab will be the first tab in the list.
 *
 * @param {integer=} selected Index of the active/selected tab
 * @param {boolean=} noink Flag indicates use of ripple ink effects
 * @param {boolean=} nobar Flag indicates use of ink bar effects
 * @param {boolean=} nostretch Flag indicates use of elastic animation for inkBar width and position changes
 * @param {string=}  align-tabs Attribute to indicate position of tab buttons: bottom or top; default is `top`
 *
 * @usage
 * <hljs lang="html">
 * <material-tabs selected="selectedIndex" >
 *   <img ng-src="/img/angular.png" class="centered">
 *
 *   <material-tab
 *      ng-repeat="tab in tabs | orderBy:predicate:reversed"
 *      on-select="onTabSelected(tab)"
 *      on-deselect="announceDeselected(tab)"
 *      disabled="tab.disabled" >
 *
 *       <material-tab-label>
 *           {{tab.title}}
 *           <img src="/img/removeTab.png"
 *                ng-click="removeTab(tab)"
 *                class="delete" >
 *       </material-tab-label>
 *
 *       {{tab.content}}
 *
 *   </material-tab>
 *
 * </material-tabs>
 * </hljs>
 *
 */
function TabsDirective($compile, $timeout, $materialEffects) {

  return {
    restrict: 'E',
    replace: false,
    transclude: 'true',

    scope: {
      $selIndex: '=?selected'
    },

    compile: compileTabsFn,
    controller: [ '$scope', '$attrs', '$materialComponentRegistry', '$timeout', TabsController ],

    template:
      '<div class="tabs-header">' +
      '  <div class="tabs-header-items"></div>' +
      '  <material-ink-bar></material-ink-bar>' +
      '</div>'+
      '<div class="tabs-content ng-hide"></div>'

  };

  /**
   * Use prelink to configure inherited scope attributes: noink, nobar, and nostretch;
   * do this before the child elements are linked.
   *
   * @param element
   * @param attr
   * @returns {{pre: materialTabsLink}}
   */
  function compileTabsFn() {

    return {
      pre: function tabsPreLink(scope, element, attrs, tabsController) {

        // These attributes do not have values; but their presence defaults to value == true.
        scope.noink = angular.isDefined(attrs.noink);
        scope.nobar = angular.isDefined(attrs.nobar);
        scope.nostretch = angular.isDefined(attrs.nostretch);

        // Publish for access by nested `<material-tab>` elements
        tabsController.noink = scope.noink;

        // Watch for external changes `selected` & auto-select the specified tab
        // Stop watching when the <material-tabs> directive is released
        scope.$on("$destroy", scope.$watch('$selIndex', function (index) {
          tabsController.selectAt(index);
        }));

        // Remove the `inkBar` element if `nobar` is defined
        var elBar = findNode("material-ink-bar",element);
        if ( elBar && scope.nobar ) {
          elBar.remove();
        }

      },
      post: function tabsPostLink(scope, element, attrs, tabsController, $transclude) {
        var  cache = {
          length: 0,
          contains: function (tab) {
            return !angular.isUndefined(cache[tab.$id]);
          }
        };

        transcludeHeaderItems();
        transcludeContentItems();

        configureInk();

        alignTabButtons();
        selectDefaultTab();

        // **********************************************************
        // Private Methods
        // **********************************************************

        /**
         * Conditionally configure ink bar animations when the
         * tab selection changes. If `nobar` then do not show the
         * bar nor animate.
         */
        function configureInk() {
          if ( scope.nobar ) return;

          // Single inkBar is used for all tabs
          var inkBar = findNode("material-ink-bar", element);

          // On resize or tabChange
          tabsController.onTabChange = updateInkBar;
          angular.element(window).on('resize', function() {
            updateInkBar(tabsController.selectedElement(), true);
          });

          // Immediately place the ink bar
          updateInkBar(tabsController.selectedElement(), true );

          /**
           * Update the position and size of the ink bar based on the
           * specified tab DOM element
           * @param tab
           * @param skipAnimation
           */
          function updateInkBar(tab, skipAnimation) {
            if ( tabsController.$$tabs().length < 2 ) return;

            if ( angular.isDefined(tab) && angular.isDefined(inkBar) ) {

              var tabNode = tab[0];
              var width = tabNode.offsetWidth;
              var styles = {
                left : tabNode.offsetLeft +'px',
                width : width +'px' ,
                display : width > 0 ? 'block' : 'none'
              };

              if( !!skipAnimation ) {
                inkBar.css(styles);
              } else {
                $materialEffects.inkBar(inkBar, styles);
              }
            }

          }
        }

        /**
         * Change the positioning of the tab header and buttons.
         * If the tabs-align attribute is 'bottom', then the tabs-content
         * container is transposed with the tabs-header
         */
        function alignTabButtons() {
          var align  = attrs.tabsAlign || "top";
          var container = findNode('.tabs-content', element);

          if ( align == "bottom") {
            element.prepend(container);
          }
        }

        /**
         * If an initial tab selection has not been specified, then
         * select the first tab by default
         */
        function selectDefaultTab() {
          var tabs = tabsController.$$tabs();

          if ( tabs.length && angular.isUndefined(scope.$selIndex)) {
            tabsController.select(tabs[0]);
          }
        }


        /**
         * Transclude the materialTab items into the tabsHeaderItems container
         *
         */
        function transcludeHeaderItems() {
          $transclude(function (content) {
            var header = findNode('.tabs-header-items', element);
            var parent = angular.element(element[0]);

            angular.forEach(content, function (node) {
              var intoHeader = isNodeType(node, 'material-tab') || isNgRepeat(node);

              if (intoHeader) {
                header.append(node);
              }
              else {
                parent.prepend(node);
              }
            });
          });
        }


        /**
         * Transclude the materialTab view/body contents into materialView containers; which
         * are stored in the tabsContent area...
         */
        function transcludeContentItems() {
          var cntr = findNode('.tabs-content', element),
              materialViewTmpl = '<div class="material-view" ng-show="active"></div>';

          scope.$watch(getTabsHash, function buildContentItems() {
            var tabs = tabsController.$$tabs(notInCache),
              views = tabs.map(extractContent);

            // At least 1 tab must have valid content to build; otherwise
            // we hide/remove the tabs-content container...

            if (views.some(notEmpty)) {
              angular.forEach(views, function (content, j) {

                var tab = tabs[j++],
                  materialView = $compile(materialViewTmpl)(tab);

                // Allow dynamic $digest() disconnect/reconnect of tab content's scope

                enableDisconnect(tab, content.scope);

                // Do we have content DOM nodes ?
                // If transcluded content is not undefined then add all nodes to the materialView

                if (content.nodes) {
                  angular.forEach(content.nodes, function (node) {
                    if ( !isNodeEmpty(node) ) {
                      materialView.append(node);
                    }
                  });
                }

                cntr.append(materialView);
                addToCache(cache, { tab:tab, element: materialView });

              });

              // We have some new content just added...
              showTabContent();

            } else {

              showTabContent(false);

            }


            /**
             * Add class to hide or show the container for the materialView(s)
             * NOTE: the `<div.tabs-content>` is **hidden** by default.
             * @param visible Boolean a value `true` will remove the `class="ng-hide"` setting
             */
            function showTabContent(visible) {
              cntr.toggleClass('ng-hide', !!visible);
            }

          });

          /**
           * Allow tabs to disconnect or reconnect their content from the $digest() processes
           * when unselected or selected (respectively).
           *
           * @param content Special content scope which is a direct child of a `tab` scope
           */
          function enableDisconnect(tab,  content) {
            if ( !content ) return;

            var selectedFn = angular.bind(tab, tab.selected),
                deselectedFn = angular.bind(tab, tab.deselected);

            addDigestConnector(content);

            // 1) Tail-hook deselected()
            tab.deselected = function() {
              deselectedFn();
              tab.$$postDigest(function(){
                content.$disconnect();
              });
            };

             // 2) Head-hook selected()
            tab.selected = function() {
              content.$reconnect();
              selectedFn();
            };

            // Immediate disconnect all non-actives
            if ( !tab.active ) {
              tab.$$postDigest(function(){
                content.$disconnect();
              });
            }
          }

          /**
           * Add tab scope/DOM node to the cache and configure
           * to auto-remove when the scope is destroyed.
           * @param cache
           * @param item
           */
          function addToCache(cache, item) {
            var scope = item.tab;

            cache[ scope.$id ] = item;
            cache.length = cache.length + 1;

            // When the tab is removed, remove its associated material-view Node...
            scope.$on("$destroy", function () {
              angular.element(item.element).remove();

              delete cache[ scope.$id];
              cache.length = cache.length - 1;
            });
          }

          function getTabsHash() {
            return tabsController.$$hash;
          }

          /**
           * Special function to extract transient data regarding transcluded
           * tab content. Data includes dynamic lookup of bound scope for the transcluded content.
           *
           * @see TabDirective::updateTabContent()
           *
           * @param tab
           * @returns {{nodes: *, scope: *}}
           */
          function extractContent(tab) {
            var content = hasContent(tab) ? tab.content : undefined;
            var scope   = (content && content.length) ? angular.element(content[0]).scope() : null;

            // release immediately...
            delete tab.content;

            return { nodes:content, scope:scope };
          }

          function hasContent(tab) {
            return tab.content && tab.content.length;
          }

          function notEmpty(view) {
            var hasContent = false;
            if (angular.isDefined(view.nodes)) {
              angular.forEach(view.nodes, function(node) {
                hasContent = hasContent || !isNodeEmpty(node);
              });
            }
            return hasContent;
          }

          function notInCache(tab) {
            return !cache.contains(tab);
          }
        }

      }
    };

    function findNode(selector, element) {
      var container = element[0];
      return angular.element(container.querySelector(selector));
    }

  }

}

/**
 * @ngdoc directive
 * @name materialTab
 * @module material.components.tabs
 * @order 1
 *
 * @restrict E
 *
 * @description
 * `<material-tab>` is the nested directive used [within `<material-tabs>`] to specify each tab with a **label** and optional *view content*
 *
 * If the `label` attribute is not specified, then an optional `<material-tab-label>` tag can be used to specified more
 * complex tab header markup. If neither the **label** nor the **material-tab-label** are specified, then the nested
 * markup of the `<material-tab>` is used as the tab header markup.
 *
 * If a tab **label** has been identified, then any **non-**`<material-tab-label>` markup
 * will be considered tab content and will be transcluded to the internal `<div class="tabs-content">` container.
 *
 * This container is used by the TabsController to show/hide the active tab's content view. This synchronization is
 * automatically managed by the internal TabsController whenever the tab selection changes. Selection changes can
 * be initiated via data binding changes, programmatic invocation, or user gestures.
 *
 * @param {string=} label Optional attribute to specify a simple string as the tab label
 * @param {boolean=}  active Flag indicates if the tab is currently selected; normally the `<material-tabs selected="">`; attribute is used instead.
 * @param {boolean=}  disabled Flag indicates if the tab is disabled: not selectable with no ink effects
 * @param {expression=} deselected Expression to be evaluated after the tab has been de-selected.
 * @param {expression=} selected Expression to be evaluated after the tab has been selected.
 *
 *
 * @usage
 *
 * <hljs lang="html">
 * <material-tab label="" disabled="" selected="" deselected="" >
 *   <h3>My Tab content</h3>
 * </material-tab>
 *
 * <material-tab >
 *   <material-tab-label>
 *     <h3>My Tab content</h3>
 *   </material-tab-label>
 *   <p>
 *     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
 *     totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
 *     dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
 *     sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
 *   </p>
 * </material-tab>
 * </hljs>
 *
 */
function TabDirective( $attrBind ) {
  var noop = angular.noop;

  return {
    restrict: 'E',
    replace: false,
    require: "^materialTabs",
    transclude: 'true',
    scope: true,
    link: linkTab,
    template:
      '<material-ripple initial-opacity="0.9" opacity-decay-velocity="0.89"> </material-ripple> ' +
      '<material-tab-label ' +
        'ng-class="{ disabled : disabled, active : active }"  >' +
      '</material-tab-label>'

  };

  function linkTab(scope, element, attrs, tabsController, $transclude) {
    var defaults = { active: false, disabled: false, deselected: noop, selected: noop };

    // Since using scope=true for inherited new scope,
    // then manually scan element attributes for forced local mappings...

    $attrBind(scope, attrs, {
      label: '@?',
      active: '=?',
      disabled: '=?',
      deselected: '&onDeselect',
      selected: '&onSelect'
    }, defaults);

    configureEffects();
    configureWatchers();
    updateTabContent(scope);

    // Click support for entire <material-tab /> element
    element.on('click', function onRequestSelect() {
      if (!scope.disabled) {
        scope.$apply(function () {
          tabsController.select(scope);
        });
      }
    });

    tabsController.add(scope, element);

    // **********************************************************
    // Private Methods
    // **********************************************************

    /**
     * If materialTabs `noInk` is true, then remove the ripple area....
     * NOTE: <material-ripple/> directive replaces itself with `<canvas.material-ink-ripple />` element
     */
    function configureEffects() {
      if ( tabsController.noink ) {
        element.find('canvas').remove();
      }
    }

    /**
     * Auto select the next tab if the current tab is active and
     * has been disabled.
     */
    function configureWatchers() {
      var unwatch = scope.$watch('disabled', function (isDisabled) {
        if (scope.active && isDisabled) {
          tabsController.next(scope);
        }
      });

      scope.$on("$destroy", function () {
        unwatch();
        tabsController.remove(scope);
      });
    }

    /**
     * Transpose the optional `label` attribute value or materialTabHeader or `content` body
     * into the body of the materialTabButton... all other content is saved in scope.content
     * and used by TabsController to inject into the `tabs-content` container.
     */
    function updateTabContent(scope) {
      var tab = scope;

      // Check to override label attribute with the content of the <material-tab-header> node,
      // If a materialTabHeader is not specified, then the node will be considered
      // a <material-view> content element...
      $transclude(function ( contents ) {

        // Transient references...
        tab.content = [ ];

        angular.forEach(contents, function (node) {

          if (!isNodeEmpty(node)) {
            if (isNodeType(node, 'material-tab-label')) {
              // Simulate use of `label` attribute

              tab.label = node.childNodes;

            } else {
              // Transient references...
              //
              // Attach to scope for future transclusion into materialView(s)
              // We need the bound scope for the content elements; which is NOT
              // the scope of tab or material-view container...

              tab.content.push(node);
            }
          }
        });

      });

      // Prepare to assign the materialTabButton content
      // Use the label attribute or fallback to TabHeader content

      var cntr = angular.element(element[0].querySelector('material-tab-label'));

      if (angular.isDefined(scope.label)) {
        // The `label` attribute is the default source

        cntr.append(scope.label);

        delete scope.label;

      } else {

        // NOTE: If not specified, all markup and content is assumed
        // to be used for the tab label.

        angular.forEach(scope.content, function (node) {
          cntr.append(node);
        });

        delete scope.content;
      }
    }

  }
}

/**
 * @ngdoc object
 * @name materialTabsController
 * @module material.components.tabs
 * @description Controller used within `<material-tabs>` to manage tab selection and iteration
 *
 * @private
 */
function TabsController($scope, $attrs, $materialComponentRegistry, $timeout ) {
  var list = iterator([], true),
    componentID = "tabs" + $scope.$id,
    elements = { },
    selected = null,
    self = this;

  $materialComponentRegistry.register( self, $attrs.componentId || componentID );

  // Methods used by <material-tab> and children

  this.add = addTab;
  this.remove = removeTab;
  this.select = selectTab;
  this.selectAt = selectTabAt;
  this.next = selectNext;
  this.previous = selectPrevious;

  // Property for child access
  this.noink = !!$scope.noink;
  this.nobar = !!$scope.nobar;
  this.scope = $scope;

  // Special internal accessor to access scopes and tab `content`
  // Used by TabsDirective::buildContentItems()

  this.$$tabs = findTabs;
  this.$$hash = "";

  // used within the link-Phase of materialTabs
  this.onTabChange = angular.noop;
  this.selectedElement = function() {
    return findElementFor( selected );
  };

  /**
   * Find the DOM element associated with the tab/scope
   * @param tab
   * @returns {*}
   */
  function findElementFor(tab) {
    if ( angular.isUndefined(tab) ) {
      tab = selected;
    }
    return tab ? elements[ tab.$id ] : undefined;
  }

  /**
   * Publish array of tab scope items
   * NOTE: Tabs are not required to have `contents` and the
   *       node may be undefined.
   * @returns {*} Array
   */
  function findTabs(filterBy) {
    return list.items().filter(filterBy || angular.identity);
  }

  /**
   * Create unique hashKey representing all available
   * tabs.
   */
  function updateHash() {
    self.$$hash = list.items()
      .map(function (it) {
        return it.$id;
      })
      .join(',');
  }

  /**
   * Select specified tab; deselect all others (if any selected)
   * @param tab
   */
  function selectTab(tab) {
    if ( tab == selected ) return;

    var activate = makeActivator(true),
      deactivate = makeActivator(false);

    // Turn off all tabs (if current active)
    angular.forEach(list.items(), deactivate);

    // Activate the specified tab (or next available)
    selected = activate(tab.disabled ? list.next(tab) : tab);

    // update external models and trigger databinding watchers
    $scope.$selIndex = String(selected.$index || list.indexOf(selected));

    // update the tabs ink to indicate the selected tab
    self.onTabChange( findElementFor(selected) );

    return selected;
  }

  /**
   * Select tab based on its index position
   * @param index
   */
  function selectTabAt(index) {
    if (list.inRange(index)) {
      var matches = list.findBy("$index", index),
        it = matches ? matches[0] : null;

      if (it != selected) {
        selectTab(it);
      }
    }
  }

  /**
   * If not specified (in parent scope; as part of ng-repeat), create
   * `$index` property as part of current scope.
   * NOTE: This prevents scope variable shadowing...
   * @param tab
   * @param index
   */
  function updateIndex(tab, index) {
    if (angular.isUndefined(tab.$index)) {
      tab.$index = index;
    }
  }

  /**
   * Add tab to list and auto-select; default adds item to end of list
   * @param tab
   */
  function addTab(tab, element) {

    updateIndex(tab, list.count());

    // cache materialTab DOM element; these are not materialView elements
    elements[ tab.$id ] = element;

    if (!list.contains(tab)) {
      var pos = list.add(tab, tab.$index);

      // Should we auto-select it?
      if ($scope.$selIndex == pos) {
        selectTab(tab);
      }
    }


    updateHash();

    return tab.$index;
  }

  /**
   * Remove the specified tab from the list
   * Auto select the next tab or the previous tab (if last)
   * @param tab
   */
  function removeTab(tab) {
    if (list.contains(tab)) {

      selectTab( list.next(tab, isEnabled) );
      list.remove(tab);

      // another tab was removed, make sure to update ink bar
      $timeout(function(){
        self.onTabChange( findElementFor(selected), true );
        delete elements[tab.$id];
      },300);

    }

    updateHash();
  }

  /**
   * Select the next tab in the list
   * @returns {*} Tab
   */
  function selectNext() {
    return selectTab(list.next(selected, isEnabled));
  }

  /**
   * Select the previous tab
   * @returns {*} Tab
   */
  function selectPrevious() {
    return selectTab(list.previous(selected, isEnabled));
  }

  /**
   * Validation criteria for list iterator when List::next() or List::previous() is used..:
   * In this case, the list iterator should skip items that are disabled.
   * @param tab
   * @returns {boolean}
   */
  function isEnabled(tab) {
    return tab && !tab.disabled;
  }

  /**
   * Partial application to build function that will
   * mark the specified tab as active or not. This also
   * allows the `updateStatus` function to be used as an iterator.
   *
   * @param active
   */
  function makeActivator(active) {

    return function updateState(tab) {
      if (tab && (active != tab.active)) {
        tab.active = active;

        if (active) {
          selected = tab;

          tab.selected();

        } else {
          if (selected == tab) {
            selected = null;
          }

          tab.deselected();

        }
        return tab;
      }
      return null;
    };
  }

}

/**
 * Determine if the DOM element is of a certain tag type
 * or has the specified attribute type
 *
 * @param node
 * @returns {*|boolean}
 */
var isNodeType = function (node, type) {
  return node.tagName && (
    node.hasAttribute(type) ||
    node.hasAttribute('data-' + type) ||
    node.tagName.toLowerCase() === type ||
    node.tagName.toLowerCase() === 'data-' + type
  );
};

var isNgRepeat = function (node) {
  var COMMENT_NODE = 8;
  return node.nodeType == COMMENT_NODE && node.nodeValue.indexOf('ngRepeat') > -1;
};

/**
 * Is the an empty text string
 * @param node
 * @returns {boolean}
 */
var isNodeEmpty = function (node) {
  var TEXT_NODE = 3,
      COMMENT_NODE = 8;
  return (node.nodeType == COMMENT_NODE) ||
    (node.nodeType == TEXT_NODE && !(node.nodeValue || '').trim());
};


/*
 *  This function() provides scope-relative features to disconnect and reconnect to the $digest() processes
 *  NOTE: this is essentially a reversible $destroy() for scopes.
 *
 *  Detaching the scope would mean:
 *
 *    Detaching the scope from the scope's current parent so that watchers no
 *    longer fire when the scope's current parent's $digest is called
 *
 *  On re-attaching to a DOM element (as a child):
 *
 *    It would be attached as he child scope of the DOM element. This is useful
 *    for optimizations such as not running watchers on hidden DOM (that could be detached).
 *
 *  @see https://github.com/angular/angular.js/issues/5301
 *
 */
function addDigestConnector (scope) {
  var disconnect = function () {
    if (this.$root === this) {
      return; // we can't disconnect the root node;
    }
    var parent = this.$parent;
    this.$$disconnected = true;
    // See Scope.$destroy
    if (parent.$$childHead === this) {
      parent.$$childHead = this.$$nextSibling;
    }
    if (parent.$$childTail === this) {
      parent.$$childTail = this.$$prevSibling;
    }
    if (this.$$prevSibling) {
      this.$$prevSibling.$$nextSibling = this.$$nextSibling;
    }
    if (this.$$nextSibling) {
      this.$$nextSibling.$$prevSibling = this.$$prevSibling;
    }
    this.$$nextSibling = this.$$prevSibling = null;
  };
  var reconnect = function () {
    if (this.$root === this) {
      return; // we can't disconnect the root node;
    }
    var child = this;
    if (!child.$$disconnected) {
      return;
    }
    var parent = child.$parent;
    child.$$disconnected = false;
    // See Scope.$new for this logic...
    child.$$prevSibling = parent.$$childTail;
    if (parent.$$childHead) {
      parent.$$childTail.$$nextSibling = child;
      parent.$$childTail = child;
    } else {
      parent.$$childHead = parent.$$childTail = child;
    }
  };

  scope.$disconnect = angular.bind( scope, disconnect );
  scope.$reconnect  = angular.bind( scope, reconnect );

  return scope;
}

/*
 * iterator is a list facade to easily support iteration and accessors
 *
 * @param items Array list which this iterator will enumerate
 * @param reloop Boolean enables iterator to consider the list as an endless reloop
 */
function iterator(items, reloop) {

    reloop = !!reloop;

    var _items = items || [ ];

    // Published API

    return {

      items: getItems,
      count: count,

      hasNext: hasNext,
      inRange: inRange,
      contains: contains,
      indexOf: indexOf,
      itemAt: itemAt,
      findBy: findBy,

      add: add,
      remove: remove,

      first: first,
      last: last,
      next: next,
      previous: previous

    };

    /*
     * Publish copy of the enumerable set
     * @returns {Array|*}
     */
    function getItems() {
      return [].concat(_items);
    }

    /*
     * Determine length of the list
     * @returns {Array.length|*|number}
     */
    function count() {
      return _items.length;
    }

    /*
     * Is the index specified valid
     * @param index
     * @returns {Array.length|*|number|boolean}
     */
    function inRange(index) {
      return _items.length && ( index > -1 ) && (index < _items.length );
    }

    /*
     * Can the iterator proceed to the next item in the list; relative to
     * the specified item.
     *
     * @param tab
     * @returns {Array.length|*|number|boolean}
     */
    function hasNext(tab) {
      return tab ? inRange(indexOf(tab) + 1) : false;
    }

    /*
     * Get item at specified index/position
     * @param index
     * @returns {*}
     */
    function itemAt(index) {
      return inRange(index) ? _items[index] : null;
    }

    /*
     * Find all elements matching the key/value pair
     * otherwise return null
     *
     * @param val
     * @param key
     *
     * @return array
     */
    function findBy(key, val) {

      /*
       * Implement of e6 Array::find()
       * @param list
       * @param callback
       * @returns {*}
       */
      function find(list, callback) {
        var results = [ ];

        angular.forEach(list, function (it, index) {
          var val = callback.apply(null, [it, index, list]);
          if (val) {
            results.push(val);
          }
        });

        return results.length ? results : undefined;
      }

      // Use iterator callback to matches element key value
      // NOTE: searches full prototype chain

      return find(_items, function (el) {
        return ( el[key] == val ) ? el : null;
      });

    }

    /*
     * Add item to list
     * @param it
     * @param index
     * @returns {*}
     */
    function add(it, index) {
      if (!angular.isDefined(index)) {
        index = _items.length;
      }

      _items.splice(index, 0, it);

      return indexOf(it);
    }

    /*
     * Remove it from list...
     * @param it
     */
    function remove(it) {
      _items.splice(indexOf(it), 1);
    }

    /*
     * Get the zero-based index of the target tab
     * @param it
     * @returns {*}
     */
    function indexOf(it) {
      return _items.indexOf(it);
    }

    /*
     * Boolean existence check
     * @param it
     * @returns {boolean}
     */
    function contains(it) {
      return it && (indexOf(it) > -1);
    }

    /*
     * Find the next item
     * @param tab
     * @returns {*}
     */
    function next(it, validate) {

      if (contains(it)) {
        var index = indexOf(it) + 1,
          found = inRange(index) ? _items[ index ] :
            reloop ? first() : null,
          skip = found && validate && !validate(found);

        return skip ? next(found) : found;
      }

      return null;
    }

    /*
     * Find the previous item
     * @param tab
     * @returns {*}
     */
    function previous(it, validate) {

      if (contains(it)) {
        var index = indexOf(it) - 1,
          found = inRange(index) ? _items[ index ] :
            reloop ? last() : null,
          skip = found && validate && !validate(found);

        return skip ? previous(found) : found;
      }

      return null;
    }

    /*
     * Return first item in the list
     * @returns {*}
     */
    function first() {
      return _items.length ? _items[0] : null;
    }

    /*
     * Return last item in the list...
     * @returns {*}
     */
    function last() {
      return _items.length ? _items[_items.length - 1] : null;
    }

}




/**
 * @ngdoc module
 * @name material.components.toast
 * @description
 * Toast
 */
angular.module('material.components.toast', ['material.services.popup'])
  .directive('materialToast', [
    QpToastDirective
  ])
  .factory('$materialToast', [
    '$timeout',
    '$materialPopup',
    QpToastService
  ]);

function QpToastDirective() {
  return {
    restrict: 'E',
    transclude: true,
    template: 
      '<div class="toast-container" ng-transclude>' +
      '</div>'
  };
}

/**
 * @ngdoc service
 * @name $materialToast
 * @module material.components.toast
 */
function QpToastService($timeout, $materialPopup) {
  var recentToast;

  return showToast;

  /**
   * TODO fully document this
   * Supports all options from $materialPopup, in addition to `duration` and `position`
   */
  function showToast(options) {
    options = angular.extend({
      // How long to keep the toast up, milliseconds
      duration: 3000,
      // [unimplemented] Whether to disable swiping
      swipeDisabled: false,
      // Supports any combination of these class names: 'bottom top left right fit'. 
      // Default: 'bottom left'
      position: 'bottom left',

      // Also supports all options from $materialPopup
      transformTemplate: function(template) {
        return '<material-toast>' + template + '</material-toast>';
      }
    }, options || {});

    recentToast && recentToast.then(function(destroyToast) {
      destroyToast();
    });

    recentToast = $materialPopup(options).then(function(toast) {
      function destroy() {
        $timeout.cancel(toast.delay);
        toast.destroy();
      }

      // Controller will be passed a `$hideToast` function
      toast.locals.$hideToast = destroy;

      toast.element.addClass(options.position);
      toast.enter(function() {
        if (options.duration) {
          toast.delay = $timeout(destroy, options.duration);
        }
      });

      return destroy;
    });

    return recentToast;
  }
}

angular.module('material.components.toolbar', [
  'material.components.content'
])
  .directive('materialToolbar', [
    materialToolbarDirective
  ]);

function materialToolbarDirective() {

  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="material-toolbar-inner" ng-transclude></div>'
  };

}

angular.module('material.components.whiteframe', []);

angular.module('material.services.attrBind', [
])
  .factory('$attrBind', [
    '$parse', 
    '$interpolate', 
    MaterialAttrBind 
  ]);

/**
 *  This service allows directives to easily databind attributes to private scope properties.
 *
 * @private
 */
function MaterialAttrBind($parse, $interpolate) {
  var LOCAL_REGEXP = /^\s*([@=&])(\??)\s*(\w*)\s*$/;

  return function (scope, attrs, bindDefinition, bindDefaults) {
    angular.forEach(bindDefinition || {}, function (definition, scopeName) {
      //Adapted from angular.js $compile
      var match = definition.match(LOCAL_REGEXP) || [],
        attrName = match[3] || scopeName,
        mode = match[1], // @, =, or &
        parentGet,
        unWatchFn;

      switch (mode) {
        case '@':   // One-way binding from attribute into scope

          attrs.$observe(attrName, function (value) {
            scope[scopeName] = value;
          });
          attrs.$$observers[attrName].$$scope = scope;

          if (!bypassWithDefaults(attrName, scopeName)) {
            // we trigger an interpolation to ensure
            // the value is there for use immediately
            scope[scopeName] = $interpolate(attrs[attrName])(scope);
          }
          break;

        case '=':   // Two-way binding...

          if (!bypassWithDefaults(attrName, scopeName)) {
            // Immediate evaluation
            scope[scopeName] = (attrs[attrName] === "") ? true : scope.$eval(attrs[attrName]);

            // Data-bind attribute to scope (incoming) and
            // auto-release watcher when scope is destroyed

            unWatchFn = scope.$watch(attrs[attrName], function (value) {
              scope[scopeName] = value;
            });
            scope.$on('$destroy', unWatchFn);
          }

          break;

        case '&':   // execute an attribute-defined expression in the context of the parent scope

          if (!bypassWithDefaults(attrName, scopeName, angular.noop)) {
            /* jshint -W044 */
            if (attrs[attrName] && attrs[attrName].match(RegExp(scopeName + '\(.*?\)'))) {
              throw new Error('& expression binding "' + scopeName + '" looks like it will recursively call "' +
                attrs[attrName] + '" and cause a stack overflow! Please choose a different scopeName.');
            }

            parentGet = $parse(attrs[attrName]);
            scope[scopeName] = function (locals) {
              return parentGet(scope, locals);
            };
          }

          break;
      }
    });

    /**
     * Optional fallback value if attribute is not specified on element
     * @param scopeName
     */
    function bypassWithDefaults(attrName, scopeName, defaultVal) {
      if (!angular.isDefined(attrs[attrName])) {
        var hasDefault = bindDefaults && bindDefaults.hasOwnProperty(scopeName);
        scope[scopeName] = hasDefault ? bindDefaults[scopeName] : defaultVal;
        return true;
      }
      return false;
    }

  };
}

angular.module('material.services.compiler', [
])
  .service('$materialCompiler', [
    '$q',
    '$http',
    '$injector',
    '$compile',
    '$controller',
    '$templateCache',
    materialCompilerService
  ]);

function materialCompilerService($q, $http, $injector, $compile, $controller, $templateCache) {

  /**
   * @ngdoc service
   * @name $materialCompiler
   * @module material.services.compiler
   *
   * @description
   * The $materialCompiler service is an abstraction of angular's compiler, that allows the developer
   * to easily compile an element with a templateUrl, controller, and locals.
   */

   /**
    * @ngdoc method
    * @name $materialCompiler#compile
    * @param {object} options An options object, with the following properties:
    *
    *    - `controller` â€“ `{(string=|function()=}` â€“ Controller fn that should be associated with
    *      newly created scope or the name of a {@link angular.Module#controller registered
    *      controller} if passed as a string.
    *    - `controllerAs` â€“ `{string=}` â€“ A controller alias name. If present the controller will be
    *      published to scope under the `controllerAs` name.
    *    - `template` â€“ `{string=}` â€“ html template as a string or a function that
    *      returns an html template as a string which should be used by {@link
    *      ngRoute.directive:ngView ngView} or {@link ng.directive:ngInclude ngInclude} directives.
    *      This property takes precedence over `templateUrl`.
    *
    *    - `templateUrl` â€“ `{string=}` â€“ path or function that returns a path to an html
    *      template that should be used by {@link ngRoute.directive:ngView ngView}.
    *
    *    - `transformTemplate` â€“ `{function=} â€“ a function which can be used to transform
    *      the templateUrl or template provided after it is fetched.  It will be given one
    *      parameter, the template, and should return a transformed template.
    *
    *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
    *      be injected into the controller. If any of these dependencies are promises, the compiler
    *      will wait for them all to be resolved or one to be rejected before the controller is
    *      instantiated.
    *
    *      - `key` â€“ `{string}`: a name of a dependency to be injected into the controller.
    *      - `factory` - `{string|function}`: If `string` then it is an alias for a service.
    *        Otherwise if function, then it is {@link api/AUTO.$injector#invoke injected}
    *        and the return value is treated as the dependency. If the result is a promise, it is
    *        resolved before its value is injected into the controller.
    *
    * @returns {object=} promise A promsie which will be resolved with a `compileData` object,
    * with the following properties:
    *
    *   - `{element}` â€“ `element` â€“ an uncompiled angular element compiled using the provided template.
    *   
    *   - `{function(scope)}`  â€“ `link` â€“ A link function, which, when called, will compile
    *     the elmeent and instantiate options.controller.
    *
    *   - `{object}` â€“ `locals` â€“ The locals which will be passed into the controller once `link` is
    *     called.
    *
    * @usage
    * $materialCompiler.compile({
    *   templateUrl: 'modal.html',
    *   controller: 'ModalCtrl',
    *   locals: {
    *     modal: myModalInstance;
    *   }
    * }).then(function(compileData) {
    *   compileData.element; // modal.html's template in an element
    *   compileData.link(myScope); //attach controller & scope to element
    * });
    */
  this.compile = function(options) {
    var templateUrl = options.templateUrl;
    var template = options.template || '';
    var controller = options.controller;
    var controllerAs = options.controllerAs;
    var resolve = options.resolve || {};
    var locals = options.locals || {};
    var transformTemplate = options.transformTemplate || angular.identity;

    // Take resolve values and invoke them.  
    // Resolves can either be a string (value: 'MyRegisteredAngularConst'),
    // or an invokable 'factory' of sorts: (value: function ValueGetter($dependency) {})
    angular.forEach(resolve, function(value, key) {
      if (angular.isString(value)) {
        resolve[key] = $injector.get(value);
      } else {
        resolve[key] = $injector.invoke(value);
      }
    });
    //Add the locals, which are just straight values to inject
    //eg locals: { three: 3 }, will inject three into the controller
    angular.extend(resolve, locals);

    if (templateUrl) {
      resolve.$template = $http.get(templateUrl, {cache: $templateCache})
        .then(function(response) {
          return response.data;
        });
    } else {
      resolve.$template = $q.when(template);
    }

    // Wait for all the resolves to finish if they are promises
    return $q.all(resolve).then(function(locals) {

      var template = transformTemplate(locals.$template);
      var element = angular.element('<div>').html(template).contents();
      var linkFn = $compile(element);

      //Return a linking function that can be used later when the element is ready
      return {
        locals: locals,
        element: element,
        link: function link(scope) {
          locals.$scope = scope;

          //Instantiate controller if it exists, because we have scope
          if (controller) {
            var ctrl = $controller(controller, locals);
            //See angular-route source for this logic
            element.data('$ngControllerController', ctrl);
            element.children().data('$ngControllerController', ctrl);

            if (controllerAs) {
              scope[controllerAs] = ctrl;
            }
          }

          return linkFn(scope);
        }
      };
    });
  };
}

angular.module('material.services.popup', [
  'material.services.compiler'
])
  .factory('$materialPopup', [
    '$materialCompiler',
    '$animate',
    '$rootScope',
    '$rootElement',
    PopupFactory
  ]);

function PopupFactory($materialCompiler, $animate, $rootScope, $rootElement) {

  return createPopup;

  function createPopup(options) {
    var appendTo = options.appendTo || $rootElement;
    var scope = (options.scope || $rootScope).$new(true);

    return $materialCompiler.compile(options).then(function(compileData) {
      var self;

      return self = angular.extend({
        enter: enter,
        destroy: destroy,
        scope: scope
      }, compileData);

      function enter(done) {
        var after = appendTo[0].lastElementChild;
        $animate.enter(self.element, appendTo, after && angular.element(after), done);

        //On the first enter, compile the element
        if (!self.compiled) {
          compileData.link(scope);
          self.compiled = true;
        }
      }
      function destroy(done) {
        $animate.leave(self.element, function() {
          scope.$destroy();
          (done || angular.noop)();
        });
      }
    });
  }
}

/**
 * Adapted from ui.bootstrap.position
 * https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js
 * https://github.com/angular-ui/bootstrap/blob/master/LICENSE
 */

angular.module('material.services.position', [])
  .factory('$position', [
    '$document', 
    '$window', 
    MaterialPositionService
  ]);

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
function MaterialPositionService($document, $window) {
  function getStyle(el, cssprop) {
    if (el.currentStyle) { //IE
      return el.currentStyle[cssprop];
    } else if ($window.getComputedStyle) {
      return $window.getComputedStyle(el)[cssprop];
    }
    // finally try and get inline style
    return el.style[cssprop];
  }

  /**
   * Checks if a given element is statically positioned
   * @param element - raw DOM element
   */
  function isStaticPositioned(element) {
    return (getStyle(element, 'position') || 'static' ) === 'static';
  }

  /**
   * returns the closest, non-statically positioned parentOffset of a given element
   * @param element
   */
  var parentOffsetEl = function (element) {
    var docDomEl = $document[0];
    var offsetParent = element.offsetParent || docDomEl;
    while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || docDomEl;
  };

  return {
    /**
     * Provides read-only equivalent of jQuery's position function:
     * http://api.jquery.com/position/
     */
    position: function (element) {
      var elBCR = this.offset(element);
      var offsetParentBCR = { top: 0, left: 0 };
      var offsetParentEl = parentOffsetEl(element[0]);
      if (offsetParentEl != $document[0]) {
        offsetParentBCR = this.offset(angular.element(offsetParentEl));
        offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
        offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
      }

      var boundingClientRect = element[0].getBoundingClientRect();
      return {
        width: boundingClientRect.width || element.prop('offsetWidth'),
        height: boundingClientRect.height || element.prop('offsetHeight'),
        top: elBCR.top - offsetParentBCR.top,
        left: elBCR.left - offsetParentBCR.left
      };
    },

    /**
     * Provides read-only equivalent of jQuery's offset function:
     * http://api.jquery.com/offset/
     */
    offset: function (element) {
      var boundingClientRect = element[0].getBoundingClientRect();
      return {
        width: boundingClientRect.width || element.prop('offsetWidth'),
        height: boundingClientRect.height || element.prop('offsetHeight'),
        top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
        left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
      };
    },

    /**
     * Provides coordinates for the targetEl in relation to hostEl
     */
    positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

      var positionStrParts = positionStr.split('-');
      var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

      var hostElPos,
      targetElWidth,
      targetElHeight,
      targetElPos;

      hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

      targetElWidth = targetEl.prop('offsetWidth');
      targetElHeight = targetEl.prop('offsetHeight');

      var shiftWidth = {
        center: function () {
          return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
        },
        left: function () {
          return hostElPos.left;
        },
        right: function () {
          return hostElPos.left + hostElPos.width;
        }
      };

      var shiftHeight = {
        center: function () {
          return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
        },
        top: function () {
          return hostElPos.top;
        },
        bottom: function () {
          return hostElPos.top + hostElPos.height;
        }
      };

      switch (pos0) {
        case 'right':
          targetElPos = {
          top: shiftHeight[pos1](),
          left: shiftWidth[pos0]()
        };
        break;
        case 'left':
          targetElPos = {
          top: shiftHeight[pos1](),
          left: hostElPos.left - targetElWidth
        };
        break;
        case 'bottom':
          targetElPos = {
          top: shiftHeight[pos0](),
          left: shiftWidth[pos1]()
        };
        break;
        default:
          targetElPos = {
          top: shiftHeight[pos0](),
          left: shiftWidth[pos1]()
        };
        break;
      }

      return targetElPos;
    }
  };
}

/**
 * @ngdoc overview
 * @name material.services.registry
 *
 * @description
 * A component registry system for accessing various component instances in an app.
 */
angular.module('material.services.registry', [
])
  .factory('$materialComponentRegistry', [
    '$log', 
    materialComponentRegistry 
  ]);

/**
 * @ngdoc service
 * @name material.services.registry.service:$materialComponentRegistry
 *
 * @description
 * $materialComponentRegistry enables the user to interact with multiple instances of
 * certain complex components in a running app.
 */
function materialComponentRegistry($log) {
  var instances = [];

  return {
    /**
     * Used to print an error when an instance for a handle isn't found.
     */
    notFoundError: function(handle) {
      $log.error('No instance found for handle', handle);
    },
    /**
     * Return all registered instances as an array.
     */
    getInstances: function() {
      return instances;
    },

    /**
     * Get a registered instance.
     * @param handle the String handle to look up for a registered instance.
     */
    get: function(handle) {
      var i, j, instance;
      for(i = 0, j = instances.length; i < j; i++) {
        instance = instances[i];
        if(instance.$$materialHandle === handle) {
          return instance;
        }
      }
      return null;
    },

    /**
     * Register an instance.
     * @param instance the instance to register
     * @param handle the handle to identify the instance under.
     */
    register: function(instance, handle) {
      instance.$$materialHandle = handle;
      instances.push(instance);

      return function deregister() {
        var index = instances.indexOf(instance);
        if (index !== -1) {
          instances.splice(index, 1);
        }
      };
    },
  }
}


angular.module('material.services.throttle', [
])
  .factory('$throttle', [
    '$timeout',
    '$$q',
    '$log', 
    MaterialThrottleService
  ]);
  /**
   *   var ripple, watchMouse,
   *       parent = element.parent(),
   *       makeRipple = $throttle({
   *         start : function() {
   *           ripple = ripple || $materialEffects.inkRipple( element[0], options );
   *           watchMouse = watchMouse || buildMouseWatcher(parent, makeRipple);
   *           // Ripples start with mouseDow (or taps)
   *           parent.on('mousedown', makeRipple);
   *         },
   *         throttle : function(e, done) {
   *           if ( effectAllowed() )
   *           {
   *             switch(e.type)
   *             {
   *               case 'mousedown' :
   *                 watchMouse(true);
   *                 ripple.createAt( options.forceToCenter ? null : localToCanvas(e) );
   *                 break;
   *               default:
   *                 watchMouse(false);
   *                 ripple.draw( localToCanvas(e) );
   *                 break;
   *             }
   *           } else {
   *             done();
   *           }
   *         },
   *         end : function() {
   *           watchMouse(false);
   *         }
   *       });
   *
   *   makeRipple();
   *
   */
function MaterialThrottleService($timeout, $$q, $log) {

  var STATE_READY= 0, STATE_START=1, STATE_THROTTLE=2, STATE_END=3;

  return function( config ){
    return function( done, otherwise ){
      return buildInstance( angular.extend({}, config), done || angular.noop, otherwise || angular.noop );
    };
  };

  function buildInstance( phases, done, otherwise ) {
    var pendingActions = [ ],
        cancel = angular.noop,
        state = STATE_READY;

    // Defer the call to the start function ... so `throttle` reference can be returned...
    $timeout(function(){
      start().then(function(){
         if ( phases.throttle === null ) {
           end();
         }
      });
    },0,false);

    return throttle;

    /**
     * Facade function that validates throttler
     * state BEFORE processing the `throttle` request.
     */
    function throttle( data, done ) {

      if ( state != STATE_THROTTLE ) {
          cacheRquest();
      }

      switch( state )
      {
        case STATE_READY :
          start();
          break;

        case STATE_START:
          break;

        // Proxy throttle call to custom, user-defined throttle handler
        case STATE_THROTTLE:
          invokeThrottleHandler(data, done);
          break;

        case STATE_END :
          restart();
          break;
      }

      // **********************************************************
      // Internal Methods
      // **********************************************************

      /**
       *  Cache for later submission to 'throttle()'
       */
      function cacheRquest() {
        pendingActions.push({ data:data, done:done });
      }

      /**
       * Delegate to the custom throttle function...
       * When CTF reports complete, then proceed to the `end` state
       *
       * @param data  Data to be delegated to the throttle function
       * @param done  Callback when all throttle actions have completed
       */
      function invokeThrottleHandler(data, done) {

        if ( angular.isFunction(phases.throttle) ) {
          done = done || angular.noop;

          try {

            phases.throttle.apply( null, [data, function(response) {
              done.apply( null, [response] );
              end();
            }]);

          } catch( error ) {
            // Report error... and end()

            otherwise(error);
            end();
          }

        } else {
          end();
        }
      }
    }


    /**
     * Initiate the async `start` phase of the Throttler
     * @returns {*} promise
     */
    function start() {
      return gotoState.apply(null, [ STATE_START, phases.start ] )
                      .then( feedPendingActions, otherwise );

      /**
       * Process all pending actions (if any)
       */
      function feedPendingActions( response ) {
        logResponse(response);

        state = STATE_THROTTLE;

        angular.forEach(pendingActions, function (it) {
          throttle( it.data, function(response) {
            logResponse(response);

            if ( angular.isFunction(it.done) ) {
              it.done(response);
            }
          });
        });

        pendingActions = [ ];
      }
    }

    /**
     * Initiate the async `end` phase of the Throttler
     * @returns {*} promise
     */
    function end() {

      return gotoState.apply(null,[ STATE_END, phases.end ])
                      .then( finish, otherwise );

      /**
       * Mark throttle as ready to start... and announce completion
       * of the current activity cycle
       */
      function finish( response ) {
        logResponse(response);

        if ( state == STATE_END ){
          state = STATE_READY;
          done();
        }
      }

    }

    /**
     * Cancel any `end` process and restart state machine processes
     */
    function restart() {
      try {

        if ( !angular.isFunction(cancel) ) {
          cancel = angular.noop;
        }

        cancel();
        state = STATE_READY;

      } finally {

        start();
      }
    }

    /**
     * Change to next state and call the state function associated with that state...
     * @param nextState
     * @param targetFn
     * @returns {*}
     */
    function gotoState( nextState , targetFn  )
    {

      var dfd = $$q.defer(),
          hasFn = angular.isFunction(targetFn),
          goNext = hasFn && (targetFn.length < 1),
          fn = hasFn ? targetFn : resolved;

      try {

        state = nextState;

        cancel = fn.apply( null, [
          goNext ? resolved(dfd) :
          hasFn ? callbackToResolve(dfd) : dfd
        ]);

      } catch( error ) {
        dfd.reject( error );
      }

      return dfd.promise;
    }

  }

  // **********************************************************
  // Internal Methods
  // **********************************************************

  /**
   * Create callback function that will resolve the specified deferred.
   * @param dfd
   * @returns {Function}
   */
  function callbackToResolve( dfd )
  {
    return function(response){
      dfd.resolve.apply(null, [response ]);
    };
  }

  /**
   * Prepare fallback promise for start, end, throttle phases of the Throttler
   * @param dfd
   * @returns {*}
   */
  function resolved(dfd)
  {
    dfd = dfd || $$q.defer();
    dfd.resolve.apply(null, arguments.length > 1 ? [].slice.call(arguments,1) : [ ]);

    return dfd.promise;
  }

  function logResponse(response)
  {
    if ( angular.isDefined(response) ) {
      $log.debug(response);
    }
  }
}

})();