var TmpHolder = React.createClass({  
  render: function() {
    return (
      <div className="commentBox">
        <h1>Temp Component Holder</h1>        
      </div>
    );
  }
});

React.render(
  <TmpHolder />,
  document.getElementById('content')
);