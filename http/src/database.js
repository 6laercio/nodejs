class Database {
  #database = {};

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    return data;
  }

  generateId(table) {
    const items = this.select(table);
    return items.length + 1;
  }
}

export default new Database();
