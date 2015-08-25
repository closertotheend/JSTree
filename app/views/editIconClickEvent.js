var EditNodeView = Backbone.View.extend({
    DOM: DOMHelper,

    initialize: function (options) {
        this.registry = options.registry;
        this.node = options.node;
    },

    events: {
        "click .edit-current-node-save-button": "save",
        "click .edit-current-node-cancel-button": "cancel"
    },

    render: function () {
        this.createEditForm();
        this.setElement(this.node.getElementsByClassName('edit-current-node')[0]);
        return this;
    },

    createEditForm: function () {
        var editForm = this.DOM.createEditNodeForm();
        var firstSubNodeOfNode = this.DOM.getFirstSubNodeOfNode(this.node);
        this.node.insertBefore(editForm, firstSubNodeOfNode);
    },

    save: function () {
        var newName = this.DOM.getEditedNodeNameOfNodeEditForm(this.node);
        this.model.set('name', newName);
        this.registry.save();
        this.DOM.changeNameOfNode(this.node, newName);
        this.remove();
    },

    cancel: function () {
        this.remove();
    }

});
