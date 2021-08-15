// plugin akanechan_visualizer
// 2021 箱詰九分(@9min_packup)
{
    'use strict';
    var AKANEV =
    {
        $appendTo: $("#tyrano_base"),
        visualizers: new Array(),


        set_append_to: function (name)
        {
            $appendTo = $(name);
        },

        create: function (storage, num, layout = "bottom", depth = 0, len_min = 2, len_max = 50, stretch = 1.5, blend_mode = "normal", fftSize = 1024)
        {
            if (AKANEV.visualizers[layout])
            {
                AKANEV.delete(layout);
            }
            AKANEV.visualizers[layout] = new AKANEV.AkanechanVizualizer(storage, num, layout, depth, len_min, len_max, stretch, blend_mode, fftSize);
        },

        delete: function (layout)
        {
            if (AKANEV.visualizers[layout])
            {
                AKANEV.visualizers[layout].clear();
                AKANEV.visualizers.pop(layout);
            }
        },

        AkanechanVizualizer: class AkanechanVizualizer
        {
            constructor(storage, num, layout = "bottom", depth = 0, len_min = 2, len_max = 50, stretch = 1.5, blend_mode = "normal", fftSize = 1024)
            {
                this.storage = storage;
                if (num)
                {
                    this.imgs = new Array(parseInt(num));
                } else
                {
                    this.imgs = new Array(36);
                }
                if (layout)
                {
                    this.layout = layout;
                } else
                {
                    this.layout = "bottom"
                }
                if (depth)
                {
                    this.depth = parseInt(depth);
                } else
                {
                    this.depth = 0;
                }
                if (len_min)
                {
                    this.len_min = parseFloat(len_min);
                } else
                {
                    this.len_min = 2;
                }
                if (len_max)
                {
                    this.len_max = parseFloat(len_max);
                } else
                {
                    this.len_max = 50;
                }
                if (stretch)
                {
                    this.stretch = parseFloat(stretch);
                } else
                {
                    this.stretch = 1.5;
                }
                if (blend_mode)
                {
                    this.blend_mode = blend_mode;
                } else
                {
                    this.blend_mode = "normal";
                }
                if (fftSize)
                {
                    this.fftSize = parseInt(fftSize);
                } else
                {
                    this.fftSize = 1024;
                }

                this.init_akane();
                this.init_audio();
                this.animId = window.requestAnimationFrame(this.draw.bind(this));
            }

            init_akane()
            {

                let cw = AKANEV.$appendTo[0].clientWidth;
                let ch = AKANEV.$appendTo[0].clientHeight;

                if (this.layout == "bottom")
                {
                    let width = cw / this.imgs.length;
                    let height = ch * (this.len_min / 100);
                    for (let i = 0; i < this.imgs.length; i++)
                    {
                        let x = i * width + (width * 0.5);
                        let y = ch - (height * 0.5);
                        this.imgs[i] = this.createNewImage(this.storage, x, y, width, height, this.depth, 0);
                    }
                } else if (this.layout == "top")
                {
                    let width = cw / this.imgs.length;
                    let height = ch * (this.len_min / 100);
                    for (let i = 0; i < this.imgs.length; i++)
                    {
                        let x = i * width + (width * 0.5);
                        let y = (height * 0.5);
                        this.imgs[i] = this.createNewImage(this.storage, x, y, width, height, this.depth, 180);
                    }
                }
                else if (this.layout == "left")
                {
                    let width = ch / this.imgs.length;
                    let height = cw * (this.len_min / 100);
                    for (let i = 0; i < this.imgs.length; i++)
                    {
                        let x = (height * 0.5);
                        let y = i * width + (width * 0.5);
                        this.imgs[i] = this.createNewImage(this.storage, x, y, width, height, this.depth, 90);
                    }
                }
                else if (this.layout == "right")
                {
                    let width = ch / this.imgs.length;
                    let height = cw * (this.len_min / 100);
                    for (let i = 0; i < this.imgs.length; i++)
                    {
                        let x = cw - (height * 0.5);
                        let y = i * width + (width * 0.5);
                        this.imgs[i] = this.createNewImage(this.storage, x, y, width, height, this.depth, 270);
                    }
                }
            }

            init_audio()
            {
                if (Howler.ctx)
                {
                    this.analyserNode = Howler.ctx.createAnalyser();
                    this.freqs = new Uint8Array(this.analyserNode.frequencyBinCount);
                    Howler.ctx.createGain = Howler.ctx.createGain || Howler.ctx.createGainNode;
                    this.gainNode = Howler.ctx.createGain();
                    this.gainNode.gain.setValueAtTime(1, Howler.ctx.currentTime);
                    Howler.masterGain.connect(this.analyserNode);
                    this.analyserNode.connect(this.gainNode);
                    this.gainNode.connect(Howler.ctx.destination);
                }
            }


            draw()
            {
                if (!Howler.ctx || !this.analyserNode || !this.freqs || !this.gainNode)
                {
                    this.init_audio();
                    this.animId = window.requestAnimationFrame(this.draw.bind(this));
                    return;
                }
                let cw = AKANEV.$appendTo[0].clientWidth;
                let ch = AKANEV.$appendTo[0].clientHeight;
                this.analyserNode.smoothingTimeConstant = 0.5;
                this.analyserNode.fftSize = this.fftSize;
                this.analyserNode.getByteFrequencyData(this.freqs);

                for (var i = 0; i < this.analyserNode.frequencyBinCount; ++i)
                {
                    let akane_i = parseInt(((this.imgs.length * ((i + 1) / (this.analyserNode.frequencyBinCount))) - 1) * this.stretch);
                    let value = this.freqs[i];
                    let percent = value / 255;

                    percent = percent * (this.len_max / 100);
                    if (percent < (this.len_min / 100))
                    {
                        percent = (this.len_min / 100)
                    }

                    if (this.layout == "bottom")
                    {
                        let height = ch * percent;
                        let width = cw / this.imgs.length;
                        let x = akane_i * width + (width * 0.5);
                        let y = ch - (height * 0.5);
                        this.chanageImagePosSize(this.imgs[akane_i], x, y, width - 2, height, 0);
                    }
                    else if (this.layout == "top")
                    {
                        let height = ch * percent;
                        let width = cw / this.imgs.length;
                        let x = akane_i * width + (width * 0.5);
                        let y = (height * 0.5);
                        this.chanageImagePosSize(this.imgs[akane_i], x, y, width - 2, height, 180);
                    }
                    else if (this.layout == "left")
                    {
                        let height = cw * percent;
                        let width = ch / this.imgs.length;
                        let x = (height * 0.5);
                        let y = akane_i * width + (width * 0.5);
                        this.chanageImagePosSize(this.imgs[akane_i], x, y, width - 2, height, 90);
                    }
                    else if (this.layout == "right")
                    {
                        let height = cw * percent;
                        let width = ch / this.imgs.length;
                        let x = cw - (height * 0.5);
                        let y = akane_i * width + (width * 0.5);
                        this.chanageImagePosSize(this.imgs[akane_i], x, y, width - 2, height, 270);
                    }

                }

                this.animId = window.requestAnimationFrame(this.draw.bind(this));

            }

            createNewImage(storage, x = 0, y = 0, width = 0, height = 0, depth = 0, rotate = 0)
            {
                let $img = $('<img>');
                $img.attr('src', storage);
                $img.css({ position: "absolute", left: (x - (width * 0.5)) + "px", top: (y - (height * 0.5)) + "px", width: width + "px", height: height + "px", 'z-index': depth, 'transform': "rotate(" + rotate + "deg)", 'mix-blend-mode': this.blend_mode });
                $img.appendTo(AKANEV.$appendTo);
                return $img;
            }

            chanageImagePosSize($img, x = 0, y = 0, width = 0, height = 0, rotate = 0)
            {
                $($img).css({ left: (x - (width * 0.5)) + "px", top: (y - (height * 0.5)) + "px", width: width + "px", height: height + "px", 'transform': "rotate(" + rotate + " deg)", 'mix-blend-mode': this.blend_mode });
                return $img;
            }

            clear()
            {
                for (let i = 0; i < this.imgs.length; i++)
                {
                    $(this.imgs[i]).remove();
                }
                if (this.animId)
                {
                    window.cancelAnimationFrame(this.animId);
                    this.animId = null;
                }

                this.analyserNode = null;
                this.freqs = null;
                this.gainNode = null;
            }
        }
    }
}