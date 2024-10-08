let originalData = [];
let sortOrder = { id: true, title: true, body: true };

async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        originalData = await response.json();
        createTable(originalData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createTable(data) {
    const tableContainer = document.getElementById('data-table');
    tableContainer.innerHTML = ''; // Очистка контейнера

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['ID', 'Title', 'Body'];

    headers.forEach((headerText, index) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        th.addEventListener('click', () => sortTable(data, headerText.toLowerCase()));
        headerRow.appendChild(th);
    });

    data.forEach(post => {
        const row = table.insertRow();
        row.insertCell().textContent = post.id;
        row.insertCell().textContent = post.title;
        row.insertCell().textContent = post.body;
    });

    tableContainer.appendChild(table);
}

function sortTable(data, column) {
    const order = sortOrder[column];
    data.sort((a, b) => {
        if (a[column] < b[column]) return order ? -1 : 1;
        if (a[column] > b[column]) return order ? 1 : -1;
        return 0;
    });
    sortOrder[column] = !order;
    createTable(data);
}

document.getElementById('search-input').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    if (query.length >= 3) {
        const filteredData = originalData.filter(post =>
            post.title.toLowerCase().includes(query) || 
            post.body.toLowerCase().includes(query)
        );
        createTable(filteredData);
    } else {
        createTable(originalData);
    }
});

// Вызываем функцию для получения и отображения данных
fetchData();
