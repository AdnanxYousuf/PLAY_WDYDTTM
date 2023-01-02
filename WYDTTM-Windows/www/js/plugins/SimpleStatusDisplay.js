//=============================================================================
// SimpleStatusDisplay.js
//=============================================================================

/*:
 * @plugindesc SimpleStatusDisplay
 * @author Takeya Kimura
 *
 * @help This plugin does not provide plugin commands.
 * this plugin can not use together with other status display change plug-ins.
 */

/*:ja
 * @plugindesc ステータス表示を名前とクラス名、二つ名のみにします。
 * @author Takeya Kimura
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * ステータス表示を変更する他のプラグインとの共存はできません。
 */

(function () {

    Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
        var lineHeight = this.lineHeight();
        var x2 = x + 180;
        this.drawActorName(actor, x, y);
        this.drawActorIcons(actor, x, y + lineHeight * 2);
        this.drawActorClass(actor, x2, y);
        this.drawActorNickname(actor, x, y + lineHeight * 1);
    };

    Window_Status.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var lineHeight = this.lineHeight();
            this.drawBlock1(lineHeight * 0);
            this.drawHorzLine(lineHeight * 1);
            this.drawBlock2(lineHeight * 2);
            this.drawHorzLine(lineHeight * 6);
            this.drawHorzLine(lineHeight * 13);
            this.drawBlock4(lineHeight * 14);
        }
    };

    Window_Status.prototype.drawBlock2 = function(y) {
        this.drawActorFace(this._actor, 12, y);
    };

})();
