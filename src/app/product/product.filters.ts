export const productFilters = {
  pageNo: 1,
  pageSize: 8,
  pages: [],

  brands: [
    { name: "Apple", checked: false },
    { name: "Timex", checked: false },
    { name: "Rolex", checked: false },
    { name: "Seiko", checked: false },
    { name: "Citizen", checked: false },
  ],
  colors: [
    { name: "Black", checked: false },
    { name: "Brown", checked: false },
    { name: "Silver", checked: false },
    { name: "Blue", checked: false },
    { name: "Red", checked: false },
  ],

  prices: [
    {
      name: "$100 - $300",
      low: 100,
      high: 300,
      checked: false,
      priceIdentifier: "price",
    },
    {
      name: "$301 - $500",
      low: 301,
      high: 500,
      checked: false,
      priceIdentifier: "price",
    },
    {
      name: "$501 - $700",
      low: 501,
      high: 700,
      checked: false,
      priceIdentifier: "price",
    },
    {
      name: "$701 - $2000",
      low: 701,
      high: 2000,
      checked: false,
      priceIdentifier: "price",
    },
  ],

  sizes: [
    { name: "Large", checked: false },
    { name: "Medium", checked: false },
    { name: "Small", checked: false },
  ],

  sortOptions: [
    {
      id: 1,
      field: "price",
      direction: 1,
      title: "Price Low to High",
      checked: true,
    },
    {
      id: 2,
      field: "price",
      direction: -1,
      title: "Price High to Low",
      checked: false,
    },
    {
      id: 3,
      field: "rating",
      direction: -1,
      title: "Top Rated Products",
      checked: false,
    },
  ],

  categories: [],
};
