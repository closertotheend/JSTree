var nodeRegistry = new NodeRegistry();

var parent1 = new Node("C:/");
var parent2 = new Node("D:/");
var child11 = new Node("Java");
var child12 = new Node("NodeJS");
var child1 = new Node("Program Files");
child1.addChild(child11);
child1.addChild(child12);
parent1.addChild(child1);
parent1.addChild(new Node("Games"));
nodeRegistry.setNodes([parent1, parent2]);

var nodeView = new NodeView(nodeRegistry);
nodeView.render();

