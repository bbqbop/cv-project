import React, { Component } from 'react';
import { PersonalInformation, EducationalExperience, ProfessionalExperience } from './Components/Forms'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      PersonalInformation: {
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
      },
      EducationalExperience: [],
      ProfessionalExperience: []
    }
  } 

  onChange = (e, subFolder) => {
    const { value, id } = e.target
   this.setState(prevState => ({
      [subFolder]: {
        ...prevState[subFolder],
        [id]: {
          ...prevState[subFolder][id],
          data: value
        }
      }
    })
   )
     console.log(this.state);
  }

  render(){

    return (
      <div>
        <PersonalInformation infos={this.state.PersonalInformation} onChange={this.onChange} />
        {/* <EducationalExperience />
        <ProfessionalExperience /> */}
      </div>
    )
  }
}
