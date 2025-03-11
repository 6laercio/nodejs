import http from "node:http";

const tasks = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/tasks") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(tasks));
  }

  if (method === "POST" && url === "/tasks") {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    try {
      const body = JSON.parse(Buffer.concat(buffers).toString());

      if (!body.title) {
        return res.writeHead(400).end("Title is required");
      }

      const task = {
        id: tasks.length + 1,
        title: body.title,
        completed: false,
      };

      tasks.push(task);

      return res.writeHead(201).end("Task created");
    } catch (error) {
      return res.writeHead(400).end("Invalid JSON");
    }
  }

  return res.writeHead(404).end("Not found");
});

server.listen(3000, () => {
  const address = server.address();
  console.log(`Server running on http://localhost:${address.port}`);
});
