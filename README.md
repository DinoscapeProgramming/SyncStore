# SyncStore

**SyncStore** is a minimalist, zero-dependency JSON store for Node.js that automatically syncs changes to disk using JavaScript's Proxy. Perfect for prototyping, small tools, and local data persistence.

## 🚀 Features

- 🔁 Auto-saves to file on every change
- ⚡ In-memory caching for fast access
- 🪞 Fully proxied — just use it like a normal object
- 🧩 Zero dependencies

## 📦 Installation

```bash
npm install syncstore.json
```

## 🛠️ Usage

```js
const SyncStore = require("syncstore.json");
const db = new SyncStore("./data.json");

// Use it like a regular object
db.username = "Alice";
db.settings = { darkMode: true };
delete db.username;

console.log(db.settings.darkMode); // true
```

All changes are saved immediately to `data.json`.

## 📁 File Format

The backing file is standard JSON:

```json
{
  "settings": {
    "darkMode": true
  }
}
```

## ✅ Use Cases

* CLI tools
* Quick local apps
* Prototyping databases
* Config or settings storage

## 📜 License

MIT © DinoscapeProgramming