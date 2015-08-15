var nodeRegistry = new NodeRegistry();
nodeRegistry.nodes = mockNodes();

var nodeView = new NodeView(nodeRegistry);
nodeView.render();

function mockNodes() {
    return [parent(), nodeRegistry.createNode("D:/")];
    function parent() {
        var parent1 = nodeRegistry.createNode("C:/");
        var child11 = nodeRegistry.createNode("Java");
        var child12 = nodeRegistry.createNode("NodeJS");
        var child1 = nodeRegistry.createNode("Program Files");
        child1.addChild(child11);
        child1.addChild(child12);
        parent1.addChild(child1);
        parent1.addChild(nodeRegistry.createNode("Games"));
        return parent1;
    }
}
