/* globals fetch, FormData, btoa, sessionStorage */

// const uuid4 = require('uuid/v4')
// let credentials = {
//   username: sessionStorage.getItem('username'),
//   password: sessionStorage.getItem('password')
// }

function basicAuthCreds() {
  return 'Basic ' + btoa('mickyMcK:mickypassword')
}

function runNotesApp() {

  let notesArray = []

  retrieveNotes()

  function retrieveNotes() {
    fetch('https://notes-api.glitch.me/api/notes', {
      method: 'GET',
      headers: {
        'Authorization': basicAuthCreds()
      }
    })
      .then(response => response.json())

      .then(function (JSONresponse) {

        notesArray = JSONresponse.notes.slice(0)
        renderNotes()
      })
  }

  function renderNotes() {
    let noteDiv = document.querySelector('#note-body')

    noteDiv.innerHTML = ''

    for (let note of notesArray) {

      const title = note.title
      const text = note.text
      const id = note._id
      const updated = note.updated

      noteDiv.innerHTML +=
        `
              <div class='note-container' id=${id}>
                <div class='title'>
                  <h1 class='note-title'>
                    ${title}
                  </h1>
                </div>
                <div class='text'>
                  <p>
                    ${text}
                  </p>
                </div>
                <div class='buttons'>
                  <button type='edit' class='edit-button'>Edit</button>
                  <button type='delete' class='delete-button'>Delete</button>
                </div>
              </div>
            `
    }
    deleteNote()
    editNote()
  }

  function createNewNote() {
    document.querySelector('.submit-button').addEventListener('click', function (event) {
      event.preventDefault()
      let title = document.querySelector('.input-title').value
      let text = document.querySelector('.input-text').value
      return fetch('https://notes-api.glitch.me/api/notes', {
        method: 'POST',
        body: JSON.stringify({ 'title': title, 'text': text }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuthCreds()
        }
      })
        .then(response => response.json())
        .then(function (JSONresponse) {
          notesArray.push(JSONresponse)
          renderNotes()
        })
    })
  }

  createNewNote()

  function deleteNote() {
    for (let note of notesArray) {
      const id = note._id
      const noteId = document.getElementById(`${id}`)
      noteId.querySelector('.delete-button').addEventListener('click', function (event) {
        event.preventDefault()
        fetch(`https://notes-api.glitch.me/api/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuthCreds()
          }
        })
          .then(function () {
            retrieveNotes()
            renderNotes()
          })
      })
    }
  }

  function editNote() {
    for (let note of notesArray) {
      const id = note._id
      const noteId = document.getElementById(`${id}`)
      noteId.querySelector('.edit-button').addEventListener('click', function (event) {
        event.preventDefault()
        noteId.innerHTML =
          `
          <div class='note-form-edit' id=${id}>
            <form class='note-edit'>
                <input class='title-edit' type='text' placeholder='Title'>
                <input class='text-edit' type='text' placeholder='text'>
                <div class='buttons-edit'>
                  <button class='edit-conf-button' type='submit'>Edit it.</button>
                </div>
            </form>
          </div>
        `
        function replaceNoteData() {
          document.querySelector('.edit-conf-button').addEventListener('click', function (event) {
            event.preventDefault()
            let titleUpdate = document.querySelector('.title-edit').value
            let textUpdate = document.querySelector('.text-edit').value
            return fetch(`https://notes-api.glitch.me/api/notes/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ 'title': titleUpdate, 'text': textUpdate }),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuthCreds()
              }
            })
              .then(response => response.json())
              .then(function (JSONresponse) {
                notesArray.push(JSONresponse)
              })
              .then(function () {
                retrieveNotes()
                renderNotes()
              })
          })
        }
        replaceNoteData()
      })
    }
  }
}

runNotesApp()

