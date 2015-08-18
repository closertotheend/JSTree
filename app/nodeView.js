function NodeView(nodeRegistry, anchorId) {
    var anchor = anchorId ? document.getElementById(anchorId) : DOMHelper.getDefaultAnchor();
    var registry = nodeRegistry ? nodeRegistry : new NodeRegistry();
    var DOM = DOMHelper;
    var that = this;

    this.render = function () {
        if (registry.hasPreviousSession()) {
            registry.loadState();
        } else {
            registry.loadMockState();
        }
        renderDOM();
        setNodesHandlers();
        setResetButtonHandler();
        DOM.hideSubNodes();
    };

    function renderDOM() {
        var nodes = registry.getNodes();
        var html = '';
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            html += node.getHtml();
        }
        anchor.innerHTML = DOM.createResetButton() + html;
    }

    function setNodesHandlers() {
        var nodes = DOM.getAllNodes();
        for (var i = 0; i < nodes.length; i++) {
            new NodeEventHandler(nodes[i], registry);
        }
    }

    function setResetButtonHandler() {
        DOM.getResetButton().addEventListener('click', function (e) {
            registry.loadMockState();
            that.render();
        });
    }

}



