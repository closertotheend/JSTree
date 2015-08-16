var DOMHelper = {

    getAnchor: function () {
        return document.getElementById('tree');
    },

    getAllSubNodes: function () {
        return document.getElementsByClassName("sub-node");
    },

    getAllCollapseIcons: function () {
        return document.getElementsByClassName("collapse-indicator");
    },

    getAllAddIcons: function () {
        return document.getElementsByClassName("add-node");
    },

    getCollapseIconOfNode: function (nodeDiv) {
        return nodeDiv.getElementsByClassName('collapse-indicator')[0];
    },

    getFirstSubNodeOfNode: function (nodeDiv) {
        return nodeDiv.getElementsByClassName('node')[0];
    },

    getNodeFromAddIcon: function (addIcon) {
        return addIcon.parentNode;
    },

    getNodeFromCollapseIcon: function (collapseIcon) {
        return collapseIcon.parentNode;
    },

    createNewFolderForm: function () {
        var newFolderDiv = document.createElement("div");
        newFolderDiv.className = "insert-new-node";

        var folderNameInput = document.createElement("input");
        folderNameInput.type = 'text';
        folderNameInput.className = 'insert-new-node-name';
        newFolderDiv.appendChild(folderNameInput);

        var folderNameInputSubmit = document.createElement("input");
        folderNameInputSubmit.type = 'button';
        folderNameInputSubmit.className = 'insert-new-node-save-button';
        folderNameInputSubmit.value = 'Save';
        newFolderDiv.appendChild(folderNameInputSubmit);

        var folderNameInputCancel = document.createElement("input");
        folderNameInputCancel.type = 'button';
        folderNameInputCancel.className = 'insert-new-node-cancel-button';
        folderNameInputCancel.value = 'Cancel';
        newFolderDiv.appendChild(folderNameInputCancel);
        return newFolderDiv;
    },

    getNodeNameOfNewFolderForm: function (newFolderForm) {
        return this.getNewNodeInputOfNewFolderForm(newFolderForm).value;
    },

    getNewNodeInputOfNewFolderForm: function (newFolderForm) {
        return newFolderForm.getElementsByClassName('insert-new-node-name')[0];
    },

    getCancelButtonOfNewFolderForm: function (newFolderForm) {
        return newFolderForm.getElementsByClassName('insert-new-node-cancel-button')[0];
    },

    getSaveButtonOfNewFolderForm: function (newFolderForm) {
        return newFolderForm.getElementsByClassName('insert-new-node-save-button')[0];
    },

    getNewFolderFormFromCancelButton: function (cancelButton) {
        return cancelButton.parentNode;
    },

    newFolderFormDoesNotExist: function (element) {
        return element.getElementsByClassName('insert-new-node').length == 0;
    },

    isNode: function (element) {
        return element.classList.contains('node');
    },

    isNewNodeForm: function (element) {
        return element.classList.contains('insert-new-node');
    },

    makeCollapseIconClosed: function (element) {
        element.classList.remove('node-collapse-open');
        element.classList.add('node-collapse-closed');
    },

    makeCollapseIconOpen: function (element) {
        element.classList.add('node-collapse-open');
        element.classList.remove('node-collapse-closed');
    },

    isCollapseIconClosed: function (element) {
        return element.classList.contains('node-collapse-closed')
    },

    isCollapseIconOpen: function (element) {
        return element.classList.contains('node-collapse-open')
    },

    hide: function (element) {
        element.style.display = 'none';
    },

    show: function (element) {
        element.style.display = 'block';
    },

    hideSubNodes: function () {
        var subNodes = DOMHelper.getAllSubNodes();
        for (var i = 0; i < subNodes.length; i++) {
            DOMHelper.hide(subNodes[i]);
        }
    },

    addClosedCollapseIconToEachNode: function () {
        var collapseIcons = DOMHelper.getAllCollapseIcons();
        for (var i = 0; i < collapseIcons.length; i++) {
            DOMHelper.makeCollapseIconClosed(collapseIcons[i]);
        }
    },

    hideChildrenOfNode: function (element) {
        for (var i = 0; i < element.childNodes.length; i++) {
            var childNodeElement = element.childNodes[i];
            if (this.isCloseable(childNodeElement)) {
                this.hide(childNodeElement);
            }
        }
    },

    showChildrenOfNode: function (element) {
        for (var i = 0; i < element.childNodes.length; i++) {
            var childNodeElement = element.childNodes[i];
            if (this.isCloseable(childNodeElement)) {
                this.show(childNodeElement);
            }
        }
    },

    isCloseable: function (childNodeElement) {
        return this.isNode(childNodeElement) || this.isNewNodeForm(childNodeElement);
    }

};
