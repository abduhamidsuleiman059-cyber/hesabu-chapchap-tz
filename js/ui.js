document.addEventListener('DOMContentLoaded', function () {
  // 1. Koma zinaingia zenyewe unapoandika
  ['traSalary', 'traOther', 'lukuAmount', 'loanAmount'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      var p = el.value.replace(/[^\d.]/g, '').split('.');
      p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      el.value = p.length > 1 ? p[0] + '.' + p.slice(1).join('') : p[0];
    });
  });

  // 2. Vitufe vya chaguo la haraka
  function chips(id, vals) {
    var el = document.getElementById(id);
    if (!el) return;
    var d = document.createElement('div');
    d.className = 'chips';
    vals.forEach(function (v) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = v.toLocaleString('en-US');
      b.addEventListener('click', function () {
        el.value = v.toLocaleString('en-US');
        el.dispatchEvent(new Event('input'));
      });
      d.appendChild(b);
    });
    el.insertAdjacentElement('afterend', d);
  }
  chips('lukuAmount', [2000, 5000, 10000, 20000]);
  chips('loanMonths', [6, 12, 24, 36]);

  // 3. Enter inabonyeza kitufe cha kadi
  document.querySelectorAll('.card input').forEach(function (i) {
    i.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); i.closest('.card').querySelector('.btn').click(); }
    });
  });

  // 4. Matokeo yanajionyesha kwenye skrini
  document.querySelectorAll('.out').forEach(function (o) {
    new MutationObserver(function () {
      o.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }).observe(o, { childList: true });
  });

  // 5. Tab ya chini inaonyesha kadi uliyopo
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        document.querySelectorAll('.tabbar a, .menu a[href^="#"]').forEach(function (a) {
          a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    ['tra', 'luku', 'mikopo'].forEach(function (id) {
      var c = document.getElementById(id);
      if (c) io.observe(c);
    });
  }
});