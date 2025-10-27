import {Component} from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import '../styles/ShowNotes.css';

const ShowNotes = () => {
    const [notes, setNotes] = useState([]);

    const api = 'http://localhost:4000/api/notes';

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const resp = await axios.get(api);
            setNotes(resp.data);
        } catch (error) {
            console.log("Error retrieving data");
        }
    }
    
    return (
        <div>
            <h1>Notes:</h1>
            <div className='notes'>
                {
                    notes.length > 0 ? (
                        notes.map((note => 
                            <div key={note._id} style={{ marginBottom: '1rem' }}>
                                <h2>{note.title}</h2>
                                <p>{note.content}</p>
                                <p>ID: {note._id}</p>
                                <small>
                                Created: {new Date(note.createdAt).toLocaleString()}
                                </small>
                            </div>
                        ))
                    ) : (
                        <p>No Notes yet</p>
                    )
                }
            </div>
        </div>
    );
}

export default ShowNotes;