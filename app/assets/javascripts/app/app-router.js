define([
  'underscore',
  'backbone',
  'views/index'
], function(_, Backbone, Index) {

    return Backbone.Router.extend({

      routes: {
        "" : "index"
      },

      initialize : function(app) {
        this.app = app;
      },

      index : function() {
        new Index({collection : this.app.collections.note_collection});
      }

    });

  });