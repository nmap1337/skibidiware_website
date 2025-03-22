export const initNavigation = () => {
  // Move nav dot functionality here
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        document.querySelector(`.nav-dot[data-section="${entry.target.id}"]`)
          ?.classList.add('active');
      } else {
        document.querySelector(`.nav-dot[data-section="${entry.target.id}"]`)
          ?.classList.remove('active');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Add smooth scroll
  document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const section = document.getElementById(dot.dataset.section);
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });
};