import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// app.get("/", (req: Request, res: Response) => {
app.get("/", (_, res: Response) => {
   res.status(200).send("Home Page.");
});

app.get("/about", (_, res: Response) => {
   res.status(200).send("About Page.");
});

app.get("*", (_, res: Response) => {
   res.status(404).send("<h1>resource not found</h1>");
});
   
app.listen(PORT, () => {
   console.log(`[server]: Server is running at port: ${PORT}`);
});
