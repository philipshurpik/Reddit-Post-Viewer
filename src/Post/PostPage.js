var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var Bootstrap = require('react-bootstrap');
var { Panel, ListGroup } = Bootstrap;
var NavBar = require('../Main/NavBar');
var Comment = require('./Comment');
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
        var commentNodes;
        if (this.state.post && this.state.post.comments) {
            commentNodes = this.state.post.comments.map(function (item) {
                return <Comment comment={item.data} key={item.data.id}></Comment>
            });
        }
        return <div className="postPage">
            <NavBar subreddit={this.state.post.subreddit}/>
            <Panel header={this.state.post.title} bsStyle='success'>
                <ListGroup>
                    {commentNodes}
                </ListGroup>
            </Panel>
        </div>;
    }
});

module.exports = PostPage;