import { Readable } from "node:stream";

class CounterStream extends Readable {
  count = 1;
  max = 10;

  _read() {
    const timer = setTimeout(() => {
      if (this.count > this.max) {
        this.push(null);
      } else {
        this.push(`Número: ${this.count}\n`);
        this.count += 1;
      }
      clearTimeout(timer);
    }, 500); // Simula operação assíncrona
  }
}

const counterStream = new CounterStream();
counterStream.pipe(process.stdout);
