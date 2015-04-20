var React = require('react');
var actions = require('../actions');

var PostItem = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState: function() {
        return {
            created: (new Date(this.props.post.created)).toLocaleString()
        }
    },
    render: function () {
        return (<div>
            <img src={this.props.post.thumbnail} />
            <a onClick={this.handleItemClick} href="" className="reddit-post-name">{this.props.post.title}</a><br/>
            <span className="reddit-post-author">{this.props.post.author}</span> |
            <span className="reddit-post-date">{this.state.created}</span> |
            <span className="reddit-post-comments">{this.props.post.num_comments}</span> |
            <span className="reddit-post-score">{this.props.post.score}</span>
            <p></p>
        </div>);
    },
    handleItemClick: function(evt) {
        evt.preventDefault();
        this.context.router.transitionTo('/comments/' + this.props.post.subreddit + '/' + this.props.post.id);
    }
});

module.exports = PostItem;