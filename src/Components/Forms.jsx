import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';

export const Form = (props) => {
    const { data, section, handlers, id = null} = props;

    function handleChange(e) {
        handlers.onChange(e, section, id)
    }

    function handleSubmit(e) {
        e.preventDefault();
        handlers.onSubmit(section, id);
    }

    function handleEdit(e) {
        handlers.onEdit(section, id);
    }

    function handleDelete(e) {
        handlers.onDelete(section, id);
    }

    const fieldKeys = Object.keys(data);
    return (
        <>
            {data['_edit'] || data['_edit'] === undefined ? (
                <form className={section} onSubmit={handleSubmit}>
                    {fieldKeys.map((field) => {
                        if (field === '_edit' || field === 'id'){
                            return null;
                        }
                        return (
                        <Input 
                        key={`${field}_${id}`}
                        id={field}
                        data={field}
                        prop={data[field]}
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
                    data={data[fieldKeys[0]].data} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}/>
            )}
        </>
    )
}

const Input = (props) => {
    const { id, prop, onChange } = props;
    const { placeholder, data } = prop; 
    function handleChange(e){
        onChange(e)
    }
    return(
        <label htmlFor={id}>
            {id === 'Description' ? (
                <textarea placeholder={placeholder} defaultValue={data} id={id} onChange={handleChange}></textarea>
            ) : (
                <input placeholder={placeholder} defaultValue={data} id={id} onChange={handleChange} />
            )}
        </label>
        )
}

const Preview = (props) => {  
    const { data, handleDelete, handleEdit } = props
    return(
        <div className="preview">
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