var SyntaxAnalysis = function () {
    return {
        writeInTab: function (token = "", text, lexeme = "", addTab = 0) {
            var func = this.getLastSyntaxFunc(true);
            var step = this.getLastSyntaxStep();

            var allFuncs = this.getSyntaxFunc();
            var allSteps = this.getSyntaxStep();

            var div = document.getElementById("syntaxAnalisysContent");
            var row = document.createElement("div");
            row.setAttribute("syntaxFunc", func);
            row.setAttribute("SyntaxStep", step);
            row.setAttribute("syntaxFuncs", allFuncs);
            row.setAttribute("SyntaxSteps", allSteps);
            row.setAttribute("token", token);

            if (text === "hidden") {
                row.className = "hidden";
            }
            else if (lexeme !== "") {
                row.innerHTML = this.getTabs(addTab) + text + '   ➙   ' + lexeme;
            }
            else {
                row.className = "font-weight-bold"
                row.innerHTML = this.getTabs(addTab) + text
            }
            div.appendChild(row);
        },
        removeRowTab: function () {
            var syntaxTabDiv = document.getElementById("syntaxAnalisysContent");

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
                        var s = syntaxTabDiv.children[index].getAttribute("syntaxFunc").split('/');
                        if (s.findIndex(f => f === lastFunc) !== (s.length - 1))
                            return;

                    }
                } while (index < syntaxTabDiv.childElementCount);
            }
        },
        removeTab: function () {
            var syntaxTabDiv = document.getElementById("syntaxAnalisysContent");

            if (syntaxTabDiv.childElementCount > 0) {
                var syntaxTabArray = Array.from(syntaxTabDiv.children);
                var reversedArray = syntaxTabArray.slice().reverse();

                var lastFunc = this.getLastSyntaxFunc();
                lastFunc = lastFunc.replace("ignore-", "")

                var lastBoldIndexReverted = reversedArray.findIndex(f => f.className.includes('bold') && f.textContent.includes(lastFunc));

                if (lastBoldIndexReverted === -1)
                    return;

                var index = syntaxTabArray.findIndex(f => f === reversedArray[lastBoldIndexReverted]) - 1;

                syntaxTabDiv.children[index].remove();
                syntaxTabDiv.children[index].remove();
                do {
                    if (index < syntaxTabDiv.childElementCount) {
                        var innerHtml = syntaxTabDiv.children[index].innerHTML;
                        syntaxTabDiv.children[index].innerHTML = innerHtml.substring(3, innerHtml.length);
                        ++index;
                    }

                } while (index < syntaxTabDiv.childElementCount);
            }
        },
        getTabs: function (addTab) {
            var len = Array.from(this.getSyntaxFunc().split(",")).length + addTab;
            return "&emsp;".repeat(len);
        },
        setSyntaxFunc: function (func) {
            var state = document.getElementById("state");
            state.setAttribute("syntaxFunc", func);
        },
        getSyntaxFunc: function () {
            var state = document.getElementById("state");
            return state.getAttribute("syntaxFunc");
        },
        getLastSyntaxFunc: function (withParent = false) {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(",");
            var lastFunc = splittedFunc.pop();
            if (withParent)
                return lastFunc;
            return lastFunc.split("/").pop();
        },
        concatenateLastSyntaxFunc: function (func) {
            var syntaxFunc = this.getSyntaxFunc();
            if (syntaxFunc !== "")
                this.setSyntaxFunc(syntaxFunc + "," + func);
            else
                this.setSyntaxFunc(func);
        },
        replaceLastSyntaxFunc: function (func) {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(",");
            splittedFunc.pop();
            syntaxFunc = splittedFunc.join(",");
            if (syntaxFunc !== "")
                this.setSyntaxFunc(syntaxFunc + "," + func);
            else
                this.setSyntaxFunc(func);
        },
        ignoreLastSyntaxFunc: function () {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(",");
            var lastFunc = splittedFunc.pop().split("/");
            syntaxFunc = splittedFunc.join(",");
            if (syntaxFunc !== "") {
                var ignoreFunc = "/ignore-" + lastFunc.pop();
                lastFunc = lastFunc.join('/');
                this.setSyntaxFunc(syntaxFunc + "," + lastFunc + ignoreFunc);
            }
            else
                this.setSyntaxFunc("ignore-" + lastFunc.pop());
        },
        removeLastSyntaxFunc: function () {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(",");
            splittedFunc.pop();
            var joinedFunc = splittedFunc.join(",");
            if (joinedFunc === "")
                this.setSyntaxFunc("programa");
            else
                this.setSyntaxFunc(joinedFunc);
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
            state.setAttribute("SyntaxStep", step);
        },
        getSyntaxStep: function () {
            var state = document.getElementById("state");
            return state.getAttribute("SyntaxStep");
        },
        getLastSyntaxStep: function () {
            var SyntaxStep = this.getSyntaxStep();
            var splittedStep = SyntaxStep.split(",");
            var lastStep = splittedStep.pop();
            return lastStep;
        },
        concatenateLastSyntaxStep: function (step) {
            var SyntaxStep = this.getSyntaxStep();
            if (SyntaxStep !== "")
                this.setSyntaxStep(SyntaxStep + "," + step);
            else
                this.setSyntaxStep(step);
        },
        replaceLastSyntaxStep: function (step) {
            var SyntaxStep = this.getSyntaxStep();
            var splittedStep = SyntaxStep.split(",");
            splittedStep.pop();
            SyntaxStep = splittedStep.join(",");
            if (SyntaxStep !== "")
                this.setSyntaxStep(SyntaxStep + "," + step);
            else
                this.setSyntaxStep(step);
        },
        replaceSyntaxStep: function (step, index) {
            var SyntaxStep = this.getSyntaxStep();
            var splittedStep = SyntaxStep.split(",");
            splittedStep.splice(index, 1, step);
            SyntaxStep = splittedStep.join(",");
            if (SyntaxStep !== "")
                this.setSyntaxStep(SyntaxStep);
            else
                this.setSyntaxStep(step);
        },
        removeLastSyntaxStep: function () {
            var SyntaxStep = this.getSyntaxStep();
            var splittedStep = SyntaxStep.split(",");
            splittedStep.pop();
            var joinedStep = splittedStep.join(",");
            if (joinedStep === "")
                this.setSyntaxStep("1");
            else
                this.setSyntaxStep(joinedStep);
        },
        backspaceEvent: function (token) {
            var syntaxTabDiv = document.getElementById("syntaxAnalisysContent");

            if (syntaxTabDiv.childElementCount > 0) {
                var syntaxTabArray = Array.from(syntaxTabDiv.children);
                var reversedArray = syntaxTabArray.slice().reverse();

                var lastRowIndexReverted = reversedArray.findIndex(f => f.getAttribute("token") === token);

                if (lastRowIndexReverted === -1)
                    return;

                var index = syntaxTabArray.findIndex(f => f === reversedArray[lastRowIndexReverted]);

                var element = syntaxTabDiv.children[index];
                var func = element.getAttribute("syntaxFunc").split('/');
                var lastFunc = func.pop();

                do {
                    if (index >= 0 && index < syntaxTabDiv.childElementCount) {
                        if (index >= 0 && index < syntaxTabDiv.childElementCount) {
                            var newElement = syntaxTabDiv.children[index];
                            var newFunc = newElement.getAttribute("syntaxFunc").split('/');
                            var newLastFunc = newFunc.pop();

                            if (lastFunc === newLastFunc && token === newElement.getAttribute("token")) {
                                syntaxTabDiv.children[index].remove();
                            } else {
                                lastFunc = func.pop();
                                if (lastFunc === newLastFunc && token === newElement.getAttribute("token")) {
                                    syntaxTabDiv.children[index].remove();
                                    this.removeLastSyntaxFunc();
                                    this.removeLastSyntaxStep();
                                }
                                else
                                    break;
                            }
                        }
                        else
                            break;
                        --index;
                    }
                } while (index >= 0 && index < syntaxTabDiv.childElementCount);

                if (syntaxTabDiv.childElementCount === 0) {
                    this.setSyntaxFunc("programa");
                    this.setSyntaxStep("1");
                }
                else {
                    this.setSyntaxFunc(newElement.getAttribute("syntaxFuncs"));
                    this.setSyntaxStep(newElement.getAttribute("SyntaxSteps"));
                }
            }
        },
        clearSyntaxAnalysis: function () {
            this.setSyntaxFunc("programa");
            this.setSyntaxStep("1");

            var div = document.getElementById("syntaxAnalisysContent");

            for (var i = div.childElementCount - 1; i >= 0; --i) {
                div.children[i].remove();
            }
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
                case "decl-main":
                    [success, hasErrors, deleteRow] = this.declareMain(step, token, lexeme);
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
            if (fromLexic && !success && !hasErrors) {
                return this.callFunction(token, lexeme, true);
            }
            return [success, hasErrors, deleteRow];
        },
        //Declarações
        //programa
        program: function (step, token, lexeme) {
            //lista-decl
            switch (step) {
                case "1":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "programa");
                    this.concatenateLastSyntaxFunc("programa/lista-decl");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "2":
                    return this.removeLast(false, false, false)
                    break;
                default:
            }
        },
        //lista-decl
        listDeclarations: function (step, token, lexeme) {
            //decl lista-decl | decl
            switch (step) {
                case "1":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "lista-decl");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "2":
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl");
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
                    var originalLastFunc = this.getLastSyntaxFunc(true);
                    this.ignoreLastSyntaxFunc();

                    this.writeInTab(token, "decl");

                    //decl-const
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl-const");
                    this.concatenateLastSyntaxStep("1");
                    var [isConst, _, _] = this.callFunction(token, lexeme);

                    //decl-var
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl-var");
                    this.concatenateLastSyntaxStep("1");
                    var [isVar, _, _] = this.callFunction(token, lexeme);

                    //decl-proc
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl-proc");
                    this.concatenateLastSyntaxStep("1");
                    var [isProc, _, _] = this.callFunction(token, lexeme);

                    //decl-func
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl-func");
                    this.concatenateLastSyntaxStep("1");
                    var [isFunc, _, _] = this.callFunction(token, lexeme);

                    //decl-main
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl-main");
                    this.concatenateLastSyntaxStep("1");
                    var [isMain, _, _] = this.callFunction(token, lexeme);

                    if (!isConst && !isFunc && !isProc && !isVar && !isVar && !isMain) {
                        var error = "Erro sintático na declaração. Esperava-se uma declaração: constante, variável, procedimento ou função.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        this.replaceLastSyntaxFunc(originalLastFunc);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //decl-main
        declareMain: function (step, token, lexeme) {
            //MAIN ( ) bloco END
            switch (step) {
                case "1":
                    if ("PR_MAIN" === token) {
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "decl-main");
                        this.writeInTab(token, "MAIN", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "(", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração da função principal. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "3":
                    if ("SIN_PAR_F" === token) {
                        this.replaceLastSyntaxStep("4");
                        this.writeInTab(token, ")", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração da função principal. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "4":
                    this.replaceLastSyntaxStep("5");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "5":
                    if ("PR_END" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "END", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático na declaração da função principal. Esperava-se um END e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "decl-const");
                        this.writeInTab(token, "CONST", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("IDENTIFICADOR" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "ID", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de constante. Esperava-se um IDENTIFICADOR e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "3":
                    if ("OP_ATRIBUI" === token) {
                        this.replaceLastSyntaxStep("4");
                        this.writeInTab(token, "=", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de constante. Esperava-se um '=' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "4":
                    this.replaceLastSyntaxStep("5");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/literal");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de constante. Esperava-se um literal.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "5":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático na declaração de constante. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "decl-var");
                        this.writeInTab(token, "VAR", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/espec-tipo");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de variável. Esperava-se uma especificação de tipo.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "3":
                    this.writeInTab("", "hidden");
                    this.replaceLastSyntaxStep("4");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/lista-var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme)
                    if (!success) {
                        var error = "Erro sintático na declaração de variável. Esperava-se uma lista de variáveis";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático na declaração de variável. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "espec-tipo", lexeme, 1);
                        return result;
                    }
                    return this.removeLast(false, false, false);
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "decl-proc");
                        this.writeInTab(token, "SUB", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/espec-tipo");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de procedimento. Esperava-se uma especificação de um tipo.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("IDENTIFICADOR" === token) {
                        this.replaceLastSyntaxStep("4");
                        this.writeInTab(token, "ID", lexeme, 1);
                        return [true, false, false];
                    } else {
                        this.writeInTab("", "hidden");
                        var error = "Erro sintático na declaração de procedimento. Esperava-se um IDENTIFICADOR e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "4":
                    if ("SIN_PAR_A" === token) {
                        this.replaceLastSyntaxStep("5");
                        this.writeInTab(token, "(", lexeme, 1);
                        return [true, false, false];
                    } else {
                        this.writeInTab("", "hidden");
                        var error = "Erro sintático na declaração de procedimento. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "5":
                    this.replaceLastSyntaxStep("6");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/params");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    return [success, false, false];
                    break;
                case "6":
                    if ("SIN_PAR_F" === token) {
                        this.replaceLastSyntaxStep("7");
                        this.writeInTab(token, ")", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de procedimento. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "7":
                    this.replaceLastSyntaxStep("8");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "8":
                    if ("PR_END_SUB" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "END-SUB", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático na declaração de procedimento. Esperava-se um 'ENDSUB' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "decl-func");
                        this.writeInTab(token, "FUNCTION", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/espec-tipo");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de função. Esperava-se uma especificação de um tipo.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("IDENTIFICADOR" === token) {
                        this.replaceLastSyntaxStep("4");
                        this.writeInTab(token, "ID", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de função. Esperava-se um IDENTIFICADOR e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "4":
                    if ("SIN_PAR_A" === token) {
                        this.replaceLastSyntaxStep("5");
                        this.writeInTab(token, "(", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de função. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "5":
                    this.replaceLastSyntaxStep("6");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/params");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    return [success, false, false];
                    break;
                case "6":
                    if ("SIN_PAR_F" === token) {
                        this.replaceLastSyntaxStep("7");
                        this.writeInTab(token, ")", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de função. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "7":
                    this.replaceLastSyntaxStep("8");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "8":
                    if ("PR_END_FUNCTION" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "END-FUNCTION", lexeme, 2);
                        return result;
                    } else {
                        this.writeInTab(token, "Erro", error, 1);
                        var error = "Erro sintático na declaração de função. Esperava-se um 'ENDFUNCTION' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                    this.ignoreLastSyntaxFunc();
                    this.writeInTab(token, "params");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/lista-param");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
            }
        },
        //lista-param
        listParam: function (step, token, lexeme) {
            //lista-param , param | param
            switch (step) {
                case "1":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "lista-param");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/param");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, ",", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/param");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na lista de parâmetros. Esperava-se um parâmetro.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "param");
                        this.writeInTab(token, "VAR", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/espec-tipo");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de parâmetro. Esperava-se uma especificação de um tipo.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/lista-var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de parâmetro. Esperava-se uma lista de variáveis.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "4":
                    if ("PR_BY" === token) {
                        this.replaceLastSyntaxStep("5");
                        this.writeInTab(token, "BY", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático na declaração de parâmetro. Esperava-se um 'BY' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "5":
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/mode");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na declaração de parâmetro. Esperava-se um modo.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    var result = this.removeLast(true, false, false);
                    this.writeInTab(token, "hidden");
                    return result;
                    break;
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
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "mode", lexeme, 1);
                        return result;
                    }
                    return this.removeLast(false, false, false);
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
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "bloco");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/lista-com");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    return this.removeLast(false, false, false);
                    break;
                default:
            }
        },
        //lista-com
        commandList: function (step, token, lexeme) {
            //comando lista-com | null
            switch (step) {
                case "1":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "lista-com");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/comando");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/comando");
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
                    this.ignoreLastSyntaxFunc();
                    this.writeInTab(token, "comando");

                    //cham-proc
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/cham-proc");
                    this.concatenateLastSyntaxStep("1");
                    var [isProc, _, _] = this.callFunction(token, lexeme);

                    //com-atrib
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/com-atrib");
                    this.concatenateLastSyntaxStep("1");
                    var [isAtrib, _, _] = this.callFunction(token, lexeme);

                    //com-selecao
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/com-selecao");
                    this.concatenateLastSyntaxStep("1");
                    var [isSelect, _, _] = this.callFunction(token, lexeme);

                    //com-repeticao
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/com-repeticao");
                    this.concatenateLastSyntaxStep("1");
                    var [isRepet, _, _] = this.callFunction(token, lexeme);

                    //com-desvio
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/com-desvio");
                    this.concatenateLastSyntaxStep("1");
                    var [isByPass, _, _] = this.callFunction(token, lexeme);

                    //com-leitura
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/com-leitura");
                    this.concatenateLastSyntaxStep("1");
                    var [isRead, _, _] = this.callFunction(token, lexeme);

                    //com-escrita
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/com-escrita");
                    this.concatenateLastSyntaxStep("1");
                    var [isWrite, _, _] = this.callFunction(token, lexeme);

                    //decl-var
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl-var");
                    this.concatenateLastSyntaxStep("1");
                    var [isVar, _, _] = this.callFunction(token, lexeme);

                    //decl-const
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/decl-const");
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
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "com-atrib");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if ("OP_ATRIBUI" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "=", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, true);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de atribuição. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de atribuição. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "com-selecao");
                        this.writeInTab(token, "IF", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de seleção. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("PR_THEN" === token) {
                        this.replaceLastSyntaxStep("4");
                        this.writeInTab(token, "THEN", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de seleção. Esperava-se um 'THEN' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "4":
                    this.replaceLastSyntaxStep("5");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "5":
                    if ("PR_END_IF" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "END-IF", lexeme, 2);
                        return result;
                    }
                    else if ("PR_ELSE" === token) {
                        this.replaceLastSyntaxStep("6");
                        this.writeInTab(token, "ELSE", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de seleção. Esperava-se um 'ELSE' ou um 'ENDIF' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "6":
                    this.replaceLastSyntaxStep("7");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "7":
                    if ("PR_END_IF" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "END-IF", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de seleção. Esperava-se um 'ENDIF' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "com-repeticao");
                        this.writeInTab(token, "WHILE", lexeme, 1);
                        return [true, false, false];
                    }
                    else if ("PR_DO" === token) {
                        this.replaceLastSyntaxStep("6");
                        this.writeInTab(token, "com-repeticao");
                        this.writeInTab(token, "DO", lexeme, 1);
                        return [true, false, false];
                    }
                    else if ("PR_REPEAT" === token) {
                        this.replaceLastSyntaxStep("10");
                        this.writeInTab(token, "com-repeticao");
                        this.writeInTab(token, "REPEAT", lexeme, 1);
                        return [true, false, false];
                    }
                    else if ("PR_FOR" === token) {
                        this.replaceLastSyntaxStep("14");
                        this.writeInTab(token, "com-repeticao");
                        this.writeInTab(token, "FOR", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de repetição. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("PR_DO" === token) {
                        this.replaceLastSyntaxStep("4");
                        this.writeInTab(token, "DO", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var func = this.getSyntaxFunc();
                        var correspondingItems = func.split(';').map((f, i) => {
                            if (f.split('/').pop() === 'com-repeticao') return i;
                            return -1;
                        });
                        correspondingItems = correspondingItems.filter(f => f !== -1);
                        var indexOfLastRepeatCommand = correspondingItems[correspondingItems.length - 2];
                        if (indexOfLastRepeatCommand > -1) {
                            var steps = this.getSyntaxStep();
                            var splittedSteps = steps.split(';');
                            if (splittedSteps[indexOfLastRepeatCommand] === "7") {
                                this.replaceSyntaxStep("9", indexOfLastRepeatCommand);
                                this.writeInTab(token, "hidden");
                                this.removeTab();
                            }
                        } else {
                            var error = "Erro sintático no comando de repetição. Esperava-se um 'DO' e recebeu o valor '" + lexeme + "'.";
                            ErrorManager.addError(error, lexeme);
                            this.writeInTab(token, "Erro", error, 1);
                            return [false, true, false];
                        }
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "4":
                    this.replaceLastSyntaxStep("5");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "5":
                    if ("PR_LOOP" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "LOOP", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'LOOP' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "6":
                    this.replaceLastSyntaxStep("7");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "7":
                    if ("PR_WHILE" === token) {
                        this.replaceLastSyntaxStep("8");
                        this.writeInTab(token, "WHILE", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'WHILE' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "8":
                    this.replaceLastSyntaxStep("9");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de repetição. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "9":
                case "13":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "10":
                    this.replaceLastSyntaxStep("11");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "11":
                    if ("PR_UNTIL" === token) {
                        this.replaceLastSyntaxStep("12");
                        this.writeInTab(token, "UNTIL", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'UNTIL' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "12":
                    this.replaceLastSyntaxStep("13");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de repetição. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "14":
                    if ("IDENTIFICADOR" === token) {
                        this.replaceLastSyntaxStep("15");
                        this.writeInTab(token, "ID", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um IDENTIFICADOR e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "15":
                    if ("OP_ATRIBUI" === token) {
                        this.replaceLastSyntaxStep("16");
                        this.writeInTab(token, "=", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um '=' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "16":
                    this.replaceLastSyntaxStep("17");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de repetição. Esperava-se uma expressão de soma.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "17":
                    if ("PR_TO" === token) {
                        this.replaceLastSyntaxStep("18");
                        this.writeInTab(token, "TO", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'TO' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "18":
                    this.replaceLastSyntaxStep("19");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de repetição. Esperava-se uma expressão de soma.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "19":
                    if ("PR_DO" === token) {
                        this.replaceLastSyntaxStep("20");
                        this.writeInTab(token, "DO", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'DO' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "20":
                    this.replaceLastSyntaxStep("21");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/bloco");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, false);
                    }
                    return [true, false, false];
                    break;
                case "21":
                    if ("PR_NEXT" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "NEXT", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de repetição. Esperava-se um 'NEXT' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "com-desvio");
                        this.writeInTab(token, "RETURN", lexeme, 1);
                        return [true, false, false];
                    } else if ("PR_BREAK" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "com-desvio");
                        this.writeInTab(token, "BREAK", lexeme, 1);
                        return [true, false, false];

                    } else if ("PR_CONTINUE" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "com-desvio");
                        this.writeInTab(token, "CONTINUE", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de desvio. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de desvio. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "com-leitura");
                        this.writeInTab(token, "SCAN", lexeme, 1);
                        return [true, false, false];

                    } else if ("PR_SCAN_LN" === token) {
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "com-leitura");
                        this.writeInTab(token, "SCANLN", lexeme, 1);
                        return [true, false, false];

                    } else {
                        return this.removeLast(false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "(", lexeme, 1);
                        return [true, false, false];

                    } else {
                        var error = "Erro sintático no comando de leitura. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/lista-var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de leitura. Esperava-se uma lista de variáveis.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "4":
                    if ("SIN_PAR_F" === token) {
                        this.replaceLastSyntaxStep("5");
                        this.writeInTab(token, ")", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de leitura. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "5":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de leitura. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "com-escrita");
                        this.writeInTab(token, "PRINT", lexeme, 1);
                        return [true, false, false];
                    } else if ("PR_PRINT_LN" === token) {
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "com-escrita");
                        this.writeInTab(token, "PRINTLN", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "(", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de escrita. Esperava-se um '(' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/lista-exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de escrita. Esperava-se uma lista de expressões.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "4":
                    if ("SIN_PAR_F" === token) {
                        this.replaceLastSyntaxStep("5");
                        this.writeInTab(token, ")", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de escrita. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "5":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de escrita. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "cham-proc");
                        this.writeInTab(token, "ID", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "(", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, true);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/args");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    return [success, false, false];
                    break;
                case "4":
                    if ("SIN_PAR_F" === token) {
                        this.replaceLastSyntaxStep("5");
                        this.writeInTab(token, ")", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de chamar procedimento. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "5":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de chamar procedimento. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "lista-exp");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, ",", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na lista de expressões. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                default:
            }
        },
        //exp
        expression: function (step, token, lexeme) {
            //exp-soma op-relac exp-soma | exp-soma
            switch (step) {
                case "1":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "exp");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if (this.relacionalOp().find(f => f === token)) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "op-relac", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de expressão. Esperava-se uma expressão de soma.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "exp-soma");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp-mult");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if (this.sumOp().find(f => f === token)) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "op-soma", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc("exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de expressão de soma. Esperava-se uma expressão de soma.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "exp-mult");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp-simples");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if (this.multiplicationOp().find(f => f === token)) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "op-mult", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp-simples");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático no comando de expressão de multiplicação. Esperava-se uma expressão simples.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                    if ("SIN_PAR_A" === token) {
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "exp-simples");
                        this.writeInTab(token, "(", lexeme, 1);
                        return [true, false, false];
                    } else if (this.unaryOp().find(f => f === token)) {
                        this.replaceLastSyntaxStep("4");
                        this.writeInTab(token, "exp-simples");
                        this.writeInTab(token, "op-unario", lexeme, 1);
                        return [true, false, false];
                    } else {
                        this.ignoreLastSyntaxFunc();
                        this.writeInTab(token, "exp-simples");
                        //var
                        this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/var");
                        this.concatenateLastSyntaxStep("1");
                        var [isVar, _, _] = this.callFunction(token, lexeme);

                        //cham-func
                        this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/cham-func");
                        this.concatenateLastSyntaxStep("1");
                        var [isFunc, _, _] = this.callFunction(token, lexeme);

                        //literal
                        this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/literal");
                        this.concatenateLastSyntaxStep("1");
                        var [isLiteral, _, _] = this.callFunction(token, lexeme);

                        if (!isVar && !isFunc && !isLiteral) {
                            return this.removeLast(false, false, true);
                        }
                        return [true, false, false];
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na expressão simples. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "3":
                    if ("SIN_PAR_F" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ")", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de expressão simples. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "4":
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na expressão simples. Esperava-se uma expressão.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    var result = this.removeLast(true, false, false);
                    this.writeInTab(token, "hidden");
                    return result;
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
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "literal", lexeme, 1);
                        return result;
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "cham-func");
                        this.writeInTab(token, "ID", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "(", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, true);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/args");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    return [success, false, false];
                    break;
                case "4":
                    if ("SIN_PAR_F" === token) {
                        this.replaceLastSyntaxStep("5");
                        this.writeInTab(token, ")", lexeme, 1);
                        return [true, false, false];
                    } else {
                        var error = "Erro sintático no comando de chamada de função. Esperava-se um ')' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    break;
                case "5":
                    if ("SIN_PV" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, ";", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de chamada de função. Esperava-se um ';' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                    this.ignoreLastSyntaxFunc();
                    this.writeInTab(token, "args");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/lista-exp");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
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
                        this.replaceLastSyntaxStep("2");
                        this.writeInTab(token, "var");
                        this.writeInTab(token, "ID", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "2":
                    if ("SIN_COL_A" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, "[", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/exp-soma");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na variável. Esperava-se uma expressão de soma.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
                    break;
                case "4":
                    if ("SIN_COL_F" === token) {
                        var result = this.removeLast(true, false, false);
                        this.writeInTab(token, "]", lexeme, 2);
                        return result;
                    } else {
                        var error = "Erro sintático no comando de variável. Esperava-se um ']' e recebeu o valor '" + lexeme + "'.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
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
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "lista-var");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        return this.removeLast(false, false, true);
                    }
                    return [true, false, false];
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.replaceLastSyntaxStep("3");
                        this.writeInTab(token, ",", lexeme, 1);
                        return [true, false, false];
                    } else {
                        return this.removeLast(false, false, false);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.writeInTab(token, "hidden");
                    this.concatenateLastSyntaxFunc(this.getLastSyntaxFunc(true) + "/var");
                    this.concatenateLastSyntaxStep("1");
                    var [success, hasErrors, deleteRow] = this.callFunction(token, lexeme);
                    if (!success) {
                        var error = "Erro sintático na lista de variáveis. Esperava-se uma variável.";
                        ErrorManager.addError(error, lexeme);
                        this.writeInTab(token, "Erro", error, 1);
                        return [false, true, false];
                    }
                    return [true, false, false];
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