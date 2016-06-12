import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Navigator, StyleSheet } from 'react-native';
import RandomCombo from './RandomCombo';
import List from './List';
import Detail from './Detail';

import Icon from 'react-native-vector-icons/FontAwesome';


var ROUTES = {
  random: {
    component: RandomCombo,
    backButton: false,
  },
  list: {
    component: List,
    backButton: true,
  },
  detail: {
    component: Detail,
    backButton: true,
  }
};

class TinderStone extends Component {
  renderScene(route, navigator){
      var routeObject = ROUTES[route.name];
      var Component = routeObject.component;

      if(routeObject.backButton){
        return <View style={{flex:1}}>
          <Component route={route} navigator={navigator}/>
          <View style={{padding: 10, position: 'absolute', bottom : 0, left: 0, backgroundColor: 'white'}}>
            <TouchableHighlight
              overlayColor='#FFFFFF'
              onPress={() => navigator.pop()}>
                <Icon name="arrow-left" size={50} color="black" />
            </TouchableHighlight>
          </View>
        </View>
      }else{
        return <Component route={route} navigator={navigator}/>
      }
    }

  render(){
    return <Navigator
      style={styles.container}
      initialRoute={{name: 'random'}}
      renderScene={this.renderScene}
      configureScene={() => Navigator.SceneConfigs.FloatFromRight}/>
  }
}

export default TinderStone;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
