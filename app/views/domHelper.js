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
        return $(newFolderForm.find('.insert-new-node-name')[0]).val();
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

    // FORMS
    newFolderFormTemplate: function () {
        return '<div class="insert-new-node" style="display: block;"><input type="text" class="insert-new-node-name"><input type="button" class="insert-new-node-save-button" value="Save"><input type="button" class="insert-new-node-cancel-button" value="Cancel"></div>'
    },

    editNodeFormTemplate: function () {
        return '<div class="edit-current-node"><input type="text" class="edit-current-node-name"><input type="button" class="edit-current-node-save-button" value="Save"><input type="button" class="edit-current-node-cancel-button" value="Cancel"></div>';
    },
    // RESET BUTTON
    createResetButton: function () {
        return '<button id="reset">Reset</button>';
    },

    // ANIMATIONS AND HIGH LEVEL
    hideSubNodes: function () {
        var subNodes = this.getAllSubNodes();
        for (var i = 0; i < subNodes.length; i++) {
            $(subNodes[i]).hide();
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
                $(childNodeElement).hide();
            }
        }
        this.makeCollapseIconClosed(collapseIcon);
    },

    openTreeViaCollapseIcon: function (collapseIcon) {
        var node = this.getNodeFromCollapseIcon(collapseIcon);
        for (var i = 0; i < node.childNodes.length; i++) {
            var childNodeElement = node.childNodes[i];
            if (this.isCloseable(childNodeElement)) {
                $(childNodeElement).show();
            }
        }
        this.makeCollapseIconOpen(collapseIcon);
    },

    isCloseable: function (childNodeElement) {
        return this.isNode(childNodeElement) || this.isNewNodeForm(childNodeElement);
    }

};
