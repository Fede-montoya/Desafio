const express = require("express");
const handlebars = require("express-handlebars");
const MongoStorage = require("connect-mongo");
const DataBase = require("./db/index");
const session = require("express-session");
const viewRoutes = require("./routes/views.routes");
const cartRoutes = require("./routes/cart.routes");
const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const passport = require("passport");
const PORT = 8080;
const app = express();
const { initializePassport } = require("./config/passport");
app.use(
  session({
    store: MongoStorage.create({
      mongoUrl:
        "mongodb+srv://ramirostrologo:r131217s@proyectocoder.annbnga.mongodb.net/ecommerce_preentrega-dos",
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
initializePassport();
app.use(passport.session());

app.use("/api/views", viewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.listen(PORT, () => {
  console.log("Server run ok");
  DataBase.connect();
});