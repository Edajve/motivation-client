import internalAPI from "../../services/internalApi-client";

export interface Note {
    title: string;
    actualNote: string;
    emotion: {
        emotion: any;
    };
    dateOfNoteSubmission: string;
}

export function getCurrentDateTimeString() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return dateTimeString;
}

export const createNote = (noteObj: Note): Promise<Note> => {
    return internalAPI.post('/api/v1/create/note', {
        "title": noteObj.title,
        "actualNote": noteObj.actualNote,
        "emotion": noteObj.emotion.emotion.toString(),  // Extract the string property
        "dateOfNoteSubmission": getCurrentDateTimeString()
    }).then(res => {
        return res;
    }).catch(err => {
        if (err) return new err
    });
}