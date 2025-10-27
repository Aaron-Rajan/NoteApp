import {Request, Response, NextFunction} from "express";
import * as service from '../services/notes.service';

export const asyncHandler = (fn: any) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req,res,next)).catch(next);

export const getAllNotes = asyncHandler(async(req:Request, res:Response) => {
    const {title} = req.query as {title?: string};
    if (typeof title == "string" && title.trim().length > 0) {
        const notes = await service.getTitle(title);
        return res.json(notes);
    }
    const notes = await service.getAll();
    res.json(notes);
})

export const createNote = asyncHandler(async(req: Request, res: Response) => {
    const {title, content} = req.body ?? {};
    if (!title || typeof title !== "string") {
        return res.status(400).json({error: "Field 'title' is required"});
    }
    const created = await service.create({title, content});
    res.status(201).json(created);
})

// export async function getTitleNote(req: Request, res:Response) {
//     res.json(await service.getTitle(req.params.title));
// }

export const deleteIDNote = asyncHandler(async (req:Request, res:Response) => {
    await service.deleteID(req.params.id);
    res.status(204).end();
})