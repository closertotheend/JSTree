function Node(id, name) {
    this.name = name;
    this.parentNode = null;
    this.id = id;
    var that = this;
    var childNodes = [];

    this.getHtml = function () {
        var html = startingDiv();
        html += '<span class="node-collapse"></span>';

        if (isSuperNode()) {
            html += '<span class="super-node-name">' + name + '</span>';
        } else {
            html += '<span class="sub-node-name">' + name + '</span>';
        }

        html += '<span class="add-node"></span><span class="remove-node"></span>';
        if (hasChildNodes()) {
            for (var i = 0; i < childNodes.length; i++) {
                var node = childNodes[i];
                html += node.getHtml();
            }
        }
        html += '</div>';
        return html;

        function startingDiv() {
            var html = '<div data-node-id="' + that.id + '" class="';
            html += isSuperNode() ? 'super-node' : 'sub-node';
            html += '">';
            return html;
        }
    };

    this.addChild = function (child) {
        child.parentNode = that;
        childNodes.push(child);
    };

    function isSuperNode() {
        return !that.parentNode;
    }

    function hasChildNodes() {
        return childNodes.length != 0;
    }
}

function NodeRegistry() {
    var counter = 0;
    this.nodes = {};
    this.createNode = function createNode(name) {
        var id = ++counter;
        var node = new Node(id, name);
        this.nodes[id] = node;
        return node;
    }
}

var NodeView = {
    anchor: document.getElementById('tree'),
    draw: function (nodes) {
        var html = '';
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            html += node.getHtml();
        }
        this.anchor.innerHTML = html;
    }
};



