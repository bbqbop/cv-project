import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
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
      EducationalExperience: [EducationEntry()],
      ProfessionalExperience: [JobEntry()],
    }) 

  const handlers = {
      onChange : (e, section, id) => {
        const { value, id : key } = e.target
        setState(prevState => {
          const updatedArray = [...prevState[section]];
          const updatedObject = section == 'PersonalInformation' ? updatedArray[0] : updatedArray.find(entry => entry.id == id);

          updatedObject[key] = {...updatedObject[key], data: value};
          
          const newState = {...prevState}
          newState[section] = updatedArray
          return {
            ...newState
          }
          }
        )
      },

      onSubmit: (section, id) => {
      
        setState(prevState => {
          const updatedArray = [...prevState[section]]
          updatedArray.push(section === 'EducationalExperience' ? new EducationEntry() : new JobEntry())
          
          // collapse edit view for form
          updatedArray.find(entry => {
            return entry.id == id
          })._edit = false

          const newState = {...prevState}
          newState[section] = updatedArray

          return {
            ...newState
          }
        })
      }, 

      onDelete: (section, id) => {
        setState(prevState => {
          const updatedArray = [...prevState[section]];
          const index = updatedArray.indexOf(updatedArray.find(entry => entry.id == id))
          if (index != -1) updatedArray.splice(index, 1);
          
          return {
            ...prevState, 
            [section]: updatedArray
          }
        })
      },

      onEdit: (section, id) => {
        setState(prevState => {
          const updatedArray = [...prevState[section]];
          updatedArray.forEach(entry => entry._edit = false);
          const index = updatedArray.indexOf(updatedArray.find(entry => entry.id == id))
          if (index !== -1){
            updatedArray[index]._edit = true;
          }
          return {
            ...prevState, 
            [section]: updatedArray
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
          {state.ProfessionalExperience.map((entry) => {
            return <Form data={entry} section='ProfessionalExperience' handlers={handlers} id={entry.id} key={entry.id}/>
          })}
        </div> 
        <div id='education' className='section'>
          <legend>Education</legend>
          {state.EducationalExperience.map((entry, index) => {
            return <Form data={entry} section='EducationalExperience' handlers={handlers} id={entry.id} key={entry.id}/>
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
    id: uuid(),
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
    id: uuid(),
  }
}

export default App;