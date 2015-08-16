function Node(name, id) {
    this.name = name;
    this.parentNode = null;
    this.id = id;
    var that = this;
    var childNodes = [];

    this.getHtml = function () {
        var html = startingDiv();
        html += '<span class="collapse-indicator"></span>';
        if (isSuperNode()) {
            html += '<span class="super-node-name">' + name + '</span>';
        } else {
            html += '<span class="sub-node-name">' + name + '</span>';
        }

        html += '<span class="add-node"></span><span class="remove-node"></span>';
        if (hasChildNodes()) {
            for (var i = 0; i < childNodes.length; i++) {
                var node = childNodes[i];
                html += node.getHtml();
            }
        }
        html += '</div>';
        return html;

        function startingDiv() {
            var html = '<div data-node-id="' + that.id + '" class="node ';
            html += isSuperNode() ? 'super-node' : 'sub-node';
            html += '">';
            return html;
        }
    };

    this.addChild = function (child) {
        child.parentNode = that;
        childNodes.push(child);
    };

    function isSuperNode() {
        return !that.parentNode;
    }

    function hasChildNodes() {
        return childNodes.length != 0;
    }
}
