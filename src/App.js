import React, { Component } from 'react';
import { Form } from './Components/Forms'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      PersonalInformation: [{
        FirstName: {placeholder: 'First Name', data: ''},
        LastName: {placeholder: 'Last Name', data: ''},
        Title: {placeholder:'Title', data: ''}, 
        Address: {placeholder:'Address', data: ''},
        City: {placeholder:'City', data: ''},
        ZipCode: {placeholder:'Zip Code', data: ''},
        Country: {placeholder:'Country', data: ''},
        Email: {placeholder:'Email', data: ''},
        PhoneNumber: {placeholder:'Phone Number', data: ''},
        Description: {placeholder:'Description', data: ''},
      }],
      EducationalExperience: [new EducationEntry()],
      ProfessionalExperience: [new JobEntry()],
    }
  } 

  onChange = (e, subFolder, index = 0) => {
    const { value, id } = e.target
   this.setState(prevState => {
    const updatedArray = [...prevState[subFolder]];
    const updatedObject = updatedArray[index];

    updatedObject[id] = {...updatedObject[id], data: value};

    updatedArray[index] = updatedObject;
   }
   )
   console.log(this.state)
  }

  render(){
    return (
      <div>
        <Form data={this.state.PersonalInformation[0]} onChange={this.onChange} section='PersonalInformation' />
        <Form data={this.state.EducationalExperience[0]} onChange={this.onChange} section='EducationalExperience' />
        <Form data={this.state.ProfessionalExperience[0]} onChange={this.onChange} section='ProfessionalExperience' />

      </div>
    )
  }
}

function EducationEntry(){
  return {
    SchoolName: {placeholder: 'School Name', data: ''},
    TitleOfStudy: {placeholder: 'Title of Study', data: ''},
    Degree: {placeholder: 'Degree', data: ''},
    From: {placeholder: 'From', data: ''},
    To: {placeholder: 'To', data: ''},
  }
};

function JobEntry(){
  return {
    Position: {placeholder: 'Position', data: ''},
    Company: {placeholder: 'Company', data: ''},
    City: {placeholder: 'City', data: ''},
    From: {placeholder: 'From', data: ''},
    To: {placeholder: 'To', data: ''},
  }
}