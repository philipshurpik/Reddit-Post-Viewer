var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var PostsList = require('./PostsList');
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
        var link = (this.state.subreddit ? ("/#/" + this.state.subreddit + "/t/") : "/#/t/");
        return <div className="sectionPage">
            <div>
                <a href={link + "hot"}>Hot</a>
                <a href={link + "new"}>New</a>
                <a href={link + "top"}>Top</a>
                <a href={link + "controversial"}>Controversial</a>
            </div>
            <div>
                <PostsList items={this.state.items} />
            </div>
        </div>;
    }
});

module.exports = SectionPage;