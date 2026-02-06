// 🔁 Scroll fluide sur les liens du menu
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      const offset = target.offsetTop - 60;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  });
});

// 👤 Menu profil toggle
const profileToggle = document.getElementById("profileToggle");
const profileMenu = document.getElementById("profileMenu");

if (profileToggle && profileMenu) {
  profileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = profileMenu.style.display === "flex";
    profileMenu.style.display = isVisible ? "none" : "flex";
  });

  document.addEventListener("click", () => {
    profileMenu.style.display = "none";
  });
}

// 👁️ Apparition fluide des sections au scroll
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});

function openPopup(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.style.display = 'flex';
  el.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  const first = el.querySelector('input');
  if(first) first.focus();
}

function closePopup(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.style.display = 'none';
  el.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

function switchPopup(){
  const login = document.getElementById('loginPopup');
  const register = document.getElementById('registerPopup');
  if(login && login.style.display === 'flex'){
    closePopup('loginPopup');
    openPopup('registerPopup');
  } else {
    closePopup('registerPopup');
    openPopup('loginPopup');
  }
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    ['loginPopup','registerPopup'].forEach(id => {
      const el = document.getElementById(id);
      if(el && el.style.display === 'flex') closePopup(id);
    });
  }
});

// Close when clicking outside frame
['loginPopup','registerPopup'].forEach(id => {
  document.addEventListener('click', (ev) => {
    const el = document.getElementById(id);
    if(!el) return;
    if(el.style.display === 'flex' && ev.target === el) closePopup(id);
  });
});

// Close viewer (tu peux garder si tu veux)
document.addEventListener('click', (e) => {
  if(e.target.id === 'viewer' || e.target.id === 'viewerClose'){
    const viewer = document.getElementById('viewer');
    if(viewer) { viewer.style.display = 'none'; document.body.style.overflow = ''; }
  }
});

// 📧 Téléphone / Email popup
function copyToClipboard(elementId) { 
  if (elementId === 'email') { 
    openPopup('emailPopup'); 
  } else if (elementId === 'phone') { 
    openPopup('phonePopup'); 
  } 
}
function animateCircle(id, percent) {
    const circle = document.querySelector(`#${id} .progress`);
    const value = document.querySelector(`#${id} .value`);

    let current = 0;
    const target = percent;
    const speed = 20; // plus petit = plus rapide

    const interval = setInterval(() => {
        if (current >= target) {
            clearInterval(interval);
        } else {
            current++;
            value.textContent = current + "%";
            circle.style.strokeDashoffset = 440 - (440 * current) / 100;
        }
    }, speed);
}

// Lancer les animations
animateCircle("html", 48);
animateCircle("css", 45);
animateCircle("php", 42);
animateCircle("jquery", 39);
