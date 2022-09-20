import { NextFunction, Request, Response } from "express";
import path from "path";
import { ReadRequest, ScriptRequest } from "./types";

const express = require("express");
const { Client } = require("pg");
const app = express();
const PORT = process.env.PORT || 3001;
const DB_URI = process.env.DB_URI || "postgresql://postgres:forum123@localhost:5432/forum-db";

const client = new Client({connectionString: DB_URI});
client.connect();

const getPosts = async (amount: number) => {
    const result = await client.query({
        text: `SELECT post_id, title, authorname FROM posts LIMIT ${amount}`,
    });
    return result.rows;
}

const getPostById = async (postId: number) => {
    const result = await client.query({
        text: `SELECT * FROM posts WHERE post_id=${postId}`
    });
    return result.rows[0];
}

const createNewPost = async ({title, content, authorname}: {title: string, content: string, authorname: string}) => {
    const newPosts = await client.query({
        text: `INSERT INTO posts (title, content, authorname) VALUES ('${title}', '${content}', '${authorname}') RETURNING post_id`
    });
    console.log("New post created!", newPosts.rows[0]);
    return newPosts.rows[0];
}

app.set("view engine", "ejs");

app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.use("/api", express.json(), (req: Request, res: Response, next: NextFunction) => {
    console.log("Accessing API endpoint...");
    next();
});

app.get("/", async (req: Request, res: Response) => {
    const posts = await getPosts(50);
    res.render("index", {
        posts: posts,
    });
});

app.get("/writing", (req: Request, res: Response) => res.render("writing"));
app.get("/reading/", (req: Request, res: Response) => res.status(404).render("notfound"));
app.get("/reading/:postId", async (req: ReadRequest, res: Response) => {
    const postId = parseInt(req.params.postId || "");
    if (isNaN(postId)) {
        return res.sendStatus(404);
    }
    const post = await getPostById(postId);
    if (post === undefined) {
        return res.status(404).render("notfound");
    }
    res.render("reading", {
        post: post,
    });
});
app.get("/scripts/:filename", (req: ScriptRequest, res: Response) => {
    const filename = req.params.filename;
    if (filename === undefined) return res.sendStatus(404);
    res.sendFile(path.join(__dirname, `../scripts/${filename}`));
});

app.get("/api", (req: Request, res: Response) => {
    res.sendStatus(200);
});
app.post("/api/create", async (req: Request, res: Response) => {
    let {title, content, authorname} = req.body;
    if (title === undefined || content === undefined || title.length < 1 || content.length < 1) return res.sendStatus(400);

    authorname = authorname || "Anonymous";
    const newPost = await createNewPost({title, content, authorname});
    if (newPost !== undefined) {
        return res.status(200).send(newPost.post_id.toString());
    }
    throw new Error("Error while creating new post!");
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});