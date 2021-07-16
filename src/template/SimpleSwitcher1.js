class SimpleSwitcher1 {
    constructor(map, container, layers) {
        this._map = map;
        this._container = container;
        this._layers = layers;

        this.init();
    }

    init() {
        if (!this._layers) void 0;

        this._container.className = 'mapboxgl-ctrl';
        this._panel = document.createElement('nav');
        this._panel.id = 'ml-panel-1';
        this._panel.className = 'ml-panel-1';
        this._panelContentStr = '';

        this.layersClassify();

        this.createOverlaysPanel();
        this.createBasemapsPanel();

        this._panel.innerHTML = this._panelContentStr;
        this._container.appendChild(this._panel);

        this.addPanelEvent();
    }

    layersClassify() {
        this._overlays = [];
        this._basemaps = [];

        let layers = this._layers;

        for (let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            let { type } = layer;
            
            if (type === 'base') {
                this._basemaps.push(layer);
            } else {
                this._overlays.push(layer);
            }
        }
    }

    createBasemapsPanel() {
        let basemaps = this._basemaps;

        for (let i = 0; i < basemaps.length; i++) {
            let { id, name, type } = basemaps[i];
            this._panelContentStr +=
                `<input type='radio' id='${id}' layertype='${type}' name='${type}' checked='checked' />
                <label for='${id}' class='textnoselect'>${name ? name : id}</label>`;
        }
    }

    createOverlaysPanel() {
        this._checked = {};
        let overlays = this._overlays;

        for (let i = 0; i < overlays.length; i++) {
            let { id, name, type } = overlays[i];

            this._panelContentStr +=
                `<input type='checkbox' id='${id}' layertype='${type ? type : ''}' checked='checked' />
                <label for='${id}' class='textnoselect'>${name ? name : id}</label>`;

            this._checked[id] = true;
        }
    }

    addPanelEvent() {
        this._map.on('load', () => {
            document.getElementById('ml-panel-1').addEventListener('change', e => {
                let type = e.target.attributes.layertype.nodeValue;

                if (type === 'base') {// base layers
                    this.changeBaseMap(e);
                } else { // Overlay layers
                    this.changeOverlaysVisible(e);
                }

                this._map._update();
            })
        })
    }

    changeBaseMap(e) {
        let mapstyle = e.target.id;
        this._map.setStyle(mapstyle);

        this._map.on('style.load', () => {
            for (let layerId in this._checked) {
                let visibility = this._checked[layerId] ? 'visible' : 'none';
                this._map.setLayoutProperty(layerId, 'visibility', visibility);
            }
        })
    }

    changeOverlaysVisible(e) {
        let layerId = e.target.id;

        if (e.target.checked) {
            this._map.setLayoutProperty(layerId, 'visibility', 'visible');
            this._checked[layerId] = true;
        } else {
            this._map.setLayoutProperty(layerId, 'visibility', 'none');
            this._checked[layerId] = false;
        }
    }
}

export default SimpleSwitcher1;