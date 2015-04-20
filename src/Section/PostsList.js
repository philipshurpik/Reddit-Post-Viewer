var React = require('react');
var PostItem = require('./PostItem');

var PostsList = React.createClass({
    render() {
        var postNodes = this.props.items.map(function (item) {
            return <PostItem post={item.data} key={item.data.name}></PostItem>
        });
        return <div className="postsList">
            {postNodes}
        </div>
    }
});

module.exports = PostsList;