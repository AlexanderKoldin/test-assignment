async function fetchData() {
  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      createTable(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function createTable(data) {
  const tableContainer = document.getElementById('data-table');
  const table = document.createElement('table');

  
  const headerRow = table.insertRow();
  const headers = ['ID', 'Title', 'Body'];
  headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
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


fetchData();
