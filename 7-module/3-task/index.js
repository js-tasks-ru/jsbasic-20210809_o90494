import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    const slider = createElement(`
        <div class="slider">
          <div class="slider__thumb">
            <span class="slider__value">0</span>
          </div>
          <div class="slider__progress"></div>
          <div class="slider__steps">
          </div>
        </div>`);
    this._elem = slider;
    let sliderSteps = this._elem.querySelector('.slider__steps');
    for(let i = 0; i < steps; i++) {
      let sliderStep = `<span></span>`;
      sliderSteps.insertAdjacentHTML('beforeEnd', sliderStep);      
    }
    let sliderStepsItems = sliderSteps.querySelectorAll('span');
    sliderStepsItems[0].classList.add('slider__step-active');
    this._elem.addEventListener('click', (ev) => {
          let left = ev.clientX - this._elem.getBoundingClientRect().left;
          let leftRelative = left / this._elem.offsetWidth;

          let segments = steps - 1;
          let approximateValue = leftRelative * segments;
          let value = Math.round(approximateValue);
          let valuePercents = value / segments * 100;
          sliderStepsItems.forEach(el =>{ el.classList.remove('slider__step-active')});
          sliderStepsItems[value].classList.add('slider__step-active');
          let thumb = this._elem.querySelector('.slider__thumb');
          let progress = this._elem.querySelector('.slider__progress');
          thumb.style.left = `${valuePercents}%`;
          progress.style.width = `${valuePercents}%`;
          let sliderValue = this._elem.querySelector('.slider__value');
          sliderValue.textContent = `${value}`;
          const event = new CustomEvent('slider-change', { 
            detail: value, 
            bubbles: true 
          });
          this._elem.dispatchEvent(event);
    })
      
  }
  get elem() {
    return this._elem;
  }
}
