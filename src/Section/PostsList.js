var React = require('react');
var PostItem = require('./PostItem');

var PostsList = React.createClass({
    render() {
        var postNodes = this.props.items.map(function (post) {
            return <PostItem post={post} key={post.key}></PostItem>
        });
        return <div className="postsList">
            {postNodes}
        </div>
    }
});

module.exports = PostsList;