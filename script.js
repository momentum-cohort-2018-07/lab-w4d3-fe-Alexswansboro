import 'shoelace-css/dist/shoelace.css'
import request from 'superagent'
import uuid from 'uuid/v4'
import './main.css'

let container = document.getElementById('container')

request.get('https://notes-api.glitch.me/api/notes')
  .auth('AlexCorey', 'Uncw1234')
  .then(response => {
    let notes = response.body.notes

    for (let note of notes) {
      let newTitle = createElement('h2')
      newTitle.innerText = (`${note.title}`)
      newTitle.classList.add('col')

      let newText = createElement('div')
      newText.innerText = (`${note.text}`)
      newText.classList.add('col')

      container.appendChild(newTitle)
      container.appendChild(newText)
    }
  })
hide('form')
getID('add-note-button').addEventListener('click', event => {
  event.preventDefault()
  hide('add-note-button')
  show('form')
  console.log('submit button hide')
})

getID('add-submit-button').addEventListener('click', event => {
  event.preventDefault()

  let getTitle = document.getElementById('title-input').value.trim()

  let noteData = {
    title: getTitle,
    text: getID('note-input').value
  }
  request.post('https://notes-api.glitch.me/api/notes')
    .auth('AlexCorey', 'Uncw1234')
    .send(noteData)
    .then(response => {
      show('add-note-button')
      hide('form')
      getID('form').reset()
      let noteAdd = response.body
      addNoteDOM(noteAdd)
    })
    .catch(argument => {
    })
})

function addNoteDOM (note) {
  let addNewTitle = createElement('h2')
  addNewTitle.innerText = `${note.title}`
  addNewTitle.classList.add('col')

  let addNewText = createElement('div')
  addNewText.innerText = `${note.text}`
  addNewText.classList.add('col')
}

function hide (id) {
  getID(id).style.display = 'none'
}
function show (id) {
  getID(id).style.display = 'block'
}
function createElement (tag) {
  return document.createElement(tag)
}
function getID (id) {
  return document.getElementById(id)
}
// function createNote (note) {
//   let noteLI = el('li')
//   noteLi.classList.add('note')
//   noteLi.id = `note-${note.id}`
// }
