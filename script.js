const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container')
const fragment = document.createDocumentFragment();

console.log(document.body.scrollHeight);
console.log(document.getElementById('root').scrollHeight);
console.log(document.body.clientHeight);
console.log(window.innerHeight);

function search(){
  container.innerHTML = "";
  const pattern = document.getElementById('pattern').value;

  let index = 0;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${pattern}&maxResults=20&startIndex=${index}`)
  .then(response => response.json())
  .then(data => {

    //console.log(data);

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
    }

    container.appendChild(fragment);
    root.appendChild(container);

  }
  )
}

document.addEventListener('scroll', () => {
  if (document.body.scrollHeight - document.body.scrollTop == window.innerHeight && document.getElementsByClassName('card').length > 0){
    index = document.getElementsByClassName('card').length;
    const pattern = document.getElementById('pattern').value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${pattern}&maxResults=20&startIndex=${index}`)
    .then(response => response.json())
    .then(data => {

      //console.log(data);

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
      }

      container.appendChild(fragment);
      root.appendChild(container);

    }
    )

  }

})
