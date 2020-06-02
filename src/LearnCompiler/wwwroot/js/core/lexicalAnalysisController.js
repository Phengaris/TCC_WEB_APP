var LexicalAnalysisController = function () {
    var diagramCoordinates = [
        {
            img_id: "space_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "SEPARADOR",
                    width_start: [0],
                    width_end: [380],
                    height_start: [20],
                    height_end: [527]
                },
                {
                    case_start: "SEPARADOR",
                    case_end: "SEPARADOR",
                    width_start: [0],
                    width_end: [380],
                    height_start: [20],
                    height_end: [527]
                }
            ]
        },
        {
            img_id: "comma_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "SIN_V",
                    width_start: [0],
                    width_end: [1164],
                    height_start: [0],
                    height_end: [324]
                }
            ]
        },
        {
            img_id: "semicolon_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "SIN_PV",
                    width_start: [0],
                    width_end: [1164],
                    height_start: [0],
                    height_end: [324]
                }
            ]
        },
        {
            img_id: "parentheses_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "SIN_PAR_A",
                    width_start: [0],
                    width_end: [1244],
                    height_start: [0],
                    height_end: [325]
                },
                {
                    case_start: "1",
                    case_end: "SIN_PAR_F",
                    width_start: [0, 0],
                    width_end: [404, 490],
                    height_start: [0, 663],
                    height_end: [663, 908]
                }
            ]
        },
        {
            img_id: "bracket_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "SIN_COL_A",
                    width_start: [0],
                    width_end: [1244],
                    height_start: [0],
                    height_end: [325]
                },
                {
                    case_start: "1",
                    case_end: "SIN_COL_F",
                    width_start: [0, 0],
                    width_end: [404, 490],
                    height_start: [0, 663],
                    height_end: [663, 908]
                }
            ]
        },
        {
            img_id: "addition_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "OP_SOMA",
                    width_start: [0],
                    width_end: [1084],
                    height_start: [0],
                    height_end: [324]
                }
            ]
        },
        {
            img_id: "subtraction_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "OP_SUBTRAI",
                    width_start: [0],
                    width_end: [1124],
                    height_start: [0],
                    height_end: [324]
                }
            ]
        },
        {
            img_id: "multiplication_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "OP_MULTI",
                    width_start: [0],
                    width_end: [1124],
                    height_start: [0],
                    height_end: [324]
                }
            ]
        },
        {
            img_id: "number_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "2",
                    width_start: [0, 892, 907, 907, 934],
                    width_end: [892, 907, 934, 934, 965],
                    height_start: [199, 226, 238, 415, 199],
                    height_end: [525, 525, 290, 505, 525]
                },
                {
                    case_start: "2",
                    case_end: "2",
                    width_start: [640],
                    width_end: [965],
                    height_start: [0],
                    height_end: [525]
                },
                {
                    case_start: "2",
                    case_end: "3",
                    width_start: [640, 892, 907, 907, 934, 1533, 1548, 1548, 1576],
                    width_end: [892, 907, 934, 934, 1533, 1548, 1576, 1576, 1605],
                    height_start: [195, 226, 238, 415, 195, 226, 238, 415, 195],
                    height_end: [525, 525, 290, 505, 525, 525, 290, 505, 525]
                },
                {
                    case_start: "2",
                    case_end: "NUM_INT",
                    width_start: [640, 892, 907, 907, 934, 550],
                    width_end: [892, 907, 934, 934, 965, 1050],
                    height_start: [195, 226, 238, 415, 195, 880],
                    height_end: [880, 880, 290, 880, 880, 1128]
                },
                {
                    case_start: "3",
                    case_end: "3",
                    width_start: [1280],
                    width_end: [1605],
                    height_start: [0],
                    height_end: [525]
                },
                {
                    case_start: "3",
                    case_end: "NUM_REAL",
                    width_start: [1275, 1533, 1548, 1548, 1576],
                    width_end: [1533, 1548, 1576, 1576, 2408],
                    height_start: [195, 226, 238, 415, 195],
                    height_end: [525, 525, 290, 505, 525]
                },
                {
                    case_start: "3",
                    case_end: "ERRO_NUM_REAL",
                    width_start: [1275, 1533, 1548, 1548, 1576, 1195],
                    width_end: [1533, 1548, 1576, 1576, 1605, 1685],
                    height_start: [195, 226, 238, 415, 195, 880],
                    height_end: [880, 880, 290, 880, 880, 1128]
                }
            ]
        },
        {
            img_id: "character_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "4",
                    width_start: [0],
                    width_end: [964],
                    height_start: [0],
                    height_end: [325]
                },
                {
                    case_start: "4",
                    case_end: "CARACTERE",
                    width_start: [639, 558],
                    width_end: [964, 1044],
                    height_start: [0, 637],
                    height_end: [637, 884]
                },
                {
                    case_start: "4",
                    case_end: "5",
                    width_start: [639],
                    width_end: [2444],
                    height_start: [0],
                    height_end: [325]
                },
                {
                    case_start: "5",
                    case_end: "ERRO_CARACTERE",
                    width_start: [2119, 2030],
                    width_end: [2444, 2530],
                    height_start: [0, 637],
                    height_end: [637, 884]
                },
                {
                    case_start: "5",
                    case_end: "CARACTERE",
                    width_start: [2119],
                    width_end: [3244],
                    height_start: [0],
                    height_end: [325]
                }
            ]
        },
        {
            img_id: "string_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "6",
                    width_start: [0, 911, 918],
                    width_end: [911, 918, 965],
                    height_start: [199, 243, 199],
                    height_end: [524, 253, 523]
                },
                {
                    case_start: "6",
                    case_end: "6",
                    width_start: [639, 639],
                    width_end: [964, 1924],
                    height_start: [110, 0],
                    height_end: [526, 110]
                },
                {
                    case_start: "6",
                    case_end: "ERRO_STRING",
                    width_start: [639, 911, 918],
                    width_end: [911, 918, 1924],
                    height_start: [199, 243, 199],
                    height_end: [524, 253, 524]
                },
                {
                    case_start: "6",
                    case_end: "STRING",
                    width_start: [639, 911, 911, 918, 555],
                    width_end: [911, 918, 918, 965, 1050],
                    height_start: [200, 243, 467, 200, 840],
                    height_end: [840, 253, 483, 840, 1084]
                },
            ]
        },
        {
            img_id: "bigger_then_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "7",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "7",
                    case_end: "OP_MAIOR",
                    width_start: [639, 555],
                    width_end: [965, 1050],
                    height_start: [244, 0],
                    height_end: [884, 244]
                },
                {
                    case_start: "7",
                    case_end: "OP_MAIOR_IGUAL",
                    width_start: [639],
                    width_end: [1764],
                    height_start: [559],
                    height_end: [884]
                }
            ]
        },
        {
            img_id: "less_then_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "8",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "8",
                    case_end: "OP_MENOR",
                    width_start: [639, 555],
                    width_end: [965, 1050],
                    height_start: [244, 0],
                    height_end: [884, 244]
                },
                {
                    case_start: "8",
                    case_end: "OP_MENOR_IGUAL",
                    width_start: [639],
                    width_end: [1764],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "8",
                    case_end: "OP_DIFERENTE",
                    width_start: [639, 555],
                    width_end: [965, 1050],
                    height_start: [559, 1210],
                    height_end: [1210, 1456]
                }
            ]
        },
        {
            img_id: "equal_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "9",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "9",
                    case_end: "OP_ATRIBUI",
                    width_start: [639, 555],
                    width_end: [965, 1050],
                    height_start: [244, 0],
                    height_end: [884, 244]
                },
                {
                    case_start: "9",
                    case_end: "OP_IGUAL",
                    width_start: [639],
                    width_end: [1764],
                    height_start: [559],
                    height_end: [884]
                }
            ]
        },
        {
            img_id: "exclusive_table_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "10",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "10",
                    case_end: "10",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "10",
                    case_end: "TABELA_EXCLUSIVOS",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "1",
                    case_end: "11",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "11",
                    case_end: "11",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
                {
                    case_start: "11",
                    case_end: "10",
                    width_start: [0],
                    width_end: [965],
                    height_start: [559],
                    height_end: [884]
                },
            ]
        },
        {
            img_id: "division_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "OP_DIVI",
                    width_start: [0],
                    width_end: [1124],
                    height_start: [0],
                    height_end: [324]
                }
            ]
        }
    ];
    var repeatWord = "";
    var reservedWords = [
        //decl-const
        { lexeme: "CONST", token: "PR_CONST" },
        { lexeme: "ID", token: "PR_ID" },
        //decl-var
        { lexeme: "VAR", token: "PR_VAR" },
        //espec-tipo
        { lexeme: "INT", token: "PR_INT" },
        { lexeme: "FLOAT", token: "PR_FLOAT" },
        { lexeme: "CHAR", token: "PR_CHAR" },
        { lexeme: "BOOL", token: "PR_BOOL" },
        { lexeme: "STRING", token: "PR_STRING" },
        //decl-proc
        { lexeme: "SUB", token: "PR_SUB" },
        { lexeme: "END-SUB", token: "PR_END_SUB" },
        //decl-func
        { lexeme: "FUNCTION", token: "PR_FUNCTION" },
        { lexeme: "END-FUNCTION", token: "PR_END_FUNCTION" },
        //param
        { lexeme: "BY", token: "PR_BY" },
        //mode
        { lexeme: "VALUE", token: "PR_VALUE" },
        { lexeme: "REF", token: "PR_REF" },
        //com-selecao
        { lexeme: "IF", token: "PR_IF" },
        { lexeme: "THEN", token: "PR_THEN" },
        { lexeme: "ELSE", token: "PR_ELSE" },
        { lexeme: "END-IF", token: "PR_END-IF" },
        //com-repeticao
        { lexeme: "WHILE", token: "PR_WHILE" },
        { lexeme: "DO", token: "PR_DO" },
        { lexeme: "LOOP", token: "PR_LOOP" },
        { lexeme: "REPEAT", token: "PR_REPEAT" },
        { lexeme: "UNTIL", token: "PR_UNTIL" },
        { lexeme: "FOR", token: "PR_FOR" },
        { lexeme: "TO", token: "PR_TO" },
        { lexeme: "NEXT", token: "PR_NEXT" },
        //com-desvio
        { lexeme: "RETURN", token: "PR_RETURN" },
        { lexeme: "BREAK", token: "PR_BREAK" },
        { lexeme: "CONTINUE", token: "PR_CONTINUE" },
        //com-leitura
        { lexeme: "SCAN", token: "PR_SCAN" },
        { lexeme: "SCANLN", token: "PR_SCANLN" },
        //com-escrita
        { lexeme: "PRINT", token: "PR_PRINT" },
        { lexeme: "PRINTLN", token: "PR_PRINTLN" },
        //op-soma
        { lexeme: "OR", token: "PR_OR" },
        //op-mult
        { lexeme: "DIV", token: "PR_DIV" },
        { lexeme: "MOD", token: "PR_MOD" },
        { lexeme: "AND", token: "PR_AND" },
        //valor-verdade
        { lexeme: "TRUE", token: "PR_TRUE" },
        { lexeme: "FALSE", token: "PR_FALSE" },
        //op-unario
        { lexeme: "NOT", token: "PR_NOT" }
    ];
    var ignorableChars = ["Backspace", "Shift"];
    var separators = [" ", "Enter", "Tab"];
    return {
        analysis: function (character) {
            var state = this.getState();

            this.setElementAttribute("state", "state_init", state);
            switch (state) {
                /*
                 * The 1st case validates all entries
                 */
                case "1":
                    this.analysisCase1(character);
                    break;
                /*
                 * The 2nd case validates integer entries 
                 */
                case "2":
                    this.analysisCase2(character);
                    break;
                /*
                * The 3th case validates decimal entries
                */
                case "3":
                    this.analysisCase3(character);
                    break;
                /*
                 * The 4th case validates character entries
                 */
                case "4":
                    this.analysisCase4(character);
                    break;
                /*
                 * The 5th case validates character entries
                 */
                case "5":
                    this.analysisCase5(character);
                    break;
                /*
                 * The 6th case validates string entries
                 */
                case "6":
                    this.analysisCase6(character);
                    break;
                /*
                 * The 7th case validates '>' entries
                 */
                case "7":
                    this.analysisCase7(character);
                    break;
                /*
                 * The 8th case validates '<' entries
                 */
                case "8":
                    this.analysisCase8(character);
                    break;
                /*
                 * The 9th case validates '=' entries
                 */
                case "9":
                    this.analysisCase9(character);
                    break;
                /*
                 * The 10th case validates alphanumeric entries
                 */
                case "10":
                    this.analysisCase10(character);
                    break;
                /*
                 * The 11th case validates '_' entries
                 */
                case "11":
                    this.analysisCase11(character);
                    break;
                /*
                 * The 12th case validates '/' entries
                 */
                case "12":
                    this.analysisCase12(character);
                    break;
                /*
                 * The 13th case validates block comentary
                 */
                case "13":
                    this.analysisCase13(character);
                    break;
                /*
                 * The 14th case validates block comentary
                 */
                case "14":
                    this.analysisCase14(character);
                    break;
                /*
                 * The 15th case validates line comentary
                 */
                case "15":
                    this.analysisCase15(character);
                    break;
                case "CONTROL":
                    this.analysisCaseControl(character);
                    break;
                case "SEPARADOR":
                    this.analysisCaseSeparator(character);
                    break;
                default:
                    break;
            }
        },
        analysisCase1: function (character) {
            if (separators.includes(character))
                this.setElementAttribute("state", "state", "SEPARADOR");
            else if ("Control" === character)
                this.setElementAttribute("state", "state", "CONTROL");
            else if ("," === character)
                this.setElementAttribute("state", "state", "SIN_V");
            else if (";" === character)
                this.setElementAttribute("state", "state", "SIN_PV");
            else if ("(" === character)
                this.setElementAttribute("state", "state", "SIN_PAR_A");
            else if (")" === character)
                this.setElementAttribute("state", "state", "SIN_PAR_F");
            else if ("[" === character)
                this.setElementAttribute("state", "state", "SIN_COL_A");
            else if ("]" === character)
                this.setElementAttribute("state", "state", "SIN_COL_F");
            else if ("+" === character)
                this.setElementAttribute("state", "state", "OP_SOMA");
            else if ("-" === character)
                this.setElementAttribute("state", "state", "OP_SUBTRAI");
            else if ("*" === character)
                this.setElementAttribute("state", "state", "OP_MULTI");
            else if (Number.isInteger(parseInt(character)))
                this.setElementAttribute("state", "state", "2");
            else if ("'" === character)
                this.setElementAttribute("state", "state", "4");
            else if ('"' === character)
                this.setElementAttribute("state", "state", "6");
            else if (">" === character)
                this.setElementAttribute("state", "state", "7");
            else if ("<" === character)
                this.setElementAttribute("state", "state", "8");
            else if ("=" === character)
                this.setElementAttribute("state", "state", "9");
            else if (this.isAlphabet(character))
                this.setElementAttribute("state", "state", "10");
            else if ("_" === character)
                this.setElementAttribute("state", "state", "11");
            else if ("/" === character)
                this.setElementAttribute("state", "state", "12");
            //else
            //    Console.WriteLine("Foi impossível mapear o character {0}!", character);
        },
        analysisCase2: function (character) {
            if (Number.isInteger(parseInt(character)))
                this.setElementAttribute("state", "state", "2");
            else if ("." === character)
                this.setElementAttribute("state", "state", "3");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "NUM_INT");
            }
        },
        analysisCase3: function (character) {
            if (Number.isInteger(parseInt(character)))
                this.setElementAttribute("state", "state", "3");
            else {
                if (this.getLastChar() === ".") {
                    repeatWord = character;
                    this.setElementAttribute("state", "state", "ERRO_NUM_REAL");
                    var error = "Erro no caractere " + character + ". No presente contexto o valor" + character + " deve ser um número.";
                } else {
                    repeatWord = character;
                    this.setElementAttribute("state", "state", "NUM_REAL");
                }
            }
        },
        analysisCase4: function (character) {
            if (character === "'")
                this.setElementAttribute("state", "state", "CARACTERE");
            else if (character.length === 1)
                this.setElementAttribute("state", "state", "5");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "ERRO_CARACTERE");
                var error = "Erro no caractere " + character + ". O tipo char suporta 0 ou 1 dígito e deve ser fechado com aspas simples.";
            }
        },
        analysisCase5: function (character) {
            if (character === "'")
                this.setElementAttribute("state", "state", "CARACTERE");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "ERRO_CARACTERE");
                var error = "Erro no caractere " + character + ". O tipo char suporta 0 ou 1 dígito e deve ser fechado com aspas simples.";
            }
        },
        analysisCase6: function (character) {
            if (character === '"')
                this.setElementAttribute("state", "state", "STRING");
            else if (character.length === 1)
                this.setElementAttribute("state", "state", "6");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "ERRO_STRING");
                var error = "Erro no caractere " + character + ". O tipo string suporta 0 ou mais dígitos e deve ser fechado com aspas duplas."
            }
        },
        analysisCase7: function (character) {
            if (character === "=")
                this.setElementAttribute("state", "state", "OP_MAIOR_IGUAL");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "OP_MAIOR");
            }
        },
        analysisCase8: function (character) {
            if (character === "=")
                this.setElementAttribute("state", "state", "OP_MENOR_IGUAL");
            else if (character === ">")
                this.setElementAttribute("state", "state", "OP_DIFERENTE");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "OP_MENOR");
            }
        },
        analysisCase9: function (character) {
            if (character === "=")
                this.setElementAttribute("state", "state", "OP_IGUAL");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "OP_ATRIBUI");
            }
        },
        analysisCase10: function (character) {
            if (this.isAlphanumeric(character))
                this.setElementAttribute("state", "state", "10");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "TABELA_EXCLUSIVOS");
                //var reservedWord = this.getReservedWord();
                //if (reservedWord !== null && reservedWord !== undefined) {
                //    this.setElementAttribute("state", "state", "TABELA_EXCLUSIVOS"); EXCLUSIVO DA LINGUAGEM
                //} else {
                //    this.setElementAttribute("state", "state", "TABELA_EXCLUSIVOS"); IDENTIFICADOR
                //}
            }
        },
        analysisCase11: function (character) {
            if (character === "_")
                this.setElementAttribute("state", "state", "11");
            else if (this.isAlphabet(character))
                this.setElementAttribute("state", "state", "10");
        },
        analysisCase12: function (character) {
            if (character === "*")
                this.setElementAttribute("state", "state", "13");
            else if (character === "/")
                this.setElementAttribute("state", "state", "15");
            else {
                repeatWord = character;
                this.setElementAttribute("state", "state", "OP_DIVI");
            }
        },
        analysisCase13: function (character) {
            if (character === "*")
                this.setElementAttribute("state", "state", "14");
        },
        analysisCase14: function (character) {
            var word = this.getWord;
            var lastChar = word[word.length - 1];
            if (character === "/" && lastChar === "*") //para validar um comentario eh necessario validar se o penultimo caracter corresponde a *
                this.setElementAttribute("state", "state", "1");
        },
        analysisCase15: function (character) {
            if (character === "Enter")
                this.setElementAttribute("state", "state", "1");
        },
        analysisCaseControl: function (character) {
            this.setElementAttribute("state", "state", "1");
        },
        analysisCaseSeparator: function (character) {
            if (!separators.includes(character))
                repeatWord = character;
        },
        analyseEntireCode: function (code) {
            for (var i = 0; i < code.length; i++) {
                this.startAnalysis(code[i]);
                if (repeatWord !== "")
                    --i;
            }
        },
        createImageFromCanvas: function (appendId, canvas) {
            var image = new Image();
            image.src = canvas.toDataURL();
            image.style.width = "auto";
            image.style.height = "30vh";
            document.getElementById(appendId).appendChild(image);
        },
        drawImage: function (canvas, context, image) {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
        },
        dyeImage: function (canvas, context, coordinates) {
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            var mustBe255 = this.getRandomValue(1, 4);
            var random_red = this.getRandomValue(0, 255);
            var random_green = this.getRandomValue(0, 255);
            var random_blue = this.getRandomValue(0, 255);
            mustBe255 === 1 ? random_red = 255 : mustBe255 === 2 ? random_green = 255 : random_blue = 255;
            var h = 0;

            while (coordinates.height_start.length > h) {
                for (var y = coordinates.height_start[h]; y < coordinates.height_end[h]; y++) {
                    for (var x = coordinates.width_start[h]; x < coordinates.width_end[h]; x++) {
                        var index = (x + canvas.width * y) * 4;
                        var r = data[index + 0],
                            g = data[index + 1],
                            b = data[index + 2];
                        if (!(r === 0 && g === 0 && b === 1)) {
                            data[index] = random_red;
                            data[index + 1] = random_green;
                            data[index + 2] = random_blue;
                        }
                    }
                }
                ++h;
            }
            context.putImageData(imageData, 0, 0);
        },
        getCoordinates: function (stateEnd, stateStart) {
            return diagramCoordinates.find(f =>
                f.coordinates.find(m =>
                    m.case_end === stateEnd && m.case_start === stateStart)
            ).coordinates.find(g =>
                g.case_start === stateStart && g.case_end === stateEnd
            );
        },
        getEntireCode: function () {
            return document.getElementById("userCode").value;
        },
        getImage: function (imageId) {
            return document.getElementById(imageId);
        },
        getImageId: function (state) {
            return diagramCoordinates.find(f => f.coordinates.find(m => m.case_end === state)).img_id;
        },
        getLastChar: function () {
            var word = this.getWord();
            return word[word.length - 1];
        },
        getRandomValue: function (min, max) {
            var random = Math.floor(Math.random() * (max - min)) + min;
            return random;
        },
        getReservedWord: function () {
            var word = this.getWord();
            return reservedWords.find(m => m.lexeme === word.toUpperCase());
        },
        getState: function () {
            return document.getElementById("state").getAttribute("state");
        },
        getStateInit: function () {
            return document.getElementById("state").getAttribute("state_init");
        },
        getWord: function () {
            return document.getElementById("state").getAttribute("word");
        },
        isAlphabet: function (character) {
            var alphanumericRegex = /^[a-zA-Z]+$/;
            if (character.match(alphanumericRegex) !== null && character.match(alphanumericRegex) !== undefined)
                return true;
            return false;
        },
        isAlphanumeric: function (character) {
            var alphanumericRegex = /^[0-9a-zA-Z]+$/;
            if (character.match(alphanumericRegex) !== null && character.match(alphanumericRegex) !== undefined)
                return true;
            return false;
        },
        onUserCodePaste: function (e) {
            var code = (e.originalEvent || e).clipboardData.getData('text/plain');
            this.analyseEntireCode(code);
        },
        onUserCodeKeyDown: function (e) {
            var key = repeatWord;
            if (e !== undefined) {
                key = e.key;
            }
            this.startAnalysis(key);
            if (repeatWord !== "")
                this.onUserCodeKeyDown();
        },
        setElementAttribute: function (id, attribute, value) {
            document.getElementById(id).setAttribute(attribute, value);
        },
        startAnalysis: function (key) {
            if (ignorableChars.includes(key))
                return;
            var needRepeat = true;
            repeatWord = "";

            var word = this.getWord();

            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");

            this.analysis(key);

            if (repeatWord === "")
                needRepeat = false;

            var state = this.getState();

            if (state !== "1" && state !== "CONTROL") {
                var img_id = this.getImageId(state);
                var image = this.getImage(img_id);

                if (word === "")
                    this.drawImage(canvas, context, image);

                var stateInit = this.getStateInit();

                var coordinates = this.getCoordinates(state, stateInit);

                this.dyeImage(canvas, context, coordinates);

                if (!needRepeat)
                    this.setElementAttribute("state", "word", word + key);
                if (state === "SEPARADOR" && !needRepeat)
                    return;
                if (!Number.isInteger(parseInt(state))) {
                    context.fillText(word, 10, 10);
                    this.createImageFromCanvas("history_canvas", canvas);
                    this.setElementAttribute("state", "word", "");
                    this.setElementAttribute("state", "state", "1");
                }
            }
        },
    };
};
const LexicalAnalysis = new LexicalAnalysisController();