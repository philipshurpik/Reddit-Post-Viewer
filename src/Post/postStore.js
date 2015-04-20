var Reflux = require('reflux');
var actions = require('../actions');

var sectionStore = Reflux.createStore({
    init() {
        this.listenTo(actions.openPost.postLoaded, this.onPostLoaded);
        this.listenTo(actions.openPost.postFailed, this.onPostFailed);
    },
    onPostLoaded(post) {
        this.trigger(post, 'success');
    },
    onPostFailed() {
        this.trigger({}, 'failed');
    },
    getInitialState() {
        return {};
    }
});

module.exports = sectionStore;