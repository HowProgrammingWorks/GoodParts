'use strict';

// Code improved characteristics:
//   - simple, no code duplication
//   - linear logic: less "if" (3 vs 6)
//   - isolated complexity of "if" logic (readability)
//   - decomposed, no mixed responsibility (readability)
//   - unpredictability is isolated
//   - monomorphic code (opt, object shapes)
//   - isolated polymorphic shapes
//   - SOLID:SRP (Single Responsibility Principle)
//   - SoC (Separation of Concerns)
//   - consistent return (check with eslint)
//   - function inlining, const inlining

const getPrice = (item) => item.price;

const normalizeItem = (data, options = { convert: true }) => {
  const isTuple = Array.isArray;
  const obj = isTuple(data) ? { name: data[0], price: data[1] } : data;
  const { name, price, cost } = obj;
  const value = price ?? cost;
  const convert = options.convert && typeof value === 'string';
  const amount = convert ? parseFloat(value) : value;
  return { name, price: amount };
};

/*

type Item = {
  name: string;
  price?: number;
};

type RawTuple = [string, number];

type RawObject = {
  name: string;
  price?: number;
  cost?: number;
};

declare function getPrice(item: Item): number | undefined;
declare function normalizeItem(data: RawTuple | RawObject): Item;

*/

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
  const item = normalizeItem(data);
  const price = getPrice(item);
  return { data, item, price };
});
console.table(output);
