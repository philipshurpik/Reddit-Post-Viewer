var Reflux = require('reflux');

var actions = Reflux.createActions({
    "openSection": { children: ["sectionLoaded", "sectionFailed"] },
    "openPost": {}
});

module.exports = actions;