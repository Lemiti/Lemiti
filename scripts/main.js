// Wait for DOM to load
window.addEventListener('DOMContentLoaded', () => {
  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Filter Projects
  const filters = document.querySelectorAll('[data-filter]');
  const projectGrid = document.getElementById('projectGrid');

  const projects = [
    { title: "AI Assistant", category: "ml", description: "A smart assistant using Python and NLP." },
    { title: "Portfolio Website", category: "web", description: "A stylish personal website built with HTML/CSS/JS." },
    { title: "Home Automation", category: "web", description: "IoT based smart control panel." },
    { title: "ML Predictor", category: "ml", description: "Predictive modeling using scikit-learn." },
  ];

  function renderProjects(filter = 'all') {
    projectGrid.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      card.addEventListener('click', () => openModal(project));
      projectGrid.appendChild(card);
    });
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      renderProjects(btn.getAttribute('data-filter'));
    });
  });

  // Modal Logic
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalClose = document.getElementById('modalClose');

  function openModal(project) {
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description + ' (more details soon...)';
    modal.classList.remove('hidden');
  }

  modalClose.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Please fill in all fields.';
      feedback.style.color = 'red';
      return;
    }

    feedback.textContent = 'Message sent! (Form processing stubbed.)';
    feedback.style.color = 'lime';
    contactForm.reset();
  });
  

  // Loader Fade-out
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    loader.style.display = 'none';
  });

  // Initial Render
  renderProjects();
});
