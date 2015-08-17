function NodeView(nodeRegistry, anchorId) {
    var anchor = anchorId ? document.getElementById(anchorId) : DOMHelper.getDefaultAnchor();
    var registry = nodeRegistry;
    var DOM = DOMHelper;

    this.render = function () {
        renderDOM();
        setNodesHandlers();
        DOM.hideSubNodes();
    };

    function renderDOM() {
        var nodes = registry.getNodes();
        var html = '';
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            html += node.getHtml();
        }
        anchor.innerHTML = html;
    }

    function setNodesHandlers() {
        var nodes = DOM.getAllNodes();
        for (var i = 0; i < nodes.length; i++) {
            setNodeHandlers(nodes[i]);
        }
    }

    function setNodeHandlers(node) {
        var collapseIcon = DOM.getCollapseIconOfNode(node);
        setCollapseIconClickHandler(collapseIcon);
        var addIcon = DOM.getAddIconOfNode(node);
        setAddIconClickHandler(addIcon);
        var removeIcon = DOM.getRemoveIconOfNode(node);
        setRemoveIconClickHandler(removeIcon);
        var editIcon = DOM.getEditIconOfNode(node);
        setEditIconClickHandler(editIcon);
        DOM.makeCollapseIconClosed(collapseIcon);
    }

    function setCollapseIconClickHandler(collapseIcon) {
        collapseIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            if (DOM.isCollapseIconClosed(this)) {
                DOM.openTreeViaCollapseIcon(this)
            } else if (DOM.isCollapseIconOpen(this)) {
                DOM.closeTreeViaCollapseIcon(this)
            }
        })
    }

    function setAddIconClickHandler(addIcon) {
        addIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            var node = DOM.getNodeFromAddIcon(this);
            if (DOM.newFolderFormDoesNotExist(node)) {
                createNewForm(node);
            }
            DOM.openTreeViaCollapseIcon(DOM.getCollapseIconOfNode(node));

            function createNewForm(node) {
                DOM.removeEditOrNewNodeForm(node);
                var newFolderForm = DOM.createNewFolderForm();
                var firstSubNodeOfNode = DOM.getFirstSubNodeOfNode(node);
                node.insertBefore(newFolderForm, firstSubNodeOfNode);
                var cancelButton = DOM.getCancelButtonOfNewFolderForm(newFolderForm);
                setCancelButtonClickHandler(cancelButton);
                var saveButton = DOM.getSaveButtonOfNewFolderForm(newFolderForm);
                setSaveButtonClickHandler(saveButton);

                function setSaveButtonClickHandler(saveButton) {
                    saveButton.addEventListener('click', function (e) {
                        var newFolderForm = DOM.getNewFolderFormFromCancelButton(this);
                        var newNode = createNode(newFolderForm);
                        setNodeHandlers(newNode);
                        newFolderForm.remove();
                    });

                    function createNode(newFolderForm) {
                        var parentNode = DOM.getNodeOfNewFolderForm(newFolderForm);
                        var parentNodeId = DOM.getNodeDataId(parentNode);
                        var newNodeName = DOM.getNodeNameOfNewFolderForm(newFolderForm);
                        var newNodeObject = registry.createNode(newNodeName);
                        var parentNodeObject = registry.getNodeById(parentNodeId);
                        parentNodeObject.addChild(newNodeObject);
                        DOM.insertHtmlAfterNewFolderForm(newFolderForm, newNodeObject.getHtml());
                        return DOM.getFirstSubNodeOfNode(parentNode);
                    }
                }

                function setCancelButtonClickHandler(cancelButton) {
                    cancelButton.addEventListener('click', function (e) {
                        DOM.getNewFolderFormFromCancelButton(this).remove();
                    });
                }
            }
        });

    }

    function setRemoveIconClickHandler(removeIcon) {
        removeIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            var node = DOMHelper.getNodeFromRemoveIcon(this);
            var nodeId = DOM.getNodeDataId(node);
            var nodeObject = registry.getNodeById(nodeId);
            registry.removeNode(nodeObject);
            node.remove();
        })
    }

    function setEditIconClickHandler(editIcon) {
        editIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            var node = DOMHelper.getNodeFromEditIcon(this);
            if (DOM.nodeEditFormDoesNotExist(node)) {
                createEditForm(node);
            }

            function createEditForm(node) {
                DOM.removeEditOrNewNodeForm(node);
                var editForm = DOM.createEditNodeForm();
                var firstSubNodeOfNode = DOM.getFirstSubNodeOfNode(node);
                node.insertBefore(editForm, firstSubNodeOfNode);
                var saveButton = DOM.getSaveButtonOfNodeEditForm(editForm);
                setSaveButtonClickHandler(saveButton);
                var cancelButton = DOM.getCancelButtonOfNodeEditForm(editForm);
                setCancelButtonClickHandler(cancelButton);

                function setSaveButtonClickHandler(saveButton) {
                    saveButton.addEventListener('click', function (e) {
                        var editNodeForm = DOM.getNodeEditFormFromSaveButton(this);
                        var node = DOM.getNodeOfNodeEditForm(editNodeForm);
                        var nodeId = DOM.getNodeDataId(node);
                        var newName = DOM.getEditedNodeNameOfNodeEditForm(editNodeForm);
                        var nodeObject = registry.getNodeById(nodeId);
                        nodeObject.name = newName;
                        DOM.changeNameOfNode(node, newName);
                        editNodeForm.remove();
                    });
                }

                function setCancelButtonClickHandler(cancelButton) {
                    cancelButton.addEventListener('click', function (e) {
                        DOM.getNodeEditFormFromCancelButton(this).remove();
                    });
                }
            }
        });
    }

}



