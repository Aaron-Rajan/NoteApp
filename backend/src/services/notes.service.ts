import {Note} from '../models/note.model';

export async function create(data: Partial<{title: string, content:string}>) {
    const doc = await Note.create({
        title: data.title!,
        content: data.content ?? ""
    });
    return doc.toObject();
}

export async function getAll() {
    return Note.find().sort({updatedAt: -1}).lean();
}

export async function getTitle(title: string) {
    return Note.find({title: {$regex: title, $options: "i"} }).lean();
}

export async function deleteID(id: string) {
    const res = await Note.findByIdAndDelete(id).lean();
    if (!res) throw Object.assign(new Error("Note not found"), { status: 404 });
}

