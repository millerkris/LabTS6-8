interface ListItem {
    id: string;
    text: string;
    date: string;
    isChecked: boolean;
}

const items: ListItem[] = [
    { id: '1', text: 'Элемент 1', date: '11.1.2024', isChecked: false },
    { id: '2', text: 'Элемент 2', date: '10.1.2024', isChecked: false },
    { id: '3', text: 'Элемент 3', date: '9.1.2024', isChecked: false }
];


function addListItem(text: string): void {
    if (!text.trim()) {
        alert('Вы должны что-то написать!');
        return;
    }

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const currentDateStr = `${day}.${month}.${year}`;

    const newItem: ListItem = {
        id: String(items.length + 1),
        text: text,
        date: currentDateStr,
        isChecked: false
    };

    items.push(newItem);
    renderList(items);
    renderListAndUpdateFilter('all');
}

function toggleChecked(itemId: string): void {
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.isChecked = !item.isChecked;
        renderList(items);
        renderListAndUpdateFilter('all');
    }
}

function deleteListItem(itemId: string): void {
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
        renderList(items);
        renderListAndUpdateFilter('all');
    }
}

function clearList(): void {
    items.length = 0;
    renderList(items);
}

function sortItemsByName(reverse: boolean): void {
    items.sort((a, b) => {
        const nameA = a.text.toLowerCase();
        const nameB = b.text.toLowerCase();
        return reverse ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
    renderList(items);
}

function sortItemsByDate(reverse: boolean): void {
    items.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return reverse ? dateA - dateB : dateB - dateA;
    });
    renderList(items);
}

function renderList(filteredItems: ListItem[]): void {
    const list = document.getElementById('myUL');
    if (!list) return;

    list.innerHTML = '';

    filteredItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.text;
        li.classList.add('list-item');

        const spanDate = document.createElement('span');
        spanDate.textContent = item.date;
        spanDate.classList.add('date');
        li.appendChild(document.createElement('br'));
        li.appendChild(spanDate);

        const spanClose = document.createElement('span');
        spanClose.textContent = '\u00D7';
        spanClose.classList.add('close');
        spanClose.onclick = () => deleteListItem(item.id);

        li.appendChild(spanClose);
        li.onclick = () => toggleChecked(item.id);
        li.classList.toggle('checked', item.isChecked);

        if (list) {
            list.appendChild(li);
        }
    });

    checkEmpty();
}

function checkEmpty(): void {
    const emptyMessage = document.getElementById('empty-message');
    if (emptyMessage) {
        emptyMessage.style.display = items.length === 0 ? 'block' : 'none';
    }
}

function renderListAndUpdateFilter(status: 'all' | 'done' | 'undone'): void {
    const filteredItems = status === 'all' ? items : items.filter(item => status === 'done' ? item.isChecked : !item.isChecked);
    renderList(filteredItems);
}

function filterTasks(status: 'all' | 'done' | 'undone') {
    renderList(status === 'all' ? items : items.filter(item => status === 'done' ? item.isChecked : !item.isChecked));
}




let isSortByNameReversed: boolean = false;
let isSortByDateReversed: boolean = false;

document.addEventListener('DOMContentLoaded', function () {
    const createBtn = document.getElementById('create') as HTMLButtonElement;
    const deleteListBtn = document.getElementById('deleteListItems') as HTMLButtonElement;
    const sortByNameBtn = document.getElementById('sortByName') as HTMLButtonElement;
    const sortByDateBtn = document.getElementById('sortByDate') as HTMLButtonElement;
    const filterAllBtn = document.getElementById('filterAll') as HTMLButtonElement;
    const filterDoneBtn = document.getElementById('filterDone') as HTMLButtonElement;
    const filterUndoneBtn = document.getElementById('filterNotDone') as HTMLButtonElement;

    createBtn.addEventListener('click', function () {
        const inputElement = document.getElementById('myInput') as HTMLInputElement;
        addListItem(inputElement.value);
        inputElement.value = '';
    });

    deleteListBtn.addEventListener('click', clearList);


    sortByNameBtn.addEventListener('click', () => {
        isSortByNameReversed = !isSortByNameReversed;
        sortItemsByName(isSortByNameReversed);
    });

    sortByDateBtn.addEventListener('click', () => {
        isSortByDateReversed = !isSortByDateReversed;
        sortItemsByDate(isSortByDateReversed);
    });

    filterAllBtn.addEventListener('click', () => filterTasks('all'));
    filterDoneBtn.addEventListener('click', () => filterTasks('done'));
    filterUndoneBtn.addEventListener('click', () => filterTasks('undone'));



    renderList(items);
});