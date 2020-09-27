var SyntaxAnalysis = function () {
    return {
        writeInTab: function (text, lexeme = "", addTab = 0) {
            var div = document.getElementById("syntaxAnalisys");
            var row = document.createElement("div");
            if (lexeme !== "") {
                row.className = "row"
                row.innerHTML = this.getTabs(addTab) + text + '   ➙   ' + lexeme;
            }
            else {
                row.className = "row font-weight-bold"
                row.innerHTML = this.getTabs(addTab) + text
            }
            div.appendChild(row);
        },
        getTabs: function (addTab) {
            var len = Array.from(this.getSyntaxFunc().split(";")).length + addTab;
            return "&emsp;".repeat(len);
        },
        callFunction: function (token, lexeme) {
            var func = this.getLastSyntaxFunc();
            var step = this.getLastSyntaxStep();

            if (func === "ignore") {
                this.removeLastSyntaxFunc();
                this.removeLastSyntaxStep();
                func = this.getLastSyntaxFunc();
                step = this.getLastSyntaxStep();
            }
            switch (func) {
                //Declarações
                case "programa":
                    this.program(step, token, lexeme);
                    break;
                case "lista-decl":
                    this.listDeclarations(step, token, lexeme);
                    break;
                case "decl":
                    this.declaration(step, token, lexeme);
                    break;
                case "decl-const":
                    this.declareConst(step, token, lexeme);
                    break;
                case "decl-var":
                    this.declareVar(step, token, lexeme);
                    break;
                case "espec-tipo":
                    this.specifyType(step, token, lexeme);
                    break;
                case "decl-proc":
                    this.declareProc(step, token, lexeme);
                    break;
                case "decl-func":
                    this.declareFunc(step, token, lexeme);
                    break;
                case "params":
                    this.params(step, token, lexeme);
                    break;
                case "lista-param":
                    this.listParam(step, token, lexeme);
                    break;
                case "param":
                    this.param(step, token, lexeme);
                    break;
                case "mode":
                    this.mode(step, token, lexeme);
                    break;
                //Comandos
                case "bloco":
                    this.block(step, token, lexeme);
                    break;
                case "lista-com":
                    this.commandList(step, token, lexeme);
                    break;
                case "comando":
                    this.command(step, token, lexeme);
                    break;
                case "com-atrib":
                    this.commandAtrib(step, token, lexeme);
                    break;
                case "com-selecao":
                    this.commandSelection(step, token, lexeme);
                    break;
                case "com-repeticao":
                    this.commandRepetition(step, token, lexeme);
                    break;
                case "com-desvio":
                    this.commandBypass(step, token, lexeme);
                    break;
                case "com-leitura":
                    this.commandRead(step, token, lexeme);
                    break;
                case "com-escrita":
                    this.commandWrite(step, token, lexeme);
                    break;
                case "cham-proc":
                    this.callProcedure(step, token, lexeme);
                    break;
                //Expressões
                case "lista-exp":
                    this.listExp(step, token, lexeme);
                    break;
                case "exp":
                    this.expression(step, token, lexeme);
                    break;
                case "exp-soma":
                    this.expressionSum(step, token, lexeme);
                    break;
                case "exp-mult":
                    this.expressionMult(step, token, lexeme);
                    break;
                case "exp-simples":
                    this.expressionSimple(step, token, lexeme);
                    break;
                case "literal":
                    this.literal(step, token, lexeme);
                    break;
                case "cham-func":
                    this.callFunc(step, token, lexeme);
                    break;
                case "args":
                    this.arguments(step, token, lexeme);
                    break;
                case "var":
                    this.variable(step, token, lexeme);
                    break;
                case "lista-var":
                    this.listVariable(step, token, lexeme);
                    break;
                default:
            }
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
        concatenateSyntaxFunc: function (func) {
            var syntaxFunc = this.getSyntaxFunc();
            if (syntaxFunc !== "")
                this.setSyntaxFunc(syntaxFunc + ";" + func);
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
            splittedFunc.pop();
            syntaxFunc = splittedFunc.join(";");
            if (syntaxFunc !== "")
                this.setSyntaxFunc(syntaxFunc + ";" + "ignore");
            else
                this.setSyntaxFunc("ignore");
        },
        removeLastSyntaxFunc: function () {
            var syntaxFunc = this.getSyntaxFunc();
            var splittedFunc = syntaxFunc.split(";");
            splittedFunc.pop();
            this.setSyntaxFunc(splittedFunc.join(";"));
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
        concatenateSyntaxStep: function (step) {
            var syntaxStep = this.getSyntaxStep();
            if (syntaxStep !== "")
                this.setSyntaxStep(syntaxStep + ";" + step);
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
                    this.concatenateSyntaxFunc("lista-decl");
                    this.concatenateSyntaxStep("1");
                    this.listDeclarations(this.getLastSyntaxStep(), token, lexeme);
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
                    this.concatenateSyntaxFunc("decl");
                    this.concatenateSyntaxStep("1");
                    this.declaration(this.getLastSyntaxStep(), token, lexeme);
                    break;
                case "2":
                    this.concatenateSyntaxFunc("decl");
                    this.concatenateSyntaxStep("1");
                    this.declaration(this.getLastSyntaxStep(), token, lexeme);
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
                    this.concatenateSyntaxFunc("decl-const");
                    this.concatenateSyntaxStep("1");
                    this.declareConst(this.getLastSyntaxStep(), token, lexeme);

                    //decl-var
                    this.concatenateSyntaxFunc("decl-var");
                    this.concatenateSyntaxStep("1");
                    this.declareVar(this.getLastSyntaxStep(), token, lexeme);

                    //decl-proc
                    this.concatenateSyntaxFunc("decl-proc");
                    this.concatenateSyntaxStep("1");
                    this.declareProc(step, token, lexeme);

                    //decl-func
                    this.concatenateSyntaxFunc("decl-func");
                    this.concatenateSyntaxStep("1");
                    this.declareFunc(step, token, lexeme);
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
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                    } else {
                        //Declaração de Constante esperava IDENTIFICADOR e recebeu um lexeme
                    }
                    break;
                case "3":
                    if ("OP_ATRIBUI" === token) {
                        this.writeInTab("=", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        this.concatenateSyntaxFunc("literal");
                        this.concatenateSyntaxStep("1");
                    } else {
                        //Declaração de Constante esperava '=' e recebeu um lexeme
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    } else {
                        //Declaração de Constante esperava ';' e recebeu um lexeme
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
                        this.concatenateSyntaxFunc("espec-tipo");
                        this.concatenateSyntaxStep("1");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.concatenateSyntaxFunc("lista-var");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme)
                    break;
                case "3":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    } else {
                        //Declaração de Variável esperava ';' e recebeu um lexeme
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
                        this.removeLastSyntaxFunc()
                        this.removeLastSyntaxStep()
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
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.concatenateSyntaxFunc("espec-tipo");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
                    break;
                case "3":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                    }
                    break;
                case "4":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("5");
                        this.concatenateSyntaxFunc("params");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "5":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("6");
                        this.concatenateSyntaxFunc("bloco");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "6":
                    if ("PR_END_SUB" === token) {
                        this.writeInTab("END-SUB", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.concatenateSyntaxFunc("espec-tipo");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
                    break;
                case "3":
                    if ("IDENTIFICADOR" === token) {
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                    }
                    break;
                case "4":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("5");
                        this.concatenateSyntaxFunc("params");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "5":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("6");
                        this.concatenateSyntaxFunc("bloco");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "6":
                    if ("PR_END_FUNCTION" === token) {
                        this.writeInTab("END-FUNCTION", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                    this.concatenateSyntaxFunc("lista-param");
                    this.concatenateSyntaxFunc("1");
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
                    this.concatenateSyntaxFunc("param");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.writeInTab(",", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateSyntaxFunc("param");
                        this.concatenateSyntaxStep("1");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                        this.callFunction(token, lexeme);
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
                        this.concatenateSyntaxFunc("espec-tipo");
                        this.concatenateSyntaxStep("1");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    this.replaceLastSyntaxStep("3");
                    this.concatenateSyntaxFunc("lista-var");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme)
                    break;
                case "3":
                    if ("BY" === token) {
                        this.writeInTab("BY", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                    }
                    break;
                case "4":
                    if (this.mode().find(f => f === token)) {
                        this.writeInTab("mode", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                default:
            }
        },
        //mode
        mode: function (step, token, lexeme) {
            //VALUE | REF
            return ["PR_VALUE", "PR_REF"];
        },
        //Comandos
        //bloco
        block: function (step, token, lexeme) {
            //lista-com
            switch (step) {
                case "1":
                    this.writeInTab("bloco");
                    this.replaceLastSyntaxStep("2");
                    this.concatenateSyntaxFunc("lista-com");
                    this.concatenateSyntaxStep("1");
                    this.commandList(this.getLastSyntaxStep(), token, lexeme);
                    break;
                case "2":
                    this.removeLastSyntaxFunc();
                    this.removeLastSyntaxStep();
                    this.callFunction();
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
                    this.concatenateSyntaxFunc("comando");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme); //verificar retorno?
                    break;
                case "2":
                    this.removeLastSyntaxFunc(); //chamar comando de novo caso retorno for um comando
                    this.removeLastSyntaxStep();
                    this.callFunction(token, lexeme);
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
                    this.concatenateSyntaxFunc("cham-proc");
                    this.concatenateSyntaxStep("1");
                    this.callProcedure(this.getLastSyntaxStep(), token, lexeme);

                    //com-atrib
                    this.concatenateSyntaxFunc("com-atrib");
                    this.concatenateSyntaxStep("1");
                    this.commandAtrib(this.getLastSyntaxStep(), token, lexeme);


                    //com-selecao
                    this.concatenateSyntaxFunc("com-selecao");
                    this.concatenateSyntaxStep("1");
                    this.commandSelection(this.getLastSyntaxStep(), token, lexeme);

                    //com-repeticao
                    this.concatenateSyntaxFunc("com-repeticao");
                    this.concatenateSyntaxStep("1");
                    this.commandRepetition(this.getLastSyntaxStep(), token, lexeme);

                    //com-desvio
                    this.concatenateSyntaxFunc("com-desvio");
                    this.concatenateSyntaxStep("1");
                    this.commandBypass(this.getLastSyntaxStep(), token, lexeme);

                    //com-leitura
                    this.concatenateSyntaxFunc("com-leitura");
                    this.concatenateSyntaxStep("1");
                    this.commandRead(this.getLastSyntaxStep(), token, lexeme);

                    //com-escrita
                    this.concatenateSyntaxFunc("com-escrita");
                    this.concatenateSyntaxStep("1");
                    this.commandWrite(this.getLastSyntaxStep(), token, lexeme);

                    //decl-var
                    this.concatenateSyntaxFunc("decl-var");
                    this.concatenateSyntaxStep("1");
                    this.declareVar(this.getLastSyntaxStep(), token, lexeme);

                    //decl-const
                    this.concatenateSyntaxFunc("decl-const");
                    this.concatenateSyntaxStep("1");
                    this.declareConst(this.getLastSyntaxStep(), token, lexeme);

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
                    this.concatenateSyntaxFunc("var");
                    this.concatenateSyntaxStep("1");
                    break;
                case "2":
                    if ("OP_ATRIBUI" === token) {
                        this.writeInTab("=", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("4");
                    this.concatenateSyntaxFunc("exp");
                    this.concatenateSyntaxStep("1");
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                        this.concatenateSyntaxFunc("exp");
                        this.concatenateSyntaxStep("1");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    if ("PR_THEN" === token) {
                        this.writeInTab("THEN", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateSyntaxFunc("bloco");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "3":
                    if ("PR_END_IF" === token) {
                        this.writeInTab("END-IF", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    } else if ("PR_THEN" === token) {
                        this.writeInTab("THEN", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                        this.concatenateSyntaxFunc("bloco");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "4":
                    if ("PR_END_IF" === token) {
                        this.writeInTab("END-IF", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                default:
            }
        },
        //com-repeticao
        commandRepetition: function (step, token, lexeme) {
            //WHILE exp DO bloco LOOP | DO bloco WHILE exp ; | REPEAT bloco UNTIL exp ; | FOR ID = exp-soma TO exp-soma DO bloco NEXT
            this.removeLastSyntaxFunc();
            this.removeLastSyntaxStep();
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
                        this.concatenateSyntaxFunc("exp");
                        this.concatenateSyntaxStep("1");
                    } else if ("PR_BREAK" === token) {
                        this.writeInTab("com-desvio");
                        this.writeInTab("BREAK", lexeme, 1);
                        this.replaceLastSyntaxStep("2");

                    } else if ("PR_CONTINUE" === token) {
                        this.writeInTab("com-desvio");
                        this.writeInTab("CONTINUE", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                    }
                    break;
                case "2":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                    } else if ("PR_SCAN_LN" === token) {
                        this.writeInTab("com-leitura");
                        this.writeInTab("SCANLN", lexeme, 1);
                        this.replaceLastSyntaxStep("2");

                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateSyntaxFunc("lista-var");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "2":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                    } else if ("PR_PRINT_LN" === token) {
                        this.writeInTab("com-escrita");
                        this.writeInTab("PRINTLN", lexeme, 1);
                        this.replaceLastSyntaxStep("2");

                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateSyntaxFunc("lista-exp");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "2":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                        this.writeInTab("cham-prox");
                        this.writeInTab("ID", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateSyntaxFunc("args");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "3":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                    this.concatenateSyntaxFunc("exp");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.writeInTab(",", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateSyntaxFunc("exp");
                        this.concatenateSyntaxStep("1");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                        this.callFunction(token, lexeme);
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
                    this.concatenateSyntaxFunc("exp-soma");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
                    break;
                case "2":
                    if (this.relacionalOp().find(f => f === token)) {
                        this.writeInTab("op-relac", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                        this.callFunction(token, lexeme);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.concatenateSyntaxFunc("exp-soma");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
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
                    this.concatenateSyntaxFunc("exp-mult");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
                    break;
                case "2":
                    if (this.sumOp().find(f => f === token)) {
                        this.writeInTab("op-soma", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                        this.callFunction(token, lexeme);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.concatenateSyntaxFunc("exp-soma");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
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
                    this.concatenateSyntaxFunc("exp-simples");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
                    break;
                case "2":
                    if (this.multiplicationOp().find(f => f === token)) {
                        this.writeInTab("op-mult", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                        this.callFunction(token, lexeme);
                    }
                    break;
                case "3":
                    this.replaceLastSyntaxStep("2");
                    this.concatenateSyntaxFunc("exp-simples");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
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
                        this.concatenateSyntaxFunc("exp");
                        this.concatenateSyntaxStep("1");

                    } else if (this.unaryOp().find(f => f === token)) {
                        this.writeInTab("op-unario", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateSyntaxFunc("exp");
                        this.concatenateSyntaxStep("1");

                    } else {
                        this.ignoreLastSyntaxFunc();
                        //var
                        this.concatenateSyntaxFunc("var");
                        this.concatenateSyntaxStep("1");
                        this.variable(this.getLastSyntaxStep(), token, lexeme);

                        //cham-func
                        this.concatenateSyntaxFunc("cham-func");
                        this.concatenateSyntaxStep("1");
                        this.callFunc(this.getLastSyntaxStep(), token, lexeme);

                        //literal
                        this.concatenateSyntaxFunc("literal");
                        this.concatenateSyntaxStep("1");
                        this.literal(this.getLastSyntaxStep(), token, lexeme);
                    }
                    break;
                case "2":
                    if ("SIN_PAR_F" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "3":
                    this.removeLastSyntaxFunc();
                    this.removeLastSyntaxStep();
                    this.callFunction(token, lexeme);
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
                        this.removeLastSyntaxFunc()
                        this.removeLastSyntaxStep()
                    } else {
                        this.removeLastSyntaxFunc()
                        this.removeLastSyntaxStep()
                    }
                    break;
                default:
                    this.removeLastSyntaxFunc()
                    this.removeLastSyntaxStep()
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
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab("(", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateSyntaxFunc("args");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "3":
                    if ("SIN_PAR_A" === token) {
                        this.writeInTab(")", lexeme, 1);
                        this.replaceLastSyntaxStep("4");
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        this.writeInTab(";", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                    this.concatenateSyntaxFunc("lista-exp");
                    this.concatenateSyntaxFunc("1");
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
                    } else {
                        //erro?
                        this.removeLastSyntaxFunc()
                        this.removeLastSyntaxStep()
                    }
                    break;
                case "2":
                    if ("SIN_COL_A" === token) {
                        this.writeInTab("[", lexeme, 1);
                        this.replaceLastSyntaxStep("3");
                        this.concatenateSyntaxFunc("exp-soma");
                        this.concatenateSyntaxStep("1");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                        this.callFunction(token, lexeme);
                    }
                    break;
                case "3":
                    if ("SIN_COL_F" === token) {
                        this.writeInTab("]", lexeme, 1);
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
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
                    this.concatenateSyntaxFunc("var");
                    this.concatenateSyntaxStep("1");
                    this.callFunction(token, lexeme);
                    break;
                case "2":
                    if ("SIN_V" === token) {
                        this.writeInTab(",", lexeme, 1);
                        this.replaceLastSyntaxStep("2");
                        this.concatenateSyntaxFunc("var");
                        this.concatenateSyntaxStep("1");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                        this.callFunction(token, lexeme);
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