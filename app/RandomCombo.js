import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

class RandomCombo extends Component {
  constructor(){
    super();
    this.state = {
      cards: [],
      cardLeft: {},
      cardRight: {},
      lockedRightImage: false,
      lockedLeftImage: false
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
    console.log('rendering', this.props)
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', flex:1}}>
          <TouchableHighlight onPress={() => {this.setState({lockedLeftImage: !this.state.lockedLeftImage})}}>
            <Image
              indicator={ProgressBar}
              style={styles.card}
              source={{uri: this.state.lockedLeftImage ? this.state.cardLeft.imgGold : this.state.cardLeft.img}}/>
            </TouchableHighlight>
          <TouchableHighlight onPress={() => {this.setState({lockedRightImage: !this.state.lockedRightImage})}}>
            <Image
              indicator={ProgressBar}
              style={styles.card}
              source={{uri: this.state.lockedRightImage ? this.state.cardRight.imgGold : this.state.cardRight.img}}/>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
          <TouchableHighlight onPress={this.randomize} underlayColor='grey'>
            <Icon name="times" size={80} color="red" />
          </TouchableHighlight>
          <View style={styles.container}>
            <TouchableHighlight onPress={() => this.props.navigator.push({name: 'list'})} underlayColor='grey'>
              <Icon name="list" size={40} color="black"/>
            </TouchableHighlight>
          </View>
          <TouchableHighlight onPress={this.save} underlayColor='grey'>
            <Icon name="check" size={80} color="green"/>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  randomize(){
    var validCards = this.state.cards;
    var cardLeft = this.state.lockedLeftImage ? this.state.cardLeft : validCards[Math.floor(Math.random()*validCards.length)];
    var cardRight = this.state.lockedRightImage ? this.state.cardRight : validCards[Math.floor(Math.random()*validCards.length)];

    this.setState({cardLeft, cardRight});
  }

  async save(){
    var currentList = JSON.parse(await AsyncStorage.getItem('list'));
    if(!currentList || Object.prototype.toString.call(currentList) !== '[object Array]'){currentList = []}

    let {cardLeft, cardRight} = this.state;
    currentList.push({cardLeft, cardRight, created: new Date()});
    await AsyncStorage.setItem('list', JSON.stringify(currentList));

    this.randomize();
  }
}

export default RandomCombo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  card: {
    width: 200,
    height: 265
  }
});
