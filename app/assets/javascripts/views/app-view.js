define([
  'underscore',
  'backbone',
  'jquery',
  'collections/notes_collection'
  ], function(_, Backbone, $, NotesCollection) {

  return Backbone.View.extend({

    el : "#app_container",

    events : {
      "click a.navigate" : "captureClicks"
    },

    current_view : undefined,

    initialize : function() {

      this.collections = {
        note_collection : new NotesCollection()
      };

    },

    captureClicks : function(evt) {
      evt.preventDefault();

      var path = evt.currentTarget.getAttribute("href");

      // hack to reload page if the new path is the same as the old one
      if (path === window.location.pathname) {
        Backbone.history.loadUrl(path);
      } else {
        Backbone.history.navigate(path, true);
      }

    },

    show : function(view) {

      if (!_.isUndefined(this.current_page)) {
        this.current_page.deactivate("right");
      }

      this.current_page = this.activateView(view);

      if (typeof view.afterRender === "function") {
        view.afterRender.call(view);
      }
    },

    activateView : function(view) {
      this.$el.append(view.render().$el);
      view.activate("right");
      return view;
    }

  });
});