var NodeView = Backbone.View.extend({

    DOM: DOMHelper,

    initialize: function (options) {
        var nodeElement = this.DOM.getIconsOfNode(this.el);
        this.registry = options.registry;
        this.DOM.makeCollapseIconClosed(nodeElement.collapseIcon);
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

    removeEvent: function (e) {
        var nodeId = this.DOM.getNodeDataId(this.el);
        var nodeObject = this.registry.getNodeById(nodeId);
        this.registry.removeNode(nodeObject);
        this.registry.save();
        this.el.remove();
    },

    editEvent: function (e) {
        new EditIconClickEvent(e.toElement, this.registry);
    }

});
