var SyntaxAnalysis = function () {
    return {
        writeInTab: function (text, lexeme = "", addTab = 0) {
            var div = document.getElementById("syntaxAnalisys");
            var row = document.createElement("div");
            if (lexeme !== "") {
                //row.className = "row"
                row.innerHTML = this.getTabs(addTab) + text + '   ➙   ' + lexeme;
            }
            else {
                row.className = "row font-weight-bold"
                row.innerHTML = this.getTabs(addTab) + text
            }
            div.appendChild(row);
        },
        removeLastRowTab: function (rowsCount) {
            var div = document.getElementById("syntaxAnalisys");
            for (var i = 0; i < rowsCount; i++) {
                div.lastChild.remove();
            }
        },
        removeRowTab: function () {
            var syntaxTabDiv = document.getElementById("syntaxAnalisys");

            if (syntaxTabDiv.childElementCount > 0) {
                var syntaxTabArray = Array.from(syntaxTabDiv.children);
                var reversedArray = syntaxTabArray.slice().reverse();

                var lastFunc = this.getLastSyntaxFunc();
                lastFunc = lastFunc.replace("ignore-", "")

                var lastBoldIndexReverted = reversedArray.findIndex(f => f.className.includes('bold') && f.textContent.includes(lastFunc));

                if (lastBoldIndexReverted === -1)
                    return;

                var index = syntaxTabArray.findIndex(f => f === reversedArray[lastBoldIndexReverted])
                
                do {
                    syntaxTabDiv.children[index].remove();
                    if (index < syntaxTabDiv.childElementCount) {
                        if (syntaxTabDiv.children[index].className.includes('bold'))
                            return;

                    }
                } while (index < syntaxTabDiv.childElementCount);
            }
        },
        getTabs: function (addTab) {
            var len = Array.from(this.getSyntaxFunc().split(";")).length + addTab;
            return "&emsp;".repeat(len);
        },
        callFunction: function (token, lexeme, fromLexic = false) {
            var func = this.getLastSyntaxFunc();
            var step = this.getLastSyntaxStep();
            var [success, hasErrors, deleteRow] = [true, false];

            if (func.includes("ignore")) {
                this.removeLastSyntaxFunc();
                this.removeLastSyntaxStep();
                func = this.getLastSyntaxFunc();
                step = this.getLastSyntaxStep();
            }
            switch (func) {
                //Declarações
                case "programa":
                    [success, hasErrors, deleteRow] = this.program(step, token, lexeme);
                    break;
                case "lista-decl":
                    [success, hasErrors, deleteRow] = this.listDeclarations(step, token, lexeme);
                    break;
                case "decl":
                    [success, hasErrors, deleteRow] = this.declaration(step, token, lexeme);
                    break;
                case "decl-const":
                    [success, hasErrors, deleteRow] = this.declareConst(step, token, lexeme);
                    break;
                case "decl-var":
                    [success, hasErrors, deleteRow] = this.declareVar(step, token, lexeme);
                    break;
                case "espec-tipo":
                    [success, hasErrors, deleteRow] = this.specifyType(step, token, lexeme);
                    break;
                case "decl-proc":
                    [success, hasErrors, deleteRow] = this.declareProc(step, token, lexeme);
                    break;
                case "decl-func":
                    [success, hasErrors, deleteRow] = this.declareFunc(step, token, lexeme);
                    break;
                case "params":
                    [success, hasErrors, deleteRow] = this.params(step, token, lexeme);
                    break;
                case "lista-param":
                    [success, hasErrors, deleteRow] = this.listParam(step, token, lexeme);
                    break;
                case "param":
                    [success, hasErrors, deleteRow] = this.param(step, token, lexeme);
                    break;
                case "mode":
                    [success, hasErrors, deleteRow] = this.mode(step, token, lexeme);
                    break;
                //Comandos
                case "bloco":
                    [success, hasErrors, deleteRow] = this.block(step, token, lexeme);
                    break;
                case "lista-com":
                    [success, hasErrors, deleteRow] = this.commandList(step, token, lexeme);
                    break;
                case "comando":
                    [success, hasErrors, deleteRow] = this.command(step, token, lexeme);
                    break;
                case "com-atrib":
                    [success, hasErrors, deleteRow] = this.commandAtrib(step, token, lexeme);
                    break;
                case "com-selecao":
                    [success, hasErrors, deleteRow] = this.commandSelection(step, token, lexeme);
                    break;
                case "com-repeticao":
                    [success, hasErrors, deleteRow] = this.commandRepetition(step, token, lexeme);
                    break;
                case "com-desvio":
                    [success, hasErrors, deleteRow] = this.commandBypass(step, token, lexeme);
                    break;
                case "com-leitura":
                    [success, hasErrors, deleteRow] = this.commandRead(step, token, lexeme);
                    break;
                case "com-escrita":
                    [success, hasErrors, deleteRow] = this.commandWrite(step, token, lexeme);
                    break;
                case "cham-proc":
                    [success, hasErrors, deleteRow] = this.callProcedure(step, token, lexeme);
                    break;
                //Expressões
                case "lista-exp":
                    [success, hasErrors, deleteRow] = this.listExp(step, token, lexeme);
                    break;
                case "exp":
                    [success, hasErrors, deleteRow] = this.expression(step, token, lexeme);
                    break;
                case "exp-soma":
                    [success, hasErrors, deleteRow] = this.expressionSum(step, token, lexeme);
                    break;
                case "exp-mult":
                    [success, hasErrors, deleteRow] = this.expressionMult(step, token, lexeme);
                    break;
                case "exp-simples":
                    [success, hasErrors, deleteRow] = this.expressionSimple(step, token, lexeme);
                    break;
                case "literal":
                    [success, hasErrors, deleteRow] = this.literal(step, token, lexeme);
                    break;
                case "cham-func":
                    [success, hasErrors, deleteRow] = this.callFunc(step, token, lexeme);
                    break;
                case "args":
                    [success, hasErrors, deleteRow] = this.arguments(step, token, lexeme);
                    break;
                case "var":
                    [success, hasErrors, deleteRow] = this.variable(step, token, lexeme);
                    break;
                case "lista-var":
                    [success, hasErrors, deleteRow] = this.listVariable(step, token, lexeme);
                    break;
                default:
            }
            if (fromLexic && !success) {
                return this.callFunction(token, lexeme, true);
            }
            return [success, hasErrors, deleteRow];
        },
        setSyntaxFunc: function (func) {
            var state = document.getElementById("state");
            state.setAttribute("syntaxFunc", func);
        },
        getSyntaxFunc: function () {
            var state = document.getElementById("state");
            return state.getAttribute("syntaxFunc");
        },
        getLastSyntaxFunc: function () {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(";");
            return splittedFunc.pop();
        },
        concatenateLastSyntaxFunc: function (func) {
            var syntaxFunc = this.getSyntaxFunc();
            if (syntaxFunc !== "")
                this.setSyntaxFunc(syntaxFunc + ";" + func);
            else
                this.setSyntaxFunc(func);
        },
        concatenateSyntaxFunc: function (func, index) {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(";");
            splittedFunc.splice(index + 1, 0, func);
            syntaxFunc = splittedFunc.join(";");
            if (syntaxFunc !== "")
                this.setSyntaxFunc(syntaxFunc);
            else
                this.setSyntaxFunc(func);
        },
        replaceLastSyntaxFunc: function (func) {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(";");
            splittedFunc.pop();
            syntaxFunc = splittedFunc.join(";");
            if (syntaxFunc !== "")
                this.setSyntaxFunc(syntaxFunc + ";" + func);
            else
                this.setSyntaxFunc(func);
        },
        ignoreLastSyntaxFunc: function () {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(";");
            var lastFunc = splittedFunc.pop();
            syntaxFunc = splittedFunc.join(";");
            if (syntaxFunc !== "")
                this.setSyntaxFunc(syntaxFunc + ";" + "ignore-" + lastFunc);
            else
                this.setSyntaxFunc("ignore-" + lastFunc);
        },
        removeLastSyntaxFunc: function () {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(";");
            splittedFunc.pop();
            this.setSyntaxFunc(splittedFunc.join(";"));
        },
        removeLast: function (success, hasErrors, deleteRow) {
            if (deleteRow)
                this.removeRowTab();
            this.removeLastSyntaxFunc();
            this.removeLastSyntaxStep();
            return [success, hasErrors, deleteRow];
        },
        setSyntaxStep: function (step) {
            var state = document.getElementById("state");
            state.setAttribute("syntaxStep", step);
        },
        getSyntaxStep: function () {
            var state = document.getElementById("state");
            return state.getAttribute("syntaxStep");
        },
        getLastSyntaxStep: function () {
            var syntaxStep = this.getSyntaxStep();
            var splittedStep = syntaxStep.split(";");
            return splittedStep.pop();
        },
        concatenateLastSyntaxStep: function (step) {
            var syntaxStep = this.getSyntaxStep();
            if (syntaxStep !== "")
                this.setSyntaxStep(syntaxStep + ";" + step);
            else
                this.setSyntaxStep(step);
        },
        concatenateSyntaxStep: function (step, index) {
            var syntaxStep = this.getSyntaxStep();
            var splittedStep = syntaxStep.split(";");
            splittedStep.splice(index + 1, 0, step);
            syntaxStep = splittedStep.join(";");
            if (syntaxStep !== "")
                this.setSyntaxStep(syntaxStep);
            else
                this.setSyntaxStep(step);
        },
        replaceLastSyntaxStep: function (step) {
            var syntaxStep = this.getSyntaxStep();
            var splittedStep = syntaxStep.split(";");
            splittedStep.pop();
            syntaxStep = splittedStep.join(";");
            if (syntaxStep !== "")
                this.setSyntaxStep(syntaxStep + ";" + step);
            else
                this.setSyntaxStep(step);
        },
        replaceSyntaxStep: function (step, index) {
            var syntaxStep = this.getSyntaxStep();
            var splittedStep = syntaxStep.split(";");
            splittedStep.splice(index, 1, step);
            syntaxStep = splittedStep.join(";");
            if (syntaxStep !== "")
                this.setSyntaxStep(syntaxStep);
            else
                this.setSyntaxStep(step);
        },
        removeLastSyntaxStep: function () {
            var syntaxStep = this.getSyntaxStep();
            var splittedStep = syntaxStep.split(";");
            splittedStep.pop();
            this.setSyntaxStep(splittedStep.join(";"));
        },
        setInitialSyntaxFuncStep: function () {
            var state = document.getElementById("state");
            state.setAttribute("syntaxFunc", "");
            state.setAttribute("syntaxStep", "1");
        },
        //Declarações
        //programa
        program: function (step, token, lexeme) {
            //lista-decl
            switch (step) {
                case "1":
                    this.writeInTab("programa");
                    this.concatenateLastSyntaxFunc("lista-decl");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração do programa. Esperava-se uma lista de declarações.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //lista-decl
        listDeclarations: function (step, token, lexeme) {
            //decl lista-decl | decl
            switch (step) {
                case "1":
                    this.writeInTab("lista-decl");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("decl");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração da lista de declarações. Esperava-se uma declaração.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    this.concatenateLastSyntaxFunc("decl");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //decl
        declaration: function (step, token, lexeme) {
            //decl-const | decl-var | decl-proc | decl-func
            switch (step) {
                case "1":
                    this.writeInTab("decl");
                    this.ignoreLastSyntaxFunc();

                    //decl-const
                    this.concatenateLastSyntaxFunc("decl-const");
                    this.concatenateLastSyntaxStep("1");
                    var [isConst, _, _] = this.callFunction(token, lexeme);

                    //decl-var
                    this.concatenateLastSyntaxFunc("decl-var");
                    this.concatenateLastSyntaxStep("1");
                    var [isVar, _, _] = this.callFunction(token, lexeme);

                    //decl-proc
                    this.concatenateLastSyntaxFunc("decl-proc");
                    this.concatenateLastSyntaxStep("1");
                    var [isProc, _, _] = this.callFunction(token, lexeme);

                    //decl-func
                    this.concatenateLastSyntaxFunc("decl-func");
                    this.concatenateLastSyntaxStep("1");
                    var [isFunc, _, _] = this.callFunction(token, lexeme);

                    if (!isConst && !isFunc && !isProc && !isVar) {
                        var error = "Erro sintático na declaração. Esperava-se uma declaração: constante, variável, procedimento ou função.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //decl-const
        declareConst: function (step, token, lexeme) {
            //CONST ID = literal;
            switch (step) {
                case "1":
                    if ("PR_CONST" === token) {
                        this.writeInTab("decl-const");
                        this.writeInTab("CONST", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de constante. Esperava-se um IDENTIFICADOR e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "3":
                    if ("OP_ATRIBUI" === token) {
                        this.writeInTab("=", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        this.concatenateLastSyntaxFunc("literal");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de constante. Esperava-se um '=' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        //Declaração de Constante esperava ';' e recebeu um lexeme
                        var error = "Erro sintático na declaração de constante. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //decl-var
        declareVar: function (step, token, lexeme) {
            //VAR espec-tipo lista-var;
            switch (step) {
                case "1":
                    if ("PR_VAR" === token) {
                        this.writeInTab("decl-var");
                        this.writeInTab("VAR", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("espec-tipo");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.concatenateLastSyntaxFunc("lista-var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme)
                    if (!success) {
                        var error = "Erro sintático na declaração de variável. Esperava-se uma lista de variáveis";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático na declaração de variável. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //espec-tipo
        specifyType: function (step, token, lexeme) {
            //INT | FLOAT | CHAR | BOOL | STRING
            switch (step) {
                case "1":
                    if (["PR_INT", "PR_FLOAT", "PR_CHAR", "PR_BOOL", "PR_STRING"]
                        .find(f => f === token)
                    ) {
                        this.writeInTab("espec-tipo", lexeme);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático na especificação de tipo. Esperava-se uma especificação de um tipo: inteiro, decimal, caractere, booleano ou string.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //decl-proc
        declareProc: function (step, token, lexeme) {
            //SUB espec-tipo ID ( params ) bloco END-SUB
            switch (step) {
                case "1":
                    if ("PR_SUB" === token) {
                        this.writeInTab("decl-proc");
                        this.writeInTab("SUB", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.concatenateLastSyntaxFunc("espec-tipo");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de procedimento. Esperava-se uma especificação de um tipo: inteiro, decimal, caractere, booleano ou string.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de procedimento. Esperava-se um IDENTIFICADOR e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("5");
                        this.concatenateLastSyntaxFunc("params");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de procedimento. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "5":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("6");
                        this.concatenateLastSyntaxFunc("bloco");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de procedimento. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "6":
                    if ("PR_END_SUB" === token) {
                        this.writeInTab("END-SUB", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático na declaração de procedimento. Esperava-se um 'ENDSUB' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //decl-func
        declareFunc: function (step, token, lexeme) {
            //FUNCTION espec-tipo ID ( params ) bloco END-FUNCTION
            switch (step) {
                case "1":
                    if ("PR_FUNCTION" === token) {
                        this.writeInTab("decl-func");
                        this.writeInTab("FUNCTION", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.concatenateLastSyntaxFunc("espec-tipo");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de função. Esperava-se uma especificação de um tipo: inteiro, decimal, caractere, booleano ou string.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de função. Esperava-se um IDENTIFICADOR e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("5");
                        this.concatenateLastSyntaxFunc("params");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de função. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "5":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("6");
                        this.concatenateLastSyntaxFunc("bloco");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de função. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "6":
                    if ("PR_END_FUNCTION" === token) {
                        this.writeInTab("END-FUNCTION", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        this.writeInTab("Erro", error, 1);
                        var error = "Erro sintático na declaração de função. Esperava-se um 'ENDFUNCTION' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //params
        params: function (step, token, lexeme) {
            //lista-param | null            
            switch (step) {
                case "1":
                    this.writeInTab("params");
                    this.ignoreLastSyntaxFunc();
                    this.concatenateLastSyntaxFunc("lista-param");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return this.removeLast(true, false, false);
                    break;
            }
        },
        //lista-param
        listParam: function (step, token, lexeme) {
            //lista-param , param | param
            switch (step) {
                case "1":
                    this.writeInTab("lista-param");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("param");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.writeInTab(",", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("param");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                default:
            }
        },
        //param
        param: function (step, token, lexeme) {
            //VAR espec-tipo lista-var BY mode
            switch (step) {
                case "1":
                    if ("PR_VAR" === token) {
                        this.writeInTab("param");
                        this.writeInTab("VAR", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("espec-tipo");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.concatenateLastSyntaxFunc("lista-var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de parâmetro. Esperava-se uma lista de variáveis.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("PR_BY" === token) {
                        this.writeInTab("BY", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de parâmetro. Esperava-se um 'BY' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    this.concatenateLastSyntaxFunc("mode");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de parâmetro.  Esperava-se uma especificação de um modo: valor ou referência.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                default:
            }
        },
        //mode
        mode: function (step, token, lexeme) {
            //VALUE | REF
            switch (step) {
                case "1":
                    if (["PR_VALUE", "PR_REF"]
                        .find(f => f === token)
                    ) {
                        this.writeInTab("mode", lexeme);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático na especificação do modo. Esperava-se uma especificação de um modo: valor ou referência.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //Comandos
        //bloco
        block: function (step, token, lexeme) {
            //lista-com
            switch (step) {
                case "1":
                    this.writeInTab("bloco");
                    this.concatenateLastSyntaxFunc("lista-com");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return this.removeLast(true, false, false);
                    break;
                default:
            }
        },
        //lista-com
        commandList: function (step, token, lexeme) {
            //comando lista-com | null
            switch (step) {
                case "1":
                    this.writeInTab("lista-com");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("comando");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    this.concatenateLastSyntaxFunc("comando");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //comando
        command: function (step, token, lexeme) {
            //cham-proc | com-atrib | com-selecao | com-repeticao | com-desvio | com-leitura | com-escrita | decl-var | decl-const
            switch (step) {
                case "1":
                    this.writeInTab("comando");
                    this.ignoreLastSyntaxFunc();

                    //cham-proc
                    this.concatenateLastSyntaxFunc("cham-proc");
                    this.concatenateLastSyntaxStep("1");
                    var [isProc, _, _] = this.callFunction(token, lexeme);

                    //com-atrib
                    this.concatenateLastSyntaxFunc("com-atrib");
                    this.concatenateLastSyntaxStep("1");
                    var [isAtrib, _, _] = this.callFunction(token, lexeme);

                    //com-selecao
                    this.concatenateLastSyntaxFunc("com-selecao");
                    this.concatenateLastSyntaxStep("1");
                    var [isSelect, _, _] = this.callFunction(token, lexeme);

                    //com-repeticao
                    this.concatenateLastSyntaxFunc("com-repeticao");
                    this.concatenateLastSyntaxStep("1");
                    var [isRepet, _, _] = this.callFunction(token, lexeme);

                    //com-desvio
                    this.concatenateLastSyntaxFunc("com-desvio");
                    this.concatenateLastSyntaxStep("1");
                    var [isByPass, _, _] = this.callFunction(token, lexeme);

                    //com-leitura
                    this.concatenateLastSyntaxFunc("com-leitura");
                    this.concatenateLastSyntaxStep("1");
                    var [isRead, _, _] = this.callFunction(token, lexeme);

                    //com-escrita
                    this.concatenateLastSyntaxFunc("com-escrita");
                    this.concatenateLastSyntaxStep("1");
                    var [isWrite, _, _] = this.callFunction(token, lexeme);

                    //decl-var
                    this.concatenateLastSyntaxFunc("decl-var");
                    this.concatenateLastSyntaxStep("1");
                    var [isVar, _, _] = this.callFunction(token, lexeme);

                    //decl-const
                    this.concatenateLastSyntaxFunc("decl-const");
                    this.concatenateLastSyntaxStep("1");
                    var [isConst, _, _] = this.callFunction(token, lexeme);

                    if (!isAtrib && !isByPass && !isConst && !isProc && !isRead && !isRepet && !isSelect && !isVar && !isWrite) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //com-atrib 
        commandAtrib: function (step, token, lexeme) {
            //var = exp ;
            switch (step) {
                case "1":
                    this.writeInTab("com-atrib");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if ("OP_ATRIBUI" === token) {
                        this.writeInTab("=", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, true);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.concatenateLastSyntaxFunc("exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de atribuição. Esperava-se uma expressão.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de atribuição. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //com-selecao
        commandSelection: function (step, token, lexeme) {
            //IF exp THEN bloco END-IF | IF exp THEN bloco ELSE bloco END-IF
            switch (step) {
                case "1":
                    if ("PR_IF" === token) {
                        this.writeInTab("com-selecao");
                        this.writeInTab("IF", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("PR_THEN" === token) {
                        this.writeInTab("THEN", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateLastSyntaxFunc("bloco");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de seleção. Esperava-se um 'THEN' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "3":
                    if ("PR_END_IF" === token) {
                        this.writeInTab("END-IF", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else if ("PR_THEN" === token) {
                        this.writeInTab("THEN", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        this.concatenateLastSyntaxFunc("bloco");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de seleção. Esperava-se um 'THEN' ou um 'ENDIF' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("PR_END_IF" === token) {
                        this.writeInTab("END-IF", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de seleção. Esperava-se um 'ENDIF' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //com-repeticao
        commandRepetition: function (step, token, lexeme) {
            //WHILE exp DO bloco LOOP | DO bloco WHILE exp ; | REPEAT bloco UNTIL exp ; | FOR ID = exp-soma TO exp-soma DO bloco NEXT
            switch (step) {
                case "1":
                    if ("PR_WHILE" === token) {
                        this.writeInTab("com-repeticao");
                        this.writeInTab("WHILE", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    }
                    else if ("PR_DO" === token) {
                        this.writeInTab("com-repeticao");
                        this.writeInTab("DO", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        this.concatenateLastSyntaxFunc("bloco");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    }
                    else if ("PR_REPEAT" === token) {
                        this.writeInTab("com-repeticao");
                        this.writeInTab("REPEAT", lexeme, 1);
                        this.replaceLastSyntaxStep("6");
                        this.concatenateLastSyntaxFunc("bloco");
                        this.concatenateLastSyntaxStep("1");
                        return true;
                    }
                    else if ("PR_FOR" === token) {
                        this.writeInTab("com-repeticao");
                        this.writeInTab("FOR", lexeme, 1);
                        this.replaceLastSyntaxStep("7");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("PR_DO" === token) {
                        this.writeInTab("DO", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateLastSyntaxFunc("bloco");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var func = this.getSyntaxFunc();
                        var indexOfLastRepeatCommand = func.split(';').findIndex(f => f === 'com-repeticao');
                        if (indexOfLastRepeatCommand > -1) {
                            var steps = this.getSyntaxStep();
                            var splittedSteps = steps.split(';');
                            if (splittedSteps[indexOfLastRepeatCommand] === "4") {

                                this.replaceSyntaxStep("5", indexOfLastRepeatCommand);
                            }
                        } else {
                            var error = "Erro sintático no comando de repetição. Esperava-se um 'DO' e recebeu o valor '" + lexeme + "'.";
                            this.writeInTab("Erro", error, 1);
                            return this.removeLast(false, true, false);
                        }
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    if ("PR_LOOP" === token) {
                        this.writeInTab("LOOP", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'LOOP' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("PR_WHILE" === token) {
                        this.writeInTab("WHILE", lexeme, 1);
                        this.replaceLastSyntaxStep("5");
                        this.concatenateLastSyntaxFunc("exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'WHILE' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "5":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "6":
                    if ("PR_UNTIL" === token) {
                        this.writeInTab("UNTIL", lexeme, 1);
                        this.replaceLastSyntaxStep("5");
                        this.concatenateLastSyntaxFunc("exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'UNTIL' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "7":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("8");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um IDENTIFICADOR e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "8":
                    if ("OP_ATRIBUI" === token) {
                        this.writeInTab("=", lexeme, 1);
                        this.replaceLastSyntaxStep("9");
                        this.concatenateLastSyntaxFunc("exp-soma");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um '=' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "9":
                    if ("PR_TO" === token) {
                        this.writeInTab("TO", lexeme, 1);
                        this.replaceLastSyntaxStep("10");
                        this.concatenateLastSyntaxFunc("exp-soma");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'TO' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "10":
                    if ("PR_DO" === token) {
                        this.writeInTab("DO", lexeme, 1);
                        this.replaceLastSyntaxStep("11");
                        this.concatenateLastSyntaxFunc("bloco");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'DO' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "11":
                    if ("PR_NEXT" === token) {
                        this.writeInTab("NEXT", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'NEXT' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //com-desvio
        commandBypass: function (step, token, lexeme) {
            //RETURN exp ; | BREAK ; | CONTINUE ;
            switch (step) {
                case "1":
                    if ("PR_RETURN" === token) {
                        this.writeInTab("com-desvio");
                        this.writeInTab("RETURN", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else if ("PR_BREAK" === token) {
                        this.writeInTab("com-desvio");
                        this.writeInTab("BREAK", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];

                    } else if ("PR_CONTINUE" === token) {
                        this.writeInTab("com-desvio");
                        this.writeInTab("CONTINUE", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de desvio. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //com-leitura
        commandRead: function (step, token, lexeme) {
            //SCAN ( lista-var ) ; | SCANLN ( lista-var ) ;
            switch (step) {
                case "1":
                    if ("PR_SCAN" === token) {
                        this.writeInTab("com-leitura");
                        this.writeInTab("SCAN", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];

                    } else if ("PR_SCAN_LN" === token) {
                        this.writeInTab("com-leitura");
                        this.writeInTab("SCANLN", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];

                    } else {
                        return this.removeLast(false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateLastSyntaxFunc("lista-var");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];

                    } else {
                        var error = "Erro sintático no comando de leitura. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de leitura. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de leitura. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //com-escrita
        commandWrite: function (step, token, lexeme) {
            //PRINT ( lista-exp ) ; | PRINTLN ( lista-exp ) ;
            switch (step) {
                case "1":
                    if ("PR_PRINT" === token) {
                        this.writeInTab("com-escrita");
                        this.writeInTab("PRINT", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else if ("PR_PRINT_LN" === token) {
                        this.writeInTab("com-escrita");
                        this.writeInTab("PRINTLN", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateLastSyntaxFunc("lista-exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de escrita. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de escrita. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de escrita. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //cham-proc
        callProcedure: function (step, token, lexeme) {
            //ID ( args ) ;
            switch (step) {
                case "1":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("cham-proc");
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateLastSyntaxFunc("args");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, true);
                    }
                    break;
                case "3":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de chamar procedimento. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de chamar procedimento. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //Expressões
        //lista-exp
        listExp: function (step, token, lexeme) {
            //exp , lista-exp | exp
            switch (step) {
                case "1":
                    this.writeInTab("lista-exp");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.writeInTab(",", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                default:
            }
        },
        //exp
        expression: function (step, token, lexeme) {
            //exp-soma op-relac exp-soma | exp-soma
            switch (step) {
                case "1":
                    this.writeInTab("exp");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if (this.relacionalOp().find(f => f === token)) {
                        this.writeInTab("op-relac", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de expressão. Esperava-se uma expressão de soma.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //op-relac
        relacionalOp: function () {
            //<= | < | > | >= | == | <>
            return ["OP_MENOR_IGUAL", "OP_MENOR", "OP_MAIOR", "OP_MAIOR_IGUAL", "OP_IGUAL", "OP_DIFERENTE"];
        },
        //exp-soma
        expressionSum: function (step, token, lexeme) {
            //exp-mult op-soma exp-soma | exp-mult
            switch (step) {
                case "1":
                    this.writeInTab("exp-soma");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("exp-mult");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if (this.sumOp().find(f => f === token)) {
                        this.writeInTab("op-soma", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de expressão de soma. Esperava-se uma expressão de soma.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //op-soma
        sumOp: function () {
            //+ | - | OR
            return ["OP_SOMA", "OP_SUBTRAI", "PR_OR"];
        },
        //exp-mult
        expressionMult: function (step, token, lexeme) {
            //exp-mult op-mult exp-simples | exp-simples
            switch (step) {
                case "1":
                    this.writeInTab("exp-mult");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("exp-simples");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if (this.multiplicationOp().find(f => f === token)) {
                        this.writeInTab("op-mult", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("exp-simples");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de expressão de multiplicação. Esperava-se uma expressão simples.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //op-mult
        multiplicationOp: function (step, token, lexeme) {
            //* | / | DIV | MOD | AND
            return ["OP_MULTI", "OP_DIVI", "PR_DIV", "PR_AND"];
        },
        //exp-simples
        expressionSimple: function (step, token, lexeme) {
            //( exp ) | var | cham-func | literal | op-unario exp
            switch (step) {
                case "1":
                    this.writeInTab("exp-simples");
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else if (this.unaryOp().find(f => f === token)) {
                        this.writeInTab("op-unario", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateLastSyntaxFunc("exp");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        this.ignoreLastSyntaxFunc();
                        //var
                        this.concatenateLastSyntaxFunc("var");
                        this.concatenateLastSyntaxStep("1");
                        var [isVar, _, _] = this.callFunction(token, lexeme);

                        //cham-func
                        this.concatenateLastSyntaxFunc("cham-func");
                        this.concatenateLastSyntaxStep("1");
                        var [isFunc, _, _] = this.callFunction(token, lexeme);

                        //literal
                        this.concatenateLastSyntaxFunc("literal");
                        this.concatenateLastSyntaxStep("1");
                        var [isLiteral, _, _] = this.callFunction(token, lexeme);

                        if (!isVar && !isFunc && !isLiteral) {
                            return this.removeLast(false, false, true);
                        }
                        return [true, false, false];
                    }
                    break;
                case "2":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de expressão simples. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "3":
                    return this.removeLast(true, false, false);
                    break;
                default:
            }
        },
        //literal
        literal: function (step, token, lexeme) {
            //NUMINT | NUMREAL | CARACTERE | STRING | valor-verdade
            switch (step) {
                case "1":
                    if (["NUM_INT", "NUM_REAL", "CARACTERE", "STRING"]
                        .concat(this.booleanValue())
                        .find(f => f === token)
                    ) {
                        this.writeInTab("literal", lexeme);
                        return this.removeLast(true, false, false);
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                default:
            }
        },
        //valor-verdade
        booleanValue: function () {
            //TRUE | FALSE
            return ["PR_TRUE", "PR_FALSE"];
        },
        //cham-func
        callFunc: function (step, token, lexeme) {
            //ID ( args ) *added ;
            switch (step) {
                case "1":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("cham-func");
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateLastSyntaxFunc("args");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, true);
                    }
                    break;
                case "3":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de chamada de função. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de chamada de função. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //args
        arguments: function (step, token, lexeme) {
            //lista-exp | null
            switch (step) {
                case "1":
                    this.writeInTab("args");
                    this.ignoreLastSyntaxFunc();
                    this.concatenateLastSyntaxFunc("lista-exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, step);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return this.removeLast(true, false, false);
                    break;
                default:
            }
        },
        //var
        variable: function (step, token, lexeme) {
            //ID | ID [ exp-soma ]
            switch (step) {
                case "1":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("var");
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_COL_A" === token) {
                        this.writeInTab("[", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateLastSyntaxFunc("exp-soma");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    if ("SIN_COL_F" === token) {
                        this.writeInTab("]", lexeme, 1);
                        return this.removeLast(true, false, false);
                    } else {
                        var error = "Erro sintático no comando de variável. Esperava-se um ']' e recebeu o valor '" + lexeme + "'.";
                        this.writeInTab("Erro", error, 1);
                        return this.removeLast(false, true, false);
                    }
                    break;
                default:
            }
        },
        //list-var
        listVariable: function (step, token, lexeme) {
            //var , lista-var | var
            switch (step) {
                case "1":
                    this.writeInTab("lista-var");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateLastSyntaxFunc("var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.writeInTab(",", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateLastSyntaxFunc("var");
                        this.concatenateLastSyntaxStep("1");
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                default:
            }
        },
        //list-var
        unaryOp: function () {
            //+ | - | NOT
            return ["OP_SOMA", "OP_SUBTRAI", "PR_NOT"];
        }
    }
};
const SyntaxAnalysisController = new SyntaxAnalysis();