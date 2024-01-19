export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    console.log(cartItem);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}
