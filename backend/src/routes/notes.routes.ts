import {Router} from "express";
import {getAllNotes, createNote, deleteIDNote} from '../controllers/notes.controller';

const r = Router();

r.get("/", getAllNotes);
r.post("/", createNote);
r.delete("/:id", deleteIDNote);



// r.get('/', (req,res) => {
//     res.json([{ "id": 1, "title": "First note", "content": "Hello world" }]);
// });

// r.post('/', (req,res) => {
//     const {title, content} = req.body;
//     res.status(201).json({id:2, title, content});
// });

export default r;