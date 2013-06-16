define([
  'underscore',
  'backbone',
  'jquery',
  'webwriter'
  ], function(_, Backbone, $, WebWriter) {

  var today = (function(date) {
    return [
      date.getFullYear(),
      add_leading_zero(date.getMonth() + 1),
      add_leading_zero(date.getDate())
    ].join("-");
  })(new Date());

  function is_model_day_today(model){
    return model.get("day") === today;
  }

  function add_leading_zero(number) {
    return (number < 10) ? ("0" + number) : number;
  }

  return Backbone.View.extend({

    on_collection_sync : function(){
      this.set_model();
      this.render();
    },

    set_model : function() {
      this.model = (this.collection.length) ?
        this.collection.find(is_model_day_today) :
        this.collection.add({ day : today });
    },

    initialize : function() {
      this.listenToOnce(this.collection, "sync", this.on_collection_sync);
    },

    render : function() {
      console.log(this.model.get("content"));
      this.editor = new WebWriter(this.model.get("content") || "");

      this.editor.goDocStart();
      this.editor.focusInput();

      $(this.editor.element.input)
        .on("keyup", _.debounce(_.bind(this.on_key_up, this), 500));

      this.editor.save = _.bind(this.save, this);
    },

    on_key_up : function() {
      this.editor.save();
    },

    save : function(content) {
      this.model.save({content : this.editor.getText(1, this.editor.getSize())});
    }

  });
});