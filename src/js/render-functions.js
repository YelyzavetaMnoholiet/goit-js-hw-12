export function createMarkup(array) {
  return array
    .map(
      ({
        webformatURL: smallImg,
        largeImageURL: bigImg,
        tags: alt,
        likes = 0,
        views = 0,
        comments = '',
        downloads = 0,
      }) => {
        return `
      <div class="images-gallery">
                <div class="loader" style="display: block;"></div> 
                <a href="${bigImg}">
                    <img src="${smallImg}" alt="${alt}" />
                </a>
                <div class="content">
                    <div><p>Likes</p><span>${likes}</span></div>
                    <div><p>Views</p><span>${views}</span></div>
                    <div><p>Comments</p><span>${comments}</span></div>
                    <div><p>Downloads</p><span>${downloads}</span></div>
                </div>
            </div>
      `;
      }
    )
    .join('');
}

export function setupImageLoadHandlers(container) {
  const images = container.querySelectorAll('.images-gallery img');
  images.forEach(img => {
    const loader = img.closest('.images-gallery').querySelector('.loader');
    img.onload = () => {
      loader.style.display = 'none';
    };
    img.onerror = () => {
      loader.style.display = 'none';
    };
  });
}
