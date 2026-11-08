// AMON: animaciones de entrada y botón de descarga inteligente.
(function () {
  // Cuando AMON esté publicada en App Store, cambiar IOS_LIVE a true (y quitar las insignias "Próximamente").
  var IOS_LIVE = false;
  var IOS_URL = 'https://apps.apple.com/app/id6832035933';
  var ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.luiscaballero.amonoracle';

  var ua = navigator.userAgent || '';
  var isAndroid = /android/i.test(ua);
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // "Descargar" lleva directo a la tienda del teléfono; en computadora (o iPhone sin app aún) baja a los botones.
  document.querySelectorAll('[data-smart-download]').forEach(function (btn) {
    var url = isAndroid ? ANDROID_URL : (isIOS && IOS_LIVE ? IOS_URL : null);
    if (url) { btn.href = url; btn.target = '_blank'; btn.rel = 'noopener'; }
  });

  // En Android, Google Play va primero (ya lo está); en iPhone, App Store primero cuando ya esté publicada.
  if (isIOS && IOS_LIVE) {
    document.querySelectorAll('.store-row').forEach(function (row) {
      var a = row.querySelector('[data-store="ios"]');
      if (a) row.insertBefore(a, row.firstChild);
    });
  }

  // Animación al aparecer en pantalla.
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
