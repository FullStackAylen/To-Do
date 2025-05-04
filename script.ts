const tabla = document.getElementById("table") as HTMLElement;

const formulario = document.forms.namedItem("formulario") as HTMLFormElement;

function addTask(): void {
    const name = formulario['name'] as HTMLInputElement;
    const description = formulario["description"] as HTMLInputElement;
    const status = formulario["status"] as HTMLSelectElement;

    if (name.value !== "" && description.value !== "" && status.value !== "default") {
        createElement(name.value, description.value, status.value);
        clearForm();
    } else {
        alert("Por favor, ingrese todos los datos");
    }
}

function createElement(name: string, description: string, status: string): void {
    const task = document.createElement("div");
    task.classList.add("task");

    const statusColors: { [key: string]: string } = {
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
                <h2>${name}</h2>
                <p>${description}</p>
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

    const container = document.getElementById(status);
    if (container) {
        container.appendChild(task);
    }
}

function clearForm(): void {
    (formulario['name'] as HTMLInputElement).value = "";
    (formulario["description"] as HTMLInputElement).value = "";
    (formulario["status"] as HTMLSelectElement).value = "default";
}

function deleteTask(button: HTMLButtonElement): void {
    const task = button.closest(".task") as HTMLElement;
    const resp = confirm("Do you want to delete this task?");
    if (resp && task) {
        task.remove();
    }
}

function editTask(button: HTMLButtonElement): void {
    const task = button.closest(".task") as HTMLElement;
    if (!task) return;

    const title = task.querySelector("h2") as HTMLElement;
    const desc = task.querySelector("p") as HTMLElement;

    (formulario['name'] as HTMLInputElement).value = title.textContent || "";
    (formulario["description"] as HTMLInputElement).value = desc.textContent || "";

    const parentId = (task.parentElement as HTMLElement).id;
    (formulario["status"] as HTMLSelectElement).value = parentId;

    task.remove();

    const modal = new bootstrap.Modal(document.getElementById('exampleModal')!);
    modal.show();
}
