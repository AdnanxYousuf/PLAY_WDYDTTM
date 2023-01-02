//=============================================================================
// sound sepher Engine - Battle Speed Up
// SSEP_BattleSpeedUp.js
// Version: 1.51
//=============================================================================

var Imported = Imported || {};
Imported.SSEP_BattleSpeedUp = true;

var Sepher = Sepher || {};

//=============================================================================
/*:
 * @plugindesc [ver1.51] 謌ｦ髣倬溷ｺｦ繧剃ｸ翫￡繧九�繝ｩ繧ｰ繧､繝ｳ縺ｧ縺吶�YanflyEngine蟇ｾ蠢懊�
 * 蛻ｩ逕ｨ譎ゅ�縲∝ｿ�★YanflyEngine縺ｮ蠕後↓隱ｭ縺ｿ霎ｼ繧薙〒縺上□縺輔＞縲�
 * @author Shoichiro Sakamoto(sound sepher)
 *
 * @help
 * ------------------------------------------------------------------------------
 * 笆�sound sepher Engine - "Battle Speed UP" Plugin (Ver1.51 '15 11/07)
 * ------------------------------------------------------------------------------
 * 蛻ｶ菴懶ｼ壼揩譛ｬ譏御ｸ驛� / Shoichiro Sakamoto (sound sepher)
 * Web �喇ttp://sepher.jp/
 * 
 * ------------------------------------------------------------------------------
 * 笆�蜀�ｮｹ隱ｬ譏�
 * ------------------------------------------------------------------------------
 * 縺薙�繝励Λ繧ｰ繧､繝ｳ縺ｯ謌ｦ髣倬溷ｺｦ繧剃ｸ翫￡繧九�繝ｩ繧ｰ繧､繝ｳ縺ｧ縺吶�
 * 繝輔Ο繝ｳ繝医ン繝･繝ｼ繝ｻ繧ｵ繧､繝峨ン繝･繝ｼ荳｡譁ｹ縺ｫ蟇ｾ蠢懊＠縺ｦ縺�∪縺吶�
 * 
 * 縺ｾ縺溘〆anflyEngine縺ｮBattleCore縲√い繧ｯ繧ｷ繝ｧ繝ｳ繧ｷ繝ｼ繧ｱ繝ｳ繧ｹ繝代ャ繧ｯ(X_ActSeqPack1遲�)縲�
 * YEP Active Time Battle縲〃ictoryAftermath縲・llye's Active Time Battle 縺ｫ蟇ｾ蠢懊�
 * 
 * ------------------------------------------------------------------------------
 * 笆�菴ｿ縺�婿
 * ------------------------------------------------------------------------------
 * OK繝懊ち繝ｳ繧呈款縺励▲縺ｱ縺ｪ縺励↓縺吶ｋ縺ｨ謌ｦ髣倥′譌ｩ騾√ｊ繝｢繝ｼ繝峨↓縺ｪ繧翫∪縺吶�
 * 
 * 謌ｦ髣倬溷ｺｦ縺ｮ險ｭ螳壹ｒ邏ｰ縺九￥隱ｿ謨ｴ縺吶ｋ縺薙→縺後〒縺阪∪縺吶�
 * 險ｭ螳夐��岼縺ｮ諢丞袖縺後ｏ縺九ｉ縺ｪ縺��ｴ蜷医�縲√ョ繝輔か繝ｫ繝育憾諷九〒縺贋ｽｿ縺�￥縺�縺輔＞縲�
 * 騾壼ｸｸ縺ｧ縺ｯGeneral Setting縺ｮ蛟､繧貞､峨∴繧九□縺代〒繧ょ�蛻�〒縺励ｇ縺��
 * 
 * YanflyEngine縺ｨEllye's ATB縺ｫ蟇ｾ蠢懊＠縺ｦ縺�∪縺吶′縲√�繝ｩ繧ｰ繧､繝ｳ繝槭ロ繝ｼ繧ｸ繝｣縺ｧ縺薙ｌ繧峨�
 * 繝励Λ繧ｰ繧､繝ｳ縺ｮ蠕後↓縺薙�繝励Λ繧ｰ繧､繝ｳ繧堤ｽｮ縺九↑縺�→豁｣遒ｺ縺ｫ螳溯｡後＆繧後∪縺帙ｓ縲�
 * 縺ｾ縺溘・llye's ATB繧剃ｽｿ縺��ｴ蜷医�108陦後ａ"(function() {"縺ｨ550陦後ａ"})();"繧貞炎髯､縺励※縲�
 * 髢｢謨ｰ繧ｹ繧ｳ繝ｼ繝励ｒ髢区叛縺励※縺上□縺輔＞縲�
 * 
 * ------------------------------------------------------------------------------
 * 笆�豕ｨ諢丈ｺ矩��
 * ------------------------------------------------------------------------------
 * 繝ｻ蛻ｩ逕ｨ譎ゅ�遶ｶ蜷医ｒ驕ｿ縺代ｋ縺溘ａ縲∝ｿ�★YanflyEngine縺ｮ蠕後↓隱ｭ縺ｿ霎ｼ繧薙〒縺上□縺輔＞縲�
 * 繝ｻ繧ｵ繝昴�繝医�陦後＞縺ｾ縺帙ｓ縺ｮ縺ｧ縲∬�蟾ｱ雋ｬ莉ｻ縺ｧ縺泌茜逕ｨ縺上□縺輔＞縲�
 * 繝ｻ縺ｧ縺阪ｌ縺ｰtxt繧�け繝ｬ繧ｸ繝�ヨ縺ｫ縲∝燕霑ｰ縺ｮ闡嶺ｽ懈ｨｩ陦ｨ險倥ｒ謗ｲ霈峨＠縺ｦ鬆ゅ￠縺溘ｉ螫峨＠縺�〒縺吶�
 * 
 * ------------------------------------------------------------------------------
 * 笆�繝代Λ繝｡繝ｼ繧ｿ縺ｮ隱ｬ譏�
 * ------------------------------------------------------------------------------
 * 繝ｻBattleSpeed (Default)�唹K繝懊ち繝ｳ繧呈款縺励※縺�↑縺�→縺阪�謌ｦ髣倬溷ｺｦ縺ｮ蛟肴焚縺ｧ縺吶�
 * 繝ｻBattleSpeed (Boost)縲�唹K繝懊ち繝ｳ繧呈款縺励※縺ゅｋ縺ｨ縺阪�謌ｦ髣倬溷ｺｦ縺ｮ蛟肴焚縺ｧ縺吶�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲4蛟埼滉ｻ･荳翫�蜉ｹ譫懊′縺ゅｊ縺ｾ縺帙ｓ縲�
 * ------------------------------------------------------------------------------
 * 繝ｻStateIcon縲縲縲縲縲縲�壽雰縺ｮ繧ｹ繝��繝医い繧､繧ｳ繝ｳ陦ｨ遉ｺ騾溷ｺｦ繧定ｪｿ遽縺励∪縺吶�
 * 繝ｻStateOverLay縲縲縲縲 �壼袖譁ｹ縺ｮ繧ｹ繝��繝医い繝九Γ縺ｮ繧｢繝九Γ騾溷ｺｦ繧定ｪｿ遽縺励∪縺吶�
 * 繝ｻWeapon縲縲縲縲縲縲縲 �壹し繧､繝峨ン繝･繝ｼ縺ｧ蜻ｳ譁ｹ縺梧ｭｦ蝎ｨ繧呈険繧矩溷ｺｦ縺ｧ縺吶�
 * 繝ｻMotion縲縲縲縲縲縲縲 �壼袖譁ｹ縺ｨ謨ｵ縺ｮ繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ騾溷ｺｦ縺ｧ縺吶�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲蠕�ｩ溘い繝九Γ繝ｻ遘ｻ蜍輔い繝九Γ遲峨�騾溷ｺｦ縺ｫ蠖ｱ髻ｿ縺励∪縺吶�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲縺ｾ縺溘仝eapon縺ｨMotion縺ｯ蜷梧悄縺励※縺�∪縺吶�縺ｧ縲�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲蛟､縺ｯ蜷後§縺ｫ縺励◆縺ｻ縺�′辟｡髮｣縺ｧ縺吶�
 * 繝ｻBalloon縲縲縲縲縲縲縲�壼聖縺榊�縺励�陦ｨ遉ｺ騾溷ｺｦ縺ｧ縺吶�
 * 繝ｻDamage縲縲縲縲縲縲縲 �壹ム繝｡繝ｼ繧ｸ謨ｰ蛟､縺ｮ謖∫ｶ壹ヵ繝ｬ繝ｼ繝�謨ｰ縺ｧ縺吶�
 * 繝ｻDamageMin縲縲縲縲縲縲�壹ム繝｡繝ｼ繧ｸ謨ｰ蛟､縺ｮ謖∫ｶ壹ヵ繝ｬ繝ｼ繝�謨ｰ縺ｮ譛菴主､縺ｧ縺吶�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲Damage繧呈掠縺剰ｨｭ螳壹☆繧九→隕九▼繧峨＞縺ｮ縺ｧ縲�亟豁｢謗ｪ鄂ｮ縺ｧ縺吶�
 * ------------------------------------------------------------------------------
 * 繝ｻLogAnime BaseDelay縲 �壹ヰ繝医Ν繝ｭ繧ｰ繧ｦ繧｣繝ｳ繝峨え縺ｮ陦ｨ遉ｺ繝輔Ξ繝ｼ繝�謨ｰ縺ｧ縺吶�
 * 繝ｻLogAnime NextDelay縲 �壹ヰ繝医Ν繝ｭ繧ｰ繧ｦ繧｣繝ｳ繝峨え縺ｮ謖∫ｶ壹ヵ繝ｬ繝ｼ繝�謨ｰ縺ｧ縺吶�
 * 繝ｻLogWaitCount Default �壹ヰ繝医Ν繝ｭ繧ｰ繧ｦ繧｣繝ｳ繝峨え陦ｨ遉ｺ荳ｭ縺ｮ蠕�ｩ溘ヵ繝ｬ繝ｼ繝�謨ｰ繧�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲謖�ｮ壼肴焚蛻�∵掠縺上＠縺ｾ縺吶�
 * 繝ｻLogWaitCount Boost縲 �壹ヰ繝医Ν繝ｭ繧ｰ繧ｦ繧｣繝ｳ繝峨え陦ｨ遉ｺ荳ｭ縺ｮ蠕�ｩ溘ヵ繝ｬ繝ｼ繝�謨ｰ繧�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲謖�ｮ壼肴焚蛻�∵掠縺上＠縺ｾ縺吶�(繝悶�繧ｹ繝育憾諷区凾)
 * 縲縲縲縲縲縲縲縲縲縲縲 縲縺ｪ縺翫∝ｾ�ｩ溘ヵ繝ｬ繝ｼ繝�縺ｯOK繝懊ち繝ｳ繧呈款縺励▲縺ｱ縺ｪ縺励↓縺吶ｋ縺ｨ縲�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲譖ｴ縺ｫ譌ｩ縺上☆繧九％縺ｨ縺後〒縺阪∪縺吶�
 * ------------------------------------------------------------------------------
 * 笘�ｻ･荳九�YanflyEngine - BattleCore逕ｨ霑ｽ蜉�繧ｪ繝励す繝ｧ繝ｳ
 * 
 * 繝ｻYEP Battle MotionWait�壼､縺悟ｰ上＆縺�⊇縺ｩ謾ｻ謦�ｼ泌�縺ｮ繧ｦ繧ｧ繧､繝医′譌ｩ縺上↑繧翫∪縺吶�
 * ------------------------------------------------------------------------------
 * 笘�ｻ･荳九�YanflyEngine - Active Time Battle逕ｨ霑ｽ蜉�繧ｪ繝励す繝ｧ繝ｳ
 * 
 * 繝ｻYEP ATB BoostSwitch縲�唳EP ATB繧貞ｰ主�譎ゅ√ヶ繝ｼ繧ｹ繝医☆繧九°縺ｩ縺�°謖�ｮ壹＠縺ｾ縺吶�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲(true:縺吶ｋ / false:縺励↑縺�)
 * ------------------------------------------------------------------------------
 * 笘�ｻ･荳九�Ellye & Yanfly ATB逕ｨ霑ｽ蜉�繧ｪ繝励す繝ｧ繝ｳ(荳｡蟇ｾ蠢�)
 * 
 * 繝ｻATB Speed(Default)縲 �夐壼ｸｸ譎ゅ�AT繧ｲ繝ｼ繧ｸ縺ｮ繧ｹ繝斐�繝峨ｒ蛟肴焚縺ｧ謖�ｮ壹＠縺ｾ縺吶�
 * 繝ｻATB Speed(Boost)縲縲 �壹ヶ繝ｼ繧ｹ繝域凾縺ｮAT繧ｲ繝ｼ繧ｸ縺ｮ繧ｹ繝斐�繝峨ｒ蛟肴焚縺ｧ謖�ｮ壹＠縺ｾ縺吶�
 * ------------------------------------------------------------------------------
 * 笘�ｻ･荳九�YanflyEngine - VictoryAftermath逕ｨ霑ｽ蜉�繧ｪ繝励す繝ｧ繝ｳ
 * 
 * 繝ｻYEP Victory Motion縲 �壼享蛻ｩ譎ゅ↓繝悶�繧ｹ繝育憾諷九�蝣ｴ蜷医√え繧ｧ繧､繝医ｒ遏ｭ邵ｮ縺励∪縺吶�
 * 縲縲縲縲縲縲縲縲縲縲縲 縲(true:遏ｭ邵ｮ縺吶ｋ / false:遏ｭ邵ｮ縺励↑縺�)
 * ------------------------------------------------------------------------------
 *
 * @param ---General Setting---
 * @default
 * @param BattleSpeed (Default)
 * @desc 繝�ヵ繧ｩ繝ｫ繝医�繧｢繝九Γ繧ｹ繝斐�繝峨〒縺吶ょ�譛溷､縺ｯ1縲�
 * 豁ｦ蝎ｨ謾ｻ謦�ｻ･螟悶�繧｢繝九Γ騾溷ｺｦ繧呈欠螳壹�蛟肴焚蛻�∵掠縺上＠縺ｾ縺吶�
 * @default 1
 * @param BattleSpeed (Boost)
 * @desc 豎ｺ螳�(OK)繧ｭ繝ｼ蜈･蜉帶凾縺ｮ繧｢繝九Γ繧ｹ繝斐�繝峨〒縺吶ょ�譛溷､縺ｯ2縲�
 * 豁ｦ蝎ｨ謾ｻ謦�ｻ･螟悶�繧｢繝九Γ騾溷ｺｦ繧呈欠螳壹�蛟肴焚蛻�∵掠縺上＠縺ｾ縺吶�
 * @default 2
 * @param ---Detail Setting---
 * @default
 * @param StateIcon
 * @desc 繧ｹ繝��繝医い繧､繧ｳ繝ｳ縺ｮ繧｢繝九Γ繧ｹ繝斐�繝峨ｒ謖�ｮ壹＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ40縲�
 * @default 40
 * @param StateOverlay
 * @desc 繧ｹ繝��繝医が繝ｼ繝舌�繝ｬ繧､縺ｮ繧｢繝九Γ繧ｹ繝斐�繝峨ｒ謖�ｮ壹＠縺ｾ縺�
 * 蛻晄悄蛟､縺ｯ8縲�
 * @default 8
 * @param Weapon
 * @desc 繧ｵ繧､繝峨ン繝･繝ｼ譎ゅ�豁ｦ蝎ｨ謾ｻ謦��繧｢繝九Γ繧ｹ繝斐�繝峨ｒ謖�ｮ壹＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ12縲�Motion縺ｨ蜷梧悄縺励※繧九�縺ｧ蜷後§蛟､縺後♀縺吶☆繧√�
 * @default 12
 * @param Motion
 * @desc 陦悟虚繝｢繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ繧｢繝九Γ繧ｹ繝斐�繝峨ｒ謖�ｮ壹＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ12縲８eapon縺ｨ蜷梧悄縺励※繧九�縺ｧ蜷後§蛟､縺後♀縺吶☆繧√�
 * @default 12
 * @param Balloon
 * @desc 繝舌Ν繝ｼ繝ｳ縺ｮ繧｢繝九Γ繧ｹ繝斐�繝峨ｒ謖�ｮ壹＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ12縲�
 * @default 12
 * @param Damage
 * @desc 繝繝｡繝ｼ繧ｸ繝昴ャ繝励い繝��縺ｮ謖∫ｶ壹ヵ繝ｬ繝ｼ繝�謨ｰ繧呈欠螳壹＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ90縲よ掠驕弱℃繧九→逶ｮ隕悶〒縺阪↑縺上↑繧九�縺ｧ隕∵ｳｨ諢上�
 * @default 90
 * @param DamageMin
 * @desc 繝繝｡繝ｼ繧ｸ繝昴ャ繝励い繝��縺ｮ謖∫ｶ壹ヵ繝ｬ繝ｼ繝�謨ｰ縺ｮ譛菴主､繧呈欠螳壹＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ60縲ゅ％縺ｮ縺ｾ縺ｾ縺ｫ縺励※縺翫￥縺薙→繧偵が繧ｹ繧ｹ繝｡縺励∪縺吶�
 * @default 60
 * @param --BattleLog Setting--
 * @default
 * @param LogAnime BaseDelay
 * @desc 繝舌ヨ繝ｫ繝ｭ繧ｰ繧ｦ繧｣繝ｳ繝峨え縺ｮ陦ｨ遉ｺ繝輔Ξ繝ｼ繝�謨ｰ繧呈欠螳壹＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ8縲�BattleSpeed (Default)縺ｮ蠖ｱ髻ｿ繧貞女縺代∪縺帙ｓ縲�
 * @default 8
 * @param LogAnime NextDelay
 * @desc 繝舌ヨ繝ｫ繝ｭ繧ｰ繧ｦ繧｣繝ｳ繝峨え縺ｮ謖∫ｶ壹ヵ繝ｬ繝ｼ繝�謨ｰ繧呈欠螳壹＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ12縲�BattleSpeed (Default)縺ｮ蠖ｱ髻ｿ繧貞女縺代∪縺帙ｓ縲�
 * @default 12
 * @param LogWaitCount Default
 * @desc 繝舌ヨ繝ｫ繝ｭ繧ｰ陦ｨ遉ｺ荳ｭ縺ｮ蠕�ｩ溘ヵ繝ｬ繝ｼ繝�繧呈欠螳壼肴焚蛻�∵掠縺上＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ1縲ょ､繧貞｢励ｄ縺吶→繝舌ヨ繝ｫ繝ｭ繧ｰ縺ｮ騾溷ｺｦ縺後い繝��縺励∪縺吶�
 * @default 1
 * @param LogWaitCount Boost
 * @desc 繝舌ヨ繝ｫ繝ｭ繧ｰ繝悶�繧ｹ繝井ｸｭ縺ｮ蠕�ｩ溘ヵ繝ｬ繝ｼ繝�繧呈欠螳壼肴焚蛻�∵掠縺上＠縺ｾ縺吶�
 * 蛻晄悄蛟､縺ｯ20縲ょ､繧貞｢励ｄ縺吶→繝舌ヨ繝ｫ繝ｭ繧ｰ縺ｮ騾溷ｺｦ縺後い繝��縺励∪縺吶�
 * @default 2
 * @param ---YEP BattleCore---
 * @default
 * @param YEP Battle MotionWait
 * @desc YEP BattleCore繧貞ｰ主�縺励※縺�◆蝣ｴ蜷医�縺ｿ險ｭ螳壼庄閭ｽ縺ｧ縺吶�
 * 蛻晄悄蛟､縺ｯ20縲ょ､繧呈ｸ帙ｉ縺吶→謾ｻ謦�ｼ泌�縺ｮ繧ｦ繧ｧ繧､繝医′譌ｩ縺上↑繧翫∪縺吶�
 * @default 20
 * @param ---YEP ATB---
 * @default
 * @param YEP ATB BoostSwitch
 * @desc YEP ATB繧貞ｰ主�縺励※縺�◆蝣ｴ蜷医�縺ｿ險ｭ螳壼庄閭ｽ縺ｧ縺吶�
 * 蛻晄悄蛟､縺ｯtrue縲Ｕrue縺ｫ縺吶ｋ縺ｨ繝悶�繧ｹ繝域凾縺ｫATB繧る溷ｺｦ繧剃ｸ翫￡縺ｾ縺吶�
 * @default true
 * @param ---ATB Speed---
 * @default
 * @param ATB Speed(Default)
 * @desc Ellye繧ゅ＠縺上�YEP ATB繧貞ｰ主�縺励※縺�◆蝣ｴ蜷医�縺ｿ險ｭ螳壼庄閭ｽ縺ｧ縺吶�
 * 蛻晄悄蛟､縺ｯ1縲ゅョ繝輔か繝ｫ繝医�AT繧ｲ繝ｼ繧ｸ縺ｮ繧ｹ繝斐�繝峨ｒ蛟肴焚縺ｧ謖�ｮ壹＠縺ｾ縺吶�
 * @default 1
 * @param ATB Speed(Boost)
 * @desc Ellye繧ゅ＠縺上�YEP ATB繧貞ｰ主�縺励※縺�◆蝣ｴ蜷医�縺ｿ險ｭ螳壼庄閭ｽ縺ｧ縺吶�
 * 蛻晄悄蛟､縺ｯ2縲ゅヶ繝ｼ繧ｹ繝域凾縺ｮAT繧ｲ繝ｼ繧ｸ縺ｮ繧ｹ繝斐�繝峨ｒ蛟肴焚縺ｧ謖�ｮ壹＠縺ｾ縺吶�
 * @default 2
 * @param ---YEP Victory AM---
 * @default
 * @param YEP Victory Wait
 * @desc YEP VictoryAftermath繧貞ｰ主�縺励※縺�◆蝣ｴ蜷医�縺ｿ險ｭ螳壼庄閭ｽ縺ｧ縺吶�
 * 蛻晄悄蛟､縺ｯtrue縲ゅヶ繝ｼ繧ｹ繝井ｸｭ縲∝享蛻ｩ譎ゅ�繧ｦ繧ｧ繧､繝医ｒ譌ｩ縺上＠縺ｾ縺吶�
 * @default true
 *
 */

//------------------------------------------------------------------------------
// 繧ｰ繝ｭ繝ｼ繝舌Ν螟画焚
//------------------------------------------------------------------------------

Sepher.Parameters = PluginManager.parameters('SSEP_BattleSpeedUp');
Sepher.Param = Sepher.Param || {};

Sepher.Param.BattleSpeedDefault	= Number(Sepher.Parameters['BattleSpeed (Default)']);
Sepher.Param.BattleSpeedBoost	= Number(Sepher.Parameters['BattleSpeed (Boost)']);
Sepher.Param.StateIcon			= Number(Sepher.Parameters['StateIcon']);
Sepher.Param.StateOverlay		= Number(Sepher.Parameters['StateOverlay']);
Sepher.Param.Weapon				= Number(Sepher.Parameters['Weapon']);
Sepher.Param.Balloon			= Number(Sepher.Parameters['Balloon']);
Sepher.Param.Motion				= Number(Sepher.Parameters['Motion']);
Sepher.Param.Damage				= Number(Sepher.Parameters['Damage']);
Sepher.Param.DamageMin			= Number(Sepher.Parameters['DamageMin']);
Sepher.Param.LogBase			= Number(Sepher.Parameters['LogAnime BaseDelay']);
Sepher.Param.LogNext			= Number(Sepher.Parameters['LogAnime NextDelay']);
Sepher.Param.logWaitDefault		= Number(Sepher.Parameters['LogWaitCount Default']);
Sepher.Param.logWaitBoost		= Number(Sepher.Parameters['LogWaitCount Boost']);
Sepher.Param.YEPMotionWait		= Number(Sepher.Parameters['YEP Battle MotionWait']);
Sepher.Param.YEPVictoryWait		= String(Sepher.Parameters['YEP Victory Wait']);
Sepher.Param.YEPBoostSwitch		= String(Sepher.Parameters['YEP ATB BoostSwitch']);
Sepher.Param.ATBSpeedDefault	= Number(Sepher.Parameters['ATB Speed(Default)']);
Sepher.Param.ATBSpeedBoost		= Number(Sepher.Parameters['ATB Speed(Boost)']);

// YEPVictoryWait蝙句､画鋤
if (Sepher.Param.YEPVictoryWait == 'true'){
	Sepher.Param.YEPVictoryWait = true;
}else{
	Sepher.Param.YEPVictoryWait = false;
};
// YEPBoostSwitch蝙句､画鋤
if (Sepher.Param.YEPBoostSwitch == 'true'){
	Sepher.Param.YEPBoostSwitch = true;
}else{
	Sepher.Param.YEPBoostSwitch = false;
};

//------------------------------------------------------------------------------
// QuickMode Speed Setting
//------------------------------------------------------------------------------

Sprite_StateIcon.prototype.animationWait = function() {
	var speed = Sepher.Param.StateIcon / Sepher.Param.BattleSpeedDefault;
    return speed;
};

Sprite_StateOverlay.prototype.animationWait = function() {
	var speed = Sepher.Param.StateOverlay / Sepher.Param.BattleSpeedDefault;
    return speed;
};

Sprite_Weapon.prototype.animationWait = function() {
	var speed = Sepher.Param.Weapon / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	} else {
		speed = speed / Sepher.Param.BattleSpeedDefault;
	}
   	return speed;
};

Sprite_Balloon.prototype.waitTime = function() {
	var speed = Sepher.Param.Balloon / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	} else {
		speed = speed / Sepher.Param.BattleSpeedDefault;
	}
    return speed;
};

// Alias - startMove
var _SSEP_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function(x, y, duration) {
	if (Input.isPressed('ok') || TouchInput.isPressed()){
  		duration = duration / Sepher.Param.BattleSpeedBoost;
  	} else {
  		duration = duration / Sepher.Param.BattleSpeedDefault;
	}
	_SSEP_Battler_startMove.call(this, x, y, duration);
};


Sprite_Actor.prototype.motionSpeed = function() {
	var speed = Sepher.Param.Motion;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	} else {
		speed = speed / Sepher.Param.BattleSpeedDefault;
	}
    return speed;
};

// Alias - Animation setup
var _SSEP_Animation_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	delay = delay / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		delay = delay / Sepher.Param.BattleSpeedBoost;
	} else {
		delay = delay / Sepher.Param.BattleSpeedDefault;
	}
	_SSEP_Animation_setup.call(this, target, animation, mirror, delay);
};


// Alias - Animation_setupRate
var _SSEP_Animation_setupRate = Sprite_Animation.prototype.setupRate;
Sprite_Animation.prototype.setupRate = function() {
    _SSEP_Animation_setupRate;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		this._rate = this._rate / Sepher.Param.BattleSpeedBoost;
	} else {
	    this._rate = this._rate / Sepher.Param.BattleSpeedDefault;
	}
	this._rate = (Math.round(this._rate));
	if (this._rate < 1){
		this._rate = 1;
	}
};


var _SSEP_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
	_SSEP_Damage_initialize.call(this);
    this._duration = Sepher.Param.Damage;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		this._duration = this._duration / Sepher.Param.BattleSpeedBoost;
	} else {
		this._duration = this._duration / Sepher.Param.BattleSpeedDefault;
	}
    if (this._duration <= Sepher.Param.DamageMin){
    	this._duration = Sepher.Param.DamageMin;
    }
};

// BattleLog Window

Window_BattleLog.prototype.animationBaseDelay = function() {
	var speed = Sepher.Param.LogBase;
    return speed;
};

Window_BattleLog.prototype.animationNextDelay = function() {
	var speed = Sepher.Param.LogNext;
    return speed;
};

Window_BattleLog.prototype.updateWaitCount = function() {
	var waitMax;
	var waitMin;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
   	    waitMax = 3 * Sepher.Param.logWaitBoost;
    	waitMin = 1 * Sepher.Param.logWaitBoost;
   	}else{
   	    waitMax = 3 * Sepher.Param.logWaitDefault;
    	waitMin = 1 * Sepher.Param.logWaitDefault;
	}

    if (this._waitCount > 0) {
        this._waitCount -= this.isFastForward() ? waitMax : waitMin;
        if (this._waitCount < 0) {
            this._waitCount = 0;
        }
    	return true;
    }
    return false;
};

//------------------------------------------------------------------------------
// Support - Yanfly Engine BattleCore
//------------------------------------------------------------------------------

if (Imported.YEP_BattleEngineCore){

	//Overwrite actionPerformAction
	BattleManager.actionPerformAction = function() {
		wait = Sepher.Param.YEPMotionWait;
		if (Input.isPressed('ok') || TouchInput.isPressed()){
			wait = wait / Sepher.Param.BattleSpeedBoost;
		} else {
			wait = wait / Sepher.Param.BattleSpeedDefault;
		}
				
	    this._logWindow.performAction(this._subject, this._action);
			if (this._subject.isActor() && this._subject.isSpriteVisible) {
				this._logWindow._waitCount += wait;
				return false;
			}
 	   return true;
	};

	//Overwrite actionFloat
	BattleManager.actionFloat = function(name, actionArgs) {
		var movers = this.makeActionTargets(name);
		if (movers.length < 1) return true;
		var cmd = actionArgs[0];
		var frames = actionArgs[1] || 12;

		if (Input.isPressed('ok') || TouchInput.isPressed()){
			frames = frames / Sepher.Param.BattleSpeedBoost;
		} else {
			frames = frames / Sepher.Param.BattleSpeedDefault;
		}
		
	    var pixels = 0;
	    if (cmd.match(/(\d+)([%��])/i)) {
	    	var floatPeak = parseFloat(RegExp.$1 * 0.01);
		} else if (cmd.match(/(\d+)/i)) {
			pixels = parseInt(RegExp.$1);
			var floatPeak = 0.0;
    	} else {
    		var floatPeak = 1.0;
    	}
    	movers.forEach(function(mover) {
    		var floatRate = floatPeak + (pixels / mover.spriteHeight());
    		mover.spriteFloat(floatRate, frames);
    	});
    	return false;
	};

	//Overwrite actionJump
	BattleManager.actionJump = function(name, actionArgs) {
	    var movers = this.makeActionTargets(name);
	    if (movers.length < 1) return true;
	    var cmd = actionArgs[0];
	    var frames = actionArgs[1] || 12;

		if (Input.isPressed('ok') || TouchInput.isPressed()){
			frames = frames / Sepher.Param.BattleSpeedBoost;
		} else {
			frames = frames / Sepher.Param.BattleSpeedDefault;
		}
		
	    var pixels = 0;
		if (cmd.match(/(\d+)([%��])/i)) {
			var jumpPeak = parseFloat(RegExp.$1 * 0.01);
    	} else if (cmd.match(/(\d+)/i)) {
    		pixels = parseInt(RegExp.$1);
    		var jumpPeak = 0.0;
    	} else {
    		var jumpPeak = 1.0;
    	}
    	movers.forEach(function(mover) {
    		var jumpRate = jumpPeak + (pixels / mover.spriteHeight());
    		mover.spriteJump(jumpRate, frames);
    	});
    	return true;
    };
}

//------------------------------------------------------------------------------
// Support - YanflyEngine Active Time Battle
//------------------------------------------------------------------------------

if (Imported.YEP_X_BattleSysATB){
	//Overwrite atbTickRate
	BattleManager.atbTickRate = function() {
	    var rate = 0.1 * ConfigManager.atbSpeed;
    	//Add
	    if (Sepher.Param.YEPBoostSwitch){
			if (Input.isPressed('ok') || TouchInput.isPressed()){
				rate = rate * Sepher.Param.ATBSpeedBoost;
			} else {
				rate = rate * Sepher.Param.ATBSpeedDefault;
			}
		}
    	return rate;
	};
}


//------------------------------------------------------------------------------
// Support - Yanfly Engine Victory Aftermath
//------------------------------------------------------------------------------

if (Imported.YEP_VictoryAftermath){
	//Overwrite isFinishedVictoryCheer
	BattleManager.isFinishedVictoryCheer = function() {
		if (Sepher.Param.YEPVictoryWait){
			if (Input.isPressed('ok') || TouchInput.isPressed()){
				return ++this._victoryCheerWait >= Yanfly.Param.VACheerWait / Sepher.Param.BattleSpeedBoost;
			} else {
				return ++this._victoryCheerWait >= Yanfly.Param.VACheerWait / Sepher.Param.BattleSpeedDefault;
			}
		} else {
			return ++this._victoryCheerWait >= Yanfly.Param.VACheerWait;
		}
	};
}

//------------------------------------------------------------------------------
// Support - Ellye's ATB
//------------------------------------------------------------------------------

//Check if there is Window_CTB function
if (typeof Window_CTB == "function"){
    //Changing the flow of battle
    //_BattleManager_update=BattleManager.update;
    BattleManager.update=function() {
        if(!this.isBusy()&&!this.updateEvent()) {
            switch(this._phase) {
                case 'atb':
                	//Add script
                	if (Input.isPressed('ok') || TouchInput.isPressed()){
	                	var speed = Sepher.Param.ATBSpeedBoost;
	                }else{
	                	var speed = Sepher.Param.ATBSpeedDefault;
	                }
                    this.increaseAtbGauges(speed);
                    break;
                default:
                    _BattleManager_update.call(this);
                    break;
            }
        }
    };

    //Alias - increaseAtbGauses
    var _SSEP_increaseAtbGauges = BattleManager.increaseAtbGauges;
    BattleManager.increaseAtbGauges = function(speed) {
    	//Add variable縲and Rate calculation
    	var copy_base_atb_increase = base_atb_increase;
        base_atb_increase = base_atb_increase * speed;
        //original method
        _SSEP_increaseAtbGauges.call(this);
        //return global variable
        base_atb_increase = copy_base_atb_increase;
    };
}