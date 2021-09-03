function initCarousel() {
  let btnRight = document.querySelector('.carousel__arrow_right');
  let btnLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let slides = document.querySelectorAll('.carousel__slide');
  let width = 0;
  let currentIndex = 0;

  btnLeft.style.display = 'none';

  let carouselRight = function() {
    currentIndex++;
    if(currentIndex == (slides.length - 1)) {
      btnRight.style.display = 'none';
    } 
    if(currentIndex > 0) {
      btnLeft.style.display = '';
    }
    width += slides[currentIndex].offsetWidth;
    carouselInner.style.transform = 'translateX(-' + width + 'px)';
  }

  let carouselLeft = function() {
    currentIndex--;
    if(currentIndex < (slides.length - 1)) {
      btnRight.style.display = '';
    }
    if(currentIndex == 0) {
      btnLeft.style.display = 'none';
    }
    width -= slides[currentIndex].offsetWidth;
    carouselInner.style.transform = 'translateX(-' + width + 'px)';
  }

  btnRight.addEventListener('click', carouselRight);  
  btnLeft.addEventListener('click', carouselLeft); 
}
