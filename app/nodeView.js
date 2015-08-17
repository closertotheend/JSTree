function NodeView(registry) {
    var anchor = DOMHelper.getAnchor();
    var registry = registry;
    var DOM = DOMHelper;

    this.render = function () {
        renderDOM();
        setNodesHandlers();
        DOM.hideSubNodes();
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
        DOM.makeCollapseIconClosed(collapseIcon);
    }

    function setCollapseIconClickHandler(collapseIcon) {
        collapseIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            if (DOM.isCollapseIconClosed(this)) {
                openTreeViaCollapseIcon(this)
            } else if (DOM.isCollapseIconOpen(this)) {
                closeTreeViaCollapseIcon(this)
            }
        })
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

    function setAddIconClickHandler(addIcon) {
        addIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            var node = DOM.getNodeFromAddIcon(this);
            if (DOM.newFolderFormDoesNotExist(node)) {
                createNewForm();
            }
            openTreeViaCollapseIcon(DOM.getCollapseIconOfNode(node));

            function createNewForm() {
                var newFolderForm = DOM.createNewFolderForm();
                var firstSubNodeOfNode = DOM.getFirstSubNodeOfNode(node);
                node.insertBefore(newFolderForm, firstSubNodeOfNode);
                var cancelButton = DOM.getCancelButtonOfNewFolderForm(newFolderForm);
                setCancelButtonClickHandler(cancelButton);
                var saveButton = DOM.getSaveButtonOfNewFolderForm(newFolderForm);
                setSaveButtonClickHandler(saveButton);
            }
        });

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

    function closeTreeViaCollapseIcon(collapseIcon) {
        var node = DOM.getNodeFromCollapseIcon(collapseIcon);
        DOM.hideChildrenOfNode(node);
        DOM.makeCollapseIconClosed(collapseIcon);
    }

    function openTreeViaCollapseIcon(collapseIcon) {
        var node = DOM.getNodeFromCollapseIcon(collapseIcon);
        DOM.showChildrenOfNode(node);
        DOM.makeCollapseIconOpen(collapseIcon);
    }

}



