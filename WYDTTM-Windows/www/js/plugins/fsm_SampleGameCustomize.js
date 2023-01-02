//=============================================================================
// サンプルゲーム用カスタマイズ
//=============================================================================

/*:
 * @plugindesc fsm_SampleGameCustomize Ver.1.00
 * @author Nobuhiko Yoshimura
 *
 * @help There is no plug-in command.
 *
 * 　・Center Title Screen Menu
 * 　・Delete Gold Window from Menu Screen
 * 　・Delete EXP Display from Status Menu
 * 　・Change Window Width when Selecting Items
 * 　・Change Status Screen Layout
 *
 * 　・When using this plug-in with YEP_MainMenuManager,
 *     comment out line 1711 on YEP_MainMenuManager.js.
 * 　・To avoid influence from other plug-ins,
 *     try to place this plug-in as far up on the plug-in manager screen as you can.
 *
 * As this plug-in was made solely for this sample game,
 * it won't be very useful as an asset, but you may use it how you wish.
 *
 * Usage Announcement Unneeded, Credit Unneeded, Changeable, Distributable, Commercially Usable
 *
 * If any problems occur from the use of this plug-in, 
 * please know that we bear no responsibility.
 * Furthermore, this plug-in is not included in the FSM Map Asset Pack support service.
 */

/*:ja
 * @plugindesc サンプルゲーム用カスタマイズプラグイン Ver.1.00
 * @author Nobuhiko Yoshimura
 *
 * @help プラグインコマンドはありません。
 *
 * 【カスタマイズ内容】
 * 　・タイトル画面のメニュー項目をセンタリング
 * 　・メニュー画面からゴールドウィンドウを削除
 * 　・ステータス画面から経験値表示を削除
 * 　・アイテム選択の処理ウィンドウの横幅を変更
 * 　・ステータス画面のレイアウト変更
 *
 * 【注意点】
 * 　・YEP_MainMenuManagerと同時に利用する場合、
 * 　　YEP_MainMenuManager.jsの1711行目をコメントアウトする
 * 　・プラグイン管理画面では、他のプラグインの影響を避けるため、
 * 　　なるべく一番上にいれることを推奨
 *
 * 本サンプルゲームに特化したプラグインですので、
 * 素材としての利用には向きませんが、お使いくださっても構いません。
 *
 * 使用報告不要・クレジット不要・改変可・配布可・商用利用可
 *
 * プラグインの性質上、ご利用に際して何か問題が起きても、
 * 一切責任を負いませんのでご了承ください。
 * また、このプラグインは「FSMマップ素材集」のサポート対象外となりますので、
 * その点についてもご了承ください。
 */
(function() {

// タイトル画面のメニュー項目をセンタリング
Window_TitleCommand.prototype.itemTextAlign = function() {
    return 'center';
};

// ゴールドウィンドウを削除（メニュー画面）……rpg_scenes.jsより
Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createStatusWindow();
};

// 経験値表示を削除（ステータス）……rpg_windows.jsより
Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    }
};

// アイテム選択の処理ウィンドウの横幅を変更……rpg_windows.jsより
Window_EventItem.prototype.initialize = function(messageWindow) {
    this._messageWindow = messageWindow;
    var width = 336;
    var height = this.windowHeight();
    Window_ItemList.prototype.initialize.call(this, 0, 0, width, height);
    this.openness = 0;
    this.deactivate();
    this.setHandler('ok',     this.onOk.bind(this));
    this.setHandler('cancel', this.onCancel.bind(this));
};

// ステータス画面最上部から、職業名と二つ名を削除……rpg_windows.jsより
Window_Status.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 6, y);
};

// ステータス画面用のレベル表示……rpg_windows.jsより
Window_Base.prototype.drawActorLevel2 = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 52, y, 36, 'right');
};

// ステータス画面のレベルの上に職業名を表示……rpg_windows.jsより
Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorClass(this._actor, x, y + lineHeight * 0);
    this.drawActorLevel2(this._actor, x, y + lineHeight * 1);
    this.drawActorHp(this._actor, x, y + lineHeight * 2);
    this.drawActorMp(this._actor, x, y + lineHeight * 3);
};
})();
