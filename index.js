var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var MainPage = require('./src/Main/MainPage.js');
var SectionPage = require('./src/Section/SectionPage.js');
var PostPage = require('./src/Post/PostPage.js');

var routes = (
    <Route handler={MainPage} path="/">
        <Route name="section" path="/:subreddit" handler={SectionPage}/>
        <Route name="sectionType" path="/:subreddit/t/:type" handler={SectionPage}/>
        <Route name="type" path="/t/:type" handler={SectionPage}/>
        <Route name="post" path="/comments/:subreddit/:postId" handler={PostPage}/>
        <DefaultRoute handler={SectionPage}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('body'));
});

// Register our ServiceWorker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register("./sw.js", {
        scope: "/reddit-viewer/"
    }).then(function (reg) {
        console.log("SW register success", reg);
    }, function (err) {
        console.log("SW register fail", err);
    });
}