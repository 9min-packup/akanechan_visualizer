# akanechan_visualizer

![Index Image 3](/image.png)

ティラノスクリプトのあかねちゃんを用いたオーディオ（音声波形）ビジュアライザーです。  
ティラノスクリプト V5 上で動作します。    

## 機能
 - 上・下・左・右に波形を表示。画像は変更可能。(別にあかねちゃんでなくてもいい)  
 - 画像の重ね合わせ方（通常・乗算・除算など）を指定できる。  
 - バーの数・高さなどをオプションで変更可能。  

## デモ

  youtube に挙げました。こんな感じです。  
  https://www.youtube.com/watch?v=6JZ4Sk9ikDU

## 導入方法
  
 1. akanechan_visualizer フォルダをティラノスクリプトのプロジェクトの /data/others/plugin に配置する。  
 2. first.ks 内など、必ず通る場所に [plugin name="akanechan_visualizer
"] を記述。  


## 使い方（使えるようになるマクロ）

### akanev_create

音声波形を表示します。 表示された音声波形は playbgm や playseなどと連動して動きます。

| パラメータ名 |必須| 解説 |
| :-- | :-- | :------- |
| storage| ○ | 表示する画像を指定します。|
| layout| ○ | 作成する音声波形を指定します。デフォルトでは"bottom"。ほかに、"top"、"left"、"right"を指定できます。 |
| num| × | 棒の数を指定します。デフォルトは36。|
| depth| × | 画像の z-index を指定します。デフォルトは0。|
| len_min| × | 棒の長さの最小（パーセント）を指定します。デフォルトは2。|
| len_max| × | 棒の長さの最大（パーセント）を指定します。デフォルトは50。|
| stretch| × | 波形の横幅の引き伸ばし率を指定します。デフォルトは1.5。波形が途中で切れてしまう場合に調整してください。|
| blend_mode| × | 画像のブレンドモードを指定します。デフォルトは通常の"normal"。他には、乗算	"multiply"、スクリーン	"screen"、オーバーレイ	"overlay"、覆い焼き	"color-dodge"、焼き込み	"color-burn"、比較（暗）	"darken"、比較（明）	"lighten"、ハードライト	"hard-light"、ソフトライト	"soft-light"、差の絶対値	"difference"、除外	"exclusion"、色相	"hue"、彩度	"saturation"、カラー	"color"、輝度	"luminosity" を指定できます。|
| fft_size| × | FFTのサイズ。デフォルトは1024。|


### akanev_delete

音声波形を消去します。

| パラメータ名 |必須| 解説 |
| :-- | :-- | :------- |
| layout| ○ | 消去する音声波形を指定します。デフォルトでは"bottom"。ほかに、"top"、"left"、"right"を指定できます。 |


### akanev_set_append_to

音声波形の親要素を指定します。デフォルトは "#tyrano_base" 。

| パラメータ名 |必須| 解説 |
| :-- | :-- | :------- |
| name| ○ | 音声波形の親要素を指定します。親要素は複数の音声波形で共通となります。 |


## こんなことできるかも

  表示のところをいじればおしゃれなオーディオビジュアライザーになる...かも？  
  ほんとは DOM じゃなくてキャンパス使ったほうが良かったと思う。重いし。でもなんかめんどくさかったのでこうなりました。

## 不明な点があれば

  連絡先をどうぞ : 9min_packup [https://twitter.com/9min_packup]

