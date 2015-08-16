function NodeRegistry() {
    var counter = 0;
    this.allNodes = {};
    this.nodes = [];
    this.createNode = function createNode(name) {
        var id = ++counter;
        var node = new Node(name, id);
        this.allNodes[id] = node;
        return node;
    }
}