var RegistrationForm = React.createClass({  
  handleSubmit: function(e) {
    e.preventDefault();    
  },
  render: function() {
    return (      
      <form className="registrationForm form-signin" onSubmit={this.handleSubmit}>
        <h3>Registration Form</h3>
        <input type="text" placeholder="Username" ref="username" className="form-control"/><br/>
        <input type="text" placeholder="Name" ref="name" className="form-control"/><br/>
        <input type="password" placeholder="Password" ref="password" className="form-control"/><br/>
        <input type="password" placeholder="Confirm Password" ref="confirm_password" className="form-control"/><br/>
        <b>user type</b><br/>
        <input type="checkbox" name="usertype" value="photographer" />Photographer <br/>
        <input type="checkbox" name="usertype" value="client" />Looking for Photographer <br/>
        
        <input type="submit" value="Login" className="btn btn-lg btn-primary btn-block"/>
      </form>
    );
  }
});