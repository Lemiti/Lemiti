window.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map');

  if (mapContainer) {
    const map = L.map('map').setView([9.03, 38.74], 13); // Example: Addis Ababa

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([9.03, 38.74]).addTo(map)
      .bindPopup('Lemi\'s Location')
      .openPopup();
  }
});
