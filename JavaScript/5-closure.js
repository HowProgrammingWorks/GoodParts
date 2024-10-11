'use strict';

// Code improved characteristics:
//   - use closure, Luke
//   - linear execution
//   - protected context

// Implementation

const item = (name, price, options = { convert: true }) => {
  const convert = options.convert && typeof price === 'string';
  const amount = convert ? parseFloat(price) : price;
  const getName = () => name;
  const getPrice = () => amount;
  return { getName, getPrice };
};

const fromStruct = (obj, options) => {
  const { name, price, cost } = obj;
  return item(name, price ?? cost, options);
};

const fromTuple = (tuple, options) => item(tuple[0], tuple[1], options);

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
  const item = fromData(data);
  const price = item.getPrice();
  const iface = '{ ' + Object.keys(item).join(', ') + ' }';
  return { data, item: iface, price };
});
console.table(output);
