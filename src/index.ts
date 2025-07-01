import express from "express";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
const app = express();
const port = 3000;



app.post("/api/v1/signup", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/signin", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/content", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/content", (req, res) => {
  res.send("Hello World!");
});

app.delete("/api/v1/content", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/brain/share", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/brain/:shareLink", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
