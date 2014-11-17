var userList = [
  {
    "username": "aaaaa",
    "role": "user",
    "usertype": "photographer",
    "photos": [],
    "id": "541272c45217a0d027486f3a"
  },
  {
    "username": "alaa",
    "role": "user",
    "usertype": "photographer",
    "photos": [],
    "id": "541272efbb32b72036858bfc"
  },
  {
    "username": "aldeepaul",
    "role": "user",
    "usertype": "photographer",
    "photos": [],
    "id": "5412745e0ae60748304f05d4"
  },
  {
    "username": "aldee1",
    "role": "user",
    "usertype": "photographer",
    "photos": [],
    "id": "5412b506d99e101022444230"
  },
  {
    "username": "test1",
    "role": "user",
    "usertype": "photographer",
    "photos": [],
    "id": "542a769c891e72e82a6bcdd3"
  }
];


var userInfo = {"username":"test","role":"user","usertype":"photographer","photos":[],"id":"5411580bf7cc05d437e01675"};


var TmpHolder = React.createClass({  
  render: function() {
    return (
      <div className="commentBox">
        <h1>Temp Component Holder</h1>
        <LoginForm />
        <RegistrationForm />        
        <UsersList />
        <UserInfo data={userInfo}/>        
      </div>
    );
  }
});

React.render(
  <TmpHolder />,
  document.getElementById('content')
);