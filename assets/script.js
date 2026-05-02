  // Custom cursor
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('trail');
  if(cursor && trail) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
      }, 80);
    });
  }

  // Particles
  const particlesEl = document.getElementById('particles');
  if(particlesEl) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random()*100}%;
        width: ${Math.random()*3+1}px;
        height: ${Math.random()*3+1}px;
        animation-duration: ${Math.random()*10+8}s;
        animation-delay: ${Math.random()*10}s;
        opacity: ${Math.random()*0.4+0.1};
      `;
      particlesEl.appendChild(p);
    }
  }

  // Slideshow
  const slides = document.querySelectorAll('.slide');
  const dotsEl = document.getElementById('dots');
  if(slides.length && dotsEl) {
    let current = 0;

    slides.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.onclick = () => goTo(i);
      dotsEl.appendChild(d);
    });

    function goTo(n) {
      slides[current].classList.remove('active');
      dotsEl.children[current].classList.remove('active');
      current = n;
      slides[current].classList.add('active');
      dotsEl.children[current].classList.add('active');
    }

    setInterval(() => goTo((current + 1) % slides.length), 3500);
  }

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  if(tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panelEl = document.getElementById(btn.dataset.tab);
        if(panelEl) panelEl.classList.add('active');
      });
    });
  }

  // Animate score bars on archive tab
  const archiveTab = document.querySelector('[data-tab="archive"]');
  if(archiveTab) {
    archiveTab.addEventListener('click', () => {
      setTimeout(() => {
        document.querySelectorAll('.score-bar-fill').forEach(bar => {
          const w = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => { bar.style.width = w; }, 100);
        });
      }, 100);
    });
  }

/* ── MATRIX RAIN ── */
(function(){
  const canvas = document.getElementById('rain-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let cols, drops;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\`~';
  function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }
  function draw(){
    ctx.fillStyle = 'rgba(2,4,8,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = '13px Share Tech Mono';
    for(let i=0;i<drops.length;i++){
      const ch = chars[Math.floor(Math.random()*chars.length)];
      const x = i * 18;
      const y = drops[i] * 18;
      const r = Math.random();
      if(r < 0.03) ctx.fillStyle = '#fff';
      else if(r < 0.15) ctx.fillStyle = '#00ffe7';
      else ctx.fillStyle = 'rgba(0,255,231,0.4)';
      ctx.fillText(ch, x, y);
      if(y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  init();
  setInterval(draw, 50);
  window.addEventListener('resize', init);
})();

/* ── AVATAR GENERATOR ── */
function generateAvatar(seed, size=240){
  const rng = (s) => { let x = Math.sin(s)*10000; return x - Math.floor(x); };
  const palettes = [ ['#00ffe7','#ff2d55','#a8ff3e'], ['#ff2d55','#ffd700','#00ffe7'], ['#a8ff3e','#00ffe7','#ff2d55'], ['#ffd700','#ff2d55','#a8ff3e'], ['#00d4ff','#a8ff3e','#ffd700'], ['#ff6b6b','#00ffe7','#a8ff3e'] ];
  const palette = palettes[Math.floor(rng(seed)*palettes.length)];
  const [c1, c2, c3] = palette;
  const bg = '#0a1520'; const s = size; const h = s/2;
  const shape = Math.floor(rng(seed+1)*5);
  let svg = `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${s}" height="${s}" fill="${bg}"/>`;
  for(let i=1;i<6;i++){
    svg += `<line x1="${i*s/6}" y1="0" x2="${i*s/6}" y2="${s}" stroke="${c1}" stroke-width="0.4" opacity="0.15"/>`;
    svg += `<line x1="0" y1="${i*s/6}" x2="${s}" y2="${i*s/6}" stroke="${c1}" stroke-width="0.4" opacity="0.15"/>`;
  }
  const shapes = [ () => `<circle cx="${h}" cy="${h}" r="${h*0.72}" fill="none" stroke="${c1}" stroke-width="1.5" opacity="0.7"/>`, () => `<polygon points="${h},${h*0.2} ${h*1.7},${h*0.6} ${h*1.7},${h*1.4} ${h},${h*1.8} ${h*0.3},${h*1.4} ${h*0.3},${h*0.6}" fill="none" stroke="${c1}" stroke-width="1.5" opacity="0.7"/>`, () => `<rect x="${h*0.28}" y="${h*0.28}" width="${h*1.44}" height="${h*1.44}" fill="none" stroke="${c1}" stroke-width="1.5" opacity="0.7" transform="rotate(45,${h},${h})"/>`, () => `<polygon points="${h},${h*0.15} ${h*1.85},${h} ${h},${h*1.85} ${h*0.15},${h}" fill="none" stroke="${c1}" stroke-width="1.5" opacity="0.7"/>`, () => `<circle cx="${h}" cy="${h}" r="${h*0.72}" fill="none" stroke="${c1}" stroke-width="1.5" opacity="0.7" stroke-dasharray="8 4"/>` ];
  svg += shapes[shape]();
  svg += `<circle cx="${h}" cy="${h}" r="${h*0.5}" fill="none" stroke="${c2}" stroke-width="1" opacity="0.4" stroke-dasharray="3 7"/>`;
  const fs = h * 0.52; const mask = `avatar-${seed}`;
  svg += `<clipPath id="${mask}"><circle cx="${h}" cy="${h}" r="${fs}"/></clipPath>`;
  svg += `<g clip-path="url(#${mask})">`;
  svg += `<circle cx="${h}" cy="${h}" r="${fs}" fill="${c1}" opacity="0.07"/>`;
  const eyeY = h - fs*0.15; const eyeX = h - fs*0.3; const eyeR = fs * 0.14;
  svg += `<circle cx="${eyeX}" cy="${eyeY}" r="${eyeR}" fill="${c2}" opacity="0.9"/>`;
  svg += `<circle cx="${h+fs*0.3}" cy="${eyeY}" r="${eyeR}" fill="${c2}" opacity="0.9"/>`;
  svg += `<circle cx="${eyeX}" cy="${eyeY}" r="${eyeR*0.45}" fill="${bg}"/>`;
  svg += `<circle cx="${h+fs*0.3}" cy="${eyeY}" r="${eyeR*0.45}" fill="${bg}"/>`;
  const gl = Math.floor(rng(seed+3)*3)+2;
  for(let i=0;i<gl;i++){ const gy = eyeY - eyeR + (i/(gl-1))*eyeR*2; svg += `<rect x="${h-fs}" y="${gy-0.5}" width="${fs*2}" height="1" fill="${c1}" opacity="${0.4+rng(seed+i)*0.4}"/>`; }
  const mouthW = fs * (0.4 + rng(seed+4)*0.3); const mouthY = h + fs * 0.3;
  svg += `<rect x="${h-mouthW/2}" y="${mouthY-1}" width="${mouthW}" height="2.5" rx="1" fill="${c3}" opacity="0.85"/>`;
  svg += `<rect x="${h-mouthW/2}" y="${mouthY+5}" width="${mouthW*0.5+rng(seed+5)*mouthW*0.3}" height="1.5" rx="0.5" fill="${c3}" opacity="0.4"/>`;
  const numLines = Math.floor(rng(seed+6)*3)+2; for(let i=0;i<numLines;i++){ const lx = h + (rng(seed+i+10)-0.5)*fs*1.2; const ly = h + (rng(seed+i+20)-0.5)*fs*1.2; const lw = fs*(0.1+rng(seed+i+30)*0.2); svg += `<rect x="${lx}" y="${ly}" width="${lw}" height="1" fill="${c1}" opacity="0.3"/>`; svg += `<rect x="${lx+lw}" y="${ly-lw*0.5}" width="1" height="${lw*0.5}" fill="${c1}" opacity="0.3"/>`; svg += `<circle cx="${lx+lw}" cy="${ly-lw*0.5}" r="2.5" fill="${c1}" opacity="0.5"/>`; }
  svg += `</g>`;
  svg += `<rect x="0" y="0" width="${s}" height="${s}" fill="url(#scan${seed})"/>`;
  svg += `<defs><linearGradient id="scan${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="transparent"/><stop offset="50%" stop-color="${c1}" stop-opacity="0.04"/><stop offset="100%" stop-color="transparent"/></linearGradient></defs>`;
  const bs = s*0.08; const bw = 1.5; svg += `<polyline points="${bs},0 0,0 0,${bs}" fill="none" stroke="${c3}" stroke-width="${bw}" opacity="0.8"/>`; svg += `<polyline points="${s-bs},0 ${s},0 ${s},${bs}" fill="none" stroke="${c3}" stroke-width="${bw}" opacity="0.8"/>`; svg += `<polyline points="${s-bs},${s} ${s},${s} ${s},${s-bs}" fill="none" stroke="${c3}" stroke-width="${bw}" opacity="0.8"/>`; svg += `<polyline points="${bs},${s} 0,${s} 0,${s-bs}" fill="none" stroke="${c3}" stroke-width="${bw}" opacity="0.8"/>`;
  svg += `<text x="${h}" y="${s-6}" text-anchor="middle" fill="${c1}" opacity="0.3" font-family="Share Tech Mono" font-size="7" letter-spacing="2">ID::${seed.toString(36).toUpperCase().padStart(6,'0')}</text>`;
  svg += `</svg>`;
  return svg;
}

/* ── TEAM DATA & RENDER ── */
const team = [
  { handle:'pran0x', role:'Team Lead', bio:'XSS, SQLi, SSRF — a full stack of destruction.', tags:['web','xss','sqli'], seed:9024, img:'/assets/img/crews/pran0x.png', active:true },
  { handle:'S4M', role:'Admin', bio:'Disassembles firmware for fun. Malware analyst by night.', tags:['Reverse Engineering','malware','ida'], seed:3847, img:'/assets/img/crews/nahid.png', active:true },
  { handle:'x!ku7inG', role:'Member', bio:'Breaks RSA before breakfast. Lattice sorcerer.', tags:['PWN','OSINT'], seed:6193, img:'/assets/img/crews/ziku.png', active:true },
  { handle:'websh3ll', role:'Member', bio:'Disassembles firmware for fun. Malware analyst by night.', tags:['Reverse Engineering','PWN','OSINT'], seed:9025, img:'/assets/img/crews/websh3ll.png', active:true },
  { handle:'khaled0x0', role:'Formal Captain', bio:'Android & reverse engineering specialist.', tags:['Android','Reverse Engineering'], seed:8816, img:'/assets/img/formal-crews/khaled.png', active:false },
  { handle:'id3ologica1_smuggl3r', role:'Admin',bio:'Analyzes digital evidence to solve cases.', tags:['Forensics','Crypto'], seed:1459, img:'/assets/img/formal-crews/sani.png', active:false }
];

const grid = document.getElementById('team-grid');
if(grid){
  team.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.style.animation = 'fadeIn 0.5s ease-out forwards';
    card.style.animationDelay = `${i*0.1}s`;
    const avatarMarkup = m.img
      ? `<img src="${m.img}" alt="${m.handle} avatar" loading="lazy" />`
      : generateAvatar(m.seed);
    const statusClass = m.active ? 'online' : 'offline';
    const statusLabel = m.active ? 'Active' : 'Inactive';
    card.innerHTML = `
      <div class="member-avatar">${avatarMarkup}<div class="member-status ${statusClass}"><span class="dot"></span>${statusLabel}</div></div>
      <div class="member-info">
        <div class="member-handle">${m.handle}</div>
        <div class="member-role">${m.role}</div>
        <div class="member-bio">${m.bio}</div>
        <div class="member-tags">${m.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ── COUNTER ANIMATION ── */
const counters = document.querySelectorAll('[data-target]');
if(counters.length){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = +el.dataset.target;
        let current = 0;
        const step = target / 60;
        const timer = setInterval(()=>{
          current += step;
          if(current >= target){ current = target; clearInterval(timer); }
          el.textContent = Math.floor(current);
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}