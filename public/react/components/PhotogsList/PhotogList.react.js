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
                portfolioCount: 45
              },
              {
                userId : 002,
                name: 'Aldee Paul',
                type: 'Wild Photography',
                level: 'Pro',
                shootCount: 889,
                portfolioCount: 32
              }
            ],
            pBestShots:[]
          });

    },
  render: function() {
    return (     
      <div> 
        <PhotogListModals />
        <PhotogsListContainer items={this.state.pDetails} />
      </div>
    );
  }
});