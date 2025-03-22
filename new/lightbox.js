let currentZoom = 1;
const zoomStep = 0.1;
const maxZoom = 3;
const minZoom = 0.5;

function initLightbox() {
  // Only initialize if lightbox elements exist
  if (!document.getElementById('lightbox')) {
    return;
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target.id === 'lightbox') {
      closeLightbox();
    }
  });

  // Prevent zoom controls from closing lightbox
  const zoomControls = document.querySelector('.zoom-controls');
  if (zoomControls) {
    zoomControls.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
}

function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (!lightbox || !lightboxImg) return;
  
  lightboxImg.src = img.src;
  lightbox.classList.add('active');
  currentZoom = 1;
  updateZoom();
  
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  
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
  if (!lightboxImg) return;
  
  lightboxImg.style.transform = `scale(${currentZoom})`;
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', initLightbox);