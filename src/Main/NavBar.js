var React = require('react');
var Bootstrap = require('react-bootstrap');
var { Nav, NavItem, Navbar, Input, Col } = Bootstrap;

var NavBar = React.createClass({
    getInitialState() {
        return {subreddit: ""};
    },
    componentWillReceiveProps() {
        if (this.props.subreddit && this.props.subreddit.length > 0) {
            this.setState({subreddit: this.props.subreddit});
        }
    },
    render: function () {
        var link = (this.props.subreddit ? ("/#/" + this.props.subreddit + "/t/") : "/#/t/");
        return <Navbar brand='Reddit reader'>
            <Nav bsStyle='pills' activeKey={1}>
                <NavItem eventKey={1} href={link + "hot"}>Hot</NavItem>
                <NavItem eventKey={1} href={link + "new"}>New</NavItem>
                <NavItem eventKey={1} href={link + "top"}>Top</NavItem>
                <NavItem eventKey={1} href={link + "controversial"}>Controversial</NavItem>
            </Nav>
            <Col xs={3}>
                <Input type='text' placeholder='Subreddit' value={this.state.subreddit} />
            </Col>
        </Navbar>;
    }
});

module.exports = NavBar;