function RemoveIconClickEvent(removeIcon, nodeRegistry) {
    var DOM = DOMHelper;
    var registry = nodeRegistry;

    var node = DOMHelper.getNodeFromRemoveIcon(removeIcon);
    var nodeId = DOM.getNodeDataId(node);
    var nodeObject = registry.getNodeById(nodeId);
    registry.removeNode(nodeObject);
    registry.save();
    node.remove();
}
