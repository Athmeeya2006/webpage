    // Smooth lerp helper
    function lerp(a, b, t) { return a + (b - a) * t; }

    // PRELOADER
    const bootFill = document.getElementById('bootFill');
    let pct = 0;
    const duration = 1200;
    const start = performance.now();

    function animateLoader(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      pct = eased * 100;
      if (bootFill) bootFill.style.width = pct + '%';
      if (progress < 1) requestAnimationFrame(animateLoader);
      else setTimeout(launchSite, 200);
    }
    requestAnimationFrame(animateLoader);

    function launchSite() {
      const pre = document.getElementById('preloader');
      pre.classList.add('shatter');
      // Let the shatter animation play smoothly before removing
      setTimeout(() => { 
        pre.style.display = 'none'; 
        document.body.style.overflow = '';
        startHero(); 
      }, 900);
    }

    // HERO
    function startHero() {
      const name = 'ATHMEEYA M KASHYAP';
      const container = document.getElementById('heroName');
      const words = name.split(' ');
      let ci = 0;
      words.forEach((word, wi) => {
        const wordWrap = document.createElement('span');
        wordWrap.style.display = 'inline-flex';
        wordWrap.style.whiteSpace = 'nowrap';
        word.split('').forEach(ch => {
          const span = document.createElement('span');
          span.className = 'letter';
          span.textContent = ch;
          // Smoother stagger: longer delays with easing overlap
          span.style.transitionDelay = (ci * 50) + 'ms';
          setTimeout(() => span.classList.add('visible'), 200 + ci * 50);
          wordWrap.appendChild(span);
          ci++;
        });
        container.appendChild(wordWrap);
        if (wi < words.length - 1) {
          const space = document.createElement('span');
          space.className = 'letter space';
          container.appendChild(space);
          ci++;
        }
      });
      // Start subtitle with smooth delay sync
      setTimeout(typeSubtitle, ci * 50 + 400);
    }
    function typeSubtitle() {
      const el = document.getElementById('heroSubtitle');
      const text = 'Computer Science · IIIT Hyderabad · Researcher · Builder · Competitive Programmer';
      el.style.opacity = 1;
      let i = 0;
      const iv = setInterval(() => {
        el.textContent = text.slice(0, ++i) + (i < text.length ? '█' : '');
        if (i >= text.length) clearInterval(iv);
      }, 35);
    }

    // STARFIELD
    const sc = document.getElementById('starCanvas');
    const sctx = sc.getContext('2d');
    let W, H, stars = [], mouseX = 0, mouseY = 0;
    function resizeStar() {
      W = sc.width = window.innerWidth;
      H = sc.height = window.innerHeight;
    }
    resizeStar(); window.addEventListener('resize', resizeStar);
    for (let i = 0; i < 200; i++) {
      stars.push({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() });
    }
    document.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth - .5) * .05;
      mouseY = (e.clientY / window.innerHeight - .5) * .05;
    });
    function drawStars() {
      sctx.fillStyle = 'rgba(0,0,0,0.12)';
      sctx.fillRect(0, 0, W, H);
      stars.forEach(s => {
        s.z -= 0.0025;
        if (s.z <= 0) { s.z = 1; s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; }
        const sx = (s.x + mouseX) / s.z * W / 2 + W / 2;
        const sy = (s.y + mouseY) / s.z * H / 2 + H / 2;
        const r = Math.max(0.3, (1 - s.z) * 2.5);
        const alpha = Math.pow(1 - s.z, 1.5); // smoother alpha curve
        sctx.beginPath();
        sctx.arc(sx, sy, r, 0, Math.PI * 2);
        sctx.fillStyle = `rgba(200,240,255,${alpha})`;
        sctx.fill();
        if (r > 1.5) {
          sctx.beginPath();
          sctx.arc(sx, sy, r * 2, 0, Math.PI * 2);
          sctx.fillStyle = `rgba(0,255,229,${alpha * 0.12})`;
          sctx.fill();
        }
      });
      requestAnimationFrame(drawStars);
    }
    drawStars();

    // SCROLL REVEALS (staggered + smoother)
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Get all sibling reveals within the same parent for stagger sync
          const parent = e.target.parentElement;
          const siblings = parent ? Array.from(parent.querySelectorAll(':scope > .reveal')) : [];
          const idx = siblings.indexOf(e.target);
          const staggerDelay = idx >= 0 ? idx * 80 : 0;
          
          // Only add delay if the element doesn't already have a stagger class
          if (!e.target.className.match(/stagger-\d/)) {
            e.target.style.transitionDelay = staggerDelay + 'ms';
          }
          
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              e.target.classList.add('visible');
            });
          });
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(r => revealObserver.observe(r));

    // STAT COUNTERS (eased)
    const statNums = document.querySelectorAll('.stat-num[data-count]');
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const duration = 1500;
          const start = performance.now();
          
          function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
          
          function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            current = Math.round(easeOutQuart(progress) * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
          statObs.unobserve(el);
        }
      });
    }, { threshold: .5 });
    statNums.forEach(n => statObs.observe(n));

    // EDU LINE (staggered smooth fill)
    const eduObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Smooth sequential fill
          const lineFill = document.getElementById('eduLineFill');
          lineFill.style.transition = 'height 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
          lineFill.style.height = '100%';
          
          // Stagger XP bars to sync with timeline fill
          document.querySelectorAll('.edu-xp-fill').forEach((bar, i) => {
            bar.style.transition = `width 1.8s cubic-bezier(0.16, 1, 0.3, 1) ${400 + i * 500}ms`;
            setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200 + i * 500);
          });
          
          // Stagger dot pulses in sync
          setTimeout(() => document.getElementById('dot2').classList.add('pulse'), 800);
          setTimeout(() => document.getElementById('dot3').classList.add('pulse'), 1600);
          
          eduObs.disconnect();
        }
      });
    }, { threshold: .15 });
    const eduSec = document.getElementById('education');
    if (eduSec) eduObs.observe(eduSec);

    // SKILLS NEURAL NETWORK
    const skillCanvas = document.getElementById('skillCanvas');
    if (skillCanvas) {
    const skctx = skillCanvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    if (isMobile) { skillCanvas.width = window.innerWidth - 40; skillCanvas.height = 550; }
    const SW = skillCanvas.width, SH = skillCanvas.height;

    const skillNodes = [
      // Languages (cat 0 - cyan)
      { id: 0,  label: 'C/C++',       level: 'Advanced',      x: .08, y: .22, r: 32, cat: 0 },
      { id: 1,  label: 'Python',      level: 'Advanced',      x: .22, y: .15, r: 32, cat: 0 },
      { id: 2,  label: 'JavaScript',  level: 'Proficient',    x: .36, y: .22, r: 28, cat: 0 },
      { id: 3,  label: 'TypeScript',  level: 'Proficient',    x: .50, y: .12, r: 26, cat: 0 },
      { id: 4,  label: 'Rust',        level: 'Intermediate',  x: .06, y: .60, r: 22, cat: 0 },
      { id: 5,  label: 'Bash',        level: 'Proficient',    x: .28, y: .38, r: 22, cat: 0 },
      // Frameworks & Tools (cat 1 - orange)
      { id: 6,  label: 'React',       level: 'Proficient',    x: .62, y: .18, r: 28, cat: 1 },
      { id: 7,  label: 'Node.js',     level: 'Proficient',    x: .76, y: .12, r: 26, cat: 1 },
      { id: 8,  label: 'FastAPI',     level: 'Proficient',    x: .44, y: .38, r: 24, cat: 1 },
      { id: 9,  label: 'Git',         level: 'Advanced',      x: .90, y: .22, r: 28, cat: 1 },
      { id: 10, label: 'Docker',      level: 'Proficient',    x: .82, y: .38, r: 26, cat: 1 },
      { id: 11, label: 'Linux',       level: 'Advanced',      x: .94, y: .48, r: 28, cat: 1 },
      { id: 12, label: 'Next.js',     level: 'Intermediate',  x: .68, y: .32, r: 22, cat: 1 },
      { id: 25, label: 'Framer Motion', level: 'Intermediate', x: .60, y: .40, r: 28, cat: 1 },
      // Infrastructure & Data (cat 2 - purple)
      { id: 13, label: 'SQL',         level: 'Advanced',      x: .18, y: .72, r: 28, cat: 2 },
      { id: 14, label: 'MongoDB',     level: 'Proficient',    x: .34, y: .78, r: 26, cat: 2 },
      { id: 15, label: 'Redis',       level: 'Intermediate',  x: .50, y: .72, r: 22, cat: 2 },
      { id: 16, label: 'AWS',         level: 'Intermediate',  x: .66, y: .82, r: 24, cat: 2 },
      { id: 17, label: 'PostgreSQL',  level: 'Proficient',    x: .34, y: .60, r: 24, cat: 2 },
      { id: 18, label: 'GraphQL',     level: 'Intermediate',  x: .52, y: .52, r: 20, cat: 2 },
      { id: 26, label: 'Prisma',      level: 'Intermediate',  x: .46, y: .64, r: 22, cat: 2 },
      { id: 27, label: 'SQLite',      level: 'Proficient',    x: .22, y: .56, r: 22, cat: 2 },
      // Concepts & Systems (cat 3 - gold)
      { id: 19, label: 'DSA',         level: 'Advanced',      x: .10, y: .88, r: 32, cat: 3 },
      { id: 20, label: 'Sys Design',  level: 'Proficient',    x: .78, y: .62, r: 28, cat: 3 },
      { id: 21, label: 'CI/CD',       level: 'Proficient',    x: .92, y: .72, r: 24, cat: 3 },
      { id: 22, label: 'REST APIs',   level: 'Advanced',      x: .64, y: .58, r: 26, cat: 3 },
      { id: 23, label: 'Testing',     level: 'Proficient',    x: .82, y: .85, r: 22, cat: 3 },
      { id: 24, label: 'ML Basics',   level: 'Intermediate',  x: .48, y: .90, r: 20, cat: 3 },
    ];
    const edges = [
      // Language family connections
      [0,4],    // C/C++ → Rust (systems languages)
      [1,5],    // Python → Bash (scripting)
      [2,3],    // JavaScript → TypeScript (superset)
      // Language → Framework connections
      [2,6],    // JavaScript → React
      [3,6],    // TypeScript → React
      [3,12],   // TypeScript → Next.js
      [3,25],   // TypeScript → Framer Motion (frontend stack)
      [6,12],   // React → Next.js (framework stack)
      [6,25],   // React → Framer Motion (animation library)
      [2,7],    // JavaScript → Node.js
      [3,7],    // TypeScript → Node.js
      [1,8],    // Python → FastAPI
      // Tool ecosystem
      [9,10],   // Git → Docker (DevOps)
      [10,11],  // Docker → Linux (infrastructure)
      [5,11],   // Bash → Linux (shell)
      [9,21],   // Git → CI/CD (pipeline)
      [10,21],  // Docker → CI/CD (deployment)
      // Data layer connections
      [13,17],  // SQL → PostgreSQL (SQL databases)
      [13,27],  // SQL → SQLite (embedded SQL)
      [13,14],  // SQL → MongoDB (data storage)
      [14,15],  // MongoDB → Redis (NoSQL)
      [15,18],  // Redis → GraphQL (data layer)
      [17,18],  // PostgreSQL → GraphQL (data access)
      [17,26],  // PostgreSQL → Prisma (ORM)
      [26,27],  // Prisma → SQLite (ORM adapter)
      // Backend → Data
      [8,17],   // FastAPI → PostgreSQL (backend stack)
      [7,14],   // Node.js → MongoDB (MERN)
      [7,15],   // Node.js → Redis (caching)
      [7,26],   // Node.js → Prisma (backend ORM)
      // Infrastructure
      [16,10],  // AWS → Docker (cloud deploy)
      [16,21],  // AWS → CI/CD (cloud pipeline)
      [11,16],  // Linux → AWS (cloud)
      // Concepts wired to practice
      [19,0],   // DSA → C/C++ (competitive programming)
      [19,1],   // DSA → Python (algorithmic)
      [20,22],  // Sys Design → REST APIs
      [20,10],  // Sys Design → Docker
      [20,16],  // Sys Design → AWS
      [22,8],   // REST APIs → FastAPI
      [22,7],   // REST APIs → Node.js
      [22,18],  // REST APIs → GraphQL (API paradigms)
      [21,23],  // CI/CD → Testing (quality pipeline)
      [23,8],   // Testing → FastAPI
      [24,1],   // ML Basics → Python
      [24,19],  // ML Basics → DSA (algorithms)
    ];
    const catColors = ['#00FFE5', '#FF4500', '#8844ff', '#ffd700'];

    skillNodes.forEach(n => { n.px = n.x * SW; n.py = n.y * SH; n.vx = (Math.random() - .5) * 0.15; n.vy = (Math.random() - .5) * 0.15; n.hover = false; });
    let hoverNode = null;
    skillCanvas.addEventListener('mousemove', e => {
      const rect = skillCanvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (SW / rect.width);
      const my = (e.clientY - rect.top) * (SH / rect.height);
      hoverNode = null;
      skillNodes.forEach(n => {
        const d = Math.hypot(mx - n.px, my - n.py);
        n.hover = d < n.r + 10;
        if (n.hover) { hoverNode = n; }
      });
    });

    const packets = [];
    function spawnPacket() {
      const e = edges[Math.floor(Math.random() * edges.length)];
      packets.push({ from: e[0], to: e[1], t: 0, speed: .005 + Math.random() * .01 });
    }
    setInterval(spawnPacket, 600);

    function drawSkills() {
      skctx.clearRect(0, 0, SW, SH);
      // drift
      skillNodes.forEach(n => {
        n.px += n.vx; n.py += n.vy;
        if (n.px < n.r) { n.px = n.r; n.vx = Math.abs(n.vx); }
        else if (n.px > SW - n.r) { n.px = SW - n.r; n.vx = -Math.abs(n.vx); }
        if (n.py < n.r) { n.py = n.r; n.vy = Math.abs(n.vy); }
        else if (n.py > SH - n.r) { n.py = SH - n.r; n.vy = -Math.abs(n.vy); }
      });
      // edges
      edges.forEach(([a, b]) => {
        const na = skillNodes[a], nb = skillNodes[b];
        const active = hoverNode && (hoverNode.id === a || hoverNode.id === b);
        skctx.beginPath();
        skctx.moveTo(na.px, na.py);
        skctx.lineTo(nb.px, nb.py);
        skctx.strokeStyle = active ? 'rgba(0,255,229,0.5)' : 'rgba(0,255,229,0.08)';
        skctx.lineWidth = active ? 1.5 : .8;
        skctx.stroke();
      });
      // packets
      packets.forEach((p, i) => {
        p.t += p.speed;
        if (p.t >= 1) { packets.splice(i, 1); return; }
        const na = skillNodes[p.from], nb = skillNodes[p.to];
        const x = na.px + (nb.px - na.px) * p.t;
        const y = na.py + (nb.py - na.py) * p.t;
        skctx.beginPath();
        skctx.arc(x, y, 3, 0, Math.PI * 2);
        skctx.fillStyle = catColors[na.cat];
        skctx.shadowBlur = 10; skctx.shadowColor = catColors[na.cat];
        skctx.fill();
        skctx.shadowBlur = 0;
      });
      // nodes
      skillNodes.forEach(n => {
        const col = catColors[n.cat];
        const isHov = n.hover || (hoverNode && edges.some(([a, b]) => (a === hoverNode.id || b === hoverNode.id) && (a === n.id || b === n.id)));
        const scale = isHov ? 1.3 : 1;
        const r = n.r * scale;
        // glow
        skctx.beginPath();
        skctx.arc(n.px, n.py, r + 8, 0, Math.PI * 2);
        skctx.fillStyle = col.replace(')', `,${isHov ? .15 : .04})`).replace('rgb', 'rgba').replace('#', 'rgba(').replace(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i, (m, r, g, b) => `${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)}`);
        // simpler glow
        const grad = skctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, r + 12);
        grad.addColorStop(0, col + (isHov ? '33' : '11'));
        grad.addColorStop(1, 'transparent');
        skctx.fillStyle = grad;
        skctx.fill();
        // circle
        skctx.beginPath();
        skctx.arc(n.px, n.py, r, 0, Math.PI * 2);
        skctx.fillStyle = isHov ? col + '22' : '#050508';
        skctx.fill();
        skctx.strokeStyle = isHov ? col : col + '66';
        skctx.lineWidth = isHov ? 2 : 1;
        skctx.shadowBlur = isHov ? 20 : 0;
        skctx.shadowColor = col;
        skctx.stroke();
        skctx.shadowBlur = 0;
        // label
        skctx.fillStyle = isHov ? col : 'rgba(240,240,240,0.85)';
        skctx.font = `${isHov ? 'bold ' : ''}${Math.max(10, Math.round(r * .42))}px Space Mono, monospace`;
        skctx.textAlign = 'center'; skctx.textBaseline = 'middle';
        skctx.fillText(n.label, n.px, n.py);
        if (isHov) {
          skctx.font = `11px Space Mono, monospace`;
          skctx.fillStyle = 'rgba(240,240,240,0.6)';
          skctx.fillText(n.level, n.px, n.py + r + 16);
        }
      });
      requestAnimationFrame(drawSkills);
    }
    drawSkills();
    }

    // MATRIX RAIN
    const codeC = document.getElementById('codeCanvas');
    if (codeC) {
      const panel = codeC.closest('.ach-panel');
      codeC.width = panel ? panel.offsetWidth : 380;
      codeC.height = panel ? panel.offsetHeight : 480;
      const mctx = codeC.getContext('2d');
      const cols = Math.floor(codeC.width / 16);
      const drops = Array(cols).fill(0);
      function drawMatrix() {
        mctx.fillStyle = 'rgba(0,0,0,0.05)';
        mctx.fillRect(0, 0, codeC.width, codeC.height);
        mctx.fillStyle = '#FF4500';
        mctx.font = '14px Space Mono, monospace';
        drops.forEach((y, i) => {
          const ch = Math.random() > .5 ? '1' : '0';
          mctx.fillText(ch, i * 16, y * 16);
          if (y * 16 > codeC.height && Math.random() > .95) drops[i] = 0;
          else drops[i]++;
        });
      }
      setInterval(drawMatrix, 60);
    }

    // RADAR
    const radarC = document.getElementById('radarCanvas');
    const rctx = radarC.getContext('2d');
    const RW = radarC.width, RH = radarC.height;
    const CX = RW / 2, CY = RH / 2, MAX_R = RW / 2 - 20;
    let radarAngle = 0;
    let smoothRadarAngle = 0;
    const blips = [
      { angle: 0.8, dist: .6, label: 'IIIT HYD' },

      { angle: 4.5, dist: .75, label: 'CODEFORCES' },
      { angle: 3.2, dist: .5, label: 'SGFI' },
    ];
    function drawRadar() {
      rctx.clearRect(0, 0, RW, RH);
      // circles
      [.25, .5, .75, 1].forEach(f => {
        rctx.beginPath();
        rctx.arc(CX, CY, MAX_R * f, 0, Math.PI * 2);
        rctx.strokeStyle = 'rgba(0,255,229,0.15)';
        rctx.lineWidth = 1;
        rctx.stroke();
      });
      // crosshair
      rctx.strokeStyle = 'rgba(0,255,229,0.1)';
      rctx.beginPath(); rctx.moveTo(CX, 20); rctx.lineTo(CX, RH - 20); rctx.stroke();
      rctx.beginPath(); rctx.moveTo(20, CY); rctx.lineTo(RW - 20, CY); rctx.stroke();
      // sweep
      const grad = rctx.createConicalGradient ? null : null;
      rctx.save();
      rctx.translate(CX, CY);
      rctx.rotate(radarAngle);
      const sg = rctx.createLinearGradient(0, 0, MAX_R, 0);
      sg.addColorStop(0, 'rgba(0,255,229,0.8)');
      sg.addColorStop(1, 'transparent');
      rctx.beginPath();
      rctx.moveTo(0, 0);
      rctx.arc(0, 0, MAX_R, -0.3, 0);
      rctx.fillStyle = sg;
      rctx.fill();
      rctx.restore();
      radarAngle += 0.025;
      smoothRadarAngle = lerp(smoothRadarAngle, radarAngle, 0.15);
      // blips
      blips.forEach(b => {
        const diff = ((b.angle - radarAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const fade = diff < 0.3 ? 1 : Math.max(0, 1 - (diff - 0.3) / (Math.PI * .8));
        if (fade < 0.01) return;
        const bx = CX + Math.cos(b.angle) * MAX_R * b.dist;
        const by = CY + Math.sin(b.angle) * MAX_R * b.dist;
        rctx.beginPath();
        rctx.arc(bx, by, 4, 0, Math.PI * 2);
        rctx.fillStyle = `rgba(0,255,229,${fade})`;
        rctx.shadowBlur = 10; rctx.shadowColor = '#00FFE5';
        rctx.fill();
        rctx.shadowBlur = 0;
        rctx.fillStyle = `rgba(0,255,229,${fade * .7})`;
        rctx.font = '12px Space Mono, monospace';
        rctx.fillText(b.label, bx + 8, by + 4);
      });
      requestAnimationFrame(drawRadar);
    }
    drawRadar();

    // NAV SCROLL + SCROLL PROGRESS + BACK TO TOP (rAF-throttled for smoothness)
    const navEl = document.getElementById('nav');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    let scrollTicking = false;
    let smoothScrollProgress = 0;
    let lastActiveSection = 'hero';
    
    function updateScroll() {
      const sy = window.scrollY;
      
      // Smooth nav state
      navEl.classList.toggle('scrolled', sy > 60);
      
      // Smooth scroll progress with lerp
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const targetPct = docH > 0 ? (sy / docH) * 100 : 0;
      smoothScrollProgress = lerp(smoothScrollProgress, targetPct, 0.3);
      scrollProgress.style.width = smoothScrollProgress + '%';
      
      // back to top (smooth opacity via class)
      backToTop.classList.toggle('visible', sy > 500);
      
      // active section (with hysteresis to avoid flickering)
      const secs = ['hero', 'about', 'experience', 'education', 'skills', 'achievements', 'projects', 'contact'];
      let active = 'hero';
      secs.forEach(id => {
        const el = document.getElementById(id);
        if (el && sy >= el.offsetTop - 250) active = id;
      });
      
      if (active !== lastActiveSection) {
        lastActiveSection = active;
        document.querySelectorAll('.nav-links a').forEach(a => {
          const isActive = a.getAttribute('href') === '#' + active;
          if (isActive !== a.classList.contains('active')) {
            a.classList.toggle('active', isActive);
          }
        });
      }
      
      scrollTicking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(updateScroll);
        scrollTicking = true;
      }
    }, { passive: true });

    // MOBILE MENU
    document.getElementById('hamburger').addEventListener('click', () => document.getElementById('mobileMenu').classList.add('open'));
    document.getElementById('mobileClose').addEventListener('click', closeMobile);
    function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

    // FILM GRAIN
    const grainC = document.getElementById('grain');
    const gctx = grainC.getContext('2d');
    function resizeGrain() {
      grainC.width = Math.ceil(window.innerWidth / 3);
      grainC.height = Math.ceil(window.innerHeight / 3);
    }
    resizeGrain(); window.addEventListener('resize', resizeGrain);
    let grainFrame = 0;
    function drawGrain() {
      if (++grainFrame % 3 === 0) {
        const w = grainC.width, h = grainC.height;
        const imgData = gctx.createImageData(w, h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = data[i + 1] = data[i + 2] = v;
          data[i + 3] = 200;
        }
        gctx.putImageData(imgData, 0, 0);
      }
      requestAnimationFrame(drawGrain);
    }
    drawGrain();

    // TEXT SCRAMBLE on section titles (smoother)
    const scrambleChars = '!<>-_\\/[]{}.=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    function scrambleText(el) {
      const html = el.innerHTML;
      const tokens = [];
      let textLen = 0;
      html.split(/(<br\s*\/?>)/gi).forEach((part, i) => {
        if (i % 2 === 1) {
          tokens.push({ type: 'br', value: part });
        } else {
          for (const ch of part) {
            tokens.push({ type: 'char', value: ch, idx: textLen++ });
          }
        }
      });
      let iteration = 0;
      const totalFrames = textLen + 10;
      const interval = setInterval(() => {
        let result = '';
        tokens.forEach(tok => {
          if (tok.type === 'br') { result += tok.value; return; }
          if (tok.value === ' ') { result += ' '; return; }
          // Smooth reveal: each char has a window where it scrambles before resolving
          const revealAt = tok.idx * 0.8;
          if (iteration >= revealAt + 4) {
            result += tok.value;
          } else if (iteration >= revealAt) {
            result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            result += tok.value.replace(/[^\s]/, scrambleChars[Math.floor(Math.random() * scrambleChars.length)]);
          }
        });
        el.innerHTML = result;
        if (iteration >= totalFrames) clearInterval(interval);
        iteration += 1;
      }, 25);
    }
    // observe section titles for scramble
    const titleObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          scrambleText(e.target);
          titleObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.section-title').forEach(t => titleObs.observe(t));

    // MAGNETIC BUTTONS (smoother with lerp)
    document.querySelectorAll('.btn-primary, .btn-secondary, .cv-btn').forEach(btn => {
      let btnX = 0, btnY = 0, targetX = 0, targetY = 0;
      let btnAnimId = null;
      
      function animateBtn() {
        btnX = lerp(btnX, targetX, 0.1);
        btnY = lerp(btnY, targetY, 0.1);
        btn.style.transform = `translate(${btnX}px, ${btnY}px)`;
        if (Math.abs(btnX - targetX) > 0.1 || Math.abs(btnY - targetY) > 0.1) {
          btnAnimId = requestAnimationFrame(animateBtn);
        }
      }
      
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        targetX = (e.clientX - r.left - r.width / 2) * 0.2;
        targetY = (e.clientY - r.top - r.height / 2) * 0.2;
        if (!btnAnimId) btnAnimId = requestAnimationFrame(animateBtn);
      });
      btn.addEventListener('mouseleave', () => { 
        targetX = 0; targetY = 0;
        if (!btnAnimId) btnAnimId = requestAnimationFrame(animateBtn);
      });
    });

    // ACHIEVEMENT PANEL 3D TILT (smooth lerp)
    document.querySelectorAll('.ach-panel').forEach(panel => {
      let tiltX = 0, tiltY = 0, targetTiltX = 0, targetTiltY = 0;
      let tiltAnim = null;
      
      function animateTilt() {
        tiltX = lerp(tiltX, targetTiltX, 0.08);
        tiltY = lerp(tiltY, targetTiltY, 0.08);
        panel.style.transform = `perspective(600px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) translateY(-8px)`;
        if (Math.abs(tiltX - targetTiltX) > 0.05 || Math.abs(tiltY - targetTiltY) > 0.05) {
          tiltAnim = requestAnimationFrame(animateTilt);
        } else { tiltAnim = null; }
      }
      
      panel.addEventListener('mousemove', e => {
        const r = panel.getBoundingClientRect();
        targetTiltX = ((e.clientX - r.left) / r.width - .5) * 10;
        targetTiltY = -((e.clientY - r.top) / r.height - .5) * 10;
        if (!tiltAnim) tiltAnim = requestAnimationFrame(animateTilt);
      });
      panel.addEventListener('mouseleave', () => { 
        targetTiltX = 0; targetTiltY = 0;
        // Smooth return to origin
        function returnToZero() {
          tiltX = lerp(tiltX, 0, 0.06);
          tiltY = lerp(tiltY, 0, 0.06);
          if (Math.abs(tiltX) > 0.05 || Math.abs(tiltY) > 0.05) {
            panel.style.transform = `perspective(600px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
            requestAnimationFrame(returnToZero);
          } else {
            panel.style.transform = '';
            tiltAnim = null;
          }
        }
        requestAnimationFrame(returnToZero);
      });
    });

    // PROJECT CARD 3D TILT (smooth lerp)
    document.querySelectorAll('.project-card').forEach(card => {
      let tiltX = 0, tiltY = 0, targetTiltX = 0, targetTiltY = 0;
      let tiltAnim = null;
      
      function animateTilt() {
        tiltX = lerp(tiltX, targetTiltX, 0.08);
        tiltY = lerp(tiltY, targetTiltY, 0.08);
        card.style.transform = `perspective(800px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) translateY(-6px)`;
        if (Math.abs(tiltX - targetTiltX) > 0.05 || Math.abs(tiltY - targetTiltY) > 0.05) {
          tiltAnim = requestAnimationFrame(animateTilt);
        } else { tiltAnim = null; }
      }
      
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        targetTiltX = ((e.clientX - r.left) / r.width - .5) * 6;
        targetTiltY = -((e.clientY - r.top) / r.height - .5) * 6;
        if (!tiltAnim) tiltAnim = requestAnimationFrame(animateTilt);
      });
      card.addEventListener('mouseleave', () => { 
        targetTiltX = 0; targetTiltY = 0;
        function returnToZero() {
          tiltX = lerp(tiltX, 0, 0.06);
          tiltY = lerp(tiltY, 0, 0.06);
          if (Math.abs(tiltX) > 0.05 || Math.abs(tiltY) > 0.05) {
            card.style.transform = `perspective(800px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
            requestAnimationFrame(returnToZero);
          } else {
            card.style.transform = '';
            tiltAnim = null;
          }
        }
        requestAnimationFrame(returnToZero);
      });
    });

    // BENTO CARD 3D TILT (smooth lerp)
    document.querySelectorAll('.bento-card').forEach(card => {
      let tiltX = 0, tiltY = 0, targetTiltX = 0, targetTiltY = 0;
      let tiltAnim = null;
      
      function animateTilt() {
        tiltX = lerp(tiltX, targetTiltX, 0.08);
        tiltY = lerp(tiltY, targetTiltY, 0.08);
        card.style.transform = `perspective(600px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) translateY(-4px)`;
        if (Math.abs(tiltX - targetTiltX) > 0.05 || Math.abs(tiltY - targetTiltY) > 0.05) {
          tiltAnim = requestAnimationFrame(animateTilt);
        } else { tiltAnim = null; }
      }
      
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        targetTiltX = ((e.clientX - r.left) / r.width - .5) * 5;
        targetTiltY = -((e.clientY - r.top) / r.height - .5) * 5;
        if (!tiltAnim) tiltAnim = requestAnimationFrame(animateTilt);
      });
      card.addEventListener('mouseleave', () => { 
        targetTiltX = 0; targetTiltY = 0;
        function returnToZero() {
          tiltX = lerp(tiltX, 0, 0.06);
          tiltY = lerp(tiltY, 0, 0.06);
          if (Math.abs(tiltX) > 0.05 || Math.abs(tiltY) > 0.05) {
            card.style.transform = `perspective(600px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
            requestAnimationFrame(returnToZero);
          } else {
            card.style.transform = '';
            tiltAnim = null;
          }
        }
        requestAnimationFrame(returnToZero);
      });
    });

    // PARALLAX ON SCROLL (rAF-smoothed)
    const parallaxSections = document.querySelectorAll('.floating-shapes');
    let parallaxTicking = false;
    let parallaxTargets = new Map();
    let parallaxCurrent = new Map();
    
    function updateParallax() {
      parallaxSections.forEach(el => {
        const parent = el.closest('section');
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const target = (rect.top / window.innerHeight) * 30;
          const key = el;
          const current = parallaxCurrent.get(key) || 0;
          const smoothed = lerp(current, target, 0.08);
          parallaxCurrent.set(key, smoothed);
          el.style.transform = `translateY(${smoothed}px)`;
        }
      });
      requestAnimationFrame(updateParallax);
    }
    requestAnimationFrame(updateParallax);

    // SMOOTH REVEAL for left/right animations
    const revealLR = document.querySelectorAll('.reveal-left, .reveal-right');
    const lrObs = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) { 
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              e.target.classList.add('visible'); 
            });
          });
        } 
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealLR.forEach(r => lrObs.observe(r));

    // KONAMI CODE EASTER EGG
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIdx = 0;
    document.addEventListener('keydown', e => {
      if (e.keyCode === konamiCode[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konamiCode.length) {
          konamiIdx = 0;
          document.body.style.transition = 'filter 1s';
          document.body.style.filter = 'hue-rotate(180deg)';
          setTimeout(() => { document.body.style.filter = ''; }, 3000);
        }
      } else konamiIdx = 0;
    });
