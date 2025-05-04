tabla = document.getElementById("table")

var formulario = document.forms['formulario'];

function addTask(){

    if(formulario['name'].value != "" && formulario["description"].value != "" && formulario["status"].value != "default"){
        createElement();
        clear();
    }else{
        alert("Por favor, ingrese todos los datos")
    }
}

function createElement(){
    const task = document.createElement("div");
    task.classList.add("task");

    const status = formulario["status"].value;

    const statusColors = {
        pending: "#c3c3c3",       // gris
        waiting: "#ffc107",       // amarillo
        inprogress: "#0d6efd",    // azul
        verification: "#6610f2",  // violeta
        finished: "#198754"       // verde
    };

    task.style.borderLeft = `5px solid ${statusColors[status] || "#48838f"}`;

    task.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
            <div>
                <h2>${formulario['name'].value}</h2>
                <p>${formulario["description"].value}</p>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editTask(this)">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(this)">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </div>
    `;

    document.getElementById(status).appendChild(task);
}

function clear(){
    formulario['name'].value = "";
    formulario["description"].value = ""
    formulario["status"].value = "default"
}

function deleteTask(button) {
    const task = button.closest(".task");
    resp = confirm("Do you want to delete this task?")
    if(resp)
        task.remove();
}

function editTask(button) {
    const task = button.closest(".task");
    const title = task.querySelector("h2");
    const desc = task.querySelector("p");

    formulario['name'].value = title.textContent;
    formulario["description"].value = desc.textContent;
    
    const parentId = task.parentElement.id;
    formulario["status"].value = parentId;

    task.remove();

    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}
