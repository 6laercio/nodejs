import fs from "node:fs/promises";

const dbPath = new URL("../db.json", import.meta.url);

class Database {
  #database = {};

  constructor() {
    this.#load();
  }

  async #load() {
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      this.#database = JSON.parse(data);
    } catch (error) {
      this.#persist();
    }
  }

  async #persist() {
    await fs.writeFile(dbPath, JSON.stringify(this.#database));
  }

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    if (!this.#database[table]) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);
    this.#persist();

    return data;
  }
}

export default new Database();
