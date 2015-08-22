var Node  = Backbone.Model.extend({
    defaults: {
        parentNode: null,
        childNodes: []
    },

    getHtml: function () {
        var html = '<div data-node-id="' + this.get('id') + '" class="node ';
        html += this.isSuperNode() ? 'super-node' : 'sub-node';
        html += '">';
        html += '<span class="collapse-indicator"></span>';
        if (this.isSuperNode()) {
            html += '<span class="node-name super-node-name">' + name + '</span>';
        } else {
            html += '<span class="node-name sub-node-name">' + name + '</span>';
        }

        html += '<span class="add-node"></span><span class="edit-node"></span><span class="remove-node"></span>';
        if (this.hasChildNodes()) {
            var childNodes = this.get('childNodes');
            for (var i = 0; i < childNodes.length; i++) {
                var node = childNodes[i];
                html += node.getHtml();
            }
        }
        html += '</div>';
        return html;

    },

    addChild: function (child) {
        child.set('parentNode', this);
        var childNodes = this.getChildNodes();
        this.set('childNodes', childNodes.concat(child));
    },

    isSuperNode: function() {
        return !this.get('parentNode');
    },

    hasChildNodes: function() {
        return this.getChildNodes().length != 0;
    },

    doesNotHaveId: function() {
        return !this.getId();
    },

    getChildNodes: function() {
        return this.get('childNodes');
    },

    getParentNode: function() {
        return this.get('parentNode');
    },

    getId: function () {
        return this.get('id');
    },

    getName: function () {
        return this.get('name');
    }
});
