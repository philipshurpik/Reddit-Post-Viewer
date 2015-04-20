var React = require('react');
var actions = require('../actions');
var Bootstrap = require('react-bootstrap');
var { ListGroup, ListGroupItem, Row, Col } = Bootstrap;

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
        var src = this.props.post.thumbnail;
        src = (window.location.protocol === "https:" ? src.replace("http:", "https:") : src);
        return (
        <ListGroup>
            <ListGroupItem>
                <Row>
                    <Col xs={2}>
                        <img src={src} />
                    </Col>
                    <Col xs={10}>
                        <ListGroup>
                            <ListGroupItem><a onClick={this.handleItemClick} href="" className="reddit-post-name">{this.props.post.title}</a></ListGroupItem>
                            <ListGroupItem>
                                Author: {this.props.post.author}&nbsp;
                                Date: {this.state.created}
                            </ListGroupItem>
                            <ListGroupItem>
                                Comments: {this.props.post.num_comments}&nbsp;
                                Score: {this.props.post.score}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup>);
    },
    handleItemClick: function(evt) {
        evt.preventDefault();
        this.context.router.transitionTo('/comments/' + this.props.post.subreddit + '/' + this.props.post.id);
    }
});

module.exports = PostItem;