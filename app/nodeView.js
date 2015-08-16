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
        DOMHelper.makeCollapseIconClosed(collapseIcon);
        setCollapseIconClickHandler(collapseIcon);
        var addIcon = DOMHelper.getAddIconOfNode(node);
        setAddIconClickHandler(addIcon);
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
                var node = DOMHelper.getNodeOfNewFolderForm(newFolderForm);

                var nodeId = node.getAttribute("data-node-id");
                var newNodeName = DOMHelper.getNodeNameOfNewFolderForm(newFolderForm);
                var newNodeObject = nodeRegistry.createNode(newNodeName);
                var nodeObject = nodeRegistry.allNodes[nodeId];
                nodeObject.addChild(newNodeObject);

                newFolderForm.insertAdjacentHTML('afterend', newNodeObject.getHtml());

                var newNode = DOMHelper.getFirstSubNodeOfNode(node);
                setNodeHandlers(newNode);
                newFolderForm.remove();
            });
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



