var routes = (
  <Routes location="history">
    <Route name="app" path="/react" handler={ShootmokoApp}>
      <Route name="inbox" handler={Inbox}/>
      <Route name="calendar" handler={Calendar}/>
      <DefaultRoute handler={Dashboard}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);