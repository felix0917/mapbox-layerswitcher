class SimpleSwitcher2 {
    constructor(map, container, layers, activemode) {
        this._map = map;
        this._container = container;
        this._layers = layers;
        this._activemode = activemode;

        this.init();
    }

    init() {
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

    /**
     * 创建图层选择器控件
     */
    createLayerSwitcherBtn() {
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

    layerSwitcherBtnClicKMode() {
        this._layerSwitcherBtn.addEventListener('click', () => {
            let panelVis = this._panel.style.display;
            if (panelVis === 'none') {
                this._panel.setAttribute('style', 'display:block');
                this._layerSwitcherBtn.setAttribute('style', 'display:none');
            }
        })

        this._map.on('click', () => {
            let panelVis = this._panel.style.display;
            if (panelVis !== 'none') {
                this._panel.setAttribute('style', 'display:none');
                this._layerSwitcherBtn.setAttribute('style', 'display:block');
            }
        })

        this._panel.setAttribute('style', 'display:none');
        this._container.appendChild(this._layerSwitcherBtn);
    }

    layerSwitcherBtnMouseOverMode() {
        this._layerSwitcherBtn.addEventListener('mouseenter', () => {
            let panelVis = this._panel.style.display;
            if (panelVis === 'none') {
                this._panel.setAttribute('style', 'display:block');
                this._layerSwitcherBtn.setAttribute('style', 'display:none');
            }
        })

        this._panel.addEventListener('mouseleave', () => {
            let panelVis = this._panel.style.display;
            if (panelVis !== 'none') {
                this._panel.setAttribute('style', 'display:none');
                this._layerSwitcherBtn.setAttribute('style', 'display:block');
            }
        })

        this._panel.setAttribute('style', 'display:none');
        this._container.appendChild(this._layerSwitcherBtn);
    }

    /**
     * 创建basemap图层面板
     */
    createBasemapsPanel() {
        let basemaps = this._basemaps;
        // let curStyle = this._map;

        for (let i = 0; i < basemaps.length; i++) {
            let { id, name, type } = basemaps[i];
            this._panelContentStr +=
                `<a id='${id}' name='base' href='#' class='${i === 0 ? 'active' : ''}' layertype='${type ? type : ''}'>${name ? name : id}</a>`;
        }
    }

    /**
     * 创建overlays图层面板
     */
    createOverlaysPanel() {
        this._checked = {};
        let overlays = this._overlays;

        for (let i = 0; i < overlays.length; i++) {
            let { id, name, type } = overlays[i];

            this._panelContentStr +=
                `<a id='${id}' href='#' class='active' layertype='${type ? type : ''}'>${name ? name : id}</a>`;

            this._checked[id] = true;
        }
    }

    /**
     * 给图层面板添加点击事件
     */
    addPanelEvent() {
        this._map.once('load', () => {
            document.getElementById('ml-panel-2').addEventListener('click', e => {
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


    /**
     * 切换basemap
     * @param {Event} e 
     */
    changeBaseMap(e) {
        let mapstyle = e.target.id;
        this._map.setStyle(mapstyle, { diff: false }); // todo: 此处有性能损失，待评估

        let alinkArrLike = e.target.parentNode.children;
        for (let i = 0; i < alinkArrLike.length; i++) {
            if (alinkArrLike[i].name !== 'base') continue;

            if (alinkArrLike[i].id !== mapstyle) {
                alinkArrLike[i].className = '';
            } else {
                alinkArrLike[i].className = 'active';
            }
        }

        this._map.once('style.load', () => {
            for (let layerId in this._checked) {
                let visibility = this._checked[layerId] ? 'visible' : 'none';
                this._map.setLayoutProperty(layerId, 'visibility', visibility);
            }
        })
    }

    /**
     * 改变overlay图层显隐性
     * @param {Event} e 
     */
    changeOverlaysVisible(e) {
        let layerId = e.target.id;
        let alink = document.getElementById(layerId);

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
}

export default SimpleSwitcher2;