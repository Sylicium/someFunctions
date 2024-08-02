/**
 * @version 5.0.0 // 02/08/2024
 * @author Sylicium
 * @description Module someFunction qui réunit plein de fonction utiles
 * @github https://github.com/Sylicium/someScripts/edit/main/modules/someFunctions.js
 * @discord https://discord.gg/9qPJyvJQBP
*/
import * as node_crypto from 'node:crypto';
declare class new_Random {
    version: string;
    constructor();
    /**
     * randHex() : Retourne une chaine héxadécimale de la longueur voulue
     * @param {Number} length - Longueur de la chaine voulue
     * @param {Boolean} capitalize - Mettre la chaine en caractères majuscule
     */
    randHex(length: number, capitalize?: boolean): string;
    /**
     * randInt() : Renvoie un nombre entier aléatoire entre min (inclu) et max (exclu)
     * @param {Number} min - La nombre minimum (inclu)
     * @param {Number} max - La nombre maximum (exclu)
     * @returns {Number}
     */
    randInt(min: number, max: number): number;
    /**
     * randFloat() : Renvoie un nombre flotant aléatoire entre min (inclu) et max (exclu)
     * @param {Float} min - La nombre minimum (inclu)
     * @param {Float} max - La nombre maximum (exclu)
     * @returns {Float}
     */
    randFloat(min: number, max: number): number;
    /**
     * shuffle() : Mélange aléatoirement la liste donnée.
     * @param {Array} list - La liste a mélanger
     * @returns {Array}
     */
    shuffle(list: Array<any>): Array<any>;
    /**
     * choice() : Return random elements from the list
     * @param {Array} list - Input list
     * @param {Boolean} pickOnce - Pick indexes only once for multiple choice scenarios?
     * @param {Number} amount - The amount of choosen values you want
     * @returns {Array}
     * Example:
     > choice(["toto","kiwi","salut"], false, 2) // may return ["toto","toto"] or ["kiwi","kiwi"] etc.. in some cases
     > choice(["toto","kiwi","salut"], true, 2) // will never return ["toto","toto"] or ["kiwi","kiwi"] etc..
     Careful, this rule only apply on indexes, so
     > choice(["toto","kiwi","toto"], true, 2) // may return ["toto","toto"] but this mean that indexes 0 and 2 have been choosen.
     You can remove duplicates of a list using SF.listsTools.removeDuplicates() function in that same module before passing the list in the choice() function.
     */
    choice(list: Array<any>, pickOnce?: boolean, amount?: number): any[];
    /**
     * choiceOne() : Return random 1 element of the specified list
     * @param {Array} list - Input list
     */
    choiceOne(list: Array<any>): any;
    /**
     * randString() : Retourne une chaine aléatoire de la longueur voulue contenant des lettres minusules et majuscules ainsi que des chiffres
     * @param {Number} length - Longueur de la chaine voulue
     * @param {Boolean} charListString - La liste de caractères à utiliser pour la génération de la chaine (en string)
     */
    randString(length: number, charListString?: string | undefined): string;
}
export declare const Random: new_Random;
declare class new_listTools {
    version: string;
    constructor();
    /**
     * sum() : Retourne la somme de tous les éléments de la liste
     * @param {Array} list - La liste en entrée
     */
    sum(list: Array<number>): number;
    /**
     * any() : Retourne true si au moins 1 élément se trouve dans les 2 listes
     * @param {Array} list - La 1ere liste
     * @param {Array} list_two - La 2ere liste
     * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
     */
    any(list: Array<any>, list_two: Array<any>, caseSensitive?: boolean): boolean;
    /**
     * arrayToChunks() : Retourne une liste contenant des chunks de la liste donnée, de taille maximum specifié
     * @param {Array} list - La liste qui doit être découpée en chunks
     * @param {Number} chunkSize - La taille maximum d'un chunk
     * @returns Array
     */
    arrayToChunks(list: Array<any>, chunkSize: number): Array<Array<any>>;
    /**
    * all() : Retourne true si tous les éléments de la liste A se trouvent dans la B
    * @param {Array} from_list - La liste qui doit être contenue intégralement dans la 2eme
    * @param {Array} list_in - La liste qui doit contenir chaque élement de la 1ere
    * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
    */
    all(from_list: Array<any>, list_in: Array<any>, caseSensitive?: boolean): boolean;
    /**
     * splitAndJoin() : remplace toutes les clé du dictionnaire donné par sa valeur
     * @param {String} text - Le texte à traiter
     * @param {Object} dict - Le dictionnaire sous la forme { "replaceFrom": "replaceTo", "replaceFrom2": "replaceTo2" }
     * @description example: splitAndJoin("hi how are you i ?", {"i":"UWU","are":"dont"}) -> 'hUWU how dont you UWU ?'
    */
    splitAndJoin(text: string, dict: {
        [key: string]: string;
    }): string;
    /**
     * @description Remove duplicates from a given array
     * @param {Array} list The list to use
     * @returns {Array}
     */
    removeDuplicates(list: Array<any>): Array<any>;
}
export declare const lists: new_listTools;
/**
 * isBufferEqual() : Compare deux buffer en XOR. Résiste au time attack.
 * @param {String} a - Premier buffer
 * @param {Array} b - Deuxieme buffer
 * @returns {Boolean} - Booléen
 */
declare function isBufferEqual(a: Buffer, b: Buffer): boolean;
export { isBufferEqual };
export { anyWordInText };
/**
 * anyWordInText() : Retourne true si au moins 1 élément se trouve dans le texte
 * @param {String} text - Le texte
 * @param {Array} list - La liste
 * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
 */
declare function anyWordInText(text: string, list: Array<string>, caseSensitive?: boolean): boolean;
export { mapObject };
/**
 * @description Functions that works like a Array.map((value, index)) but for objects
 * @param {Object} obj
 * @param {Function} callback
*/
declare function mapObject(obj: object, callback: Function): object;
/**
 * @description Function to check if a specific object has exactly the same keys as another object Pattern, not more, not less
 * @param {Object} pattern The pattern object
 * @param {Object} obj The object to compare
 * @returns {Boolean} True if the object has the same keys as the pattern, false otherwise
 */
export { hasSameKeys };
declare function hasSameKeys(pattern: object, obj: object): boolean;
/**
 * @description Same function but using a list for all keys
 * @example hasSameKeysList(["name","age"], {name:"toto",age:12}) -> true
 * @example hasSameKeysList(["name"], {name:"toto",age:12}) -> false
 * @example hasSameKeysList(["name","age"], {name:"toto"}) -> false
 * @param {Array} pattern The pattern list
 * @param {Object} obj The object to compare
 * @returns {Boolean} True if the object has the same keys as the pattern, false otherwise
*/
export { hasSameKeysList };
declare function hasSameKeysList(patternList: Array<any>, obj: object): boolean;
/**
 * @class JSONBigInt()
 * @author Sylicium
 * @description Allow you to use JSON.parse() and JSON.stringify() with support for BigInts
 */
declare class new_JSONBigInt {
    constructor();
    parse(json: string): JSON;
    stringify(json: JSON): string;
    _replacer(key: any, value: any): any;
    _reviver(key: any, value: any): any;
    _forceStringify(json: JSON): string;
    _forceParse(json: string): JSON;
}
export declare const JSONBigInt: new_JSONBigInt;
export { parseMillisecondsFromTimeString };
/**
 * parseMillisecondsFromTimeString(string) : Returns an amount of milliseconds from the parsed user time string input
 * @example f("10m") -> 600000 | f("1d") -> 86400000 | f("2d 10m 50s 999ms") -> 173450999
 * @param {String} str - The text to parse
 * @returns {Number}
 */
declare function parseMillisecondsFromTimeString(str: string): number;
export { isScam };
/**
 * isScam() : Renvoie True si le texte entré est détecté comme une arnaque Version 1.1.1 | 21/06/2022
 * @param {String} text - La chaine de texte à tester
 * @author Sylicium
 * @description Used for discord bots in my own projects
 */
declare function isScam(text: string): {
    scam: boolean;
    score: number;
    info: string;
};
export { isScamLinkScore };
/**
 * isScamLinkScore() : Retourne un booléen pour savoir si ce lien est un lien d'arnaque
 * @param {String} link - Le lien a tester
 * @deprecated Not yet coded -
 */
declare function isScamLinkScore(link: string): boolean;
/**
 * createHash() Creates a hash of the specified string using the hashType and digest format.
 * @param {String} inputString The input string to hash
 * @param {String} hashType The hash algorithm used (default sha256)
 * @param {String} digestFormat Digest format (default hex)
 */
declare function createHash(inputString: string, hashType?: string, digestFormat?: node_crypto.BinaryToTextEncoding): string;
export { createHash };
/**
 * _normalize(): Normalizes a string returning the same string without accents and special characters
 * @param {String} str The string to normalize
 * @returns String
 */
declare let _normalize: (str: string) => string;
export { _normalize };
/**
 * @description Normalize a list of strings and return a regex string
 * @param {*} list
 * @returns
 */
declare let _normalizeListRegex: (list: Array<any>) => string;
export { _normalizeListRegex };
/**
 * Returns the same string with the first letter as a capital letter
 * @param {String} str The input string
 * @returns {String}
 */
export declare const capitalize: (str: string) => string;
/**
 * formatTime() : Transforme un temps en millisecondes en un texte en une durée formatée
 * @param {string} millisecondes - Le temps en millisecondes à convertir
 * @param {string} format - Le format texte à renvoyer (YYYY: year, MM: month, DDDDD: jour de la semaine, DD: day, hh: heure, mm: minute, ss: seconde)
 */
export { formatTime };
declare function formatTime(millisecondes: number, format: string): string;
export { formatDate };
/**
 * formatDate() : Transforme un timestamp en un texte de date formatée
 * @param {string} timestamp - Le timestamp à convertir
 * @param {string} format - Le format texte à renvoyer (YYYY: year, MM: month, DDDDD: jour de la semaine, DD: day, hh: heure, mm: minute, ss: seconde)
 */
declare function formatDate(timestamp: number | bigint, format: string): string;
export { compareString };
/**
 * compareString() : Renvoie une valeur entre 0 et 1 du taux de similitude entre les deux chaines
 * @param {string} string1 - Première chaine de texte
 * @param {string} string2 - Deuxième chaine de texte
 * @author Sylicium
 * @description Renvoie une valeur entre 0 et 1 du taux de similitude entre les deux chaines - When using this, please mention @sylicium
 */
declare function compareString(string1: string, string2: string): number;
/**
 * class Emitter : Create a local socket object to send and receive events.
 * @version 1.0.0
 * @author Sylicium
 */
declare class Emitter {
    eventsNames: {
        [key: string]: any;
    };
    on: Function;
    emit: Function;
    removeListeners: Function;
    removeAllListeners: Function;
    countListeners: Function;
    constructor();
}
export { Emitter };
/**
 * @description Pauses the execution for a specified amount of time in milliseconds
 * @param {Number} ms - Amount of milliseconds to wait
 * @returns {Promise} - A promise that resolves after the specified time
 */
export declare const sleep: (ms: number) => Promise<any>;
