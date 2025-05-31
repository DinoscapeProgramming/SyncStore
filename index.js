const fs = require("fs");
const path = require("path");

class Database {
  constructor(filePath) {
    this._filePath = path.resolve(filePath);
    this._data = this._load();
    return this._createProxy(this._data);
  };

  _load() {
    try {
      const raw = fs.readFileSync(this._filePath, "utf8");
      return JSON.parse(raw);
    } catch (err) {
      if (err.code === "ENOENT") {
        fs.writeFileSync(this._filePath, "{}", "utf8");
        return {};
      };

      throw err;
    };
  };

  _save() {
    fs.writeFileSync(this._filePath, JSON.stringify(this._data, null, 2), "utf8");
  };

  _createProxy(target) {
    const save = this._save.bind(this);
    const wrap = (object) => new Proxy(object, {
      get(object, prop) {
        const value = object[prop];

        return ((typeof value === "object") && (value !== null)) ? wrap(value) : value;
      },
      set(object, prop, value) {
        object[prop] = value;
        save();

        return true;
      },
      deleteProperty(object, prop) {
        delete object[prop];
        save();

        return true;
      }
    });

    return wrap(target);
  };
};

module.exports = Database;