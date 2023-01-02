//=============================================================================
// KGN_SaveFileInfoChange_v2.js
// Ver 2.0		なのさんありがとうなの(劇的ビフォーアフター)
//=============================================================================

var Imported = Imported || {};
Imported.KGN_SaveFileInfoChange_v2 = true;

var Kiginu = Kiginu || {};//なんかこんな感じの処理をみんな入れてるから入れる。

/*:
 * @plugindesc セーブ/ロード画面に記載される情報をごく一部変えます。
 * @author きぎぬ
 *
 * @help 
 * デフォルトでは、セーブファイルにはゲームタイトルが表示されますが、これを
 * セーブしたマップの表示名に変更します。エディタ上のマップ名ではありません。
 * マップ表示名を設定していない場合の処理をパラメータで弄れます。
 * AltSaveScreen.jsと併用はできません。悪しからず。
 * 
 * バグとか自分じゃ太刀打ちできないので、自力で、どうぞ。
 * 
 * HP： http://r3jou.web.fc2.com/
 * 
 * 処理の大元から改善してくれたなのさん、ありがとうございます。(＠tkoolmv_helper)
 * 

 * @param noMapname
 * @desc マップ表示名を設定していない場合、代わりに表示される文字列です。titleとした場合、ゲームタイトルを表示します。
 * @default ？？？？？？


 */

//グローバル変数だけど必要だったろうか。パラメータ読み込みはグローバルじゃないといけないんだろうか。
Kiginu.Parameters = PluginManager.parameters('KGN_SaveFileInfoChange_v2');
Kiginu.Param.noMapname		=	String(Kiginu.Parameters['noMapname']);


(function() {

//これはエイリアスする
var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
	var info = _DataManager_makeSavefileInfo.call(this);//元の処理
	info.mapName = $gameMap.displayName();//に付け足し
	return info;
};

//これはエイリアスしない？(.call(this)しない)けどバックアップはする
var Window_SavefileList_prototype_drawGameTitle = Window_SavefileList.prototype.drawGameTitle;
Window_SavefileList.prototype.drawGameTitle = function(info, x, y, width) {
	if (Kiginu.Param.noMapname == 'title' && !(info.mapName)) {//マップ表示名が無く、noMapnameのパラメータがtitleの場合
		this.drawText(info.title, x, y, width);//ゲームタイトルを表示する
	} else if (info.mapName) {//マップ表示名がある場合
		this.drawText(info.mapName, x, y, width);//マップ表示名を表示する
	} else {//マップ表示名がない場合
		this.drawText(Kiginu.Param.noMapname, x, y, width);//？？？？？？とかを表示する
	}
};


/*
//AltSaveScreen対策。ガチ書き換え
Window_SavefileStatus.prototype.drawContents = function(info, rect, valid) {
	var bottom = rect.y + rect.height;
	var playtimeY = bottom - this.lineHeight();
	//this.drawText(info.title, rect.x + 192, rect.y, rect.width - 192);//元の
	Window_SavefileList.prototype.drawGameTitle(info, rect.x + 192, rect.y, rect.width - 192);//書き換え
	if (valid) {
		this.drawPartyfaces(info, rect.x, bottom - 144);
	}
	this.drawText(info.playtime, rect.x, playtimeY, rect.width, 'right');
};
*///駄目だったよ…

})();
