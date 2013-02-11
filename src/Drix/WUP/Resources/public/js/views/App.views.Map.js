
App.views.Map = Backbone.View.extend({
	initialize : function(collection){
		// init
		_.bindAll(this);		
		this.$el = $('#map-view');
		this.collection = collection;
		// events
		this.collection.on('add', this.addPoi,  this);
		this.collection.on('reset', this.reset);
		App.evpool.on('showpoi', this.showpoi);
		App.evpool.on('overpoi', this.overpoi);
		App.evpool.on('outpoi',  this.outpoi);
		// render
		this.render();
	},
	render: function(){ // Render Map
		this.mqa = new MQA.TileMap( this.$el.children('#map').get(0), 1 /* zoon */, {lat:25, lng:5}, 'map');
		MQA.withModule('largezoom', $.proxy(function() {
			this.addControl( new MQA.LargeZoom(), new MQA.MapCornerPlacement(MQA.MapCorner.TOP_RIGHT, new MQA.Size(5,5)));
		}, this.mqa));
		MQA.withModule('mousewheel', $.proxy(function() { this.enableMouseWheelZoom(); }, this.mqa));		
	},
	onLocation: function(geo){ 
		this.latitude  = geo.coords.latitude;
		this.longitude = geo.coords.longitude;
		this.geo 	  = true;
	},
	offLocation: function(geo){
		this.latitude = this.longitude = this.geo = false;
	},	
	// Poi actions
	showPoi: function(model){
		this.mqa.setCenter({lat:model.get('latitude'),lng:model.get('longitude')});
		if(this.mqa.zoon > 8) this.mqa.setZoomLevel(8);
		trackme = model;
		MQA.EventManager.trigger(model.get('poi'),'click');
	},
	overPoi: function(model){ // check if is a sidebar or map rollover
		if(! 'get' in model) model = model.srcObject.model;
		model.get('poi').setIcon(model.get('poi').icoover);
	},
	outPoi: function(model){ // check if is a sidebar or map rollout
		if(! 'get' in model) model = model.srcObject.model;
		model.get('poi').setIcon(model.get('poi').icoout);
	},
	addPoi: function(model){
		var poi   = new MQA.Poi({lat:model.get('latitude'), lng:model.get('longitude')});
		poi.model = model;
		poi.icoover = new MQA.Icon("/images/map/poi-red.png",20,28);
		poi.icoout  = new MQA.Icon("/images/map/poi-blue.png",20,28);
		poi.setRolloverContent(model.get('text'));
		poi.setInfoContentHTML('<div style="width:135px; height:170px;"><img src="'+model.get('thumb')+'"/><a href="'+model.get('link')+'">'+model.get('text')+'</a></div>');
		poi.setIcon(poi.icoout);
		model.set('poi', poi);
		this.mqa.addShape(poi);
	}
});