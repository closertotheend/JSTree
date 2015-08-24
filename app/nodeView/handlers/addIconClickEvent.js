function AddIconClickEvent(addIcon, nodeRegistry) {
    var DOM = DOMHelper;
    var registry = nodeRegistry;

    var node = DOM.getNodeFromAddIcon(addIcon);
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

    }

    function setSaveButtonClickHandler(saveButton) {
        saveButton.addEventListener('click', function (e) {
            var newFolderForm = DOM.getNewFolderFormFromCancelButton(this);
            var newNode = createNode(newFolderForm);
            new NodeView({el: newNode, registry: registry});
            newFolderForm.remove();
        });

    }

    function createNode(newFolderForm) {
        var parentNode = DOM.getNodeOfNewFolderForm(newFolderForm);
        var parentNodeId = DOM.getNodeDataId(parentNode);
        var newNodeName = DOM.getNodeNameOfNewFolderForm(newFolderForm);
        var newNodeObject = registry.createNode(newNodeName);
        var parentNodeObject = registry.getNodeById(parentNodeId);
        parentNodeObject.addChild(newNodeObject);
        registry.save();
        DOM.insertHtmlAfterNewFolderForm(newFolderForm, newNodeObject.getHtml());
        return DOM.getFirstSubNodeOfNode(parentNode);
    }

    function setCancelButtonClickHandler(cancelButton) {
        cancelButton.addEventListener('click', function (e) {
            DOM.getNewFolderFormFromCancelButton(this).remove();
        });
    }

}
