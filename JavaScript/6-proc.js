'use strict';

// Code improved characteristics:
//   - procedural style
//   - simplicity

// Implementation

const getPrice = (item) => item.price;

const item = (name, price, options = { convert: true }) => {
  const convert = options.convert && typeof price === 'string';
  const amount = convert ? parseFloat(price) : price;
  return { name, price: amount };
};

const fromStruct = (obj, options) => {
  const { name, price, cost } = obj;
  return item(name, price ?? cost, options);
};

const fromTuple = (tuple, options) => {
  const name = tuple[0];
  const price = tuple[1];
  return item(name, price, options);
};

const fromData = (data, options) => {
  const isTuple = Array.isArray;
  const factory = isTuple(data) ? fromTuple : fromStruct;
  return factory(data, options);
};

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
  const item = fromData(data, { convert: true });
  const price = getPrice(item);
  return { data, item, price };
});
console.table(output);
