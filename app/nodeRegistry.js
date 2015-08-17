function NodeRegistry() {
    var counter = 0;
    var allNodes = {};
    var nodes = [];

    this.setNodes = function (dirtyNodes) {
        setNodeIdsIfNotSetAndRegisterThem(dirtyNodes);
        nodes = dirtyNodes;
        this.save();
    };

    this.getNodes = function () {
        return nodes;
    };

    function setNodeIdsIfNotSetAndRegisterThem(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (!node.id) {
                node.id = ++counter;
                allNodes[node.id] = node;
            }
            if(node.hasChildNodes()){
                setNodeIdsIfNotSetAndRegisterThem(node.childNodes)
            }
        }
    }

    this.createNode = function (name) {
        var id = ++counter;
        var node = new Node(name, id);
        allNodes[id] = node;
        this.save();
        return node;
    };

    this.removeNode = function (node) {
        if (node.isSuperNode()) {
            this.getNodes().splice(this.getNodes().indexOf(node), 1);
        } else {
            var childNodes = node.parentNode.childNodes;
            childNodes.splice(childNodes.indexOf(node), 1);
        }
        this.save();
    };

    this.getNodeById = function (id) {
        return allNodes[id];
    };

    this.save = function () {
        var cache = [];
        var nodes = JSON.stringify(this, function (key, value) {
            if (value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = null; // Enable garbage collection
        localStorage.setItem("nodeRegistry", nodes);
    };

}