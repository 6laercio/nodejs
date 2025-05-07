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

  select(table, query = {}) {
    const data = this.#database[table] ?? [];

    return data.filter((item) => {
      if (
        query.search &&
        !item.title?.toLowerCase().includes(query.search.toLowerCase())
      ) {
        return false;
      }

      if (query.completed !== undefined) {
        const isCompleted =
          query.completed === "true" || query.completed === true;
        if (item.completed !== isCompleted) {
          return false;
        }
      }

      return true;
    });
  }

  insert(table, data) {
    if (!this.#database[table]) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);
    this.#persist();

    return data;
  }

  update(table, id, data) {
    const indexRow = this.#database[table].findIndex((row) => row.id === id);
    if (indexRow > -1) {
      this.#database[table][indexRow] = { id, ...data };
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}

export default new Database();
