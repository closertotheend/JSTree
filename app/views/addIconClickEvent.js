var AddNodeView = Backbone.View.extend({
    DOM: DOMHelper,

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
        this.DOM.openTreeViaCollapseIcon(this.DOM.getCollapseIconOfNode(this.node));
        this.setElement(this.node.getElementsByClassName('insert-new-node'));
    },

    createNewForm: function () {
        var newFolderForm = this.DOM.createNewFolderForm();
        var firstSubNodeOfNode = this.DOM.getFirstSubNodeOfNode(this.node);
        this.node.insertBefore(newFolderForm, firstSubNodeOfNode);
    },

    save: function () {
        var newNode = this.createNode(this.el);
        new NodeView({el: newNode, registry: this.registry});
        this.el.remove();
    },

    createNode: function () {
        var newNodeName = this.DOM.getNodeNameOfNewFolderForm(this.el);
        var newNodeObject = this.registry.createNode(newNodeName);
        this.model.addChild(newNodeObject);
        this.registry.save();
        this.DOM.insertHtmlAfterNewFolderForm(this.el, newNodeObject.getHtml());
        return this.DOM.getFirstSubNodeOfNode(this.node);
    },

    cancel: function () {
        this.el.remove();
    }

});
