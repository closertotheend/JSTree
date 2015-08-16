function NodeView(registry) {
    var anchor = DOMHelper.getAnchor();
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
        var subNodes = DOMHelper.getAllSubNodes();
        for (var i = 0; i < subNodes.length; i++) {
            DOMHelper.hide(subNodes[i]);
        }
    }

    function addClosedCollapseIconToEachNode() {
        var collapseIcons = DOMHelper.getAllCollapseIcons();
        for (var i = 0; i < collapseIcons.length; i++) {
            DOMHelper.makeCollapseIconClosed(collapseIcons[i]);
        }
    }

    function addIconClickHandler() {
        var nodeElements = DOMHelper.getAllAddIcons();

        for (var i = 0; i < nodeElements.length; i++) {
            var div = nodeElements[i];
            div.addEventListener('click', function (e) {
                e.stopPropagation();
                var nodeDiv = this.parentNode;
                if (DOMHelper.newFolderFormDoesNotExist(nodeDiv)) {
                    nodeDiv.insertBefore(DOMHelper.createNewFolderForm(), DOMHelper.getFirstSubNodeOfNodeDiv(nodeDiv));
                }
                closedCollapseIconClickBehaviour(DOMHelper.getCollapseIconFromNodeDiv(nodeDiv));
            })
        }
    }

    function collapseIconClickHandler() {
        var collapseIcons = DOMHelper.getAllCollapseIcons();
        for (var i = 0; i < collapseIcons.length; i++) {
            var collapseIcon = collapseIcons[i];
            collapseIcon.addEventListener('click', function (e) {
                e.stopPropagation();
                if (DOMHelper.isCollapseIconClosed(this)) {
                    closedCollapseIconClickBehaviour(this)
                } else if (DOMHelper.isCollapseIconOpen(this)) {
                    openCollapseIconClickBehaviour(this)
                }
            })
        }
    }

    function openCollapseIconClickBehaviour(icon) {
        hideChildren(icon.parentNode);
        DOMHelper.makeCollapseIconClosed(icon);
        function hideChildren(element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childNodeElement = element.childNodes[i];
                if (DOMHelper.isNodeElement(childNodeElement)) {
                    DOMHelper.hide(childNodeElement);
                }
            }
        }
    }

    function closedCollapseIconClickBehaviour(icon) {
        showChildren(icon.parentNode);
        DOMHelper.makeCollapseIconOpen(icon);
        function showChildren(element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childNodeElement = element.childNodes[i];
                if (DOMHelper.isNodeElement(childNodeElement)) {
                    DOMHelper.show(childNodeElement);
                }
            }
        }
    }

}



