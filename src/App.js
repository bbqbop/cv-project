import React, { Component } from 'react';
import { Form } from './Components/Forms';
import { Header, Description, Experience, Education } from './Components/CV';
import './styles.css';

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
        State: {placeholder:'State', data: ''},
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
          return {
            [section]: updatedArray,
          }
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
      <>
        <div className="header"><h1>CV Creator</h1></div>
        <div className="sideBar">
          <div className="personalInformation">
            <legend>Personal Information</legend>
            <Form data={this.state.PersonalInformation[0]} section='PersonalInformation' handlers={this.handlers}/>
          </div>
          <div id='experience' className='section'>
            <legend>Professional Experiences</legend>
            {this.state.ProfessionalExperience.map((entry, index) => {
              return <Form data={entry} section='ProfessionalExperience' handlers={this.handlers} index={index} key={index}/>
            })}
          </div>
          <div id='education' className='section'>
            <legend>Education</legend>
            {this.state.EducationalExperience.map((entry, index) => {
              return <Form data={entry} section='EducationalExperience' handlers={this.handlers} index={index} key={index}/>
            })}
          </div>
        </div>
        
        <div className="body">
          <Header data={this.state.PersonalInformation} />

          <div className="CV_body">
            <Description data={this.state.PersonalInformation[0].Description} />
            <Experience data={this.state.ProfessionalExperience} />
            <Education data={this.state.EducationalExperience} />
          </div>
        </div>
      </>
    )
  }
}

function EducationEntry(){
  return {
    SchoolName: {placeholder: 'School Name', data: ''},
    City: {placeholder: 'City', data: ''},
    Degree: {placeholder: 'Degree', data: ''},
    Subject: {placeholder: 'Subject', data: ''},
    From: {placeholder: 'From', data: ''},
    To: {placeholder: 'To', data: ''},
    _edit: true,
  }
};

function JobEntry(){
  return {
    Position: {placeholder: 'Position', data: ''},
    Company: {placeholder: 'Company', data: ''},
    City: {placeholder: 'City', data: ''},
    From: {placeholder: 'From', data: ''},
    To: {placeholder: 'To', data: ''},
    _edit: true,
  }
}