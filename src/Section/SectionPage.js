var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var PostsList = require('./PostsList');
var actions = require('../actions');
var sectionStore = require('./sectionStore');

var SectionPage = React.createClass({
    mixins: [Reflux.connect(sectionStore, "items"), Reflux.listenTo(sectionStore,"onStoreChange")],
    componentDidMount() {
        actions.openSection();
    },
    onStoreChange: function (items, state) {
        console.log('store changed');
        this.setState(state);
    },
    render: function () {
        return <div className="sectionPage">
            <div>
                Navigation bar
            </div>
            <div>
                <PostsList items={this.state.items} />
            </div>
            <div>Tab bar</div>
        </div>;
    }
});

module.exports = SectionPage;