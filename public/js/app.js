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
    .factory("AnswerFactory", [
      "$resource",
      answerFactoryFunction
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
      "AnswerFactory",
      QuestionsShowCtrlFunction
    ])
    .controller("QuestionsCreateCtrl", [
      "$state",
      "$stateParams",
      "QuestionFactory",
      QuestionsCreateCtrlFunction
    ])
    .controller("AnswerNewEditCtrl", [
      "$state",
      "$stateParams",
      "QuestionFactory",
      "AnswerFactory",
      AnswerNewEditCtrlFunction
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
            .state("edit", {
              url: "/questions/:id/edit",
              templateUrl: "/assets/js/ng-views/edit.html",
              controller: "QuestionsShowCtrl",
              controllerAs: "vm"
            })
            .state("editAnswer", {
              url: "/questions/:id/answers/:answer_id",
              templateUrl: "/assets/js/ng-views/editAnswer.html",
              controller: "AnswerNewEditCtrl",
              controllerAs: "vm"
            })
          $urlRouterProvider.otherwise("/")
        }

    function questionFactoryFunction($resource){
      return $resource('/api/questions/:id', {}, {
        update: { method: "PUT" }
      })
    }

    function answerFactoryFunction($resource){
      return $resource('/api/questions/:id/answers/:answer_id', {}, {
        update: { method: "PUT" }
      })
    }

    function QuestionsIndexCtrlFunction($state, QuestionFactory) {
      this.questions = QuestionFactory.query()
    }

    function QuestionsShowCtrlFunction($state, $stateParams, QuestionFactory, AnswerFactory) {
      this.question = QuestionFactory.get({id: $stateParams.id})
      this.update = function(){
        this.question.$update({id: $stateParams.id}, function(data){
          let id = data._id
          console.log(data)
          $state.go('show', { id: id})
        })
      }
      this.destroy = function() {
        this.question.$delete({id: $stateParams.id}).then(function(){
          $state.go("index")
        })
      }


      this.answer = new AnswerFactory()
      this.addAnswer = function(){
        this.answer.$save({id: $stateParams.id}, function(data){
          let id = data._id
          $state.reload()
        })
      }

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



    function AnswerNewEditCtrlFunction($state, $stateParams, QuestionFactory, AnswerFactory) {
      this.question = QuestionFactory.get({id: $stateParams.id})

      this.answer = AnswerFactory.get({id: $stateParams.id, answer_id: $stateParams.answer_id})
      console.log(this.answer)

      this.editAnswer = function(){
        this.answer.$update({id: $stateParams.id, answer_id: $stateParams.answer_id}, function(){
          $state.go('show', { id: $stateParams.id})
        })
      }

      this.deleteAnswer = function(){
        this.answer.$delete({id: $stateParams.id, answer_id: $stateParams.answer_id}).then(function(){
          $state.go('show', { id: $stateParams.id})
        })
      }


    }
