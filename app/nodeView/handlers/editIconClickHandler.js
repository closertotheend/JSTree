function EditIconClickHandler(editIcon, nodeRegistry) {
    var DOM = DOMHelper;
    var registry = nodeRegistry;

    editIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        var node = DOMHelper.getNodeFromEditIcon(this);
        if (DOM.nodeEditFormDoesNotExist(node)) {
            createEditForm(node);
        }
    });

    function createEditForm(node) {
        DOM.removeEditOrNewNodeForm(node);
        var editForm = DOM.createEditNodeForm();
        var firstSubNodeOfNode = DOM.getFirstSubNodeOfNode(node);
        node.insertBefore(editForm, firstSubNodeOfNode);
        var saveButton = DOM.getSaveButtonOfNodeEditForm(editForm);
        setSaveButtonClickHandler(saveButton);
        var cancelButton = DOM.getCancelButtonOfNodeEditForm(editForm);
        setCancelButtonClickHandler(cancelButton);

    }

    function setSaveButtonClickHandler(saveButton) {
        saveButton.addEventListener('click', function (e) {
            var editNodeForm = DOM.getNodeEditFormFromSaveButton(this);
            var node = DOM.getNodeOfNodeEditForm(editNodeForm);
            var nodeId = DOM.getNodeDataId(node);
            var newName = DOM.getEditedNodeNameOfNodeEditForm(editNodeForm);
            var nodeObject = registry.getNodeById(nodeId);
            nodeObject.name = newName;
            registry.save();
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
