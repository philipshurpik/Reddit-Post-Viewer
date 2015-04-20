var React = require('react');
var actions = require('../actions');
var Bootstrap = require('react-bootstrap');
var { ListGroupItem, Row, Col } = Bootstrap;

var Comment = React.createClass({
    render: function () {
        return (<ListGroupItem>
            <Row>
                <Col xs={3}>{this.props.comment.author}</Col>
                <Col xs={9}>{this.props.comment.body}</Col>
            </Row>
        </ListGroupItem>);
    }
});

module.exports = Comment;