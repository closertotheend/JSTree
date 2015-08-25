define(['app/views/domHelper.js'], function (DOMHelper) {
    return Backbone.View.extend({

        DOM: DOMHelper,
        template: DOMHelper.newFolderFormTemplate(),

        initialize: function (options) {
            this.registry = options.registry;
            this.node = options.node;
        },

        events: {
            'click .insert-new-node-save-button': 'save',
            'click .insert-new-node-cancel-button': 'cancel'
        },

        render: function () {
            this.createNewForm();
            this.DOM.openTreeOfNode(this.node);
            this.setElement(this.node.getElementsByClassName('insert-new-node'));
        },

        createNewForm: function () {
            var removeIcon = $(this.node).find('.remove-node').first();
            $(removeIcon).after(this.template);
        },

        save: function () {
            var newNode = this.createNode(this.el);
            var that = this;
            var NodeView = require("app/views/nodeView.js");
            new NodeView({el: newNode, registry: that.registry});
            this.remove();
        },

        createNode: function () {
            var newNodeName = this.$el.find('.insert-new-node-name').first().val();
            var newNodeObject = this.registry.createNode(newNodeName);
            this.model.addChild(newNodeObject);
            this.registry.save();
            this.$el.before(newNodeObject.getHtml());
            return this.DOM.getFirstSubNodeOfNode(this.node);
        },

        cancel: function () {
            this.remove();
        }

    })
});
