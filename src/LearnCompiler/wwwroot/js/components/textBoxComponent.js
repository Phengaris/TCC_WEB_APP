var TextBox = function () {
    var invalidRegex = /((?![0-9])\.(?![0-9]))|([^0-9]\.[0-9])|([0-9]\.(?![0-9]))|[^ \.,/;()+*'"><=_a-zA-Z0-9[\-\]\n]+/gm;
    var invalidCharRegex = /('[^']{0,1}?')|('(?![^']{0,1}?').)/gm;
    var stringRegex = /"(?:[^"\\]|\\.)*"/;
    var blockCommentRegex = /[/][*](?:(?![*][/])|.)*[*][/]/;
    var lineCommentRegex = /[/][/].*/;
    var charRegex = /'[^']{0,1}?'/gm;
    var inputContainer = undefined;
    var textArea = undefined;
    var highlighter = undefined;
    return {
        applyText: function (text) {
            var matches = [];

            matches = matches.concat(text.match(invalidRegex));
            matches = matches.concat(text.match(invalidCharRegex));
            matches = matches.filter((v, i) => matches.indexOf(v) === i && v !== null && !v.match(charRegex));

            for (var i = 0; i < matches.length; i++) {
                text = text.split(matches[i]).join('<span>' + matches[i] + '</span>');
            }

            matches = [];
            matches = matches.concat(text.match(stringRegex));
            matches = matches.concat(text.match(blockCommentRegex));
            matches = matches.concat(text.match(lineCommentRegex));
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
        getEntireCode: function () {
            return document.getElementById("state").getAttribute("entire_code");
        },
        getEntireCurrentCode: function () {
            return document.getElementById("userCode").value;
        },
        onBackspace: function () {
            var entireCodeBefore = this.getEntireCode();
            var entireCodeCurrent = this.getEntireCurrentCode();
            if (entireCodeCurrent === "") {
                LexicalAnalysis.clearLexicalAnalysis();
                ErrorManager.clearErrors();
                SymbolTableController.clear();
                SyntaxAnalysisController.clear();
            }
            else {
                if (entireCodeBefore.indexOf(entireCodeCurrent) === 0) {
                    LexicalAnalysis.backspaceEvent();
                } else {
                    document.getElementById("recompileButton").removeAttribute("hidden");
                }
            }
        },
        onClick: function () {
            textArea.focus();
        },
        onKeyUp: function (e) {
            var key = e.key;
            if (e.ctrlKey)
                return;

            if (key === "Backspace") {
                this.onBackspace();
            } else if (key === "Enter" || key.length === 1) {
                if (!document.getElementById("recompileButton").hasAttribute("hidden"))
                    return;

                var entireCodeBefore = this.getEntireCode();
                var entireCodeCurrent = this.getEntireCurrentCode();
                if (entireCodeCurrent.indexOf(entireCodeBefore) !== 0) {
                    document.getElementById("recompileButton").removeAttribute("hidden");
                    return;
                }
                LexicalAnalysis.onUserCodeKeyUp(key);
            }
            this.applyText(textArea.value);
            SyntaxAnalysisController.scrollBottom();
            SymbolTableController.scrollBottom();
            ErrorManager.scrollBottom();
        },
        onPaste: function (e) {
            if (!document.getElementById("recompileButton").hasAttribute("hidden"))
                return;

            if (this.getEntireCurrentCode().length !== 0) {
                document.getElementById("recompileButton").removeAttribute("hidden");
                return;
            }
            var code = (e.originalEvent || e).clipboardData.getData('text/plain');
            LexicalAnalysis.analyseEntireCode(code);
        },
        onRecompileClick: function () {
            LexicalAnalysis.clearLexicalAnalysis();
            ErrorManager.clearErrors();
            SyntaxAnalysisController.clearSyntaxAnalysis();
            SymbolTableController.clear();
            var entireCode = this.getEntireCurrentCode();
            LexicalAnalysis.analyseEntireCode(entireCode);
            document.getElementById("recompileButton").setAttribute("hidden", "hidden");
        },
        replaceAll: function (txt, replace, with_this) {
            return txt.replace(new RegExp(replace, 'gm'), with_this);
        }
    }
};
const TextBoxComponent = new TextBox();