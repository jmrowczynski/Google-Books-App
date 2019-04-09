const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container')
const fragment = document.createDocumentFragment();

function search(){
  container.innerHTML = "";
  const pattern = document.getElementById('pattern').value;


  fetch(`https://www.googleapis.com/books/v1/volumes?q=${pattern}&maxResults=40`)
  .then(response => response.json())
  .then(data => {

    console.log(data);

    for (let i = 0; i < data.items.length;  i++) {
      const card = document.createElement('div');
      card.setAttribute('class', 'card')
      const t = document.createElement('h4');
      t.textContent = data.items[i].volumeInfo.title;
      const image = document.createElement('img');
      // checking if imageLinks is in object
      if ('imageLinks' in data.items[i].volumeInfo){
        image.src = data.items[i].volumeInfo.imageLinks.thumbnail;
      }

      const descript = document.createElement('p');
      if ('description' in data.items[i].volumeInfo){
        descript.textContent = data.items[i].volumeInfo.description.slice(0, 150) + '...';
      }


      card.appendChild(image);
      card.appendChild(t);
      card.appendChild(descript);
      fragment.appendChild(card);
      // console.log(data.items[i].volumeInfo.title);
    }

    container.appendChild(fragment);
    root.appendChild(container);

  }
  )
}
