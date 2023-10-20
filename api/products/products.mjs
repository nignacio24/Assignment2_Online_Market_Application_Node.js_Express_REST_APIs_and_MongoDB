import express from "express";
import db from "../../db/connection.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// CRUD -------------------
// Get all products or use a parameter name to get products which name contains with the parameter
router.get("/", async (req, res) => {
  const name = req.query.name;
  let collection = db.collection("Product");

  if(!name){
    let results = await collection.find({})
    .limit(50)
    .toArray();
    res.send(results).status(200);
  }else{
    let results = await collection.find({ name: { $regex: name, $options: "i" } }).toArray(); //regex is used for pattern matching and $options is used for case sensitivity
    res.send(results);
  }
});

// Get Product by ID
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Product");
  try{
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  }
  catch(e)
  {
    console.dir(e);
    res.status(500).send("An error occurred while getting the document");
  }
});

// Add new Product
router.post("/", async (req, res) => {
  try{
    let collection = await db.collection("Product");
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch(e){
    console.error(e);
    res.status(500).send("An error occurred while adding a new document");
  }
});

// Update Product by ID
router.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("Product");
    const query = { _id: new ObjectId(req.params.id) };
    const updateData = req.body; // The data to update

    const result = await collection.updateOne(query, { $set: updateData }); //I use the $set operator here so that i can specify the fields i want to update

    if (result.modifiedCount === 1) {
      res.status(200).send("Document updated successfully");
    } else {
      res.status(404).send("No document found to update");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while updating the document");
  }
});

// Remove product by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("Product");
    let result = await collection.deleteOne(query);

  res.send(result).status(200);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while deleting document");
  }
});

// Remove all products
router.delete("/", async (req, res) => {
  const collection = db.collection("Product");
  const query = {}; // Empty query to match all documents

  try {
    const result = await collection.deleteMany(query);
    res.status(200).send(`Deleted All Documents`);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while deleting documents");
  }
});

export default router;
