var LoginForm = React.createClass({  
  handleSubmit: function(e) {
    e.preventDefault();    
  },
  render: function() {
    return (            
        <form className="loginForm form-signin" onSubmit={this.handleSubmit} role="form">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label for="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <span>New user? Click <Link to="register">HERE</Link> to register</span>
        </form>      
    );
  }
});