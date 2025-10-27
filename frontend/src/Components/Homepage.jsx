import {Component} from 'react';
import Button from './Button';
import '../styles/Homepage.css';

const Homepage = () => {
    
    return (
        <div>
            <h1>Notes App</h1>
            <div className='buttons'>
                <Button someText='Show All Notes' link='/showNotes'></Button>
                <Button someText='Create A Note' link='/createNotes'></Button>
                <Button someText='Delete A Note' link='/deleteNote'></Button>
            </div>
        </div>
    );
}

export default Homepage;