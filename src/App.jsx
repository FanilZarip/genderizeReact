import { useState } from 'react'
import React from 'react'
import logo from './logo.svg'
import './App.css'

class GetGender extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: 'Enter name...',
      gender: 'Result will show after sending name',
      isEmptyInput: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.serverUrl = 'https://api.genderize.io';
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleBlur(event) {
    this.setState({isEmptyInput: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getGenderInfo();    
  }
  
  getGenderInfo() {

    const isEmptyInput = this.state.value.trim().length === 0;
    const url = `${this.serverUrl}?name=` + this.state.value.trim(); 

    if (isEmptyInput) {
      this.setState({isEmptyInput: true});
      return;
    }

    try {
      const result = fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({gender: json.gender});
      });
    } catch (error) {
      console.log(error);
    }
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
          handleBlur = {this.handleBlur}
        />
        <Button
          className = "button"
          buttonValue = "get gender info"
          handleSubmit = {this.handleSubmit}
        />
      </form>
      <ErrorMessage
        errorCondition = {this.state.isEmptyInput}
        errorMessage = "Input value can not be Empty"
      />
      <ErrorMessage
        errorCondition = {this.state.value.length <= 2}
        errorMessage = "Enter more than 2 symbols"
      />
      <Result 
        gender = {this.state.gender}  
      />
    </div>
    );
  }

}

function ErrorMessage(props) {

  if (props.errorCondition) {
    return (
      <p className="error_message">
        {props.errorMessage}
    </p>
    )
  }

  null;

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
    <input className = {props.className} type = {props.inputType} placeholder = {props.placeholder} value = {props.value} onChange = {props.handleChange} onBlur = {props.handleBlur} />
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
