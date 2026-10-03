// Filtrado interactivo de habilidades
function filterSkills(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active-filter'));

  const clickedBtn = event.target;
  clickedBtn.classList.add('active-filter');

  const tags = document.querySelectorAll('.skill-tag');
  tags.forEach(tag => {
    if (category === 'all' || tag.getAttribute('data-cat') === category) {
      tag.style.display = 'inline-block';
    } else {
      tag.style.display = 'none';
    }
  });
}