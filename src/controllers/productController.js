import Product from "../models/Product.js";
import { Op } from "sequelize";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "createdAt"; 
    const order = req.query.order || "DESC"; 

    const offset = (page - 1) * limit;

    const where = search
      ? {
          name: {
            [Op.like]: `%${search}%`,
          },
        }
      : {};

    const products = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sort, order]],
    });

    res.json({
      total: products.count,
      current_page: page,
      total_pages: Math.ceil(products.count / limit),
      data: products.rows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: "Product soft-deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
