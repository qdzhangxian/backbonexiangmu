define(function (require, exports, module) {
	require('modules/list/list.css')
	var List = Backbone.View.extend({
		events: {
			'tap .search span': 'showSearchView',
			'tap .type li': 'showTypeView',
			'tap .go-top': 'goTop',
			'tap .goindex': 'goinde',
			
		},
		tpl: _.template('<a href="#layer/<%=id%>"><img style="<%=style%>" src="<%=url%>" alt="" /></a>'),
		leftHeight: 0,
		rightHeight: 0,
		initialize: function () {
			var me = this;

			this.initDOM();

			this.listenTo(this.collection, 'add', function (model, collection, options) {
				this.render(model)
			})
			$(window).on('scroll', function () {
				if ($('body').height() < $(window).scrollTop() + $(window).height() + 200) {
					me.getData();
				}
				me.showHideGoTop();
			})
			// 拉去数据
			this.getData()
		},
	
		goTop: function () {
			window.scrollTo(0, 0)
		},
		goinde: function () {
			location.href="";
		},
		
		showHideGoTop: function () {
			if ($(window).scrollTop() > 300) {
				this.$el.find('.go-top').show()
			} else {
					this.$el.find('.go-top').hide()
			}
		},

		getData: function () {
			this.collection.fetchData();
		},
		initDOM: function () {
			this.leftContainer = this.$el.find('.left-container')
			this.rightContainer = this.$el.find('.right-container')
			this.imgContainer = this.$el.find('.image-container').hide();
			this.nav=this.$el.find(".type")
			this.goindex=this.$el.find('.goindex');
		},
		render: function (model) {
			var height = model.get('viewHeight');
			var data = {
				id: model.get('id'),
				url: model.get('url'),
				style: 'width: ' + model.get('viewWidth') + ';height: ' + height + ';'
			};
			var tpl = this.tpl;
			var html = tpl(data)

			if (this.leftHeight > this.rightHeight) {
				this.renderRight(html, height);
			} else {
				this.renderLeft(html, height);
			}
		},
		renderRight: function (html, height) {
			this.rightContainer.append(html);
			this.rightHeight += height + 6;
		},
		renderLeft: function (html, height) {
			this.leftContainer.append(html);
			this.leftHeight += height + 6;
		},
		getSearchValue: function () {
			return this.$el.find('.search input').val()
		},
		checkInputValue: function (val) {
			if (/^\s*$/.test(val)) {
				alert('请输入搜索内容！');
				return false;
			}
			return true;
		},
		searchCollectionByKey: function (val, type) {
			this.imgContainer = this.$el.find('.image-container').show();
			
			return this.collection.filter(function (model, index, models) {
				if (type === 'type') {
					return model.get('type') == val;
				}
				return model.get('title').indexOf(val) > -1;
			})
		},
		clearView: function () {
			this.leftContainer.html('');
			this.rightContainer.html('');
			this.leftHeight = 0;
			this.rightHeight = 0;
		},
		resetView: function (arr) {
			this.imgContainer = this.$el.find('.image-container').show()
			for (var i = 0; i < arr.length; i++) {
				this.render(arr[i])
			}
			;
		},
		showSearchView: function () {
			var value = this.getSearchValue();
			if (!this.checkInputValue(value)) {
				return;
			}

			value = value.replace(/^\s+|\s+$/g, '');
			var result = this.searchCollectionByKey(value);
			 this.nav.hide();
			this.clearView();
			this.resetView(result);
		},
		getDOMId: function (dom) {
				
			return $(dom).attr('class') ;
		},
		showTypeView: function (e) {
			console.log(e.target)
			var id = this.getDOMId(e.target);
			this.nav.hide()
			this.clearView();
			this.goindex.show()
			this.imgContainer = this.$el.find('.image-container').show();
			var result = this.searchCollectionByKey(id, 'type');
			
			this.resetView(result);
		}
	})
	module.exports = List;
})