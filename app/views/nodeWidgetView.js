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

    render: function () {
        this.renderDOM();
        this.DOM.hideSubNodes();
        this.setNodesViews();
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

    setNodesViews: function () {
        var that = this;
        _.map(this.DOM.getAllNodes(), function (node) {
            return new NodeView({el: node, registry: that.registry})
        });
    },

    setResetButtonHandler: function () {
        var that = this;
        this.DOM.getResetButton().addEventListener('click', function () {
            that.registry.loadMockState();
            that.render();
        });
    }

});



