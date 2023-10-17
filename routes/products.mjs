import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// CRUD -------------------
// All collections
router.get("/", async (req, res) => {
  let collection =  db.collection("Product");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});


// Get a single collection
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
  }

});

// Create
router.post("/", async (req, res) => {
  let collection = await db.collection("Product");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


// Update using put
router.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("Product");
    const query = { _id: new ObjectId(req.params.id) };
    const updatedDocument = req.body;

    const result = await collection.replaceOne(query, updatedDocument);

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

// Delete
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("Product");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
