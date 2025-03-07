// Pastikan seluruh kode JS berjalan setelah DOM selesai diparsing
document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById('display');
  const nominalResult = document.getElementById('nominalResult');
  const nominalText = document.getElementById('nominalText');

  // Fungsi untuk menambahkan karakter ke display
  function appendToDisplay(value) {
    // Untuk fungsi matematika, tambahkan awalan "Math." agar dikenali oleh eval()
    if (value === 'sin(') {
      display.value += 'Math.sin(';
    } else if (value === 'cos(') {
      display.value += 'Math.cos(';
    } else if (value === 'tan(') {
      display.value += 'Math.tan(';
    } else if (value === 'log(') {
      display.value += 'Math.log(';
    } else {
      display.value += value;
    }
  }
  window.appendToDisplay = appendToDisplay;

  // Fungsi untuk menghapus seluruh isi display
  function clearDisplay() {
    display.value = '';
    nominalResult.textContent = '0';
    nominalText.textContent = 'nol';
  }
  window.clearDisplay = clearDisplay;

  // Fungsi untuk menghapus karakter terakhir
  function deleteLast() {
    display.value = display.value.slice(0, -1);
  }
  window.deleteLast = deleteLast;

  // Fungsi untuk menghitung ekspresi matematika dengan penanganan persen
  function calculateResult() {
    try {
      let expr = display.value;
      // Ubah setiap angka yang diikuti oleh '%' menjadi (angka/100)
      expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
      let result = eval(expr);
      nominalResult.textContent = result;
      nominalText.textContent = numberToWords(result);
    } catch (error) {
      display.value = 'Error';
      nominalResult.textContent = 'Error';
      nominalText.textContent = 'Error';
    }
  }
  window.calculateResult = calculateResult;

  // Fungsi untuk mengonversi angka ke dalam kata-kata (hingga kuadriliun)
  function numberToWords(num) {
    const angka = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas"];
    const puluhan = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"];
    const ribuan = ["", "ribu", "juta", "miliar", "triliun", "kuadriliun"];

    if (num === 0) return "nol";
    if (num < 20) return angka[num];
    if (num < 100) return puluhan[Math.floor(num / 10)] + (num % 10 === 0 ? "" : " " + angka[num % 10]);
    if (num < 1000) return angka[Math.floor(num / 100)] + " ratus " + (num % 100 === 0 ? "" : numberToWords(num % 100));

    let result = "";
    let i = 0;
    while (num > 0) {
      if (num % 1000 !== 0) {
        result = numberToWords(num % 1000) + " " + ribuan[i] + " " + result;
      }
      num = Math.floor(num / 1000);
      i++;
    }
    return result.trim();
  }
  window.numberToWords = numberToWords;

  // Fungsi drag untuk gambar
  const image = document.getElementById('draggableImage');
  let offsetX = 0, offsetY = 0;
  image.onmousedown = function(event) {
    offsetX = event.clientX - image.getBoundingClientRect().left;
    offsetY = event.clientY - image.getBoundingClientRect().top;
    document.onmousemove = function(event) {
      image.style.left = (event.clientX - offsetX) + 'px';
      image.style.top = (event.clientY - offsetY) + 'px';
    };
    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
});
