"use strict";

var reqwest = require("reqwest");

var url = "http://localhost:3000/dark-jedis";

var _present;

var action = {
    init: function initAction(present) {
        _present = present;
    },

    handleWebSocketData: function(wsData) {
        var data = {
            hasWebSocketData: true,
            planet: wsData
        };

        _present(data);
    },

    fetchSith: function fetchSith(sithId) {
        reqwest([url, sithId].join("/"))
            .then(function(response) {
                _present({ sith: response });
            });
    },

    moveUp: function moveUp() {
        _present({ moveUp: true });
    },

    moveDown: function moveUp() {
        _present({ moveDown: true });
    },

    toggleUpDown: function toggleUpDown() {
        _present({ shouldToggleUpDown: true });
    }
};

module.exports = action;