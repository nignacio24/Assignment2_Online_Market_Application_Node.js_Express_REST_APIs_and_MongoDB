import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import api from "./api/products/products.mjs";


const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("{'message': 'Welcome to the Nikko's Appstore.'}");
  });

app.use("/api/products", api);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
