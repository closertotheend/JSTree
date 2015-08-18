function NodeEventHandler(node, registry) {
    var DOM = DOMHelper;
    var nodeElement = DOM.getIconsOfNode(node);
    new CollapseIconClickHandler(nodeElement.collapseIcon);
    new AddIconClickHandler(nodeElement.addIcon, registry);
    new RemoveIconClickHandler(nodeElement.removeIcon, registry);
    new EditIconClickHandler(nodeElement.editIcon, registry);
    DOM.makeCollapseIconClosed(nodeElement.collapseIcon);
}
