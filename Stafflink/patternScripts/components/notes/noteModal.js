import { getCurrentTimeFormated } from "../../dateFormated/getCurrentTime.js"

const cardDataDefault = {
    id: Math.floor(Math.random() * (2 * 1000000)),
    title: 'Título', 
    description: 'Descrição da anotação', 
    time: getCurrentTimeFormated(),
}

export const noteCardModal = ({id = cardDataDefault.id, title = cardDataDefault.title, description = cardDataDefault.description, time = cardDataDefault.time}) => {
    const noteCardContainer = document.createElement('div')
    noteCardContainer.className = 'card'

    noteCardContainer.setAttribute('data-unicKey', id)

    // --Header da anotação--
    const noteHeader = document.createElement('div')
    noteHeader.className = 'card_header'

    // --Título--
    const noteTitleContainer = document.createElement('div')
    noteTitleContainer.className = 'title'

    const noteTitle = document.createElement('input')
    noteTitle.type = 'text'
    noteTitle.value = title
    noteTitle.disabled = title !== cardDataDefault.title || description !== cardDataDefault.description
    noteTitle.maxLength = 25
    noteTitle.name = 'noteTitle'

    // --Ações da anotação--
    const noteActionsContainer = document.createElement('div')
    noteActionsContainer.className = 'actions'

    const editOption = document.createElement('button')
    editOption.type = "button"
    editOption.className = "actions_option"
    editOption.title = "edit"
    editOption.innerHTML = `
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3L12.5 6" stroke="black" stroke-linecap="round"/>
            <path d="M9.35907 1.77111L1.48902 10.8463C1.17363 11.21 1 11.6753 1 12.1567V14.6C1 14.8209 1.17909 15 1.4 15H4.39599C4.98989 15 5.55307 14.7361 5.93305 14.2796L13.3857 5.32768C13.7289 4.91537 13.6856 4.30566 13.2876 3.94595L10.785 1.68435C10.3693 1.30868 9.72615 1.34782 9.35907 1.77111Z" stroke="black" stroke-linecap="round"/>
        </svg>   
    `

    editOption.addEventListener('click', () => {
        noteTitle.toggleAttribute('disabled')
        noteBody.toggleAttribute('disabled')

        editOption.classList.toggle('active')
    })

    const checkOption = document.createElement('button')
    checkOption.type = "button"
    checkOption.className = "actions_option"
    checkOption.title = "check"

    checkOption.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8L4.53251 12.8171C5.42451 14.0334 7.29066 13.8622 7.94643 12.5038L13.5 1" stroke="#039A00" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 8L6.53251 12.8171C7.42451 14.0334 9.29066 13.8622 9.94643 12.5038L15.5 1" stroke="#6CFF69" stroke-linecap="round"/>
        </svg> 
    `

    // card > (header > title ~ actions > option)
    noteTitleContainer.appendChild(noteTitle)
    noteActionsContainer.append(editOption, checkOption)
    noteHeader.append(noteTitleContainer, noteActionsContainer)
    
    // --Header da anotação--

    // --Body da anotação--
    const noteBodyContainer = document.createElement('div')
    noteBodyContainer.className = 'card_body'

    const noteBody = document.createElement('textarea')
    noteBody.maxLength = 200
    noteBody.value = description
    noteBody.disabled = description !== cardDataDefault.description || title !== cardDataDefault.title
    noteBody.name = 'noteBody'

    noteBodyContainer.appendChild(noteBody)

    // --Body da anotação--

    // --Footer da anotação--
    const noteFooterContainer = document.createElement('div')
    noteFooterContainer.className = 'card_footer'

    const noteCreationTimeContainer = document.createElement('div')
    noteCreationTimeContainer.className = 'createdAt'
    noteCreationTimeContainer.innerHTML = `<h5>Criado às <span class='hour'>${time}</span></h5>`

    const noteStatusContainer = document.createElement('div')
    noteStatusContainer.className = 'status'
    noteStatusContainer.innerHTML = '<h5>Pendente</h5>'

    noteFooterContainer.append(noteCreationTimeContainer, noteStatusContainer)
    // --Footer da anotação--
    
    noteCardContainer.append(noteHeader, noteBodyContainer, noteFooterContainer)

    return noteCardContainer
}