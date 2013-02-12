App.collections.FacebookSearch = Backbone.Collection.extend({
	model	 : Backbone.Model,
	center	 : null,
	token	 : null,
	distance : 1000,
	query	 : null,
	type	 : 'place',
	search	 : function(q, options){
		var nearme = this.center ? '&center=' + this.center + '&distance=' + this.distance : '';		
		this.url = 'https://graph.facebook.com/search?type=' + this.type + '&q=' + (this.query = q) + nearme + '&access_token=' + this.token;
		return this.fetch(options);
	},
	parse: function(response) {
		return response.data;
	}
});