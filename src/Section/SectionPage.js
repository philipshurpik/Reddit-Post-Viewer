var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var PostsList = require('./PostsList');
var NavBar = require('../Main/NavBar');
var actions = require('../actions');
var sectionStore = require('./sectionStore');

var SectionPage = React.createClass({
    mixins: [Reflux.connect(sectionStore, "items"), Reflux.listenTo(sectionStore,"onStoreChange")],
    contextTypes: {
        router: React.PropTypes.func
    },
    componentDidMount() {
        this.openSection();
    },
    componentWillReceiveProps() {
        this.openSection();
    },
    openSection() {
        var routeParams = this.context.router.getCurrentParams();
        actions.openSection(routeParams.subreddit, routeParams.type);
    },
    onStoreChange: function (items, state) {
        this.setState(state);
    },
    render: function () {
        return <div className="sectionPage">
            <NavBar subreddit={this.state.subreddit}/>
            <div>
                <PostsList items={this.state.items} />
            </div>
        </div>;
    }
});

module.exports = SectionPage;