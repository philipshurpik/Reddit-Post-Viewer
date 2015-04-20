var Reflux = require('reflux');

var actions = Reflux.createActions({
    "openSection": { children: ["sectionLoaded", "sectionFailed"] },
    "openPost": { children: ["postLoaded", "postFailed"] }
});

module.exports = actions;