import { Router } from "express";
import { cartManager } from "../manager/CartManager.js";
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const cart = await cartManager.createCart();
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.getProductsFromCart(id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/:cid/product/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProductToCart(cid, pid);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

export default router;
