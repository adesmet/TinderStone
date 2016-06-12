import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';


class List extends Component {
  constructor(){
    super();
    this.state={
      list: []
    }
  }

  async componentWillMount(){
    var list = JSON.parse(await AsyncStorage.getItem('list'));

    this.setState({list});
  }

  render(){
    return <View style={{flexDirection: 'row', flex:1}}>
      <ScrollView style={{flex: 1}}>
        {this.state.list.filter((_, index) => index%2 == 0).map((tuple) => {
          return this.renderTuple(tuple);
        })}
      </ScrollView>
      <ScrollView style={{flex:1}}>
        {this.state.list.filter((_, index) => index%2).map((tuple) => {
          return this.renderTuple(tuple);
        })}
      </ScrollView>
    </View>
  }

  renderTuple(tuple){
    return <View style={{flexDirection: 'row', flex:1}} key={tuple.cardLeft.cardId+tuple.cardRight.cardId}>
      <Image
        indicator={ProgressBar}
        style={styles.card}
        source={{uri: tuple.cardLeft.img}}/>
      <Image
        indicator={ProgressBar}
        style={styles.card}
        source={{uri: tuple.cardRight.img}}/>
      <View style={{flex:1, alignItems:'center'}}>
        <View style={{flex:1}}/>
        <TouchableHighlight onPress={()=>{
          let newList = this.state.list.filter((item) => !(item.cardLeft.cardId == tuple.cardLeft.cardId && item.cardRight.cardId == tuple.cardRight.cardId))
          this.setState({list:newList});
          AsyncStorage.setItem('list', JSON.stringify(newList));}}>
          <Icon name="trash" size={40} color="red"/>
        </TouchableHighlight>
        <View style={{flex:1}}/>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  card: {
    width: 100,
    height: 132
  }
});

export default List;
