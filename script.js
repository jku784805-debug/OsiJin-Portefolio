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

// 🖼️ Galerie : ouverture du viewer
const photos = document.querySelectorAll(".photo");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const viewerDesc = document.getElementById("viewerDesc");
const viewerTags = document.getElementById("viewerTags");
const viewerClose = document.getElementById("viewerClose");

photos.forEach(photo => {
  photo.addEventListener("click", () => {
    const img = photo.querySelector("img");
    viewerImg.src = img.src;
    viewerDesc.textContent = photo.dataset.desc || "";
    viewerTags.textContent = photo.dataset.tags
      ? "Tags : " + photo.dataset.tags
      : "";
    viewer.style.display = "flex";
  });
});

// ❌ Fermeture du viewer
if (viewerClose) {
  viewerClose.addEventListener("click", (e) => {
    e.stopPropagation();
    viewer.style.display = "none";
  });
}

if (viewer) {
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
      viewer.style.display = "none";
    }
  });
}

// 🔍 Barre de recherche dans la galerie
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    photos.forEach(photo => {
      const desc = (photo.dataset.desc || "").toLowerCase();
      const tags = (photo.dataset.tags || "").toLowerCase();
      const match = desc.includes(q) || tags.includes(q);
      photo.style.display = match ? "block" : "none";
    });
  });
}

// ✨ Animation d’entrée en cascade sur les photos
photos.forEach((item, i) => {
  item.classList.add("fade-in");
  item.style.animationDelay = `${i * 0.1}s`;
});

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
const headerSearch = document.getElementById("headerSearch");

if (headerSearch) {
  headerSearch.addEventListener("input", () => {
    const q = headerSearch.value.toLowerCase().trim();
    photos.forEach(photo => {
      const desc = (photo.dataset.desc || "").toLowerCase();
      const tags = (photo.dataset.tags || "").toLowerCase();
      const match = desc.includes(q) || tags.includes(q);
      photo.style.display = match ? "block" : "none";
    });
  });
}

// 🔽 Quand on appuie sur ENTRÉE dans la barre de recherche du header → scroll vers la galerie
if (headerSearch) {
  headerSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const gallerySection = document.getElementById("gallery");
      if (gallerySection) {
        window.scrollTo({
          top: gallerySection.offsetTop - 60,
          behavior: "smooth"
        });
      }
    }
  });
}
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

// Simple gallery viewer (optional)
document.addEventListener('click', (e) => {
  const p = e.target.closest('.photo');
  if(!p) return;
  const viewer = document.getElementById('viewer');
  if(!viewer) return;
  const img = p.querySelector('img');
  const viewerImg = document.getElementById('viewerImg');
  const viewerDesc = document.getElementById('viewerDesc');
  const viewerTags = document.getElementById('viewerTags');
  if(img && viewerImg){
    viewerImg.src = img.src;
    if(viewerDesc) viewerDesc.textContent = p.dataset.desc || '';
    if(viewerTags) viewerTags.textContent = p.dataset.tags ? 'Tags: ' + p.dataset.tags : '';
    viewer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
});

// Close viewer
document.addEventListener('click', (e) => {
  if(e.target.id === 'viewer' || e.target.id === 'viewerClose'){
    const viewer = document.getElementById('viewer');
    if(viewer) { viewer.style.display = 'none'; document.body.style.overflow = ''; }
  }
});
