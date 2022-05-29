import { useState } from 'react'
import React from 'react'
import logo from './logo.svg'
import './App.css'

class GetGender extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value: 'Enter name...'};
    this.gender = 'Result will show after sending name';

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();    

    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=` + this.state.value;
    
    const result = fetch(url)
    .then(response => response.json())
    .then(json => {
      this.setState({value: json.gender});
      return this.gender = json.gender;
    });

  }
  

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <TextInput 
          className = "input"
          inputType = "text"
          placeholder = "type name..."
          handleChange = {this.handleChange}  
        />
        <Button
          className = "button"
          buttonValue = "get gender info"
          handleSubmit = {this.handleSubmit}
        />
      </form>
      <Result gender = {this.gender} />
    </div>
    );
  }

}

function Result(props) {
  return (
    <p className="result__Title">Результат: {props.gender} </p>    
  );
}

function Button(props){
  return (
    <input className = {props.className} type="submit" value={props.buttonValue} onSubmit = {props.handleSubmit} />
  );
}

function TextInput(props){
  return (
    <input className = {props.className} type = {props.inputType} placeholder = {props.placeholder} onChange = {props.handleChange} />
  );
}



function App() {

return (
  <div>
    <GetGender />
  </div>
);

}

export default App
