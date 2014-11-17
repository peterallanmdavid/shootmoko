 var PhotogList = React.createClass({  
  getInitialState: function() {
        return ({
            pDetails: [
              {
                userId : 001,
                name: 'Peter Allan David',
                type: 'Wedding Photography',
                level: 'Newbee',
                shootcount: 35
              },
              {
                userId : 002,
                name: 'Aldee Paul',
                type: 'Wild Photography',
                level: 'Pro',
                shootcount: 889
              }
            ],
            title: "Photographer's List"
        });
    },
  render: function() {
    return (     
      <div> 
        <h1>{this.state.title}</h1>
        <PhotogDetails items={this.state.pDetails} />
      </div>
    );
  }
});