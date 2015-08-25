var EditNodeView = Backbone.View.extend({
    DOM: DOMHelper,

    initialize: function (options) {
        this.registry = options.registry;
    },

    events: {
        "click .edit-current-node-save-button": "save",
        "click .edit-current-node-cancel-button": "cancel"
    },

    render: function () {
        if (this.DOM.nodeEditFormDoesNotExist(this.el)) {
            this.createEditForm();
        }
        this.editNodeForm = this.$el.find('.edit-current-node')[0];
    },

    createEditForm: function () {
        this.destroyEditOrAddForm();
        var editForm = this.DOM.createEditNodeForm();
        var firstSubNodeOfNode = this.DOM.getFirstSubNodeOfNode(this.el);
        this.el.insertBefore(editForm, firstSubNodeOfNode);
    },

    destroyEditOrAddForm: function () {
        this.DOM.removeEditOrNewNodeForm(this.el);
    },

    save: function () {
        var newName = this.DOM.getEditedNodeNameOfNodeEditForm(this.editNodeForm);
        this.model.set('name', newName);
        this.registry.save();
        this.DOM.changeNameOfNode(this.el, newName);
        this.editNodeForm.remove();
    },

    cancel: function () {
        this.editNodeForm.remove();
    }

});
