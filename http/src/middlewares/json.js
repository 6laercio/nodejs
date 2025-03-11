export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  res.json = (data) => {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(data));
  };
}
