var Imported = Imported || {} ;
Imported.TS_Scripts = true;

var TS = TS || {};
TS.Scripts = TS.Scripts || {};

/*:
@title Thasuki Scripts
@version Ver. 4
@plugindesc Supplies scrip calls for some specific functionalities. Item
trading and party petrification methods are written with the assumption
that the game dev is using the HimeWorks PartyManager Plugin.

THERE'S GOOD MEAT HERE!

@author Thasuki01
@help
-------------------------------------------------------------------------

===== Terms of use =====

This plugin is free for commercial and non-commercial use, but requires
the user to give credit to the author, and send some feedback to 
Thasuki01 at gmail.com.

The HimeWorks SideviewActorEnemy plugin is required for sideview enemies
to be affected graphically for the petrification state.

Youtube https://wwww.youtube.com/Suboshi3

===== List of available methods =====

- helloWorld()
- autoSave()
- loadSave()
- autoLoadSave()
- killSaves()
- killCurrentSave()
- itemTrade([[itemId, quantity],...],[[itemId, quantity],...], multipleOfTrade)
- petrificationCheck()
- randomToggleSwitch()
- getPlayerPos()
- checkPlayerPos()

===== Plugin Parameters =====

- TradeNPCVar

===== To call the scripts =====

In your event, call the method by adding a new script call and type the
method name with any parameters they need.

For example:

autoSave();
itemTrade([[1,1],[2,1]],[[3,1],[4,1]], 2);

===== Method Descriptions =====

helloWorld() - is a simple sanity check method that prints "Hello World"
to the command console.
 
autoSave() - automatically saves the games progress using the current
loaded save or saves into the next available save slot if a new game has
been started.

loadSave() - loads the last used save slot. Best used when using the
HimeWorks custom GameOver events plugin, and calling the method on the
gameover map.

autoLoadSave() - automatically loads the last used save file without prompts

killSaves() - deletes all save files for the game when called and
the predeterminied kill switch is on. backup, config, and global save
files are also deleted.

killCurrentSave() - automatically delete the current save file when called
and the predetermined kill switch is on. Will also delete the config and
global save files if the deleted save file was the only save file available

itemTrade() - checks to see if the active party has the items and the
required quantities to receive a multiple of a set of items and their
specific quantities. This method requires to pass 2 2D arrays;
itemsToTrade, and itemsToGet. Each array needs to be in the form of:
	[[itemId,quantity], [itemId,quantity],....]
,... is to show that pattern repea Use the example above as a
reference when using this method. The multiple of the amount will
determine how many of the multiple quantities of the required items are
lost.

petrificationCheck() - checks the entire party and applies the battle
graphic to the actor based on the petrification condition.

Requirements:
	default SV Actor sprite sheet to named as: actorName Normal
	petrification Battle Sprite to be names as: actorName Stone
	For enemies

randomToggleSwitch() - randomly toggle a generic switch

getPlayerPos() - store the players' x and y position in designated
variables

checkPlayerPos() - compare the players' current position to the stored
coordinates

===== Plugin Paramter Descriptions =====

TradeNPCSwitch - a boolean value that's set by the item trade method to
indicate a successful or unsuccessful trade. This is to be used by the
game dev to use a reference to set responses based on the result of the
exchange.

DeathStates - a set of state IDs that will be set as death states
Example 1 - 5
Example 2 - 5,6,7
Example 3 - 5, 6 ,7

-------------------------------------------------------------------------

@param TradeNPCSwitch
@desc The switch where the npc responce is stored. Default is Switch 1.
@default 1

@param DeathStates
@desc A set of State IDs that will be considered as death states
@default 1

@param PetrificationStateID
@desc The state ID of the Petrification State
@default 1

@param GenericSwitchID
@desc ID of the generic switch used to randomly turn off or on
@default 2

@param PlayerXPosVar
@desc Variable to store the player's X position with getPlayerPos() function
@default 1

@param PlayerYPosVar
@desc Variable to store the player's Y position with getPlayerPos() function
@default 2

@param killSaveSwitchID
@desc Switch that will be used when conditions for deleting all save data
is met.
@default 3
*/

/**
* Sanity Check
**/
function helloWorld(){
	console.log("Hello World");
}

/**
* Sanity check to see if the Plugin Params can be retrieved
**/
function getPluginParam(){
	var params = PluginManager.parameters('Thasuki_Scripts');
	
	var tradeNPCSwitch = Number(params['TradeNPCSwitch'] || 1);
	var deathStates = Number(params['DeathStates'] || 1);
	var petrificationStateID = Number(params['PetrificationStateID'] || 1);
	var genericSwitchID = Number(params['GenericSwitchID'] || 1);
	var playerXPosVar = String(params['PlayerXPosVar'] || 1);
	var playerYPosVar = Number(params['PlayerYPosVar'] || 1);
	var killSaveSwitchID = String(params['killSaveSwitchID'] || 1);
	var killSaveMessageID = String(params['killSaveMessageID'] || 1);
	
	console.log(tradeNPCSwitch);
	console.log(deathStates);
	console.log(petrificationStateID);
	console.log(genericSwitchID);
	console.log(playerXPosVar);
	console.log(playerYPosVar);
	console.log(killSaveSwitchID);
	console.log(killSaveMessageID);
	
}

/**
* Auto saves the game in new slot if started new file, or overwrites the current loaded one
**/
function autoSave(){
	if (DataManager.lastAccessedSavefileId() !== 0){
		$gameSystem.onBeforeSave();
		DataManager.saveGame(DataManager.lastAccessedSavefileId());
	}
}

/**
* Automatically load the last used save file
**/
function autoLoadSave(){
	if($gameSystem._saveCount >= 1){
		DataManager.loadGameWithoutRescue(DataManager.lastAccessedSavefileId());
		$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
		$gamePlayer.setTransparent(0);
	}
}

/**
* Prompts to load the last save file loaded
* To be used upon custom gameover screen
**/
function loadSave(){
	$gamePlayer.setTransparent(1);
	
	if($gameSystem._saveCount >= 1){
		$gameMessage.clear();
		$gameMessage.add("Load last save?");
		$gameMap._interpreter.setWaitMode('message');
		$gameMessage.setChoices(["Yes","No"],0, 1);
		$gameMessage.setChoiceCallback(function(selection) {
			if(selection == 0){
				DataManager.loadGameWithoutRescue(DataManager.lastAccessedSavefileId());
				$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
				$gamePlayer.setTransparent(0);
			}else{
				SceneManager.push(Scene_Title);
			}
			}
		);
	}else{
		$gameMessage.clear();
		$gameMessage.add("Back to Title or Exit?");
		$gameMap._interpreter.setWaitMode('message');
		$gameMessage.setChoices(["Title","Exit"],0, 1);
		$gameMessage.setChoiceCallback(function(selection) {
			if(selection == 0){
				SceneManager.push(Scene_Title);
			}else{
				close();
			}
			}
		);
	}
}

/**
* Delete all save data for the game with a predetermined switch
*
* Checks for the max number of save files and checks to see if
* a save file exists for the slot as well for a backup before
* deletion
*
* Delete the global save data store and config files
* 
* Display a messsage to the player and return to title screen
**/
function killSaves(){
	var params = PluginManager.parameters('Thasuki_Scripts');
	var switchID = Number(params['killSaveSwitchID'] || 3);
	var fs = require('fs');
	
	//Loop through save files and delete them and their backups
	if ($gameSwitches.value(switchID) === true){
		for(i = 1; i <= DataManager.maxSavefiles(); i++){
			if(StorageManager.exists(i)){
				StorageManager.remove(i);
			}
			if(StorageManager.backupExists(i)){
				StorageManager.cleanBackup(i);
			}
		}
	
		//Delete the global.rpgsave file
		require('fs').unlink(StorageManager.localFileDirectoryPath() + 'global.rpgsave\\', (err) => {
			if (err) {
				//console.log("failed to delete local image:"+err);
			} else {
				//console.log('successfully deleted local image');                                
			}
		});
		
		//Delete the config.rpgsave file
		require('fs').unlink(StorageManager.localFileDirectoryPath() + 'config.rpgsave\\', (err) => {
			if (err) {
				//console.log("failed to delete local image:"+err);
			} else {
				//console.log('successfully deleted local image');                                
			}
		});
		
		SceneManager.push(Scene_Title);
	}
}

/**
* Delete the current save file on command
* 
* Needs to have the kill save switch active to execute
* 
* Will delete the config and global save files if there
* are no other save files available
**/
function killCurrentSave(){
	var params = PluginManager.parameters('Thasuki_Scripts');
	var switchID = Number(params['killSaveSwitchID'] || 3);
	var fs = require('fs');
	var fileID = DataManager.lastAccessedSavefileId();
	
	if ($gameSwitches.value(switchID) === true){
		if(StorageManager.exists(fileID)){
			StorageManager.remove(fileID);
		}
		if(StorageManager.backupExists(fileID)){
			StorageManager.cleanBackup(fileID);
		}
		
		//Delete the config and global save files if there was only 1 single save
		if(!checkSaves()){
			for(i = 1; i <= DataManager.maxSavefiles(); i++){
				if(StorageManager.backupExists(i)){
					StorageManager.cleanBackup(i);
				}
			}
			//Delete the global.rpgsave file
			require('fs').unlink(StorageManager.localFileDirectoryPath() + 'global.rpgsave\\', (err) => {
				if (err) {
					//console.log("failed to delete local image:"+err);
				} else {
					//console.log('successfully deleted local image');                                
				}
			});
			
			//Delete the config.rpgsave file
			require('fs').unlink(StorageManager.localFileDirectoryPath() + 'config.rpgsave\\', (err) => {
				if (err) {
					//console.log("failed to delete local image:"+err);
				} else {
					//console.log('successfully deleted local image');                                
				}
			});
		}
		
		SceneManager.push(Scene_Title);
	}
}

function checkSaves(){
	var value = false;
	for(i = 1; i <= DataManager.maxSavefiles(); i++){
		if(StorageManager.exists(i)){
			value = true;
			break;
		}
	}
	return value;
}

/**
*
* Works with and without HimeWorks Party Manager plugin
*
* itemsToTrade is a 2D array of itemIds and required counts
* example: [[itemId1, reqCount], [itemId2, reqCount]]
*
* itemsToGet is the same as itemsToTrade
*
* amount is the amount desired to want to receive from the trade
**/
function itemTrade(itemsToTrade, itemsToGet, amount){
	/*
	* Fun notes! :3
	* _gold returns amount of gold in the active party
	* _items() returns the array of items
	* _items()[itemIndex] returns the item object
	* _items()[itemIndex].id returns the Id of the item
	* _lastItem returns the id of the last item used
	* _actors returns the array of actors
	*/
	
	var params = PluginManager.parameters('Thasuki_Scripts');
	var tradeNPCSwitch = Number(params['TradeNPCSwitch'] || 1);
	var activeParty;
	//var regExp = /\d+/ig;
	
	if(Imported.TH_PartyManager){
		activeParty = $gameParties._parties[$gameParties._activeId];
	} else{
		activeParty = $gameParty;
	}
	
	$gameSwitches.setValue(tradeNPCSwitch, 0);
	
	if(amount == 0){
		if(this.hasAllRequiredItems(activeParty, itemsToTrade)){
			if(this.tradeAllItems(activeParty, itemsToTrade, itemsToGet)){
				$gameSwitches.setValue(tradeNPCSwitch, 1);
			}
		}
	}else{
		if(this.hasAllRequiredItems(activeParty, itemsToTrade)){
			if(this.hasAmountRequested(activeParty, itemsToTrade, amount)){
				if(this.tradeAmountedItems(activeParty, itemsToTrade, itemsToGet, amount)){
					$gameSwitches.setValue(tradeNPCSwitch, 1);
				}
			}
		}
	}
}

function hasAllRequiredItems(activeParty, itemsToTrade){
	var result = true;
	for(i = 0; i < itemsToTrade.length; i++){
		if(activeParty.numItems($dataItems[itemsToTrade[i][0]]) < $dataItems[itemsToTrade[i][1]]){
			result = false;
			break;
		}
	}
	return result;
}

function hasAmountRequested(activeParty, itemsToTrade, amount){
	var result = true;
	for(i = 0; i < itemsToTrade.length; i++){
		if(activeParty.numItems($dataItems[itemsToTrade[i][0]]) < itemsToTrade[i][1] * amount){
			result = false;
			break;
		}
	}
	return result;
}

function tradeAllItems(activeParty, itemsToTrade, itemsToGet){
	//$gameParty.gainItem($dataItems[itemId], amount);
	//$gameParty.loseItem($dataItems[itemId], amount);
	
	//Get num items to give
	var numItemsToGet = parseInt(activeParty.numItems($dataItems[itemsToTrade[0][0]]) / itemsToTrade[0][1]);
	if(itemsToTrade.length > 1){
		for(i = 1; i < itemsToTrade.length; i++){
			if(numItemsToGet > parseInt(activeParty.numItems($dataItems[itemsToTrade[i][0]]) / itemsToTrade[i][1])){
				numItemsToGet = parseInt(activeParty.numItems($dataItems[itemsToTrade[i][0]]) / itemsToTrade[i][1]);
			}
		}
	}
	
	if (numItemsToGet > 0){
		//Give items
		for(i = 0; i < itemsToGet.length; i++){
			activeParty.gainItem($dataItems[itemsToGet[i][0]], itemsToGet[i][1] * numItemsToGet);
		}
		
		//Take away items
		for(i = 0; i < itemsToTrade.length; i++){
			activeParty.loseItem($dataItems[itemsToTrade[i][0]], itemsToTrade[i][1] * numItemsToGet);
		}
		
		return true;
	}else{
		return false;
	}
}

function tradeAmountedItems(activeParty, itemsToTrade, itemsToGet, amount){
	if(amount > 0){
		//Give items
		for(i = 0; i < itemsToGet.length; i++){
			activeParty.gainItem($dataItems[itemsToGet[i][0]], (itemsToGet[i][1] * amount));
		}
		
		//Take away items
		for(i = 0; i < itemsToTrade.length; i++){
			activeParty.loseItem($dataItems[itemsToTrade[i][0]], (itemsToTrade[i][1] * amount));
		}
		
		return true;
	}else{
		return false;
	}
}

/**
* Checks to see who's affected by the state and applies the graphic
* Checks to see if the battle hits a win or lose condition if in battle
* Actor battle sprites need to have the name format: actorName Battler
* Petrified Actor battle sprites need to have the name format: actorName Stone
**/
function petrificationCheck(){
	var params = PluginManager.parameters('Thasuki_Scripts');
	var petrificationId = Number(params['PetrificationStateID'] || 1);
	var activeParty;
	
	if(Imported.TH_PartyManager){
		activeParty = $gameParties._parties[$gameParties._activeId];
	} else{
		activeParty = $gameParty
	}
	
	//Change state affected actors Actor Image: [SV] Battler by ._battlerName
	for(i = 0; i < activeParty.members().length; i++){
		if(activeParty.members()[i]._states.contains(petrificationId)){
			activeParty.members()[i]._battlerName = activeParty.members()[i].name().concat(" Stone");
		}
		else{
			activeParty.members()[i]._battlerName = activeParty.members()[i].name().concat(" Battler");
		}
	}
	
	//In Battle	for enemies
	if(activeParty._inBattle && Imported.SideviewActorEnemies){
		for(i = 0; i < $gameTroop.members().length; i++){
			if($gameTroop.members()[i]._states.contains(petrificationId) && $gameTroop.members()[i]._svActorName != ""){
				$gameTroop.members()[i]._svActorName = $gameTroop.members()[i]._svActorName.replace("Battler","Stone");
			}
			else{
				$gameTroop.members()[i]._svActorName = $gameTroop.members()[i]._svActorName.replace("Stone","Battler");
			}
		}
	}
}

/**
* Randomly generates a true false value to enable or disable a generic switch
**/
function randomToggleSwitch(){
	var params = PluginManager.parameters('Thasuki_Scripts');
	var switchID = Number(params['GenericSwitchID'] || 2);
	var value;
	
	if((Math.floor((Math.random() * 1000) + 1) % 2) == 1){
		value = true;
	}
	else{
		value = false;
	}
	
	$gameSwitches.setValue(switchID, value);
}

/**
* Store the players x and y positions in game variables
**/
function getPlayerPos(){
	var params = PluginManager.parameters('Thasuki_Scripts');
	var xPos = Number(params['PlayerXPosVar'] || 1);
	var yPos = Number(params['PlayerYPosVar'] || 2);
	
	$gameVariables.setValue(xPos, $gamePlayer.x);
	$gameVariables.setValue(yPos, $gamePlayer.y);
}

/**
* Check to see if the player position is the same as the stored position
**/
function checkPlayerPos(){
	var params = PluginManager.parameters('Thasuki_Scripts');
	var xPos = Number(params['PlayerXPosVar'] || 1);
	var yPos = Number(params['PlayerYPosVar'] || 2);
	
	if($gamePlayer.x == $gameVariables.value(xPos) &&
		$gamePlayer.y == $gameVariables.value(yPos)){
			return true;
	}
	else{
			return false;
	}
}