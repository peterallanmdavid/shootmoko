 var PhotogList = React.createClass({  
  getInitialState: function() {
        return ({
            pDetails: [
              {
                userId : 001,
                name: 'Peter Allan David',
                type: 'Wedding Photography',
                level: 'Newbee',
                shootCount: 35,
                profilePicUrl: "/images/portfolio_list/pete.jpg",
                location: "Cavite",
                status: "offline",
                portfolioCount: 45
              },
              {
                userId : 002,
                name: 'Aldee Paul',
                type: 'Wild Photography',
                level: 'Pro',
                shootCount: 889,
                profilePicUrl: "/images/portfolio_list/aldee.jpg",
                location: "Mandaluyong",
                status: "offline",
                portfolioCount: 32
              }
            ],
            pBestShots:[]
          });

    },
  render: function() {
    return (     
      <div> 
        <PhotogsListContainer items={this.state.pDetails} />
      </div>
    );
  }
});