/* ============================================================
   DANIELE PESCATORE – PORTFOLIO
   Main scripts
   ============================================================ */

/* === HERO PARTICLE CANVAS === */
(function () {
  const hero = document.getElementById('hero');
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, pts = [], mouse = { x: -9999, y: -9999 }, raf;

  function resize() {
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    build();
  }

  function build() {
    pts = [];
    const n = Math.round(W * H / 7000);
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .6,
        vy: (Math.random() - .5) * .6,
        closest: [],
        a: 0
      });
    }
    pts.forEach(p => {
      p.closest = [...pts]
        .filter(q => q !== p)
        .sort((a, b) => dist2(p, a) - dist2(p, b))
        .slice(0, 5);
    });
  }

  function dist2(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    pts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const d = Math.sqrt(dist2(p, mouse));
      p.a = d < 100 ? 1 : d < 200 ? .8 : d < 300 ? .5 : d < 450 ? .25 : .1;
    });

    pts.forEach(p => {
      p.closest.forEach(q => {
        const a = (p.a + q.a) / 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(100,170,255,${a * .4})`;
        ctx.lineWidth = a * 1.5;
        ctx.stroke();
      });
    });

    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.a * 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80,140,255,${p.a * .07})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.a * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(160,205,255,${p.a * .95})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(tick);
  }

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', () => {
    mouse = { x: -9999, y: -9999 };
  });

  window.addEventListener('resize', () => {
    if (raf) cancelAnimationFrame(raf);
    resize();
  });

  resize();
  tick();
})();

/* === BLOB BACKGROUND === */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth  || document.documentElement.clientWidth  || 800;
    H = canvas.height = window.innerHeight || document.documentElement.clientHeight || 600;
  }

  resize();
  window.addEventListener('resize', resize);

  const COLORS = [
    [30,  80,  220],  // electric blue
    [120, 40,  200],  // violet
    [20,  160, 130],  // teal
    [80,  20,  180],  // indigo
    [10,  100, 180],  // azure
    [160, 60,  220],  // lilac
  ];

  class Blob {
    constructor(i) {
      this.hue    = COLORS[i % COLORS.length];
      this.x      = Math.random() * W;
      this.y      = Math.random() * H;
      this.r      = Math.min(W, H) * (.28 + Math.random() * .22);
      this.vx     = (Math.random() - .5) * .55;
      this.vy     = (Math.random() - .5) * .55;
      this.phase  = Math.random() * Math.PI * 2;
      this.wobble = Math.random() * .012 + .006;
    }

    update(t) {
      this.x += this.vx + Math.sin(t * this.wobble + this.phase) * .7;
      this.y += this.vy + Math.cos(t * this.wobble + this.phase + 1) * .7;
      if (this.x < -this.r)    this.x = W + this.r;
      if (this.x > W + this.r) this.x = -this.r;
      if (this.y < -this.r)    this.y = H + this.r;
      if (this.y > H + this.r) this.y = -this.r;
    }

    draw() {
      const [r, g, b] = this.hue;
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      grad.addColorStop(0,   `rgba(${r},${g},${b},0.72)`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},0.32)`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  const blobs = COLORS.map((_, i) => new Blob(i));
  let t = 0;

  function frame() {
    t++;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'screen';
    blobs.forEach(b => { b.update(t); b.draw(); });
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }

  frame();
})();

/* === TYPING ANIMATION === */
(function () {
  const roles = [
    'Innovation Manager',
    'Software Consultant',
    'Vibe Coder',
    'Community Builder',
    'Docente di Informatica'
  ];
  let ri = 0, ci = 0, del = false;
  const el = document.getElementById('typed-role');

  function type() {
    const cur = roles[ri];
    el.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    let delay = del ? 42 : 85;
    if (!del && ci === cur.length) {
      delay = 1900;
      del = true;
    } else if (del && ci === 0) {
      del = false;
      ri = (ri + 1) % roles.length;
      delay = 280;
    }
    setTimeout(type, delay);
  }

  type();
})();

/* === COUNT-UP ANIMATION === */
(function () {
  const heroStats = document.querySelector('.hero-stats');
  if (!heroStats) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      document.querySelectorAll('.stat-num').forEach(n => {
        const target = +n.dataset.target;
        const suffix = n.dataset.suffix || '+';
        let count = 0;
        const step = Math.ceil(target / 55);
        const iv = setInterval(() => {
          count = Math.min(count + step, target);
          n.textContent = count + (count >= target ? suffix : '');
          if (count >= target) clearInterval(iv);
        }, 25);
      });
      obs.disconnect();
    });
  }, { threshold: .5 });

  obs.observe(heroStats);
})();

/* === REVEAL ON SCROLL === */
(function () {
  const ro = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        ro.unobserve(e.target);
      }
    });
  }, { threshold: .1 });

  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
})();

/* === NAV SHADOW ON SCROLL === */
(function () {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 30
      ? '0 4px 22px rgba(0,0,0,.45)'
      : 'none';
  });
})();
