tau.mashups
    .addDependency('tp/mashups')
    .addDependency('user/mashups')
    .addDependency('jQuery')
    .addDependency('Underscore')
    .addDependency('tp3/mashups/context')
    .addDependency('tau/core/bus.reg')
    .addDependency('tau/configurator')
    .addMashup(function (m, um, $, _, context, busRegistry, configurator) {

        var colorer = function() {
            this.init = function() {

                var self = this;

                /* Coloring of the cards is done from the top down.  The first mapping that is found
                 * is going to be the one that is used.  Once a match is found, subsequent mappings are 
                 * ignored.  This mapping is NOT case-sensitive. */
                colorMapping = {
                    'PIT Web CEPAL':'background: #fdfadb',
                    'in PROGRESS':'background: #fdfadb', // you can use state name
                    'urgent':'background: #f9d9d1',
                    '.net':'background: #d2e0ef;',
                    'regression':'background: #ffe1b3;',
                    'today':'background: #d2e0ef;',
                    'mb_wip':'background: #d2e0ef;',
                    'performance' : 'background: #e2eece',
                    '1week': 'background: #f9f5bd',
                    'when have time': 'background: #A1D9D6'
                };

                /* NO NEED TO CHANGE ANYTHING BENEATH THIS LINE! */

                this.taggedCards = {};
                this.cards = [];

                context.onChange(function(ctx) {
                    self.setContext(ctx);
                    self.refresh(ctx);
                });

                this.tagMapping = {};
                $.each(colorMapping, $.proxy(function(i, v) { this.tagMapping[i.toLowerCase()] = v; }, this));

                busRegistry.on('create', function(eventName, sender) {
                    if (sender.bus.name == 'board_plus')
                    {
                        sender.bus.on('start.lifecycle', _.bind(function(e) { this.cards = []; }, self));
                        sender.bus.on('view.card.skeleton.built', _.bind(self.cardAdded, self));
                    }
                });
            };

            this._ctx = {};
            this.setContext = function(ctx) {
                this._ctx = ctx;
            };

            this.refresh = function(ctx) {

                var acid = ctx.acid;
                var whereIdsStr = this.cards.map($.proxy(function(c){ return this._getCardId(c); }, this)).join(',');

                if (whereIdsStr == '') {
                    whereIdsStr = '0';
                }

                var requestUrl = configurator.getApplicationPath() + '/api/v2/Assignable?take=1000&where=(id in ['+whereIdsStr+'] and EntityState.isFinal==false)&select={id,Tags,EntityState.Name as state,Priority.Name as priority}&acid=' + acid;
                $.ajax({
                    url: requestUrl,
                    context: this
                }).done(function(data) {
                        this.taggedCards = {};
                        for(var i = 0; i < data.items.length; i++) {
                            var id = data.items[i].id;
                            var tags = data.items[i].tags.split(',');
                            tags.push(data.items[i].state);
							tags.push(data.items[i].priority);
                            $.each(tags, function(i, v) { tags[i] = $.trim(tags[i].toLowerCase()); });
                            this.taggedCards[id] = tags;
                        }
                        this.renderAll();
                    });
            };

            this.refreshDebounced = _.debounce(this.refresh, 100, false);

            this.cardAdded = function(eventName, sender) {
                this.cards.push(sender.element);
                this.refreshDebounced(this._ctx);
            };

            this._getCardId = function (card) {
                return card.attr('data-entity-id');
            };

            this.renderCard = function(card) {
                var self = this;
                var id = this._getCardId(card);
                var cardData = this.taggedCards[id];
             
                if (cardData) {
                    $.each(self.tagMapping, function(tag, color){
                        if($.inArray(tag, cardData) > -1) {
                            card.attr('style', self.tagMapping[tag]);
                            return false;
                        }
                    });
                }
            };

            this.renderAll = function() {
                var self = this;
                $.each(this.cards, function(index, card) {
                    self.renderCard(card);
                });
            };
        }

        new colorer().init();

    });
