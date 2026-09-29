window.HC = (function () {
  const cache = {};
  const fmt = n => Math.round(n).toLocaleString('en-US');
  const fmt2 = n => (Math.round(n * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const num = v => parseFloat(String(v).replace(/,/g, '')) || 0;
  const rows = list => list.map(r => '<div class="row ' + (r[2] || '') + '"><span>' + r[0] + '</span><strong>' + r[1] + '</strong></div>').join('');
  async function load(path, fallback) {
    if (cache[path]) return cache[path];
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error('bad');
      cache[path] = await res.json();
    } catch (e) {
      cache[path] = fallback;
    }
    return cache[path];
  }
  return { fmt, fmt2, num, rows, load };
})();

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
    var here = location.pathname.split('/').pop().replace('.html', '') || 'index';
    menu.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href.indexOf('#') === -1 && href.replace('.html', '') === here) a.classList.add('active');
    });
  }
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});