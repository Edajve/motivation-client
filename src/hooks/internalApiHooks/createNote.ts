import internalAPI from "../../services/internalApi-client";

export interface Note {
    title: string;
    actualNote: string;
    emotion: {
        emotion: any;
    };
    dateOfNoteSubmission: string;
}

function getCurrentDateTimeString() {
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

export const createNote = (noteObj: Note) => {
    internalAPI.post('/api/v1/note', {
        "title": noteObj.title,
        "actualNote": noteObj.actualNote,
        "emotion": {
            "emotion": noteObj.emotion
        },
        "dateOfNoteSubmission": getCurrentDateTimeString()
    });
}
