const body = document.querySelector('body');
const header = document.querySelector('header');
const whiteMode = document.getElementById('whiteMode');
const darkMode = document.getElementById('darkMode');
const addTask = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const main = document.getElementById('main');
const list = [];

whiteMode.addEventListener('click', () => {
    body.style.backgroundColor = 'White';
    header.style.color = 'black';
    whiteMode.src = '../images/white-black.png';
    darkMode.src = '../images/dark-black.png';
    whiteMode.style.borderBottom = '0.5px solid black';
    darkMode.style.borderBottom = 'none';
    addTask.style.cssText = `
        background-color: white;
        border-color: Black;
    `;
    addButton.style.cssText = `
        background-color: white;
        color: black;
        border-color: black;
    `;
    taskInput.style.borderColor = 'black';
})

darkMode.addEventListener('click', () => {
    body.style.backgroundColor = '#2E3242'
    body.style.boxShadow = 'none'
    header.style.color = 'White';
    whiteMode.src = '../images/white-white.png';
    darkMode.src = '../images/dark-white.png';
    darkMode.style.borderBottom = '0.5px solid white';
    whiteMode.style.borderBottom = 'none';
    addTask.style.cssText = `
        background-color: #352E42;
        border-color: white;
    `;
    addButton.style.cssText = `
        background-color: #2E3242;
        color: white;
        border-color: white;
    `;
    taskInput.style.borderColor = '#dcdcdc';
})

addButton.addEventListener('click', () => {

    if(list.includes(taskInput.value)) {
        window.alert('Tarefa já adicionada!');
    } else if (taskInput.value == '') {
        window.alert('Insira uma tarefa!');
    } else {
        list.push(taskInput.value);
       
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.style.cssText = `
            min-width: 18px;
            min-height: 18px;
            cursor: pointer;
        `;
        const text = document.createElement('div');
        text.textContent = taskInput.value;
        text.style.textAlign = 'center';

        const deleteTask = document.createElement('img');
        deleteTask.src = '../images/delete.png';
        deleteTask.style.cursor = 'pointer';

        const div = document.createElement('div');

        div.appendChild(check);
        div.appendChild(text);
        div.appendChild(deleteTask);

        div.style.cssText = `
            background-color: #dcdcdc;
            font-size: 18px;
            width: 350px;
            padding: 10px 15px;
            border-radius: 5px;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.253);
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 7px;
        `;

        div.setAttribute('id', 'content');

        const createHoverEvent = (event, color) => {
            div.addEventListener(event, () => {
                div.style.backgroundColor = color;
            }, false);
        }

        createHoverEvent('mouseenter', '#B5B5B5');
        createHoverEvent('mouseleave', '#dcdcdc');

        main.appendChild(div);

        check.addEventListener('click', () => {
            if (!!check.checked) {
                text.style.textDecoration = 'line-through';
                div.style.backgroundColor = '#55F03A';
                div.style.order = '1';

                createHoverEvent('mouseenter', '#47C930');
                createHoverEvent('mouseleave', '#55F03A');
            } else {
                text.style.textDecoration = 'none';
                div.style.backgroundColor = '#dcdcdc';
                div.style.order = '0';

                createHoverEvent('mouseenter', '#B5B5B5');
                createHoverEvent('mouseleave', '#dcdcdc');
            }
        })

        deleteTask.addEventListener('click', () => {
            div.remove();
            list.splice(list.indexOf(text.textContent), 1);
        })
    }

    taskInput.value = '';
    taskInput.focus();
})