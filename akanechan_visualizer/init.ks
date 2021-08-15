;plugin akanechan_visualizer
;2021 箱詰九分(@9min_packup)
[loadjs storage="./plugin/akanechan_visualizer/akanechan_visualizer.js"]


[macro name=akanev_set_append_to]
    [iscript]
        AKANEV.set_append_to(mp.name);
    [endscript]
[endmacro]

[macro name=akanev_create]
    [iscript]
        AKANEV.create(mp.storage, mp.num, mp.layout, mp.depth, mp.len_min, mp.len_max, mp.stretch, mp.blend_mode, mp.fft_size);
    [endscript]
[endmacro]

[macro name=akanev_delete]
    [iscript]
        AKANEV.delete(mp.layout);
    [endscript]
[endmacro]

[return] 