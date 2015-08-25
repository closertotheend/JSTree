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

    isNode: function (element) {
        return element.classList.contains('node');
    },

    isNewNodeForm: function (element) {
        return element.classList.contains('insert-new-node');
    },

    makeCollapseIconOfNodeClosed: function (node) {
        var collapseIcon = this.getCollapseIconOfNode(node);
        collapseIcon.classList.remove('node-collapse-open');
        collapseIcon.classList.add('node-collapse-closed');
    },

    makeCollapseIconOpen: function (node) {
        var collapseIcon = this.getCollapseIconOfNode(node);
        collapseIcon.classList.add('node-collapse-open');
        collapseIcon.classList.remove('node-collapse-closed');
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

    toggleTreeOfNode: function (node) {
        var collapseIcon = this.getCollapseIconOfNode(node);
        if (this.isCollapseIconClosed(collapseIcon)) {
            this.openTreeOfNode(node)
        } else if (this.isCollapseIconOpen(collapseIcon)) {
            this.closeTreeViaNode(node)
        }
    },

    closeTreeViaNode: function (node) {
        var that = this;
        _(node.childNodes).filter(function(n){return that.isCloseable(n)}).map(function(n){ $(n).hide(); });
        this.makeCollapseIconOfNodeClosed(node);
    },

    openTreeOfNode: function (node) {
        var that = this;
        _(node.childNodes).filter(function(n){return that.isCloseable(n)}).map(function(n){ $(n).show(); });
        this.makeCollapseIconOpen(node);
    },

    isCloseable: function (childNodeElement) {
        return this.isNode(childNodeElement) || this.isNewNodeForm(childNodeElement);
    }

};
