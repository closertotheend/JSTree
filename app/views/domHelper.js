var DOMHelper = {
    //COMMON
    getDefaultAnchor: function () {
        return document.getElementById('tree');
    },

    getAllNodes: function () {
        return document.getElementsByClassName('node');
    },

    getAllSubNodes: function () {
        return document.getElementsByClassName("sub-node");
    },

    //NODE

    getCollapseIconOfNode: function (node) {
        return node.getElementsByClassName('collapse-indicator')[0];
    },

    getFirstSubNodeOfNode: function (node) {
        return node.getElementsByClassName('node')[0];
    },

    getNodeDataId: function (node) {
        return node.getAttribute("data-node-id");
    },

    changeNameOfNode: function (node, newName) {
        return node.getElementsByClassName('node-name')[0].innerHTML = newName;
    },

    //ICONS
    getNodeFromCollapseIcon: function (collapseIcon) {
        return collapseIcon.parentNode;
    },
    //NEW FOLDER FORM
    getNodeNameOfNewFolderForm: function (newFolderForm) {
        return this.getNewNodeInputOfNewFolderForm(newFolderForm).value;
    },

    getNewNodeInputOfNewFolderForm: function (newFolderForm) {
        return newFolderForm.getElementsByClassName('insert-new-node-name')[0];
    },

    insertHtmlAfterNewFolderForm: function (newFolderForm, html) {
        newFolderForm.insertAdjacentHTML('afterend', html);
    },

    // NODE EDIT FORM

    getNewNodeNameInputOfNodeEditForm: function (nodeEditForm) {
        return nodeEditForm.getElementsByClassName('edit-current-node-name')[0];
    },

    getEditedNodeNameOfNodeEditForm: function (nodeEditForm) {
        return this.getNewNodeNameInputOfNodeEditForm(nodeEditForm).value;
    },

    // ELEMENTS

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
    // FORMS
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

    createEditNodeForm: function () {
        var newFolderDiv = document.createElement("div");
        newFolderDiv.className = "edit-current-node";

        var folderNameInput = document.createElement("input");
        folderNameInput.type = 'text';
        folderNameInput.className = 'edit-current-node-name';
        newFolderDiv.appendChild(folderNameInput);

        var nodeNameInputSubmit = document.createElement("input");
        nodeNameInputSubmit.type = 'button';
        nodeNameInputSubmit.className = 'edit-current-node-save-button';
        nodeNameInputSubmit.value = 'Save';
        newFolderDiv.appendChild(nodeNameInputSubmit);

        var nodeNameInputCancel = document.createElement("input");
        nodeNameInputCancel.type = 'button';
        nodeNameInputCancel.className = 'edit-current-node-cancel-button';
        nodeNameInputCancel.value = 'Cancel';
        newFolderDiv.appendChild(nodeNameInputCancel);
        return newFolderDiv;
    },
    // RESET BUTTON
    createResetButton: function () {
        return '<button id="reset">Reset</button>';
    },

    // ANIMATIONS AND HIGH LEVEL
    hideSubNodes: function () {
        var subNodes = this.getAllSubNodes();
        for (var i = 0; i < subNodes.length; i++) {
            this.hide(subNodes[i]);
        }
    },

    toggleTreeViaCollapseIcon: function (collapseIcon) {
        if (this.isCollapseIconClosed(collapseIcon)) {
            this.openTreeViaCollapseIcon(collapseIcon)
        } else if (this.isCollapseIconOpen(collapseIcon)) {
            this.closeTreeViaCollapseIcon(collapseIcon)
        }
    },

    closeTreeViaCollapseIcon: function (collapseIcon) {
        var node = this.getNodeFromCollapseIcon(collapseIcon);
        for (var i = 0; i < node.childNodes.length; i++) {
            var childNodeElement = node.childNodes[i];
            if (this.isCloseable(childNodeElement)) {
                this.hide(childNodeElement);
            }
        }
        this.makeCollapseIconClosed(collapseIcon);
    },

    openTreeViaCollapseIcon: function (collapseIcon) {
        var node = this.getNodeFromCollapseIcon(collapseIcon);
        for (var i = 0; i < node.childNodes.length; i++) {
            var childNodeElement = node.childNodes[i];
            if (this.isCloseable(childNodeElement)) {
                this.show(childNodeElement);
            }
        }
        this.makeCollapseIconOpen(collapseIcon);
    },

    isCloseable: function (childNodeElement) {
        return this.isNode(childNodeElement) || this.isNewNodeForm(childNodeElement);
    }

};
