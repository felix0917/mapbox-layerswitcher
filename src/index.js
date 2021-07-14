import defaultValue from './defaultValue.js';

class MapboxLayerSwitcher {
  constructor(options) {
    this._element = defaultValue(options.element, 'simple');
    this._layers = defaultValue(options.layers, []);
  }

  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'listing-group';
    this._panel = document.createElement('nav');
    this._panel.id = 'switcherPanel';
    this._checkItemsStr = '';

    for (let i = 0; i < this._layers.length; i++) {
      let [layerId, layerName] = this._layers[i];

      this._checkItemsStr +=
        `
        <input type='checkbox' id='${layerId}' checked='checked' />
        <label for='${layerId}'>${layerName}</label>
      `
    }

    this._panel.innerHTML = this._checkItemsStr;
    this._container.appendChild(this._panel);

    map.on('load', () => {
      document.getElementById('switcherPanel').addEventListener('change', e => {
        let id = e.target.id;
        if (e.target.checked) {
          layer.setLayoutProperty(id, 'visibility', 'visible');
        } else {
          layer.setLayoutProperty(id, 'visibility', 'none');
        }

        this._map._update();
      })
    })

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

}

export default MapboxLayerSwitcher;