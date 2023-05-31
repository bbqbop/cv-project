import React, { useState } from 'react';
import { Form } from './Components/Forms';
import { Header, Description, Experience, Education } from './Components/CV';
import './styles.css';

const App = () => {
    const [state, setState] = useState({
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
    }) 

  const handlers = {
      onChange : (e, section) => {
        const { value, id: key } = e.target
        const index = e.target.dataset.idx || 0
        setState(prevState => {
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
        setState(prevState => {
          const updatedArray = [...prevState[section]]
          updatedArray.push(section === 'EducationalExperience' ? new EducationEntry() : new JobEntry())
          updatedArray[index]['_edit'] = false;
          return {
            [section]: updatedArray,
          }
        })
      }, 

      onDelete: (index, section) => {
        setState(prevState => {
          const updatedArray = [...prevState[section]];
          updatedArray.splice(index, 1);
          return {
            [section]: updatedArray,
          }
        })
      },

      onEdit: (index, section) => {
        setState(prevState => {
          const updatedArray = [...prevState[section]];
          updatedArray.forEach(entry => entry._edit = false);
          updatedArray[index]._edit = true;

          return {
            [section]: updatedArray,
          }
        })
      }
    }

  return (
    <>
      <div className="header"><h1>CV Creator</h1></div>
      <div className="sideBar">
        <div className="personalInformation">
          <legend>Personal Information</legend>
          <Form data={state.PersonalInformation[0]} section='PersonalInformation' handlers={handlers}/>
        </div>
        <div id='experience' className='section'>
          <legend>Professional Experiences</legend>
          {state.ProfessionalExperience.map((entry, index) => {
            return <Form data={entry} section='ProfessionalExperience' handlers={handlers} index={index} key={index}/>
          })}
        </div>
        <div id='education' className='section'>
          <legend>Education</legend>
          {state.EducationalExperience.map((entry, index) => {
            return <Form data={entry} section='EducationalExperience' handlers={handlers} index={index} key={index}/>
          })}
        </div>
      </div>
      
      <div className="body">
        <Header data={state.PersonalInformation} />

        <div className="CV_body">
          <Description data={state.PersonalInformation[0].Description} />
          <Experience data={state.ProfessionalExperience} />
          <Education data={state.EducationalExperience} />
        </div>
      </div>
    </>
  ) 
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

export default App;