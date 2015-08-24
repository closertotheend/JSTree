var NodeView = Backbone.View.extend({

    el: DOMHelper.getDefaultAnchor(),
    registry: new NodeRegistry(),
    DOM: DOMHelper,

    render: function () {
        if (this.registry.hasPreviousSession()) {
            this.registry.loadState();
        } else {
            this.registry.loadMockState();
        }
        this.renderDOM();
        this.setNodesHandlers();
        this.setResetButtonHandler();
        this.DOM.hideSubNodes();
    },

    renderDOM: function () {
        var nodes = this.registry.getNodes();
        var html = '';
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            html += node.getHtml();
        }
        this.el.innerHTML = this.DOM.createResetButton() + html;
    },

    setNodesHandlers: function () {
        var nodes = this.DOM.getAllNodes();
        for (var i = 0; i < nodes.length; i++) {
            new NodeEventHandler(nodes[i], this.registry);
        }
    },

    setResetButtonHandler: function () {
        var that = this;
        this.DOM.getResetButton().addEventListener('click', function (e) {
            that.registry.loadMockState();
            that.render();
        });
    }

});



