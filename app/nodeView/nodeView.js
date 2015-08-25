var NodeView = Backbone.View.extend({

    DOM: DOMHelper,

    initialize: function (options) {
        var nodeElement = this.DOM.getIconsOfNode(this.el);
        this.registry = options.registry;
        this.DOM.makeCollapseIconClosed(nodeElement.collapseIcon);
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
        this.DOM.toggleTreeViaCollapseIcon(e.toElement);
    },

    addEvent: function (e) {
        new AddIconClickEvent(e.toElement, this.registry);
    },

    removeEvent: function () {
        this.registry.removeNode(this.model);
        this.registry.save();
        this.remove();
    },

    editEvent: function (e) {
        new EditNodeView({el: e.toElement, registry: this.registry});
    }

});
