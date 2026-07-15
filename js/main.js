const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const initialTasks = [
  { id: 1, text: "Review lecture notes for Database Systems", completed: false },
  { id: 2, text: "Prepare slides for Web Development presentation", completed: true }
];

let tasks = [...initialTasks];

function renderTasks() {
  const taskList = document.querySelector("#task-list");
  const summary = document.querySelector("#task-summary");

  if (!taskList || !summary) {
    return;
  }

  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.text} as completed`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, text, deleteButton);
    taskList.appendChild(item);
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  summary.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"} added, ${completedCount} completed.`;
}

function addTask(text) {
  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

const taskForm = document.querySelector("#task-form");

if (taskForm) {
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#task-input");
    const message = document.querySelector("#task-message");
    const value = input.value.trim();

    if (!value) {
      message.textContent = "Please enter a task before adding it.";
      message.className = "form-message error";
      return;
    }

    addTask(value);
    input.value = "";
    message.textContent = "Task added successfully.";
    message.className = "form-message success";
  });

  renderTasks();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function containsOnlyDigits(phone) {
  return /^\d+$/.test(phone);
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const messageText = document.querySelector("#message").value.trim();
    const messageBox = document.querySelector("#contact-message");

    if (!name || !email || !phone || !messageText) {
      messageBox.textContent = "All fields are required.";
      messageBox.className = "form-message error";
      return;
    }

    if (!isValidEmail(email)) {
      messageBox.textContent = "Please enter a valid email address.";
      messageBox.className = "form-message error";
      return;
    }

    if (!containsOnlyDigits(phone)) {
      messageBox.textContent = "Phone number must contain digits only.";
      messageBox.className = "form-message error";
      return;
    }

    messageBox.textContent = "Message validated successfully. Thank you!";
    messageBox.className = "form-message success";
    contactForm.reset();
  });
}
