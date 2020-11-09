var SymbolTable = function () {
    return {
        scrollBottom: function () {
            var symbolTable = document.getElementById("symbolTableContent");
            symbolTable.scrollTop = symbolTable.scrollHeight;
        },
        add: function () {
            var symbolTable = document.getElementById("symbolTable");
            var tbody = symbolTable.getElementsByTagName("tbody");
            var trTokenLexeme = document.createElement("tr");

            var tdToken = document.createElement("td");
            tdToken.textContent = LexicalAnalysis.getToken();
            trTokenLexeme.appendChild(tdToken);

            var tdLexeme = document.createElement("td");
            tdLexeme.textContent = LexicalAnalysis.getWord();
            trTokenLexeme.appendChild(tdLexeme);

            tbody[0].appendChild(trTokenLexeme);
        },
        clear: function () {
            var symbolTable = document.getElementById("symbolTable");
            var tbody = symbolTable.getElementsByTagName("tbody");
            for (var i = tbody[0].childElementCount - 1; i >= 0; --i) {
                tbody[0].children[i].remove();
            }
        },
        delete: function () {
            var symbolTable = document.getElementById("symbolTable");
            var tbody = symbolTable.getElementsByTagName("tbody");
            tbody[0].removeChild(tbody[0].lastChild);
        }
    }
};
const SymbolTableController = new SymbolTable();