import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    const carousel = createElement(`
                <div class="carousel">
                  <div class="carousel__arrow carousel__arrow_right">
                    <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
                  </div>
                  <div class="carousel__arrow carousel__arrow_left">
                    <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
                  </div>
                  <div class="carousel__inner"></div>
                </div>
            `);
    this._elem = carousel;
    const carouselInner = carousel.querySelector('.carousel__inner');
    for(let k of this.slides) {
      let slide = createElement(`
                  <div class="carousel__slide" data-id="penang-shrimp">
                    <img src="../../assets/images/carousel/${k.image}" class="carousel__img" alt="slide">
                    <div class="carousel__caption">
                      <span class="carousel__price">€${k.price.toFixed(2)}</span>
                      <div class="carousel__title">${k.name}</div>
                      <button type="button" class="carousel__button" data-id="${k.id}">
                        <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
                      </button>
                    </div>
                  </div>
                `);
      carouselInner.append(slide);
    }
    const btnRight = carousel.querySelector('.carousel__arrow_right');
    const btnLeft = carousel.querySelector('.carousel__arrow_left');
    const carouselItems = carousel.querySelectorAll('.carousel__slide'); 
    
    let width = 0;
    let currentIndex = 0;

    btnLeft.style.display = 'none';

    btnRight.addEventListener('click', () => {
      currentIndex++;
      if(currentIndex == (carouselItems.length - 1)) {
      btnRight.style.display = 'none';
      } 
      if(currentIndex > 0) {
      btnLeft.style.display = '';
      }
      width += carouselItems[currentIndex].offsetWidth;
      carouselInner.style.transform = 'translateX(-' + width + 'px)';
    });

    btnLeft.addEventListener('click', () => {
      currentIndex--;
      if(currentIndex < (carouselItems.length - 1)) {
      btnRight.style.display = '';
      }
      if(currentIndex == 0) {
      btnLeft.style.display = 'none';
      }
      width -= carouselItems[currentIndex].offsetWidth;
      carouselInner.style.transform = 'translateX(-' + width + 'px)';
    });

    this.addBtns = carousel.querySelectorAll('.carousel__button');
    for(let i = 0; i < this.addBtns.length; i++) {
      this.addBtns[i].addEventListener('click', (ev) => {
        const event = new CustomEvent("product-add", {
          detail: this.addBtns[i].getAttribute('data-id'),
          bubbles: true
        });
        this._elem.dispatchEvent(event);
      });      
    }
    this._elem.addEventListener('product-add', event => {});
  }

  get elem() {
    return this._elem;
  }
}
