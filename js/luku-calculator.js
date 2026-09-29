(function () {
  const DEF = { tier1Limit: 75, tier1Price: 100, tier2Price: 350, vat: 0.18, ewura: 0.01, rea: 0.03 };
  const btn = document.getElementById('lukuBtn');
  if (!btn) return;
  btn.addEventListener('click', async function () {
    const out = document.getElementById('lukuOut');
    const amount = HC.num(document.getElementById('lukuAmount').value);
    const used = HC.num(document.getElementById('lukuUsed').value);
    if (amount <= 0) { out.innerHTML = '<p class="err">Weka kiasi sahihi cha kununua.</p>'; return; }
    const R = await HC.load('data/tanesco-rates.json', DEF);
    const levy = R.vat + R.ewura + R.rea;
    const energy = amount / (1 + levy);
    const left1 = Math.max(0, R.tier1Limit - used);
    const cost1 = left1 * R.tier1Price;
    const units = energy <= cost1
      ? energy / R.tier1Price
      : left1 + (energy - cost1) / R.tier2Price;
    out.innerHTML = HC.rows([
      ['Kiasi ulicholipa', HC.fmt(amount) + ' TZS'],
      ['VAT (' + (R.vat * 100) + '%)', HC.fmt2(energy * R.vat) + ' TZS'],
      ['EWURA (' + (R.ewura * 100) + '%)', HC.fmt2(energy * R.ewura) + ' TZS'],
      ['REA (' + (R.rea * 100) + '%)', HC.fmt2(energy * R.rea) + ' TZS'],
      ['Pesa ya umeme (bila kodi)', HC.fmt2(energy) + ' TZS'],
      ['Wastani wa bei kwa unit', HC.fmt2(amount / units) + ' TZS'],
      ['Units utakazopata', HC.fmt2(units) + ' kWh', 'big']
    ]) + '<p class="note">Makadirio ya TANESCO D1: unit ' + R.tier1Price + ' TZS kwa units ' + R.tier1Limit + ' za kwanza za mwezi, kisha ' + R.tier2Price + ' TZS. Bei rasmi huwekwa na EWURA - angalia <a href="https://www.tanesco.co.tz" target="_blank" rel="noopener"><u>tanesco.co.tz</u></a>.</p>';
  });
})();