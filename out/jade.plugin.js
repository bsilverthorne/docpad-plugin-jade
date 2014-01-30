// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = function(BasePlugin) {
    var JadePlugin;
    return JadePlugin = (function(_super) {
      __extends(JadePlugin, _super);

      JadePlugin.prototype.name = 'jade';

      JadePlugin.prototype.config = {
        jadeOptions: {
          pretty: false
        },
        environments: {
          development: {
            jadeOptions: {
              pretty: true
            }
          }
        }
      };

      function JadePlugin() {
        JadePlugin.__super__.constructor.apply(this, arguments);
        this.jade = require('jade');
        this;
      }

      JadePlugin.prototype.generateBefore = function() {
        var addTemplateHelperAsJadeFilter, filters, key, templateData, value;
        templateData = this.docpad.getTemplateData();
        filters = this.jade.filters;
        addTemplateHelperAsJadeFilter = function(key, value) {
          return filters[key] != null ? filters[key] : filters[key] = function(str, opts) {
            var args, result;
            if (opts.args) {
              args = str.split(/\s*\n\s*/);
              result = value.apply(templateData, args);
            } else {
              args = [str, opts];
              result = value.apply(templateData, args);
            }
            return result;
          };
        };
        for (key in templateData) {
          if (!__hasProp.call(templateData, key)) continue;
          value = templateData[key];
          if (Object.prototype.toString.call(value) === '[object Function]') {
            addTemplateHelperAsJadeFilter(key, value);
          }
        }
        return this;
      };

      JadePlugin.prototype.render = function(opts, next) {
        var config, err, file, inExtension, jadeOptions, key, templateData, value, _ref, _ref1;
        inExtension = opts.inExtension, templateData = opts.templateData, file = opts.file;
        config = this.config;
        if (inExtension === 'jade') {
          jadeOptions = {
            filename: file.get('fullPath')
          };
          if (config.jadeOptions) {
            _ref = config.jadeOptions;
            for (key in _ref) {
              if (!__hasProp.call(_ref, key)) continue;
              value = _ref[key];
              jadeOptions[key] = value;
            }
          }
          _ref1 = opts.templateData;
          for (key in _ref1) {
            if (!__hasProp.call(_ref1, key)) continue;
            value = _ref1[key];
            if ((value != null ? value.bind : void 0) === Function.prototype.bind) {
              opts.templateData[key] = value.bind(opts.templateData);
            }
          }
          try {
            opts.content = this.jade.compile(opts.content, jadeOptions)(templateData);
          } catch (_error) {
            err = _error;
            return next(err);
          }
        }
        return next();
      };

      return JadePlugin;

    })(BasePlugin);
  };

}).call(this);
