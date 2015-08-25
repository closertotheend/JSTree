var EditNodeView = Backbone.View.extend({
    DOM: DOMHelper,

    initialize: function(options){
        this.registry = options.registry;
        var node = DOMHelper.getNodeFromEditIcon(this.el);
        if (this.DOM.nodeEditFormDoesNotExist(node)) {
            this.createEditForm(node);
        }
    },

    createEditForm: function(node) {
        this.DOM.removeEditOrNewNodeForm(node);
        var editForm = this.DOM.createEditNodeForm();
        var firstSubNodeOfNode = this.DOM.getFirstSubNodeOfNode(node);
        node.insertBefore(editForm, firstSubNodeOfNode);
        var saveButton = this.DOM.getSaveButtonOfNodeEditForm(editForm);
        this.setSaveButtonClickHandler(saveButton);
        var cancelButton = this.DOM.getCancelButtonOfNodeEditForm(editForm);
        this.setCancelButtonClickHandler(cancelButton);
    },

    setSaveButtonClickHandler: function(saveButton) {
        var that = this;
        saveButton.addEventListener('click', function (e) {
            var editNodeForm = that.DOM.getNodeEditFormFromSaveButton(this);
            var node = that.DOM.getNodeOfNodeEditForm(editNodeForm);
            var nodeId = that.DOM.getNodeDataId(node);
            var newName = that.DOM.getEditedNodeNameOfNodeEditForm(editNodeForm);
            var nodeObject = that.registry.getNodeById(nodeId);
            nodeObject.set('name', newName);
            that.registry.save();
            that.DOM.changeNameOfNode(node, newName);
            editNodeForm.remove();
        });
    },

    setCancelButtonClickHandler: function(cancelButton) {
        cancelButton.addEventListener('click', function (e) {
            this.DOM.getNodeEditFormFromCancelButton(this).remove();
        });
    }

});
