
/**
 * @version 3.6.1 // 01/06/2024
 * @author Sylicium
 * @description Module someFunction qui réunit plein de fonction utiles
 * @github https://github.com/Sylicium/someScripts/edit/main/modules/someFunctions.js
 * @discord https://discord.gg/9qPJyvJQBP
*/

/* Import modules */
const fs = require("fs")
const node_crypto = require('node:crypto');

try {
    let config = require("../config")

    module.exports.isSuperAdmin = isSuperAdmin
    /**
     * isSuperAdmin() : Booléen qui retourne true si l'ID est celui d'un SuperAdmin
     * @param {string} user_id - L'id de l'utilisateur a check
     */
    function isSuperAdmin(user_id) {
        return ( config.superAdminList.indexOf(user_id) != -1 )
    }
} catch(e) { console.log("[WARN someFunctions.js] Did not loaded isSuperAdmin() due to error. (this is not necessary to use the whole module)") }


class new_Random {
    constructor() {
        this.version = "1.1.1"
    }

    /**
     * randHex() : Retourne une chaine héxadécimale de la longueur voulue
     * @param {Number} length - Longueur de la chaine voulue
     * @param {Boolean} capitalize - Mettre la chaine en caractères majuscule
     */
    randHex(length, capitalize=false) {
        let str = [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        return (capitalize ? str.toUpperCase() : str.toLowerCase())
    }

    /**
     * randInt() : Renvoie un nombre entier aléatoire entre min (inclu) et max (exclu)
     * @param {Number} min - La nombre minimum (inclu)
     * @param {Number} max - La nombre maximum (exclu)
     * @returns {Number}
     */
    randInt(min, max) {
        return Math.floor(Math.random()*(max-min)+min)
    }

    /**
     * randFloat() : Renvoie un nombre flotant aléatoire entre min (inclu) et max (exclu)
     * @param {Float} min - La nombre minimum (inclu)
     * @param {Float} max - La nombre maximum (exclu)
     * @returns {Float}
     */
    randFloat(min, max) {
        return Math.random()*(max-min)
    }

    /**
     * shuffle() : Mélange aléatoirement la liste donnée.
     * @param {Array} list - La liste a mélanger
     * @returns {Array}
     */
    shuffle(list) {
        for (let i = list.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list
    }

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
     You can remove duplicates of a list using removeDuplicates() function in that same module before passing the list in the choice() function.
     */
    choice(list, pickOnce=true, amount=1) {
        if(!Array.isArray(list) || list.length == 0 || typeof list != 'object') throw new Error("Invalid value for argument 'list'.")
        if(typeof pickOnce != 'boolean') throw new Error("Invalid value for argument 'pickOnce'.")
        if(typeof amount != 'number' || isNaN(amount) || !Number.isSafeInteger(amount) || amount <= 0) throw new Error("Invalid value for argument 'amount'.")
        let _indexes = []
        if(amount >= list.length) { return list }
        while(_indexes.length != amount) {
            let t = Math.floor(Math.random()*list.length)
            if(pickOnce) {
                if(!_indexes.includes(t)) { _indexes.push(t) }
            } else { _indexes.push(t) }
        }
        return _indexes.map(x => { return list[x] })
    }
    
    /**
     * choiceOne() : Return random 1 element of the specified list
     * @param {Array} list - Input list
     */
    choiceOne(list) {
        // Disable line below for optimizations in execution,
        if(!Array.isArray(list) || list.length == 0 || typeof list != 'object') throw new Error("Invalid value for argument 'list'.")
        return list[Math.floor(Math.random()*list.length)]
    }

    /**
     * randString() : Retourne une chaine aléatoire de la longueur voulue contenant des lettres minusules et majuscules ainsi que des chiffres
     * @param {Number} length - Longueur de la chaine voulue
     * @param {Boolean} list - Mettre la chaine en caractères majuscule
     */
    randString(length, charList=undefined) {
        charList = charList || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
        return [...Array(length)].map((x) => charList[Math.floor(Math.random()*charList.length)]).join('');
    }
}
module.exports.Random = new new_Random()


/* Functions with lists */

module.exports.sum = sum
/**
 * sum() : Retourne la somme de tous les éléments de la liste
 * @param {Array} list - La liste en entrée
 */
function sum(list) {
    return list.reduce((partialSum, a) => partialSum + a, 0);
}

module.exports.any = any
/**
 * any() : Retourne true si au moins 1 élément se trouve dans les 2 listes
 * @param {Array} list - La 1ere liste
 * @param {Array} list_two - La 2ere liste
 * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
 */
function any(list, list_two, caseSensitive=true) {
    if(!caseSensitive) {
        list = list.map(f=>{ return f.toLowerCase(); });
        list_two = list_two.map(f=>{ return f.toLowerCase(); });
    }
    for(let i in list) {
        if(list_two.indexOf(list[i]) != -1) return true
    }
    return false
}

module.exports.arrayToChunks = arrayToChunks
/**
 * arrayToChunks() : Retourne une liste contenant des chunks de la liste donnée, de taille maximum specifié
 * @param {Array} list - La liste qui doit être découpée en chunks
 * @param {Number} chunkSize - La taille maximum d'un chunk
 * @returns Array
 */
function arrayToChunks(list, chunkSize) {
    if(list == undefined || !Array.isArray(list)) throw new Error("list must be type of Array.")
    if(chunkSize == undefined || typeof chunkSize != 'number' || !Number.isInteger(chunkSize) || chunkSize<=0) throw new Error("Chunk size must me a valid positive integer > 0")
    return list.reduce((all,one,i) => {
        const ch = Math.floor(i/chunkSize); 
        all[ch] = [].concat((all[ch]||[]),one); 
        return all
    }, [])
} 

module.exports.all = all
/**
 * all() : Retourne true si tous les éléments de la liste A se trouvent dans la B
 * @param {Array} from_list - La liste qui doit être contenue intégralement dans la 2eme
 * @param {Array} list_in - La liste qui doit contenir chaque élement de la 1ere
 * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
 */
function all(from_list, list_in, caseSensitive=true) {
    if(!caseSensitive) {
        list = list.map(f=>{ return f.toLowerCase(); });
        list_two = list_two.map(f=>{ return f.toLowerCase(); });
    }
    
    for(let i in from_list) {
        if(list_in.indexOf(from_list[i]) == -1) return false
    }
    return true
}


module.exports.splitAndJoin = splitAndJoin
/**
 * splitAndJoin() : remplace toutes les clé du dictionnaire donné par sa valeur
 * @param {String} text - Le texte à traiter
 * @param {Object} dict - Le dictionnaire sous la forme { "replaceFrom": "replaceTo", "replaceFrom2": "replaceTo2" }
 * @description example: splitAndJoin("hi how are you i ?", {"i":"UWU","are":"dont"}) -> 'hUWU how dont you UWU ?'
 */
function splitAndJoin(text, dict) {
    let new_text = text
    for(let key in dict) {
        new_text = new_text.split(key).join(dict[key])
    }
    return new_text
}

/**
 * @function removeDuplicates
 * @description Remove duplicates from a given array
 * @param {Array} list The list to use
 * @returns {Array}
 */
function removeDuplicates(list) { return list.filter((x, i) => i === list.indexOf(x)) }
module.exports.removeDuplicates = removeDuplicates




module.exports.isBufferEqual = isBufferEqual
/**
 * isBufferEqual() : Compare deux buffer en XOR. Résiste au time attack.
 * @param {String} a - Premier buffer
 * @param {Array} b - Deuxieme buffer
 * @returns {Boolean} - Booléen
 */
function isBufferEqual(a,b) {
    // shortcutting on type is necessary for correctness
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        return false;
    }
    
    // buffer sizes should be well-known information, so despite this
    // shortcutting, it doesn't leak any information about the *contents* of the
    // buffers.
    if (a.length !== b.length) {
        return false;
    }
    
    var c = 0;
    for (var i = 0; i < a.length; i++) {
        /*jshint bitwise:false */
        c |= a[i] ^ b[i]; // XOR
    }
    return c === 0;
}

module.exports.anyWordInText = anyWordInText
/**
 * anyWordInText() : Retourne true si au moins 1 élément se trouve dans le texte
 * @param {String} text - Le texte
 * @param {Array} list - La liste
 * @param {Boolean} caseSensitive - Prendre en compte ou non la casse. Default: true
 */
function anyWordInText(text, list, caseSensitive=true) {
    if(!caseSensitive) {
        list = list.map(f=>{ return f.toLowerCase(); });
        text = text.toLowerCase()
    }
    for(let i in list) {
        if(text.indexOf(list[i]) != -1) return true
    }
    return false
}

module.exports.mapObject = mapObject 
/**
 * @description Functions that works like a Array.map((value, index)) but for objects
 * @param {Object} obj
 * @param {Function} callback
*/
function mapObject(obj, callback) {
    let newObj = {}
    for (const [key, value] of Object.entries(obj)) {
        newObj[key] = callback(value, key)
    }
    return newObj
}

module.exports.parseMillisecondsFromTimeString = parseMillisecondsFromTimeString
/**
 * parseMillisecondsFromTimeString(string) : Returns an amount of milliseconds from the parsed user time string input
 * @example f("10m") -> 600000 | f("1d") -> 86400000 | f("2d 10m 50s 999ms") -> 173450999
 * @param {String} str - The text to parse
 * @returns {Number}
 */
function parseMillisecondsFromTimeString(str) {
    var total = NaN;
    var weeks   =       str.match(/(\d+)*w([^a-zA-Z]|$)/);
    var days    =       str.match(/(\d+)*d([^a-zA-Z]|$)/);
    var hours   =       str.match(/(\d+)*h([^a-zA-Z]|$)/);
    var minutes =       str.match(/(\d+)*(m|min)([^a-zA-Z]|$)/);
    var seconds =       str.match(/(\d+)*s([^a-zA-Z]|$)/);
    var milliseconds =  str.match(/(\d+)*ms([^a-zA-Z]|$)/);
    if (weeks) {        if(isNaN(total)) {total=0};     total += parseInt(weeks[1])          *604800*1000;}
    if (days) {         if(isNaN(total)) {total=0};     total += parseInt(days[1])          *86400*1000;}
    if (hours) {        if(isNaN(total)) {total=0};     total += parseInt(hours[1])         *3600*1000; }
    if (minutes) {      if(isNaN(total)) {total=0};     total += parseInt(minutes[1])       *60*1000;   }
    if (seconds) {      if(isNaN(total)) {total=0};     total += parseInt(seconds[1])       *1000;      }
    if (milliseconds) { if(isNaN(total)) {total=0};     total += parseInt(milliseconds[1]);             }
    return total;
}

/**
 * @class JSONBigInt()
 * @author Sylicium
 * @description Allow you to use JSON.parse() and JSON.stringify() with support for BigInts
 */
class new_JSONBigInt {
      constructor() {}
      parse(json) {
        return this._forceParse(json)
      }
      stringify(json) {
        return this._forceStringify(json)
      }
      _replacer(key, value) {
        if (typeof value === 'bigint') {
          return {
            type: 'bigint',
            value: value.toString()
          };
        } else {
          return value;
        }
      }
      _reviver(key, value) {
        if (value && value.type == 'bigint') {
          return BigInt(value.value);  
        }
        return value;
      }
      _forceStringify(json) {
        return JSON.stringify(json, this._replacer);
      }
      _forceParse(json) {
        return JSON.parse(json, this._reviver);
      }
}
module.exports.JSONBigInt = new new_JSONBigInt()


module.exports.isScam = isScam
/**
 * isScam() : Renvoie True si le texte entré est détecté comme une arnaque Version 1.1.1 | 21/06/2022
 * @param {String} text - La chaine de texte à tester
 * @author Sylicium
 * @description Used for discord bots in my own projects
 */
function isScam(text) {
    /*
    Dependencies: compareString()
    https://github.com/Discord-AntiScam/scam-links/blob/main/urls.json
    */
    text = text.toLowerCase()
    let _list = text.split(" ")
    let _links = _list.filter(a => ( a.startsWith("http://") || a.startsWith("https://") ))

    //let blacklistedLinks = fs.readFileSync("./datas/static/frequentScamLinks.txt","utf-8").split("\n").map(elem => elem.trim())
    let blacklistedLinks = JSON.parse(fs.readFileSync("./datas/static/frequentScamLinks.txt", "utf-8"))
    blacklistedLinks = blacklistedLinks.map(link => {
        let l = link.replace("http://","")
        if(!l.startsWith("https://")) return `https://${l}`
        else return l
    })
    let whitelistedLinks = [
        "https://discord.com",
        "https://discordapp.com",
        "https://dis.gd"
    ]

    let _linkscore_list = []
    for(let link in _links) {
        for(let scamLink in blacklistedLinks) {
            let s_to_test = _links[link].split("/")
            s_to_test.splice(3)
            if(s_to_test[2]) {
                let extention = ""
                extention = s_to_test[2].split(".")
                extention.pop()
                extention = extention.join(".")
            }
            s_to_test = s_to_test.join("/").replace("http://","https://")
            if(!s_to_test.startsWith("https://")) s_to_test = `https://${s_to_test}`
            
            if(whitelistedLinks.indexOf(s_to_test) != -1) {
                
            } else {
                let _temp = compareString(s_to_test, blacklistedLinks[scamLink])
                let checkWhitelist = []
                for(let i in whitelistedLinks) {
                    checkWhitelist.push(compareString(s_to_test, whitelistedLinks[i]))
                }
                // console.log(`${s_to_test} AND ${blacklistedLinks[scamLink]} => +${_temp}`)
                let _maxTemp = Math.max(_temp, ...checkWhitelist)
                _linkscore_list.push(_maxTemp)
            }
        }
    }
    let _linkscore = Math.max(..._linkscore_list)
    if(_linkscore_list.length == 0) _linkscore = 0
    // console.log("_linkscore:",_linkscore)

    let _score_max = 80 // _score va jusqu'à X
    let _score = _linkscore*10 // 10 max

    function calcScorePercent() {
        let temp = (_score >= _score_max/2)
        if(temp >= 1) temp = 1
        let temp2 = _score/_score_max
        if(temp2 >= 1) temp2 = 1
        return temp2
    }

    if(_linkscore >= 0.9) return {
        scam: true,
        score: calcScorePercent(),
        info: "Link score above 0.9"
    }


    if(text.startsWith("@everyone")) _score += 20 // 40


    let blacklistedWords = [
        "free nitro",
        "steam nitro",
        "nitro steam",
        "nitro from steam",
        "free steam",
        "fast free nitro",
        "get your nitro",
        "take nitro faster",
        "running out",
        "some nitro left",
        "nitro left over here",
        "nitro left over there",
        "this gift is for you bro",
        "aaaaaaaaaaaaaaa"
    ]
    for(let word in blacklistedWords) { // 20 max
        if(text.indexOf(blacklistedWords[word]) != -1) {
            _score += 16
        }
    }
    

    return {
        scam: (_score >= _score_max/2),
        score: calcScorePercent(),
        info: ( (_score >= _score_max/2) ? "Global score above 0.5" : "Global score under 0.5")
    }

    // https://discrod-gifts.org/welcomes
    // if(isScamLinkScore(link) >= 0.5) return true

}


module.exports.isScamScore = isScamLinkScore
/**
 * isScamLinkScore() : Retourne un booléen pour savoir si ce lien est un lien d'arnaque
 * @param {String} link - Le lien a tester
 * @deprecated Not yet coded -
 */
function isScamLinkScore(link) {
    
    return false
    // https://discrod-gifts.org/welcomes
}

/**
 * createHash() Creates a hash of the specified string using the hashType and digest format.
 * @param {String} inputString The input string to hash
 * @param {String} hashType The hash algorithm used (default sha256)
 * @param {String} digestFormat Digest format (default hex)
 */
function createHash(inputString, hashType="sha256", digestFormat="hex") {
    return node_crypto.createHash(hashType).update(inputString).digest(digestFormat);
    // return createHash('sha256').update("bacon").digest('hex');
}
module.exports.createHash = createHash

/**
 * _normalize(): Normalizes a string returning the same string without accents and special characters
 * @param {String} str The string to normalize
 * @returns String
 */
let _normalize = (str) => { return (`${str}`.normalize('NFKD').replace(/[^\w ]/g, '')).toLowerCase().replace(/\s+/g, ' ').trim() }
module.exports._normalize = _normalize

let _normalizeRegex = (str) => {
    return `(${splitAndJoin(_normalize(str.toLowerCase().trim()), {
        "\\": "\\\\", "|": "\\|", "/": "\\/",
        "-": "\\-", "_": "\\_", "$": "\\$",
        "[": "\\[", "]": "\\]", "(": "\\(",
        ")": "\\)", "{": "\\{", "}": "\\}",
        "?": "\\?", "*": "\\*", "+": "\\+",
        ",": "\\,", "^": "\\^", ":": "\\:",
        "<": "\\<", ">": "\\>", "'": "\\'",
        '"': '\\"', "#": "\\#",

        "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a",
        "a": "[aàáâãäå]",

        "è": "e", "é": "e", "ê": "e", "ë": "e",
        "e": "[eèéêë]",

        "ì": "i", "í": "i", "î": "i", "ï": "i",
        "i": "[iìíîï]",

        "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o", "ø": "o",
        "o": "[oòóôõöø]",
        
        "ù": "u", "ú": "u", "û": "u", "ü": "u",
        "u": "[uùúûü]",

        "ý": "y", "ÿ": "y",
        "y": "[yýÿ]",

        "ñ": "n", "n": "[nñ]",
        "ç": "c", "c": "[cç]",
        
        "æ": "ae", "ae": "(ae|æ)",
        "œ": "oe", "oe": "(oe|œ)",
    })})`
}

let _normalizeListRegex = (list) => { return list.map(x => { return _normalizeRegex(x) }).join("|") }

/**
 * Returns the same string with the first letter as a capital letter 
 * @param {String} str The input string
 * @returns {String}
 */
module.exports.capitalize = (str) => { return `${str[0].toUpperCase()}${str.slice(1)}` }

/**
 * formatTime() : Transforme un temps en millisecondes en un texte en une durée formatée
 * @param {string} millisecondes - Le temps en millisecondes à convertir
 * @param {string} format - Le format texte à renvoyer (YYYY: year, MM: month, DDDDD: jour de la semaine, DD: day, hh: heure, mm: minute, ss: seconde)
 */
module.exports.formatTime = formatTime
function formatTime(millisecondes, format) {
    /*
    Renvoie un dictionnaire avec le formatage de la durée en ms, en jour, heures, etc...
    YYYY: year
    MM: month
    DDDDD: jour de l'année
    DD: jours du mois
    hh: heure
    mm: minute
    ss: seconde
    */
    let v = {
        y: 31536000000,
        mo: 2628000000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000
    }
    let la_date = {
        years: Math.floor(millisecondes / v.y),
        months: Math.floor((millisecondes % v.y) / v.mo), // value de l'année divisée en douze poue faire à peu pres
        all_days: Math.floor(millisecondes / v.d), // jours de l'année
        days: Math.floor(((millisecondes % v.y) % v.mo) / v.d), // jours du mois
        hours: Math.floor((((millisecondes % v.y) % v.mo) % v.d) / v.h),
        minutes: Math.floor(((((millisecondes % v.y) % v.mo) % v.d) % v.h) / v.m),
        seconds: Math.floor((((((millisecondes % v.y) % v.mo) % v.d) % v.h) % v.m) / v.s),
        milliseconds: (((((millisecondes % v.y) % v.mo) % v.d) % v.h) % v.m) % v.s
    }
    //console.log(la_date)

    function formatThis(thing, length = 2) {
        return `0000${thing}`.substr(-length)
    }

    let return_string = format.replace("YYYY", la_date.years).replace("MM", formatThis(la_date.months)).replace("DDDDD", la_date.all_days).replace("DD", formatThis(la_date.days)).replace("hh", formatThis(la_date.hours)).replace("mm", formatThis(la_date.minutes)).replace("ss", la_date.seconds).replace("ms", formatThis(la_date.milliseconds, 3))

    return return_string
}


module.exports.formatDate = formatDate
/**
 * formatDate() : Transforme un timestamp en un texte de date formatée
 * @param {string} timestamp - Le timestamp à convertir
 * @param {string} format - Le format texte à renvoyer (YYYY: year, MM: month, DDDDD: jour de la semaine, DD: day, hh: heure, mm: minute, ss: seconde)
 */
function formatDate(timestamp, format) {
    /*
    YYYY: year
    MM: month
    DDDDD: jour de la semaine
    DD: day
    hh: heure
    mm: minute
    ss: seconde
    ms: miliseconds
    */
    let la_date = new Date(timestamp)
    function formatThis(thing, length=2) {
        return `0000${thing}`.substr(-length)
    }

    function getDayName() {
        let list = [
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi",
            "dimanche"
        ]
        return list[la_date.getDay()-1]
    }

    let return_string = format.replace("YYYY", la_date.getFullYear()).replace("MM", formatThis(la_date.getMonth()+1)).replace("DDDDD", getDayName()).replace("DD", formatThis(la_date.getDate())).replace("hh", formatThis(la_date.getHours())).replace("mm", formatThis(la_date.getMinutes())).replace("ss", formatThis(la_date.getSeconds())).replace("ms", formatThis(la_date.getMilliseconds(),3))

    return return_string
}


module.exports.compareString = compareString
/**
 * compareString() : Renvoie une valeur entre 0 et 1 du taux de similitude entre les deux chaines
 * @param {string} string1 - Première chaine de texte
 * @param {string} string2 - Deuxième chaine de texte
 * @author Sylicium
 * @description Renvoie une valeur entre 0 et 1 du taux de similitude entre les deux chaines - When using this, please mention @sylicium
 */
function compareString(string1, string2) {
    // v1.0 from 18/04/2022
    if(string1 == string2) return 1;
    if(string1 == "" || string2 == "") return 0
    let total_count = 0;
    let ok_count = 0;
    for(let longueur_test = 1; longueur_test < string1.length+1; longueur_test++) {
        let morceau;
        for(let multiplier = 0; multiplier <  ((string1.length)/longueur_test)+1; multiplier++ ) {
            let index = longueur_test*multiplier
            if(string1.length > index) {
                total_count++
                let the_string = string1.substr(index, longueur_test)
                if(string2.indexOf(the_string) != -1) {
                    ok_count += 0.5
                } else if(string2.toLowerCase().indexOf(the_string) != -1){
                    ok_count += 0.45
                } else if(string2.indexOf(the_string.toLowerCase()) != -1){
                    ok_count += 0.45
                } else {
                    //console.log(`No '${the_string}' in '${string2}' `)
                }
            }
            if(string2.length > index) {
                let the_string = string2.substr(index, longueur_test)
                if(string1.indexOf(the_string) != -1) {
                    ok_count += 0.5
                } else if(string1.toLowerCase().indexOf(the_string) != -1){
                    ok_count += 0.45
                } else if(string1.indexOf(the_string.toLowerCase()) != -1){
                    ok_count += 0.45
                } else {
                    //console.log(`No '${the_string}' in '${string1}' `)
                }
            }
        }

    }

    let a = string1.length
    let b = string2.length

    let ponderation;
    if( (b/a) == 1) {
        ponderation = 1
    } else if( (b/a) > 1 ) {
        ponderation = (a/b)
    } else {
        ponderation = (b/a)
    }

    let score = (ok_count/total_count)*ponderation

    return score
}

/**
 * class Emitter : Create a local socket object to send and receive events.
 * @version 1.0.0
 * @author Sylicium
 */
class Emitter {
    constructor() {
        this.eventsNames = {}
        
        this.on = (callName, callback_f) => {
            if(typeof callback_f != 'function') throw new Error("Callback must must type of 'function'.")
            if(this.eventsNames[callName] == undefined) this.eventsNames[callName] = []
            this.eventsNames[callName].push(callback_f)
        }
        this.emit = (callName, ...datasList) => {
            if(this.eventsNames[callName] == undefined) return;
            for(let i in this.eventsNames[callName]) {
                try { this.eventsNames[callName][i](...datasList) } catch(e) { console.log(e) }
            }
        }
        this.removeListeners = (callName) => (this.eventsNames[callName] = [])
        this.removeAllListeners = () => (this.eventsNames = {})
        this.countListeners = (callName) => (this.eventsNames[callName] != undefined ? this.eventsNames[callName].length : 0)
    }
}
module.exports.Emitter = Emitter

/**
 * sleep(): Waits asynchronously the specified amount of milliseconds
 * @param {*} ms Amount of milliseconds to wait
 * @returns 
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports.sleep = sleep
