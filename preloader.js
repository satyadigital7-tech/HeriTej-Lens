/* ==========================================================================
   HERITEJ PULSE — PRELOADER WIDGET
   ========================================================================== */

(function() {
  // Create preloader element
  const preloader = document.createElement('div');
  preloader.id = 'preloader';
  preloader.style.cssText = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: #1a1715;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.4s ease, visibility 0.4s ease;
  `;
  
  preloader.innerHTML = `
    <div style="text-align: center; font-family: 'Playfair Display', serif;">
      <div style="font-size: 2.25rem; font-weight: 700; color: #fff; margin-bottom: 20px; letter-spacing: 1px;">
        HeriTej<span style="color: #b5451b;">Pulse</span>
      </div>
      <div style="width: 42px; height: 42px; border: 3px solid rgba(255, 255, 255, 0.1); border-radius: 50%; border-top-color: #b5451b; margin: 0 auto; animation: preloader-spin 1s linear infinite;"></div>
    </div>
  `;
  
  // Inject keyframes animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes preloader-spin {
      to { transform: rotate(360deg); }
    }
  `;
  
  document.head ? document.head.appendChild(style) : document.documentElement.appendChild(style);
  document.documentElement.appendChild(preloader);
  
  // Fade out preloader when full page resources are loaded
  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    setTimeout(() => {
      preloader.remove();
    }, 400);
  });
})();
