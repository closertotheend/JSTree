var nodeRegistry = new NodeRegistry();

var parent1 = nodeRegistry.createNode("C:/");
var parent2 = nodeRegistry.createNode("D:/");
var child11 = nodeRegistry.createNode("Java");
var child12 = nodeRegistry.createNode("NodeJS");
var child1 = nodeRegistry.createNode("Program Files");
child1.addChild(child11);
child1.addChild(child12);
parent1.addChild(child1);
parent1.addChild(nodeRegistry.createNode("Games"));

nodeRegistry.nodes = [parent1, parent2];

var nodeView = new NodeView(nodeRegistry);
nodeView.render();

