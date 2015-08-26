
var checkHTML = function (html) {
    var doc = document.createElement('div');
    doc.innerHTML = html;
    return ( doc.innerHTML === html );
};
var paths = ["app/model/node.js", "app/nodeRegistry/nodeRegistry.js", "app/nodeRegistry/serializer.js", "app/nodeRegistry/deserializer.js"];
require(paths, function (Node, NodeRegistry, Serializer, Deserializer) {

    QUnit.module("Node");
    QUnit.test("Should check that adding child to node will add parent to child", function (assert) {
        var parent = new Node({name: 'Parent', id: '1'});
        var child = new Node({name: 'Child', id: '2'});
        parent.addChild(child);
        assert.equal(child.get('parentNode').get('id'), parent.get('id'));
        assert.equal(child.get('parentNode').get('name'), parent.get('name'));
    });

    QUnit.test("Should check that node should not produce malformed html", function (assert) {
        var child1 = new Node({name: 'Child 1', id: '2'});
        var child2 = new Node({name: 'Child 2', id: '3'});
        var parent = new Node({name: 'Parent', id: '1'});
        parent.addChild(child1);
        parent.addChild(child2);
        assert.ok(checkHTML(parent.getHtml()));
    });

    QUnit.test("Should check that node is superNode if does not have parent", function (assert) {
        var parent = new Node({name: 'Parent', id: '1'});
        assert.ok(parent.isSuperNode());
    });

    QUnit.test("Should check if parentnode has childNodes", function (assert) {
        var parent = new Node({name: 'Parent', id: '1'});
        var child1 = new Node({name: 'Child 1', id: '2'});
        parent.addChild(child1);
        assert.ok(parent.hasChildNodes());
        assert.notOk(child1.hasChildNodes());
    });


    QUnit.module("NodeRegistry", {
        beforeEach: function () {
            this.nodeRegistry = new NodeRegistry();
        }
    });
    QUnit.test("Should check that nodeRegistry should give correct ids to nodes", function (assert) {
        var parent1 = this.nodeRegistry.createNode('Parent 1');
        var parent2 = this.nodeRegistry.createNode('Parent 2');
        assert.ok(parent1.id);
        assert.ok(parent2.id);
        assert.notEqual(parent1.id, parent2);
    });

    QUnit.test("Should check that nodeRegistry can retrieve node by id", function (assert) {
        var parent1 = this.nodeRegistry.createNode('Parent 1');
        var nodeFromRegistry = this.nodeRegistry.getNodeById(parent1.id);
        assert.equal(parent1, nodeFromRegistry);
    });

    QUnit.test("Should check that nodeRegistry can delete ordinary and super nodes", function (assert) {
        var parent = this.nodeRegistry.createNode('Parent');
        var child1 = this.nodeRegistry.createNode('Child1');
        var child2 = this.nodeRegistry.createNode('Child2');
        parent.addChild(child1);
        parent.addChild(child2);
        this.nodeRegistry.setNodes([parent]);

        assert.equal(parent.getChildNodes().length, 2);
        this.nodeRegistry.removeNode(child1);
        assert.equal(parent.getChildNodes().length, 1);
        this.nodeRegistry.removeNode(child2);
        assert.equal(parent.getChildNodes().length, 0);

        assert.equal(this.nodeRegistry.getNodes().length, 1);
        this.nodeRegistry.removeNode(parent);
        assert.equal(this.nodeRegistry.getNodes().length, 0);
    });

    QUnit.module("Serilizer and deserializer", {
        beforeEach: function () {
            this.nodeRegistry = new NodeRegistry();
            this.serializer = new Serializer(this.nodeRegistry);
            this.deserilizer = new Deserializer(this.nodeRegistry);
        }
    });

    QUnit.test("Should check that nodeRegistry serializes objects correctly", function (assert) {
        var parent1 = this.nodeRegistry.createNode('Parent1');
        var parent2 = this.nodeRegistry.createNode('Parent2');
        var child1 = this.nodeRegistry.createNode('Child1');
        var child2 = this.nodeRegistry.createNode('Child2');
        parent1.addChild(child1);
        parent1.addChild(child2);
        this.nodeRegistry.setNodes([parent1, parent2]);
        var serializedNodesJSONString = this.serializer.serialize(this.nodeRegistry);
        assert.ok(isJsonString(serializedNodesJSONString));

        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
    });

    QUnit.test("Should check that nodes created without id should get an id after register", function (assert) {
        var parent1 = new Node('Parent1');
        var parent2 = new Node('Parent2');
        var child1 = new Node('Child1');
        var child2 = new Node('Child2');
        parent1.addChild(child1);
        parent1.addChild(child2);

        this.nodeRegistry.setNodes([parent1, parent2]);

        assert.ok(parent1.id);
        assert.ok(parent2.id);
        assert.ok(child1.id);
        assert.ok(child2.id);

        assert.equal(child2, this.nodeRegistry.getNodeById(child2.id));

    });

    QUnit.test("Should check that nodeRegistry deserializes objects correctly", function (assert) {
        var parent1 = this.nodeRegistry.createNode('Parent1');
        var child1 = this.nodeRegistry.createNode('Child1');
        var child2 = this.nodeRegistry.createNode('Child2');
        parent1.addChild(child1);
        parent1.addChild(child2);
        this.nodeRegistry.setNodes([parent1]);
        var serializedNodesJSONString = this.serializer.serialize(this.nodeRegistry);

        var loadState = this.deserilizer.deserialize(serializedNodesJSONString);

        var parent1Deserialized = loadState.nodes[0];
        assert.equal(parent1Deserialized.getId(), parent1.getId());
        assert.equal(parent1Deserialized.getName(), parent1.getName());
        assert.equal(parent1Deserialized.getParentNode(), parent1.getParentNode());
        assert.equal(parent1Deserialized.getChildNodes().length, 2);
        var child1Deserialized = parent1Deserialized.getChildNodes()[0];
        assert.equal(child1Deserialized.getId(), child1.getId());
        assert.equal(child1Deserialized.getName(), child1.getName());
        assert.equal(child1Deserialized.getParentNode(), parent1Deserialized);
        var child2Deserialized = parent1Deserialized.getChildNodes()[1];
        assert.equal(child2Deserialized.getId(), child2.getId());
        assert.equal(child1Deserialized.getParentNode(), parent1Deserialized);

        assert.equal(this.nodeRegistry.getNodeById(parent1Deserialized.id), parent1Deserialized);
        assert.equal(this.nodeRegistry.getNodeById(child1Deserialized.id), child1Deserialized);
        assert.equal(this.nodeRegistry.getNodeById(child2Deserialized.id), child2Deserialized);
    });

    QUnit.test("Should check counter after deserialization", function (assert) {
        var parent1 = this.nodeRegistry.createNode('Parent1');
        this.nodeRegistry.setNodes([parent1]);
        var serializedJson = this.serializer.serialize(this.nodeRegistry);
        var loadState = this.deserilizer.deserialize(serializedJson);

        assert.equal(parent1.id, loadState.counter);
    });

});
