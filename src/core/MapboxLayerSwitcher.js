import defaultValue from '../utils/defaultValue.js';
import SimpleSwitcher1 from '../template/SimpleSwitcher1.js';
import SimpleSwitcher2 from '../template/SimpleSwitcher2.js';

class MapboxLayerSwitcher {
    constructor(options = {}) {
        this._template = defaultValue(options.template, 'simple1');
        this._layers = defaultValue(options.layers, []);
    }

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');

        switch (this._template) {
            case 'simple1':
                new SimpleSwitcher1(this._map, this._container, this._layers);
                break;
            case 'simple2':
                new SimpleSwitcher2(this._map, this._container, this._layers);
                break;
            default:
                console.error('the template parameters are illegal!')
        }

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

}

export default MapboxLayerSwitcher;