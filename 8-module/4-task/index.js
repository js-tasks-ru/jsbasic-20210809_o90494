import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();
    this.addEventListeners();
  }

  addProduct(product) {
    if(!product) return;

    let existingProduct = this.cartItems.find(el => el.product.name === product.name);
    let cartItem;

    if (existingProduct) {
      existingProduct.count++;
      cartItem = existingProduct;
    } else {
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(el => el.product.id === productId);
    let cartItemIndex = this.cartItems.indexOf(cartItem);
    cartItem.count += amount;    

    if(cartItem.count === 0) {
      this.cartItems.splice(cartItemIndex, 1);
    }
    this.onProductUpdate(cartItem);
    
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    if (this.isEmpty()) {
      return 0; 
    }
    let totalCount = 0;

    this.cartItems.forEach(el => {
      totalCount += el.count;
    })
    return totalCount;
  }

  getTotalPrice() {
    if (this.isEmpty()) {
      return 0; 
    }
    let totalPrice = 0;

    this.cartItems.forEach(el => {
      let itemTotal = el.count * el.product.price;
      totalPrice += itemTotal;
    })
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal.setTitle('Your order');
    this.modal.setBody(createElement(`<div></div>`));
    
    let orderContent = this.modal.elem.querySelector('.modal__body div');   
    console.log(this.modal.elem); 
    orderContent.append(
      ...this.cartItems.map(el => this.renderProduct(el.product, el.count))
    );

    orderContent.addEventListener('click', (event) => {
      let button = event.target.closest('.cart-counter__button');  
      if (!button) {
        return;
      }
      let productId = button.closest('.cart-product').dataset.productId;
    
      if (button.matches(".cart-counter__button_plus")) { 
        this.updateProductCount(productId, 1);
      } else if (button.matches(".cart-counter__button_minus")) {
        this.updateProductCount(productId, -1);
      }     
    })
  
    orderContent.append(this.renderOrderForm()); 
    
    let cartForm = orderContent.querySelector('.cart-form');
    cartForm.addEventListener('submit', (event) => {
      this.onSubmit(event);
    })
    

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if(document.body.matches('.is-modal-open')){
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');
      let productElem = modalBody.querySelector(`[data-product-id="${productId}"]`);

      if(cartItem.count < 1) {
        productElem.remove();
        if(!this.cartItems.length){
          this.modal.close();
        }
        return
      }

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;      
    }    
  }

  onSubmit(event) {
    event.preventDefault();
    let cartForm = event.target;

    let btnSubmit = cartForm.querySelector('button[type="submit"]');
    btnSubmit.classList.add('is-loading');

    let formData = new FormData(cartForm);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if(response.ok) {
        this.modal.setTitle('Success!');
        this.cartItems.splice(0, this.cartItems.length);
        this.modal.setBody(createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
          `));          
      }
    })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

