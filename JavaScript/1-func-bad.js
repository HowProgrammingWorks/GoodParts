'use strict';

// Bad code:
//   - deopt (polymorphic, object shapes, hidden classes)
//   - "if" logic (readability)
//   - union types (cognitive complexity)
//   - code duplication
//   - unpredictable contracts
//   - mixed responsibility
//   - inconsistent return
//   - array destructuring (return struc/tuple)
//   - deopts: for-in, delete, mixins
//   - holey arrays, multi-type arrays
//   - avoid: bind, call, apply
//   - avoid: forEach with outer scope access
//   - implicit type coercion: +'5', *1, -0 , /1, `${n}`
//   - Soft/hard equality: == vs ===, != vs !==
//   - chained assignments
//   - prefer const, less let, avoid var

// Implementation

const getPrice = function(options = { convert: true }) {
  let price;
  let item = { price } = this;
  if (!Array.isArray(item)) {
    let { price } = this;
    if (typeof price == 'number') return price;
    price = this.cost;
    if (typeof price == 'number') return price;
    if (options.convert) return parseFloat(price);
  }
  [, price] = this;
  if (typeof price == 'number') return price;
  if (options.convert) price = +price;
  if (!isNaN(price)) return price;
};

/* Typings

type Item = {
  name: string;
  price?: number;
  cost?: number;
};

type ItemData = [string, number];

declare function getPrice(item: Item | ItemData): number | undefined;

*/

// Usage

const goods = [
  { name: 'Laptop', price: 1500 },
  { name: 'Phone', price: 7000 },
  { price: 25, name: 'Mouse' },
  { name: 'Keyboard', price: 0 },
  { name: 'HDMI cable', cost: 10 },
  ['Bag', 50],
  ['Case', '150'],
  ['Box', 'to-be-deleted'],
  { name: 'Mouse pad' },
];
delete goods[1].price;
delete goods[7][1];
goods[8].price = 5;

const output = [];
goods.forEach((item) => {
  const price = getPrice.call(item);
  output.push({ item, price });
});
console.table(output);
