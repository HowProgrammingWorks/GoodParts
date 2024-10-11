'use strict';

// Code improved characteristics:
//   - class with static factories
//   - additional decomposition (SoC)
//   - simple code, less cognitive complexity
//   - better for modifications and code ownership
//   - better for v8 opt (cpu, memory allocation)
//   - better for testing

// Implementation

class Item {
  constructor(name, price, options = { convert: true }) {
    const convert = options.convert && typeof price === 'string';
    this.name = name;
    this.price = convert ? parseFloat(price) : price;
  }

  static fromStruct(obj, options) {
    const { name, price, cost } = obj;
    return new Item(name, price ?? cost, options);
  }

  static fromTuple(tuple, options) {
    const name = tuple[0];
    const price = tuple[1];
    return new Item(name, price, options);
  }

  static fromData(data, options) {
    const isTuple = Array.isArray;
    const factory = isTuple(data) ? Item.fromTuple : Item.fromStruct;
    return factory(data, options);
  }
}

// Usage

const goods = [
  { name: 'Laptop', price: 1500 },
  { name: 'Phone' },
  { price: 25, name: 'Mouse' },
  { name: 'Keyboard', price: 0 },
  { name: 'HDMI cable', cost: 10 },
  ['Bag', 50],
  ['Case', '150'],
  ['Box'],
  { name: 'Mouse pad' },
];
goods[8].price = 5;

const output = goods.map((data) => {
  const item = Item.fromData(data);
  const price = item.price;
  return { data, item, price };
});
console.table(output);
