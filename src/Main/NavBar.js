var React = require('react');

var NavBar = React.createClass({
    render: function () {
        var link = (this.props.subreddit ? ("/#/" + this.props.subreddit + "/t/") : "/#/t/");
        return <div>
            <a href={link + "hot"}>Hot</a>
            <a href={link + "new"}>New</a>
            <a href={link + "top"}>Top</a>
            <a href={link + "controversial"}>Controversial</a>
        </div>;
    }
});

module.exports = NavBar;