//==============================================================================================================
//--------------------------------------------------------------------------------------------------------------
// *** MUSHROOMCAKE28'S MENU OPTION EXPANSION P1 
//  * Author: MushroomCake28
//  * Contact: last.truong@hotmail.com
//  * Version: 1.04 (2017-04-18) 
//  * File Name: $MUSH_MenuOptionExpansion_P1.js
//--------------------------------------------------------------------------------------------------------------
// * INFO : This script is for expanding the option menu by adding additional customizable features such as 
//          windowskin, window color, window opacity, menu background, and maybe more stuffs if I get any more
//          ideas (or if people requests stuffs).
// * TERMS : This script is part of the MushroomCake Public first generation scripts. It can be used by anyone
//           for free and commercials games without requesting my permission. You just need to credit me
//           (MushroomCake28), and please be generous if I request a copy of your game ;) 
// * USAGE : Save as a javascript file (.js at the end) if it's not already a js file and insert it anywhere
//           in the plugin manager. Use the file name at the top of the script.
//--------------------------------------------------------------------------------------------------------------
// INFORMATION ON FUNCTIONALITY
// * This script will be referred as 'MOE' in the code for 'Menu Option Expansion'.
// * Tested succesfully with:
//   + Yanfly's synch Monitor Option (version 1.01)
// * For game text fonts, place the fonts you want to use in the game in the 'fonts' folder.
// * For different windowskins, place them in the 'img/system' folder.
// * for different menu background, place them in the 'img/title1' folder.
//--------------------------------------------------------------------------------------------------------------
// UPDATES HISTORY
// * v.1.01: finished 2017-04-19
// * v.1.02: finished 2017-04-26 
//   - fixed display typos
//   - fixed some minor font bug
// * v.1.03: finished 2017-04-26
//   - fixed the background stretch
// * v.1.04: finished 2017-11-21
//   - fixed a minor bug that created an infinte loading screen
//--------------------------------------------------------------------------------------------------------------
// SECTIONS
// * Section 1: Managers modifications
//   - 1.0 : ConfigManager (creating new features)
// * Section 2: Windows modifications
//   - 2.0 : Window Options (adding new features) *** OVERWRIRING (look at the section for more info)
//   - 2.1 : Window Base (adding the features in the parent class) 
// * Section 3: Scenes modifications
//   - 3.0 : Scene MenuBase (menu background)
//   - 3.1 : Scene Options (refresh menu background)
//   - 3.2 : Scene Title  (Game Font)
// * Section 4: Core modifications
//   - 4.0 : Graphics (loading the gamefonts)
//==============================================================================================================
// *** PLUGIN PARAMETERS
/*:
* 
* @plugindesc [v.1.04] Adds several features in the option menu.
* @author MushroomCake28
* @help Insert anywhere and activate it for it to work.
*
* For parameters that change colors or opacity (sych as  window color, window opacity,
* and bar colors), enter values that are:
* - red, blue, green: between 0 and 255
* - opacity: between 0 and 255
* - alpha: between 0 and 1
* 
* Also, for the menu background files, place the images you want to use as
* background in the 'title1' folder. If you want to use the map background
* as a background, write 'default' in the filename parameter.
*
* Menu Background Parameters: 
* - For the filename, if you name it 'default', it will display the default
*   RPG Maker Menu Background (Map background).
* - Always leave at least one argument in the filename Parameter's array if
*   you activate the menu background function.
*
* WindowSkin Parameters:
* - Always leave at least one argument in the filename Parameter's array if
*   you activate the windowskin function.
*
* TextFont Parameters:
* - Always leave at least one argument in the filename Parameter's array if
*   you activate the game text function.
*
* @param ---------------------
* @desc 
* @default 
*
* @param WindowOption Width
* @desc Set the width of the window Option. The default value
* for RPG Maker is 400
* @default 600
*
* @param VolumeOption Fluidity
* @desc Set to true if you want to be able to manipulate with more
* fluidity the volume settings and add bars.
* @default false
*
* @param VolumeOption Bgm Bar
* @desc Set the rgba color of the bgm bar.
* Syntax: rgba(red, blue, green, alpha)
* @default rgba(182, 0, 255, 1)
*
* @param VolumeOption Bgs Bar
* @desc Set the rgba color of the bgs bar.
* Syntax: rgba(red, blue, green, alpha)
* @default rgba(182, 0, 255, 1)
*
* @param VolumeOption Me Bar
* @desc Set the rgba color of the me bar.
* Syntax: rgba(red, blue, green, alpha)
* @default rgba(182, 0, 255, 1)
*
* @param VolumeOption Se Bar
* @desc Set the rgba color of the se bar.
* Syntax: rgba(red, blue, green, alpha)
* @default rgba(182, 0, 255, 1)
*
* @param ---------------------
* @desc 
* @default 
*
* @param TextFont Feature
* @desc Set to 'true' to add a text font option and 'false' if you
* don't want to have that option. 
* @default false
*
* @param TextFont Command Name
* @desc Set the command name in the option menu.
* @default Game text font
*
* @param TextFont Font Names
* @desc Set the font name that will appear in the option menu.
* @default ["gamefont"]
*
* @param TextFont Filenames
* @desc The filename for all the textfont options you want to add.
* Follow the format ["filename1", "filename2", etc.]
* @default ["mplus-1m-regular"]
*
* @param TextFont Default
* @desc Set the index of the default textfont. The first 
* textfont defined is index 0, the next one 1, and so on.
* @default 0
*
* @param ---------------------
* @desc 
* @default 
*
* @param WindowSkin Feature
* @desc Set to 'true' to add a windowskin option and 'false' if you
* don't want to have that option.
* @default true
*
* @param WindowSkin Command Name
* @desc Set the command name in the option menu.
* @default Windowskin
*
* @param WindowSkin Names
* @desc Set the windowskin name that will appear in the option menu.
* @default ["default"]
*
* @param WindowSkin Filenames
* @desc The filename for all the windowskin options you want to add.
* Follow the format ["filename1", "filename2", etc.]
* @default ["Window"]
*
* @param WindowSkin Default
* @desc Set the index of the default windowskin. The first 
* windowskin defined is index 0, the next one 1, and so on.
* @default 0
*
* @param ---------------------
* @desc 
* @default 
*
* @param WindowColor Feature
* @desc Set to 'true' to add a windowcolor option and 'false' if
* you don't want to have that option.
* @default true
*
* @param WindowColor Default Red
* @desc Set the default red color (value between 0 and 255).
* @default 0
*
* @param WindowColor Default Green
* @desc Set the default green color (value between 0 and 255).
* @default 0
*
* @param WindowColor Default Blue
* @desc Set the default blue color (value between 0 and 255).
* @default 0
*
* @param ---------------------
* @desc 
* @default 
*
* @param WindowOpacity Feature
* @desc Set to 'true' to add a window opacity option and 'false' if
* you don't want to have that option.
* @default true
*
* @param WindowOpacity Name
* @desc Set the command name in the option menu.
* @default Window Opacity
*
* @param WindowOpacity Default
* @desc Set the default window opacity (value between 0 and 255).
* RPG Maker default value is 192.
* @default 255
*
* @param WindowOpacity BarColor
* @desc Set the default bar color in the option menu.
* Syntax: rgba(red, green blue) 
* @default rgba(255, 255, 0, 1)
*
* @param ---------------------
* @desc 
* @default 
*
* @param MenuBack Feature
* @desc Set to 'true' to add a window opacity option and 'false' if
* you don't want to have that option.
* @default true
*
* @param MenuBack Stretch 
* @desc Set to true to stretch the menu background to the 
* windowsize.
* @default true
*
* @param MenuBack Command Name
* @desc Set the command name in the option menu.
* @default Menu Background
*
* @param MenuBack Names
* @desc Set the menuback name that will appear in the option menu.
* @default ["Map background"]
*
* @param MenuBack Filenames
* @desc The filename for all the menuback options you want to add.
* Follow the format ["filename1", "filename2", etc.]
* @default ["default"]
*
* @param MenuBack Default
* @desc Set the default menuback when starting a new game.
* @default 0
*
*/
//==============================================================================================================

var Imported = Imported || {};
Imported.mushFeatures = Imported.mushFeatures || {}; 
Imported.mushFeatures['MenuOptionExpansion_P1'] = 1.04;

var $mushFeatures = $mushFeatures || { 'imported': {}, 'params': {} };
$mushFeatures.imported['MenuOptionExpansion_P1'] = 1.04;

var nowParameters = PluginManager.parameters('$MUSH_MenuOptionExpansion_P1');
$mushFeatures.params['MOE_WindowOptionWidth']    = Number(nowParameters['WindowOption Width']);
$mushFeatures.params['MOE_VolumeOptionFluidity'] = eval(nowParameters['VolumeOption Fluidity']);
$mushFeatures.params['MOE_VolumeOptionBgmBar']   = String(nowParameters['VolumeOption Bgm Bar']);
$mushFeatures.params['MOE_VolumeOptionBgsBar']   = String(nowParameters['VolumeOption Bgs Bar']);
$mushFeatures.params['MOE_VolumeOptionMeBar']    = String(nowParameters['VolumeOption Me Bar']);
$mushFeatures.params['MOE_VolumeOptionSeBar']    = String(nowParameters['VolumeOption Se Bar']);
$mushFeatures.params['MOE_TextFontFeature']     = eval(nowParameters['TextFont Feature']);
$mushFeatures.params['MOE_TextFontCommandName'] = String(nowParameters['TextFont Command Name']);
$mushFeatures.params['MOE_TextFontFontNames']   = eval(nowParameters['TextFont Font Names']);
$mushFeatures.params['MOE_TextFontFilenames']   = eval(nowParameters['TextFont Filenames']);
$mushFeatures.params['MOE_TextFontDefault']     = Number(nowParameters['TextFont Default']);
$mushFeatures.params['MOE_WindowSkinFeature']     = eval(nowParameters['WindowSkin Feature']);
$mushFeatures.params['MOE_WindowSkinCommandName'] = String(nowParameters['WindowSkin Command Name']);
$mushFeatures.params['MOE_WindowSkinNames']       = eval(nowParameters['WindowSkin Names']);
$mushFeatures.params['MOE_WindowSkinFilenames']   = eval(nowParameters['WindowSkin Filenames']);
$mushFeatures.params['MOE_WindowSkinDefault']     = Number(nowParameters['WindowSkin Default']);
$mushFeatures.params['MOE_WindowColorFeature']      = eval(nowParameters['WindowColor Feature']);
$mushFeatures.params['MOE_WindowColorDefaultRed']   = Number(nowParameters['WindowColor Default Red']);
$mushFeatures.params['MOE_WindowColorDefaultGreen'] = Number(nowParameters['WindowColor Default Green']);
$mushFeatures.params['MOE_WindowColorDefaultBlue']  = Number(nowParameters['WindowColor Default Blue']);
$mushFeatures.params['MOE_WindowOpacityFeature']  = eval(nowParameters['WindowOpacity Feature']);
$mushFeatures.params['MOE_WindowOpacityName']     = String(nowParameters['WindowOpacity Name']);
$mushFeatures.params['MOE_WindowOpacityDefault']  = Number(nowParameters['WindowOpacity Default']);
$mushFeatures.params['MOE_WindowOpacityBarColor'] = String(nowParameters['WindowOpacity BarColor']);
$mushFeatures.params['MOE_MenuBackFeature']     = eval(nowParameters['MenuBack Feature']);
$mushFeatures.params['MOE_MenuBackStretch']     = eval(nowParameters['MenuBack Stretch']);
$mushFeatures.params['MOE_MenuBackCommandName'] = String(nowParameters['MenuBack Command Name']);
$mushFeatures.params['MOE_MenuBackNames']       = eval(nowParameters['MenuBack Names']);
$mushFeatures.params['MOE_MenuBackFilenames']   = eval(nowParameters['MenuBack Filenames']);
$mushFeatures.params['MOE_MenuBackDefault']     = Number(nowParameters['MenuBack Default']);

//==============================================================================================================
// * SECTION 1.0 : ConfigManager
//   - settings new options in the ConfigManager
//==============================================================================================================

ConfigManager.moe_textFont         = $mushFeatures.params['MOE_TextFontDefault'];
ConfigManager.moe_windowSkin       = $mushFeatures.params['MOE_WindowSkinDefault'];
ConfigManager.moe_windowColorRed   = $mushFeatures.params['MOE_WindowColorDefaultRed'];
ConfigManager.moe_windowColorGreen = $mushFeatures.params['MOE_WindowColorDefaultGreen'];
ConfigManager.moe_windowColorBlue  = $mushFeatures.params['MOE_WindowColorDefaultBlue'];
ConfigManager.moe_windowOpacity    = $mushFeatures.params['MOE_WindowOpacityDefault'];
ConfigManager.moe_menuBack         = $mushFeatures.params['MOE_MenuBackDefault'];

var aliasMush_ConfigManagerMakeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = aliasMush_ConfigManagerMakeData.call(this);
    if ($mushFeatures.params['MOE_TextFontFeature'])   { config.moe_textFont = this.moe_textFont };
    if ($mushFeatures.params['MOE_WindowSkinFeature']) { config.moe_windowSkin = this.moe_windowSkin };
    if ($mushFeatures.params['MOE_WindowColorFeature']) {
    	config.moe_windowColorRed   = this.moe_windowColorRed;
    	config.moe_windowColorGreen = this.moe_windowColorGreen;
    	config.moe_windowColorBlue  = this.moe_windowColorBlue;
    }
    if ($mushFeatures.params['MOE_WindowOpacityFeature']) { config.moe_windowOpacity = this.moe_windowOpacity };
    if ($mushFeatures.params['MOE_MenuBackFeature']) { config.moe_menuBack = this.moe_menuBack };
    return config;
};

var aliasMush_ConfigManagerApplyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    aliasMush_ConfigManagerApplyData.call(this, config);
    if ($mushFeatures.params['MOE_TextFontFeature']) { 
        this.moe_textFont    = this.readConfigTextFont(config, 'moe_textFont');
        this.mush_checkOptionMax('moe_textFont');
    }
    if ($mushFeatures.params['MOE_WindowSkinFeature']) { 
        this.moe_windowSkin  = this.readConfigWindowSkin(config, 'moe_windowSkin');
        this.mush_checkOptionMax('moe_windowskin');
    }
    if ($mushFeatures.params['MOE_WindowColorFeature']) {
    	this.moe_windowColorRed   = this.readConfigWindowColor(config, 'moe_windowColorRed');
    	this.moe_windowColorGreen = this.readConfigWindowColor(config, 'moe_windowColorGreen');
    	this.moe_windowColorBlue  = this.readConfigWindowColor(config, 'moe_windowColorBlue');
    } 
    if ($mushFeatures.params['MOE_WindowOpacityFeature']) { 
        this.moe_windowOpacity = this.readConfigWindowOpacity(config, 'moe_windowOpacity') 
    }
    if ($mushFeatures.params['MOE_MenuBackFeature']) { 
        this.moe_menuBack = this.readConfigMenuBack(config, 'moe_menuBack'); 
        this.mush_checkOptionMax('moe_menuBack');
    }
};

ConfigManager.mush_checkOptionMax = function(symbol) {
	if (symbol == 'moe_textFont') {
        if (this.moe_textFont > $mushFeatures.params['MOE_TextFontFilenames'].length - 1) this.moe_textFont = 0;
	} else if (symbol == 'moe_windowSkin') {
        if (this.moe_windowSkin > $mushFeatures.params['MOE_WindowSkinFilenames'].length - 1) this.moe_windowSkin = 0;
    } else if (symbol == 'moe_menuBack') {
        if (this.moe_menuBack > $mushFeatures.params['MOE_MenuBackFilenames'].length - 1) this.moe_menuBack = 0;
    }
};

ConfigManager.readConfigTextFont = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return $mushFeatures.params['MOE_TextFontDefault'];
    }
};

ConfigManager.readConfigWindowSkin = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return $mushFeatures.params['MOE_WindowSkinDefault'];
    }
};

ConfigManager.readConfigWindowColor = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        if (name == 'moe_windowColorRed')   { return $mushFeatures.params['MOE_WindowColorDefaultRed'] };
        if (name == 'moe_windowColorGreen') { return $mushFeatures.params['MOE_WindowColorDefaultGreen'] };
        if (name == 'moe_windowColorBlue')  { return $mushFeatures.params['MOE_WindowColorDefaultBlue'] };
    }
};

ConfigManager.readConfigWindowOpacity = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return $mushFeatures.params['MOE_WindowOpacityDefault'];
    }
};

ConfigManager.readConfigMenuBack = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return $mushFeatures.params['MOE_MenuBackDefault'];
    }
};

//==============================================================================================================
// * SECTION 2.0 : Window Options
//   - adding the new features
//==============================================================================================================

var aliasMush_WindowOptionsInitialize = Window_Options.prototype.initialize;
Window_Options.prototype.initialize = function() {
    aliasMush_WindowOptionsInitialize.call(this);
    this.updateMenuBack = false;
};

// overwrote
Window_Options.prototype.windowWidth = function() {
    return $mushFeatures.params['MOE_WindowOptionWidth'];
};

var aliasMush_WindowOptionsMakeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    aliasMush_WindowOptionsMakeCommandList.call(this);
    this.addMoeOptions();
};

// Overwrote
Window_Options.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    var barMaxWidth = Math.floor(this.width / 3); 
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    if (symbol == 'moe_windowColorRed') {
    	var barWidth = Math.floor(barMaxWidth * value / 255);
    	this.contents.fillRect( this.width - 36 - barMaxWidth,  rect.y + (this.contents.fontSize - 12), barMaxWidth, 12, 'rgba(42, 42, 42, 1)' );
    	this.contents.gradientFillRect( this.width - 36 - barWidth,  rect.y + (this.contents.fontSize - 12), barWidth, 12, 
    				'rgba(255, 0, 0, 1)', 'rgba(255, 42, 0, 1)', false );
    } else if (symbol == 'moe_windowColorGreen') {
    	var barWidth = Math.floor(barMaxWidth * value / 255);
    	this.contents.fillRect( this.width - 36 - barMaxWidth,  rect.y + (this.contents.fontSize - 12), barMaxWidth, 12, 'rgba(42, 42, 42, 1)' );
    	this.contents.gradientFillRect( this.width - 36 - barWidth,  rect.y + (this.contents.fontSize - 12), barWidth, 12, 
    				'rgba(0, 255, 0, 1)', 'rgba(0, 255, 42, 1)', false );
    } else if (symbol == 'moe_windowColorBlue') {
    	var barWidth = Math.floor(barMaxWidth * value / 255);
    	this.contents.fillRect( this.width - 36 - barMaxWidth,  rect.y + (this.contents.fontSize - 12), barMaxWidth, 12, 'rgba(42, 42, 42, 1)' );
    	this.contents.gradientFillRect( this.width - 36 - barWidth,  rect.y + (this.contents.fontSize - 12), barWidth, 12, 
    				'rgba(0, 0, 255, 1)', 'rgba(42, 0, 255, 1)', false );
    } else if (symbol == 'moe_windowOpacity') {
    	var barWidth = Math.floor(barMaxWidth * value / 255);
    	var color = $mushFeatures.params['MOE_WindowOpacityBarColor'];
    	this.contents.fillRect( this.width - 36 - barMaxWidth,  rect.y + (this.contents.fontSize - 12), barMaxWidth, 12, 'rgba(42, 42, 42, 1)' );
    	this.contents.fillRect( this.width - 36 - barWidth,  rect.y + (this.contents.fontSize - 12), barWidth, 12, color);
    }
    if ($mushFeatures.params['MOE_VolumeOptionFluidity']) {
    	if (symbol == 'bgmVolume') {
    		var barWidth = Math.floor(barMaxWidth * value / 100);
	    	var color = $mushFeatures.params['MOE_VolumeOptionBgmBar'];
	    	this.contents.fillRect( this.width - 36 - barMaxWidth,  rect.y + (this.contents.fontSize - 12), barMaxWidth, 12, 'rgba(42, 42, 42, 1)' );
	    	this.contents.fillRect( this.width - 36 - barWidth,  rect.y + (this.contents.fontSize - 12), barWidth, 12, color);
    	} else if (symbol == 'bgsVolume') {
    		var barWidth = Math.floor(barMaxWidth * value / 100);
	    	var color = $mushFeatures.params['MOE_VolumeOptionBgsBar'];
	    	this.contents.fillRect( this.width - 36 - barMaxWidth,  rect.y + (this.contents.fontSize - 12), barMaxWidth, 12, 'rgba(42, 42, 42, 1)' );
	    	this.contents.fillRect( this.width - 36 - barWidth,  rect.y + (this.contents.fontSize - 12), barWidth, 12, color);
    	} else if (symbol == 'meVolume') {
    		var barWidth = Math.floor(barMaxWidth * value / 100);
	    	var color = $mushFeatures.params['MOE_VolumeOptionMeBar'];
	    	this.contents.fillRect( this.width - 36 - barMaxWidth,  rect.y + (this.contents.fontSize - 12), barMaxWidth, 12, 'rgba(42, 42, 42, 1)' );
	    	this.contents.fillRect( this.width - 36 - barWidth,  rect.y + (this.contents.fontSize - 12), barWidth, 12, color);
    	} else if (symbol == 'seVolume') {
    		var barWidth = Math.floor(barMaxWidth * value / 100);
	    	var color = $mushFeatures.params['MOE_VolumeOptionSeBar'];
	    	this.contents.fillRect( this.width - 36 - barMaxWidth,  rect.y + (this.contents.fontSize - 12), barMaxWidth, 12, 'rgba(42, 42, 42, 1)' );
	    	this.contents.fillRect( this.width - 36 - barWidth,  rect.y + (this.contents.fontSize - 12), barWidth, 12, color);
    	}
    }
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};

Window_Options.prototype.addMoeOptions = function() {
    if ($mushFeatures.params['MOE_TextFontFeature']) {
    	var name = $mushFeatures.params['MOE_TextFontCommandName'];
    	this.addCommand(name, 'moe_textFont');
    }
    if ($mushFeatures.params['MOE_WindowSkinFeature']) {
    	var name = $mushFeatures.params['MOE_WindowSkinCommandName'];
    	this.addCommand(name, 'moe_windowSkin')
    }
    if ($mushFeatures.params['MOE_WindowColorFeature']) {
    	var red   = $mushFeatures.params['MOE_WindowColorDefaultRed'];
    	var green = $mushFeatures.params['MOE_WindowColorDefaultGreen'];
    	var blue  = $mushFeatures.params['MOE_WindowColorDefaultBlue'];
    	this.addCommand('Window Color Red',   'moe_windowColorRed');
    	this.addCommand('Window Color Green', 'moe_windowColorGreen');
    	this.addCommand('Window Color Blue',  'moe_windowColorBlue');
    }
    if ($mushFeatures.params['MOE_WindowOpacityFeature']) {
    	var name = $mushFeatures.params['MOE_WindowOpacityName'];
    	this.addCommand(name, 'moe_windowOpacity');
    }
    if ($mushFeatures.params['MOE_MenuBackFeature']) {
    	var name = $mushFeatures.params['MOE_MenuBackCommandName'];
    	this.addCommand(name, 'moe_menuBack');
    }
};

Window_Options.prototype.isMoeSymbol = function(symbol) {
	var allSymbols = ['moe_textFont', 'moe_windowSkin', 'moe_windowColorRed', 'moe_windowColorGreen', 'moe_windowColorBlue', 'moe_windowOpacity', 
                'moe_menuBack', 'mosr_screenResolution'];
	var inside = false;
	for (var i = 0 ; i < allSymbols.length ; i++) {
		if (allSymbols[i] == symbol) { inside = true };
	}
	return inside;
};

Window_Options.prototype.haveBar = function(symbol) {
	var have = false;
	var symbolHave = ["moe_windowColorRed", "moe_windowColorGreen", "moe_windowColorBlue", "moe_windowOpacity"];
	if ($mushFeatures.params['MOE_VolumeOptionFluidity']) {
		symbolHave.push('bgmVolume');
		symbolHave.push('bgsVolume');
		symbolHave.push('meVolume');
		symbolHave.push('seVolume');
	}
	for (var i = 0 ; i < symbolHave.length ; i++) {
		if (symbol == symbolHave[i]) { have = true };
	}
	return have;
}

// overwrote this method
Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        if (value > 100) {
            value = 0;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else if (this.isMoeSymbol(symbol)) {
    	this.changeValueMoe(symbol, 'add', 30);
    } else {
        this.changeValue(symbol, !value);
    }
};

// overwrote this method
Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
    	if (this.haveBar(symbol)) {
    		value -= 5;
    	} else {
    		value += this.volumeOffset(); 
    	}
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else if (this.isMoeSymbol(symbol)) {
    	if (this.haveBar(symbol)) {
    		this.changeValueMoe(symbol, 'sub', 5);
    	} else {
    		this.changeValueMoe(symbol, 'add', 5);
    	}
    } else {
        this.changeValue(symbol, true);
    }
};

// overwrote this method
Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        if (this.haveBar(symbol)) {
    		value += 5;
    	} else {
    		value -= this.volumeOffset(); 
    	}
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else if (this.isMoeSymbol(symbol)) {
    	if (this.haveBar(symbol)) {
    		this.changeValueMoe(symbol, 'add', 5);
    	} else {
    		this.changeValueMoe(symbol, 'sub', 5);
    	}
    } else {
        this.changeValue(symbol, false);
    }
};

// overwrote this method
Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        return this.volumeStatusText(value);
    } else if (this.isMoeSymbol(symbol)) {
    	if (symbol == 'moe_textFont') {
    		var filename = $mushFeatures.params['MOE_TextFontFontNames'][value];
    		return filename;
    	} else if (symbol == 'moe_windowSkin') {
    		var filename = $mushFeatures.params['MOE_WindowSkinNames'][value];
    		return filename;
    	} else if (symbol == 'moe_windowColorRed') {
    		return value;
    	} else if (symbol == 'moe_windowColorGreen') {
    		return value;
    	} else if (symbol == 'moe_windowColorBlue') {
    		return value;
    	} else if (symbol == 'moe_windowOpacity') {
    		return value;
    	} else if (symbol == 'moe_menuBack') {
    		var filename = $mushFeatures.params['MOE_MenuBackNames'][value];
    		return filename;
    	}
	} else {
        return this.booleanStatusText(value);
    }
};

// operation: 'add' for + and 'sub' for -
Window_Options.prototype.changeValueMoe = function(symbol, operation, numValue) {
	if (symbol == 'moe_textFont') {
		var filenames = $mushFeatures.params['MOE_TextFontFilenames'];
		var value = this.getConfigValue(symbol);
		if (Number.isInteger(value) == false) {value = 0};
		if (value > filenames.length - 1) {value = 0};
		if (operation == 'add') {
			if (value < filenames.length - 1) {
				value += 1;
			} else {
				value = 0;
			}
		} else if (operation == 'sub') {
			if (value > 0) {
				value -= 1;
			} else {
				value = filenames.length - 1;
			}
		}
		this.changeValue(symbol, value);
		this.mush_loadGameFont();
		this.refresh();
	} else if (symbol == 'moe_windowSkin') {
		var filenames = $mushFeatures.params['MOE_WindowSkinFilenames'];
		var value = this.getConfigValue(symbol);
		if (Number.isInteger(value) == false) {value = 0};
		if (value > filenames.length - 1) {value = 0};
		if (operation == 'add') {
			if (value < filenames.length - 1) {
				value += 1;
			} else {
				value = 0;
			}
		} else if (operation == 'sub') {
			if (value > 0) {
				value -= 1;
			} else {
				value = filenames.length - 1;
			}
		}
		this.changeValue(symbol, value);
		this.loadWindowskin();
	} else if (symbol == 'moe_windowColorRed') {
		this.changeValueWindowColor(symbol, operation, numValue);
	} else if (symbol == 'moe_windowColorGreen') {
		this.changeValueWindowColor(symbol, operation, numValue);
	} else if (symbol == 'moe_windowColorBlue') {
		this.changeValueWindowColor(symbol, operation, numValue);
	} else if (symbol == 'moe_windowOpacity') {
		var value = this.getConfigValue(symbol);
		if (operation == 'add') {
			if (value < 255)  {
				value += numValue;
			} else {
				value = 0;
			}
		} else if (operation == 'sub') {
			if (value > 0) {
				value -= numValue;
			} else {
				value = 255;
			}
		}
		value = value.clamp(0, 255);
		this.changeValue(symbol, value);
		this.opacity = value;
	} else if (symbol == 'moe_menuBack') {
		var filenames = $mushFeatures.params['MOE_MenuBackFilenames'];
		var value = this.getConfigValue(symbol);
		if (Number.isInteger(value) == false) {value = 0};
		if (value > filenames.length - 1) {value = 0};
		if (operation == 'add') {
			if (value < filenames.length - 1) {
				value += 1;
			} else {
				value = 0;
			}
		} else if (operation == 'sub') {
			if (value > 0) {
				value -= 1;
			} else {
				value = filenames.length - 1;
			}
		}
		this.changeValue(symbol, value);
		this.updateMenuBack = true;
	}
};

Window_Options.prototype.changeValueWindowColor = function(symbol, operation, numValue) {
	var value = this.getConfigValue(symbol);
	if (operation == 'add') {
		if (value < 255)  {
			value += numValue;
		} else {
			value = 0;
		}
	} else if (operation == 'sub') {
		if (value > 0) {
			value -= numValue;
		} else {
			value = 255;
		}
	}
	value = value.clamp(0, 255);
	this.changeValue(symbol, value);
	var t_red   = this.getConfigValue('moe_windowColorRed');
	var t_green = this.getConfigValue('moe_windowColorGreen');
	var t_blue  = this.getConfigValue('moe_windowColorBlue');
	var tone = [t_red, t_green, t_blue];
	$gameSystem.setWindowTone(tone);
};

//==============================================================================================================
// * SECTION 2.1 : Window Base
//   - Updating the Window Parent Class
//==============================================================================================================

var aliasMush_WindowBaseInitialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
    aliasMush_WindowBaseInitialize.apply(this, arguments);
    var t_red   = ConfigManager['moe_windowColorRed'];
	var t_green = ConfigManager['moe_windowColorGreen'];
	var t_blue  = ConfigManager['moe_windowColorBlue'];
	var tone = [t_red, t_green, t_blue];
	$gameSystem.setWindowTone(tone);
	this.opacity = ConfigManager['moe_windowOpacity'];
    this.mush_loadGameFont();
};

Window_Base.prototype.mush_getGameSettingsMoe = function(symbol) {
    return ConfigManager[symbol];
};

var aliasMush_WindowBaseLoadWindowskin = Window_Base.prototype.loadWindowskin;
Window_Base.prototype.loadWindowskin = function() {
	if ($mushFeatures.params['MOE_WindowSkinFeature']) {
		var filenames = $mushFeatures.params['MOE_WindowSkinFilenames'];
		var maxValue = filenames.length;
		var value = this.mush_getGameSettingsMoe('moe_windowSkin');
		if (Number.isInteger(value) == false) { value = 0 ; ConfigManager['moe_windowSkin'] = 0  };
		if (value > maxValue - 1) { value = 0 ; ConfigManager['moe_windowSkin'] = 0 };
		this.windowskin = ImageManager.loadSystem(filenames[value]);
	} else {
		aliasMush_WindowBaseLoadWindowskin.call(this);
	}
};

var aliasMush_WindowBaseResetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
	aliasMush_WindowBaseResetFontSettings.apply(this);
	this.mush_loadGameFont();
};

Window_Base.prototype.mush_loadGameFont = function() {
	if($mushFeatures.params['MOE_TextFontFeature']) {
		var allFonts = $mushFeatures.params['MOE_TextFontFontNames'];
		var maxValue = allFonts.length;
		var value = this.mush_getGameSettingsMoe('moe_textFont');
        if (allFonts[value] != "default") {
            if (value > maxValue - 1) { value = 0; ConfigManager['moe_textFont'] = 0 };
            if (value == 0) {
                if (allFonts[0].trim() != '') {
                    this.contents.fontFace = allFonts[value];
                }
            } else {
                this.contents.fontFace = allFonts[value];
            }
        }
	}
};

//==============================================================================================================
// * SECTION 3.0 : Scene MenuBase
//   - Changing Background
//==============================================================================================================

var aliasMush_SceneMenuBaseCreateBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	if ($mushFeatures.params['MOE_MenuBackFeature']) {
		var value = ConfigManager['moe_menuBack'];
		var filename = $mushFeatures.params['MOE_MenuBackFilenames'][value];
		if (filename == 'default') {
			aliasMush_SceneMenuBaseCreateBackground.call(this);
            this.refreshStretch = true;
		} else {
			this._backgroundSprite = new Sprite();
	    	this._backgroundSprite.bitmap = ImageManager.loadTitle1(filename, 0);
	    	this.addChild(this._backgroundSprite);
	    	this.refreshStretch = true;
		}
	} else {
		aliasMush_SceneMenuBaseCreateBackground.call(this);
	}
};

Scene_MenuBase.prototype.mush_refreshMenuBackground = function() {
	var value = ConfigManager['moe_menuBack'];
	var filename = $mushFeatures.params['MOE_MenuBackFilenames'][value];
	if (filename == 'default') {
		this._backgroundSprite.scale.x = 1.00;
		this._backgroundSprite.scale.y = 1.00;
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.refreshStretch = true;
	} else {
	   	this._backgroundSprite.bitmap = ImageManager.loadTitle1(filename, 0);
	   	this.refreshStretch = true;
	}
};

Scene_MenuBase.prototype.mush_stretchMenuBackground = function() {
    if ($mushFeatures.params['MOE_MenuBackStretch']) {
        var backWidth  = this._backgroundSprite.width;
        var backHeight = this._backgroundSprite.height;
        var value = ConfigManager['moe_menuBack'];
        var filename = $mushFeatures.params['MOE_MenuBackFilenames'][value];
        var scaleX = Graphics._boxWidth / backWidth;
        var scaleY = Graphics._boxHeight / backHeight;
        this._backgroundSprite.scale.x = scaleX;
        this._backgroundSprite.scale.y = scaleY;
        this.refreshStretch = false;
    }
};

var aliasMush_SceneMenuBaseUpdate = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
    aliasMush_SceneMenuBaseUpdate.call(this);
    if (this.refreshStretch) {
    	this.mush_stretchMenuBackground();
    }
};

//==============================================================================================================
// * SECTION 3.1 : Scene Options
//   - refresh Background
//==============================================================================================================

var aliasMush_SceneOptionsUpdate = Scene_Options.prototype.update;
Scene_Options.prototype.update = function() {
    aliasMush_SceneOptionsUpdate.call(this);
    if (this._optionsWindow) {
    	if (this._optionsWindow.updateMenuBack) {
    		this.mush_refreshMenuBackground();
    		this._optionsWindow.updateMenuBack = false;
    	}
    }
};

//==============================================================================================================
// * SECTION 3.2 : Scene Title
//   - Get the font to work correctly when changed
//==============================================================================================================

var aliasMush_SceneTitleStart = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
    aliasMush_SceneTitleStart.call(this);
    this.createCommandWindow();
};

//==============================================================================================================
// * SECTION 4.0 : Graphics
//   - Loading the game's fonts
//==============================================================================================================

if ($mushFeatures.params['MOE_TextFontFeature']) {
	var allFonts = $mushFeatures.params['MOE_TextFontFilenames'];
	var allNames = $mushFeatures.params['MOE_TextFontFontNames'];
	for (var i = 0 ; i < allFonts.length ; i++) {
		var file = String(allFonts[i]);
		var name = String(allNames[i]);
		Graphics.loadFont(name, 'fonts/' + file);
	}
};
