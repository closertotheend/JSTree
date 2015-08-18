function RemoveIconClickHandler(removeIcon, nodeRegistry) {
    var DOM = DOMHelper;
    var registry = nodeRegistry;

    removeIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        var node = DOMHelper.getNodeFromRemoveIcon(this);
        var nodeId = DOM.getNodeDataId(node);
        var nodeObject = registry.getNodeById(nodeId);
        registry.removeNode(nodeObject);
        registry.save();
        node.remove();
    })
}
