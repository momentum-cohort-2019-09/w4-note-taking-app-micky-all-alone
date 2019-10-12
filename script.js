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
    const noteDiv = document.querySelector("#note-body")

    noteDiv.innerHTML = ''

    console.log(notesArray)

    for (let note of notesArray) {

      const title = note.title
      const text = note.text
      const id = note._id
      const updated = note.updated

      noteDiv.innerHTML +=
        `
              <div class="note-container" id=${id}>
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
    deleteNote()
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
      noteId.querySelector(".delete-button").addEventListener("click", function (event) {
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

  // function deleteNote() {
  //   for (let note of notesArray) {
  //     document.querySelector('delete-button').addEventListener("click", function (event) {
  //     // document.querySelector("#" + note.id).querySelector(".delete-button").addEventListener("click", function (event) {
  //       console.log(`#{id}`)
  //       event.preventDefault()
  //       fetch(`https://notes-api.glitch.me/api/notes/${id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': basicAuthCreds()
  //         }
  //       })
  //       renderNotes()
  //     })
  //   }
  // }

}

runNotesApp()

