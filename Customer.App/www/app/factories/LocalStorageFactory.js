angular.module("eahara")
    .factory("LocalStorageFactory", function () {
        var storage = window.localStorage;

        var _getAll = function () {
            //return $localStorage.things;
        };
        var _add = function (key, value) {
            var _value = JSON.stringify(value);
            storage.setItem(key, _value);
        }
        var _remove = function (key) {
            storage.removeItem(key);
        }
        var _get = function (key) {
            var _value = JSON.parse(storage.getItem(key));
            return _value;
        }
        var _clearAll = function (key) {
            storage.clear();
        }
        return {
            getAll: _getAll,
            set: _add,
            remove: _remove,
            get: _get,
            clearAll: _clearAll
        };
    })
