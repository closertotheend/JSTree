var nodeView = new NodeView();
nodeView.draw(mockNodes());

function mockNodes() {
    var nodeRegistry = new NodeRegistry();
    return [parent(), nodeRegistry.createNode("Parent 9000")];
    function parent() {
        var parent1 = nodeRegistry.createNode("Parent 2");
        var child11 = nodeRegistry.createNode("Child 1 1");
        var child12 = nodeRegistry.createNode("Child 1 2");
        var child1 = nodeRegistry.createNode("Child 1");
        child1.addChild(child11);
        child1.addChild(child12);
        parent1.addChild(child1);
        parent1.addChild(nodeRegistry.createNode("Child 2"));
        return parent1;
    }
}
