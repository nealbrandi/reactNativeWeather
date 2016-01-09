// Imports
var React = require('react-native');
var {
  AppRegistry,
  MapView,
  StyleSheet,
  Text,
  View
} = React;
var Api = require('./src/api');

// Component Declaration
var weather = React.createClass({

  getInitialState: function() {
    return {
      centerPin: {
        latitude: 0,
        longitude: 0,
      },
      city: '',
      temperature: '',
      description: ''
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <MapView
          annotations={[this.state.centerPin]}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}>
        </MapView>
       <View style={styles.textArea}>
         <Text style={styles.text}>{this.state.city}</Text>
         <Text style={styles.text}>{this.state.temperature}</Text>
         <Text style={styles.text}>{this.state.description}</Text>
       </View>
      </View>
    );
  },

  onRegionChangeComplete: function(region) {
    this.setState({
      centerPin: {
        latitude: region.latitude,
        longitude: region.longitude
      }
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  }
});

// Styles Declarations
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 4,
    marginTop: 30
  },
  textArea: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

// Application Registration
AppRegistry.registerComponent('weather', () => weather);
