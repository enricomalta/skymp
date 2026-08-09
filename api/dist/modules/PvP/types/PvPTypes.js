"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KillType = exports.PlayerRelation = exports.PlayerNameColor = void 0;
var PlayerNameColor;
(function (PlayerNameColor) {
    PlayerNameColor["WHITE"] = "white";
    PlayerNameColor["PURPLE"] = "purple";
    PlayerNameColor["RED"] = "red";
})(PlayerNameColor || (exports.PlayerNameColor = PlayerNameColor = {}));
var PlayerRelation;
(function (PlayerRelation) {
    PlayerRelation["NEUTRAL"] = "neutral";
    PlayerRelation["PVP"] = "pvp";
    PlayerRelation["WAR_ENEMY"] = "war_enemy";
    PlayerRelation["CRIMINAL"] = "criminal";
})(PlayerRelation || (exports.PlayerRelation = PlayerRelation = {}));
var KillType;
(function (KillType) {
    KillType["PVP"] = "pvp";
    KillType["PK"] = "pk";
    KillType["WAR"] = "war";
})(KillType || (exports.KillType = KillType = {}));
