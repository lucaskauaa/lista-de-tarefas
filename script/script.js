const body = document.querySelector('body');
const header = document.querySelector('header');
const lightModeBtn = document.getElementById('whiteMode');
const darkModeBtn = document.getElementById('darkMode');
const taskContainer = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const main = document.getElementById('main');

const taskList = [];

function applyElementStyle(element, styles) {
    element.style.cssText = styles;
}

function switchTheme(isDark) {
    const theme = {
        light: {
            bodyBg: 'white',
            headerColor: 'black',
            lightModeSrc: '../images/white-black.png',
            darkModeSrc: '../images/dark-black.png',
            lightModeBorder: '0.5px solid black',
            darkModeBorder: 'none',
            taskContainerStyle: `
                background-color: white;
                border-color: black;
            `,
            addButtonStyle: `
                background-color: white;
                color: black;
                border-color: black;
            `,
            inputBorder: 'black',
            boxShadow: ''
        },
        dark: {
            bodyBg: '#2E3242',
            headerColor: 'white',
            lightModeSrc: '../images/white-white.png',
            darkModeSrc: '../images/dark-white.png',
            lightModeBorder: 'none',
            darkModeBorder: '0.5px solid white',
            taskContainerStyle: `
                background-color: #352E42;
                border-color: white;
            `,
            addButtonStyle: `
                background-color: #2E3242;
                color: white;
                border-color: white;
            `,
            inputBorder: '#dcdcdc',
            boxShadow: 'none'
        }
    };

    const style = isDark ? theme.dark : theme.light;

    body.style.backgroundColor = style.bodyBg;
    body.style.boxShadow = style.boxShadow;
    header.style.color = style.headerColor;
    lightModeBtn.src = style.lightModeSrc;
    darkModeBtn.src = style.darkModeSrc;
    lightModeBtn.style.borderBottom = style.lightModeBorder;
    darkModeBtn.style.borderBottom = style.darkModeBorder;

    applyElementStyle(taskContainer, style.taskContainerStyle);
    applyElementStyle(addButton, style.addButtonStyle);
    taskInput.style.borderColor = style.inputBorder;
}

function createTaskElement(taskText) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    applyElementStyle(checkbox, `
        min-width: 18px;
        min-height: 18px;
        cursor: pointer;
    `);

    const text = document.createElement('div');
    text.textContent = taskText;
    text.style.textAlign = 'center';

    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../images/delete.png';
    deleteIcon.style.cursor = 'pointer';

    const taskElement = document.createElement('div');
    taskElement.setAttribute('id', 'content');
    taskElement.appendChild(checkbox);
    taskElement.appendChild(text);
    taskElement.appendChild(deleteIcon);

    applyElementStyle(taskElement, `
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
    `);

    const applyHoverEffect = (event, color) => {
        taskElement.addEventListener(event, () => {
            taskElement.style.backgroundColor = color;
        }, false);
    };

    applyHoverEffect('mouseenter', '#B5B5B5');
    applyHoverEffect('mouseleave', '#dcdcdc');

    checkbox.addEventListener('click', () => {
        const isChecked = checkbox.checked;
        text.style.textDecoration = isChecked ? 'line-through' : 'none';
        taskElement.style.backgroundColor = isChecked ? '#55F03A' : '#dcdcdc';
        taskElement.style.order = isChecked ? '1' : '0';

        applyHoverEffect('mouseenter', isChecked ? '#47C930' : '#B5B5B5');
        applyHoverEffect('mouseleave', isChecked ? '#55F03A' : '#dcdcdc');
    });

    deleteIcon.addEventListener('click', () => {
        taskElement.remove();
        taskList.splice(taskList.indexOf(text.textContent), 1);
    });

    main.appendChild(taskElement);
}

lightModeBtn.addEventListener('click', () => switchTheme(false));
darkModeBtn.addEventListener('click', () => switchTheme(true));

addButton.addEventListener('click', () => {
    const task = taskInput.value.trim();

    if (task === '') {
        alert('Por favor, insira uma tarefa.');
    } else if (taskList.includes(task)) {
        alert('Essa tarefa já foi adicionada!');
    } else {
        taskList.push(task);
        createTaskElement(task);
    }

    taskInput.value = '';
    taskInput.focus();
});
