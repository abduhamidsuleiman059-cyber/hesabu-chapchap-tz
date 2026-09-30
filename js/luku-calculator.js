document.getElementById('lukuBtn').addEventListener('click', function () {
  const rawAmount = document.getElementById('lukuAmount').value.replace(/[^0-9.]/g, '');
  const pesa = Number(rawAmount);
  const aina = document.getElementById('aina-mteja').value;

  if (!pesa) {
    document.getElementById('lukuOut').innerHTML = '<p style="color:red">Weka kiasi cha pesa kwanza.</p>';
    return;
  }

  let units = 0;
  let maelezoBei = '';

  if (aina === 'D1') {
    // Bei rasmi ya TANESCO D1: 100 TZS/unit kwa units 75 za kwanza, 350 TZS/unit baada ya hapo
    if (pesa <= 7500) {
      units = pesa / 100;
    } else {
      units = 75 + (pesa - 7500) / 350;
    }
    maelezoBei = '100 TZS/unit (units 75 za kwanza), kisha 350 TZS/unit';
  } else {
    // T1: formula imekokotolewa kutoka takwimu halisi za mtumiaji (10k=19u, 20k=46u, 50k=122u)
    const gharamaZaHuduma = 2366;
    const beiKwaUnit = 390;
    let baadaYaGharama = pesa - gharamaZaHuduma;
    if (baadaYaGharama < 0) baadaYaGharama = 0;
    units = baadaYaGharama / beiKwaUnit;
    maelezoBei = `Wastani ${beiKwaUnit} TZS/unit (inajumuisha gharama za huduma na VAT/EWURA/REA)`;
  }

  document.getElementById('lukuOut').innerHTML = `
    <p>Aina: <b>${aina}</b></p>
    <p>Pesa: ${pesa.toLocaleString()} TZS</p>
    <p style="font-size:12px;color:gray">${maelezoBei}</p>
    <p><b>Units: <span style="color:#2a9d8f;font-size:22px">${units.toFixed(1)} kWh</span></b></p>
  `;
});