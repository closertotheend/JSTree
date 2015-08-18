function NodeRegistry() {
    this.counter = 0;
    var allNodes = {};
    var nodes = [];
    var that = this;
    var LOCAL_STORAGE_KEY = "nodeRegistryInfo";

    this.setNodes = function (dirtyNodes) {
        nodes = setNodeIdsIfNotSetAndRegisterThem(dirtyNodes);
    };

    function setNodeIdsIfNotSetAndRegisterThem(dirtyNodes) {
        var cleanNodes = [];
        for (var i = 0; i < dirtyNodes.length; i++) {
            var dirtyNode = dirtyNodes[i];
            if (dirtyNode.doesNotHaveId()) {
                dirtyNode.id = generateId();
                registerNode(dirtyNode);
            }
            cleanNodes.push(dirtyNode);
            if (dirtyNode.hasChildNodes()) {
                setNodeIdsIfNotSetAndRegisterThem(dirtyNode.childNodes)
            }
        }
        return cleanNodes;
    }

    this.createNode = function (name) {
        var node = new Node(name, generateId());
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

    this.save = function () {
        var data = this.serialize();
        localStorage.setItem(LOCAL_STORAGE_KEY, data);
        return data;
    };

    this.serialize = function() {
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
        return JSON.stringify({nodes: nodes, counter: that.counter});
    };

    this.hasPreviousSession = function () {
        return localStorage.getItem(LOCAL_STORAGE_KEY);
    };

    this.loadState = function () {
        var deserializedInfo = this.deserialize(localStorage.getItem(LOCAL_STORAGE_KEY));
        this.setNodes(deserializedInfo.nodes);
        that.counter = parseInt(deserializedInfo.counter);
        return deserializedInfo;
    };

    this.deserialize = function (json) {
        var info = JSON.parse(json);
        var jsonNodes = JSON.parse(info.nodes);
        var nodes = deserializeJsonNodes(jsonNodes);
        return {counter: JSON.parse(info.counter), nodes: nodes};
    };

    function deserializeJsonNodes(jsonNodes) {
        var nodes = [];
        for (var i = 0; i < jsonNodes.length; i++) {
            var badNode = jsonNodes[i];
            var node = deserializeJsonNode(badNode);
            nodes.push(node);
        }
        return nodes;
    }

    function deserializeJsonNode(jsonNode) {
        var node = new Node(jsonNode.name, jsonNode.id);
        registerNode(node);
        if (jsonNode.childNodes && jsonNode.childNodes.length != 0) {
            for (var i = 0; i < jsonNode.childNodes.length; i++) {
                var badNodeChild = jsonNode.childNodes[i];
                node.addChild(deserializeJsonNode(badNodeChild));
            }
        }
        return node;
    }

    this.getNodes = function () {
        return nodes;
    };

    this.getNodeById = function (id) {
        return allNodes[id];
    };

    function registerNode(node) {
        allNodes[node.id] = node;
    }

    function generateId() {
        return ++that.counter;
    }


}