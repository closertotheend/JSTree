define(['app/views/domHelper.js'], function (DOMHelper) {
    return Backbone.View.extend({
        template: DOMHelper.editNodeFormTemplate(),

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
            var removeIcon = $(this.node).find('.remove-node').first();
            $(removeIcon).after(this.template);
        },

        save: function () {
            var newName = this.$el.find('.edit-current-node-name').first().val();
            this.model.set('name', newName);
            this.registry.save();
            $(this.node).find('.node-name').first().html(newName);
            this.remove();
        },

        cancel: function () {
            this.remove();
        }

    });
});
