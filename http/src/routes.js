import { randomUUID } from "node:crypto";
import db from "./database.js";

const getTasks = (req, res) => {
  const tasks = db.select("tasks");
  return res.json(tasks);
};

const createTask = (req, res) => {
  if (!req.body?.title) {
    return res.writeHead(400).end("Title is required");
  }

  db.insert("tasks", {
    id: randomUUID(),
    title: req.body.title,
    completed: false,
  });

  return res.writeHead(201).end("Task created");
};

export const routes = [
  { path: "/tasks", method: "GET", handler: getTasks },
  { path: "/tasks", method: "POST", handler: createTask },
];
