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
    .controller("QuestionsCreateCtrl", [
      "$state",
      "$stateParams",
      "QuestionFactory",
      QuestionsCreateCtrlFunction
    ])


    function router ($stateProvider, $locationProvider, $urlRouterProvider) {
          $locationProvider.html5Mode(true);
          $stateProvider
            .state("welcome", {
              url: "/",
              templateUrl: "/assets/js/ng-views/welcome.html"
            })
            .state("index", {
              url: "/questions",
              templateUrl: "/assets/js/ng-views/index.html",
              controller: "QuestionsIndexCtrl",
              controllerAs: "vm"
            })
            .state("create", {
              url: "/questions/new",
              templateUrl: "/assets/js/ng-views/new.html",
              controller: "QuestionsCreateCtrl",
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
    }

    function QuestionsShowCtrlFunction($state, $stateParams, QuestionFactory) {
      this.question = QuestionFactory.get({id: $stateParams.id})
    }

    function QuestionsCreateCtrlFunction($state, $stateParams, QuestionFactory){
      this.question = new QuestionFactory()
      this.create = function(){
        this.question.$save(this.question, function(data){
          let id = data._id
          $state.go('show', { id: id})
        })
      }
    }
