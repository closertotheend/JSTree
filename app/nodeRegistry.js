function NodeRegistry() {
    var counter = 0;
    var allNodes = {};
    this.nodes = [];
    this.createNode = function (name) {
        var id = ++counter;
        var node = new Node(name, id);
        allNodes[id] = node;
        return node;
    };

    this.removeNode = function (node) {
        if (node.isSuperNode()) {
            this.nodes.splice(this.nodes.indexOf(node), 1);
        } else {
            var childNodes = node.parentNode.childNodes;
            childNodes.splice(childNodes.indexOf(node), 1);
        }
    };

    this.getNodeById = function(id){
        return allNodes[id];
    };

}