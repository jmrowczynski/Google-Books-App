const app = document.getElementById('root');
const container = document.createElement('div');
container.classList.add('container');
const btn = document.querySelector('.sbtn');

const createTemplate = (data) => {
  data.items.map(book => {
    const { imageLinks, title, description } = book.volumeInfo;
    const image = imageLinks && imageLinks.thumbnail || 'https://via.placeholder.com/128x192';
    
    container.innerHTML += 
    `<div class="card">
      <img src=${image}/>
      <h4>${title}</h4>
      <p>${(description || '').split(' ', 15).join(' ')}...</p>
    </div>
    `
  });
  app.appendChild(container);
}

const search = async () => {
  const pattern = document.getElementById('pattern').value;
  const index = container.children.length || 0;

  const fetchData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pattern}&maxResults=20&startIndex=${index}`)
  const response = await fetchData.json();
  const data = await response;

  return createTemplate(data);
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  container.innerHTML = '';
  search();
});

document.addEventListener('scroll', () => {
  if(container.getBoundingClientRect().bottom - 200 < window.innerHeight){
    search();
  }
})
