
define(function (require, exports, module) {
	var ImageCollection = require('imageCollection')
	var Layer = require('layer');
	var List = require('list');

	var imageCollection = new ImageCollection()
	var layer = new Layer({
		el: $('#app'),
		collection: imageCollection
	})
	var list = new List({
		el: $('#app'),
		collection: imageCollection
	})
	var Router = Backbone.Router.extend({
		routes: {
			'layer/:id': 'renderLayer',
			'list': 'renderList',
			'*other':'renderindex'

		},
		renderLayer: function (id) {
			layer.render(id);
			layer.$el.find('.layer').show();
		},
		renderList: function () {
			layer.$el.find('.layer').hide();
		}
	})

	var router = new Router();
	module.exports = function () {
		Backbone.history.start();
	}
})