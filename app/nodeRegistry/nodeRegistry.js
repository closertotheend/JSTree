define(['app/model/node.js','app/nodeRegistry/deserializer.js','app/nodeRegistry/serializer.js'], function (Node, Deserializer, Serializer) {

    return Backbone.Collection.extend({
        LOCAL_STORAGE_KEY: "nodeRegistryInfoNew",
        counter: 0,
        allNodes: {},
        nodes: [],

        initialize: function () {
            this.deserializer = new Deserializer(this);
            this.serializer = new Serializer(this);
        },

        setNodes: function (dirtyNodes) {
            var that = this;
            this.nodes = setNodeIdsIfNotSetAndRegisterThem(dirtyNodes);

            function setNodeIdsIfNotSetAndRegisterThem(dirtyNodes) {
                return _(dirtyNodes).map(function (dirtyNode) {
                    if (dirtyNode.doesNotHaveId()) {
                        dirtyNode.set('id', that.generateId());
                        that.registerNode(dirtyNode);
                    }
                    if (dirtyNode.hasChildNodes()) {
                        setNodeIdsIfNotSetAndRegisterThem(dirtyNode.getChildNodes())
                    }
                    return dirtyNode;
                });
            }
        },

        createNode: function (name) {
            var node = new Node({name: name, id: this.generateId()});
            this.registerNode(node);
            return node;
        },

        removeNode: function (node) {
            if (node.isSuperNode()) {
                var nodes = this.getNodes();
                nodes.splice(nodes.indexOf(node), 1);
            } else {
                var childNodes = node.getParentNode().getChildNodes();
                childNodes.splice(childNodes.indexOf(node), 1);
            }
        },

        save: function () {
            var data = this.serializer.serialize();
            localStorage.setItem(this.LOCAL_STORAGE_KEY, data);
            return data;
        },

        hasPreviousSession: function () {
            return localStorage.getItem(this.LOCAL_STORAGE_KEY);
        },

        loadState: function () {
            var deserializedInfo = this.deserializer.deserialize(localStorage.getItem(this.LOCAL_STORAGE_KEY));
            this.setNodes(deserializedInfo.nodes);
            this.counter = parseInt(deserializedInfo.counter);
            return deserializedInfo;
        },

        getNodes: function () {
            return this.nodes;
        },

        getNodeById: function (id) {
            return this.allNodes[id];
        },

        registerNode: function (node) {
            this.allNodes[node.id] = node;
        },

        loadMockState: function () {
            var parent1 = new Node({name: "C:/"});
            var parent2 = new Node({name: "D:/"});
            var nodeJS = new Node({name: "NodeJS"});
            var child1 = new Node({name: "Program Files"});
            child1.addChild(new Node({name: "Java"}));
            child1.addChild(nodeJS);
            nodeJS.addChild(new Node({name: 'Grunt'}));
            nodeJS.addChild(new Node({name: 'Gulp'}));
            parent1.addChild(child1);
            var games = new Node({name: "Games"});
            parent1.addChild(games);
            games.addChild(new Node({name: "Solitare"}));
            this.setNodes([parent1, parent2]);
            this.save();
        },

        generateId: function () {
            return ++this.counter;
        }

    });

});