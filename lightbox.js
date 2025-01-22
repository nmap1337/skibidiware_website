let currentZoom = 1;
const zoomStep = 0.1;
const maxZoom = 3;
const minZoom = 0.5;

function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  lightboxImg.src = img.src;
  lightbox.classList.add('active');
  currentZoom = 1;
  updateZoom();
  
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function zoomIn() {
  if (currentZoom < maxZoom) {
    currentZoom += zoomStep;
    updateZoom();
  }
}

function zoomOut() {
  if (currentZoom > minZoom) {
    currentZoom -= zoomStep;
    updateZoom();
  }
}

function updateZoom() {
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.style.transform = `scale(${currentZoom})`;
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target.id === 'lightbox') {
    closeLightbox();
  }
});

// Prevent zoom controls from closing lightbox
document.querySelector('.zoom-controls').addEventListener('click', function(e) {
  e.stopPropagation();
});