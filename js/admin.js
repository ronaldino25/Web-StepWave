/* ==========================================
   StepWave - Admin Panel JavaScript Controller
   Full CMS CRUD Operations & LocalStorage Sync
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  initLoginForm();
  initNavigationTabs();
  renderAdminAll();
  initProductManagement();
  initBlogManagement();
  initSettingsManagement();
});

/* ------------------------------------------
   1. Authentication & Session Check
------------------------------------------ */
function checkAdminAuth() {
  const isLogged = sessionStorage.getItem('STEPWAVE_ADMIN_LOGGED');
  const loginScreen = document.getElementById('login-screen');
  const adminDashboard = document.getElementById('admin-dashboard');

  if (isLogged === 'true') {
    loginScreen.style.display = 'none';
    adminDashboard.style.display = 'flex';
  } else {
    loginScreen.style.display = 'flex';
    adminDashboard.style.display = 'none';
  }
}

function initLoginForm() {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('login-username').value.trim();
    const pass = document.getElementById('login-password').value.trim();

    if (user === 'admin' && pass === 'admin123') {
      sessionStorage.setItem('STEPWAVE_ADMIN_LOGGED', 'true');
      checkAdminAuth();
      renderAdminAll();
      showToast('🎉 Login berhasil! Selamat datang Admin StepWave.', 'success');
    } else {
      showToast('❌ Username atau Password salah!', 'warning');
    }
  });

  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('STEPWAVE_ADMIN_LOGGED');
      checkAdminAuth();
      showToast('🔒 Anda telah keluar dari Admin Panel.', 'info');
    });
  }
}

/* ------------------------------------------
   2. Navigation Tabs Handler
------------------------------------------ */
function initNavigationTabs() {
  const navItems = document.querySelectorAll('.admin-nav-item');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTabId = item.getAttribute('data-tab');

      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      tabContents.forEach(tab => {
        if (tab.id === targetTabId) {
          tab.style.display = 'block';
        } else {
          tab.style.display = 'none';
        }
      });
    });
  });
}

/* ------------------------------------------
   3. Render Master Admin Views
------------------------------------------ */
function renderAdminAll() {
  const data = getStepWaveData();

  // Render Stats
  document.getElementById('stat-products-count').textContent = data.products.length;
  document.getElementById('stat-blog-count').textContent = data.blogPosts.length;
  document.getElementById('stat-messages-count').textContent = data.messages.length;
  document.getElementById('badge-msg-count').textContent = data.messages.length;

  // Render Tables
  renderProductsTable(data.products);
  renderBlogTable(data.blogPosts);
  renderMessagesTable(data.messages);
  populateSettingsForm(data.siteConfig);
}

/* ------------------------------------------
   4. Products Management (CRUD)
------------------------------------------ */
function renderProductsTable(products) {
  const tbody = document.getElementById('table-products-body');
  if (!tbody) return;

  if (!products.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--text-muted);">Belum ada produk. Klik Tambah Produk Baru.</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(prod => `
    <tr>
      <td>
        <img src="${prod.img}" alt="${prod.name}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px;">
      </td>
      <td><strong>${prod.name}</strong></td>
      <td><span style="color: var(--primary);">${prod.category}</span></td>
      <td><strong>${prod.price}</strong></td>
      <td><span class="badge-tag" style="font-size:0.75rem; padding:2px 8px;">${prod.tag || '-'}</span></td>
      <td>
        <div class="action-btn-group">
          <button class="btn-icon btn-edit btn-edit-product" data-id="${prod.id}" title="Edit Produk"><i class="fas fa-edit"></i></button>
          <button class="btn-icon btn-delete btn-delete-product" data-id="${prod.id}" title="Hapus Produk"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  // Re-bind Action Listeners
  document.querySelectorAll('.btn-edit-product').forEach(btn => {
    btn.addEventListener('click', () => openProductModal(btn.getAttribute('data-id')));
  });

  document.querySelectorAll('.btn-delete-product').forEach(btn => {
    btn.addEventListener('click', () => deleteProduct(btn.getAttribute('data-id')));
  });
}

function initProductManagement() {
  const modal = document.getElementById('product-form-modal');
  const addBtn = document.getElementById('btn-open-add-product');
  const closeBtn = modal?.querySelector('.modal-close');
  const form = document.getElementById('form-save-product');

  if (addBtn) addBtn.addEventListener('click', () => openProductModal(null));
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('prod-id').value;
      const data = getStepWaveData();

      const newProduct = {
        id: id || 'prod-' + Date.now(),
        name: document.getElementById('prod-name').value.trim(),
        category: document.getElementById('prod-category').value,
        price: document.getElementById('prod-price').value.trim(),
        rawPrice: 1000000,
        img: document.getElementById('prod-img').value.trim(),
        tag: document.getElementById('prod-tag').value.trim() || 'Popular',
        desc: document.getElementById('prod-desc').value.trim(),
        specs: document.getElementById('prod-specs').value.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (id) {
        // Update existing
        const idx = data.products.findIndex(p => p.id === id);
        if (idx !== -1) data.products[idx] = newProduct;
      } else {
        // Add new
        data.products.unshift(newProduct);
      }

      saveStepWaveData(data);
      modal.classList.remove('active');
      renderAdminAll();
      showToast(id ? '✅ Produk berhasil diperbarui!' : '✨ Produk baru berhasil ditambahkan!', 'success');
    });
  }
}

function openProductModal(id) {
  const modal = document.getElementById('product-form-modal');
  const title = document.getElementById('product-modal-title');
  const data = getStepWaveData();

  if (id) {
    const prod = data.products.find(p => p.id === id);
    if (!prod) return;
    title.textContent = 'Edit Produk: ' + prod.name;
    document.getElementById('prod-id').value = prod.id;
    document.getElementById('prod-name').value = prod.name;
    document.getElementById('prod-category').value = prod.category;
    document.getElementById('prod-price').value = prod.price;
    document.getElementById('prod-img').value = prod.img;
    document.getElementById('prod-tag').value = prod.tag || '';
    document.getElementById('prod-desc').value = prod.desc;
    document.getElementById('prod-specs').value = (prod.specs || []).join(', ');
  } else {
    title.textContent = 'Tambah Produk Baru';
    document.getElementById('form-save-product').reset();
    document.getElementById('prod-id').value = '';
  }

  modal.classList.add('active');
}

function deleteProduct(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
  const data = getStepWaveData();
  data.products = data.products.filter(p => p.id !== id);
  saveStepWaveData(data);
  renderAdminAll();
  showToast('🗑️ Produk berhasil dihapus.', 'info');
}

/* ------------------------------------------
   5. Blog Management (CRUD)
------------------------------------------ */
function renderBlogTable(posts) {
  const tbody = document.getElementById('table-blog-body');
  if (!tbody) return;

  if (!posts.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-muted);">Belum ada artikel. Klik Tambah Artikel Baru.</td></tr>`;
    return;
  }

  tbody.innerHTML = posts.map(post => `
    <tr>
      <td><strong>${post.title}</strong></td>
      <td><span style="color: var(--primary);">${post.category}</span></td>
      <td>${post.author}</td>
      <td>${post.date}</td>
      <td>
        <div class="action-btn-group">
          <button class="btn-icon btn-edit btn-edit-blog" data-id="${post.id}" title="Edit Artikel"><i class="fas fa-edit"></i></button>
          <button class="btn-icon btn-delete btn-delete-blog" data-id="${post.id}" title="Hapus Artikel"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.btn-edit-blog').forEach(btn => {
    btn.addEventListener('click', () => openBlogModal(btn.getAttribute('data-id')));
  });

  document.querySelectorAll('.btn-delete-blog').forEach(btn => {
    btn.addEventListener('click', () => deleteBlog(btn.getAttribute('data-id')));
  });
}

function initBlogManagement() {
  const modal = document.getElementById('blog-form-modal');
  const addBtn = document.getElementById('btn-open-add-blog');
  const closeBtn = modal?.querySelector('.modal-close');
  const form = document.getElementById('form-save-blog');

  if (addBtn) addBtn.addEventListener('click', () => openBlogModal(null));
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('blog-id').value;
      const data = getStepWaveData();

      const newPost = {
        id: id || 'blog-' + Date.now(),
        title: document.getElementById('blog-title-input').value.trim(),
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'Short', year: 'numeric' }),
        author: document.getElementById('blog-author-input').value.trim() || 'Tim StepWave',
        category: document.getElementById('blog-category-input').value.trim(),
        readTime: document.getElementById('blog-readTime-input').value.trim() || '4 Menit Baca',
        img: document.getElementById('blog-img-input').value.trim(),
        excerpt: document.getElementById('blog-excerpt-input').value.trim(),
        content: document.getElementById('blog-content-input').value.trim()
      };

      if (id) {
        const idx = data.blogPosts.findIndex(p => p.id === id);
        if (idx !== -1) data.blogPosts[idx] = newPost;
      } else {
        data.blogPosts.unshift(newPost);
      }

      saveStepWaveData(data);
      modal.classList.remove('active');
      renderAdminAll();
      showToast(id ? '✅ Artikel berhasil diperbarui!' : '✨ Artikel baru berhasil dipublikasikan!', 'success');
    });
  }
}

function openBlogModal(id) {
  const modal = document.getElementById('blog-form-modal');
  const title = document.getElementById('blog-modal-title');
  const data = getStepWaveData();

  if (id) {
    const post = data.blogPosts.find(p => p.id === id);
    if (!post) return;
    title.textContent = 'Edit Artikel: ' + post.title;
    document.getElementById('blog-id').value = post.id;
    document.getElementById('blog-title-input').value = post.title;
    document.getElementById('blog-category-input').value = post.category;
    document.getElementById('blog-author-input').value = post.author;
    document.getElementById('blog-img-input').value = post.img;
    document.getElementById('blog-readTime-input').value = post.readTime;
    document.getElementById('blog-excerpt-input').value = post.excerpt;
    document.getElementById('blog-content-input').value = post.content;
  } else {
    title.textContent = 'Tambah Artikel Baru';
    document.getElementById('form-save-blog').reset();
    document.getElementById('blog-id').value = '';
  }

  modal.classList.add('active');
}

function deleteBlog(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
  const data = getStepWaveData();
  data.blogPosts = data.blogPosts.filter(p => p.id !== id);
  saveStepWaveData(data);
  renderAdminAll();
  showToast('🗑️ Artikel berhasil dihapus.', 'info');
}

/* ------------------------------------------
   6. Messages Management (Contact Leads)
------------------------------------------ */
function renderMessagesTable(messages) {
  const tbody = document.getElementById('table-messages-body');
  if (!tbody) return;

  if (!messages.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--text-muted);">Belum ada pesan masuk dari pengunjung.</td></tr>`;
    return;
  }

  tbody.innerHTML = messages.map(msg => `
    <tr>
      <td><small style="color: var(--text-muted);">${msg.date}</small></td>
      <td><strong>${msg.name}</strong></td>
      <td>${msg.email}<br><small style="color: #25D366;">${msg.phone || '-'}</small></td>
      <td><span style="color: var(--primary);">${msg.subject}</span></td>
      <td style="max-width: 280px; font-size:0.85rem;">${msg.message}</td>
      <td>
        <div class="action-btn-group">
          ${msg.phone ? `<a href="https://wa.me/${msg.phone.replace(/[^0-9]/g,'')}?text=Halo%20${encodeURIComponent(msg.name)},%20kami%20dari%20StepWave..." target="_blank" class="btn-icon btn-reply" title="Balas via WhatsApp"><i class="fab fa-whatsapp"></i></a>` : ''}
          <button class="btn-icon btn-delete btn-delete-msg" data-id="${msg.id}" title="Hapus Pesan"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.btn-delete-msg').forEach(btn => {
    btn.addEventListener('click', () => deleteMessage(btn.getAttribute('data-id')));
  });
}

function deleteMessage(id) {
  if (!confirm('Hapus pesan ini dari log?')) return;
  const data = getStepWaveData();
  data.messages = data.messages.filter(m => m.id !== id);
  saveStepWaveData(data);
  renderAdminAll();
  showToast('🗑️ Pesan berhasil dihapus.', 'info');
}

/* ------------------------------------------
   7. Site Settings Management
------------------------------------------ */
function populateSettingsForm(config) {
  if (!config) return;
  document.getElementById('cfg-companyName').value = config.companyName || '';
  document.getElementById('cfg-slogan').value = config.slogan || '';
  document.getElementById('cfg-heroSubtitle').value = config.heroSubtitle || '';
  document.getElementById('cfg-promoBarText').value = config.promoBarText || '';
  document.getElementById('cfg-promoBarCode').value = config.promoBarCode || '';
  document.getElementById('cfg-whatsappNumber').value = config.whatsappNumber || '';
  document.getElementById('cfg-email').value = config.email || '';
  document.getElementById('cfg-address').value = config.address || '';
}

function initSettingsManagement() {
  const form = document.getElementById('settings-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getStepWaveData();

    data.siteConfig = {
      ...data.siteConfig,
      companyName: document.getElementById('cfg-companyName').value.trim(),
      slogan: document.getElementById('cfg-slogan').value.trim(),
      heroSubtitle: document.getElementById('cfg-heroSubtitle').value.trim(),
      promoBarText: document.getElementById('cfg-promoBarText').value.trim(),
      promoBarCode: document.getElementById('cfg-promoBarCode').value.trim(),
      whatsappNumber: document.getElementById('cfg-whatsappNumber').value.trim(),
      email: document.getElementById('cfg-email').value.trim(),
      address: document.getElementById('cfg-address').value.trim()
    };

    saveStepWaveData(data);
    showToast('⚙️ Pengaturan website berhasil disimpan! Perubahan sudah aktif.', 'success');
  });

  const resetBtn = document.getElementById('btn-reset-data');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('PERINGATAN: Apakah Anda yakin ingin mengembalikan seluruh data produk & pengaturan ke kondisi default pabrik?')) {
        resetStepWaveDataToDefault();
        renderAdminAll();
        showToast('🔄 Seluruh data berhasil di-reset ke kondisi awal.', 'info');
      }
    });
  }
}

/* ------------------------------------------
   8. Toast Notification Helper
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
