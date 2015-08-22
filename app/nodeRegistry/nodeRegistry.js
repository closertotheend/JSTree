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
                    setNodeIdsIfNotSetAndRegisterThem(dirtyNode.getChildNodes())
                }
            }
            return cleanNodes;
        }
    };

    this.createNode = function (name) {
        var node = new Node({name: name, id: generateId()});
        this.registerNode(node);
        return node;
    };

    this.removeNode = function (node) {
        if (node.isSuperNode()) {
            var nodes = this.getNodes();
            nodes.splice(nodes.indexOf(node), 1);
        } else {
            var childNodes = node.getParentNode().getChildNodes();
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

    this.loadMockState = function() {
        var parent1 = new Node("C:/");
        var parent2 = new Node("D:/");
        var nodeJS = new Node("NodeJS");
        var child1 = new Node("Program Files");
        child1.addChild(new Node("Java"));
        child1.addChild(nodeJS);
        nodeJS.addChild(new Node('Grunt'));
        nodeJS.addChild(new Node('Gulp'));
        parent1.addChild(child1);
        var games = new Node("Games");
        parent1.addChild(games);
        games.addChild(new Node("Solitare"));
        this.setNodes([parent1, parent2]);
        this.save();
    };

    function generateId() {
        return ++that.counter;
    }

}