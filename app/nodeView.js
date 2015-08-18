function NodeView(nodeRegistry, anchorId) {
    var anchor = anchorId ? document.getElementById(anchorId) : DOMHelper.getDefaultAnchor();
    var registry = nodeRegistry ? nodeRegistry : new NodeRegistry();
    var DOM = DOMHelper;
    var that = this;

    this.render = function () {
        if (registry.hasPreviousSession()) {
            registry.loadState();
        } else {
            createMockNodes();
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
            createMockNodes();
        });
    }

    function createMockNodes() {
        var parent1 = new Node("C:/");
        var parent2 = new Node("D:/");
        var nodeJS = new Node("NodeJS");
        var child1 = new Node("Program Files");
        child1.addChild(new Node("Java"));
        child1.addChild(nodeJS);
        nodeJS.addChild(new Node('Grunt'));
        nodeJS.addChild(new Node('Gulp'));
        parent1.addChild(child1);
        var games = new Node("Games");
        parent1.addChild(games);
        games.addChild(new Node("Solitare"));
        registry.setNodes([parent1, parent2]);
        registry.save();
        that.render();
    }
}



