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

  handlers = {
      onChange : (e, section) => {
        const { value, id: key } = e.target
        const index = e.target.dataset.idx || 0
      this.setState(prevState => {
        const updatedArray = [...prevState[section]];
        const updatedObject = updatedArray[index];

        updatedObject[key] = {...updatedObject[key], data: value};

        updatedArray[index] = updatedObject;
      }
      )
      },

      onSubmit: (e) => {
        const section = e.target.className;
        const index = e.target.dataset.idx;
        this.setState(prevState => {
          const updatedArray = [...prevState[section]]
          updatedArray.push(section === 'EducationalExperience' ? new EducationEntry() : new JobEntry())
          updatedArray[index]['_edit'] = false;
          return {
            [section]: updatedArray,
          }
        })
      }, 

      onDelete: (index, section) => {
        this.setState(prevState => {
          const updatedArray = [...prevState[section]];
          updatedArray.splice(index, 1);
          return {
            [section]: updatedArray,
          }
        })
      },

      onEdit: (index, section) => {
        this.setState(prevState => {
          const updatedArray = [...prevState[section]];
          updatedArray.forEach(entry => entry._edit = false);
          updatedArray[index]._edit = true;

          return {
            [section]: updatedArray,
          }
        })
      }
    }    

  render(){
    return (
      <div>
        <legend>Personal Information</legend>
        <Form data={this.state.PersonalInformation[0]} section='PersonalInformation' handlers={this.handlers}/>
        <legend>Education</legend>
        {this.state.EducationalExperience.map((entry, index) => {
          return <Form data={entry} section='EducationalExperience' handlers={this.handlers} index={index} key={index}/>
        })}
        <legend>Professional Experiences</legend>
        {this.state.ProfessionalExperience.map((entry, index) => {
          return <Form data={entry} section='ProfessionalExperience' handlers={this.handlers} index={index} key={index}/>
        })}
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
    _edit: true,
  }
};

function JobEntry(){
  return {
    Company: {placeholder: 'Company', data: ''},
    Position: {placeholder: 'Position', data: ''},
    City: {placeholder: 'City', data: ''},
    From: {placeholder: 'From', data: ''},
    To: {placeholder: 'To', data: ''},
    _edit: true,
  }
}