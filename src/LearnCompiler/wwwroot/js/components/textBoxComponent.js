var TextBox = function () {
    var invalidRegex = /((?![0-9])\.(?![0-9]))|([^0-9]\.[0-9])|([0-9]\.(?![0-9]))|[^ \.,/;()+*'"><=_a-zA-Z0-9[\-\]\n]+/gm;
    var invalidCharRegex = /('[^']{0,1}?')|('(?![^']{0,1}?').)/gm;
    var inputContainer = undefined;
    var textArea = undefined;
    var highlighter = undefined;
    return {
        applyText: function (text) {
            var matches = [];

            matches = matches.concat(text.match(invalidRegex));
            matches = matches.concat(text.match(invalidCharRegex));
            matches = matches.filter((v, i) => matches.indexOf(v) === i && v !== null && !v.match(/'[^']{0,1}?'/gm));

            for (var i = 0; i < matches.length; i++) {
                text = text.split(matches[i]).join('<span>' + matches[i] + '</span>');
            }

            matches = [];
            matches = matches.concat(text.match(/"(?:[^"\\]|\\.)*"/));
            matches = matches.filter((v, i) => matches.indexOf(v) === i && v !== null);

            for (var i = 0; i < matches.length; i++) {
                text = text.split(matches[i]).join(matches[i].replace('<span>', '').replace('</span>', ''));
            }

            // replace all the line braks by <br/>, and all the double spaces by the html version &nbsp;
            text = this.replaceAll(text, '\n', '<br/>');
            text = this.replaceAll(text, ' ', '&nbsp;');
            text = this.replaceAll(text, '<span>', '<span style=background-color:red;>');

            // re-inject the processed text into the div
            highlighter.innerHTML = text;
        },
        init: function () {
            inputContainer = document.getElementById('inputContainer');
            textArea = inputContainer.getElementsByTagName("textarea")[0];
            highlighter = document.getElementById('highlighter');
        },
        onClick: function () {
            textArea.focus();
        },
        onKeyUp: function (e) {
            LexicalAnalysis.onUserCodeKeyUp(e);
            this.applyText(textArea.value);
        },
        onPaste: function (e) {
            LexicalAnalysis.onUserCodePaste(e)
        },
        replaceAll: function (txt, replace, with_this) {
            return txt.replace(new RegExp(replace, 'gm'), with_this);
        }
    }
};
const TextBoxComponent = new TextBox();