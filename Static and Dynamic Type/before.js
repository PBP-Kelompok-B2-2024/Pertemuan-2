class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  
    applyDiscount(discount) {
      this.price -= this.price * (discount / 100);
    }
  }
  
  class Category {
    constructor(name) {
      this.name = name;
      this.products = [];
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    listProducts() {
      return this.products;
    }
  }


const electronics = new Category('Electronics');
const laptop = new Product('Laptop', 1000);

electronics.addProduct(laptop);
laptop.applyDiscount('10a');

console.log(electronics.listProducts());