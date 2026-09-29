(function () {
  const DEF = {
    nssfRate: 0.10,
    bands: [
      { from: 0, base: 0, rate: 0 },
      { from: 270000, base: 0, rate: 0.08 },
      { from: 520000, base: 20000, rate: 0.20 },
      { from: 760000, base: 68000, rate: 0.25 },
      { from: 1000000, base: 128000, rate: 0.30 }
    ]
  };
  const btn = document.getElementById('traBtn');
  if (!btn) return;
  btn.addEventListener('click', async function () {
    const out = document.getElementById('traOut');
    const gross = HC.num(document.getElementById('traSalary').value);
    const other = HC.num(document.getElementById('traOther').value);
    if (gross <= 0) { out.innerHTML = '<p class="err">Weka mshahara sahihi wa mwezi.</p>'; return; }
    const R = await HC.load('data/tra-rates.json', DEF);
    const nssf = gross * R.nssfRate;
    const taxable = Math.max(0, gross - nssf - other);
    let band = R.bands[0];
    R.bands.forEach(function (b) { if (taxable > b.from) band = b; });
    const paye = band.base + (taxable - band.from) * band.rate;
    const net = gross - paye - nssf;
    const list = [
      ['Mshahara (Gross)', HC.fmt(gross) + ' TZS'],
      ['NSSF (' + (R.nssfRate * 100) + '%)', '- ' + HC.fmt(nssf) + ' TZS']
    ];
    if (other > 0) list.push(['Punguzo lingine', '- ' + HC.fmt(other) + ' TZS']);
    list.push(
      ['Mshahara unaotozwa kodi', HC.fmt(taxable) + ' TZS'],
      ['Kiwango cha kodi (kipande chako)', (band.rate * 100) + '%'],
      ['PAYE', '- ' + HC.fmt(paye) + ' TZS'],
      ['Wastani wa kodi kwa gross', HC.fmt2(paye / gross * 100) + '%'],
      ['Take Home (Mkononi)', HC.fmt(net) + ' TZS', 'big']
    );
    out.innerHTML = HC.rows(list) +
      '<p class="note">Take home = Gross - PAYE - NSSF. PAYE hukokotolewa baada ya kutoa NSSF. Makadirio kwa wakazi wa Tanzania Bara; thibitisha na <a href="https://www.tra.go.tz" target="_blank" rel="noopener"><u>tra.go.tz</u></a>.</p>';
  });
})();