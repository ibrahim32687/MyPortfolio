// Shared JS for all pages: preloader, reveal-on-scroll, contact form and particles

// PRELOADER
window.addEventListener("load", function(){
    // Wait a bit for smoothness
    setTimeout(() => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 1500); // 1.5s delay
  });
  
  // REVEAL ON SCROLL
  function revealOnScroll(){
    const items = document.querySelectorAll('.reveal');
    const offset = 100;
    items.forEach(item => {
      const top = item.getBoundingClientRect().top;
      if (top < window.innerHeight - offset) item.classList.add('active');
      else item.classList.remove('active');
    })
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('resize', revealOnScroll);
  revealOnScroll();
  
  // CONTACT FORM (simple local validation + UX message)
  const contactForm = document.getElementById('contactForm');
  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
      const msgEl = document.getElementById('formMessage');
  
      if (!name || !email || !message){
        msgEl.textContent = 'Please fill in all fields.';
        msgEl.style.color = '#ffb3b3';
        return;
      }
  
      // Mock success (replace with real endpoint/email service)
      msgEl.textContent = '✅ Thank you! Your message has been sent.';
      msgEl.style.color = '#cdeac0';
      contactForm.reset();
    });
  }
  
  // PARTICLES BACKGROUND (lightweight)
  (function initParticles(){
    const canvas = document.getElementById('bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = innerWidth;
    let h = canvas.height = innerHeight;
  
    const particles = [];
    const NUM = Math.floor((w*h)/60000 * 80) || 50; // responsive particle count
  
    function rand(min,max){ return Math.random()*(max-min)+min }
  
    for (let i=0;i<NUM;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: rand(0.6,2.2),
        dx: rand(-0.4,0.4),
        dy: rand(-0.4,0.4),
        a: rand(0.05,0.25)
      });
    }
  
    function draw(){
      ctx.clearRect(0,0,w,h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,'+p.a+')';
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < -10) p.x = w+10; if (p.x > w+10) p.x = -10;
        if (p.y < -10) p.y = h+10; if (p.y > h+10) p.y = -10;
      });
      requestAnimationFrame(draw);
    }
    draw();
  
    window.addEventListener('resize', ()=>{
      w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    });
  })();