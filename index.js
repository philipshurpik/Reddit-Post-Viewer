var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var MainPage = require('./src/Main/MainPage.js');
var SectionPage = require('./src/Section/SectionPage.js');

var routes = (
    <Route handler={MainPage}>
        <DefaultRoute handler={SectionPage}/>
        <Route name="section" handler={SectionPage}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('body'));
});