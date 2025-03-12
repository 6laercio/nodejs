import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  for (const route of routes) {
    if (route.method === method && route.path === url) {
      route.handler(req, res);
      return;
    }
  }

  return res.writeHead(404).end("Not found");
});

server.listen(3000, () => {
  const address = server.address();
  console.log(`Server running on http://localhost:${address.port}`);
});
