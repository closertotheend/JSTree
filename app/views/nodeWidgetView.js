define(['app/views/nodeView.js', 'app/views/domHelper.js' ,'app/nodeRegistry/nodeRegistry.js'], function (NodeView, DOMHelper, NodeRegistry) {
    return Backbone.View.extend({

        el: DOMHelper.getDefaultAnchor(),
        registry: new NodeRegistry(),

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
            DOMHelper.hideSubNodes();
            this.setNodesViews();
            return this;
        },

        renderDOM: function () {
            var html = _.reduce(this.registry.getNodes(), function (html, node) {
                return html + node.getHtml();
            }, '');
            this.el.innerHTML = DOMHelper.resetButtonTemplate() + html;
        },

        setNodesViews: function () {
            var that = this;
            this.nodeViews = _.map(DOMHelper.getAllNodes(), function (node) {
                return new NodeView({el: node, registry: that.registry})
            });
        },

        reset: function () {
            _.each(this.nodeViews, function (nodeView) {
                nodeView.remove();
            });
            this.registry.loadMockState();
            this.render();
        }

    });
});


