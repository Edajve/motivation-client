
import { getCurrentDateTimeString } from "../../helpers/dateFormat";
import internalAPI from "../../services/internalApi-client";

export interface Note {
    title: string;
    actualNote: string;
    emotion: {
        emotion: any;
    };
    dateOfNoteSubmission: string;
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

export { getCurrentDateTimeString };
