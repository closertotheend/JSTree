function NodeView(registry) {
    var anchor = document.getElementById('tree');
    var registry = registry;

    this.render = function () {
        renderDOM();
        hideSubNodes();
        addClosedCollapseIconToEachNode();
        collapseIconClickHandler();
        addIconClickHandler();
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
        var nodeElements = document.getElementsByClassName('collapse-indicator');
        for (var i = 0; i < nodeElements.length; i++) {
            toggleCollapseClosedIcon(nodeElements[i]);
        }
    }


    function addIconClickHandler() {
        var nodeElements = document.getElementsByClassName("add-node");
        for (var i = 0; i < nodeElements.length; i++) {
            var div = nodeElements[i];
            div.addEventListener('click', function (e) {
                e.stopPropagation();
                closedCollapseIconClickBehaviour(this.parentNode);
            })
        }
    }

    function collapseIconClickHandler() {
        var nodeElements = document.getElementsByClassName("collapse-indicator");
        for (var i = 0; i < nodeElements.length; i++) {
            var div = nodeElements[i];
            div.addEventListener('click', function (e) {
                e.stopPropagation();
                if (this.classList.contains('node-collapse-closed')) {
                    closedCollapseIconClickBehaviour(this)
                } else if (this.classList.contains('node-collapse-open')) {
                    openCollapseIconClickBehaviour(this)
                }
            })
        }
    }

    function openCollapseIconClickBehaviour(element) {
        hideChildren(element.parentNode);
        toggleCollapseClosedIcon(element);
        function hideChildren(element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childNodeElement = element.childNodes[i];
                if (isNodeElement(childNodeElement)) {
                    hide(childNodeElement);
                }
            }
        }
    }

    function closedCollapseIconClickBehaviour(element) {
        showChildren(element.parentNode);
        toggleCollapseOpenIcon(element);
        function showChildren(element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childNodeElement = element.childNodes[i];
                if (isNodeElement(childNodeElement)) {
                    show(childNodeElement);
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



