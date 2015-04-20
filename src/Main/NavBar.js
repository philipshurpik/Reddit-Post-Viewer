var React = require('react');
var Bootstrap = require('react-bootstrap');
var { Nav, NavItem, Navbar, Input, Col, Button } = Bootstrap;

var NavBar = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function () {
        var link = (this.props.subreddit ? ("#/" + this.props.subreddit + "/t/") : "/#/t/");
        return <Navbar brand='Reddit reader'>
            <Nav bsStyle='pills' activeKey={1}>
                <NavItem eventKey={1} href={link + "hot"}>Hot</NavItem>
                <NavItem eventKey={1} href={link + "new"}>New</NavItem>
                <NavItem eventKey={1} href={link + "top"}>Top</NavItem>
                <NavItem eventKey={1} href={link + "controversial"}>Controversial</NavItem>
            </Nav>
            <Col xs={3}>
                <Input type='text' placeholder='Subreddit'
                    onChange={(evt) => this.setState({newSubReddit: evt.target.value})}
                />
            </Col>
            <Col xs={1}>
                <Button onClick={this.handleEnter}>Go!</Button>
            </Col>
        </Navbar>;
    },
    handleEnter: function() {
        if (this.state.newSubReddit.trim().length > 0) {
            this.context.router.transitionTo("/" + this.state.newSubReddit);
        }
    }
});

module.exports = NavBar;