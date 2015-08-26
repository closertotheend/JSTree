define(['app/model/node.js'], function (Node) {
    return function Deserializer(registry) {
        this.registry = registry;
        var that = this;

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
            var node = new Node({name: jsonNode.name, id: jsonNode.id});
            that.registry.registerNode(node);
            if (jsonNode.childNodes && jsonNode.childNodes.length != 0) {
                _.each(jsonNode.childNodes, function (badNodeChild) {
                    node.addChild(deserializeJsonNode(badNodeChild));

                });
            }
            return node;
        }
    }
});