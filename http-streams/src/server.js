import http from "node:http";
import { Transform, Readable } from "node:stream";

// Stream para processar dados recebidos
class ProcessorStream extends Transform {
  _transform(chunk, encoding, callback) {
    console.log(`Recebido chunk de ${chunk.length} bytes`);
    callback(null, chunk);
  }
}

// Criar e iniciar servidor
const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) buffers.push(chunk);

  const content = Buffer.concat(buffers).toString();

  return res.end(content);

  //   console.log("Servidor recebendo dados...");
  //   req.pipe(new ProcessorStream()).pipe(res);
});

server.listen(3001, () => {
  console.log("Servidor iniciado na porta 3001");

  // Criar stream simulando um arquivo
  const fileStream = new Readable({
    read() {},
  });

  // Enviar 5 chunks de dados
  let count = 0;

  const sendChunk = () => {
    if (count < 5) {
      const chunk = Buffer.from(`Chunk de dados ${count + 1}`);
      console.log(`Enviando: ${chunk}`);
      fileStream.push(chunk);
      count++;
      setTimeout(sendChunk, 500);
    } else {
      fileStream.push(null); // Finaliza o stream
      console.log("Upload finalizado");
    }
  };

  // Iniciar envio
  sendChunk();

  // Enviar para o servidor
  fetch("http://localhost:3001", {
    method: "POST",
    body: fileStream,
    duplex: "half",
  })
    .then((response) => response.text())
    .then((data) => console.log(data));
});
