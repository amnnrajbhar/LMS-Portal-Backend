// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// // Simple Route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


import { config } from "dotenv";

config();

import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());
console.log(process.env.MONGO_URI);
connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const UserSchema = new Schema({
  id: Number,
  fullName: String,
  userName: String,
  roleId: String,
  role: String,
  status: Boolean,
  createdOn:String,
  modifienOn:String
});

const User = model("User", UserSchema);

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ message: "User Added", user: newUser });
});

app.put("/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "User Updated" });
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted" });
});

//Members For Login And Signup Working

const MemberSchema = new Schema({
  memberId: Number,
  username: String,
  password: String
});

const Members = model("Members", MemberSchema);

app.get("/members", async (req, res) => {
  const members = await Members.find();
  res.json(members);
});

app.post("/members", async (req, res) => {
  const newMember = new Members(req.body);
  await newMember.save();
  res.json({ message: "User Added", member: newMember });
});

//Pricing Plans

const PricingPlanSchema = new Schema({
  id: Number,
  planName: String,
  price: String,
  courseId: String,
  course: String,
  statusId: String,
  status: String,
  createdOn:String,
  modifienOn:String
});

const PricingPlan = model("PricingPlan", PricingPlanSchema);

app.get("/pricingPlan", async (req, res) => {
  const pricingPlan = await PricingPlan.find();
  res.json(pricingPlan);
});

app.post("/pricingPlan", async (req, res) => {
  const newPricingPlan = new PricingPlan(req.body);
  await newPricingPlan.save();
  res.json({ message: "pricingPlan Added", pricingPlan: newPricingPlan });
});

app.put("/pricingPlan/:id", async (req, res) => {
  await PricingPlan.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "pricingPlan Updated" });
});

app.delete("/pricingPlan/:id", async (req, res) => {
  await PricingPlan.findByIdAndDelete(req.params.id);
  res.json({ message: "pricingPlan Deleted" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
