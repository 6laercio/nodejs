import http from "node:http";

const tasks = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/tasks") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(tasks));
  }

  if (method === "POST" && url === "/tasks") {
    tasks.push({
      id: 1,
      title: "Learn Node.js",
      completed: false,
    });
    return res.end("Task created");
  }

  return res.end("Not found");
});

server.listen(3000, () => {
  const address = server.address();
  console.log(`Server running on http://localhost:${address.port}`);
});
