const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


const port = 8080;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

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
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(req.body);
    let newCaption = req.body.caption;
    let newSrc = req.body.src;
    let post = posts.find((p) => id === p.id );
    post.caption = newCaption;
    post.src = newSrc;
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    let  { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
});

app.listen(port, () => {
    console.log(`Server is listening at port no ${port}`);
});