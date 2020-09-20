var SyntaxAnalysis = function () {
    return {
        callFunction: function (token) {
            var func = this.getLastSyntaxFunc();
            var step = this.getLastSyntaxStep();

            switch (func) {
                case "programa":
                    this.program(step, token);
                    break;
                case "lista-decl":
                    this.listDeclarations(step, token);
                    break;
                case "decl":
                    this.declaration(step, token);
                    break;
                case "decl-const":
                    this.declareConst(step, token);
                    break;
                case "literal":
                    this.literal(step, token);
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
        program: function (step, token) {
            //lista-decl
            switch (step) {
                case "1":
                    console.log("programa");
                    this.replaceLastSyntaxStep("1");
                    this.concatenateSyntaxFunc("lista-decl");
                    this.concatenateSyntaxStep("1");
                    this.listDeclarations(step, token);
                    break;
                default:
            }
        },
        //lista-decl
        listDeclarations: function (step, token) {
            //decl lista-decl | decl
            switch (step) {
                case "1":
                    console.log("lista-decl");
                    this.replaceLastSyntaxStep("1");
                    this.concatenateSyntaxFunc("decl");
                    this.concatenateSyntaxStep("1");
                    this.declaration(step, token);
                    break;
                default:
            }
        },
        //decl
        declaration: function (step, token) {
            //decl-const | decl-var | decl-proc | decl-func
            switch (step) {
                case "1":
                    console.log("decl");
                    this.removeLastSyntaxFunc();
                    this.removeLastSyntaxStep();

                    //decl-const
                    this.concatenateSyntaxFunc("decl-const");
                    this.concatenateSyntaxStep("1");
                    this.declareConst(step, token);

                    //decl-var
                    this.concatenateSyntaxFunc("decl-var");
                    this.concatenateSyntaxStep("1");
                    this.declareVar(step, token);

                    ////decl-proc
                    //this.concatenateSyntaxFunc("decl-proc");
                    //this.concatenateSyntaxStep("1");
                    //this.declareProc(step, token);

                    ////decl-func
                    //this.concatenateSyntaxFunc("decl-func");
                    //this.concatenateSyntaxStep("1");
                    //this.declareFunc(step, token);

                    break;
                default:
            }
        },
        //decl-const
        declareConst: function (step, token) {
            //CONST ID = literal;
            switch (step) {
                case "1":
                    if ("PR_CONST" === token) {
                        console.log("decl-const");
                        console.log("CONST");
                        this.replaceLastSyntaxStep("2");
                    } else {
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                case "2":
                    if ("IDENTIFICADOR" === token) {
                        console.log("ID");
                        this.replaceLastSyntaxStep("3");
                    }
                    break;
                case "3":
                    if ("OP_ATRIBUI" === token) {
                        console.log("=");
                        this.replaceLastSyntaxStep("4");
                        this.concatenateSyntaxFunc("literal");
                        this.concatenateSyntaxStep("1");
                    }
                    break;
                case "4":
                    if ("SIN_PV" === token) {
                        console.log(";");
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                default:
            }
        },
        //decl-var
        declareVar: function (step, token) {
            //VAR espc-tipo lista-var;
            switch (step) {
                case "1":
                    //VAR
                    if ("PR_VAR" === token) {
                        console.log("decl-var");
                        console.log("VAR");
                        this.replaceLastSyntaxStep("2");
                        this.concatenateSyntaxFunc("spec-tipo");
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
                    break;
                case "3":
                    if ("SIN_PV" === token) {
                        console.log(";");
                        this.removeLastSyntaxFunc();
                        this.removeLastSyntaxStep();
                    }
                    break;
                default:
            }
        },
        //espec-tipo
        specifyType: function (step, token) {
            //INT | FLOAT | CHAR | BOOL | STRING
            switch (step) {
                case "1":
                    if (["PR_INT", "PR_FLOAT", "PR_CHAR", "PR_BOOL", "PR_STRING"]
                        .find(f => f === token)
                    ) {
                        console.log("espec-tipo");
                        this.removeLastSyntaxFunc()
                        this.removeLastSyntaxStep()
                    }
                    break;
                default:
            }
        },
        //decl-proc
        declareProc: function (step, token) {
            //SUB espec-tipo ID ( params ) bloco END-SUB
        },
        //decl-func
        declareFunc: function (step, token) {
            //FUNCTION espec-tipo ID ( params ) bloco END-FUNCTION
        },
        //params
        params: function (step, token) {
            //lista-param | null
        },
        //lista-param
        listParam: function (step, token) {
            //lista-param , param | param
        },
        //lparam
        param: function (step, token) {
            //VAR espec-tipo lista-var BY mode
        },
        //mode
        mode: function (step, token) {
            //VALUE | REF
        },
        //Comandos
        //bloco
        block: function (step, token) {
            //lista-com
        },
        //lista-com
        commandList: function (step, token) {
            //comando lista-com | null
        },
        //comando
        command: function (step, token) {
            //cham-proc | com-atrib | com-selecao | com-repeticao | com-desvio | com-leitura | com-escrita | decl-var | decl-const
        },
        //com-atrib 
        commandAtrib: function (step, token) {
            //var = exp ;
        },
        //com-selecao
        commandSelection: function (step, token) {
            //IF exp THEN bloco END-IF | IF exp THEN bloco ELSE bloco END-IF
        },
        //com-repeticao
        commandRepetition: function (step, token) {
            //WHILE exp DO bloco LOOP | DO bloco WHILE exp ; | REPEAT bloco UNTIL exp ; | FOR ID = exp-soma TO exp-soma DO bloco NEXT
        },
        //com-desvio
        commandBypass: function (step, token) {
            //RETURN exp ; | BREAK ; | CONTINUE ;
        },
        //com-leitura
        commandRead: function (step, token) {
            //SCAN ( lista-var ) ; | SCANLN ( lista-var ) ;
        },
        //com-escrita
        commandWrite: function (step, token) {
            //PRINT ( lista-exp ) ; | PRINTLN ( lista-exp ) ;
        },
        //cham-proc
        callProcedure: function (step, token) {
            //ID ( args ) ;
        },
        //Expressões
        //lista-exp
        listExp: function (step, token) {
            //ID ( args ) ;
        },
        //exp
        expression: function (step, token) {
            //exp-soma op-relac exp-soma | exp-soma
        },
        //op-relac
        relacionalOp: function (step, token) {
            //<= | < | > | >= | == | <>
        },
        //exp-soma
        expressionSum: function (step, token) {
            //exp-mult op-soma exp-soma | exp-mult
        },
        //op-soma
        sumOp: function (step, token) {
            //+ | - | OR
        },
        //exp-mult
        expressionMult: function (step, token) {
            //exp-mult op-mult exp-simples | exp-simples
        },
        //op-mult
        multiplicationOp: function (step, token) {
            //* | / | DIV | MOD | AND
        },
        //exp-simples
        expressionSimple: function (step, token) {
            //( exp ) | var | cham-func | literal | op-unario exp
        },
        //literal
        literal: function (step, token) {
            //NUMINT | NUMREAL | CARACTERE | STRING | valor-verdade
            switch (step) {
                case "1":
                    if (["NUM_INT", "NUM_REAL", "CARACTERE", "STRING"]
                        .concat(this.booleanValue())
                        .find(f => f === token)
                    ) {
                        console.log("literal");
                        this.removeLastSyntaxFunc()
                        this.removeLastSyntaxStep()
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
        callFunc: function (step, token) {
            //ID ( args )
        },
        //args
        arguments: function (step, token) {
            //lista-exp | null
        },
        //var
        variable: function (step, token) {
            //ID | ID [ exp-soma ]
            switch (step) {
                case "1":
                    if ("IDENTIFICADOR" === token) {
                        console.log("ID");
                        this.replaceLastSyntaxStep("2");
                    }
                    break;
                case "2":
                    if ("SIN_COL_A" === token) {
                        console.log("[");
                        this.replaceLastSyntaxStep("3");
                    }
                    break;
                default:
            }
        },
        //list-var
        listVariable: function (step, token) {
            //var , lista-var | var
        },
        //list-var
        unaryOp: function (step, token) {
            //+ | - | NOT
        }


    }
};
const SyntaxAnalysisController = new SyntaxAnalysis();