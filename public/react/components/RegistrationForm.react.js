var RegistrationForm = React.createClass({ 
  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({ registermsg: "" });    
    var validationResult = this.validateform();
    if(validationResult.result){
      var postdata = {
        username: this.refs.username.getDOMNode().value,
        password: this.refs.password.getDOMNode().value,
        usertype: this.refs.usertype.getDOMNode().value
      };
      $.ajax({
        //url: this.props.url,
        url: '/api/register',
        dataType: 'json',
        type: 'POST',
        data: postdata,
        success: function(data) {
          if(data.success){
            this.setState({ registermsg: "Registration successfull " + JSON.stringify(data) });
            this.refs.username.getDOMNode().value = '';
            this.refs.name.getDOMNode().value = '';
            this.refs.password.getDOMNode().value = '';
            this.refs.confirm_password.getDOMNode().value = '';
            this.refs.usertype.getDOMNode().value = '';  
          }else{
            this.setState({ registermsg: "Registration error: " + data.msg.message });
          }
          
        }.bind(this),
        error: function(xhr, status, err) {          
          this.setState({ registermsg: "Registration error " + err.toString() });
        }.bind(this)
      });
      
    }else{
      this.setState({ registermsg: validationResult.msg });    
    }
  },
  getInitialState: function(){
    return { registermsg: "" };
  },

  validateform: function(){
    var ret = {result: true, msg: ""};
    if(this.refs.password.getDOMNode().value !== this.refs.confirm_password.getDOMNode().value){      
      ret.result = false;      
      ret.msg = "Password does not match";
      return ret;
    };

  if(this.refs.username.getDOMNode().value == "" || this.refs.name.getDOMNode().value == "" || this.refs.password.getDOMNode().value == ""){      
      ret.result = false;      
      ret.msg = "Missing fields";
      return ret;
  };

    return ret;
  },
  render: function() {
    return (      
      <form className="registrationForm form-signin" onSubmit={this.handleSubmit}>        
        <h3>Registration Form</h3>
        <div>{this.state.registermsg}</div>
        <input type="text" placeholder="Username" ref="username" className="form-control"/><br/>
        <input type="text" placeholder="Name" ref="name" className="form-control"/><br/>
        <input type="password" placeholder="Password" ref="password" className="form-control"/><br/>
        <input type="password" placeholder="Confirm Password" ref="confirm_password" className="form-control"/><br/>
        <b>user type</b><br/>
        <input type="radio" name="usertype" value="photographer" ref="usertype" />Photographer <br/>
        <input type="radio" name="usertype" value="client" ref="usertype" />Looking for Photographer <br/>        
        <input type="submit" value="Sign Up" className="btn btn-lg btn-primary btn-block" ref="signupbutton"/>
      </form>
    );
  }
});