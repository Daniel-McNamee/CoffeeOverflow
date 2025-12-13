import express from "express";
import { engine } from "express-handlebars";
import fs from "fs";

const app = express();

// -------------- HANDLEBARS SETUP ---------------
app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials"
}));

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ------------ LOAD PRODUCTS.JSON -------------
let products = [];
try {
    products = JSON.parse(fs.readFileSync("./public/data/products.json"));
    console.log("Loaded products.json");
} catch (err) {
    console.log("ERROR loading products.json:", err);
}

// ---------- GROUPING FUNCTION ------------
function groupIntoSlides(list, perSlide = 2) {
    const slides = [];
    for (let i = 0; i < list.length; i += perSlide) {
        slides.push(list.slice(i, i + perSlide));
    }
    return slides;
}

// -------------- TESTIMONIALS ----------------
const testimonials = [
    {
        name: "John Doe",
        verified: true,
        stars: ["-fill", "-fill", "-fill", "-fill", "-half"],
        text: "This coffee is amazing! I start every day with a cup of Ctrl Alt Delight.",
        date: "3 days ago"
    },
    {
        name: "Jane Smith",
        verified: true,
        stars: ["-fill", "-fill", "-fill", "-fill", "-fill"],
        text: "Dark Mode Roast is my go-to for late-night coding.",
        date: "5 days ago"
    }
];

// ---------------- FILTER PRODUCTS BY CATEGORY ----------------
// Best Sellers
const bestSellers = products.filter(p => p.categories.includes("Best Seller"));
const bestSellerSlides2 = groupIntoSlides(bestSellers, 2);
const bestSellerSlides3 = groupIntoSlides(bestSellers, 3);
const bestSellerSlides4 = groupIntoSlides(bestSellers, 4);

// New Arrivals
const newArrivals = products.filter(p => p.categories.includes("New"));
const newArrivalSlides2 = groupIntoSlides(newArrivals, 2);
const newArrivalSlides3 = groupIntoSlides(newArrivals, 3);
const newArrivalSlides4 = groupIntoSlides(newArrivals, 4);

// Seasonal
const seasonal = products.filter(p => p.categories.includes("Seasonal / Limited Edition"));
const seasonalSlides2 = groupIntoSlides(seasonal, 2);
const seasonalSlides3 = groupIntoSlides(seasonal, 3);
const seasonalSlides4 = groupIntoSlides(seasonal, 4);

// --------- ROUTES ---------
app.get("/", (req, res) => {
    res.render("index", {
        isHome: true,

        bestSellerSlides2,
        bestSellerSlides3,
        bestSellerSlides4,

        newArrivalSlides2,
        newArrivalSlides3,
        newArrivalSlides4,

        seasonalSlides2,
        seasonalSlides3,
        seasonalSlides4,

        testimonials
    });
});

app.get("/shop", (req, res) => {
    res.render("shop", { products });
});

app.get("/product/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.redirect("/shop");
    res.render("product", { product });
});

app.get("/membership", (req, res) => res.render("membership"));

app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));

app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/profile", (req, res) => res.render("profile"));

app.get("/cart", (req, res) => res.render("cart"));
app.get("/checkout", (req, res) => res.render("checkout"));


// ------------ SERVER -----------
app.listen(3000, () => {
    console.log("CoffeeOverflow running at http://localhost:3000");
});
