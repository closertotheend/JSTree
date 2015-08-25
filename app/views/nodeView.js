define(['app/views/domHelper.js', 'app/views/addNodeView.js', 'app/views/editNodeView.js'], function (DOMHelper, AddNodeView, EditNodeView) {
    return Backbone.View.extend({
        DOM: DOMHelper,

        initialize: function (options) {
            this.registry = options.registry;
            this.DOM.makeCollapseIconOfNodeClosed(this.el);
            var nodeId = this.DOM.getNodeDataId(this.el);
            this.model = this.registry.getNodeById(nodeId);
        },

        events: {
            "click .collapse-indicator": "toggleTree",
            "click .add-node": "addNode",
            "click .remove-node": "removeNode",
            "click .edit-node": "editNode"
        },

        toggleTree: function (e) {
            e.stopPropagation();
            this.DOM.toggleTreeOfNode(this.el);
        },

        addNode: function (e) {
            e.stopPropagation();
            if (this.isInEditState()) {
                this.editNodeView.remove();
            }
            if (!this.isInAddState()) {
                this.addNodeView = new AddNodeView({node: this.el, model: this.model, registry: this.registry});
                this.addNodeView.render();
            }
        },

        removeNode: function (e) {
            e.stopPropagation();
            this.registry.removeNode(this.model);
            this.registry.save();
            if (this.addNodeView)this.addNodeView.remove();
            if (this.editNodeView)this.editNodeView.remove();
            this.remove();
        },

        editNode: function (e) {
            e.stopPropagation();
            if (this.isInAddState()) {
                this.addNodeView.remove();
            }
            if (!this.isInEditState()) {
                this.editNodeView = new EditNodeView({node: this.el, model: this.model, registry: this.registry});
                this.editNodeView.render();
            }
        },

        isInEditState: function () {
            return this.$el.children('.edit-current-node').length > 0
        },

        isInAddState: function () {
            return this.$el.children('.insert-new-node').length > 0;
        }
    });
});