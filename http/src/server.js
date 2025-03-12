import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";
import db from "./database.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/tasks") {
    const tasks = db.select("tasks");
    return res.json(tasks);
  }

  if (method === "POST" && url === "/tasks") {
    if (!req.body || !req.body.title) {
      return res.writeHead(400).end("Title is required");
    }

    const task = {
      id: randomUUID(),
      title: req.body.title,
      completed: false,
    };

    db.insert("tasks", task);

    return res.writeHead(201).end("Task created");
  }

  return res.writeHead(404).end("Not found");
});

server.listen(3000, () => {
  const address = server.address();
  console.log(`Server running on http://localhost:${address.port}`);
});
