"use strict";

angular
  .module("questionAnswer", [
    "ui.router",
    "ngResource"
  ])
  .config([
      "$stateProvider",
      "$locationProvider",
      "$urlRouterProvider",
      router
    ])
    .factory("QuestionFactory", [
      "$resource",
      questionFactoryFunction
    ])
    .controller("QuestionsIndexCtrl", [
      "$state",
      "QuestionFactory",
      QuestionsIndexCtrlFunction
    ])
    .controller("QuestionsShowCtrl", [
      "$state",
      "$stateParams",
      "QuestionFactory",
      QuestionsShowCtrlFunction
    ])


    function router ($stateProvider, $locationProvider, $urlRouterProvider) {
          $locationProvider.html5Mode(true);
          $stateProvider
            .state("index", {
              url: "/",
              templateUrl: "/assets/js/ng-views/index.html",
              controller: "QuestionsIndexCtrl",
              controllerAs: "vm"
            })
            .state("show", {
              url: "/questions/:id",
              templateUrl: "/assets/js/ng-views/show.html",
              controller: "QuestionsShowCtrl",
              controllerAs: "vm"
            })
          $urlRouterProvider.otherwise("/")
        }
    function questionFactoryFunction($resource){
      return $resource('/api/questions/:id', {}, {
        update: { method: "PUT" }
      })
    }

    function QuestionsIndexCtrlFunction($state, QuestionFactory) {
      this.questions = QuestionFactory.query()
        console.log(this.questions)
    }

    function QuestionsShowCtrlFunction($state, $stateParams, QuestionFactory) {
      this.question = QuestionFactory.get({_id: $stateParams.id})
      console.log(this.question);
    }
