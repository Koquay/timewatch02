const chalk = require("chalk");
const { exception } = require("console");
require("./product.model");
const Product = require("mongoose").model("Product");

exports.getProductsByCategory = async (req, res) => {
  const { category } = req.query;

  const filter = JSON.parse(category);

  try {
    const products = await Product.find({
      category: {
        $in: filter,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Problem getting products");
  }
};

exports.getProducts = async (req, res) => {
  const { filters } = req.query;

  const productCountPipeline = [];
  const aggregatePipeline = buildAggregatePipeline(
    filters,
    productCountPipeline
  );

  try {
    const products = await Product.aggregate(aggregatePipeline);
    const productCount = await getProductCount(productCountPipeline);
    res.status(200).json({ products, productCount });
  } catch (error) {
    res.status(500).send("Problem getting product collection");
  }
};

const buildAggregatePipeline = (filtersStr, productCountPipeline) => {
  const filters = JSON.parse(filtersStr);
  let {
    categories,
    brands,
    prices,
    colors,
    sizes,
    pageNo,
    pageSize,
    sortFilter,
  } = filters;
  let aggregatePipeline = [];

  let categoryMatch = buildCategoryMatch(categories);
  if (categoryMatch) {
    aggregatePipeline.push(categoryMatch);
    productCountPipeline.push(categoryMatch);
  }

  let brandMatch = buildBrandMatch(brands);
  if (brandMatch) {
    aggregatePipeline.push(brandMatch);
    productCountPipeline.push(brandMatch);
  }

  let priceMatch = buildPriceRangeMatch(prices);
  if (priceMatch) {
    aggregatePipeline.push(priceMatch);
    productCountPipeline.push(priceMatch);
  }

  let colorMatch = buildColorMatch(colors);

  if (colorMatch) {
    aggregatePipeline.push(colorMatch);
    productCountPipeline.push(colorMatch);
  }

  // let sizeMatch = buildSizeMatch(sizes);
  // if (sizeMatch) {
  //   aggregatePipeline.push(sizeMatch);
  //   productCountPipeline.push(sizeMatch);
  // }

  aggregatePipeline.push(buildSortMatch(sortFilter));
  checkForEmptyAggregate(aggregatePipeline);
  checkForEmptyAggregate(productCountPipeline);
  aggregatePipeline.push(buildPageNumberFilter(pageNo, pageSize));
  aggregatePipeline.push(buildPageSizeFilter(pageSize));

  return aggregatePipeline;
};

const buildPageNumberFilter = (pageNo, pageSize) => {
  let skip = (pageNo - 1) * pageSize;

  return { $skip: skip };
};

const buildPageSizeFilter = (pageSize) => {
  return { $limit: pageSize };
};

const checkForEmptyAggregate = (aggregatePipeline) => {
  if (aggregatePipeline.length == 0) {
    aggregatePipeline.push({ $match: { _id: { $ne: null } } });
  }
};

const buildCategoryMatch = (categoryTypes) => {
  if (categoryTypes.length) {
    return { $match: { category: { $in: categoryTypes } } };
  }

  return null;
};

const getProductCount = async (productCountPipeline) => {
  let productCount;
  productCountPipeline.push({ $count: "productCount" });

  productCount = await Product.aggregate(productCountPipeline);

  if (productCount.length) {
    return productCount[0].productCount;
  }

  return 0;
};

const buildSortMatch = (sortFilter) => {
  let filter;
  if (sortFilter.field == "price") {
    filter = { $sort: { price: sortFilter.direction } };
  } else if (sortFilter.field == "rating") {
    filter = { $sort: { rating: sortFilter.direction } };
  }

  return filter;
};

const buildColorMatch = (colors) => {
  if (colors.length) {
    return { $match: { color: { $in: colors } } };
  }
  return null;
};

const buildPriceRangeMatch = (priceRanges) => {
  if (priceRanges.length) {
    let priceMatches = [];

    for (let priceRange of priceRanges) {
      priceMatches.push({
        $and: [
          { $gte: ["$price", +priceRange.low] },
          { $lte: ["$price", +priceRange.high] },
        ],
      });
    }

    return { $match: { $expr: { $or: priceMatches } } };
  }
};

const buildBrandMatch = (brands) => {
  if (brands.length) {
    return { $match: { brand: { $in: brands } } };
  }
  return null;
};

const buildSizeMatch = (sizes) => {
  if (sizes.length) {
    return { $match: { size: { $in: sizes } } };
  }
  return null;
};
