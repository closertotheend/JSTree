function CollapseIconClickHandler(collapseIcon) {
    var DOM = DOMHelper;

    collapseIcon.addEventListener('click', function (e) {
        DOM.toggleTreeViaCollapseIcon(this);
        e.stopPropagation();
    })
}
