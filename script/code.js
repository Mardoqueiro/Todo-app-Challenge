
let todoItems = [];

document.querySelector('.add-btn').addEventListener('click', addItem);
document.querySelector('.sort-btn').addEventListener('click', sortItems);

function addItem() {
    const input = document.querySelector('.todo-input');
    const value = input.value.trim();

    if (value === '' || value.length < 3) {
        alert('Invalid input.');
        return;
    }

    const newItem = {
        id: Date.now(),
        name: value.charAt(0).toUpperCase() + value.slice(1),
        completed: false
    };

    todoItems.push(newItem);
    renderItems();
    input.value = '';
}

function sortItems() {
    if (!todoItems.length) {
        return;
    }

    todoItems.sort((a, b) => a.name.localeCompare(b.name));
    renderItems();
}

function renderItems() {
    const list = document.querySelector('.todo-list');
    if (!list) return;

    list.innerHTML = '';

    todoItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" ${item.completed ? 'checked' : ''}>
            <span>${item.name}</span>
            <button class="close-btn" data-id="${item.id}">X</button>
        `;

        listItem.querySelector('input').addEventListener('change', () => {
            item.completed = !item.completed;
            renderItems();
        });

        listItem.querySelector('.close-btn').addEventListener('click', () => {
            const id = parseInt(listItem.querySelector('.close-btn').getAttribute('data-id'));
            if (isNaN(id) || id < 0) return;

            todoItems = todoItems.filter(item => item.id !== id);
            renderItems();
        });

        list.appendChild(listItem);
    });
}
