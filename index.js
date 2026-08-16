const fs = require("fs");
const path = require("path");

class Database {
  constructor(filePath, defaultValue = {}) {
    this._filePath = path.resolve(filePath);
    this._defaultValue = defaultValue;
    this._data = this._load();

    return this._createProxy(this._data);
  };

  _load() {
    try {
      const rawData = fs.readFileSync(this._filePath, "utf8");

      return JSON.parse(rawData);
    } catch (error) {
      if (error.code === "ENOENT") {
        fs.mkdirSync(
          path.dirname(this._filePath),
          { recursive: true }
        );

        fs.writeFileSync(
          this._filePath,
          JSON.stringify(this._defaultValue, null, 2),
          "utf8"
        );

        return this._defaultValue;
      };

      throw error;
    };
  };

  _save() {
    fs.writeFileSync(
      this._filePath,
      JSON.stringify(this._data, null, 2),
      "utf8"
    );
  };

  _createProxy(target) {
    const save = this._save.bind(this);

    const wrap = (value) => {
      if (
        (value === null) ||
        (typeof value !== "object")
      ) return value;

      return new Proxy(value, {
        get(object, property) {
          const value = object[property];

          if (
            (value !== null) &&
            (typeof value === "object")
          ) return wrap(value);

          if (
            Array.isArray(object) &&
            (typeof value === "function") &&
            [
              "push",
              "pop",
              "shift",
              "unshift",
              "splice",
              "sort",
              "reverse",
              "copyWithin",
              "fill"
            ].includes(property)
          ) {
            return (...argumentsList) => {
              const result = Array.prototype[property].apply(
                object,
                argumentsList
              );

              save();

              return result;
            };
          };

          return value;
        },

        set(object, property, value) {
          object[property] = value;

          save();

          return true;
        },

        deleteProperty(object, property) {
          delete object[property];

          save();

          return true;
        }
      });
    };

    return wrap(target);
  };
};

module.exports = Database;