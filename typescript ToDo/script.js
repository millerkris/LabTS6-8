var items = [
    { id: '1', text: 'Элемент 1', date: '11.1.2024', isChecked: false },
    { id: '2', text: 'Элемент 2', date: '10.1.2024', isChecked: false },
    { id: '3', text: 'Элемент 3', date: '9.1.2024', isChecked: false }
];
function addListItem(text) {
    if (!text.trim()) {
        alert('Вы должны что-то написать!');
        return;
    }
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var currentDateStr = "".concat(day, ".").concat(month, ".").concat(year);
    var newItem = {
        id: String(items.length + 1),
        text: text,
        date: currentDateStr,
        isChecked: false
    };
    items.push(newItem);
    renderList(items);
    renderListAndUpdateFilter('all');
}
function toggleChecked(itemId) {
    var item = items.find(function (item) { return item.id === itemId; });
    if (item) {
        item.isChecked = !item.isChecked;
        renderList(items);
        renderListAndUpdateFilter('all');
    }
}
function deleteListItem(itemId) {
    var index = items.findIndex(function (item) { return item.id === itemId; });
    if (index !== -1) {
        items.splice(index, 1);
        renderList(items);
        renderListAndUpdateFilter('all');
    }
}
function clearList() {
    items.length = 0;
    renderList(items);
}
function sortItemsByName(reverse) {
    items.sort(function (a, b) {
        var nameA = a.text.toLowerCase();
        var nameB = b.text.toLowerCase();
        return reverse ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
    renderList(items);
}
function sortItemsByDate(reverse) {
    items.sort(function (a, b) {
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return reverse ? dateA - dateB : dateB - dateA;
    });
    renderList(items);
}
function renderList(filteredItems) {
    var list = document.getElementById('myUL');
    if (!list)
        return;
    list.innerHTML = '';
    filteredItems.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item.text;
        li.classList.add('list-item');
        var spanDate = document.createElement('span');
        spanDate.textContent = item.date;
        spanDate.classList.add('date');
        li.appendChild(document.createElement('br'));
        li.appendChild(spanDate);
        var spanClose = document.createElement('span');
        spanClose.textContent = '\u00D7';
        spanClose.classList.add('close');
        spanClose.onclick = function () { return deleteListItem(item.id); };
        li.appendChild(spanClose);
        li.onclick = function () { return toggleChecked(item.id); };
        li.classList.toggle('checked', item.isChecked);
        if (list) {
            list.appendChild(li);
        }
    });
    checkEmpty();
}
function checkEmpty() {
    var emptyMessage = document.getElementById('empty-message');
    if (emptyMessage) {
        emptyMessage.style.display = items.length === 0 ? 'block' : 'none';
    }
}
function renderListAndUpdateFilter(status) {
    var filteredItems = status === 'all' ? items : items.filter(function (item) { return status === 'done' ? item.isChecked : !item.isChecked; });
    renderList(filteredItems);
}
function filterTasks(status) {
    renderList(status === 'all' ? items : items.filter(function (item) { return status === 'done' ? item.isChecked : !item.isChecked; }));
}
var isSortByNameReversed = false;
var isSortByDateReversed = false;
document.addEventListener('DOMContentLoaded', function () {
    var createBtn = document.getElementById('create');
    var deleteListBtn = document.getElementById('deleteListItems');
    var sortByNameBtn = document.getElementById('sortByName');
    var sortByDateBtn = document.getElementById('sortByDate');
    var filterAllBtn = document.getElementById('filterAll');
    var filterDoneBtn = document.getElementById('filterDone');
    var filterUndoneBtn = document.getElementById('filterNotDone');
    createBtn.addEventListener('click', function () {
        var inputElement = document.getElementById('myInput');
        addListItem(inputElement.value);
        inputElement.value = '';
    });
    deleteListBtn.addEventListener('click', clearList);
    sortByNameBtn.addEventListener('click', function () {
        isSortByNameReversed = !isSortByNameReversed;
        sortItemsByName(isSortByNameReversed);
    });
    sortByDateBtn.addEventListener('click', function () {
        isSortByDateReversed = !isSortByDateReversed;
        sortItemsByDate(isSortByDateReversed);
    });
    filterAllBtn.addEventListener('click', function () { return filterTasks('all'); });
    filterDoneBtn.addEventListener('click', function () { return filterTasks('done'); });
    filterUndoneBtn.addEventListener('click', function () { return filterTasks('undone'); });
    renderList(items);
});
