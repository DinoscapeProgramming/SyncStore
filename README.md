# SyncStore

**SyncStore** is a minimalist, zero-dependency JSON store for Node.js that automatically syncs changes to disk using JavaScript's `Proxy`. It supports both **objects and arrays**, making it perfect for prototyping, small tools, local data persistence, and simple data storage.

## 🚀 Features

* 🔁 Auto-saves to file on every change
* ⚡ In-memory caching for fast access
* 🪞 Fully proxied — use it like a normal object or array
* 📦 Supports objects, arrays, and nested data
* 🎯 Custom default values for new stores
* 🧩 Zero dependencies

## 📦 Installation

```bash
npm install syncstore.json
```

## 🛠️ Usage

### Objects

```js
const SyncStore = require("syncstore.json");

const db = new SyncStore("./data.json");

db.username = "Alice";
db.settings = {
  darkMode: true
};

delete db.username;

console.log(db.settings.darkMode); // true
```

All changes are saved immediately to `data.json`.

### Arrays

You can create an array-based store by passing an array as the default value:

```js
const SyncStore = require("syncstore.json");

const db = new SyncStore("./data.json", []);

db.push("Alice");
db.push("Bob");

db[0] = "Charlie";

console.log(db);
// ["Charlie", "Bob"]
```

Array methods such as `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, and `reverse` are automatically persisted to disk.

### Custom Defaults

The second argument determines the default value used when the file does not exist.

```js
const db = new SyncStore("./data.json", {
  users: [],
  settings: {
    darkMode: false
  }
});
```

If `data.json` does not exist, SyncStore creates it using the provided default value.

The default value is `{}` when none is provided:

```js
const db = new SyncStore("./data.json");
```

## 📁 File Format

The backing file is standard JSON.

For an object store:

```json
{
  "username": "Alice",
  "settings": {
    "darkMode": true
  }
}
```

For an array store:

```json
[
  "Alice",
  "Bob",
  "Charlie"
]
```

Nested objects and arrays are also automatically proxied, so changes to nested data are persisted as well.

## ✅ Use Cases

* CLI tools
* Quick local apps
* Prototyping databases
* Config or settings storage
* Small local data stores
* JSON-backed collections

## 📜 License

MIT © DinoscapeProgramming