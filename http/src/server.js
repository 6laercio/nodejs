import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/tasks")
    return res.end("Route to get tasks");

  if (method === "POST" && url === "/tasks")
    return res.end("Route to create task");

  return res.end("Not found");
});

server.listen(3000, () => {
  const address = server.address();
  console.log(`Server running on http://localhost:${address.port}`);
});
