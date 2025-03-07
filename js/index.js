window.addEventListener("load", function () {
  const spinnerText = document.getElementById("spinner-text");

  if (!spinnerText) {
    console.error("Elemen #spinner-text tidak ditemukan! Pastikan ada di HTML.");
    return;
  }

  let progress = 0;

  const interval = setInterval(() => {
    progress++;
    spinnerText.textContent = progress + "%";

    if (progress >= 100) { 
      clearInterval(interval);
      setTimeout(() => {
        // Ambil query parameter 'target'
        const urlParams = new URLSearchParams(window.location.search);
        const target = urlParams.get('target');
        
        // Mapping nilai parameter ke halaman target
        const pageMapping = {
          tema1: "direct/tema1.html",
          tema2: "direct/tema2.html",
          tema3: "direct/tema3.html",
          porto1: "direct/porto1.html",
          porto2: "direct/porto2.html",
          porto3: "direct/porto3.html",
          kalkulator1: "direct/kalkulator1.html",
          kalkulator2: "direct/kalkulator2.html",
          kalkulator3: "direct/kalkulator3.html",
          webpdf1: "direct/webpdf1.html",
          webpdf2: "direct/webpdf2.html",
          webpdf3: "direct/webpdf3.html",
        };

        // Jika parameter target tidak ditemukan, fallback ke index.html
        const targetPage = pageMapping[target] || "direct/tema1.html";

        console.log(`Redirecting ke: ${targetPage}`);
        window.location.href = targetPage;
      }, 500); // Sedikit delay sebelum redirect agar lebih smooth
    }
  }, 15); // Naikkan durasi agar tidak terlalu cepat
});
