import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props);
    this.initState = {
      result: '',
      calculation: ''
    };
    this.state = this.initState;
  }

  btnPressed = (text) => {
    if(text ===  'C'){
        this.setState(this.initState);
    }
    else if(text === 'CE'){
        let calculation = this.state.calculation.substring(0, this.state.calculation.length - 1);
        let result = this.getNewResult(calculation);
        this.setState({
          calculation,
          result
        });
    }
    else{
        let calculation =  this.state.calculation + text;
        let result = this.getNewResult(calculation);

        this.setState({
          calculation,
          result
        });
      }
  };

  getNewResult = (calculation) => {
    let result = this.state.result;
    try{
      result = eval(calculation);
    }catch(e)
    {
    }
    return result;
  };

  render() {
    
    let buttonsView = []
    let numsButtonsText = [[1,2,3], [4,5,6], [7,8,9], ['.', 0]]
    for(let subArrayIndex in numsButtonsText){
      let row = []
      for(let elemIndexInSubArray in numsButtonsText[subArrayIndex]){
        row.push(
              <TouchableOpacity style={styles.btn} key={elemIndexInSubArray} onPress={() => {this.btnPressed(numsButtonsText[subArrayIndex][elemIndexInSubArray])}}>
                <Text style={styles.btnTextBlack}>{numsButtonsText[subArrayIndex][elemIndexInSubArray]}</Text>
              </TouchableOpacity>
        );
      }
      buttonsView.push(
        <View style={styles.row} key={subArrayIndex}>
          {row}
        </View>
      );
    } 

    let operationsButtonsText = ['+', '-', '*', '/', '(', ')', 'C', 'CE'];
    let operationsView = []
    for(let elem in operationsButtonsText){
      operationsView.push(
        <TouchableOpacity style={styles.btn} key={elem} onPress={() => {this.btnPressed(operationsButtonsText[elem])}}>
          <Text style={styles.btnTextWhite}>{operationsButtonsText[elem]}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.result}</Text>
        </View>

        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculation}</Text>

        </View>

        <View style={styles.buttons}>

          <View style={styles.numbers}>
            {buttonsView}
          </View>

          <View style={styles.operations}>
            {operationsView}

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  btn:{
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnTextBlack:{
    fontSize: 28,
    color: 'black'
  },
  btnTextWhite:{
    fontSize: 28,
    color: 'white'
  },
  result : { 
    flex: 2,
    backgroundColor: 'lightcoral',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  resultText:{
    fontSize: 38,
    color: 'white'
  },
  calculationText: {
    fontSize: 30,
    color: 'white'

  },
  calculation : { 
    flex: 2,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons : { 
    flex: 6,
    flexDirection: 'row'
  },
  numbers : { 
    flex: 3,
    backgroundColor: 'lemonchiffon'
  },
  operations : {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'darkslategrey'
   },
});
