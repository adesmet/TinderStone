import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';

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
    return <View>
      {this.state.list.map((tuple) => {
        return <Text>{tuple.cardLeft.cardId}</Text>
      })}
    </View>
  }
}

export default List;
