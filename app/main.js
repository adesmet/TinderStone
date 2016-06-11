import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class TinderStone extends Component {
  constructor(){
    super();
    this.state = {
      cards: [],
      randomCardLeft: {},
      randomCardRight: {}
    }

    this.randomize = this.randomize.bind(this);
    this.save = this.save.bind(this);
  }

  async componentWillMount(){
    var validCards = JSON.parse(await AsyncStorage.getItem('validCards'));

    if(!validCards){
      var cards = await fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/Basic', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Mashape-Key': 'PEf9uWxXX0mshDcbhNGEZYSZCtiTp1iFrizjsnE6MAlLkFma1e'
        }
      }).then((response) => response.json())

      validCards = cards.filter((card) => card.imgGold != null);

      AsyncStorage.setItem('validCards', JSON.stringify(validCards));
    }

    this.setState({cards: validCards});
    this.randomize();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', flex:1}}>
          <Image
            style={{width: 200, height: 265}}
            source={{uri: this.state.randomCardLeft.imgGold}}/>
          <Image
            style={{width: 200, height: 265}}
            source={{uri: this.state.randomCardRight.imgGold}}
            defaultSource={require('./spinner.gif')}/>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
          <TouchableHighlight onPress={this.randomize}>
            <Icon name="times" size={80} color="red" />
          </TouchableHighlight>
          <View style={styles.container}>
            <TouchableHighlight onPress={this.save}>
              <Icon name="list" size={40} color="black"/>
            </TouchableHighlight>
          </View>
          <TouchableHighlight onPress={this.save}>
            <Icon name="check" size={80} color="green"/>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  randomize(){
    var validCards = this.state.cards;
    var randomCardLeft = validCards[Math.floor(Math.random()*validCards.length)];
    var randomCardRight = validCards[Math.floor(Math.random()*validCards.length)];

    this.setState({randomCardLeft, randomCardRight});
  }

  save(){


    this.randomize();
  }
}

export default TinderStone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgLeft: {
    flex: 1
  }
});
