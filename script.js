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
    fetch('https://notes-api.glitch.me/api/notes', {
      method: 'POST',
      body: JSON.stringify({ "title": title, "text": text }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuthCreds()
      }
    })
      .then(response => response.json())
      .then(retrieveNotes())
  })
}

createNewNote()

function retrieveNotes() {
  fetch('https://notes-api.glitch.me/api/notes', {
    method: 'GET',
    headers: {
      'Authorization': basicAuthCreds()
    }
  })
    .then(response => response.json())

    .then(function (JSONresponse) {

      const notesArray = JSONresponse.notes

      for (let note of notesArray) {

        const title = note.title
        const text = note.text
        const noteDiv = document.querySelector("#note-body")

        noteDiv.innerHTML +=
          `
  <div class="note-container">
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
    <div class="note-buttons">
      <button type="edit" class="edit-button">Edit</button>
      <button type="delete" class="delete-button">Delete</button>
    </div>
  </div>
`
      }
    })
}

// retrieveNotes()



// cut the note html and paste it as innerText when I grab the data from my API

// make a Patch fetch for edit

// make a Delete fetch for delete



