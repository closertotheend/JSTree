function NodeView(registry) {
    var anchor = DOMHelper.getAnchor();
    var registry = registry;

    this.render = function () {
        renderDOM();
        hideSubNodes();
        addClosedCollapseIconToEachNode();
        setCollapseIconClickHandler();
        setAddIconClickHandler();
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

    function setAddIconClickHandler() {
        var addIcons = DOMHelper.getAllAddIcons();

        for (var i = 0; i < addIcons.length; i++) {
            var addIcon = addIcons[i];
            addIcon.addEventListener('click', function (e) {
                e.stopPropagation();
                var node = DOMHelper.getNodeFromAddIcon(this);
                if (DOMHelper.newFolderFormDoesNotExist(node)) {
                    var newFolderForm = DOMHelper.createNewFolderForm();
                    node.insertBefore(newFolderForm, DOMHelper.getFirstSubNodeOfNode(node));
                    var cancelButton = DOMHelper.getCancelButtonOfNewFolderForm(newFolderForm);
                    setCancelButtonClickHandler(cancelButton);
                    var saveButton = DOMHelper.getSaveButtonOfNewFolderForm(newFolderForm);
                    setSaveButtonClickHandler(saveButton);
                }
                openTreeViaIcon(DOMHelper.getCollapseIconOfNode(node));
            })
        }

        function setCancelButtonClickHandler(cancelButton) {
            cancelButton.addEventListener('click', function (e) {
                DOMHelper.getNewFolderFormFromCancelButton(this).remove();
            });
        }

        function setSaveButtonClickHandler(saveButton) {
            saveButton.addEventListener('click', function (e) {
                alert();
            });
        }
    }

    function setCollapseIconClickHandler() {
        var collapseIcons = DOMHelper.getAllCollapseIcons();
        for (var i = 0; i < collapseIcons.length; i++) {
            var collapseIcon = collapseIcons[i];
            collapseIcon.addEventListener('click', function (e) {
                e.stopPropagation();
                if (DOMHelper.isCollapseIconClosed(this)) {
                    openTreeViaIcon(this)
                } else if (DOMHelper.isCollapseIconOpen(this)) {
                    closeTreeViaCollapseIcon(this)
                }
            })
        }
    }

    function closeTreeViaCollapseIcon(collapseIcon) {
        var node = DOMHelper.getNodeFromCollapseIcon(collapseIcon);
        hideChildren(node);
        DOMHelper.makeCollapseIconClosed(collapseIcon);
        function hideChildren(element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childNodeElement = element.childNodes[i];
                if (isCloseable(childNodeElement)) {
                    DOMHelper.hide(childNodeElement);
                }
            }
        }
    }

    function openTreeViaIcon(collapseIcon) {
        var node = DOMHelper.getNodeFromCollapseIcon(collapseIcon);
        showChildren(node);
        DOMHelper.makeCollapseIconOpen(collapseIcon);
        function showChildren(element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var childNodeElement = element.childNodes[i];
                if (isCloseable(childNodeElement)) {
                    DOMHelper.show(childNodeElement);
                }
            }
        }
    }

    function isCloseable(childNodeElement) {
        return DOMHelper.isNode(childNodeElement) || DOMHelper.isNewNodeForm(childNodeElement);
    }

}



