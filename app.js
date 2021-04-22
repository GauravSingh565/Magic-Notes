// document.addEventListener("DOMContentLoaded", getnotes);
let input = document.getElementById("input");
let addbtn = document.getElementById("addbtn");
let note = document.getElementById("notes");
let notetitle = document.getElementById("title");
let search = document.getElementById("searchBtn");
let alert = document.getElementById("alert");

addbtn.addEventListener("click", function () {
  let val = input.value;
  if (val !== "" && notetitle.value !== "") {
    // createing div elements------------------

    let div = document.createElement("div");

    div.className = "my-3 mx-4 card notecard";
    let noteBody = document.createElement("div");

    let title = document.createElement("h5");
    title.id = "note-title";
    let notetxt = document.createElement("p");
    notetxt.id = "noteTxt";
    let deletebtn = document.createElement("button");
    deletebtn.id = "deleteBtn";
    let time = document.createElement("span");
    time.id = "time";
    let month = document.createElement("span");
    month.id = "month";
    let newDate = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = document.createElement("span");
    date.id = "date";
    let year = document.createElement("span");
    year.id = "year";
    // append element to notebody------
    title.innerHTML = notetitle.value;
    noteBody.appendChild(title);
    notetxt.innerHTML = val;
    deletebtn.innerHTML = `Delete Note`;
    month.innerHTML = months[newDate.getMonth()];
    date.innerHTML = new Date().getDate();
    year.innerHTML = new Date().getFullYear();
    noteBody.appendChild(notetxt);
    noteBody.appendChild(deletebtn);
    time.appendChild(date);
    time.appendChild(month);
    time.appendChild(year);
    noteBody.appendChild(time);

    // append notebody to div-----------
    div.appendChild(noteBody);

    // add note to list----------------------

    note.appendChild(div);
    let mynote = {
      mytitle: notetitle.value,
      notevalue: input.value,
      date: time,
    };
    // console.log(mynote.notetext);
    local(mynote);
    // delete note from list----------------------------
    deletebtn.addEventListener("click", function () {
      div.remove();
      removenote(mynote);
    });

    // console.log(note);
  } else {
    let alertmsg = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert" id="alert">
      <strong>Please enter boths input fields first  </strong> 
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
             `;
    alert.innerHTML = alertmsg;
  }
  notetitle.value = "";
  input.value = "";
});

// local storage----------------------------------------------

// check local storage first------------------

function local(val_1) {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.push(val_1);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// retrive data from localstorage------------------
function getnotes() {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.forEach(function (element) {
    let div = document.createElement("div");

    div.className = "my-3 mx-4 card notecard";
    let noteBody = document.createElement("div");

    let title = document.createElement("h5");
    title.id = "note-title";
    let notetxt = document.createElement("p");
    notetxt.id = "noteTxt";
    let deletebtn = document.createElement("button");
    deletebtn.id = "deleteBtn";
    let time = document.createElement("span");
    time.id = "time";
    let month = document.createElement("span");
    month.id = "date";
    let newDate = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = document.createElement("span");
    date.id = "date";
    let year = document.createElement("span");
    year.id = "year";
    // append element to notebody------
    title.innerHTML = element.mytitle;
    noteBody.appendChild(title);
    notetxt.innerHTML = element.notevalue;
    deletebtn.innerHTML = `Delete Note`;
    month.innerHTML = months[newDate.getMonth()];
    date.innerHTML = new Date().getDate();
    year.innerHTML = new Date().getFullYear();
    noteBody.appendChild(notetxt);
    noteBody.appendChild(deletebtn);
    time.appendChild(date);
    time.appendChild(month);
    time.appendChild(year);
    time.innerHTML = element.date;
    noteBody.appendChild(time);

    // append notebody to div-----------
    div.appendChild(noteBody);

    // add note to list----------------------

    note.appendChild(div);
    let mynote = {
      mytitle: notetitle.value,
      notevalue: input.value,
      date: time,
    };
    // delete note from list----------------------------
    deletebtn.addEventListener("click", function () {
      div.remove();
      removenote(mynote);
    });
  });
}
getnotes();
// delete item from localstorage------------------------------------
function removenote(note_2) {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  let noteIndex = note_2;
  notes.splice(notes.indexOf(noteIndex), 1);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// note lis filter by search

search.addEventListener("input", function () {
  let input = search.value.toUpperCase();
  // console.log(input);
  let card = document.getElementsByClassName("notecard");
  // console.log(card);
  Array.from(card).forEach(function (element) {
    let txt = element.getElementsByTagName("h5")[0].innerText;
    // console.log(txt);
    if (txt.includes(input)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
