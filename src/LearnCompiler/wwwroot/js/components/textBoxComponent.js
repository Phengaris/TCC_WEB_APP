var TextBox = function () {
    var highlightedTokens = ["12. "];
    var invalidCharactersRegex = /(?!([ \.,;()+*'"><=_a-zA-Z0-9[\-\]]))./gm;
    var invalidRealRegex = /((?![0-9])\.(?![0-9]))./gm
    //var invalidCharRegex = /('(?!))./gm
    var highlighterContainer = undefined;
    var inputContainer = undefined;
    var textArea = undefined;
    var highlighter = undefined;
    return {
        applyText: function (text) {
            // parse the text:

            // replace the words by a highlighted version of the words
            var matches = [];

            matches = matches.concat(text.match(invalidCharactersRegex));
            matches = matches.concat(text.match(invalidRealRegex));
            matches = matches.filter((v, i) => matches.indexOf(v) === i);

            for (var i = 0; i < matches.length; i++) {
                text = text.split(matches[i]).join('<span>' + matches[i] + '</span>');
            }

            // replace all the line braks by <br/>, and all the double spaces by the html version &nbsp;
            text = this.replaceAll(text, '\n', '<br/>');
            text = this.replaceAll(text, ' ', '&nbsp;');
            text = this.replaceAll(text, '<span>', '<span style="background-color:#D8DFEA;">');

            // re-inject the processed text into the div
            highlighter.innerHTML = text;
        },
        init: function () {
            highlighterContainer = document.getElementById('highlighterContainer');
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