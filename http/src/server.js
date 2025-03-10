import http from "node:http";

const server = http.createServer((req, res) => {
  const body = "hello world";
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(body);
});

server.listen(3000, () => {
  const address = server.address();
  console.log(`Server running on http://localhost:${address.port}`);
});
