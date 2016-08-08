/**
 * 我的首页
 * @version  v1.0
 * @createTime: 2016-04-20
 * @createAuthor liyd
 * @updateHistory
 *            2016-06-24 liuzy 图表切换代码复用
 *
 * @note 列表页:myindex
 */

define(function (require) {
	var ngAMD = require('ngAMD');
	var app = require("css!myindex_css");
	

	



	ngAMD.controller("indexCtrl", [
		'$scope',
		"ajaxService",
		"$rootScope",
		"register",
		function ($scope, ajaxService, $rootScope, register) {
			$scope.hello = "world";
		}
	])
	return 'indexCtrl';
});