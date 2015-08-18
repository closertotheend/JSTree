function NodeRegistry() {
    var LOCAL_STORAGE_KEY = "nodeRegistryInfo";

    this.counter = 0;
    var allNodes = {};
    var nodes = [];
    var that = this;
    var deserializer = new Deserializer(this);
    var serializer = new Serializer(this);

    this.setNodes = function (dirtyNodes) {
        nodes = setNodeIdsIfNotSetAndRegisterThem(dirtyNodes);

        function setNodeIdsIfNotSetAndRegisterThem(dirtyNodes) {
            var cleanNodes = [];
            for (var i = 0; i < dirtyNodes.length; i++) {
                var dirtyNode = dirtyNodes[i];
                if (dirtyNode.doesNotHaveId()) {
                    dirtyNode.id = generateId();
                    that.registerNode(dirtyNode);
                }
                cleanNodes.push(dirtyNode);
                if (dirtyNode.hasChildNodes()) {
                    setNodeIdsIfNotSetAndRegisterThem(dirtyNode.childNodes)
                }
            }
            return cleanNodes;
        }
    };

    this.createNode = function (name) {
        var node = new Node(name, generateId());
        this.registerNode(node);
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
        var data = serializer.serialize();
        localStorage.setItem(LOCAL_STORAGE_KEY, data);
        return data;
    };

    this.hasPreviousSession = function () {
        return localStorage.getItem(LOCAL_STORAGE_KEY);
    };

    this.loadState = function () {
        var deserializedInfo = deserializer.deserialize(localStorage.getItem(LOCAL_STORAGE_KEY));
        this.setNodes(deserializedInfo.nodes);
        that.counter = parseInt(deserializedInfo.counter);
        return deserializedInfo;
    };

    this.getNodes = function () {
        return nodes;
    };

    this.getNodeById = function (id) {
        return allNodes[id];
    };

    this.registerNode = function (node){
        allNodes[node.id] = node;
    };

    function generateId() {
        return ++that.counter;
    }

}