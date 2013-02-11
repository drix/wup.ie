App.views.FacebookItem = Backbone.View.extend({	
	// constructor
	initialize: function(model){
		this.model = model;
		this.el = _.template($('#tpl-facebook-item').html(), model.attributes);
		return this;
	},
	events : {
		"click" 	 : function(){ App.evpool.trigger('showpoi', this.model); },
		"mouseover"  : function(){ App.evpool.trigger('overpoi', this.model); },
		"mouseout"   : function(){ App.evpool.trigger('outpoi', this.model); }
	}
});