import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';

export const Form = (props) => {
    const { data, section, handlers, index = null} = props;

    function handleChange(e) {
        handlers.onChange(e, section)
    }

    function handleSubmit(e) {
        e.preventDefault();
        handlers.onSubmit(e);
    }

    function handleEdit(e) {
        handlers.onEdit(index, section);
    }

    function handleDelete(e) {
        handlers.onDelete(index, section);
    }

    const keys = Object.keys(data);
    return (
        <>
            {data['_edit'] || data['_edit'] === undefined ? (
                <form className={section} data-idx={index} onSubmit={handleSubmit}>
                    {keys.map(key => {
                        if (key === '_edit'){
                            return null;
                        }
                        return (
                        <Input 
                        key={key}
                        prop={data[key]}
                        id={key}
                        index={index}
                        onChange={handleChange}
                        />
                        )
                    })}
                    {(section === 'PersonalInformation') || (<button type="submit">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>)}
                </form>
            ) : (
                <Preview 
                    key={index}
                    index={index}
                    data={data[keys[0]].data} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}/>
            )}
        </>
    )
}

const Input = (props) => {
    const { prop, id, index, onChange } = props;
    const { placeholder, data } = prop; 
    function handleChange(e){
        onChange(e)
    }
    return(
        <label>
            {id === 'Description' ? (
                <textarea placeholder={placeholder} defaultValue={data} id={id} data-idx={index} onChange={handleChange}></textarea>
            ) : (
                <input placeholder={placeholder} defaultValue={data} id={id} data-idx={index} onChange={handleChange} />
            )}
        </label>
        )
}

const Preview = (props) => {
   
    function handleDragStart(e){
        console.log(e)
    }
    function handleDragEnd(e){
        console.log(e)
    }
    
    const { data, index, handleDelete, handleEdit } = props
    return(
        <div className="preview" data-idx={index} draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div>{data}</div>
            <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}