function NodeRegistry() {
    var counter = 0;
    var allNodes = {};
    this.nodes = [];
    this.createNode = function createNode(name) {
        var id = ++counter;
        var node = new Node(name, id);
        allNodes[id] = node;
        return node;
    }
}