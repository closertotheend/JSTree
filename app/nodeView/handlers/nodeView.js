var NodeView = Backbone.View.extend({

    DOM: DOMHelper,

    initialize: function (options) {
        var nodeElement = this.DOM.getIconsOfNode(this.el);
        var registry = options.registry;
        new CollapseIconClickHandler(nodeElement.collapseIcon);
        new AddIconClickHandler(nodeElement.addIcon, registry);
        new RemoveIconClickHandler(nodeElement.removeIcon, registry);
        new EditIconClickHandler(nodeElement.editIcon, registry);
        this.DOM.makeCollapseIconClosed(nodeElement.collapseIcon);
    }

});
