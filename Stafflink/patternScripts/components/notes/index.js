import { getCurrentTimeFormated } from "../../dateFormated/getCurrentTime.js"
import { getLocalData, setLocalData } from "../../localStorageControl/getData.js"
import { createNote } from "./noteCreation.js"
import { noteCardModal } from "./noteModal.js"

const notesContainer = document.getElementById("notesContainer")
const allButtonOnNotesContainer = notesContainer?.querySelectorAll('button')
const notesList = document.querySelector("#notesContainer .notes")
const closeNotesContainer = document.getElementById("closeNotes")
const showNotes = document.getElementById("showNotes")
const showNewNoteForm = document.getElementById("showNewNotesForm")

const handleNotesContainer = () => {
    notesContainer.classList.toggle("visible")

    allButtonOnNotesContainer.forEach((button) => {
        const tabindex = button.getAttribute('data-tabindex')
        button.setAttribute('tabindex', tabindex)
    })
}

const listAllNotes = () => {
    const allSavedNotes = getLocalData('notes')

    if(!allSavedNotes || allSavedNotes.length == 0){
        notesList.innerHTML = "<p>Ainda não existem anotações salvas</p>"
        return
    }
    
    notesList.innerHTML = ""

    allSavedNotes.forEach(note => {
        notesList.appendChild(noteCardModal({id: note.id, title: note.title, description: note.description, time: note.time}))
    })

    reRenderNotesActions()
}

const saveNote = (noteData) => {
    const allSavedNotes = getLocalData('notes') ?? []
    allSavedNotes.push(noteData)

    setLocalData('notes', allSavedNotes)

    listAllNotes()
}

const getNoteData = (noteContainerElement) => {
    const id = noteContainerElement.getAttribute('data-unicKey')
    const title = noteContainerElement.querySelector('[name=noteTitle]').value
    const description = noteContainerElement.querySelector('[name=noteBody]').value
    const time = noteContainerElement.querySelector('.hour').textContent

    return {
        id,
        title,
        description,
        time
    }
}

const handleBlurredOut = (notBurredOutElement) => {
    const allBodyElements = [...document.body.children]
    allBodyElements.forEach(element => {
        element !== notBurredOutElement && element.classList.toggle('blurredOut')
    })
}

const createAbsoluteNoteForm = () => {
    const container = document.createElement('div')
    container.className = 'newNoteContainer'
    const content = document.createElement('div')

    handleBlurredOut(container)
    
    const defaultNoteForm = createNote({id: Math.floor(Math.random() * (2 * 1000000)), time: getCurrentTimeFormated()})
    defaultNoteForm.querySelector('button[title=edit]').disabled = true
    defaultNoteForm.querySelector('button[title=check]').disabled = true

    content.appendChild(defaultNoteForm)

    const confirmCreateNote = document.createElement('button')
    confirmCreateNote.type = 'button'
    confirmCreateNote.id = 'confirm'
    confirmCreateNote.innerText = 'Criar anotação'

    const cancelCreateNote = document.createElement('button')
    cancelCreateNote.type = 'button'
    cancelCreateNote.id = 'cancel'
    cancelCreateNote.innerText = 'Cancelar'

    content.append(confirmCreateNote, cancelCreateNote)
    container.appendChild(content)

    return container
}

const deleteNote = (noteUnicKey) => {
    const allSavedNotes = getLocalData('notes')
    const newList = allSavedNotes.filter(note => note.id != noteUnicKey)
    setLocalData('notes', newList)
}

function reRenderNotesActions() {
    const allListedNotes = document.querySelectorAll("#notesContainer .notes .card")

    allListedNotes.forEach(card => {
        const checkButton = card.querySelector('button[title=check]')
        const editButton = card.querySelector('button[title=edit]')

        const noteTitle = card.querySelector('[name=noteTitle]')
        const noteBody = card.querySelector('[name=noteBody]')
        let isChanged = false

        checkButton.addEventListener('click', () => {
            deleteNote(card.getAttribute('data-unickey'))
            notesList.removeChild(card)
        })

        editButton.addEventListener('click', () => {
            let currentSavedNotes = getLocalData('notes')

            if(isChanged) {
                const newNoteTitle = noteTitle.value
                const newNoteDescription = noteBody.value
                const target = currentSavedNotes.filter(note => note.id == card.getAttribute('data-unickey'))[0]
                const targetIndex = currentSavedNotes.indexOf(target)

                currentSavedNotes.splice(targetIndex, 1, {...target, title: newNoteTitle, description: newNoteDescription})

                setLocalData('notes', currentSavedNotes)
            }
        })

        noteTitle.addEventListener('change', () => isChanged = true)
        noteBody.addEventListener('change', () => isChanged = true)
    })
}

export const notesControl = () => {
    showNotes?.addEventListener("click", handleNotesContainer)
    closeNotesContainer?.addEventListener("click", handleNotesContainer)

    showNewNoteForm?.addEventListener("click", () => {
        const newNoteForm = createAbsoluteNoteForm()
        const parentElementForInsert = document.body
        const confirmCreateNote = newNoteForm.querySelector('#confirm')
        const cancelButton = newNoteForm.querySelector('#cancel')

        confirmCreateNote.addEventListener('click', () => {
            const note = newNoteForm.querySelector('.card')
            const newNoteData = getNoteData(note)

            saveNote(newNoteData)

            parentElementForInsert.removeChild(newNoteForm)  
            handleBlurredOut()
        })

        cancelButton.addEventListener('click', () => {
            parentElementForInsert.removeChild(newNoteForm)
            handleBlurredOut()
        })

        parentElementForInsert.appendChild(newNoteForm)
    })

    window.addEventListener('load', () => {
        listAllNotes()
        
        allButtonOnNotesContainer.forEach((button, index) => {
            const tabindex = index + 1
            button.setAttribute('data-tabindex', tabindex)
            button.setAttribute('tabindex', '-1')
        })
    })
}