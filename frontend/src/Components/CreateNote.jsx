import {Component} from 'react';
import {useState} from 'react';
import axios from 'axios';


const CreateNote = () => {
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const api = 'http://localhost:4000/api/notes';

    const handleForm = async (event) => {
        event.preventDefault();
        try {
            const noteData = {
                title: newTitle,
                content: newContent,
            };
            const resp = await axios.post(api, noteData, {
                headers: {"Content-Type": "application/json"}
            });
            console.log("Note created successfully!");
        } catch (error) {
            console.log("Error creating note", error)
        }
    }

    return (
        <div>
            <h1>Create A Note!</h1>
            <form onSubmit={handleForm}>
                Title: <input type="text" name="title" value={newTitle}
                onChange={event => setNewTitle(event.target.value)}/>
                Content: <input type="text" name="content" value={newContent}
                onChange={event => setNewContent(event.target.value)}/>
                <button type='submit'>Create!</button>
            </form>
        </div>
    );
}

export default CreateNote;