var RegistrationForm = React.createClass({  
  handleSubmit: function(e) {
    e.preventDefault();    
  },
  render: function() {
    return (      
      <form className="registrationForm" onSubmit={this.handleSubmit}>
        <h3>Registration Form</h3>
        <input type="text" placeholder="Username" ref="username" /><br/>
        <input type="text" placeholder="Name" ref="name" /><br/>
        <input type="password" placeholder="Password" ref="password" /><br/>
        <input type="password" placeholder="Confirm Password" ref="confirm_password" /><br/>
        <b>user type</b><br/>
        <input type="checkbox" name="vehicle" value="Bike" />Photographer <br/>
        <input type="checkbox" name="vehicle" value="Car" />Looking for Photographer <br/>
        
        <input type="submit" value="Login" />
      </form>
    );
  }
});