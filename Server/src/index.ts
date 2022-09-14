import { Response } from "express";

const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 3001;
const DB_URI = process.env.DB_URI;

const pool = new Pool({DB_URI});

const getPosts = async (amount: number) => {
    const result = await pool.query(`SELECT ${amount} FROM posts`);
    return result.rows;
}

app.set("view engine", "ejs");

app.get("/", async (req: Request, res: Response) => {
    try {
        const posts = await getPosts(10);
        res.render("index", {
            posts: posts,
        });
    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});