import { noteCardModal } from "./noteModal.js"

export const createNote = ({id, title, description, time}) => {
    const noteCard = noteCardModal({id, title, description, time})

    return noteCard
}