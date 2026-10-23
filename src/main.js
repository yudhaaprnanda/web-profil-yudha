/**
 * Yudha Prananda Portfolio - Interactive Core Script
 */

// Portfolio Items Detailed Data
const portfolioData = {
  accfest: {
    title: 'Best Movie ACCFEST 2025',
    category: 'Film / Kompetisi Kreatif',
    image: 'assets/accfest.jpg',
    badge: 'Penghargaan Film',
    description: 'Salah satu pencapaian yang berkesan dalam perjalanan kreatif saya di bidang perfilman. Pengalaman ini menjadi bagian dari proses untuk terus mengeksplorasi ide dan mengembangkan karya audiovisual.',
    highlights: ['Kompetisi Kreatif Tingkat Nasional', 'Sinematografi & Storytelling', 'Kolaborasi & Produksi Audio Visual']
  },
  ffpj: {
    title: 'Karya Terbaik 2 — Festival Film Pelajar Jogja 2024',
    category: 'Film Pelajar / Penghargaan',
    image: 'assets/ffpj.jpg',
    badge: 'Penghargaan Bergengsi',
    description: 'Pencapaian dalam Festival Film Pelajar Jogja 2024 yang menjadi pengalaman berharga untuk terus mengembangkan kreativitas dan kemampuan dalam menghasilkan karya.',
    highlights: ['Festival Film Pelajar Jogja', 'Eksplorasi Ide Sinematik', 'Apresiasi Sineas Muda']
  },
  photography: {
    title: 'Photography — SMA Negeri 3 Singkawang',
    category: 'Fotografi / Pengalaman Kreatif',
    image: 'assets/photography.jpg',
    badge: 'Pengalaman Kreatif',
    description: 'Pernah mengikuti kegiatan fotografi di SMA Negeri 3 Singkawang sebagai pengalaman dalam mengeksplorasi kreativitas visual, komposisi, dan penyampaian cerita melalui gambar.',
    highlights: ['Komposisi Visual & Framing', 'Pencahayaan & Perspektif', 'Dokumentasi & Narasi Gambar']
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Scrollspy - Highlight Active Nav Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const highlightNav = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // 4. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('open');
    });

    // Close when clicking nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
      }
    });
  }

  // 5. Hero Particle Canvas (Interactive Digital Network)
  initHeroCanvas();

  // 6. Portfolio Detail Modal
  initPortfolioModal();

  // 7. Copy Email Toast Notification
  initCopyEmail();

  // 8. Quick Message Form
  initQuickMessage();
});

/* Hero Interactive Canvas */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = 42;
  const maxDistance = 140;

  let mouse = { x: null, y: null, radius: 150 };

  const resize = () => {
    const hero = document.getElementById('beranda');
    if (!hero) return;
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  };

  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
      ctx.fill();
    }
  }

  particles = Array.from({ length: particleCount }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* Portfolio Modal Logic */
function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const closeBtn = document.getElementById('modal-close');

  if (!modal) return;

  const openModal = (key) => {
    const item = portfolioData[key];
    if (!item) return;

    if (modalImg) {
      modalImg.src = item.image;
      modalImg.alt = item.title;
    }
    modalCategory.textContent = item.category;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;

    modalTags.innerHTML = item.highlights
      .map(tag => `<span class="info-pill">${tag}</span>`)
      .join('');

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-portfolio-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-portfolio-key');
      openModal(key);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* Copy Email Toast */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const email = 'yudhaprnanda@gmail.com';

  if (!copyBtn || !toast) return;

  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast();
    } catch (err) {
      console.error('Failed to copy email:', err);
      showToast();
    }
  });

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* Quick Message Form */
function initQuickMessage() {
  const form = document.getElementById('quick-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name')?.value.trim() || 'Pengunjung Website';
    const subject = document.getElementById('sender-subject')?.value.trim() || 'Pesan dari Portofolio';
    const message = document.getElementById('sender-message')?.value.trim() || '';

    const fullSubject = encodeURIComponent(`[Portofolio] ${subject} - ${name}`);
    const fullBody = encodeURIComponent(`Halo Yudha,\n\nNama: ${name}\n\nPesan:\n${message}\n\n---\nDikirim melalui website portofolio`);

    window.location.href = `mailto:yudhaprnanda@gmail.com?subject=${fullSubject}&body=${fullBody}`;
  });
}
