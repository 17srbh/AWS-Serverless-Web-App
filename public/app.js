const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const API_URL = "https://j9ue6eos80.execute-api.eu-north-1.amazonaws.com"; // Base API URL

// Fetch tasks from API Gateway
function fetchTasks() {
  fetch(`${API_URL}/todos`) // Ensure correct API route
    .then(response => response.json())
    .then(tasks => {
      taskList.innerHTML = ''; // Clear existing list

      if (!Array.isArray(tasks)) {
        console.error("Unexpected API response:", tasks);
        return;
      }

      tasks.forEach(task => {
        if (!task.id || !task.task) {
          console.error("Invalid task format:", task);
          return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task.task}</span> 
          <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>
        `;
        taskList.appendChild(li);
      });
    })
    .catch(err => console.error("Error fetching tasks:", err));
}

// Add a new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    fetch(`${API_URL}/todos`, { // Use `/todos` endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }) 
    })
      .then(response => response.json())
      .then(() => {
        taskInput.value = '';
        fetchTasks(); // Reload tasks
      })
      .catch(err => console.error("Error adding task:", err));
  }
});

// Delete a task
function deleteTask(id) {
  fetch(`${API_URL}/todos/${id}`, { // Use `/todos/{id}` endpoint
    method: 'DELETE'
  })
    .then(() => fetchTasks()) // Reload tasks
    .catch(err => console.error("Error deleting task:", err));
}

// Initialize the app
document.addEventListener('DOMContentLoaded', fetchTasks);
