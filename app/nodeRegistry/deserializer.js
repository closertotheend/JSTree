define(['app/model/node.js'], function (Node) {
    return function(registry) {
        this.registry = registry;
        var that = this;

        this.deserializeJson = function (json) {
            var parsedJson = JSON.parse(json);
            var jsonNodes = JSON.parse(parsedJson.nodes);
            var nodes = deserializeJsonNodes(jsonNodes);
            return {counter: JSON.parse(parsedJson.counter), nodes: nodes};
        };

        function deserializeJsonNodes(jsonNodes) {
            return _.map(jsonNodes, function (jsonNode) {
                return deserializeJsonNode(jsonNode)
            });
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