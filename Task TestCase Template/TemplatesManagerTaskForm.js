/**
 * @jsx React.DOM
 */

tau
    .mashups
    .addDependency('libs/react/react-ex')
    .addModule('TaskTestCaseTemplate/TemplatesManagerTaskForm', function(React) {

        'use strict';

        var TemplatesManagerTaskForm = React.createClass({displayName: "TemplatesManagerTaskForm",

            handleSave: function() {

                var item = this.props.item;
                var val = this.refs.name.getDOMNode().value.trim();
                if (val) {
                    item.Name = val;
                    item.Description = this.refs.description.getDOMNode().innerHTML || '';
                    this.props.store.saveTask(this.props.item);
                }

            },

            handleRemove: function() {
                this.props.store.removeTask(this.props.item);
            },

            render: function() {

                var item = this.props.item;

                return (

                        React.createElement("div", {className: "view-mode active"}, 
                            React.createElement("div", {className: "entity-name"}, 
                                React.createElement("input", {type: "text", ref: "name", placeholder: "Name", 
                                    defaultValue: item.Name, autoFocus: true})
                            ), 
                            React.createElement("div", {className: "edit-block"}, 
                                React.createElement("div", {className: "note"}, "Description"), 
                                React.createElement("div", {className: "tm-description", ref: "description", contentEditable: true, 
                                dangerouslySetInnerHTML: {'__html': item.Description}}), 

                                React.createElement("div", {className: "action-buttons"}, 
                                    React.createElement("button", {type: "button", 
                                        className: "tau-btn tau-success left", onClick: this.handleSave}, 
                                        item.Id ? 'Save Task' : 'Add Task'
                                    ), 
                                    React.createElement("button", {type: "button", 
                                        className: "tau-btn tau-attention right", onClick: this.handleRemove}, 
                                        item.Id ? 'Delete' : 'Cancel'
                                    )
                                )
                            )
                        )
                );
            }
        });

        return TemplatesManagerTaskForm;
    });
