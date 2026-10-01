(function () {
  const btn = document.getElementById('shareFloat');
  const overlay = document.getElementById('shareOverlay');
  const sheet = document.getElementById('shareSheet');
  const cancelBtn = document.getElementById('shareCancel');
  const copyBtn = document.getElementById('shareCopy');

  if (!btn) return;

  const pageUrl = window.location.href;
  const pageTitle = document.title;
  const text = `${pageTitle} - Kikokotoo cha TRA, LUKU na Mikopo Tanzania`;

  document.getElementById('shareWhatsapp').href =
    `https://wa.me/?text=${encodeURIComponent(text + ' ' + pageUrl)}`;
  document.getElementById('shareTelegram').href =
    `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`;
  document.getElementById('shareFacebook').href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  document.getElementById('shareTwitter').href =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`;
  document.getElementById('shareTiktok').href =
    `https://www.tiktok.com/`; // TikTok haina share-by-url rasmi; inafungua app/tovuti yao

  function openSheet() {
    overlay.classList.add('active');
    sheet.classList.add('active');
  }
  function closeSheet() {
    overlay.classList.remove('active');
    sheet.classList.remove('active');
  }

  btn.addEventListener('click', async () => {
    // Kama kifaa kina native share (simu nyingi), tumia hiyo kwanza - uzoefu bora zaidi
    if (navigator.share) {
      try {
        await navigator.share({ title: pageTitle, text, url: pageUrl });
        return;
      } catch (e) {
        // mtumiaji ame-cancel au haikufanikiwa - fungua sheet yetu kama fallback
      }
    }
    openSheet();
  });

  overlay.addEventListener('click', closeSheet);
  cancelBtn.addEventListener('click', closeSheet);

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      copyBtn.querySelector('span:last-child').textContent = 'Imenakiliwa! ✓';
      setTimeout(() => {
        copyBtn.querySelector('span:last-child').textContent = 'Nakili Link';
      }, 1800);
    });
  });
})();