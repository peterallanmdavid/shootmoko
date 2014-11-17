//component that goes to the upper right (user info)
var UserInfo = React.createClass({    
  render: function() {
    return (      
      <div className="userInfo">
        <h3>UserInfo</h3>
        username: {this.props.data.username} <br />
        usertype: {this.props.data.usertype} <br />
      </div>
    );
  }
});