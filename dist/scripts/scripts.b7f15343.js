"use strict";angular.module("realTimeTriviaApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("realTimeTriviaApp").controller("MainCtrl",["$scope","$firebase",function(a,b){var c=new Firebase("https://maxwellzirbel.firebaseio.com/questions");a.q=["This is question 1","this is question 2","I will make these objects","eventually"],a.makeList=function(b){for(var c=0;c<a.q.length;c++)b.push(a.q[c])},a.getFirstFromList=function(a,b){a.startAt().limit(1).once("child_added",function(a){b(a.val())})},a.go=function(){a.makeList(c),a.getFirstFromList(c,function(a){alert(a)})},a.questions=b(c),a.addQuestion=function(){c.update({q:"Testing",level:5,answer:"YES"}),console.log(c)},a.answer=function(){console.log(a.questions[0]),a.q.splice(0,1),console.log(a.questions[0]),c.remove().limit(1)}}]),angular.module("realTimeTriviaApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);