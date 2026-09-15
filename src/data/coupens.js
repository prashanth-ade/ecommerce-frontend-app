const coupons = [
  {
    code: "SAVE10",
    type: "percentage",
    value: 10,
    minOrder: 1000,
    maxDiscount: 500,
  },
  {
    code: "SAVE20",
    type: "percentage",
    value: 20,
    minOrder: 3000,
    maxDiscount: 1000,
  },
  {
    code: "FLAT500",
    type: "flat",
    value: 500,
    minOrder: 5000,
    maxDiscount: 500,
  },
];

export default coupons;