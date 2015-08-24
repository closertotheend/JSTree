var NodeWidgetView = Backbone.View.extend({

    el: DOMHelper.getDefaultAnchor(),
    registry: new NodeRegistry(),
    DOM: DOMHelper,
    that: this,

    initialize: function () {
        if (this.registry.hasPreviousSession()) {
            this.registry.loadState();
        } else {
            this.registry.loadMockState();
        }
    },

    render: function () {
        this.renderDOM();
        this.DOM.hideSubNodes();
        this.setNodesHandlers();
        this.setResetButtonHandler();
        return this;
    },

    renderDOM: function () {
        var that = this;
        var html = _.reduce(that.registry.getNodes(), function (html, node) {
            return html + node.getHtml();
        }, '');
        this.el.innerHTML = this.DOM.createResetButton() + html;
    },

    setNodesHandlers: function () {
        var that = this;
        _.map(this.DOM.getAllNodes(), function(node){ return new NodeEventHandler(node, that.registry) });
    },

    setResetButtonHandler: function () {
        var that = this;
        this.DOM.getResetButton().addEventListener('click', function (e) {
            that.registry.loadMockState();
            that.render();
        });
    }

});



