Vue.component('draw-page', {
    template: `
        <div id="draw" style="position: absolute; width: 100%; height: 100%;">
            <canvas
            id="layer0"
            :width="iw"
            :height="ih"
            :style="style0"
            >
                your browser does not support canvas
            </canvas>
            <canvas
            id="layer1"
            :width="iw"
            :height="ih"
            :style="style1"
            >
                your browser does not support canvas
            </canvas>
            <canvas
            id="layer2"
            :width="iw"
            :height="ih"
            :style="style2"
            @click="click"
            @mousemove="move"
            >
                your browser does not support canvas
            </canvas>
            <div
            id="content"
            :style="style_content"
            @click="click"
            v-html="content"
            >
            </div>
        </div>
    `,
    props: {
        size: {
            type: Object,
            required: true,
            validator: size => size.hasOwnProperty('innerWidthD') &&
                size.hasOwnProperty('innerHeightD') &&
                size.hasOwnProperty('devicePixelRatio')
        },
        colors: {
            type: Array,
            required: true,
            validator: colors => colors.every(color =>
                color.search(/rgb\([0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\)/) >= 0
            )
        },
        mainBtnInfos: {
            type: Array,
            required: true,
            validator: infos => infos.every(info =>
                info.hasOwnProperty('mainText') &&
                info.hasOwnProperty('content')
            ) && infos.length > 0
        }
    },
    data () {
        return {
            ctx0: null,
            ctx1: null,
            ctx2: null,
            curColorIndex: 2,
            content: null,
            contentColor: 'white',
            contentMaxR: 0,
            currentMainBtnIndex: 0,
            state: {
                loading: false,
                inWhichThemeBtn: -1,
                inWhichMainBtn: -1,
                showingContent: false,
            }
        }
    },
    computed: {
        iw () {return this.size.innerWidthD},
        ih () {return this.size.innerHeightD},
        dpi () {return this.size.devicePixelRatio},
        hw () {return this.iw / 2},
        hh () {return this.ih / 2},
        style0 () {
            return {
                position: 'absolute',
                zIndex: '0',
                width: `${this.iw / this.dpi}px`,
                height: `${this.ih / this.dpi}px`
            }
        },
        style1 () {
            return {
                position: 'absolute',
                zIndex: '1',
                width: `${this.iw / this.dpi}px`,
                height: `${this.ih / this.dpi}px`
            }
        },
        style2 () {
            return {
                position: 'absolute',
                zIndex: '2',
                width: `${this.iw / this.dpi}px`,
                height: `${this.ih / this.dpi}px`
            }
        },
        style_content () {
            return {
                position: 'absolute',
                zIndex: '3',
                left: '10%',
                top: '15%',
                width: '80%',
                height: '80%',
                display: this.state.showingContent ? 'block' : 'none',
                textAlign: 'center',
                color: this.contentColor,
                fontFamily: 'Lucida Console',
                fontWeight: '100',
                lineHeight: '25px'
            }
        },
        fontSize () {return this.measureSize(0.05, 20)},
        mainBtnPos () {
            let cts = [], r = 0;
            for(i in this.mainBtnInfos) {
                let curR = this.mainBtnInfos[i].mainText.length * 0.5 * this.fontSize;
                if(curR > r) r = curR;
            }
            let maxN = parseInt(this.iw / 3 / r) || 1;
            let n = this.mainBtnInfos.length;
            let l = parseInt(n / maxN) + 1;
            for(let i = 0; i < n; i++) {
                let lineMaxN = maxN;
                if(maxN * (parseInt(i / maxN) + 1) > n) lineMaxN = n % maxN;
                let x = this.hw + (i % lineMaxN - (lineMaxN - 1) / 2) * 3 * r;
                let y = this.ih / 5 + 0.3 * this.ih / (parseInt((n - 1) / maxN) + 1) +
                        parseInt(i / maxN) * 3 * r;
                cts.push({x: x, y: y});
            }
            return {
                r: r,
                cts: cts
            }
        },
        themeBtnPos () {
            let r = this.measureSize(0.2, 30);
            let s = this.iw + r;
            let e = this.iw - 2 * r;
            let ys = [2 * r, 5 * r];
            return {
                r: r,
                s: s,
                e: e,
                ys: ys
            }
        }
    },
    watch: {
        curColorIndex () {
            this.state.loading = true;
            this.drawBackground().then(this.mainBtnFadeIn).then(this.themeBtnFlyIn).finally(() => {
                this.state.loading = false;
            });
        },
        size () {
            window.setTimeout(() => {
                let p1 = this.mainBtnPos;
                let p2 = this.themeBtnPos;
                let rgbs = this.colors.filter((v, i) => i != this.curColorIndex);
                this.ctx0.font = this.ctx1.font = this.ctx2.font = `${this.fontSize}px Lucida Console`;
                this.ctx1.textAlign = this.ctx1.textBaseline = 'center';
                this.ctx0.fillStyle = this.colors[this.curColorIndex];
                this.ctx0.fillRect(0, 0, this.iw, this.ih);
                this.ctx1.fillStyle = this.colors[(this.curColorIndex + 1) % this.colors.length];
                for(i in p1.cts) {
                    this.ctx1.beginPath();
                    this.ctx1.arc(p1.cts[i].x, p1.cts[i].y, p1.r, 0, Math.PI * 2);
                    this.ctx1.fill();
                }
                this.ctx1.fillStyle = this.colors[(this.curColorIndex + 2) % this.colors.length];
                for(i in p1.cts) {
                    this.ctx1.fillText(this.mainBtnInfos[i].mainText, p1.cts[i].x, p1.cts[i].y);
                }
                for(i in p2.ys) {
                    this.ctx1.fillStyle = rgbs[i];
                    this.ctx1.beginPath();
                    this.ctx1.arc(p2.e, p2.ys[i], p2.r, 0, Math.PI * 2);
                    this.ctx1.fill();
                }
                if(this.state.showingContent) {
                    let color = this.colors[(this.curColorIndex + 1) % this.colors.length];
                    this.ctx2.fillStyle = color;
                    this.ctx2.fillRect(0, 0, this.iw, this.ih);
                    this.content = this.mainBtnInfos[this.currentMainBtnIndex].content;
                }
       }, 100);
        }
    },
    mounted () {
        this.ctx0 = document.getElementById('layer0').getContext('2d');
        this.ctx1 = document.getElementById('layer1').getContext('2d');
        this.ctx2 = document.getElementById('layer2').getContext('2d');
        //this.ctx0.scale(0.5, 0.5);
        //this.ctx1.scale(0.5, 0.5);
        //this.ctx2.scale(0.5, 0.5);
        // this.ctx0.translate(0.5, 0.5);
        // this.ctx1.translate(0.5, 0.5);
        // this.ctx2.translate(0.5, 0.5);
        this.state.loading = true;
        this.drawBackground().then(this.mainBtnFadeIn).then(this.themeBtnFlyIn).finally(() => {
            this.state.loading = false;
        });
        this.ctx0.font = this.ctx1.font = this.ctx2.font = `${this.fontSize}px Lucida Console`;
    },
    methods: {
        drawBackground () {
            return new Promise((resolve, reject) => {
                let centerX = this.hw;
                let centerY = this.hh;
                let r = 50;
                let maxR = Math.pow(centerX * centerX + centerY * centerY, 0.5);
                let stepValue = maxR * 0.04;

                let color = this.colors[this.curColorIndex];
                this.ctx0.fillStyle = color;
                this.ctx1.fillStyle = color;
                
                let timer = window.setInterval(() => {
                    this.ctx1.beginPath();
                    this.ctx1.arc(centerX, centerY, r, 0, 2 * Math.PI);
                    this.ctx1.fill();
                    if((r += stepValue) >= maxR) {
                        window.clearInterval(timer);
                        this.ctx0.fillRect(0, 0, this.iw, this.ih);
                        this.ctx1.clearRect(0, 0, this.iw, this.ih);
                        resolve();
                    }
                }, 20);
            })
        },
        mainBtnFadeIn () {
            return new Promise((resolve, reject) => {
                let p = this.mainBtnPos;
                let cts = p.cts.map(v => v);
                let r = 0;
                let maxR = p.r;
                let stepValue = maxR * 0.08;
                let ct = cts.shift();

                let color = this.colors[(this.curColorIndex + 1) % this.colors.length];
                this.ctx1.fillStyle = color;
                
                let timer = window.setInterval(() => {
                    if((r += stepValue) >= maxR) {
                        r = maxR;
                    }
                    this.ctx1.beginPath();
                    this.ctx1.arc(ct.x, ct.y, r, 0, Math.PI * 2);
                    this.ctx1.fill();
                    if(r == maxR) {
                        ct = cts.shift();
                        r = 0;
                        if(!ct) {
                            window.clearInterval(timer);
                            let color = this.colors[(this.curColorIndex + 2) % this.colors.length];
                            this.ctx1.fillStyle = color;
                            this.ctx1.textAlign = this.ctx1.textBaseline = 'center';
                            for(i in this.mainBtnInfos) {
                                this.ctx1.fillText(this.mainBtnInfos[i].mainText, p.cts[i].x, p.cts[i].y);
                            }
                            resolve();
                        }
                    }
               },20);
            })
        },
        themeBtnFlyIn () {
            return new Promise((resolve, reject) => {
                let p = this.themeBtnPos;
                let x = p.s;
                let ys = p.ys.map(v => v);
                let y = ys.shift();
                let stepValue = (p.e - p.s) * 0.12;
                let rgbs = this.colors.map(c => c);
                let bgRgb = rgbs.splice(this.curColorIndex, 1);
                let rgb = rgbs.shift();

                let timer = window.setInterval(() => {
                    x += stepValue;
                    if((x - p.s) * (x - p.e) >= 0) {
                        x = p.e;
                    }
                    this.ctx0.fillStyle = bgRgb;
                    this.ctx0.beginPath();
                    this.ctx0.arc(x - stepValue, y, p.r + 2, 0, Math.PI * 2);
                    this.ctx0.fill();
                    this.ctx0.fillStyle = rgb;
                    this.ctx0.beginPath();
                    this.ctx0.arc(x, y, p.r, 0, Math.PI * 2);
                    this.ctx0.fill();
                    if(x == p.e) {
                        rgb = rgbs.shift();
                        y = ys.shift();
                        x = p.s;
                        if(!y || !rgb) {
                            window.clearInterval(timer);
                            resolve();
                        }
                    }
                }, 20);
            })
        },
        measureSize (percentage, max)  {
            let size = parseInt(this.ih * percentage);
            if(size > max) size = max;
            return size;
        },
        click (e) {
            if(this.state.loading) return;
            let mainBtnIndex = this.ifInMainBtn(e.layerX * this.dpi, e.layerY * this.dpi);
            let themeBtnIndex = this.ifInThemeBtn(e.layerX * this.dpi, e.layerY * this.dpi);
            if(this.state.showingContent) {
                if(themeBtnIndex[0] == 0) this.hideContent(this.currentMainBtnIndex);
            }
            else {
                if(mainBtnIndex >= 0) {
                    this.showContent(mainBtnIndex);
                    this.currentMainBtnIndex = mainBtnIndex;
                }
                else if(themeBtnIndex[0] >= 0) this.curColorIndex = themeBtnIndex[1];
            }
        },
        move (e) {
            if(this.state.loading) return;
            let x = e.layerX * this.dpi;
            let y = e.layerY * this.dpi;
            let i0 = this.ifInMainBtn(x, y);
            let i1 = this.ifInThemeBtn(x, y);
            let t0 = this.state.inWhichMainBtn;
            let t1 = this.state.inWhichThemeBtn;
            if(this.state.showingContent) {
                if(i1[0] == 0) this.hoverOperateBtn();
                else this.restoreOperateBtn();
            }
            else {
                if(t0 >= 0 && i0 < 0) this.restoreMainBtn(t0);
                else if(t1 >= 0 && i1[0] < 0) this.restoreThemeBtn(t1);
                else if(t0 < 0 && i0 >= 0) this.hoverMainBtn(i0);
                else if(t1 < 0 && i1[0] >= 0) this.hoverThemeBtn(i1);
            }
        },
        ifInMainBtn (x, y) {
            let p = this.mainBtnPos;
            let rtn = -1;
            for(i in p.cts) {
                if(Math.pow(x - p.cts[i].x, 2) + Math.pow(y - p.cts[i].y, 2) - Math.pow(p.r, 2) < 0) {
                    rtn = i;
                    break;
                }
            }
            return rtn;
        },
        ifInThemeBtn (x, y) {
            let p = this.themeBtnPos;
            let rtn = -1;
            for(i in p.ys) {
                if(Math.pow(x - p.e, 2) + Math.pow(y - p.ys[i], 2) - Math.pow(p.r, 2) < 0) {
                    rtn = i;
                    break;
                }
            }
            if(rtn >= this.curColorIndex) return [rtn, (rtn + 1) % this.colors.length];
            else return [rtn, rtn];
        },
        hoverMainBtn (i) {
            this.state.inWhichMainBtn = i;
            let p = this.mainBtnPos;
            this.ctx1.strokeStyle = this.colors[(this.curColorIndex + 1) % this.colors.length];
            this.ctx1.lineWidth = 6;
            this.ctx1.lineCap="round";
            this.ctx1.beginPath();
            this.ctx1.moveTo(p.cts[i].x - 0.6 * p.r, p.cts[i].y + 1.3 * p.r);
            this.ctx1.lineTo(p.cts[i].x + 0.6 * p.r, p.cts[i].y + 1.3 * p.r);
            this.ctx1.stroke();
        },
        hoverThemeBtn (i) {
            this.state.inWhichThemeBtn = i[0];
            let p = this.themeBtnPos;
            this.ctx1.strokeStyle = this.colors[i[1]];
            this.ctx1.lineWidth = 6;
            this.ctx1.lineCap="round";
            this.ctx1.beginPath();
            this.ctx1.moveTo(p.e - 0.6 * p.r, p.ys[i[0]] + 1.3 * p.r);
            this.ctx1.lineTo(p.e + 0.6 * p.r, p.ys[i[0]] + 1.3 * p.r);
            this.ctx1.stroke();
        },
        restoreMainBtn (i) {
            this.state.inWhichMainBtn = -1;
            let p = this.mainBtnPos;
            this.ctx1.clearRect(
                p.cts[i].x - 0.6 * p.r - 4,
                p.cts[i].y + 1.3 * p.r - 4,
                1.2 * p.r + 8,
                8
            );
        },
        restoreThemeBtn (i) {
            this.state.inWhichThemeBtn = -1;
            let p = this.themeBtnPos;
            this.ctx1.clearRect(
                p.e - 0.6 * p.r - 4,
                p.ys[i] + 1.3 * p.r - 4,
                1.2 * p.r + 8,
                8
           );
        },
        showContent (i) {
            this.state.loading = true;
            let centerX = this.mainBtnPos.cts[i].x;
            let centerY = this.mainBtnPos.cts[i].y;
            let minR = this.mainBtnPos.r;
            let maxX = centerX > this.hw ? centerX : this.iw - centerX;
            let maxY = centerY > this.hh ? centerY : this.ih - centerY;
            let maxR = this.contentMaxR = Math.pow(maxX * maxX + maxY * maxY, 0.5);
            let r = minR;
            let stepValue = maxR * 0.04;

            let color = this.colors[(this.curColorIndex + 1) % this.colors.length];
            this.ctx2.fillStyle = color;

            let timer = window.setInterval(() => {
                this.ctx2.beginPath();
                this.ctx2.arc(centerX, centerY, r, 0, 2 * Math.PI);
                this.ctx2.arc(centerX, centerY, minR, 0, 2 * Math.PI, true);
                this.ctx2.fill();
                if((r += stepValue) >= maxR) {
                    window.clearInterval(timer);
                    this.ctx2.fillRect(0, 0, this.iw, this.ih);
                    this.operateBtnFlyIn().then(() => {
                        this.content = this.mainBtnInfos[i].content;
                        this.contentColor = this.colors[(this.curColorIndex + 2) % this.colors.length];
                        this.state.loading = false;
                        this.state.showingContent = true;
                    });
                }
            }, 20);
        },
        hideContent (i) {
            this.state.showingContent = false;
            this.state.loading = true;
            window.setTimeout(() => {
                let centerX = this.mainBtnPos.cts[i].x;
                let centerY = this.mainBtnPos.cts[i].y;
                let minR = this.mainBtnPos.r;
                let maxR = this.contentMaxR;
                let r = maxR;
                let stepValue = maxR * 0.04;
    
                this.ctx2.globalCompositeOperation = 'destination-out';
    
                    let timer = window.setInterval(() => {
                        this.ctx2.beginPath();
                        this.ctx2.arc(centerX, centerY, maxR, 0, 2 * Math.PI);
                        this.ctx2.arc(centerX, centerY, r, 0, 2 * Math.PI, true);
                        this.ctx2.fill();
                        if(r == minR) {
                            this.ctx2.globalCompositeOperation = 'source-over';
                            window.clearInterval(timer);
                            window.setTimeout(() => {
                                this.ctx2.clearRect(0, 0, this.iw, this.ih);
                                this.state.loading = false;
                            }, 100);
                        }
                        r -= stepValue;
                        if(r < minR) r = minR;
                    }, 20);
            }, 100);
        },
        operateBtnFlyIn () {
            return new Promise((resolve, reject) => {
                let p = this.themeBtnPos;
                let x = p.s;
                let y = p.ys[0];
                let stepValue = (p.e - p.s) * 0.12;
                let bgRgb = this.colors[(this.curColorIndex + 1) % this.colors.length];
                let rgb = this.colors[this.curColorIndex];

                let timer = window.setInterval(() => {
                    x += stepValue;
                    if((x - p.s) * (x - p.e) >= 0) {
                        x = p.e;
                    }
                    this.ctx2.fillStyle = bgRgb;
                    this.ctx2.beginPath();
                    this.ctx2.arc(x - stepValue, y, p.r + 2, 0, Math.PI * 2);
                    this.ctx2.fill();
                    this.ctx2.fillStyle = rgb;
                    this.ctx2.beginPath();
                    this.ctx2.arc(x, y, p.r, 0, Math.PI * 2);
                    this.ctx2.fill();
                    if(x == p.e) {
                        window.clearInterval(timer);
                        resolve();
                    }
                }, 20);
            })
        },
        hoverOperateBtn () {
            let p = this.themeBtnPos;
            this.ctx2.strokeStyle = this.colors[(this.curColorIndex + 2) % this.colors.length];
            this.ctx2.lineWidth = 1;
            this.ctx2.lineCap="round";
            this.ctx2.beginPath();
            this.ctx2.moveTo(p.e - 0.25 * p.r, p.ys[0] - 0.25 * p.r);
            this.ctx2.lineTo(p.e + 0.25 * p.r, p.ys[0] + 0.25 * p.r);
            this.ctx2.stroke();
            this.ctx2.beginPath();
            this.ctx2.moveTo(p.e - 0.25 * p.r, p.ys[0] + 0.25 * p.r);
            this.ctx2.lineTo(p.e + 0.25 * p.r, p.ys[0] - 0.25 * p.r);
            this.ctx2.stroke();
        },
        restoreOperateBtn () {
            let p = this.themeBtnPos;
            this.ctx2.fillStyle = this.colors[this.curColorIndex];
            this.ctx2.beginPath();
            this.ctx2.arc(p.e, p.ys[0], p.r * 0.9, 0, 2 * Math.PI);
            this.ctx2.fill();
        }
    }
})
