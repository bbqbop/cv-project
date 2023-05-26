import React, { Component } from 'react';

export class PersonalInformation extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const { infos, onChange } = this.props;
        function handleChange(e) {
            onChange(e, 'PersonalInformation')
        }
        return (
            <form>
                <legend>Personal Information</legend>
                <Input prop = {infos.FirstName} id = {Object.keys(infos)[0]} type = "text" onChange={handleChange}/>
                <Input prop = {infos.LastName} id = {Object.keys(infos)[1]} type = "text" onChange={handleChange}/>
                <Input prop = {infos.Title} id = {Object.keys(infos)[2]} type = "text" onChange={handleChange}/>
                <Input prop = {infos.Address} id = {Object.keys(infos)[3]} type = "text" onChange={handleChange}/>
                <Input prop = {infos.City} id = {Object.keys(infos)[4]} type = "text" onChange={handleChange}/>
                <Input prop = {infos.ZipCode} id = {Object.keys(infos)[5]} type = "number" onChange={handleChange}/>
                <Input prop = {infos.Country} id = {Object.keys(infos)[6]} type = "text" onChange={handleChange}/>
                <Input prop = {infos.Email} id = {Object.keys(infos)[7]} type = "email" onChange={handleChange}/>
                <Input prop = {infos.PhoneNumber} id = {Object.keys(infos)[8]} type = "tel" onChange={handleChange}/>
                <Input prop = {infos.Description} id = {Object.keys(infos)[9]} type = "textarea" onChange={handleChange}/>
            </form>
        )
    }
}

export class EducationalExperience extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <form>
                <legend>Educational Experience</legend>
                <Input name = "School Name : " type = "text" />
                <Input name = "Title of Study : " type = "text" />
                <Input name = "Degree : " type = "text" />
                <Input name = "From : " type = "text" />
                <Input name = "To : " type = "text" />
            </form>
        )
    }
}

export class ProfessionalExperience extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <form>
                <legend>Professional Experience</legend>
                <Input name = "Position : " type = "text" />
                <Input name = "Company : " type = "text" />
                <Input name = "City : " type = "text" />
                <Input name = "From : " type = "text" />
                <Input name = "To : " type = "text" />
            </form>
        )
    }
}

class Input extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const { prop, id, type, onChange } = this.props;
        const { placeholder, data } = prop; 
        function handleChange(e){
            onChange(e)
        }
        return(
            <label>
                {type === 'textarea' ? (
                    <textarea placeholder={placeholder} defaultValue={data} id={id} onChange={handleChange}></textarea>
                ) : (
                    <input placeholder={placeholder} defaultValue={data} type={type} id={id} onChange={handleChange}></input>
                )}
            </label>
            )
    }
}