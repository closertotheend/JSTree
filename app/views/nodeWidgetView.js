var NodeWidgetView = Backbone.View.extend({

    el: DOMHelper.getDefaultAnchor(),
    registry: new NodeRegistry(),
    DOM: DOMHelper,

    initialize: function () {
        if (this.registry.hasPreviousSession()) {
            this.registry.loadState();
        } else {
            this.registry.loadMockState();
        }
    },

    events: {
        "click #reset": 'reset'
    },

    render: function () {
        this.renderDOM();
        this.DOM.hideSubNodes();
        this.setNodesViews();
        return this;
    },

    renderDOM: function () {
        var html = _.reduce(this.registry.getNodes(), function (html, node) {
            return html + node.getHtml();
        }, '');
        this.el.innerHTML = this.DOM.createResetButton() + html;
    },

    setNodesViews: function () {
        var that = this;
        _.map(this.DOM.getAllNodes(), function (node) {
            return new NodeView({el: node, registry: that.registry})
        });
    },

    reset: function () {
        this.registry.loadMockState();
        this.render();
    }

});



