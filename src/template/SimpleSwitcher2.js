class SimpleSwitcher2 {
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
        this._panel.id = 'ml-panel-2';
        this._panel.className = 'ml-panel-2';
        this._checked = {};

        this._checkItemsStr = '';
        for (let i = 0; i < this._layers.length; i++) {
            let { id: layerId, name: layerName, type: layerType } = this._layers[i];

            if (layerType === 'base') {

            } else {
                this._checkItemsStr +=
                    `<a id='${layerId}' href='#' class='active' layertype='${layerType ? layerType : ''}'>${layerName ? layerName : layerId}</a>`

                this._checked[layerId] = true;
            }
        }

        this._panel.innerHTML = this._checkItemsStr;
        this._container.appendChild(this._panel);

        this._map.on('load', () => {
            document.getElementById('ml-panel-2').addEventListener('click', e => {
                let type = e.target.attributes.layertype.nodeValue;

                if (type === 'base') {// base layers
                   this.changeBaseStyle(e);
                } else { // Thematic layers
                  this.changeThematicVisible(e);
                }

                this._map._update();
            })
        })
    }

    changeBaseStyle(e) {
        let mapstyle = e.target.id;
        this._map.setStyle(mapstyle);

        this._map.on('style.load', () => {
            for (let layerId in this._checked) {
                let visibility = this._checked[layerId] ? 'visible' : 'none';
                this._map.setLayoutProperty(layerId, 'visibility', visibility);
            }
        })
    }

    changeThematicVisible(e) {
        let layerId = e.target.id;
        let layer = this._map.getLayer(layerId);
        let alink = document.getElementById(layerId);

        if (!this._checked[layerId]) {
            layer.setLayoutProperty('visibility', 'visible');
            alink.className = 'active';
            this._checked[layerId] = true;
        } else {
            layer.setLayoutProperty('visibility', 'none');
            alink.className = '';
            this._checked[layerId] = false;
        }
    }
}

export default SimpleSwitcher2;