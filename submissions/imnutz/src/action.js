"use strict";

var _present;

var action = {
    init: function initAction(present) {
        _present = present;
    },

    handleWebSocketData: function(wsData) {
        var data = {
            planet: wsData.name
        };

        _present(data);
    },

    fetchApprentice: function fetchApprentice() {
        _present({ fetchNextApprentice: true });
    }
};

module.exports = action;