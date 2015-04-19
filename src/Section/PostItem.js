var React = require('react');
var actions = require('../actions');

var PostItem = React.createClass({
    getInitialState: function() {
        return {
            title: "Title",
            date: "date",
            comments: "comments"
        }
    },
    render: function () {
        return (<div>
            <a onClick={this.handleItemClick} href="" className="name">{this.state.title}</a> |
            <span className="date">{this.state.date}</span> |
            <span className="comments">{this.state.comments}</span>
            <p></p>
        </div>);
    },
    handleItemClick: function(evt) {
        evt.preventDefault();
        actions.openPost(this.props.post);
    }
});

module.exports = PostItem;