"use strict";

var h = require("snabbdom/h");

var header = function(planet) {
    return h("h1.css-planet-monitor", "Obi-wan currently on " + planet);
};

var sithRow = function(sith) {
    var name = "",
        homeWorld = "";

    if(sith.name) {
        name = sith.name;
    }

    if(sith.homeworld) {
        homeWorld = "Homeworld: " + String(sith.homeworld.name);
    }

    return h("li.css-slot", [
        h("h3", String(name)),
        h("h6", homeWorld)
    ]);
};

var sithList = function(siths) {
    return h("ul.css-slots", siths.map(sithRow));
};

var buttons = function(disabledUp, disabledDown) {
    return h("div.css-scroll-buttons", [
        h("button.css-button-up", {class:{"css-button-disabled":disabledUp}, props:{disabled:disabledUp}}),
        h("button.css-button-down", {class:{"css-button-disabled":disabledDown}, props:{disabled:disabledDown}}),
    ]);
};

module.exports = {
    header: header,
    sithList: sithList,
    buttons: buttons
};