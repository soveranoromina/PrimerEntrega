import express from "express";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import productRouter from "./routes/ProductRouter.js";
import cartRouter from "./routes/CartRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use(errorHandler);

app.listen(8080, () => console.log("Servidor escuchando en el puerto 8080"));
