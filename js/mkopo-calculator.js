(function () {
  const btn = document.getElementById('loanBtn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    const out = document.getElementById('loanOut');
    const P = HC.num(document.getElementById('loanAmount').value);
    const annual = HC.num(document.getElementById('loanRate').value);
    const n = Math.round(HC.num(document.getElementById('loanMonths').value));
    if (P <= 0 || n <= 0 || annual < 0) { out.innerHTML = '<p class="err">Jaza kiasi, riba na muda kwa usahihi.</p>'; return; }
    const r = annual / 12 / 100;
    const M = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const total = M * n;
    const interest = total - P;
    const pp = (P / total * 100).toFixed(1);
    const ip = (100 - pp).toFixed(1);
    out.innerHTML = HC.rows([
      ['Kiasi cha mkopo', HC.fmt(P) + ' TZS'],
      ['Riba yote', HC.fmt(interest) + ' TZS'],
      ['Jumla ya kulipa', HC.fmt(total) + ' TZS'],
      ['Marejesho ya kila mwezi', HC.fmt(M) + ' TZS', 'big']
    ]) +
      '<div class="bar" role="img" aria-label="Mtaji ' + pp + '% na riba ' + ip + '%"><i class="p" style="width:' + pp + '%"></i><i class="i" style="width:' + ip + '%"></i></div>' +
      '<div class="legend"><span><b style="background:#12a150"></b>Mtaji ' + pp + '%</span><span><b style="background:#f9a602"></b>Riba ' + ip + '%</span></div>' +
      '<p class="note">Reducing balance: M = P x r x (1+r)^n / ((1+r)^n - 1), r = riba ya mwaka / 12 / 100. Makadirio; ada nyingine za benki hazijajumuishwa.</p>';
  });
})();