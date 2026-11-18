/**
 * Portofolio Tirta Ibnu Wibowo - SMKN 1 Kawali (RPL & Hobi Mekanik Motor)
 * Modern Interactivity: Filter Modes, Terminal Typing, Toast, Copy-to-Clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const mobileToggle = document.getElementById('dockMobileToggle');
  const navLinks = document.getElementById('dockNavLinks');
  const navItems = document.querySelectorAll('.dock-nav-links .nav-item');
  const contactForm = document.getElementById('contactHubForm');
  const copyPhoneBtn = document.getElementById('btnCopyPhone');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const modeButtons = document.querySelectorAll('.discipline-switcher .mode-btn');
  const bentoItems = document.querySelectorAll('.bento-item');
  const vaultCards = document.querySelectorAll('.vault-card');
  const currentYearSpan = document.getElementById('currentYear');

  // Set Current Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 1. Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking any nav item
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Active Section Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const handleScrollActive = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const correspondingNav = document.querySelector(`.dock-nav-links a[href*="${id}"]`);

      if (correspondingNav && scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => item.classList.remove('active'));
        correspondingNav.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', handleScrollActive);

  // 3. Discipline Filter Switcher (All / RPL / Motor)
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedMode = btn.getAttribute('data-mode');

      // Filter Bento items
      bentoItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        if (selectedMode === 'all' || categories.includes(selectedMode)) {
          item.style.display = '';
          item.style.animation = 'fadeInCard 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });

      // Filter Vault project cards
      vaultCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (selectedMode === 'all' || categories.includes(selectedMode)) {
          card.style.display = '';
          card.style.animation = 'fadeInCard 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });

      // Show toast
      const modeLabels = {
        all: 'Menampilkan Semua Fokus',
        code: 'Mode Fokus: RPL & Koding',
        motor: 'Mode Fokus: Bengkel & Otomotif'
      };
      showToast(modeLabels[selectedMode] || 'Mode diubah');
    });
  });

  // 4. Copy Phone to Clipboard with Toast
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phoneNumber = copyPhoneBtn.getAttribute('data-phone') || '081320321738';

      navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast('Nomor HP (' + phoneNumber + ') berhasil disalin!');
      }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = phoneNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Nomor HP (' + phoneNumber + ') berhasil disalin!');
      });
    });
  }

  // Toast Function
  let toastTimer;
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 5. Contact Form WhatsApp Dispatcher
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('hubName').value.trim();
      const category = document.getElementById('hubCategory').value;
      const message = document.getElementById('hubMessage').value.trim();

      if (!name || !message) {
        showToast('Mohon lengkapi nama dan pesan Anda.');
        return;
      }

      const targetPhone = '6281320321738';
      const formattedMessage =
        `Halo Tirta Ibnu Wibowo (SMKN 1 Kawali),%0A%0A` +
        `Nama Saya: *${encodeURIComponent(name)}*%0A` +
        `Kategori: *${encodeURIComponent(category)}*%0A%0A` +
        `Isi Pesan:%0A${encodeURIComponent(message)}%0A%0A` +
        `_(Pesan dikirim melalui Website Portofolio Bento Tirta Ibnu Wibowo)_`;

      const waUrl = `https://wa.me/${targetPhone}?text=${formattedMessage}`;
      window.open(waUrl, '_blank');
      contactForm.reset();
      showToast('Membuka WhatsApp untuk mengirim pesan...');
    });
  }

  // 6. Interactive Terminal Typing / Cursor Blink Easter Egg
  const terminal = document.getElementById('terminalOutput');
  if (terminal) {
    terminal.addEventListener('click', () => {
      showToast('Terminal interaktif Tirta Ibnu Wibowo aktif!');
    });
  }
});
