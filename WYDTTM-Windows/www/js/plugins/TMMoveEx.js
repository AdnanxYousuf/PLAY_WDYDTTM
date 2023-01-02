//=============================================================================
// TMVplugin - 移動機能拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/12/01
//=============================================================================

/*:
 * @plugindesc 壁衝突音やリージョンによる通行設定などの機能を追加します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param passableRegionId
 * @desc タイルに関係なく通行を可能にするリージョン番号
 * 初期値: 251
 * @default 251
 *
 * @param dontPassRegionId
 * @desc タイルに関係なく通行を不可にするリージョン番号
 * 初期値: 252
 * @default 252
 *
 * @param seKnockWall
 * @desc 壁衝突効果音
 * 初期値: <name:Blow1><volume:90><pitch:100>
 * @default <name:Blow1><volume:90><pitch:100>
 *
 * @param knockWallPan
 * @desc 壁衝突効果音の左右バランス
 * 初期値: 75
 * @default 75
 *
 * @param knockWallInterval
 * @desc 壁衝突効果音の再生間隔（フレーム数）
 * 初期値: 30
 * @default 30
 *
 * @help プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMMoveEx = true;

(function() {

  var parameters = PluginManager.parameters('TMMoveEx');
  var passableRegionId = Number(parameters['passableRegionId']);
  var dontPassRegionId = Number(parameters['dontPassRegionId']);
  var knockWallInterval = Number(parameters['knockWallInterval']);
  var knockWallPan = Number(parameters['knockWallPan']);
  var re = /<name:(.+?)><volume:(.+?)><pitch:(.+?)>/;
  var match = re.exec(parameters['seKnockWall']);
  if (match) {
    var seKnockWall = {};
    seKnockWall.name = match[1];
    seKnockWall.volume = Number(match[2]);
    seKnockWall.pitch = Number(match[3]);
  } else {
    var seKnockWall = {name:'Blow1', volume:90, pitch:100};
  }

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  var _Game_Map_checkPassage = Game_Map.prototype.checkPassage;
  Game_Map.prototype.checkPassage = function(x, y, bit) {
    var regionId = this.regionId(x, y);
    if (regionId === passableRegionId) {
      return true;
    }
    if (regionId === dontPassRegionId) {
      return false;
    }
    return _Game_Map_checkPassage.call(this, x, y, bit);
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  var _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
  Game_Player.prototype.moveStraight = function(d) {
    _Game_Player_moveStraight.call(this, d);
    if (!this.isMovementSucceeded()) {
      var x2 = $gameMap.roundXWithDirection(this.x, d);
      var y2 = $gameMap.roundYWithDirection(this.y, d);
      if (this.isNormal() && ($gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2))) {
        return;
      }
      if (this.isInVehicle() && this.vehicle().isLandOk(this.x, this.y, this.direction())) {
        return;
      }
      var d2 = this.reverseDir(d);
      if (!$gameMap.isPassable(this.x, this.y, d) || !$gameMap.isPassable(x2, y2, d2)) {
        this._knockWallCount = this._knockWallCount === undefined ? 0 : this._knockWallCount;
        if (this._knockWallCount + knockWallInterval <= Graphics.frameCount ||
            this._lastKnockWallDir !== d) {
          if (d === 4) {
            seKnockWall.pan = -knockWallPan;
          } else if (d === 6) {
            seKnockWall.pan = knockWallPan;
          } else {
            seKnockWall.pan = 0;
          }
          AudioManager.playSe(seKnockWall);
          this._knockWallCount = Graphics.frameCount;
          this._lastKnockWallDir = d;
        }
      }
    }
  };

})();
