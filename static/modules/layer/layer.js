define(function (require, exports, module) {
	require('modules/layer/layer.css')
	var h = $(window).height();
	var Layer = Backbone.View.extend({
		imageId: 0,
		imageList: [],
		events: {
			'tap .layer-container img': 'toggleTitle',
			'swipeLeft .layer-container img': 'showNextImage',
			'swipeRight .layer-container img': 'showPreImage',
			'tap .layer .go-back': 'goBack'
		},
		tpl: _.template($('#tpl_layer').html()),
		render: function (modelId) {
			var model = this.collection.get(modelId)
			if (!model) {
				location.href = '';
				return ;
			}
			this.imageId = model.get('id');
			this.$el.find(".type").html('')
			this.imageList.push(this.imageId);
			var data = {
				url: model.get('url'),
				title: model.get('title'),
				style: 'line-height: ' + h + 'px;'
			}
			var tpl = this.tpl;
			var html = tpl(data)
			this.$el.find('.layer').html(html)
		},
		goBack: function () {
			this.imageList.pop();
			if (this.imageList.length) {
				var id = this.imageList[this.imageList.length - 1];
				var model = this.collection.get(id);
				this.updateView(model);
			} else {
				this.$el.find('.layer').hide();
			}

		},
		toggleTitle: function () {
			this.$el.find('.layer .header').toggleClass('hide');
			this.$el.find(".type").html('')
		},
	
		showNextImage: function () {
			this.imageId++;
			var model = this.collection.get(this.imageId);
			if (!model) {
				alert('已经是最后一张了！');
				this.imageId--;
			} else {
				this.updateView(model)
				this.imageList.push(this.imageId)
			}
		},
		showPreImage: function () {
			this.imageId--;
			var model = this.collection.get(this.imageId);
			if (!model) {
				alert('已经是第一张了！');
				this.imageId++;
			} else {
				this.updateView(model);
				this.imageList.push(this.imageId)
			}
		},
		updateView: function (model) {
			this.$el.find('.layer-container img').attr('src', model.get('url'));
			this.$el.find('.layer .header h1').html(model.get('title'))
		}
	});
	module.exports = Layer;
})