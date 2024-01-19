import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.elem = createElement(`
        <div class="products-grid">
          <div class="products-grid__inner">
          </div>
        </div>`); 

    this.filters = {};

    this.render();

    this.updateFilter(this.filters);
  }

  renderProducts(filteredProducts) {
    let inner = this.elem.querySelector('.products-grid__inner');
    inner.innerHTML = '';

    filteredProducts.forEach(el => {
      inner.append(new ProductCard(el).elem);
    });
  }

  render() {  
    this.renderProducts(this.products);
  }

  updateFilter(filters) { 
    let productsFiltered = this.products;

    Object.assign(this.filters, filters);
    
    if (this.filters.hasOwnProperty("noNuts") && this.filters.noNuts) {
      productsFiltered = productsFiltered.filter((el) =>  !el.nuts);
    }
    
    if (this.filters.hasOwnProperty("vegeterianOnly") && this.filters.vegeterianOnly) {
        productsFiltered = productsFiltered.filter((el) => el.vegeterian);
    }
    
    if (this.filters.hasOwnProperty("maxSpiciness")) {
      productsFiltered = productsFiltered.filter((el) => el.spiciness <= this.filters.maxSpiciness);
    }

    if (this.filters.hasOwnProperty("category") && this.filters.category) {
        productsFiltered = productsFiltered.filter((el) => el.category == this.filters.category);     
    }

    this.renderProducts(productsFiltered);
   }  

}
