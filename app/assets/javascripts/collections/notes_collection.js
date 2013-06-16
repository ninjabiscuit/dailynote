define([
  'backbone',
  'models/note',
  'offline'
  ],
  function(Backbone, Note, Offline) {

    return Backbone.Collection.extend({

      model : Note,

      url : '/notes',

      initialize : function() {
        // this.storage = new Offline.Storage('notes', this, {autoPush: true});
        this.fetch();
      }

    });
  });