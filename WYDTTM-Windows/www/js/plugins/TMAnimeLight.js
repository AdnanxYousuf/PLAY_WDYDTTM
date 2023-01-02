//=============================================================================
// TMVplugin - アニメ付き明かり
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/12/15
//=============================================================================

/*:
 * @plugindesc イベントにアニメーション付きの明かりを灯します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param animeRange
 * @desc アニメーションの大きさ。
 * 初期値: 0.1 ( 0.1 でプラスマイナス 10% の拡大縮小アニメ)
 * @default 0.1
 *
 * @help
 * 明かりとして加算合成したい画像を img/system フォルダに用意してください、
 * イベントのメモ欄に <animeLight:ファイル名> というタグを書き込めば
 * 明かりが表示されるようになります。
 *
 * 明かりの位置もタグを使って調整することができます。
 *
 * メモ欄（イベント）タグ:
 *   <animeLight:TMAnimeLight1>  # 明かりのファイル名を TMAnimeLight1 に設定。
 *   <animeLOpacity:192>         # 明かりの不透明度を 192 に設定。
 *   <animeLShiftX:24>           # 明かりの表示位置を右に 24 ドットずらす。
 *   <animeLShiftY:-44>          # 明かりの表示位置を上に 44 ドットずらす。
 *
 *   イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも
 *   同様のタグで名前を設定することができます。
 *   メモ欄と注釈の両方にタグがある場合は注釈が優先されます。
 *
 * プラグインコマンド:
 *   animeLight 1 TMAnimeLight1 255 0 -44
 *                               # イベント１番に明かりを適用します。
 *                                 ファイル名、不透明度、X座標補正、Y座標補正
 *                                 の順に値を設定してください。
 *   animeLight 1                # イベント１番の明かりを削除します。
 *
 */

var Imported = Imported || {};
Imported.TMAnimeLight = true;

if (!Imported.TMEventBase) {
  Imported.TMEventBase = true;
  (function() {
  
    //-----------------------------------------------------------------------------
    // Game_Event
    //
  
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) {
        this.loadCommentParams();
      }
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              if (match[2] === ':') {
                this._commentParams[match[1]] = match[3];
              } else {
                this._commentParams[match[1]] = true;
              }
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      if (this._commentParams[paramName]) {
        return this._commentParams[paramName];
      } else if (this.event().meta[paramName]) {
        return this.event().meta[paramName];
      } else {
        return null;
      }
    };

  })();
}

(function() {

  var parameters = PluginManager.parameters('TMAnimeLight');
  var animeRange = Number(parameters['animeRange']);

  //-----------------------------------------------------------------------------
  // Game_Temp
  //
  
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.createAnimeLightSinTable();
  };

  Game_Temp.prototype.createAnimeLightSinTable = function() {
    this._animeLightSinTable = [];
    for (var i = 0; i < 30; i++) {
      this._animeLightSinTable[i] = Math.sin(Math.PI * i / 15) * animeRange + 1;
    }
  };
  
  Game_Temp.prototype.animeLightSin = function(index) {
    return this._animeLightSinTable[index];
  };
  
  //-----------------------------------------------------------------------------
  // Game_Event
  //

  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    this._animeLight = '';
    this._animeLightOpacity = 255;
    this._animeLightShiftX = 0;
    this._animeLightShiftY = 0;
    if (this._pageIndex >= 0) {
      this._animeLight = this.loadTagParam('animeLight');
      if (this._animeLight) {
        this._animeLightOpacity = Number(this.loadTagParam('animeLOpacity') || 255);
        this._animeLightShiftX  = Number(this.loadTagParam('animeLShiftX') || 0);
        this._animeLightShiftY  = Number(this.loadTagParam('animeLShiftY') || 0);
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'animeLight') {
      var character = this.character(args[0]);
      if (character) {
        character._animeLight = args[1];
        if (args[2]) {
          character._animeLightOpacity = Number(args[2]);
        }
        if (args[3]) {
          character._animeLightShiftX = Number(args[3]);
        }
        if (args[4]) {
          character._animeLightShiftY = Number(args[4]);
        }
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.call(this);
    this._animeLight = '';
  };

  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateAnimeLight();
  };

  Sprite_Character.prototype.updateAnimeLight = function() {
    if (this._animeLight !== this._character._animeLight) {
      this._animeLight = this._character._animeLight;
      if (this._animeLight) {
        if (!this._animeLightSprite) {
          this._animeLightSprite = new Sprite_TMAnimeLight();
          this.addChild(this._animeLightSprite);
          this._animeLightSprite.opacity = this._character._animeLightOpacity;
          this._animeLightSprite.x = this._character._animeLightShiftX;
          this._animeLightSprite.y = this._character._animeLightShiftY;
        }
        this._animeLightSprite.refresh(this._animeLight);
      } else {
        this.removeChild(this._animeLightSprite);
        this._animeLightSprite = null;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_TMAnimeLight
  //

  function Sprite_TMAnimeLight() {
    this.initialize.apply(this, arguments);
  }

  Sprite_TMAnimeLight.prototype = Object.create(Sprite.prototype);
  Sprite_TMAnimeLight.prototype.constructor = Sprite_TMAnimeLight;

  Sprite_TMAnimeLight.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.blendMode = 1;
    this._animeCount = 0;
  };

  Sprite_TMAnimeLight.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this._animeCount++;
    if (this._animeCount === 30) {
      this._animeCount = 0;
    }
    var n = $gameTemp.animeLightSin(this._animeCount);
    this.scale.set(n, n);
  };

  Sprite_TMAnimeLight.prototype.refresh = function(fileName) {
    this.bitmap = ImageManager.loadSystem(fileName);
  };
  
})();
