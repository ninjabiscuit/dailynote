require.config({
  paths: {
    "tpl" : "requirejs-tpl/tpl",
    "underscore" : "underscore/underscore",
    "backbone" : "backbone/backbone",
    "offline" : "backbone.offline/js/backbone_offline",
    "jquery": "jquery/jquery",
    "webwriter": "webwriter/dist/webwriter",

    "app-router" : "app/app-router",
    "app-view" : "views/app-view"
  },
  shim: {
    'offline': {
      exports: 'Offline',
      deps: ['backbone', 'underscore']
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['backbone', 'jquery', 'webwriter', "app-router", "app-view"],
  function(Backbone, $, WebWriter, AppRouter, AppView){

    $(document.body).ready(function(){

      $.ajaxSetup({
        headers: {"X-CSRF-Token": $("meta[name='csrf-token']").attr('content')}
      });

      new AppRouter(new AppView());

      // allow :active styles to work in your CSS on a page in Mobile Safari
      // http://css-tricks.com/snippets/css/remove-gray-highlight-when-tapping-links-in-mobile-safari/
      document.addEventListener("touchstart", function(){}, true);

      Backbone.history.start({pushState: true});

    });
  }
);
