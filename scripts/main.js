// DOM Load Handler
window.addEventListener('DOMContentLoaded', () => {
  // --- Loader ---
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => loader.style.display = 'none');

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({ 
        behavior: 'smooth' 
      });
      // Close mobile menu if open
      document.querySelector('.nav-links').classList.remove('active');
    });
  });

  // --- Hamburger Menu ---
  document.getElementById('hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
  });

  // --- Project Filtering ---
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectGrid = document.getElementById('projectGrid');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      // Highlight active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      // Filter projects
      Array.from(projectGrid.children).forEach(project => {
        const show = filter === 'all' || project.dataset.category === filter;
        project.style.display = show ? 'block' : 'none';
      });
    });
  });

  // --- Modal System ---
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('modalTitle').textContent = 
        card.querySelector('h3').textContent;
      document.getElementById('modalDescription').innerHTML = `
        ${card.querySelector('p').textContent}<br><br>
        <b>Tech Used:</b> ${card.dataset.tech || 'Not specified'}<br>
        ${card.dataset.link ? 
          `<a href="${card.dataset.link}" target="_blank">View Project</a>` : ''}
      `;
      modal.classList.remove('hidden');
    });
  });

  modalClose.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // --- Formspree Contact Form ---
  const contactForm = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = 'Sending...';
    feedback.style.color = 'gray';

    try {
      const response = await fetch('https://formspree.io/f/mqabgkwj', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        feedback.textContent = 'Message sent successfully!';
        feedback.style.color = 'lime';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      feedback.textContent = 'Error sending message. Please try again later.';
      feedback.style.color = 'red';
      console.error('Form error:', error);
    }
  });
});