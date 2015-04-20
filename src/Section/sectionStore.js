var Reflux = require('reflux');
var reddit = require('reddit.js') && window.reddit;
var actions = require('../actions');

var sectionStore = Reflux.createStore({
    data: {},
    posts: [],
    init() {
        this.listenTo(actions.openSection, this.onOpenSection);
        this.listenTo(actions.openPost, this.onOpenPost);
    },
    onOpenSection(subreddit, type) {
        type = type || "hot";
        subreddit = subreddit || undefined;
        reddit[type](subreddit).limit(25).fetch((res) => {
            this.data = res.data;
            this.trigger(this.data.children, {subreddit: subreddit});
            this.data.children.forEach(item =>
                reddit.comments(item.data.id, item.data.subreddit).sort("new").fetch(this.handleCommentFetched.bind(this, item.data.id))
            );
        }, (err) => {

        });
    },
    onOpenPost(subreddit, postId) {
        var posts = this.posts.filter((item) => {
            return item.id === postId;
        });
        if (posts.length > 0) {
            actions.openPost.postLoaded(posts[0]);
        }
        else {
            reddit.comments(postId, subreddit).sort("new").fetch((responseArray) => {
                    if (responseArray.length >= 2) {
                        var post = responseArray[0].data.children[0].data;
                        post.comments = responseArray[1].data.children;
                        actions.openPost.postLoaded(post);
                    }
                }
            );
        }
    },
    getInitialState() {
        return [];
    },
    handleCommentFetched(postId, responseArray) {
        if (responseArray.length >= 2) {
            var post = responseArray[0].data.children[0].data;
            post.comments = responseArray[1].data.children;
            this.posts.push(post);
        }
    }

});

module.exports = sectionStore;