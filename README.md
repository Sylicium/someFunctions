# someFunctions
## By Sylicium

This module is a personal module that i wanted to give freely to everyone interested.
Keep in mind that it might not always be up to update, regularly updated, or even updated.
(by the way i'm french)

# What is it ?
A bunch of utilities that you can freely use in your projects

# Dependancies
require("fs");
require('node:crypto');

# Functions availables
(Some might not be listed here tho)

/**
 * isSuperAdmin() : Booléen qui retourne true si l'ID est celui d'un SuperAdmin
 * @param {string} user_id - L'id de l'utilisateur a check
 */

/**
 * Random.randHex() : Retourne une chaine héxadécimale de la longueur voulue
 * @param {Number} length - Longueur de la chaine voulue
 * @param {Boolean} capitalize - Mettre la chaine en caractères majuscule
 * @deprecated use Random.randHex()
 */

/**
 * Random.randInt() : Renvoie un nombre entier aléatoire entre min (inclu) et max (exclu)
 * @param {Number} min - La nombre minimum (inclu)
 * @param {Number} max - La nombre maximum (exclu)
 * @returns {Number}
 */

/**
 * Random.randFloat() : Renvoie un nombre flotant aléatoire entre min (inclu) et max (exclu)
 * @param {Float} min - La nombre minimum (inclu)
 * @param {Float} max - La nombre maximum (exclu)
 * @returns {Float}
 */

/**
 * Random.shuffle() : Mélange aléatoirement la liste donnée.
 * @param {Array} list - La liste a mélanger
 * @returns {Array}
 */

/**
 * Random.choice() : Retourne un élément àléatoire de la liste
 * @param {Array} list - La liste en entrée
 */

/**
 * Random.randString() : Retourne une chaine aléatoire de la longueur voulue contenant des lettres minusules et majuscules ainsi que des chiffres
 * @param {Number} length - Longueur de la chaine voulue
 * @param {Boolean} list - Mettre la chaine en caractères majuscule
 */


/* Functions with lists */

/**
 * sum() : Retourne la somme de tous les éléments de la liste
 * @param {Array} list - La liste en entrée
 */

/**
 * any() : Retourne true si au moins 1 élément se trouve dans les 2 listes
 * @param {Array} list - La 1ere liste
 * @param {Array} list_two - La 2ere liste
 * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
 */

/**
 * arrayToChunks() : Retourne une liste contenant des chunks de la liste donnée, de taille maximum specifié
 * @param {Array} list - La liste qui doit être découpée en chunks
 * @param {Number} chunkSize - La taille maximum d'un chunk
 * @returns Array
 */

/**
 * all() : Retourne true si tous les éléments de la liste A se trouvent dans la B
 * @param {Array} from_list - La liste qui doit être contenue intégralement dans la 2eme
 * @param {Array} list_in - La liste qui doit contenir chaque élement de la 1ere
 * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
 */


/**
 * splitAndJoin() : remplace toutes les clé du dictionnaire donné par sa valeur
 * @param {String} text - Le texte à traiter
 * @param {Object} dict - Le dictionnaire sous la forme { "replaceFrom": "replaceTo", "replaceFrom2": "replaceTo2" }
 * @description example: splitAndJoin("hi how are you i ?", {"i":"UWU","are":"dont"}) -> 'hUWU how dont you UWU ?'
 */

/**
 * @function removeDuplicates
 * @description Remove duplicates from a given array
 * @param {Array} list The list to use
 * @returns {Array}
 */

/**
 * isBufferEqual() : Compare deux buffer en XOR. Résiste au time attack.
 * @param {String} a - Premier buffer
 * @param {Array} b - Deuxieme buffer
 * @returns {Boolean} - Booléen
 */

/**
 * anyWordInText() : Retourne true si au moins 1 élément se trouve dans le texte
 * @param {String} text - Le texte
 * @param {Array} list - La liste
 * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
 */

/**
 * @class JSONBigInt()
 * @author Sylicium
 * @description Allow you to use JSON.parse() and JSON.stringify() with support for BigInts
 */

/**
 * isScam() : Renvoie True si le texte entré est détecté comme une arnaque Version 1.1.1 | 21/06/2022
 * @param {String} text - La chaine de texte à tester
 * @author Sylicium
 * @description Used for discord bots in my own projects
 */

/**
 * isScamScore() : Retourne un booléen pour savoir si ce lien est un lien d'arnaque
 * @param {String} link - Le lien a tester
 * @deprecated Not yet coded -
 */

/**
 * createHash() Creates a hash of the specified string using the hashType and digest format.
 * @param {String} inputString The input string to hash
 * @param {String} hashType The hash algorithm used (default sha256)
 * @param {String} digestFormat Digest format (default hex)
 */

/**
 * _normalize(): Normalizes a string returning the same string without accents and special characters
 * @param {String} str The string to normalize
 * @returns String
 */

_normalizeRegex: undocumented

_normalizeListRegex: undocumented

/**
 * capitalize() Returns the same string with the first letter as a capital letter 
 * @param {String} str The input string
 * @returns {String}
 */

/**
 * formatTime() : Transforme un temps en millisecondes en un texte en une durée formatée
 * @param {string} millisecondes - Le temps en millisecondes à convertir
 * @param {string} format - Le format texte à renvoyer (YYYY: year, MM: month, DDDDD: jour de la semaine, DD: day, hh: heure, mm: minute, ss: seconde)
 */

/**
 * formatDate() : Transforme un timestamp en un texte de date formatée
 * @param {string} timestamp - Le timestamp à convertir
 * @param {string} format - Le format texte à renvoyer (YYYY: year, MM: month, DDDDD: jour de la semaine, DD: day, hh: heure, mm: minute, ss: seconde)
 */


/**
 * compareString() : Renvoie une valeur entre 0 et 1 du taux de similitude entre les deux chaines
 * @param {string} string1 - Première chaine de texte
 * @param {string} string2 - Deuxième chaine de texte
 * @author Sylicium
 * @description Renvoie une valeur entre 0 et 1 du taux de similitude entre les deux chaines - When using this, please mention @sylicium
 */

/**
 * class Emitter : Create a local socket object to send and receive events.
 * @version 1.0.0
 * @author Sylicium
 */

/**
 * sleep(): Waits asynchronously the specified amount of milliseconds
 * @param {*} ms Amount of milliseconds to wait
 * @returns 
 */