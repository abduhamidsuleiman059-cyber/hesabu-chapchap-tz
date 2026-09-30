document.getElementById('traBtn').addEventListener('click', function () {
  const rawSalary = document.getElementById('traSalary').value.replace(/[^0-9.]/g, '');
  const rawOther = document.getElementById('traOther').value.replace(/[^0-9.]/g, '');

  const salaryInput = Number(rawSalary);
  const otherDeduction = Number(rawOther) || 0;

  if (!salaryInput) {
    document.getElementById('traOut').innerHTML = '<p style="color:red">Weka mshahara kwanza.</p>';
    return;
  }

  const taxable = Math.max(salaryInput - otherDeduction, 0);

  let paye = 0;
  if (taxable <= 270000) {
    paye = 0;
  } else if (taxable <= 520000) {
    paye = (taxable - 270000) * 0.09;
  } else if (taxable <= 760000) {
    paye = 22500 + (taxable - 520000) * 0.20;
  } else if (taxable <= 1000000) {
    paye = 70500 + (taxable - 760000) * 0.25;
  } else {
    paye = 130500 + (taxable - 1000000) * 0.30;
  }

  const nssf = salaryInput * 0.10;
  const takeHome = salaryInput - paye - nssf;
  const beforeNssf = salaryInput - paye;

  document.getElementById('traOut').innerHTML = `
    <p><b>Mshahara:</b> ${salaryInput.toLocaleString()} TZS</p>
    ${otherDeduction > 0 ? `<p><b>Punguzo lingine:</b> ${otherDeduction.toLocaleString()} TZS</p>` : ''}
    <p><b>PAYE (TRA):</b> <span style="color:#e63946">${paye.toLocaleString(undefined,{maximumFractionDigits:0})} TZS</span></p>
    <p><b>NSSF 10%:</b> ${nssf.toLocaleString(undefined,{maximumFractionDigits:0})} TZS</p>
    <hr>
    <p><b>Utabaki nayo (baada ya PAYE + NSSF):</b><br>
      <span style="color:#2a9d8f;font-size:20px;font-weight:bold">${takeHome.toLocaleString(undefined,{maximumFractionDigits:0})} TZS</span>
    </p>
    <p style="font-size:12px;color:gray">Kabla ya NSSF: ${beforeNssf.toLocaleString(undefined,{maximumFractionDigits:0})} TZS</p>
  `;
});