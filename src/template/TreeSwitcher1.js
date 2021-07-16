class TreeSwitcher1 {
    constructor(map, container, layers) {
        this._map = map;
        this._container = container;
        this._layers = layers;

        this.init();
    }

    init() {
        if (!this._layers) void 0;

        this._container.className = 'mapboxgl-ctrl';
        this._panel = document.createElement('div');
        this._panel.id = 'ml-panel-tree1';
        this._panel.className = 'ml-panel-tree1';

        this._panelContent = document.createElement('ul');

        this.layersClassify();

        this.createOverlaysPanel();
        this.createBasemapsPanel();

        this._panel.appendChild(this._panelContent);
        this._container.appendChild(this._panel);
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
        let len = basemaps.length;

        if (len > 0) {
            let li = document.createElement('li');
            li.className = 'basemap-group';
            let label = document.createElement('label');
            label.innerText = 'Base maps';
            label.className = 'ml-layer-group'
            li.appendChild(label);

            this._panelContent.appendChild(li);

            let ul = document.createElement('ul');
            let listr = '';

            for (let i = 0; i < len; i++) {
                let { id, name, type } = basemaps[i];
                listr +=
                    `<li class='ml-layer'>
                        <input type='radio' name='ml-${type}-map-radio' id='${id}' checked='checked' />
                        <label for='${type}'>${name ? name : id}</label>
                    </li>`;
            }

            ul.innerHTML = listr;
            li.appendChild(ul);

            this._panelContent.appendChild(li);
        }
    }

    createOverlaysPanel() {
        let overlays = this._overlays;
        let len = overlays.length;

        if (len > 0) {
            let li = document.createElement('li');
            li.className = 'overlay-group';

            let button = document.createElement('button');
            button.addEventListener('click', e => {
                let btnClassname = e.target.className;
                if (btnClassname.includes('ml-menu-button-close')) {
                    e.target.className = '';
                    li.classList.remove('ml-menu-close');
                } else {
                    e.target.className = 'ml-menu-button-close';
                    li.classList.add('ml-menu-close');
                }

            })

            let input = document.createElement('input');
            input.type = 'checkbox';
            input.id = 'ml-overlay-input'

            let label = document.createElement('label');
            label.innerText = 'Overlays';
            label.className = 'ml-layer-group'
            label.for = 'ml-overlay-input';

            li.appendChild(button);
            li.appendChild(input);
            li.appendChild(label);

            this._panelContent.appendChild(li);

            this.createSubTreeNode(overlays, li);
        }
    }

    createSubTreeNode(overlays, parentli) {
        let len = overlays.length;

        let ul = document.createElement('ul');

        for (let i = 0; i < len; i++) {
            let overlay = overlays[i];
            let { id, name, children } = overlay;
            if (children) {
                let li = document.createElement('li');

                let button = document.createElement('button');
                button.addEventListener('click', e => {
                    let btnClassname = e.target.className;
                    if (btnClassname.includes('ml-menu-button-close')) {
                        e.target.className = '';
                        li.classList.remove('ml-menu-close');
                    } else {
                        e.target.className = 'ml-menu-button-close';
                        li.classList.add('ml-menu-close');
                    }
                })

                let input = document.createElement('input');
                input.type = 'checkbox';

                let label = document.createElement('label');
                label.className = 'ml-layer-group';
                label.innerText = name ? name : id;

                li.appendChild(button);
                li.appendChild(input);
                li.appendChild(label);
                ul.appendChild(li);

                this.createSubTreeNode(children, li);
            } else {
                let li = document.createElement('li');
                li.className = 'ml-layer';

                let input = document.createElement('input');
                input.type = 'checkbox';

                let label = document.createElement('label');
                label.innerText = name ? name : id;

                li.appendChild(input);
                li.appendChild(label);
                ul.appendChild(li);
            }
        }

        parentli.appendChild(ul);
    }

    addBasemapEvent() {
    }

    addOverlaysEvent() {

    }

    changeBaseMap(e) {
    }
}

export default TreeSwitcher1;