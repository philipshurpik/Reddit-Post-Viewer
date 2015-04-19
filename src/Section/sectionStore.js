var Reflux = require('reflux');
var actions = require('../actions');

var sectionStore = Reflux.createStore({
    list: [],
    init: function () {
        this.listenTo(actions.openSection, this.onOpenSection);
    },
    onOpenSection() {
        this.list.push({title: "title " + (this.list.length + 1), date: "", comment: "ddd"});
        this.trigger(this.list);
    },
    getInitialState: function () {
        console.log('get initial store state');
        this.list = [];
        this.list.push({title: "title 1", date: "", comment: "ddd"});
        this.list.push({title: "title 2", date: "", comment: "ddd"});
        this.list.push({title: "title 3", date: "", comment: "ddd"});
        return this.list;
    }
});

module.exports = sectionStore;