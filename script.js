const hero = document.querySelector('.hero');
const bubble = document.getElementById('bubble');

hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left - bubble.offsetWidth / 2;
  const y = e.clientY - rect.top - bubble.offsetHeight / 2;

  bubble.style.transform = `translate(${x}px, ${y}px)`;
});

hero.addEventListener('mouseleave', () => {
  bubble.style.transform = `translate(-9999px, -9999px)`; // Hide bubble
});
