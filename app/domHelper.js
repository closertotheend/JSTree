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

    createNewFolderForm: function () {
        var newFolderDiv = document.createElement("div");
        newFolderDiv.className = "insert-new-node";

        var folderNameInput = document.createElement("input");
        folderNameInput.type = 'text';
        newFolderDiv.appendChild(folderNameInput);

        var folderNameInputSubmit = document.createElement("input");
        folderNameInputSubmit.type = 'button';
        folderNameInputSubmit.value = 'Save';
        newFolderDiv.appendChild(folderNameInputSubmit);

        var folderNameInputCancel = document.createElement("input");
        folderNameInputCancel.type = 'button';
        folderNameInputCancel.value = 'Cancel';
        newFolderDiv.appendChild(folderNameInputCancel);
        return newFolderDiv;
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
    }

};
