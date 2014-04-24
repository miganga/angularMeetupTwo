'use strict';

angular.module('ak1App')
	.directive('perfectScrollbar', function ($parse, $window) {
		return {
			template: '<div><div ng-transclude class="content scrollable"></div></div>',
			transclude: true,
			replace: true,
			restrict: 'E',
			scope: {
				wheelSpeed: '@wheelSpeed'
			},
			link: function postLink(scope, element, attrs) {
				/*Solution One*/
				var switcher = false;
				scope.$watch(function () {
						return $window.innerWidth;
					}, function (newValue, oldValue) {
						//console.log('Old Value: ' + oldValue);
						//console.log('New Value: ' + newValue);
						if (newValue > 480) {
							if (!switcher) {
								element.perfectScrollbar({
									wheelSpeed: scope.wheelSpeed || 50,
									wheelPropagation: $parse(attrs.wheelPropagation)() || false,
									minScrollbarLength: $parse(attrs.minScrollbarLength)() || false
								});
								console.log('Plugin On');
								switcher = true;
							}
						}
						else {
							if (switcher) {
								console.log('Plugin Off');
								element.perfectScrollbar('destroy');
								switcher = false;
							}
						}
					}
				);
				$window.onresize = function () {
					scope.$apply();
				};

				/*Soluton Two*/
				/*var windowCheck = (function () {
				 var switcher = false;
				 return function () {
				 *//*console.log(switcher);*//*
				 if ($window.innerWidth > 480) {
				 if (!switcher) {
				 element.perfectScrollbar({
				 wheelSpeed: scope.wheelSpeed || 50,
				 wheelPropagation: $parse(attrs.wheelPropagation)() || false,
				 minScrollbarLength: $parse(attrs.minScrollbarLength)() || false
				 });
				 console.log('Plugin On');
				 switcher = true;
				 }
				 }
				 else {
				 if (switcher) {
				 console.log('Plugin Off');
				 element.perfectScrollbar('destroy');
				 switcher = false;
				 }
				 }
				 };
				 }());
				 windowCheck();
				 */
				/*Solution 3*/
				/*var windowCheck = {
				 switcher: false,
				 init: function () {
				 if ($window.innerWidth > 480) {
				 if (!this.switcher) {
				 element.perfectScrollbar({
				 wheelSpeed: scope.wheelSpeed || 50,
				 wheelPropagation: $parse(attrs.wheelPropagation)() || false,
				 minScrollbarLength: $parse(attrs.minScrollbarLength)() || false
				 });
				 console.log('Plugin On');
				 this.switcher = true;
				 }

				 }
				 else {
				 if (this.switcher) {
				 console.log('Plugin Off');
				 element.perfectScrollbar('destroy');
				 this.switcher = false;
				 }
				 }
				 }
				 };
				 windowCheck.init();


				 angular.element($window).bind('resize', function () {
				 windowCheck.init();
				 });*/
			}
		};
	});
