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
        new RemoveIconClickEvent(e.toElement, this.registry);
    },

    editEvent: function (e) {
        new EditIconClickEvent(e.toElement, this.registry);
    }

});
