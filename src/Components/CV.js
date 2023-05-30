import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export class Header extends Component {
    
    render(){
        const data = this.props.data[0];
        const addressKeys = [
            'Address', 'City', 'Country', 'Email', 'PhoneNumber'
        ]
        return(
            <div className="CV_header">
              <div className="name">
                <h1 id="CV_name">{data.FirstName.data} {data.LastName.data}</h1>  
                <h2 id="CV_title">{data.Title.data}</h2>
              </div>
              <ul className="address">
                {addressKeys.map((key, index) => (
                <li id={"CV_" + data[key].placeholder} key={index}>
                 { key === 'Email' && data.Email.data ? <FontAwesomeIcon icon={faEnvelope} /> : 
                   key === 'PhoneNumber' && data.PhoneNumber.data ? <FontAwesomeIcon icon={faPhone} />: null}
                  {' ' + data[key].data} 
                  {key === 'City' && data.State.data ? (
                    <>
                    {', '}
                    {data.State.data} {data.ZipCode.data}
                    </>
                    ) : null }
                </li>
                ))}
              </ul>
            </div>
        )
    }
}

export class Description extends Component {
  render(){
    const data = this.props.data.data;
    return (
      !data ? null :
      <div className="description">
        <h1>Description</h1>
        <div className="description_text">
          {data}
        </div>
      </div>
    )
  }
}

export class Experience extends Component {

  render(){
    const entries = this.props.data;
    return(
      <div className="experience">
        <h1>Experience</h1>
          {entries.map((entry, index) => (
              <div className="job_entry" key={index}>
                <div className="job_dates">{entry.From.data} {entry.To.data ? "- " + entry.To.data : null}</div>
                <div className="job_info"> 
                  <h4>{entry.Position.data}</h4>
                  <div className="job_location">
                    {entry.Company.data}{entry.City.data ? ", " + entry.City.data : null}
                  </div>
                </div>
              </div>
            ))
          }
      </div>  
    )
  }
}

export class Education extends Component {

  render(){
    const entries = this.props.data;
    return(
      <div className="education">
        <h1>Education</h1>
          {entries.map((entry, index) => (
              <div className="school_entry" key={index}>
                <div className="school_dates">{entry.From.data} {entry.To.data ? "- " + entry.To.data : null}</div>
                <div className="school_info"> 
                  <h4>{entry.SchoolName.data}{entry.City.data ? ", " + entry.City.data : null}</h4>
                  <div className="school_degree">
                    <div>{entry.Degree.data ? "Degree: " + entry.Degree.data : null}</div>
                    <div>{entry.Subject.data ? "Subject: " + entry.Subject.data : null}</div>
                  </div>
                </div>
              </div>
            ))
          }
      </div>  
    )
  }
}

