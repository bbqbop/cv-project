import React, { Component } from 'react';

export class Form extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const { data, onChange, section } = this.props;
        function handleChange(e) {
            onChange(e, section)
        }
        const keys = Object.keys(data);
        return (
            <form>
                <legend>{section}</legend>
                {keys.map(key => {
                    return (
                    <Input 
                    key={key}
                    prop={data[key]}
                    id={key}
                    onChange={handleChange}
                    />
                    )
                })}
            </form>
        )
    }
}

class Input extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const { prop, id, onChange } = this.props;
        const { placeholder, data } = prop; 
        function handleChange(e){
            onChange(e)
        }
        return(
            <label>
                {id === 'description' ? (
                    <textarea placeholder={placeholder} defaultValue={data} id={id} onChange={handleChange}></textarea>
                ) : (
                    <input placeholder={placeholder} defaultValue={data} id={id} onChange={handleChange}></input>
                )}
            </label>
            )
    }
}