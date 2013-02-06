App.views.FacebookItem = Backbone.View.extend({	
	// constructor
	initialize: function(model){
		this.el = _.template($('#tpl-facebook-item').html(),model.attributes);
		return this;
	}
});