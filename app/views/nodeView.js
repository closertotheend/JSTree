var NodeView = Backbone.View.extend({

    DOM: DOMHelper,

    initialize: function (options) {
        var collapseIcon = this.DOM.getCollapseIconOfNode(this.el);
        this.registry = options.registry;
        this.DOM.makeCollapseIconClosed(collapseIcon);
        var nodeId = this.DOM.getNodeDataId(this.el);
        this.model = this.registry.getNodeById(nodeId);
    },

    events: {
        "click .collapse-indicator": "toggleTree",
        "click .add-node": "addEvent",
        "click .remove-node": "removeEvent",
        "click .edit-node": "editEvent"
    },

    toggleTree: function (e) {
        e.stopPropagation();
        this.DOM.toggleTreeViaCollapseIcon(e.toElement);
    },

    addEvent: function (e) {
        e.stopPropagation();
        if (this.isInEditState()) {
            this.editNodeView.remove();
            delete this.editNodeView;
        }
        if (!this.isInAddState()) {
            this.addNodeView = new AddNodeView({node: this.el, model: this.model, registry: this.registry});
            this.addNodeView.render();
        }
    },

    removeEvent: function (e) {
        e.stopPropagation();
        this.registry.removeNode(this.model);
        this.registry.save();
        this.destroySubViews();
        this.remove();
    },

    editEvent: function (e) {
        e.stopPropagation();
        if(this.isInAddState()){
            this.addNodeView.remove();
            delete this.addNodeView;
        }
        if (!this.isInEditState()) {
            this.editNodeView = new EditNodeView({node: this.el, model: this.model, registry: this.registry});
            this.editNodeView.render();
        }
    },

    destroySubViews: function(){
        this.addNodeView.remove();
        this.editNodeView.remove();
    },

    isInEditState: function(){
        return this.editNodeView;
    },

    isInAddState: function(){
        return this.addNodeView;
    }

});
