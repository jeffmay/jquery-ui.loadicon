/**
    Copyright (c) 2012 Jeff May

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function($) {
    var loadicon =
    {
        _init: function() {
            this.options = $.extend(
                {
                    autoOpen: true,
                    container: this.element,
                    placement: 'over'
                },
                this.options
            );
            this.icon = $('<div class="loadicon"/>');
            this.reset();
            if(this.options.autoOpen) {
                this.show();
            }
        },
        _set_class: function(cssClass) {
            return this.icon
                .removeClass('loadicon-after loadicon-before loadicon-over')
                .addClass(cssClass)
            ;
        },

        placers: {
            after: function(container) {
                this._set_class('loadicon-after').appendTo(container);
            },
            before: function(container) {
                this._set_class('loadicon-before').appendTo(container);
            },
            right: function(container) {
                this._set_class('loadicon-right').appendTo(container);
            },
            over: function(container) {
                // Move the loadicon over an element
                var offset = container.offset();
                this._set_class('loadicon-over')
                    .prependTo('body')
                    .css({
                        top: offset.top,
                        left: offset.left,
                        width: container.outerWidth(),
                        height: container.outerHeight()
                    })
                ;
            }
        },
        hide: function() {
            this.icon.hide();
        },
        show: function() {
            this.icon.show();
        },
        reset: function() {
            this.place(this.options.placement, this.options.container);
        },
        place: function(preposition, element) {
            if(!this.placers[preposition] && preposition !== undefined) {
                throw "Unkown Preposition, '" + preposition + "'";
            }
            var container = $(element);
            if(container.length == 0) {
                container = this.container;
            }
            if(container.is(":input")) {
                // Stuff the input into a container
                container = $('<span/>').insertBefore(container).append(container);
            }
            // TODO: Support table-cell containers
            // because they don't work with relative positioning
            container.addClass('loadicon-container');
            this.placers[preposition].call(this, container);
            if(container !== this.container) {
                if(this.container != null) {
                    this.container.removeClass('loadicon-container');
                }
                this.container = container;
            }
            this.options.placement = preposition;
        }
    };
    $.widget('ui.loadicon', loadicon);
})(jQuery);
