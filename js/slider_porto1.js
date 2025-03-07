// ===== MODIF 4: SLIDER SCRIPT DENGAN DRAG/SWIPE (untuk modal "Pengalaman Kerja") =====
document.addEventListener('DOMContentLoaded', function() {
  const slidesContainer = document.querySelector('#pengalaman-modal .slides');
  const slides = document.querySelectorAll('#pengalaman-modal .slide');
  const dots = document.querySelectorAll('#pengalaman-modal .slider-indicators .dot');
  let index = 0;
  let autoSlideInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
  }, 3000);

  function updateSlider() {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => { 
      dot.classList.toggle('active', i === index); 
    });
  }
  updateSlider();

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      updateSlider();
    });
  });

  // ===== DRAG/SWIPE =====
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  slidesContainer.addEventListener('mousedown', dragStart);
  slidesContainer.addEventListener('mousemove', dragMove);
  slidesContainer.addEventListener('mouseup', dragEnd);
  slidesContainer.addEventListener('mouseleave', dragEnd);
  slidesContainer.addEventListener('touchstart', dragStart);
  slidesContainer.addEventListener('touchmove', dragMove);
  slidesContainer.addEventListener('touchend', dragEnd);

  function dragStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    clearInterval(autoSlideInterval);
  }
  function dragMove(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
  }
  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50 && index < slides.length - 1) index++;
    if (movedBy > 50 && index > 0) index--;
    updateSlider();
    prevTranslate = -index * slidesContainer.clientWidth;
    autoSlideInterval = setInterval(() => {
      index = (index + 1) % slides.length;
      updateSlider();
    }, 3000);
  }
  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }
});
