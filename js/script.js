/* ==========================================
   StepWave - Dynamic JavaScript Controller
   Synchronized with CMS LocalStorage Engine
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderDynamicSiteContent();
  initHeaderScroll();
  initMobileNav();
  setActiveNavLink();
  initProductFilters();
  initProductModal();
  initBlogModal();
  initContactForm();
  initNewsletterForm();
  initSmoothScroll();
});

/* ------------------------------------------
   0. Dynamic Content Rendering from LocalStorage
------------------------------------------ */
function renderDynamicSiteContent() {
  if (typeof getStepWaveData !== 'function') return;

  const data = getStepWaveData();
  const config = data.siteConfig;

  // Render Promo Announcement Bar
  const topBar = document.getElementById('top-bar');
  if (topBar && config.promoBarText) {
    topBar.querySelector('.top-bar-content').innerHTML = `
      <span>${config.promoBarText}</span>
      <span class="top-bar-code">KODE: ${config.promoBarCode || 'STEPNEW'}</span>
    `;
  }

  // Render Hero Section text if present
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && config.slogan) {
    const parts = config.slogan.split(',');
    if (parts.length > 1) {
      heroTitle.innerHTML = `${parts[0].trim()}, <br><span class="gradient-text">${parts.slice(1).join(',').trim()}</span>`;
    } else {
      heroTitle.innerHTML = `<span class="gradient-text">${config.slogan}</span>`;
    }
  }

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle && config.heroSubtitle) {
    heroSubtitle.textContent = config.heroSubtitle;
  }

  // Render WhatsApp links
  if (config.whatsappNumber) {
    const waWaLinks = document.querySelectorAll('.floating-wa, .btn-wa');
    waWaLinks.forEach(link => {
      const currentHref = link.getAttribute('href') || '';
      if (currentHref.includes('wa.me')) {
        const textMatch = currentHref.match(/text=([^&]*)/);
        const encodedText = textMatch ? textMatch[1] : encodeURIComponent('Halo StepWave, saya butuh bantuan');
        link.setAttribute('href', `https://wa.me/${config.whatsappNumber}?text=${encodedText}`);
      }
    });
  }

  // Render Dynamic Products Grid
  renderProductsGrid(data.products);

  // Render Dynamic Blog Posts Grid
  renderBlogGrid(data.blogPosts);
}

// Render Products Grid
function renderProductsGrid(products) {
  const container = document.querySelector('.products-grid');
  if (!container || !products || !products.length) return;

  container.innerHTML = products.map(prod => `
    <div class="product-card" data-category="${prod.category}">
      <div class="product-img-wrapper">
        <span class="product-tag">${prod.tag || 'Popular'}</span>
        <img src="${prod.img}" alt="${prod.name}">
      </div>
      <div class="product-body">
        <h3 class="product-title">${prod.name}</h3>
        <p class="product-desc">${prod.desc}</p>
        <div class="product-footer">
          <div class="product-price">${prod.price}</div>
          <button class="btn btn-primary btn-sm btn-view-product" data-id="${prod.id}">
            <i class="fas fa-eye"></i> Detail & Order
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Re-bind view buttons
  initProductModal();
}

// Render Blog Grid
function renderBlogGrid(posts) {
  const container = document.querySelector('.blog-grid');
  if (!container || !posts || !posts.length) return;

  container.innerHTML = posts.map(post => `
    <article class="blog-card">
      <div class="blog-img-wrapper">
        <img src="${post.img}" alt="${post.title}">
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span>📅 ${post.date}</span>
          <span>• ${post.readTime}</span>
        </div>
        <h3 class="blog-title">
          <a href="#" class="btn-read-blog" data-id="${post.id}">${post.title}</a>
        </h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <button class="btn btn-secondary btn-sm btn-read-blog" data-id="${post.id}">
          Baca Selengkapnya <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </article>
  `).join('');

  // Re-bind read buttons
  initBlogModal();
}

/* ------------------------------------------
   1. Header Scroll Effect
------------------------------------------ */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ------------------------------------------
   2. Mobile Navigation Drawer
------------------------------------------ */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}

/* ------------------------------------------
   3. Highlight Active Navigation Page Link
------------------------------------------ */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ------------------------------------------
   4. Product Filter Mechanism
------------------------------------------ */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      const productCards = document.querySelectorAll('.product-card');

      productCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ------------------------------------------
   5. Product Quick View & WhatsApp Direct Order
------------------------------------------ */
function initProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const modalBody = modal.querySelector('.modal-body-content');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('.btn-view-product').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const data = getStepWaveData();
      const prod = data.products.find(p => p.id === id) || data.products[0];
      const config = data.siteConfig;

      const waText = encodeURIComponent(`Halo ${config.companyName}, saya berminat untuk memesan produk berikut:\n\n*Produk*: ${prod.name}\n*Harga*: ${prod.price}\n\nMohon info ketersediaan stok & pilihan ukurannya. Terima kasih!`);
      const waUrl = `https://wa.me/${config.whatsappNumber}?text=${waText}`;

      modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 24px; align-items: center;">
          <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-glow);">
            <img src="${prod.img}" alt="${prod.name}" style="width: 100%; height: 260px; object-fit: cover;">
          </div>
          <div>
            <span style="color: var(--primary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">${prod.category}</span>
            <h3 style="font-size: 1.6rem; margin: 4px 0 10px 0;">${prod.name}</h3>
            <p style="font-size: 1.3rem; font-weight: 800; color: var(--primary); margin-bottom: 14px;">${prod.price}</p>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">${prod.desc}</p>
            <h4 style="font-size: 0.9rem; margin-bottom: 8px; color: #fff;">Keunggulan & Spesifikasi:</h4>
            <ul style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 20px; list-style: disc; padding-left: 18px;">
              ${(prod.specs || ['Premium Quality', 'Ergonomic Support']).map(s => `<li>${s}</li>`).join('')}
            </ul>
            <a href="${waUrl}" target="_blank" class="btn btn-wa" style="width: 100%;">
              <i class="fab fa-whatsapp"></i> Beli / Tanya via WhatsApp
            </a>
          </div>
        </div>
      `;

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* ------------------------------------------
   6. Blog Reader Modal
------------------------------------------ */
function initBlogModal() {
  const modal = document.getElementById('blog-modal');
  if (!modal) return;

  const modalBody = modal.querySelector('.blog-modal-content');
  const closeBtn = modal.querySelector('.blog-modal-close');

  document.querySelectorAll('.btn-read-blog').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const data = getStepWaveData();
      const post = data.blogPosts.find(p => p.id === id) || data.blogPosts[0];

      modalBody.innerHTML = `
        <span style="color: var(--primary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">${post.category} • ${post.readTime}</span>
        <h2 style="font-size: 1.8rem; margin: 8px 0 12px 0;">${post.title}</h2>
        <div style="display: flex; gap: 16px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          <span>📅 ${post.date}</span>
          <span>✍️ ${post.author}</span>
        </div>
        <img src="${post.img}" alt="${post.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px; margin-bottom: 24px; border: 1px solid var(--border-glow);">
        <div style="line-height: 1.8; color: var(--text-main); font-size: 0.95rem;">
          ${post.content}
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Bagikan artikel ini:</span>
          <div style="display: flex; gap: 10px;">
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}" target="_blank" class="btn btn-wa btn-sm">Bagikan ke WhatsApp</a>
          </div>
        </div>
      `;

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* ------------------------------------------
   7. Contact Form Interactive Handler & Save to Admin Panel
------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const subject = form.querySelector('[name="subject"]')?.value || 'Pesan Umum';
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Mohon isi semua kolom yang wajib diisi!', 'warning');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⌛ Mengirim Pesan...';
    btn.disabled = true;

    // Save message to LocalStorage for Admin Panel
    const data = getStepWaveData();
    const newMsg = {
      id: 'msg-' + Date.now(),
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };
    data.messages.unshift(newMsg);
    saveStepWaveData(data);

    setTimeout(() => {
      btn.innerHTML = '✅ Pesan Terkirim!';
      showToast(`✨ Terima kasih ${name}! Pesan Anda telah dikirim & tersimpan di sistem StepWave.`, 'success');
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

/* ------------------------------------------
   8. Newsletter Form Handler
------------------------------------------ */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (!input || !input.value.includes('@')) {
      showToast('⚠️ Masukkan alamat email yang valid!', 'warning');
      return;
    }

    showToast('🎉 Selamat! Anda telah berlangganan info promo StepWave.', 'success');
    input.value = '';
  });
}

/* ------------------------------------------
   9. Toast Notification Engine
------------------------------------------ */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'warning') toast.style.borderColor = '#ff2a6d';
  if (type === 'success') toast.style.borderColor = '#00f2fe';

  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ------------------------------------------
   10. Smooth Scroll for Anchor Links
------------------------------------------ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
