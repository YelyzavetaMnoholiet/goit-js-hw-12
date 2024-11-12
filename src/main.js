import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchData } from './js/pixabay-api';
import { createMarkup, setupImageLoadHandlers } from './js/render-functions';

const form = document.querySelector('.form');
const container = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('load-more');
let lightbox = null;
let searchQuery = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSearch(event) {
  event.preventDefault();
  container.innerHTML = '';
  page = 1;
  searchQuery = event.target.elements.textName.value.trim();

  if (searchQuery === '') {
    iziToast.warning({
      title: 'Hey',
      message: 'You forgot important data',
      color: 'red',
    });
    return;
  }

  await loadImages();
}

async function loadImages() {
  try {
    const data = await fetchData(searchQuery, page, perPage);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Sorry',
        message: 'No images found. Try a different search!',
        color: 'orange',
      });
      loadMoreBtn.style.display = 'none';
      return;
    }

    container.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    setupImageLoadHandlers(container);

    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery .images-gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }

    if (page * perPage >= data.totalHits) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        color: 'blue',
      });
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Fetch error: ${error.message}`,
      color: 'red',
    });
  }
}

function loadMoreImages() {
  page += 1;
  loadImages();
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
