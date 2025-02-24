const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');


const port = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/css")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let posts = [

    { 
       id: uuidv4(),
       username: "Zakir",
       caption: "Hi, I am goood",
       src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ujjory0gTF6qeMvC5fweMXmk73gr5xC5cA&s"

    },
    {
       id: uuidv4(),
       username: "Ali",
       caption: "I love coding",
       src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTECscs-3scyA2Y8EN9AK8oA5hoNMa37COv9Q&s"
    },
    {
        id: uuidv4(),
        username: "Shadab",
        caption: "I am learning something..",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Qv5s5REahX2Vcj11jPnU1ibiEUfTc-VMAQ&s"
    }
]

app.get("/posts", (req, res) => {
   res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
 });

app.post("/posts", (req, res) => {
    let id = uuidv4();
    let { username, caption, src } = req.body;
    posts.push({username, caption, src, id })
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`Server is listening at port no ${port}`);
});