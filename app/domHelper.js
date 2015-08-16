var DOMHelper = {

    getAnchor: function () {
        return document.getElementById('tree');
    },

    getAllNodes: function () {
        return document.getElementsByClassName('node');
    },

    getAllSubNodes: function () {
        return document.getElementsByClassName("sub-node");
    },

    getCollapseIconOfNode: function (node) {
        return node.getElementsByClassName('collapse-indicator')[0];
    },

    getAddIconOfNode: function (node) {
        return node.getElementsByClassName('add-node')[0];
    },

    getRemoveIconOfNode: function (node) {
        return node.getElementsByClassName('remove-node')[0];
    },

    getFirstSubNodeOfNode: function (node) {
        return node.getElementsByClassName('node')[0];
    },

    getNodeDataId: function (node) {
        return node.getAttribute("data-node-id");
    },

    getNodeFromAddIcon: function (addIcon) {
        return addIcon.parentNode;
    },

    getNodeFromRemoveIcon: function (removeIcon) {
        return removeIcon.parentNode;
    },

    getNodeFromCollapseIcon: function (collapseIcon) {
        return collapseIcon.parentNode;
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

    getNodeOfNewFolderForm: function (newFolderForm) {
        return newFolderForm.parentNode;
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

    hideSubNodes: function () {
        var subNodes = this.getAllSubNodes();
        for (var i = 0; i < subNodes.length; i++) {
            this.hide(subNodes[i]);
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
