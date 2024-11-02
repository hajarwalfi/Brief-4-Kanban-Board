        const newTask = document.getElementById("new"); // we need a const for the icon to add a new task
        const modal = document.getElementById("modal"); 
        const cancel = document.getElementById("cancel");
        const save = document.getElementById("save");
        const form = document.getElementById("form");
    
        function priorityColor(p) {
            switch (p) {
                case 'P1': return `<p class="m-2 w-max rounded bg-red-200 p-2 text-s">P1</p>`;
                case 'P2': return `<p class="m-2 w-max rounded bg-orange-200 p-2 text-s">P2</p>`;
                case 'P3': return `<p class="m-2 w-max rounded bg-green-200 p-2 text-s">P3</p>`;
            }
        }
    
        newTask.addEventListener("click", () => {
        modal.classList.remove('hidden');
        });
    
        cancel.addEventListener("click", () => {
        modal.classList.add('hidden');
        });
    
        save.addEventListener("click", (event) => {
        event.preventDefault();
    
        const title = document.getElementById("title").value.trim();
        const status = document.getElementById("status").value;
        const priority = document.getElementById("priority").value;
        const date = document.getElementById("date").value.trim();
        let validationMessage = '';
    
        // Initialize dates
        const currentDate = new Date();
        const dueDate = new Date(date);
    
        // Validation checks
        switch (true) {
        case title === '':
            validationMessage = 'Please Insert a Title';
            break;
        case date === '':
            validationMessage = 'Please Insert a Date';
            break;
        case dueDate < currentDate:
            validationMessage = 'The date youve entered is not valid';
            break;
        }
    
        // Show validation message if any
        if (validationMessage) {
        alert(validationMessage);
        return; // Exit the function if validation fails
        }
    
        const task = document.createElement("div");
        task.className = "task rounded-md border border-blue-400 p-2 m-2 flex flex-col";
    
        // Add title, priority, and due date
        let c = priorityColor(priority);
        task.innerHTML = `<p class="m-2 w-max rounded bg-white-100  text-s text-gray-700">${title}</p>` 
                    + c 
                    + `<p class="m-2 w-max rounded bg-gray-100 text-s text-gray-700">${date}</p>`;
    
        // Add status dropdown
        const statusDropdown = document.createElement("select");
        statusDropdown.className = "status-dropdown bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring focus:ring-blue-500";
        statusDropdown.innerHTML = `
        <option value="to-do" ${status === "to-do" ? "selected" : ""}>To Do</option>
        <option value="doing" ${status === "doing" ? "selected" : ""}>Doing</option>
        <option value="done" ${status === "done" ? "selected" : ""}>Done</option>
        `;
        task.appendChild(statusDropdown);
    
        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
        task.remove();
        });
        task.appendChild(deleteButton);
    
        // Add task to the initial board
        addTaskToBoard(status, task);
    
        // Update board when status changes
        statusDropdown.addEventListener("change", (e) => {
        const newStatus = e.target.value;
        task.remove();
        addTaskToBoard(newStatus, task);
        });
    
        // Close modal and reset form
        modal.classList.add('hidden');
        form.reset();
        });
    
        function addTaskToBoard(status, task) {
        const boardMap = {
        "to-do": "todo-board",
        "doing": "doing-board",
        "done": "done-board"
        };
    
        const board = document.getElementById(boardMap[status]);
        board.querySelector(".tasks").appendChild(task);
    
        const counter = board.querySelector("span");
        counter.textContent = board.querySelector(".tasks").children.length;
        }
    