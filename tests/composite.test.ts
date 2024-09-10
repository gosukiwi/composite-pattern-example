import { expect, test } from "vitest";

// This is the interface implemented by both single objects and composite
// objects.
interface Priceable {
  getPrice(): number;
}

// This is a single product, the implementation is straight forward.
class Product implements Priceable {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getPrice() {
    return this.price;
  }
}

// This is a composite, because one box has many products. But from the outside
// world, we don't care. We simply use `getPrice()`.
class Box implements Priceable {
  products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  getPrice() {
    return this.products.reduce(
      (accu, product) => accu + product.getPrice(),
      0,
    );
  }
}

test("it can be used indistinctively", () => {
  const phone = new Product("iPhone", 1000);
  const tablet = new Product("iPad", 600);
  const box = new Box([phone, tablet]);

  // We can call `getPrice()` on a single product, or a box of products. We
  // don't really care if our object is a composite or not.
  //
  // The whole point of the pattern is being able to treat composites (Boxes)
  // and non-composites (Products) in the same way.
  //
  expect(phone.getPrice()).toEqual(1000);
  expect(tablet.getPrice()).toEqual(600);
  expect(box.getPrice()).toEqual(1600);
});
