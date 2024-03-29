const API_CLIENTID = 'c329911bbe017f5a22ef047bf3df4c75750c220b91f960655a3592bb01217980'
const form = document.querySelector('form');
const input = document.querySelector('input');
const imageSection = document.querySelector('.images');
let page = 1;
const API_URL = `https://api.unsplash.com/search/photos?page=${page}&per_page=10&client_id=${API_CLIENTID}`



form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  let searchTerm = input.value;

  searchStart();
  search(searchTerm)
    .then(displayImages)

    var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    document.getElementById("totalPages").innerHTML = 'Total Pages: ' + myObj.total_pages;
    document.getElementById("totalImages").innerHTML = 'Total Images: ' + myObj.total;
  }
};

xmlhttp.open("GET", `${API_URL}&query=${searchTerm}`, true);
xmlhttp.send();
}

function searchStart() {
  imageSection.innerHTML = '';
}

function search(searchTerm) {
  let searchUrl = `${API_URL}&query=${searchTerm}`;

// GET Query for getting Data from JSON
//   $.getJSON(searchUrl, function(data) {
//     console.log(data.results[0].user);
    
//  });


  console.log(searchUrl)
  return fetch(searchUrl)
    .then(response => response.json())
    .then(result => {
      return result.results;
    });
}


// Next Page
document.getElementById("next").addEventListener("click", nextPage);

function nextPage(event) {
  event.preventDefault();
  let searchTerm = input.value;

  searchStart();
  next(searchTerm)
    .then(displayImages);
    page++;
    console.log(page);
    document.getElementById("currentPage").innerHTML = '| Current Page: ' + page;

}

function next(searchTerm) {
  let url = `https://api.unsplash.com/search/photos?page=${page + 1}&per_page=10&client_id=${API_CLIENTID}&query=${searchTerm}`
  console.log(url)
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.results;
    });
}

// Previous Page
document.getElementById("previous").addEventListener("click", prevPage);

function prevPage(event) {
  event.preventDefault();
  let searchTerm = input.value;

  searchStart();
  prev(searchTerm)
    .then(displayImages);
    page--;
    console.log(page);
    
    

    if(page == 0){
      $('#previous').attr('disabled','disabled');
      document.getElementById("currentPage").innerHTML = ' ';
    } else {
      document.getElementById("currentPage").innerHTML = ' | Current Page: ' + page;
    }
    
}

function prev(searchTerm) {
  let url = `https://api.unsplash.com/search/photos?page=${page - 1}&per_page=10&client_id=${API_CLIENTID}&query=${searchTerm}`
  console.log(url)
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.results;
    });
}




//Display images
function displayImages(images) {
  images.forEach(image => {
    let imageContainer = document.createElement('div');
    imageContainer.className = 'ImageResult'
    imageContainer.innerHTML = `<img src="${image.urls.regular}">
    <a href='${image.links.html}' target="_blank" class="view_link">View on Unsplash</a>
    <a href="${image.user.name}" target="_blank" class="user_link">Photo by: ${image.user.name}</a>`;
    imageSection.appendChild(imageContainer);
    console.log(`${image.user.name}`);
    
  });
}



