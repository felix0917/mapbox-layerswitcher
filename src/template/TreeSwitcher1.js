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

        this.addBasemapEvent();
        this.addOverlaysEvent();
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
            li.className = 'ml-basemap-group';
            li.id = 'ml-basemap-group';
            let label = document.createElement('label');
            label.innerText = 'Base maps';
            label.className = 'ml-basemap-layer-group'
            li.appendChild(label);

            this._panelContent.appendChild(li);

            let ul = document.createElement('ul');
            let listr = '';

            for (let i = 0; i < len; i++) {
                let { id, name, type } = basemaps[i];
                listr +=
                    `<li class='ml-basemap-layer'>
                        <input type='radio' name='ml-${type}map-radio' id='${id}' checked='checked' />
                        <label for='${type}'>${name ? name : id}</label>
                    </li>`;
            }

            ul.innerHTML = listr;
            li.appendChild(ul);

            this._panelContent.appendChild(li);
        }
    }

    createOverlaysPanel() {
        this._checked = {};
        let overlays = this._overlays;
        let len = overlays.length;

        if (len > 0) {
            let li = document.createElement('li');
            li.className = 'ml-overlay-group';
            li.id = 'ml-overlay-group';

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
            input.id = 'ml-layergroup-checkbox';
            input.checked = 'checked';

            let label = document.createElement('label');
            label.innerText = 'Overlays';
            label.className = 'ml-overlay-group-label'
            label.for = 'ml-layergroup-checkbox';

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
                li.className = 'ml-overlay-group';

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
                input.name = 'ml-layergroup-checkbox';
                input.checked = 'checked';

                let label = document.createElement('label');
                label.className = 'ml-overlay-group-label';
                label.innerText = name ? name : id;

                li.appendChild(button);
                li.appendChild(input);
                li.appendChild(label);
                ul.appendChild(li);

                this.createSubTreeNode(children, li);
            } else {
                let li = document.createElement('li');
                li.className = 'ml-overlay-layer';
                li.id = id;

                let input = document.createElement('input');
                input.type = 'checkbox';
                input.name = 'ml-overlay-checkbox'
                input.checked = 'checked';
                this._checked[id] = true;

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
        this._map.on('load', () => {
            let basemapgroup = document.getElementById('ml-basemap-group');
            basemapgroup.addEventListener('click', e => {
                if (e.target.name === 'ml-basemap-radio') {
                    this.changeBaseMap(e);
                }
            });
        })
    }

    addOverlaysEvent() {
        this._map.on('load', () => {
            //overlay layer li
            let liarr = document.getElementsByClassName('ml-overlay-layer');
            for (let i = 0; i < liarr.length; i++) {
                let li = liarr[i];
                let layerId = li.id;
                li.addEventListener('click', e => {
                    if (e.target.type === 'checkbox') {
                        let checked = e.target.checked;
                        let visibility = checked ? 'visible' : 'none';
                        this._map.setLayoutProperty(layerId, 'visibility', visibility);
                        this._checked[layerId] = checked;

                        let parentul = e.target.parentNode.parentNode;
                        let inputlist = parentul.querySelectorAll('input');
                        let childCheckCount = 0;
                        for (let i = 0; i < inputlist.length; i++) {
                            if (inputlist[i].checked) {
                                childCheckCount++;
                            }
                        }
                        if (childCheckCount === 0) {
                            parentul.parentNode.children[1].checked = false;
                        } else if (childCheckCount === inputlist.length) {
                            parentul.parentNode.children[1].checked = true;
                        } else {
                            console.log(2);
                        }
                    }
                })
            }

            // overlay layergroup li
            let liarr2 = document.getElementsByClassName('ml-overlay-group');
            for (let i = 0; i < liarr2.length; i++) {
                let li = liarr2[i];
                let inputList = li.querySelectorAll('input');
                let rootinput = inputList[0];
                rootinput.addEventListener('change', e => {
                    for (let j = 1; j < inputList.length; j++) {
                        let input = inputList[j];
                        let checked = rootinput.checked;
                        input.checked = checked;
                        if (input.name === 'ml-overlay-checkbox') {
                            let visibility = checked ? 'visible' : 'none';
                            let layerId = input.parentNode.id;
                            this._map.setLayoutProperty(layerId, 'visibility', visibility);
                            this._checked[layerId] = checked;
                        }
                    }
                })
            }
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

    layergroupCheckboxChanged() {

    }

    layerCheckboxChanged() {

    }
}

export default TreeSwitcher1;