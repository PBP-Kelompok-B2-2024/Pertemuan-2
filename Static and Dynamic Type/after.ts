class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  applyDiscount(discount: number): void {
    if (discount < 0 || discount > 100) {
      throw new Error('Invalid discount');
    }
    this.price -= this.price * (discount / 100);
  }
}

interface ICategory {
  name: string;
  products: Product[];
  addProduct(product: Product): void;
  listProducts(): Product[];
}

class Category implements ICategory {
  name: string;
  products: Product[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  listProducts(): Product[] {
    return this.products;
  }
}

class InventoryService {
  category: Category;

  constructor(category: Category) {
    this.category = category;
  }

  addProductToCategory(product: Product): void {
    this.category.addProduct(product);
  }

  applyDiscountToCategoryProducts(discount: number): void {
    this.category.listProducts().forEach(product => product.applyDiscount(discount));
  }
}

const electronics = new Category('Electronics');
const laptop = new Product('Laptop', 1000);
const phone = new Product('Phone', 500);

const inventoryService = new InventoryService(electronics);
inventoryService.addProductToCategory(laptop);
inventoryService.addProductToCategory(phone);

inventoryService.applyDiscountToCategoryProducts('10a');

console.log(electronics.listProducts());
// Output: [{ name: 'Laptop', price: 850 }, { name: 'Phone', price: 425 }]

// Output: [{ name: 'Laptop', price: 900 }]

// Kesalahan yang terdeteksi oleh TypeScript
// const invalidProduct = new Product(123, 'Seratus'); // ERROR: Type 'number' is not assignable to type 'string'.
// laptop.applyDiscount('sepuluh'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'.


