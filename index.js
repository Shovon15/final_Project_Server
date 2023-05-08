const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jallqro.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// console.log(uri);

async function run() {
  const usersCollection = client
    .db("project_Car_Dealer_Db")
    .collection("users");
  const categoryCollection = client
    .db("project_Car_Dealer_Db")
    .collection("categoryCollections");
  const productsCollection = client
    .db("project_Car_Dealer_Db")
    .collection("productCollection");
  // const bookingsCollection = client.db("carResaleMarket").collection("bookings");
  // const gadgetsCollection = client.db("carResaleMarket").collection("gadgets");
  try {
    app.get("/carCategory", async (req, res) => {
      const filter = {};
      const result = await categoryCollection.find(filter).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);

// ------------------------
app.get("/", async (req, res) => {
  res.send("car resale server is running");
});

app.listen(port, () => console.log(`Car resale server running on ${port}`));
