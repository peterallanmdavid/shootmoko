var  Router = ReactRouter
	,Route = ReactRouter.Route
	,Routes = ReactRouter.Routes
	,DefaultRoute = ReactRouter.DefaultRoute
	,Link = ReactRouter.Link
	,RouteHandler = ReactRouter.RouteHandler;

var routes = (  
    <Route name="app" path="/" handler={ShootmokoApp}>      
       <Route name="photoglist" handler={PhotogList}/>
       <Route name="tmpholder" handler={TmpHolder}/>  
       <Route name="login" handler={LoginForm}/>
       <Route name="register" handler={RegistrationForm}/>
       <Route name="uploadphotos" handler={UploadForm}/>    
       <Route name="photogprofile" handler={PhotogProfile}/>     
       <DefaultRoute handler={Home} />
    </Route>
);

//React.render(routes, document.getElementById('smkbody'));
Router.run(routes, function (Handler) {  
  React.render(<Handler />, document.getElementById('smkbody'));
});

