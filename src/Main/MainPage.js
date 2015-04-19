var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var Main = React.createClass({
    render() {
        return <div className="main">
            <RouteHandler />
        </div>;
    }
});

module.exports = Main;