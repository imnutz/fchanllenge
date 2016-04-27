"use strict";

var reqwest = require("reqwest");

var url = "http://localhost:3000/dark-jedis";

var model = {
    sithsOnPage: 5,
    planet: "",
    siths: [],

    lastFetchedSith: null,
    disabledUp: false,
    disabledDown: false
};

var _render,
    _ws;

model.setRender = function setRender(render) {
    _render = render;
};

model.present = function present(data) {
    if(data.planet) {
        model.planet = data.planet;
        _render(model)
    }

    if(data.fetchNextApprentice) {
        model.fetchApprentice();
    }
};

model.init = function initModel() {
    _ws = new WebSocket("ws://localhost:4000");
    _ws.onmessage = function (event) {
        model.planet = (JSON.parse(event.data)).name;
        _render(model);
    };

    this.getFirstSith();

    return model;
};

// services
model.getFirstSith = function getFirstSith() {
    model.getSith([url, 3616].join("/"))
         .then(function(response) {
            model.siths.push(response);
            model.lastFetchedSith = response;

            if(response.apprentice.id) {
                model.shouldFetchApprentice = true;
            }

            _render(model);
         });
};

model.fetchApprentice = function fetchApprentice() {
    model.getSith(model.lastFetchedSith.apprentice.url)
         .then(function(response) {
            model.siths.push(response);
            model.lastFetchedSith = response;
            if(response.apprentice.id) {
                if(model.siths.length < model.sithsOnPage) {
                    model.shouldFetchApprentice = true;
                } else {
                    model.shouldFetchApprentice = false;
                }
            } else {
                model.shouldFetchApprentice = false;
                model.disabledDown = true;
            }

            _render(model);
         });
}

model.getSith = function getSith(url) {
    return reqwest(url)
};

module.exports = model;