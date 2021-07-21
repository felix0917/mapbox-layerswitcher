(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es6.object.freeze.js'), require('core-js/modules/es6.function.name.js'), require('core-js/modules/es6.string.includes.js'), require('core-js/modules/es7.array.includes.js')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/es6.object.freeze.js', 'core-js/modules/es6.function.name.js', 'core-js/modules/es6.string.includes.js', 'core-js/modules/es7.array.includes.js'], factory) :
  (global = global || self, global.MapboxLayerSwitcher = factory());
}(this, (function () { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".textnoselect {\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n.ml-layerSwitcherBtn {\r\n    width: 29px;\r\n    height: 29px;\r\n    display: block;\r\n    padding: 0;\r\n    outline: none;\r\n    border: 0;\r\n    box-sizing: border-box;\r\n    background-color: white;\r\n    cursor: pointer;\r\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTQuODQ5cHgiIGhlaWdodD0iNTQuODQ5cHgiIHZpZXdCb3g9IjAgMCA1NC44NDkgNTQuODQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NC44NDkgNTQuODQ5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGc+PGc+PHBhdGggZD0iTTU0LjQ5NywzOS42MTRsLTEwLjM2My00LjQ5bC0xNC45MTcsNS45NjhjLTAuNTM3LDAuMjE0LTEuMTY1LDAuMzE5LTEuNzkzLDAuMzE5Yy0wLjYyNywwLTEuMjU0LTAuMTA0LTEuNzktMC4zMThsLTE0LjkyMS01Ljk2OEwwLjM1MSwzOS42MTRjLTAuNDcyLDAuMjAzLTAuNDY3LDAuNTI0LDAuMDEsMC43MTZMMjYuNTYsNTAuODFjMC40NzcsMC4xOTEsMS4yNTEsMC4xOTEsMS43MjksMEw1NC40ODgsNDAuMzNDNTQuOTY0LDQwLjEzOSw1NC45NjksMzkuODE3LDU0LjQ5NywzOS42MTR6Ii8+PHBhdGggZD0iTTU0LjQ5NywyNy41MTJsLTEwLjM2NC00LjQ5MWwtMTQuOTE2LDUuOTY2Yy0wLjUzNiwwLjIxNS0xLjE2NSwwLjMyMS0xLjc5MiwwLjMyMWMtMC42MjgsMC0xLjI1Ni0wLjEwNi0xLjc5My0wLjMyMWwtMTQuOTE4LTUuOTY2TDAuMzUxLDI3LjUxMmMtMC40NzIsMC4yMDMtMC40NjcsMC41MjMsMC4wMSwwLjcxNkwyNi41NiwzOC43MDZjMC40NzcsMC4xOSwxLjI1MSwwLjE5LDEuNzI5LDBsMjYuMTk5LTEwLjQ3OUM1NC45NjQsMjguMDM2LDU0Ljk2OSwyNy43MTYsNTQuNDk3LDI3LjUxMnoiLz48cGF0aCBkPSJNMC4zNjEsMTYuMTI1bDEzLjY2Miw1LjQ2NWwxMi41MzcsNS4wMTVjMC40NzcsMC4xOTEsMS4yNTEsMC4xOTEsMS43MjksMGwxMi41NDEtNS4wMTZsMTMuNjU4LTUuNDYzYzAuNDc3LTAuMTkxLDAuNDgtMC41MTEsMC4wMS0wLjcxNkwyOC4yNzcsNC4wNDhjLTAuNDcxLTAuMjA0LTEuMjM2LTAuMjA0LTEuNzA4LDBMMC4zNTEsMTUuNDFDLTAuMTIxLDE1LjYxNC0wLjExNiwxNS45MzUsMC4zNjEsMTYuMTI1eiIvPjwvZz48L2c+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg==);\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: 70%;\r\n    border-radius: 4px;\r\n}\r\n";
  styleInject(css_248z);

  var css_248z$1 = "/*\r\n thematic layers\r\n*/\r\n\r\n.ml-panel-1 {\r\n    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;\r\n    font-weight: 600;\r\n    z-index: 1;\r\n    border-radius: 3px;\r\n    color: #fff;\r\n    min-width: 120px;\r\n}\r\n\r\n.ml-panel-1 input[type=checkbox]:first-child+label {\r\n    border-radius: 3px 3px 0 0;\r\n}\r\n\r\n.ml-panel-1 label:last-child {\r\n    border-radius: 0 0 3px 3px;\r\n    border: none;\r\n}\r\n\r\n.ml-panel-1 input[type=checkbox] {\r\n    display: none;\r\n}\r\n\r\n.ml-panel-1 input[type=checkbox]+label {\r\n    background-color: #3386c0;\r\n    display: block;\r\n    cursor: pointer;\r\n    padding: 10px;\r\n    border-bottom: 1px solid rgba(0, 0, 0, 0.25);\r\n    text-align: center;\r\n}\r\n\r\n.ml-panel-1 input[type=checkbox]+label {\r\n    background-color: #3386c0;\r\n    text-transform: capitalize;\r\n}\r\n\r\n.ml-panel-1 input[type=checkbox]+label:hover, .listing-group input[type=checkbox]:checked+label {\r\n    background-color: #4ea0da;\r\n}\r\n\r\n.ml-panel-1 input[type=checkbox]:checked+label:before {\r\n    content: '✔';\r\n    margin-right: 5px;\r\n}\r\n\r\n/*\r\n    base layers\r\n*/\r\n\r\n.ml-panel-1 input[type=radio]:first-child+label {\r\n    border-radius: 3px 3px 0 0;\r\n}\r\n\r\n.ml-panel-1 label:last-child {\r\n    border-radius: 0 0 3px 3px;\r\n    border: none;\r\n}\r\n\r\n.ml-panel-1 input[type=radio] {\r\n    display: none;\r\n}\r\n\r\n.ml-panel-1 input[type=radio]+label {\r\n    background-color: #3386c0;\r\n    display: block;\r\n    cursor: pointer;\r\n    padding: 10px;\r\n    border-bottom: 1px solid rgba(0, 0, 0, 0.25);\r\n    text-align: center;\r\n}\r\n\r\n.ml-panel-1 input[type=radio]+label {\r\n    background-color: #3386c0;\r\n    text-transform: capitalize;\r\n}\r\n\r\n.ml-panel-1 input[type=radio]+label:hover, .listing-group input[type=radio]:checked+label {\r\n    background-color: #4ea0da;\r\n}\r\n\r\n.ml-panel-1 input[type=radio]:checked+label:before {\r\n    content: '✔';\r\n    margin-right: 5px;\r\n}\r\n";
  styleInject(css_248z$1);

  var css_248z$2 = ".ml-panel-2 {\r\n    background: #fff;\r\n    position: absolute;\r\n    z-index: 1;\r\n    top: 10px;\r\n    right: 10px;\r\n    border-radius: 3px;\r\n    min-width: 120px;\r\n    border: 1px solid rgba(0, 0, 0, 0.4);\r\n    font-family: 'Open Sans', sans-serif;\r\n}\r\n\r\n.ml-panel-2 a {\r\n    font-size: 13px;\r\n    color: #404040;\r\n    display: block;\r\n    margin: 0;\r\n    padding: 0;\r\n    padding: 10px;\r\n    text-decoration: none;\r\n    border-bottom: 1px solid rgba(0, 0, 0, 0.25);\r\n    text-align: center;\r\n}\r\n\r\n.ml-panel-2 a:last-child {\r\n    border: none;\r\n}\r\n\r\n.ml-panel-2 a:hover {\r\n    background-color: #f8f8f8;\r\n    color: #404040;\r\n}\r\n\r\n.ml-panel-2 a.active {\r\n    background-color: #3887be;\r\n    color: #ffffff;\r\n}\r\n\r\n.ml-panel-2 a.active:hover {\r\n    background: #3074a4;\r\n}";
  styleInject(css_248z$2);

  var css_248z$3 = ".ml-panel-tree1 {\r\n    margin: 0;\r\n    border: 4px solid #eee;\r\n    border-radius: 4px;\r\n    background-color: white;\r\n    max-height: inherit;\r\n    height: 100%;\r\n    box-sizing: border-box;\r\n    overflow-y: auto;\r\n    min-width: 240px;\r\n    font-size: 13px;\r\n}\r\n\r\n.ml-panel-tree1 ul {\r\n    list-style: none;\r\n    margin: 1.6em 0.4em;\r\n    padding-left: 0;\r\n}\r\n\r\n.ml-panel-tree1 li {\r\n    position: relative;\r\n    margin-top: 0.3em;\r\n    margin-top: 0px;\r\n    font-size: 1em;\r\n}\r\n\r\n.ml-basemap-group label {\r\n    padding-left: 1.2em;\r\n    font-size: 13px;\r\n}\r\n\r\n.ml-basemap-group ul {\r\n    padding-left: 1.2em;\r\n    margin: 0.1em 0 0 0;\r\n}\r\n\r\n.ml-basemap-group li {\r\n    position: relative;\r\n    margin-top: 0.3em;\r\n}\r\n\r\n.ml-basemap-group li input {\r\n    position: absolute;\r\n    left: 1.2em;\r\n    height: 1em;\r\n    width: 1em;\r\n    font-size: 1em;\r\n    margin: 0px;\r\n    margin-top: 0.35em;\r\n}\r\n\r\n.ml-basemap-group li label {\r\n    padding-left: 2.7em;\r\n    padding-right: 1.2em;\r\n    display: inline-block;\r\n    margin-top: 1px;\r\n    font-size: 13px;\r\n}\r\n\r\n.ml-overlay-group li {\r\n    position: relative;\r\n    margin-top: 0.3em;\r\n}\r\n\r\n.ml-overlay-group button {\r\n    position: absolute;\r\n    left: 0;\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    float: none;\r\n    font-size: 1em;\r\n    width: 1em;\r\n    height: 1em;\r\n    margin: 0;\r\n    background-position: center 2px;\r\n    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAW0lEQVR4nGNgGAWMyBwXFxcGBgaGeii3EU0tXHzPnj1wQRYsihqQ+I0ExDEMQAYNONgoAN0AmMkNaDSyQSheY8JiaCMOGzE04zIAmyFYNTMw4A+DRhzsUUBtAADw4BCeIZkGdwAAAABJRU5ErkJggg==');\r\n    transition: -webkit-transform 0.2s ease-in-out;\r\n    transition: transform 0.2s ease-in-out;\r\n    transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;\r\n    background-color: white;\r\n    color: black;\r\n    border: none;\r\n}\r\n\r\n.ml-overlay-group input {\r\n    position: absolute;\r\n    left: 1.2em;\r\n    height: 1em;\r\n    width: 1em;\r\n    font-size: 1em;\r\n    margin: 0px;\r\n}\r\n\r\n.ml-overlay-group label {\r\n    padding-left: 2.7em;\r\n    padding-right: 1.2em;\r\n    display: inline-block;\r\n    margin-top: 1px;\r\n    font-size: 13px;\r\n}\r\n\r\n.ml-overlay-group ul {\r\n    padding-left: 1.2em;\r\n    margin: 0.1em 0 0 0;\r\n}\r\n\r\n.ml-overlay-group-label, .ml-basemap-group-label {\r\n    font-weight: bold;\r\n}\r\n\r\n.ml-overlay-layer, .ml-basemap-layer {\r\n    font-weight: unset;\r\n}\r\n\r\n.ml-menu-button-close {\r\n    transform: rotate(-90deg);\r\n    -webkit-transform: rotate(-90deg);\r\n}\r\n\r\n.ml-menu-close>ul {\r\n    height: 0px;\r\n    overflow: hidden;\r\n}";
  styleInject(css_248z$3);

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Returns the first parameter if not undefined, otherwise the second parameter.
   * Useful for setting a default value for a parameter.
   *
   * @function
   *
   * @param {*} a
   * @param {*} b
   * @returns {*} Returns the first parameter if not undefined, otherwise the second parameter.
   *
   * @example
   * param = Cesium.defaultValue(param, 'default');
   */
  function defaultValue(a, b) {
    if (a !== undefined && a !== null) {
      return a;
    }

    return b;
  }
  /**
   * A frozen empty object that can be used as the default value for options passed as
   * an object literal.
   * @type {Object}
   * @memberof defaultValue
   */


  defaultValue.EMPTY_OBJECT = Object.freeze({});

  var SimpleSwitcher1 = /*#__PURE__*/function () {
    function SimpleSwitcher1(map, container, layers, activemode) {
      _classCallCheck(this, SimpleSwitcher1);

      this._map = map;
      this._container = container;
      this._layers = layers;
      this._activemode = activemode;
      this.init();
    }

    _createClass(SimpleSwitcher1, [{
      key: "init",
      value: function init() {
        if (!this._layers) return;
        this._container.className = 'mapboxgl-ctrl';
        this._panel = document.createElement('nav');
        this._panel.id = 'ml-panel-1';
        this._panel.className = 'ml-panel-1';
        this._panelContentStr = '';

        if (this._activemode !== 'none') {
          this.createLayerSwitcherBtn();
        }

        this.layersClassify();
        this.createOverlaysPanel();
        this.createBasemapsPanel();
        this._panel.innerHTML = this._panelContentStr;

        this._container.appendChild(this._panel);

        this.addPanelEvent();
      }
      /**
       * 将layers划分成overlays和basemaps两个数组中，便于分类管理
       */

    }, {
      key: "layersClassify",
      value: function layersClassify() {
        this._overlays = [];
        this._basemaps = [];
        var layers = this._layers;

        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          var type = layer.type;

          if (type === 'base') {
            this._basemaps.push(layer);
          } else {
            this._overlays.push(layer);
          }
        }
      }
      /**
       * 创建图层选择器控件
       */

    }, {
      key: "createLayerSwitcherBtn",
      value: function createLayerSwitcherBtn() {
        this._layerSwitcherBtn = document.createElement('button');
        this._layerSwitcherBtn.className = 'ml-layerSwitcherBtn';

        switch (this._activemode) {
          case 'click':
            this.layerSwitcherBtnClicKMode();
            break;

          case 'mouseover':
            this.layerSwitcherBtnMouseOverMode();
            break;
        }
      }
    }, {
      key: "layerSwitcherBtnClicKMode",
      value: function layerSwitcherBtnClicKMode() {
        var _this = this;

        this._layerSwitcherBtn.addEventListener('click', function () {
          var panelVis = _this._panel.style.display;

          if (panelVis === 'none') {
            _this._panel.setAttribute('style', 'display:block');

            _this._layerSwitcherBtn.setAttribute('style', 'display:none');
          }
        });

        this._map.on('click', function () {
          var panelVis = _this._panel.style.display;

          if (panelVis !== 'none') {
            _this._panel.setAttribute('style', 'display:none');

            _this._layerSwitcherBtn.setAttribute('style', 'display:block');
          }
        });

        this._panel.setAttribute('style', 'display:none');

        this._container.appendChild(this._layerSwitcherBtn);
      }
    }, {
      key: "layerSwitcherBtnMouseOverMode",
      value: function layerSwitcherBtnMouseOverMode() {
        var _this2 = this;

        this._layerSwitcherBtn.addEventListener('mouseenter', function () {
          var panelVis = _this2._panel.style.display;

          if (panelVis === 'none') {
            _this2._panel.setAttribute('style', 'display:block');

            _this2._layerSwitcherBtn.setAttribute('style', 'display:none');
          }
        });

        this._panel.addEventListener('mouseleave', function () {
          var panelVis = _this2._panel.style.display;

          if (panelVis !== 'none') {
            _this2._panel.setAttribute('style', 'display:none');

            _this2._layerSwitcherBtn.setAttribute('style', 'display:block');
          }
        });

        this._panel.setAttribute('style', 'display:none');

        this._container.appendChild(this._layerSwitcherBtn);
      }
      /**
       * 创建basemap图层面板
       */

    }, {
      key: "createBasemapsPanel",
      value: function createBasemapsPanel() {
        var basemaps = this._basemaps;

        for (var i = 0; i < basemaps.length; i++) {
          var _basemaps$i = basemaps[i],
              id = _basemaps$i.id,
              name = _basemaps$i.name,
              type = _basemaps$i.type;
          this._panelContentStr += "<input type='radio' id='".concat(id, "' layertype='").concat(type, "' name='").concat(type, "' checked='checked' />\n                <label for='").concat(id, "' class='textnoselect'>").concat(name ? name : id, "</label>");
        }
      }
      /**
       * 创建overlays图层面板
       */

    }, {
      key: "createOverlaysPanel",
      value: function createOverlaysPanel() {
        this._checked = {};
        var overlays = this._overlays;

        for (var i = 0; i < overlays.length; i++) {
          var _overlays$i = overlays[i],
              id = _overlays$i.id,
              name = _overlays$i.name,
              type = _overlays$i.type;
          this._panelContentStr += "<input type='checkbox' id='".concat(id, "' layertype='").concat(type ? type : '', "' checked='checked' />\n                <label for='").concat(id, "' class='textnoselect'>").concat(name ? name : id, "</label>");
          this._checked[id] = true;
        }
      }
      /**
       * 给图层面板添加点击事件
       */

    }, {
      key: "addPanelEvent",
      value: function addPanelEvent() {
        var _this3 = this;

        this._map.once('load', function () {
          document.getElementById('ml-panel-1').addEventListener('change', function (e) {
            var type = e.target.attributes.layertype.nodeValue;

            if (type === 'base') {
              // base layers
              _this3.changeBaseMap(e);
            } else {
              // Overlay layers
              _this3.changeOverlaysVisible(e);
            }

            _this3._map._update();
          });
        });
      }
      /**
       * 切换basemap
       * @param {Event} e 
       */

    }, {
      key: "changeBaseMap",
      value: function changeBaseMap(e) {
        var _this4 = this;

        var mapstyle = e.target.id;

        this._map.setStyle(mapstyle);

        this._map.on('style.load', function () {
          for (var layerId in _this4._checked) {
            var visibility = _this4._checked[layerId] ? 'visible' : 'none';

            _this4._map.setLayoutProperty(layerId, 'visibility', visibility);
          }
        });
      }
      /**
       * 改变overlay图层显隐性
       * @param {Event} e 
       */

    }, {
      key: "changeOverlaysVisible",
      value: function changeOverlaysVisible(e) {
        var layerId = e.target.id;

        if (e.target.checked) {
          this._map.setLayoutProperty(layerId, 'visibility', 'visible');

          this._checked[layerId] = true;
        } else {
          this._map.setLayoutProperty(layerId, 'visibility', 'none');

          this._checked[layerId] = false;
        }
      }
    }]);

    return SimpleSwitcher1;
  }();

  var SimpleSwitcher2 = /*#__PURE__*/function () {
    function SimpleSwitcher2(map, container, layers, activemode) {
      _classCallCheck(this, SimpleSwitcher2);

      this._map = map;
      this._container = container;
      this._layers = layers;
      this._activemode = activemode;
      this.init();
    }

    _createClass(SimpleSwitcher2, [{
      key: "init",
      value: function init() {
        if (!this._layers) return;
        this._container.className = 'mapboxgl-ctrl';
        this._panel = document.createElement('nav');
        this._panel.id = 'ml-panel-2';
        this._panel.className = 'ml-panel-2';
        this._panelContentStr = '';

        if (this._activemode !== 'none') {
          this.createLayerSwitcherBtn();
        }

        this.layersClassify();
        this.createOverlaysPanel();
        this.createBasemapsPanel();
        this._panel.innerHTML = this._panelContentStr;

        this._container.appendChild(this._panel);

        this.addPanelEvent();
      }
      /**
       * 将layers划分成overlays和basemaps两个数组中，便于分类管理
       */

    }, {
      key: "layersClassify",
      value: function layersClassify() {
        this._overlays = [];
        this._basemaps = [];
        var layers = this._layers;

        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          var type = layer.type;

          if (type === 'base') {
            this._basemaps.push(layer);
          } else {
            this._overlays.push(layer);
          }
        }
      }
      /**
       * 创建图层选择器控件
       */

    }, {
      key: "createLayerSwitcherBtn",
      value: function createLayerSwitcherBtn() {
        this._layerSwitcherBtn = document.createElement('button');
        this._layerSwitcherBtn.className = 'ml-layerSwitcherBtn';

        switch (this._activemode) {
          case 'click':
            this.layerSwitcherBtnClicKMode();
            break;

          case 'mouseover':
            this.layerSwitcherBtnMouseOverMode();
            break;
        }
      }
    }, {
      key: "layerSwitcherBtnClicKMode",
      value: function layerSwitcherBtnClicKMode() {
        var _this = this;

        this._layerSwitcherBtn.addEventListener('click', function () {
          var panelVis = _this._panel.style.display;

          if (panelVis === 'none') {
            _this._panel.setAttribute('style', 'display:block');

            _this._layerSwitcherBtn.setAttribute('style', 'display:none');
          }
        });

        this._map.on('click', function () {
          var panelVis = _this._panel.style.display;

          if (panelVis !== 'none') {
            _this._panel.setAttribute('style', 'display:none');

            _this._layerSwitcherBtn.setAttribute('style', 'display:block');
          }
        });

        this._panel.setAttribute('style', 'display:none');

        this._container.appendChild(this._layerSwitcherBtn);
      }
    }, {
      key: "layerSwitcherBtnMouseOverMode",
      value: function layerSwitcherBtnMouseOverMode() {
        var _this2 = this;

        this._layerSwitcherBtn.addEventListener('mouseenter', function () {
          var panelVis = _this2._panel.style.display;

          if (panelVis === 'none') {
            _this2._panel.setAttribute('style', 'display:block');

            _this2._layerSwitcherBtn.setAttribute('style', 'display:none');
          }
        });

        this._panel.addEventListener('mouseleave', function () {
          var panelVis = _this2._panel.style.display;

          if (panelVis !== 'none') {
            _this2._panel.setAttribute('style', 'display:none');

            _this2._layerSwitcherBtn.setAttribute('style', 'display:block');
          }
        });

        this._panel.setAttribute('style', 'display:none');

        this._container.appendChild(this._layerSwitcherBtn);
      }
      /**
       * 创建basemap图层面板
       */

    }, {
      key: "createBasemapsPanel",
      value: function createBasemapsPanel() {
        var basemaps = this._basemaps; // let curStyle = this._map;

        for (var i = 0; i < basemaps.length; i++) {
          var _basemaps$i = basemaps[i],
              id = _basemaps$i.id,
              name = _basemaps$i.name,
              type = _basemaps$i.type;
          this._panelContentStr += "<a id='".concat(id, "' name='base' href='#' class='").concat(i === 0 ? 'active' : '', "' layertype='").concat(type ? type : '', "'>").concat(name ? name : id, "</a>");
        }
      }
      /**
       * 创建overlays图层面板
       */

    }, {
      key: "createOverlaysPanel",
      value: function createOverlaysPanel() {
        this._checked = {};
        var overlays = this._overlays;

        for (var i = 0; i < overlays.length; i++) {
          var _overlays$i = overlays[i],
              id = _overlays$i.id,
              name = _overlays$i.name,
              type = _overlays$i.type;
          this._panelContentStr += "<a id='".concat(id, "' href='#' class='active' layertype='").concat(type ? type : '', "'>").concat(name ? name : id, "</a>");
          this._checked[id] = true;
        }
      }
      /**
       * 给图层面板添加点击事件
       */

    }, {
      key: "addPanelEvent",
      value: function addPanelEvent() {
        var _this3 = this;

        this._map.once('load', function () {
          document.getElementById('ml-panel-2').addEventListener('click', function (e) {
            var type = e.target.attributes.layertype.nodeValue;

            if (type === 'base') {
              // base layers
              _this3.changeBaseMap(e);
            } else {
              // Overlay layers
              _this3.changeOverlaysVisible(e);
            }

            _this3._map._update();
          });
        });
      }
      /**
       * 切换basemap
       * @param {Event} e 
       */

    }, {
      key: "changeBaseMap",
      value: function changeBaseMap(e) {
        var _this4 = this;

        var mapstyle = e.target.id;

        this._map.setStyle(mapstyle, {
          diff: false
        }); // todo: 此处有性能损失，待评估


        var alinkArrLike = e.target.parentNode.children;

        for (var i = 0; i < alinkArrLike.length; i++) {
          if (alinkArrLike[i].name !== 'base') continue;

          if (alinkArrLike[i].id !== mapstyle) {
            alinkArrLike[i].className = '';
          } else {
            alinkArrLike[i].className = 'active';
          }
        }

        this._map.once('style.load', function () {
          for (var layerId in _this4._checked) {
            var visibility = _this4._checked[layerId] ? 'visible' : 'none';

            _this4._map.setLayoutProperty(layerId, 'visibility', visibility);
          }
        });
      }
      /**
       * 改变overlay图层显隐性
       * @param {Event} e 
       */

    }, {
      key: "changeOverlaysVisible",
      value: function changeOverlaysVisible(e) {
        var layerId = e.target.id;
        var alink = document.getElementById(layerId);

        if (!this._checked[layerId]) {
          this._map.setLayoutProperty(layerId, 'visibility', 'visible');

          alink.className = 'active';
          this._checked[layerId] = true;
        } else {
          this._map.setLayoutProperty(layerId, 'visibility', 'none');

          alink.className = '';
          this._checked[layerId] = false;
        }
      }
    }]);

    return SimpleSwitcher2;
  }();

  var TreeSwitcher1 = /*#__PURE__*/function () {
    function TreeSwitcher1(map, container, layers, activemode) {
      _classCallCheck(this, TreeSwitcher1);

      this._map = map;
      this._container = container;
      this._layers = layers;
      this._activemode = activemode;
      this.init();
    }

    _createClass(TreeSwitcher1, [{
      key: "init",
      value: function init() {
        if (!this._layers) return;
        this._container.className = 'mapboxgl-ctrl';
        this._panel = document.createElement('div');
        this._panel.id = 'ml-panel-tree1';
        this._panel.className = 'ml-panel-tree1';
        this._panelContent = document.createElement('ul');
        this._panelContent.name = 'ml-parentul';

        if (this._activemode !== 'none') {
          this.createLayerSwitcherBtn();
        }

        this.layersClassify();
        this.createOverlaysPanel();
        this.createBasemapsPanel();

        this._panel.appendChild(this._panelContent);

        this._container.appendChild(this._panel);

        this.addBasemapEvent();
        this.addOverlaysEvent();
      }
      /**
       * 将layers划分成overlays和basemaps两个数组中，便于分类管理
       */

    }, {
      key: "layersClassify",
      value: function layersClassify() {
        this._overlays = [];
        this._basemaps = [];
        var layers = this._layers;

        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          var type = layer.type;

          if (type === 'base') {
            this._basemaps.push(layer);
          } else {
            this._overlays.push(layer);
          }
        }
      }
      /**
       * 创建图层选择器控件
       */

    }, {
      key: "createLayerSwitcherBtn",
      value: function createLayerSwitcherBtn() {
        this._layerSwitcherBtn = document.createElement('button');
        this._layerSwitcherBtn.className = 'ml-layerSwitcherBtn';

        switch (this._activemode) {
          case 'click':
            this.layerSwitcherBtnClicKMode();
            break;

          case 'mouseover':
            this.layerSwitcherBtnMouseOverMode();
            break;
        }
      }
    }, {
      key: "layerSwitcherBtnClicKMode",
      value: function layerSwitcherBtnClicKMode() {
        var _this = this;

        this._layerSwitcherBtn.addEventListener('click', function () {
          var panelVis = _this._panel.style.display;

          if (panelVis === 'none') {
            _this._panel.setAttribute('style', 'display:block');

            _this._layerSwitcherBtn.setAttribute('style', 'display:none');
          }
        });

        this._map.on('click', function () {
          var panelVis = _this._panel.style.display;

          if (panelVis !== 'none') {
            _this._panel.setAttribute('style', 'display:none');

            _this._layerSwitcherBtn.setAttribute('style', 'display:block');
          }
        });

        this._panel.setAttribute('style', 'display:none');

        this._container.appendChild(this._layerSwitcherBtn);
      }
    }, {
      key: "layerSwitcherBtnMouseOverMode",
      value: function layerSwitcherBtnMouseOverMode() {
        var _this2 = this;

        this._layerSwitcherBtn.addEventListener('mouseenter', function () {
          var panelVis = _this2._panel.style.display;

          if (panelVis === 'none') {
            _this2._panel.setAttribute('style', 'display:block');

            _this2._layerSwitcherBtn.setAttribute('style', 'display:none');
          }
        });

        this._panel.addEventListener('mouseleave', function () {
          var panelVis = _this2._panel.style.display;

          if (panelVis !== 'none') {
            _this2._panel.setAttribute('style', 'display:none');

            _this2._layerSwitcherBtn.setAttribute('style', 'display:block');
          }
        });

        this._panel.setAttribute('style', 'display:none');

        this._container.appendChild(this._layerSwitcherBtn);
      }
      /**
       * 创建basemap图层面板
       */

    }, {
      key: "createBasemapsPanel",
      value: function createBasemapsPanel() {
        var basemaps = this._basemaps;
        var len = basemaps.length;

        if (len > 0) {
          var li = document.createElement('li');
          li.className = 'ml-basemap-group';
          li.id = 'ml-basemap-group';
          var label = document.createElement('label');
          label.innerText = 'Base maps';
          label.className = 'ml-basemap-group-label';
          li.appendChild(label);

          this._panelContent.appendChild(li);

          var ul = document.createElement('ul');
          var listr = '';

          for (var i = 0; i < len; i++) {
            var _basemaps$i = basemaps[i],
                id = _basemaps$i.id,
                name = _basemaps$i.name,
                type = _basemaps$i.type;
            listr += "<li class='ml-basemap-layer'>\n                        <input type='radio' name='ml-".concat(type, "map-radio' id='").concat(id, "' checked='").concat(i === 0 ? 'checked' : '', "'/>\n                        <label for='").concat(type, "'>").concat(name ? name : id, "</label>\n                    </li>");
          }

          ul.innerHTML = listr;
          li.appendChild(ul);

          this._panelContent.appendChild(li);
        }
      }
      /**
       * 初始化overlays图层面板
       */

    }, {
      key: "createOverlaysPanel",
      value: function createOverlaysPanel() {
        this._checked = {};
        var overlays = this._overlays;
        var len = overlays.length;

        if (len > 0) {
          var li = document.createElement('li');
          li.className = 'ml-overlay-group';
          li.id = 'ml-overlay-group';
          var button = document.createElement('button');
          button.addEventListener('click', function (e) {
            var btnClassname = e.target.className;

            if (btnClassname.includes('ml-menu-button-close')) {
              e.target.className = '';
              li.classList.remove('ml-menu-close');
            } else {
              e.target.className = 'ml-menu-button-close';
              li.classList.add('ml-menu-close');
            }
          });
          var input = document.createElement('input');
          input.type = 'checkbox';
          input.id = 'ml-layergroup-checkbox';
          input.checked = 'checked';
          var label = document.createElement('label');
          label.innerText = 'Overlays';
          label.className = 'ml-overlay-group-label';
          label["for"] = 'ml-layergroup-checkbox';
          li.appendChild(button);
          li.appendChild(input);
          li.appendChild(label);

          this._panelContent.appendChild(li);

          this.createSubTreeNode(overlays, li);
        }
      }
      /**
       * 递归实现overlays面板各父子节点创建
       * @param {Array} overlays - overlays图层数组
       * @param {HTMLElement} parentli - li元素节点
       */

    }, {
      key: "createSubTreeNode",
      value: function createSubTreeNode(overlays, parentli) {
        var _this3 = this;

        var len = overlays.length;
        var ul = document.createElement('ul');
        ul.name = 'ml-parentul';

        for (var i = 0; i < len; i++) {
          var overlay = overlays[i];
          var id = overlay.id,
              name = overlay.name,
              children = overlay.children;

          if (children) {
            (function () {
              var li = document.createElement('li');
              li.className = 'ml-overlay-group';
              var button = document.createElement('button');
              button.addEventListener('click', function (e) {
                var btnClassname = e.target.className;

                if (btnClassname.includes('ml-menu-button-close')) {
                  e.target.className = '';
                  li.classList.remove('ml-menu-close');
                } else {
                  e.target.className = 'ml-menu-button-close';
                  li.classList.add('ml-menu-close');
                }
              });
              var input = document.createElement('input');
              input.type = 'checkbox';
              input.name = 'ml-layergroup-checkbox';
              input.checked = 'checked';
              var label = document.createElement('label');
              label.className = 'ml-overlay-group-label';
              label.innerText = name ? name : id;
              li.appendChild(button);
              li.appendChild(input);
              li.appendChild(label);
              ul.appendChild(li);

              _this3.createSubTreeNode(children, li);
            })();
          } else {
            var li = document.createElement('li');
            li.className = 'ml-overlay-layer';
            li.id = id;
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'ml-overlay-checkbox';
            input.checked = 'checked';
            this._checked[id] = true;
            var label = document.createElement('label');
            label.innerText = name ? name : id;
            li.appendChild(input);
            li.appendChild(label);
            ul.appendChild(li);
          }
        }

        parentli.appendChild(ul);
      }
      /**
       * 添加basemap图层控件点击事件
       */

    }, {
      key: "addBasemapEvent",
      value: function addBasemapEvent() {
        var _this4 = this;

        this._map.once('load', function () {
          var basemapgroup = document.getElementById('ml-basemap-group');
          basemapgroup.addEventListener('click', function (e) {
            if (e.target.name === 'ml-basemap-radio') {
              _this4.changeBaseMap(e);
            }
          });
        });
      }
      /**
       * 添加overlay图层控件点击事件
       */

    }, {
      key: "addOverlaysEvent",
      value: function addOverlaysEvent() {
        var _this5 = this;

        this._map.once('load', function () {
          //overlay layer li
          var liarr = document.getElementsByClassName('ml-overlay-layer');

          var _loop = function _loop(i) {
            var li = liarr[i];
            var layerId = li.id;
            li.addEventListener('click', function (e) {
              if (e.target.type === 'checkbox') {
                var checked = e.target.checked;
                var visibility = checked ? 'visible' : 'none';

                _this5._map.setLayoutProperty(layerId, 'visibility', visibility);

                _this5._checked[layerId] = checked;
                var parentul = e.target.parentNode.parentNode;

                _this5.layerCheckboxChanged(parentul);
              }
            });
          };

          for (var i = 0; i < liarr.length; i++) {
            _loop(i);
          } // overlay layergroup li


          var liarr2 = document.getElementsByClassName('ml-overlay-group');

          var _loop2 = function _loop2(_i) {
            var li = liarr2[_i];
            var inputList = li.querySelectorAll('input');
            var rootinput = inputList[0];
            rootinput.addEventListener('change', function (e) {
              for (var j = 1; j < inputList.length; j++) {
                var input = inputList[j];
                var checked = rootinput.checked;
                input.checked = checked;

                if (input.name === 'ml-overlay-checkbox') {
                  var visibility = checked ? 'visible' : 'none';
                  var layerId = input.parentNode.id;

                  _this5._map.setLayoutProperty(layerId, 'visibility', visibility);

                  _this5._checked[layerId] = checked;
                  var parentul = e.target.parentNode.parentNode;

                  _this5.layergroupCheckboxChanged(parentul);
                }
              }
            });
          };

          for (var _i = 0; _i < liarr2.length; _i++) {
            _loop2(_i);
          }
        });
      }
      /**
       * 切换basemap
       * @param {Event} e 
       */

    }, {
      key: "changeBaseMap",
      value: function changeBaseMap(e) {
        var _this6 = this;

        var mapstyle = e.target.id;

        this._map.setStyle(mapstyle, {
          diff: false
        }); // todo: 此处有性能损失，待评估


        this._map.once('style.load', function () {
          for (var layerId in _this6._checked) {
            var visibility = _this6._checked[layerId] ? 'visible' : 'none';

            _this6._map.setLayoutProperty(layerId, 'visibility', visibility);
          }
        });
      }
      /**
       * 递归实现：图层组节点控件改变时其父节点控件相应响应事件
       * @param {HTMLElement} parentul - ul元素节点
       * @returns 
       */

    }, {
      key: "layergroupCheckboxChanged",
      value: function layergroupCheckboxChanged(parentul) {
        if (parentul.name !== 'ml-parentul') return;
        var inputlist = parentul.querySelectorAll('input');
        var childCheckCount = 0;

        for (var i = 0; i < inputlist.length; i++) {
          if (inputlist[i].checked) {
            childCheckCount++;
          }
        }

        if (childCheckCount === 0) {
          parentul.parentNode.children[1].checked = false;
        } else if (childCheckCount === inputlist.length) {
          parentul.parentNode.children[1].checked = true;
        }

        this.layergroupCheckboxChanged(parentul.parentNode.parentNode);
      }
      /**
       * 递归实现：图层节点控件改变时其父节点控件相应响应事件
       * @param {HTMLElement}} parentul - ul元素节点
       * @returns 
       */

    }, {
      key: "layerCheckboxChanged",
      value: function layerCheckboxChanged(parentul) {
        if (parentul.name !== 'ml-parentul') return;
        var inputlist = parentul.querySelectorAll('input');
        var childCheckCount = 0;

        for (var i = 0; i < inputlist.length; i++) {
          if (inputlist[i].checked) {
            childCheckCount++;
          }
        }

        if (childCheckCount === 0) {
          parentul.parentNode.children[1].checked = false;
        } else if (childCheckCount === inputlist.length) {
          parentul.parentNode.children[1].checked = true;
        }

        this.layerCheckboxChanged(parentul.parentNode.parentNode);
      }
    }]);

    return TreeSwitcher1;
  }();

  var MapboxLayerSwitcher = /*#__PURE__*/function () {
    function MapboxLayerSwitcher() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, MapboxLayerSwitcher);

      this._template = defaultValue(options.template, 'simple1');
      this._layers = defaultValue(options.layers, []);
      this._activemode = defaultValue(options.activemode, 'none');
    }

    _createClass(MapboxLayerSwitcher, [{
      key: "onAdd",
      value: function onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');

        switch (this._template) {
          case 'simple1':
            new SimpleSwitcher1(this._map, this._container, this._layers, this._activemode);
            break;

          case 'simple2':
            new SimpleSwitcher2(this._map, this._container, this._layers, this._activemode);
            break;

          case 'tree1':
            new TreeSwitcher1(this._map, this._container, this._layers, this._activemode);
            break;

          default:
            console.error('the template parameters are illegal!');
        }

        return this._container;
      }
    }, {
      key: "onRemove",
      value: function onRemove() {
        this._container.parentNode.removeChild(this._container);

        this._map = undefined;
      }
    }]);

    return MapboxLayerSwitcher;
  }();

  return MapboxLayerSwitcher;

})));
//# sourceMappingURL=mapbox-layerswitcher.js.map
