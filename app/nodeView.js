function NodeView(registry) {
    var anchor = DOMHelper.getAnchor();
    var registry = registry;

    this.render = function () {
        renderDOM();
        setNodesHandlers();
        DOMHelper.hideSubNodes();
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

    function setNodesHandlers() {
        var nodes = DOMHelper.getAllNodes();
        for (var i = 0; i < nodes.length; i++) {
            setNodeHandlers(nodes[i]);
        }
    }

    function setNodeHandlers(node) {
        var collapseIcon = DOMHelper.getCollapseIconOfNode(node);
        setCollapseIconClickHandler(collapseIcon);
        var addIcon = DOMHelper.getAddIconOfNode(node);
        setAddIconClickHandler(addIcon);
        var removeIcon = DOMHelper.getRemoveIconOfNode(node);
        setRemoveIconClickHandler(removeIcon);
        DOMHelper.makeCollapseIconClosed(collapseIcon);
    }

    function setCollapseIconClickHandler(collapseIcon) {
        collapseIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            if (DOMHelper.isCollapseIconClosed(this)) {
                openTreeViaCollapseIcon(this)
            } else if (DOMHelper.isCollapseIconOpen(this)) {
                closeTreeViaCollapseIcon(this)
            }
        })
    }

    function setRemoveIconClickHandler(removeIcon) {
        removeIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            var node = DOMHelper.getNodeFromRemoveIcon(this);
            var nodeId = DOMHelper.getNodeDataId(node);
            var nodeObject = registry.getNodeById(nodeId);
            registry.removeNode(nodeObject);
            node.remove();
        })
    }

    function setAddIconClickHandler(addIcon) {
        addIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            var node = DOMHelper.getNodeFromAddIcon(this);
            if (DOMHelper.newFolderFormDoesNotExist(node)) {
                createNewForm();
            }
            openTreeViaCollapseIcon(DOMHelper.getCollapseIconOfNode(node));

            function createNewForm() {
                var newFolderForm = DOMHelper.createNewFolderForm();
                var firstSubNodeOfNode = DOMHelper.getFirstSubNodeOfNode(node);
                node.insertBefore(newFolderForm, firstSubNodeOfNode);
                var cancelButton = DOMHelper.getCancelButtonOfNewFolderForm(newFolderForm);
                setCancelButtonClickHandler(cancelButton);
                var saveButton = DOMHelper.getSaveButtonOfNewFolderForm(newFolderForm);
                setSaveButtonClickHandler(saveButton);
            }
        });

        function setSaveButtonClickHandler(saveButton) {
            saveButton.addEventListener('click', function (e) {
                var newFolderForm = DOMHelper.getNewFolderFormFromCancelButton(this);
                var newNode = createNode(newFolderForm);
                setNodeHandlers(newNode);
                newFolderForm.remove();
            });

            function createNode(newFolderForm) {
                var parentNode = DOMHelper.getNodeOfNewFolderForm(newFolderForm);
                var parentNodeId = DOMHelper.getNodeDataId(parentNode);
                var newNodeName = DOMHelper.getNodeNameOfNewFolderForm(newFolderForm);
                var newNodeObject = registry.createNode(newNodeName);
                var parentNodeObject = registry.getNodeById(parentNodeId);
                parentNodeObject.addChild(newNodeObject);
                DOMHelper.insertHtmlAfterNewFolderForm(newFolderForm, newNodeObject.getHtml());
                return DOMHelper.getFirstSubNodeOfNode(parentNode);
            }
        }

        function setCancelButtonClickHandler(cancelButton) {
            cancelButton.addEventListener('click', function (e) {
                DOMHelper.getNewFolderFormFromCancelButton(this).remove();
            });
        }
    }

    function closeTreeViaCollapseIcon(collapseIcon) {
        var node = DOMHelper.getNodeFromCollapseIcon(collapseIcon);
        DOMHelper.hideChildrenOfNode(node);
        DOMHelper.makeCollapseIconClosed(collapseIcon);
    }

    function openTreeViaCollapseIcon(collapseIcon) {
        var node = DOMHelper.getNodeFromCollapseIcon(collapseIcon);
        DOMHelper.showChildrenOfNode(node);
        DOMHelper.makeCollapseIconOpen(collapseIcon);
    }

}



