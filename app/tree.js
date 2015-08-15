function Node(name, id) {
    this.name = name;
    this.parentNode = null;
    this.id = id;
    var that = this;
    var childNodes = [];

    this.getHtml = function () {
        var html = startingDiv();

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
            var html = '<div data-node-id="' + that.id + '" class="node ';
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
    var allNodes = {};
    this.nodes;
    this.createNode = function createNode(name) {
        var id = ++counter;
        var node = new Node(name, id);
        allNodes[id] = node;
        return node;
    }
}

function NodeView(registry) {
    var anchor = document.getElementById('tree');
    var registry = registry;

    this.render = function (nodes) {
        renderDOM();
        hideSubNodes();
        addClosedCollapseIconToEachNode();
        collapseIconClickHandler();
    };

    function renderDOM() {
        var nodes = registry.nodes;
        var html = '';
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            html += node.getHtml();
        }
        anchor.innerHTML = html;
    }

    function hideSubNodes() {
        var subNodes = document.getElementsByClassName("sub-node");
        for (var i = 0; i < subNodes.length; i++) {
            hide(subNodes[i]);
        }
    }

    function addClosedCollapseIconToEachNode() {
        var nodeElements = document.getElementsByClassName("node");
        for (var i = 0; i < nodeElements.length; i++) {
            toggleCollapseClosedIcon(nodeElements[i]);
        }
    }


    function collapseIconClickHandler() {
        var nodeElements = document.getElementsByClassName("node");
        for (var i = 0; i < nodeElements.length; i++) {
            var div = nodeElements[i];
            div.addEventListener('click', function (e) {
                e.stopPropagation();
                if (this.classList.contains('node-collapse-closed')) {
                    showChildrenOnClick(this);
                    toggleCollapseOpenIcon(this);
                } else if (this.classList.contains('node-collapse-open')) {
                    closeChildrenOnClick(this);
                    toggleCollapseClosedIcon(this);
                }
            })
        }

        function showChildrenOnClick(element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childNodeElements = element.childNodes[i];
                if (isNodeElement(childNodeElements)) {
                    show(childNodeElements);
                }
            }
        }

        function closeChildrenOnClick(element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childNodeElements = element.childNodes[i];
                if (isNodeElement(childNodeElements)) {
                    hide(childNodeElements);
                }
            }
        }
    }

    function isNodeElement(childNode) {
        return childNode.hasAttribute("data-node-id");
    }

    function toggleCollapseClosedIcon(element) {
        element.classList.remove('node-collapse-open');
        element.classList.add('node-collapse-closed');
    }

    function toggleCollapseOpenIcon(element) {
        element.classList.add('node-collapse-open');
        element.classList.remove('node-collapse-closed');
    }

    function hide(element) {
        element.style.display = 'none';
    }

    function show(element) {
        element.style.display = 'block';
    }

}



