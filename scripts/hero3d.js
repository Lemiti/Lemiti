// 3D Background Initialization
function initHero3D() {
  try {
    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      canvas: document.getElementById('heroCanvas'),
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Responsive Handling ---
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- Particles ---
    const particleCount = window.innerWidth < 768 ? 200 : 400; // Mobile-friendly
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    camera.position.z = 30;

    // --- Animation ---
    function animate() {
      requestAnimationFrame(animate);
      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.0007;
      renderer.render(scene, camera);
    }

    animate();
  } catch (error) {
    console.error('3D Background failed:', error);
    document.getElementById('heroCanvas').style.display = 'none';
  }
}

// Start only when visible (Intersection Observer)
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    initHero3D();
    heroObserver.disconnect();
  }
}, { threshold: 0.1 });

heroObserver.observe(document.querySelector('.hero-section'));