var EditNodeView = Backbone.View.extend({
    DOM: DOMHelper,

    initialize: function(options){
        this.registry = options.registry;
    },

    events: {
        "click .edit-current-node-save-button": "save",
        "click .edit-current-node-cancel-button": "save",
        "click .add-node": "addEvent"
    },

    render: function () {
        if (this.DOM.nodeEditFormDoesNotExist(this.el)) {
            this.createEditForm(this.el);
        }
    },

    createEditForm: function(node) {
        this.DOM.removeEditOrNewNodeForm(node);
        var editForm = this.DOM.createEditNodeForm();
        var firstSubNodeOfNode = this.DOM.getFirstSubNodeOfNode(node);
        node.insertBefore(editForm, firstSubNodeOfNode);
    },

    save: function () {
        var editNodeForm = this.$el.find('.edit-current-node')[ 0 ];
        var node = this.DOM.getNodeOfNodeEditForm(editNodeForm);
        var nodeId = this.DOM.getNodeDataId(node);
        var newName = this.DOM.getEditedNodeNameOfNodeEditForm(editNodeForm);
        var nodeObject = this.registry.getNodeById(nodeId);
        nodeObject.set('name', newName);
        this.registry.save();
        this.DOM.changeNameOfNode(node, newName);
        editNodeForm.remove();
    },

    cancel: function(cancelButton) {
        this.el.remove();
    }

});
