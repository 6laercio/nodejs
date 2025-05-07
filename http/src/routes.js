import { randomUUID } from "node:crypto";
import db from "./database.js";
import { handleRoutePath } from "./utils/handle-route-path.js";

const getTasks = (req, res) => {
  const { search, completed } = req.query;
  const tasks = db.select("tasks", { search, completed });

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

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  db.update("tasks", id, { title, completed });
  return res.writeHead(204).end();
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  db.delete("tasks", id);
  return res.writeHead(204).end();
};

export const routes = [
  { path: handleRoutePath("/tasks"), method: "GET", handler: getTasks },
  { path: handleRoutePath("/tasks"), method: "POST", handler: createTask },
  {
    path: handleRoutePath("/tasks/:id"),
    method: "PUT",
    handler: updateTask,
  },
  {
    path: handleRoutePath("/tasks/:id"),
    method: "DELETE",
    handler: deleteTask,
  },
];
