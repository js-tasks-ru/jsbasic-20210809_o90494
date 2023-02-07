import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    const menu = createElement(`
            <div class="ribbon">
              <button class="ribbon__arrow ribbon__arrow_left">
                <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
              </button>
                <div class="ribbon__inner"></div>
              <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
                <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
              </button>
            </div>`);
    this._elem = menu;
    const ribbonInner = menu.querySelector('.ribbon__inner');
    this.categories.forEach(category => {
      let ribbonItem = `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
      ribbonInner.insertAdjacentHTML('beforeEnd', ribbonItem);
    });
    
    
    const ribbonItems = menu.querySelectorAll('.ribbon__item');
    ribbonItems.forEach(el => {
      el.addEventListener('click', (ev) => {
        ev.preventDefault();
        ribbonItems.forEach(el =>{ el.classList.remove('ribbon__item_active')});
        el.classList.add('ribbon__item_active');
        const event = new CustomEvent('ribbon-select', {
          detail: el.getAttribute('data-id'), 
          bubbles: true 
        });
        this._elem.dispatchEvent(event);
      })
    })
    this._elem.addEventListener('ribbon-select', event => {});
    
    
    
    const arrowLeft = menu.querySelector('.ribbon__arrow_left');
    arrowLeft.addEventListener('click', () => {      
      ribbonInner.scrollBy(-350, 0);          
    });  
    const arrowRight = menu.querySelector('.ribbon__arrow_right');
    arrowRight.addEventListener('click', () => {      
      ribbonInner.scrollBy(350, 0);   
    });

    ribbonInner.addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth; 
      let scrollRight = scrollWidth - scrollLeft - clientWidth; 
      if(scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
      if(scrollLeft == 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }
    })
        
  }
  get elem() {
    return this._elem;
  }
}
