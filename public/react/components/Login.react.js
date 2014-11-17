var LoginForm = React.createClass({  
  handleSubmit: function(e) {
    e.preventDefault();    
  },
  render: function() {
    return (      
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <h3>LoginForm</h3>
        <input type="text" placeholder="Username" ref="username" />
        <input type="password" placeholder="Password" ref="password" />
        <input type="submit" value="Login" />
      </form>
    );
  }
});