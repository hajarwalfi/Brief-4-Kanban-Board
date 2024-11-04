       // Start the code for manipulating the modal buttons////////////////////////////////////////////////////////////////

        const add = document.getElementById("new"); // The button that when clicked opens a form to add a new task 
        const modal = document.getElementById("modal"); //The popup where the user can enter his infos
        const cancel = document.getElementById("cancel");
        const save = document.getElementById("save");
        const form = document.getElementById("form");
    
        add.addEventListener("click", () => {
        modal.classList.remove('hidden');
        });
        
    
        cancel.addEventListener("click", () => {
        modal.classList.add('hidden');
        });
    
        save.addEventListener("click", (event) => {
        event.preventDefault();

        //End code for the modal everything is perfect on how to manipulate the behavior of the modal.

    
        const title = document.getElementById("title").value;
        const status = document.getElementById("status").value;
        const priority = document.getElementById("priority").value;
        const date = document.getElementById("date").value;

        //Error handeling///////////////////////////////////////////////////////////////////////////////////////////////////////
        let error = '';
        const today = new Date();
        const due = new Date(date);
        if (title === '') {
            error = 'Please Insert a Title';
        } else if (date === '') {
            error = 'Please Insert a Date';
        } else if (due < today) {
            error = 'Please insert a vzlid fdte';
        }
        if (error) {
        alert(error);
        return; 
        }
        //end error handeling////////////////////////////////////////////////////////////////////////////////////////////////////////


        //Start  Creating  a task div and its content////////////////////////////////////////////////////////////////////////////////////////////////////////
        const task = document.createElement("div");
        task.className = "task rounded-md border border-blue-400 p-2 m-2 flex flex-col";

        function priorityColor(p) {
            switch (p) {
                case 'P1': return `<p class="m-2 w-max rounded bg-red-200 p-2 text-s">P1</p>`;
                case 'P2': return `<p class="m-2 w-max rounded bg-orange-200 p-2 text-s">P2</p>`;
                case 'P3': return `<p class="m-2 w-max rounded bg-green-200 p-2 text-s">P3</p>`;
            }
        }

       
        let c = priorityColor(priority);
        task.innerHTML = `<p class="m-2 w-max rounded bg-white-100  text-s text-gray-700">${title}</p>` 
                    + c 
                    + `<p class="m-2 w-max rounded bg-gray-100 text-s text-gray-700">${date}</p>`;
        
        addTaskToBoard(status, task);
        count(status);

        //Start  Creating  a task div and its content////////////////////////////////////////////////////////////////////////////////////////////////////////

    
        //edit button start  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const edit = document.createElement("select");
        edit.className = "edit bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring focus:ring-blue-500";
                    
        const todo = document.createElement("option");
        todo.value = "to-do";
        todo.textContent = "To Do";
        if (status === "to-do") {
        todo.selected = true;
        }
        edit.appendChild(todo);
        
                    
        const doing = document.createElement("option");
        doing.value = "doing";
        doing.textContent = "Doing";
        if (status === "doing") {
        doing.selected = true;
        }
        edit.appendChild(doing);
                    
        const done = document.createElement("option");
        done.value = "done";
        done.textContent = "Done";
        if (status === "done") {
        done.selected = true;
        }
        edit.appendChild(done);
                    
        task.appendChild(edit);
        edit.addEventListener("change", (e) => {
        const newStatus = e.target.value;
        task.remove();
        addTaskToBoard(newStatus, task);
        });
        
          
        function addTaskToBoard(status, task) {
            const toDoBoard = document.getElementById("todo-board");
            const doingBoard = document.getElementById("doing-board");
            const doneBoard = document.getElementById("done-board");
        
            if (status === "to-do") {
                toDoBoard.appendChild(task);
            } else if (status === "doing") {
                doingBoard.appendChild(task);
            } else if (status === "done") {
                doneBoard.appendChild(task);
            }
            count(status);
        }

        //edit button end ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // delete button start////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const deletebtn = document.createElement("button");
        deletebtn.className = "mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600";
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener("click", () => {
        task.remove();
        count(status);
        });
        task.appendChild(deletebtn);
        

        
        // dlete button end ////////////////////////////////////////////////////////////////////////////////////////////
        

        modal.classList.add('hidden');
        form.reset();
        });
        // calculate the the tasks /////////////////////////////////////////////////////////////////////////////////////////
        function count(status) {
            let board;
            if (status === "to-do") {
                board = document.getElementById("todo-board");
            } else if (status === "doing") {
                board = document.getElementById("doing-board");
            } else if (status === "done") {
                board = document.getElementById("done-board");
            }
            
            const count = board.querySelector("span");
            count.textContent = board.querySelectorAll(".task").length;
        }
    