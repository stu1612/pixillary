const auth = '563492ad6f91700001000001db00d83252334c68b8353b018e374792';

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search-input');
const form = document.getElementById('search-form');
let searchValue;
const more = document.getElementById('more');
let page = 1;
let fetchLink;
let currentSearch;

// Event Listener
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})

more.addEventListener('click', getMore);

// Functions
function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        // gallery img div
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src="${photo.src.large}"></img>
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href="${photo.src.original}" target="_blank">Download</a>
            </div>
        `;

        // const galleryTxt = document.createElement('p');
        // galleryTxt.classList.add('gallery-text');
        // galleryTxt.innerHTML = `<p>${photo.photographer}</p>`;
        // galleryImg.appendChild(galleryTxt);

        // const galleryLink = document.createElement('a');
        // galleryLink.classList.add('gallery-link');
        // galleryLink.innerHTML = `<a href="${photo.src.original}">Download</a>`;
        // galleryImg.appendChild(galleryLink);

        gallery.appendChild(galleryImg);
    });
}


// GET random photos onPage load
async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}


// Search photos functionality
async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function getMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}


curatedPhotos();