function NodeRegistry() {
    var counter = 0;
    var allNodes = {};
    var nodes = [];
    var that = this;

    this.setNodes = function (dirtyNodes) {
        setNodeIdsIfNotSetAndRegisterThem(dirtyNodes);
        nodes = dirtyNodes;
    };

    this.getNodes = function () {
        return nodes;
    };

    function registerNode(node) {
        allNodes[node.id] = node;
    }

    function setNodeIdsIfNotSetAndRegisterThem(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (!node.id) {
                node.id = ++counter;
                registerNode(node);
            }
            if(node.hasChildNodes()){
                setNodeIdsIfNotSetAndRegisterThem(node.childNodes)
            }
        }
    }

    this.createNode = function (name) {
        var id = ++counter;
        var node = new Node(name, id);
        registerNode(node);
        return node;
    };

    this.removeNode = function (node) {
        if (node.isSuperNode()) {
            var nodes = this.getNodes();
            nodes.splice(nodes.indexOf(node), 1);
        } else {
            var childNodes = node.parentNode.childNodes;
            childNodes.splice(childNodes.indexOf(node), 1);
        }
    };

    this.getNodeById = function (id) {
        return allNodes[id];
    };

    this.save = function () {
        var data = serialize();
        localStorage.setItem("nodeRegistryInfo", data);
        return data;
    };

    function serialize() {
        var cache = [];
        var nodes = JSON.stringify(that.getNodes(), function (key, value) {
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
        return JSON.stringify({nodes: nodes, counter: counter});
    }

    this.loadState = function () {
        var deserializedInfo = this.deserialize();
        this.setNodes(deserializedInfo.nodes);
        that.counter = parseInt(deserializedInfo.counter);
        return deserializedInfo;
    };

    this.deserialize = function () {
        var info = JSON.parse(localStorage.getItem("nodeRegistryInfo"));
        var jsonNodes = JSON.parse(info.nodes);

        var nodes = [];
        for (var i = 0; i < jsonNodes.length; i++) {
            var badNode = jsonNodes[i];
            var node = deserializeJsonNode(badNode);
            nodes.push(node);
        }
        return {counter: JSON.parse(info.counter), nodes: nodes};
    };

    function deserializeJsonNode(jsonNode) {
        var node = new Node(jsonNode.name, jsonNode.id);
        allNodes[node.id] = node;
        if (jsonNode.childNodes.length != 0) {
            for (var i = 0; i < jsonNode.childNodes.length; i++) {
                var badNodeChild = jsonNode.childNodes[i];
                node.addChild(deserializeJsonNode(badNodeChild));
            }
        }
        return node;
    }


}