const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Backend URL
const API_URL = "https://task-management-backend-b7dh.onrender.com/api/tasks";

// Load all tasks
async function loadTasks() {

    const response = await fetch(API_URL);

    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {

        taskList.innerHTML += `

            <div class="card">

                <h3>${task.title}</h3>

                <p>${task.description}</p>

                <p><strong>Priority:</strong> ${task.priority}</p>

                <p><strong>Status:</strong> ${task.status}</p>

                <div class="action-buttons">

                    <button onclick="deleteTask('${task._id}')" class="delete-btn">

                        Delete

                    </button>

                </div>

            </div>

        `;

    });

}

// Add Task

taskForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const task = {

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        priority: document.getElementById("priority").value,

        status: "Pending"

    };

    await fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(task)

    });

    taskForm.reset();

    loadTasks();

});

// Delete Task

async function deleteTask(id) {

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    loadTasks();

}

// Load tasks when page opens

loadTasks();