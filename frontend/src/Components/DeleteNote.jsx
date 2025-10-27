import {Component} from 'react';
import axios from 'axios';
import {useState} from 'react';

const DeleteNote = () => {
    const [id, setID] = useState('');

    const handleForm = async (event) => {
        try {
            event.preventDefault();
            const api = 'http://localhost:4000/api/notes/' + id;
            const resp = await axios.delete(api);
            console.log("Successfully deleted note ", id);
        } catch (error) {
            console.log("Error occurred deleting note", error);
        }
    }

    return (
        <div>
            <h1>Delete A Note!</h1>
            <form onSubmit={handleForm}>
                ID: <input type="text" name="id" value={id}
                onChange={event => setID(event.target.value)}/>
                <button type='submit'>Delete!</button>
            </form>
        </div>
    );
}

export default DeleteNote;