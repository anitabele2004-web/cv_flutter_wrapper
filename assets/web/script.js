// 1. Filtrado dinámico de habilidades
function filterSkills(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active-filter'));

  const clickedBtn = event.target;
  clickedBtn.classList.add('active-filter');

  const items = document.querySelectorAll('.skill-item');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-cat') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 2. Control de pestañas (Tabs)
function switchTab(tabId) {
  // Ocultar todos los contenidos
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.add('hidden');
  });

  // Desactivar botones de tab
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active-tab');
    btn.classList.add('text-slate-400', 'border-transparent');
  });

  // Mostrar la pestaña seleccionada
  const activeContent = document.getElementById('content-' + tabId);
  const activeBtn = document.getElementById('tab-' + tabId);

  if (activeContent) activeContent.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('active-tab');
    activeBtn.classList.remove('text-slate-400', 'border-transparent');
  }
}

// 3. Modo Oscuro con LocalStorage
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');

  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    icon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    icon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Cargar preferencia previa
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = '☀️';
}

// 4. Copiar al Portapapeles con Toast
function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');

    setTimeout(() => {
      toast.classList.remove('opacity-100');
      toast.classList.add('opacity-0', 'pointer-events-none');
    }, 2000);
  });
}