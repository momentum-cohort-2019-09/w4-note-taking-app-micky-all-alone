/* globals fetch, FormData, btoa, sessionStorage */

// const uuid4 = require('uuid/v4')
// let credentials = {
//   username: sessionStorage.getItem('username'),
//   password: sessionStorage.getItem('password')
// }

function basicAuthCreds() {
  return 'Basic ' + btoa('mickyMcK:mickypassword')
}

function createNewNote() {
  document.querySelector(".submit-button").addEventListener("click", function (event) {
    event.preventDefault()
    let title = document.querySelector('.input-title').value
    let text = document.querySelector('.input-text').value
    return fetch('https://notes-api.glitch.me/api/notes', {
      method: 'POST',
      body: JSON.stringify({ "title": title, "text": text }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuthCreds()
      }
    })
      .then(response => response.json())
      .then(JSONresponse => notesArray.push(JSONresponse))
  })
}

createNewNote()

let notesArray = []

function retrieveNotes() {
  fetch('https://notes-api.glitch.me/api/notes', {
    method: 'GET',
    headers: {
      'Authorization': basicAuthCreds()
    }
  })
    .then(response => response.json())

    .then(function (JSONresponse) {

      let notesArray = JSONresponse.notes.slice(0)
      console.log(notesArray)

      for (let note of notesArray) {

        const title = note.title
        const text = note.text
        const id = note._id
        const noteDiv = document.querySelector("#note-body")

        noteDiv.innerHTML +=
          `
  <div class="note-container" id="${id}">
    <div class="title">
      <h1 class="note-title">
        ${title}
      </h1>
    </div>
    <div class="text">
      <p>
        ${text}
      </p>
    </div>
    <button type="edit" class="edit-button">Edit</button>
    <button type="delete" class="delete-button">Delete</button>
  </div>
`
      }
    })
}

retrieveNotes()

// function deleteNote () {
//   console.log("delete note")
//   document.querySelector(".delete-button").addEventListener("click", function (event) {
//     event.preventDefault()
//     let deleteId = document.querySelector("#id")
//     fetch('https://notes-api.glitch.me/api/notes/${deleteId}', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': basicAuthCreds()
//       }
//     })
//   })
// }

// deleteNote()
