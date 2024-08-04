const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const todo = require("./model/todo.model.js");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// getting single data
app.get("/R/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await todo.findById(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred in app on /R/:id ", error);
    res.status(500).send("Error reading todo");
  }
});

// getting all data
app.get("/ALL", async (req, res) => {
  try {
    let a = await todo.find({});
    console.log("Todo created");
    res.status(200).json(a);
  } catch (error) {
    console.error("Error occurred while getting all data", error);
    res.status(500).send("Error reading todo");
  }
});

// creating a new todo
app.post("/C", async (req, res) => {
  try {
    let a = await todo.create(req.body);
    const { id } = a;
    res.status(200).json(id);
  } catch (error) {
    console.error("Error occurred while creating todo in app ", error);
    res.status(500).send("Error creating todo");
  }
});

app.put("/U", async (req, res) => {
  try {
    const { key1, key2 } = req.body;
    const a = await todo.updateOne(
      { _id: `${key1}` },
      { $set: { isDone: key2 } }
    );
    res.status(200).send("done");
  } catch (error) {
    console.error("Error occurred while updating todo in app ", error);
    res.status(500).send("Error updating todo");
  }
});

// Delete todo
app.delete("/D/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await todo.deleteOne({ _id: id });
    res.status(200).send("data is deleted successfully");
  } catch (error) {
    console.error("Error occurred while deleting todo", error);
    res.status(500).send("Error deleting todo");
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@backenddb.1x0cap1.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("App is listening on port 3000..");
    });
  })
  .catch((e) => {
    console.error("Error occurred while connecting to the database:", e);
  });
