//=============================================================================
// K_MessageWindowAdjust
//=============================================================================

/*:
 * @plugindesc メッセージウィンドウ幅の調整をおこないます。
 * @author Kota (http://www.nine-yusha.com/)
 *
 * @help このプラグインには、プラグインコマンドはありません。

 メッセージウィンドウにおいて顔グラフィックが無しの時でも、
 顔グラフィックが有りの時と同じウィンドウ幅に調整されます。

 作者: Kota (http://www.nine-yusha.com/)
 作成日: 2015/11/20
*/

(function() {

	var parameters = PluginManager.parameters('K_MessageWindowAdjust');
	
	Window_ChoiceList.prototype.updatePlacement = function() {
	    var positionType = $gameMessage.choicePositionType();
	    var messageY = this._messageWindow.y;
	    this.width = this.windowWidth();
	    this.height = this.windowHeight();
	    switch (positionType) {
	    case 0:
	        this.x = 0;
	        // 顔グラフィック無しの時、位置と幅を調整
	        if (($gameMessage.faceName() === '') && ($gameParty.inBattle() == false)) {
				this.x = 84;
			}
	        break;
	    case 1:
	        this.x = (Graphics.boxWidth - this.width) / 2;
	        break;
	    case 2:
	        this.x = Graphics.boxWidth - this.width;
	        // 顔グラフィック無しの時、位置と幅を調整
	        if (($gameMessage.faceName() === '') && ($gameParty.inBattle() == false)) {
	        	this.x = Graphics.boxWidth - this.width - 84;
			}
	        break;
	    }
	    if (messageY >= Graphics.boxHeight / 2) {
	        this.y = messageY - this.height;
	    } else {
	        this.y = messageY + this._messageWindow.height;
	    }
	};
	
	var _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
	Window_Message.prototype.updatePlacement = function() {
		_Window_Message_updatePlacement.call(this);
		// 顔グラフィック無しの時、位置と幅を調整
		if (($gameMessage.faceName() === '') && ($gameParty.inBattle() == false)) {
			this.x = 84;
			this.width = Graphics.boxWidth - 168;
		} else {
			this.x = 0;
			this.width = Graphics.boxWidth;
		}
	};

})();
