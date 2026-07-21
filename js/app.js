// ─── Index page ───
function app() {
  return {
    mm: false,
    sc: false,
    s: 'hero',
    init() {
      document.getElementById('vanta-bg').style.background = '#ffffff';
      window.addEventListener('scroll', () => {
        this.sc = window.scrollY > 20;
        this.updateSection();
      }, { passive: true });
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
      document.getElementById('year').textContent = new Date().getFullYear();
      this.$nextTick(() => this.initVanta());
    },
    initVanta() {
      if (window.particlesJS) {
        try {
          if (window.pJSDom) { window.pJSDom.forEach(p => p.pJS.fn.vendors.destroy()); window.pJSDom = []; }
          document.getElementById('vanta-bg').style.background = '#ffffff';
          particlesJS('vanta-bg', {
            particles: {
              number: { value: 60, density: { enable: true } },
              color: { value: '#ff6b2b' },
              shape: { type: 'circle' },
              opacity: { value: 0.3, random: true },
              size: { value: 2.5, random: true },
              line_linked: { enable: false },
              move: {
                enable: true,
                speed: 0.8,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
              }
            },
            interactivity: {
              detect_on: 'window',
              events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: false }
              },
              modes: {
                repulse: { distance: 80, duration: 0.6 }
              }
            },
            retina_detect: true
          });
        } catch(e) { console.warn('particles failed:', e); }
      }
    },
    updateSection() {
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 60;
      if (atBottom) { this.s = 'contact'; return; }
      const ids = ['contact','about','work','skills','services','hero'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { this.s = id; return; }
      }
    }
  }
}

// ─── WhatsApp contact form ───
function whatsappForm() {
  return {
    name: '',
    email: '',
    subject: '',
    message: '',
    error: '',
    sendWhatsApp() {
      this.error = '';
      if (!this.name.trim()) { this.error = 'Please enter your name.'; return; }
      if (!this.subject.trim()) { this.error = 'Please enter a subject.'; return; }
      if (!this.message.trim()) { this.error = 'Please enter a message.'; return; }
      const text = `Name: ${this.name.trim()}%0AEmail: ${this.email.trim() || 'Not provided'}%0ASubject: ${this.subject.trim()}%0AMessage:%0A${this.message.trim()}`;
      window.open(`https://wa.me/256758384289?text=${text}`, '_blank');
    }
  }
}

