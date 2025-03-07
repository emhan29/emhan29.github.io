  document.addEventListener("DOMContentLoaded", function () {
  // ===== MODIF 2: Progress Bar di Bagian Keahlian =====
  const circles = document.querySelectorAll('.circle');

  circles.forEach(circle => {
    const span = circle.querySelector('span');
    const targetPercent = parseInt(circle.getAttribute('data-targetpercent'));
    const targetDegree = (targetPercent / 100) * 360;
    circle.style.background = `conic-gradient(#00aaff 0deg ${targetDegree}deg, #333 ${targetDegree}deg 360deg)`;
    span.textContent = `${targetPercent}%`;
  });

  circles.forEach(circle => {
    circle.addEventListener('mouseenter', function () {
      const span = this.querySelector('span');
      const targetPercent = parseInt(this.getAttribute('data-targetpercent'));
      const targetDegree = (targetPercent / 100) * 360;
      let currentDegree = 0;
      this.style.background = `conic-gradient(#00aaff 0deg 0deg, #333 0deg 360deg)`;
      span.textContent = '0%';

      if (this.animationInterval) clearInterval(this.animationInterval);
      this.animationInterval = setInterval(() => {
        currentDegree += 5;
        if (currentDegree >= targetDegree) {
          currentDegree = targetDegree;
          clearInterval(this.animationInterval);
        }
        this.style.background = `conic-gradient(#FF0000 0deg ${currentDegree}deg, #333 ${currentDegree}deg 360deg)`;
        span.textContent = `${Math.round((currentDegree / 360) * 100)}%`;
      }, 20);
    });

    circle.addEventListener('mouseleave', function () {
      clearInterval(this.animationInterval);
      const span = this.querySelector('span');
      const targetPercent = parseInt(this.getAttribute('data-targetpercent'));
      const targetDegree = (targetPercent / 100) * 360;
      this.style.background = `conic-gradient(#00aaff 0deg ${targetDegree}deg, #333 ${targetDegree}deg 360deg)`;
      span.textContent = `${targetPercent}%`;
    });
  });
});
