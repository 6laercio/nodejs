import { Readable, Writable } from "node:stream";

class CounterStream extends Readable {
  count = 1;
  max = 10;

  _read() {
    const timer = setTimeout(() => {
      if (this.count > this.max) {
        this.push(null);
      } else {
        this.push(String(this.count));
        this.count += 1;
      }
      clearTimeout(timer);
    }, 500); // Simula operação assíncrona
  }
}

class EvenOddCheckerStream extends Writable {
  _write(chunk, encoding, callback) {
    const num = Number(chunk.toString());
    const result = num % 2 === 0 ? "par" : "ímpar";
    console.log(`${num} é ${result}`);
    callback();
  }
}

const counterStream = new CounterStream();
const evenOddChecker = new EvenOddCheckerStream();

counterStream.pipe(evenOddChecker);

/* function createArrayStream() {
  const data = [
    "primeira linha",
    "segunda linha",
    "terceira linha",
    "quarta linha",
    "quinta linha",
  ];

  const readableStream = new Readable({
    objectMode: true,
    read() {
      if (data.length === 0) {
        this.push(null); // Indica o fim da stream
      } else {
        const chunk = data.shift();
        this.push(chunk);
      }
    },
  });

  // Consumindo a stream
  readableStream.on("data", (chunk) => {
    console.log(`Recebido: ${chunk}`);
  });

  readableStream.on("end", () => {
    console.log("Stream finalizada");
  });

  return readableStream;
}

createArrayStream(); */
