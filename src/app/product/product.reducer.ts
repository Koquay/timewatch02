import { ProductActionTypes } from "./product.actions";

export const ProductReducer = (state = initialState, action) => {
  let newFilters;

  switch (action.type) {
    case ProductActionTypes.ADD_PRODUCTS:
      newFilters = addPaginationToFilters(state.filters, action.productData);
      addItemToLocalStorage("products", action.productData.products);
      addItemToLocalStorage("productCount", action.productData.productCount);

      return {
        ...state,
        products: action.productData.products,
        productCount: action.productData.productCount,
        filters: newFilters,
      };

    case ProductActionTypes.ADD_PRODUCTS_BY_CATEGORY:
      if (action.products.length) {
        const productsByCategory = addProductsByCategory(action.products);
        addItemToLocalStorage("productsByCategory", productsByCategory);
        return {
          ...state,
          productsByCategory: productsByCategory,
        };
      } else {
        let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));

        return {
          ...state,
          productsByCategory: localStorageData.productsByCategory,
        };
      }

    case ProductActionTypes.GET_PRODUCTS:
      return state;

    case ProductActionTypes.SET_SELECTED_PAGENO:
      newFilters = getNewPageNo(state.filters, action.direction, action.pageNo);
      return {
        ...state,
        filters: newFilters,
      };

    case ProductActionTypes.SET_SORT_OPTION:
      newFilters = setSortOption(state.filters, action.optionId);
      return {
        ...state,
        filters: newFilters,
      };

    case ProductActionTypes.SET_COLOR:
      newFilters = setColor(state.filters, action.color);
      return {
        ...state,
        filters: newFilters,
      };

    case ProductActionTypes.SET_BRAND:
      newFilters = setBrand(state.filters, action.brand);
      return {
        ...state,
        filters: newFilters,
      };

    case ProductActionTypes.SET_PRICE_RANGE:
      newFilters = setPriceRange(state.filters, action.priceRange);
      return {
        ...state,
        filters: newFilters,
      };

    case ProductActionTypes.SET_SELECTED_PRODUCT:
      if (state.products.length) {
        const selectedProductData = getSelectedProductData(
          state.products,
          action.productId
        );

        addItemToLocalStorage("product", selectedProductData.selectedProduct);
        addItemToLocalStorage(
          "relatedProducts",
          selectedProductData.relatedProducts
        );
        return {
          ...state,
          product: selectedProductData.selectedProduct,
          relatedProducts: selectedProductData.relatedProducts,
        };
      } else {
        let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));

        return {
          ...state,
          product: localStorageData.product,
          products: localStorageData.products,
          relatedProducts: localStorageData.relatedProducts,
          productsByCategory: localStorageData.productsByCategory,
        };
      }

    default:
      return state;
  }
};

const addItemToLocalStorage = (tag, item) => {
  let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));
  if (!localStorageData) {
    localStorageData = JSON.parse(JSON.stringify(localStorageDataTmp));
  }
  switch (tag) {
    case "productsByCategory":
      localStorageData.productsByCategory = item;
      break;

    case "products":
      localStorageData.products = item;
      break;

    case "product":
      localStorageData.product = item;
      break;

    case "relatedProducts":
      localStorageData.relatedProducts = item;
      break;

    default:
      return;
  }

  localStorage.setItem("timewatch02", JSON.stringify(localStorageData));
};

const addProductsByCategory = (products) => {
  const latest = [];
  const specials = [];
  const bestsellers = [];

  products.filter((product) => {
    for (let category of product.category) {
      if (category === "latest") {
        latest.push(product);
      }

      if (category === "special") {
        specials.push(product);
      }

      if (category === "bestseller") {
        bestsellers.push(product);
      }
    }
  });

  const productsByCategory = {
    latest: {
      products: latest,
    },
    special: {
      products: specials,
    },
    bestseller: {
      products: bestsellers,
    },
  };

  return productsByCategory;
};

const addPaginationToFilters = (filters, productData) => {
  let pages = computePagination(productData.productCount, filters);

  const newFilters = { ...filters, pages: pages };

  return newFilters;
};

const getSelectedProductData = (products, productId) => {
  const selectedProduct = products.find((product) => product._id === productId);

  const relatedProducts = products
    .filter((product) => product.price === selectedProduct.price)
    .sort()
    .slice(0, 5);

  return { selectedProduct, relatedProducts };
};

const setPriceRange = (filters, range) => {
  const newPriceRange = JSON.parse(JSON.stringify(filters.prices));

  let newRange = newPriceRange.find((nRange) => nRange.name === range.name);

  newRange.checked = !newRange.checked;

  let newFilters = {
    ...filters,
    prices: newPriceRange,
  };

  return newFilters;
};

const setBrand = (filters, brand) => {
  const newBrands = JSON.parse(JSON.stringify(filters.brands));

  const newBrand = newBrands.find((oldBrand) => oldBrand.name === brand.name);
  newBrand.checked = !newBrand.checked;

  let newFilters = {
    ...filters,
    brands: newBrands,
  };

  return newFilters;
};

const setColor = (filters, color) => {
  const newColors = JSON.parse(JSON.stringify(filters.colors));

  const newColor = newColors.find((oldColor) => oldColor.name === color.name);
  newColor.checked = !newColor.checked;

  let newFilters = {
    ...filters,
    colors: newColors,
  };

  return newFilters;
};

const setSortOption = (filters, optionId) => {
  const newSortOptions = JSON.parse(JSON.stringify(filters.sortOptions));

  newSortOptions.reduce((acc, option) => {
    option.checked = false;
    if (option.id == optionId) {
      option.checked = true;
    }
  }, []);

  let newFilters = {
    ...filters,
    sortOptions: newSortOptions,
  };

  return newFilters;
};

const getNewPageNo = (filters, direction, pageNo) => {
  let newPageno;

  if (direction) {
    let offset = direction === "previous" ? -1 : +1;
    newPageno = filters.pageNo + offset;
  } else {
    newPageno = pageNo;
  }

  let newFilters = {
    ...filters,
    pageNo: newPageno,
  };

  return newFilters;
};

const computePagination = (productCount, filters) => {
  let nop = Math.ceil(productCount / filters.pageSize);
  let pages = [];
  for (let i = 1; i <= nop; i++) {
    pages.push(i);
  }

  return pages;
};

const localStorageDataTmp = {
  products: [],
  product: {},
  productsByCategory: {},
  relatedProducts: [],
  productCount: 0,
};

const initialState = {
  products: [],
  productsByCategory: {},
  relatedProducts: [],
  productCount: 0,

  filters: {
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
    // categories: ["special", "bestseller", "latest"], = products.filter(product => products.category === ')
  },
};
