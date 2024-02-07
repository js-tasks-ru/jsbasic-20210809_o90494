import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.productsGrid;
  }

  async render() {
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);

    let ribbonlHolder = document.querySelector('[data-ribbon-holder]');
    ribbonlHolder.append(this.ribbonMenu.elem);

    let sliderHolder = document.querySelector('[data-slider-holder]');
    sliderHolder.append(this.stepSlider.elem);

    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

    await this.fetchAndRenderProducts();
    this.addEventListeners();
  }

  async fetchAndRenderProducts() {
    let url = 'products.json';
    let response = await fetch(url);
    let products = await response.json();

    this.productsGrid = new ProductsGrid(products);
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);
  }

  addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
        const product = this.getProductById(event.detail);
        this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      })
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      })
    });

    let nutsCheck = document.getElementById('nuts-checkbox');
    nutsCheck.addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    let vegeterianCheck = document.getElementById('vegeterian-checkbox');
    vegeterianCheck.addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      })
    })    
  }

  getProductById(productId) {
      return this.productsGrid.products.find(el => el.id === productId);
  }
}
