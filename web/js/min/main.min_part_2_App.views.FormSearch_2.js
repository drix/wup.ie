App.views.FormSearch = Backbone.View.extend({
	// status constants
	STATUS_SEARCH : 'searching',
	STATUS_LOADED : 'loaded',
	STATUS_OK	  : 'success',
	STATUS_ERROR  :'error',
	
	// constructor
	initialize: function(token){
		_.bindAll(this);
		this.collection =  new App.collections.FacebookSearch();
		this.collection.on('add', this.add);
		this.collection.on('reset', this.reset);
		this.collection.token = token;
		return this.render();
	},
	render: function(){
		this.$el = $('#form');
		this.$el.removeClass().addClass(this.STATUS_LOADED);
		return this;
	},
	events: {
		"click #search" : "search",
		"keyup #q"		: "keyup",
		"change #q"		: "keyup",
		"click #reset" 	: function(e){ this.collection.reset();}
	},
	
	// actions
	reset: function(e){
		this.$el.removeClass().addClass(this.STATUS_LOADED);		
		$('#result').html('').hide();
	},
	keyup: function(e){
		this.$('#search').attr('disabled',this.$('#q').val().length > 2 ? null : 'disabled');
		if('keyCode' in e && e.keyCode == 13) this.search();
	},
	search: function(e){
		this.$el.removeClass().addClass(this.STATUS_SEARCH);
		var query = this.$('#q').val();
		this.$('#query').text(query);
		return this.collection.search(query,this);
	},
	success: function(e){
		this.$el.removeClass().addClass(this.STATUS_OK);
		$('#result').show();
	},
	error: function(e){
		this.$el.removeClass().addClass(this.STATUS_ERROR);
	},
	add: function(model){
		track = model;
		$('#result').append(new App.views.FacebookItem(model).el);
	}
});
