const notes = [
    {
        note: "Note 1",
        isComplete: false,
    },
    {
        note: "Note 2",
        isComplete: true,
    }
];

const form = document.getElementById("formNotes");
form.addEventListener("submit", handleSubmit); //Registra un evento a un objeto en específico
const divNotes = document.getElementById("div-notes");
let statusButton = false //false edit - true save
let index;

function renderNotes(){
    const lblCant = document.getElementById("cant-notes");
    const lblComplete = document.getElementById("complete-notes");
    let completed = 0;
    lblCant.textContent = notes.length


    divNotes.innerHTML = "";
    for(let i=0; i<notes.length; i++){
        const note = notes[i];
        const element = createElement(note);
        divNotes.append(element);
        if(note.isComplete){
            completed++;
        }
    }
    lblComplete.textContent = completed
}

function createElement(e){
    const div = document.createElement("div");
    const p = document.createElement("p");
    const hr = document.createElement("hr");
    const divOptions = document.createElement("div");
    const buttonEdit = document.createElement("button");
    const span = document.createElement("span");
    const buttonDelete = document.createElement("button");
    const input = document.createElement("input");

    const p_date = document.createElement("p");

    div.className = "note";
    p.textContent = e.note;
    divOptions.className = "float-right";
    if(!e.isComplete){
        buttonEdit.className = "btn btn-secondary btn-option";
        buttonEdit.textContent = "Edit";
    }
    span.textContent = " ";
    buttonDelete.className = "btn btn-danger btn-option";
    buttonDelete.textContent = "Delete";
    input.type = "checkbox";
    input.className = "form-check-input";
    input.checked = e.isComplete;
    if(e.isComplete){
        input.disabled = true;
    }
    p_date.textContent = e.createAt;

    input.addEventListener("change", function(){
        e.isComplete = !e.isComplete;
        renderNotes();
    });

    buttonEdit.addEventListener("click", function(){
        statusButton = true;
        index = notes.indexOf(e); //retorna el primer índice en el que se puede encontrar un elemento dado en el array
        const txtNote = document.getElementById("txt-note");
        txtNote.value = e.note;
        txtNote.focus();
    })
    
    buttonDelete.addEventListener("click", function(){
        statusButton = false;
        const index = notes.indexOf(e)
        notes.splice(index, 1); //cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos
        form.reset();
        renderNotes();
    })

    divOptions.append(buttonEdit, span, buttonDelete)
    div.append(p, hr, divOptions, input);
    return div;
}

function handleSubmit(e){
    e.preventDefault();
    saveNote();
}   

function saveNote(){
    const valueNote = document.getElementById("txt-note").value.trim();
    if(valueNote === ""){
        alert("Ingrese una Nota valida")
    }else{
        if(statusButton){
            notes[index].note = valueNote;
            statusButton = false
        }else{
            const newNote = {note: valueNote, isComplete: false};
            notes.push(newNote);
        }
    }
    form.reset();
    renderNotes();
}

renderNotes();
