 var PhotogList = React.createClass({  
  getInitialState: function() {
        return ({
            pDetails: [
              {
                userId : 001,
                name: 'Peter Allan David',
                type: 'Wedding Photography',
                level: 'Newbee',
                shootCount: 35
              },
              {
                userId : 002,
                name: 'Aldee Paul',
                type: 'Wild Photography',
                level: 'Pro',
                shootCount: 889
              }
            ] });
    },
  render: function() {
    return (     
      <div> 
        <PhotogsListContainer items={this.state.pDetails} />
      </div>
    );
  }
});