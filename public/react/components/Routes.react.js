var Router = ReactRouter;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;

var routes = (  
    <Route name="app" path="/" handler={ShootmokoApp}>      
       <Route name="PhotogList" handler={PhotogList}/>
       <Route name="TmpHolder" handler={TmpHolder}/>  
       <DefaultRoute handler={Home} />
    </Route>
);

//React.render(routes, document.getElementById('smkbody'));
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('smkbody'));
});

