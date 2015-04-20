var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var NavBar = require('../Main/NavBar');
var actions = require('../actions');
var postStore = require('./postStore');

var PostPage = React.createClass({
    mixins: [Reflux.connect(postStore, "post"), Reflux.listenTo(postStore,"onStoreChange")],
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
        actions.openPost(routeParams.subreddit, routeParams.postId);
    },
    onStoreChange: function (post, status) {
        console.log('store changed');
    },
    render: function () {
        return <div className="postPage">
            <NavBar subreddit={this.state.post.subreddit}/>
            <div>
                <div>{this.state.post.title}</div>
            </div>
        </div>;
    }
});

module.exports = PostPage;