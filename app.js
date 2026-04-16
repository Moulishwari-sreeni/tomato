// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('tomatoCart') || '{}');
let currentUser = JSON.parse(localStorage.getItem('tomatoUser') || 'null');
let currentFilter = 'all';
let currentPage = 'home';
let allUsers = JSON.parse(localStorage.getItem('tomatoUsers') || '[]');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderMenu();
  updateCartUI();
  updateAuthUI();
});

// ===== PAGE ROUTING =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page + 'Page').classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);
  if (page === 'menu') renderMenu();
}

// ===== RENDER FOOD CARDS =====
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  const featured = [...FOODS].sort((a,b) => b.reviews - a.reviews).slice(0, 8);
  grid.innerHTML = featured.map(renderCard).join('');
}

function renderMenu() {
  const grid = document.getElementById('menuGrid');
  let items = [...FOODS];
  if (currentFilter !== 'all') items = items.filter(f => f.cat === currentFilter);
  const search = document.getElementById('menuSearch')?.value?.toLowerCase() || '';
  if (search) items = items.filter(f => f.name.toLowerCase().includes(search) || f.desc.toLowerCase().includes(search));
  const sort = document.getElementById('sortMenu')?.value;
  if (sort === 'price-asc') items.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') items.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') items.sort((a,b) => b.rating - a.rating);
  grid.innerHTML = items.length ? items.map(renderCard).join('') : '<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:3rem">No items found 😔</p>';
}

function renderCard(item) {
  const qty = cart[item.id]?.qty || 0;
  const vegBadge = item.veg ? '🟢' : '🔴';
  const addControls = qty > 0
    ? `<div class="qty-controls">
        <button class="qty-btn minus" onclick="updateCart(${item.id}, -1)">−</button>
        <span class="qty-num">${qty}</span>
        <button class="qty-btn plus" onclick="updateCart(${item.id}, 1)">+</button>
       </div>`
    : `<button class="add-btn" onclick="updateCart(${item.id}, 1)">+</button>`;

  return `
    <div class="food-card" id="card-${item.id}">
      <div class="food-card-img ${item.bg}">
        <span>${item.emoji}</span>
      </div>
      <div class="food-card-body">
        <div class="food-card-tag">${vegBadge} ${item.cat}</div>
        <div class="food-card-name">${item.name}</div>
        <div class="food-card-desc">${item.desc}</div>
        <div class="food-card-footer">
          <div>
            <div class="food-card-price">₹${item.price}</div>
            <div class="food-card-rating"><span class="star">★</span> ${item.rating} (${item.reviews.toLocaleString()})</div>
          </div>
          ${addControls}
        </div>
      </div>
    </div>`;
}

// ===== CART =====
function updateCart(id, delta) {
  const item = FOODS.find(f => f.id === id);
  if (!item) return;
  if (!cart[id]) cart[id] = { ...item, qty: 0 };
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  localStorage.setItem('tomatoCart', JSON.stringify(cart));
  updateCartUI();
  refreshCardControl(id);
  showToast(delta > 0 ? `${item.emoji} Added to cart!` : `Removed from cart`);
}

function refreshCardControl(id) {
  const card = document.getElementById('card-' + id);
  if (!card) return;
  const qty = cart[id]?.qty || 0;
  const footer = card.querySelector('.food-card-footer');
  const existing = footer.querySelector('.qty-controls, .add-btn');
  if (existing) {
    const newEl = document.createElement('div');
    newEl.innerHTML = qty > 0
      ? `<div class="qty-controls">
          <button class="qty-btn minus" onclick="updateCart(${id}, -1)">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn plus" onclick="updateCart(${id}, 1)">+</button>
         </div>`
      : `<button class="add-btn" onclick="updateCart(${id}, 1)">+</button>`;
    existing.replaceWith(newEl.firstElementChild);
  }
}

function updateCartUI() {
  const items = Object.values(cart);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cartCount');
  countEl.textContent = totalQty;
  countEl.style.display = totalQty > 0 ? 'flex' : 'none';
  renderCartItems();
}

function renderCartItems() {
  const items = Object.values(cart);
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!items.length) {
    container.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛒</div><p>Your cart is empty</p><button onclick="toggleCart(); showPage('menu')">Browse Menu</button></div>`;
    footer.style.display = 'none';
    return;
  }
  container.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price * item.qty}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn minus" onclick="updateCart(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn plus" onclick="updateCart(${item.id}, 1)">+</button>
      </div>
    </div>`).join('');
  footer.style.display = 'block';
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const taxes = Math.round(subtotal * 0.05);
  const delivery = 40;
  const total = subtotal + taxes + delivery;
  document.getElementById('subtotal').textContent = '₹' + subtotal;
  document.getElementById('taxes').textContent = '₹' + taxes;
  document.getElementById('delivery').textContent = '₹' + delivery;
  document.getElementById('total').textContent = '₹' + total;
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
}

// ===== FILTER =====
function filterCat(cat, el) {
  currentFilter = cat;
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  // Activate all chips with this cat (both home + menu)
  document.querySelectorAll('.cat-chip').forEach(c => {
    if (c === el || (el && c.textContent.trim() === el.textContent.trim())) c.classList.add('active');
  });
  if (currentPage === 'menu' || document.getElementById('menuPage').classList.contains('active')) {
    renderMenu();
  } else {
    showPage('menu');
    setTimeout(renderMenu, 50);
  }
}

function searchMenu() { renderMenu(); }
function sortMenuItems() { renderMenu(); }

function doSearch() {
  const val = document.getElementById('heroSearch').value;
  showPage('menu');
  setTimeout(() => {
    const menuSearch = document.getElementById('menuSearch');
    if (menuSearch) { menuSearch.value = val; renderMenu(); }
  }, 50);
}

// ===== AUTH =====
function toggleLoginModal() {
  if (currentUser) {
    if (confirm(`Logged in as ${currentUser.name}. Sign out?`)) {
      currentUser = null;
      localStorage.removeItem('tomatoUser');
      updateAuthUI();
      showToast('Signed out 👋');
    }
    return;
  }
  document.getElementById('loginOverlay').classList.add('open');
  document.getElementById('loginModal').classList.add('open');
}

function closeLoginModal() {
  document.getElementById('loginOverlay').classList.remove('open');
  document.getElementById('loginModal').classList.remove('open');
}

function switchTab(tab, el) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('loginTab').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('signupTab').style.display = tab === 'signup' ? 'block' : 'none';
}

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');
  if (!email || !password) { errEl.textContent = 'Please fill in all fields.'; return; }
  const user = allUsers.find(u => u.email === email && u.password === password);
  if (!user) { errEl.textContent = 'Invalid email or password.'; return; }
  currentUser = user;
  localStorage.setItem('tomatoUser', JSON.stringify(user));
  updateAuthUI();
  closeLoginModal();
  showToast(`Welcome back, ${user.name}! 👋`);
}

function doSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const errEl = document.getElementById('signupError');
  if (!name || !email || !password) { errEl.textContent = 'Please fill in all fields.'; return; }
  if (password.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; return; }
  if (allUsers.find(u => u.email === email)) { errEl.textContent = 'Email already registered.'; return; }
  const user = { id: Date.now(), name, email, password };
  allUsers.push(user);
  localStorage.setItem('tomatoUsers', JSON.stringify(allUsers));
  currentUser = user;
  localStorage.setItem('tomatoUser', JSON.stringify(user));
  updateAuthUI();
  closeLoginModal();
  showToast(`Welcome to Tomato, ${name}! 🍅`);
}

function updateAuthUI() {
  const btn = document.getElementById('loginBtn');
  btn.textContent = currentUser ? `Hi, ${currentUser.name.split(' ')[0]} 👤` : 'Sign In';
}

// ===== CHECKOUT =====
function checkout() {
  if (!currentUser) {
    toggleCart();
    setTimeout(() => toggleLoginModal(), 300);
    showToast('Please sign in to checkout 🔐');
    return;
  }
  if (!Object.keys(cart).length) { showToast('Your cart is empty!'); return; }
  toggleCart();
  const orderId = Math.floor(Math.random() * 900000 + 100000);
  document.getElementById('orderId').textContent = orderId;
  document.getElementById('successOverlay').classList.add('open');
  document.getElementById('successModal').style.display = 'block';
  document.getElementById('successModal').classList.add('open');
  cart = {};
  localStorage.setItem('tomatoCart', JSON.stringify(cart));
  updateCartUI();
  // Re-render all cards
  renderFeatured();
  renderMenu();
}

function closeSuccess() {
  document.getElementById('successOverlay').classList.remove('open');
  document.getElementById('successModal').style.display = 'none';
  document.getElementById('successModal').classList.remove('open');
  showToast('🛵 Rider assigned! Track your order');
}

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ===== SOC INTEGRATION (placeholder) =====
// When SOC analyzer is deployed, uncomment and set the URL:
// const SOC_URL = 'https://soc-analyzer.onrender.com/ingest';
// async function sendToSOC(data) {
//   try { await fetch(SOC_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }); }
//   catch(e) { console.log('SOC offline'); }
// }
// Track page visits
// document.addEventListener('click', (e) => {
//   sendToSOC({ ip:'client', path: window.location.href, method:'CLICK', userAgent: navigator.userAgent, ts: Date.now() });
// });
// ===== SOC INTEGRATION (ACTIVE) =====
function sendToSOC(customPath = null) {
  const path = customPath || (window.location.pathname + window.location.search);

  fetch("https://soc-tool.onrender.com/ingest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ip: "client-ip",
      method: "GET",
      path: path,
      user_agent: navigator.userAgent
    })
  }).catch(err => console.log("SOC error:", err));
}



window.simulateAttack = function(type) {
  if (type === "xss") {
    sendToSOC("/?q=<script>alert(1)</script>");
  }
  if (type === "sqli") {
    sendToSOC("/?id=1' OR 1=1");
  }
  if (type === "ddos") {
    for (let i = 0; i < 50; i++) {
      sendToSOC("/flood" + i);
    }
  }
};
