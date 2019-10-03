/* globals fetch, FormData */

function createNewNote() {
  document.querySelector(".submit-button").addEventListener("click", function (event) {
    event.preventDefault()
    let title = document.querySelector('.input-title').value
    let text = document.querySelector('.input-text').value
    fetch('https://notes-api.glitch.me/api/notes', {
      method: 'POST',
      body: JSON.stringify({ title: title, text: text }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(function (input) {

      })
  })
}

createNewNote()

// first thing I need to do is make a form

// once I have a form, I need to make sure I am able to get input from the form

// once I learn that I can receive input from the form, I need to be able to hold that input as a JSON file

// once I have learned how to hold that input as a JSON file, I need a way to access that JSON at a later time

// once I can access that JSON data, I need to be able to display that data as a note



