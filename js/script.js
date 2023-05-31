"use strict"
//===код для определения типа устройства===========================================================
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BleckBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};
//=================================================================================================
//добавляем модификатор в зависимости от типа устройства
if (isMobile.any()) {
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc');
};
//=================================================================================================

// Создаем таблицу Вижинера
function buildVigenereTable() {
    let table = [];
    let alphabet = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ'0123456789.,!?";
    let size = alphabet.length;

    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            let index = (i + j) % size;
            //console.log(index);
            //Метод charAt возвращает символ, стоящий на указанной позиции в строке
            row.push(alphabet.charAt(index));
        }
        table.push(row);
    }

    return table;
}
// Сохраняем функцию в перемунную для дальнейшего использования
let vigenereTable = buildVigenereTable();

// Функция кодирования
function vigenereEncrypt(plainText, keyword) {
    let encryptedText = "";
    let alphabet = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ'0123456789.,!?";
    let size = alphabet.length;
    let keywordIndex = 0;

    for (let i = 0; i < plainText.length; i++) {
        let plainChar = plainText.charAt(i).toUpperCase();
        if (alphabet.includes(plainChar)) {
            let keywordChar = keyword.charAt(keywordIndex % keyword.length).toUpperCase();
            let keywordRowIndex = alphabet.indexOf(keywordChar);
            let plainCharIndex = alphabet.indexOf(plainChar);

            let encryptedChar = vigenereTable[keywordRowIndex][plainCharIndex];
            encryptedText += encryptedChar;

            keywordIndex++;
        } else {
            encryptedText += plainChar;
        }
    }

    return encryptedText;
}

// Функция декодирования
function vigenereDecrypt(encryptedText, keyword) {
    let decryptedText = "";
    let alphabet = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ'0123456789.,!?";
    let size = alphabet.length;
    let keywordIndex = 0;

    for (let i = 0; i < encryptedText.length; i++) {
        let encryptedChar = encryptedText.charAt(i).toUpperCase();
        if (alphabet.includes(encryptedChar)) {
            let keywordChar = keyword.charAt(keywordIndex % keyword.length).toUpperCase();
            let keywordRowIndex = alphabet.indexOf(keywordChar);
            let encryptedCharIndex = vigenereTable[keywordRowIndex].indexOf(encryptedChar);

            let decryptedChar = alphabet.charAt(encryptedCharIndex);
            decryptedText += decryptedChar;

            keywordIndex++;
        } else {
            decryptedText += encryptedChar;
        }
    }

    return decryptedText;
}

// Настраиваем элементы управления (кнопки, поля ввода)
// Кодування
const inputWord = document.getElementById("keyInput");
const textareaEncrypt = document.getElementById("textareaEncrypt");
const resultEncrypt = document.getElementById("resultEncrypt");
const buttonEncrypt = document.getElementById("buttonEnc");

function resultEnc() {
    let keyword = inputWord.value;
    let plainText = textareaEncrypt.value;
    let encryptedText = vigenereEncrypt(plainText, keyword);
    resultEncrypt.value = encryptedText;
}
buttonEncrypt.addEventListener("click", resultEnc);

// Декодування
const textareaDecrypt = document.getElementById("textareaDecrypt");
const resultDecrypt = document.getElementById("resultDecrypt");
const buttonDecrypt = document.getElementById("buttonDec");

function resultDec() {
    let keyword = inputWord.value;
    let encryptedText = textareaDecrypt.value;
    let decryptText = vigenereDecrypt(encryptedText, keyword);
    resultDecrypt.value = decryptText;
}
buttonDecrypt.addEventListener("click", resultDec);

// Функция которая перезагружает страницу
function reloadPage() {
    location.reload(true);
} 

const buttonReload = document.getElementById("reload");
buttonReload.addEventListener("click", reloadPage);

//=================================================================================================
// Настраиваем работу полей ввода =================================================================
const placeholder = document.querySelectorAll("[placeholder]");

placeholder.forEach(item => {
    const defaultItemPlaceholder = item.placeholder;
    item.addEventListener("focus", function (e) {
        item.placeholder = "";
        item.classList.add("_active");
    });
    item.addEventListener("blur", function (e) {
        item.placeholder = defaultItemPlaceholder;
        item.classList.remove("_active");
    });
});
//=================================================================================================
// Кнопки options =================================================================================
function copyText() {
    var textarea = document.getElementById("textareaEncrypt");
    textarea.select();
    document.execCommand("copy");
}

function pasteText() {
    var textarea = document.getElementById("textareaEncrypt");
    textarea.focus();
    document.execCommand("paste");
}

function cutText() {
    var textarea = document.getElementById("textareaEncrypt");
    textarea.select();
    document.execCommand("cut");
}

function deleteText() {
    var textarea = document.getElementById("textareaEncrypt");
    textarea.value = "";
}