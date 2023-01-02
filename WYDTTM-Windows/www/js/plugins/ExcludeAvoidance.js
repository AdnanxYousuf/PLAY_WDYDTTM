//
//  素材削除回避プラグイン ver1.01
//
// author yana
//

var Imported = Imported || {};
Imported['ExcludeAvoidance'] = 1.01;

/*:
 * @plugindesc ver1.01/素材削除機能で削除されるのを防ぐため、プラグインで定義のみを行います。
 * @author Yana
 * 
 * @param File00
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File01
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File02
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File03
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File04
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File05
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File06
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File07
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File08
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File09
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File10
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File11
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File12
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File13
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File14
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File15
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File16
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File17
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File18
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File19
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File20
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File21
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File22
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File23
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File24
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File25
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File26
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File27
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File28
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File29
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 *  
 * @param File30
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File31
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File32
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File33
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File34
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File35
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File36
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File37
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File38
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File39
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File40
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File41
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File42
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File43
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File44
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File45
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File46
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File47
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File48
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File49
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File50
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File51
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File52
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File53
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File54
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File55
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File56
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File57
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File58
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File59
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File60
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File61
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File62
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File63
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File64
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File65
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File66
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File67
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File68
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File69
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File70
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File71
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File72
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File73
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File74
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File75
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File76
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File77
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File78
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File79
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File80
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File81
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 *
 * @param File82
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File83
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File84
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File85
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File86
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File87
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File88
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File89
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File90
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File91
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File92
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File93
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File94
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File95
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File96
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File97
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File98
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File99
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File100
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File101
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File102
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File103
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File104
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File105
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File106
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File107
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File108
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File109
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File110
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File111
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File112
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File113
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File114
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File115
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File116
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File117
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File118
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File119
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @param File120
 * @desc 削除を回避するファイル。
 * @default
 * @require 1
 * @dir
 * @type file
 * 
 * @help------------------------------------------------------
 * プラグインコマンドはありません。
 * ------------------------------------------------------
 * 素材削除を回避するためにファイル名を定義しておくだけのプラグインです。
 * img/pictures/test
 * など、パス付で登録してください。   
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.01:
 * 30~39番が重複して定義されていたのを修正。
 * ver1.00:
 * 公開
 *
 */