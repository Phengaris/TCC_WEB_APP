var LexicalAnalysisController = function () {
    var diagramCoordinates = [
        {
            img_id: "space_diagram",
            coordinates: [
                {
                    case_start: "1",
                    case_end: "IGNORAR",
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
        },
    ];
    var repeatWord = "";
    return {
        analysis: function (character) {
            var state = this.getState();

            var stateInit = document.getElementById("state_init");
            stateInit.setAttribute("state", state);

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
                default:
                    break;
            }
        },
        analysisCase1: function (character) {
            if (" " === character || "Enter" === character || "Tab" === character)
                state.setAttribute("state", "IGNORAR");
            else if ("Shift" === character)
                state.setAttribute("state", "1");
            else if ("," === character)
                state.setAttribute("state", "SIN_V");
            else if (";" === character)
                state.setAttribute("state", "SIN_PV");
            else if ("(" === character)
                state.setAttribute("state", "SIN_PAR_A");
            else if (")" === character)
                state.setAttribute("state", "SIN_PAR_F");
            else if ("[" === character)
                state.setAttribute("state", "SIN_COL_A");
            else if ("]" === character)
                state.setAttribute("state", "SIN_COL_F");
            else if ("+" === character)
                state.setAttribute("state", "OP_SOMA");
            else if ("-" === character)
                state.setAttribute("state", "OP_SUBTRAI");
            else if ("*" === character)
                state.setAttribute("state", "OP_MULTI");
            else if (Number.isInteger(parseInt(character)))
                state.setAttribute("state", "2");
            else if ("'" === character)
                state.setAttribute("state", "4");
            else if ('"' === character)
                state.setAttribute("state", "6");
            else if (">" === character)
                state.setAttribute("state", "7");
            else if ("<" === character)
                state.setAttribute("state", "8");
            else if ("=" === character)
                state.setAttribute("state", "9");
            else if (this.isAlphanumeric(character))
                state.setAttribute("state", "10");
            else if ("_" === character)
                state.setAttribute("state", "11");
            else if ("/" === character)
                state.setAttribute("state", "12");
            //else
            //    Console.WriteLine("Foi impossível mapear o character {0}!", character);
        },
        analysisCase2: function (character) {
            if (Number.isInteger(parseInt(character)))
                state.setAttribute("state", "2");
            else if ("." === character)
                state.setAttribute("state", "3");
            else {
                repeatWord = character;
                state.setAttribute("state", "NUM_INT");
            }
        },
        analysisCase3: function (character) {
            if (character === ".")
                var error = "Erro no caractere " + character + ". No presente contexto o valor" + character + " deve ser um número.";
            else {
                if (Number.isInteger(parseInt(character)))
                    state.setAttribute("state", "3");
                else {
                    repeatWord = character;
                    state.setAttribute("state", "NUM_REAL");
                }
            }
        },
        analysisCase4: function (character) {
            if (character === "'")
                state.setAttribute("state", "CARACTERE");
            else if (character === "Shift")
                state.setAttribute("state", "4");
            else if (character.length === 1)
                state.setAttribute("state", "5");
            else
                var error = "Erro no caractere " + character + ". O tipo char suporta 0 ou 1 dígito e deve ser fechado com aspas simples.";
            //erroController.ErroCaracter(caracter);
        },
        analysisCase5: function (character) {
            if (character === "'")
                state.setAttribute("state", "CARACTERE");
            else
                var error = "Erro no caractere " + character + ". O tipo char suporta 0 ou 1 dígito e deve ser fechado com aspas simples.";
        },
        analysisCase6: function (character) {
            if (character === '"')
                state.setAttribute("state", "STRING");
            else if (character === "Shift" || character.length === 1)
                state.setAttribute("state", "6");
            else {
                var error = "Erro no caractere " + character + ". O tipo string suporta 0 ou mais dígitos e deve ser fechado com aspas duplas."
                state.setAttribute("state", "FIM");
            }
        },
        analysisCase7: function (character) {
            if (character === "=")
                state.setAttribute("state", "OP_MAIOR_IGUAL");
            else {
                repeatWord = character;
                state.setAttribute("state", "OP_MAIOR");
            }
        },
        analysisCase8: function (character) {
            if (character === "=")
                state.setAttribute("state", "OP_MENOR_IGUAL");
            else if (character === ">")
                state.setAttribute("state", "OP_DIFERENTE");
            else if (character === "Shift")
                state.setAttribute("state", "8");
            else {
                repeatWord = character;
                state.setAttribute("state", "OP_MENOR");
            }
        },
        analysisCase9: function (character) {
            if (character === "=")
                state.setAttribute("state", "OP_IGUAL");
            else {
                repeatWord = character;
                state.setAttribute("state", "OP_ATRIBUI");
            }
        },
        analysisCase10: function (character) {
            if (this.isAlphanumeric(character))
                state.setAttribute("state", "10");
            else {
                repeatWord = character;
                //---
            }
        },
        analysisCase11: function (character) {
            if (character === "_")
                state.setAttribute("state", "11");
            else if (this.isAlphanumeric(character))
                state.setAttribute("state", "10");
        },
        analysisCase12: function (character) {
            if (character === "*")
                state.setAttribute("state", "13");
            else if (character === "/")
                state.setAttribute("state", "15");
            else {
                repeatWord = character;
                state.setAttribute("state", "OP_DIVI");
            }
        },
        analysisCase13: function (character) {
            if (character === "*")
                state.setAttribute("state", "14");
        },
        analysisCase14: function (character) {
            var word = this.getWord;
            var lastChar = word[word.length - 1];
            if (character === "/" && lastChar === "*") //para validar um comentario eh necessario validar se o penultimo caracter corresponde a *
                state.setAttribute("state", "1");
        },
        analysisCase15: function (character) {
            if (character === "\n")
                state.setAttribute("state", "1");
        },
        createImageFromCanvas: function (appendId, canvas) {
            var image = new Image();
            image.src = canvas.toDataURL();
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
            var random_red = this.getRandomColor();
            var random_green = this.getRandomColor();
            var random_blue = this.getRandomColor();
            var h = 0;

            while (coordinates.height_start.length > h) {
                for (var y = coordinates.height_start[h]; y < coordinates.height_end[h]; y++) {
                    for (var x = coordinates.width_start[h]; x < coordinates.width_end[h]; x++) {
                        var index = (x + canvas.width * y) * 4;
                        var r = data[index + 0],
                            g = data[index + 1],
                            b = data[index + 2];
                        if (r !== 255 && g !== 255 && b !== 255) {
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
        getImage: function (imageId) {
            return document.getElementById(imageId);
        },
        getImageId: function (state) {
            return diagramCoordinates.find(f => f.coordinates.find(m => m.case_end === state)).img_id;
        },
        getRandomColor: function () {
            var min = 0;
            var max = 255;
            var random = Math.floor(Math.random() * (max - min)) + min;
            return random;
        },
        getState: function () {
            return document.getElementById("state").getAttribute("state");
        },
        getWord: function () {
            return document.getElementById("state").getAttribute("word");
        },
        onUserCodeKeyDown: function (e) {
            var key = repeatWord;
            repeatWord = "";
            if (e !== undefined)
                key = e.key;

            var word = this.getWord();

            var canvas = document.getElementById("myCanvas");
            var context = canvas.getContext("2d");

            this.analysis(key);

            var state = this.getState();

            if (state !== "1") {
                var img_id = this.getImageId(state);
                var image = this.getImage(img_id);

                if (word === "")
                    this.drawImage(canvas, context, image);

                var stateInit = document.getElementById("state_init").getAttribute("state");

                var coordinates = this.getCoordinates(state, stateInit);

                this.dyeImage(canvas, context, coordinates);

                if (state.length === 1)
                    document.getElementById("state").setAttribute("word", word + key);
                else {
                    context.fillText(word, 10, 10);
                    this.createImageFromCanvas("history_canvas", canvas);
                    document.getElementById("state").setAttribute("word", "");
                    document.getElementById("state").setAttribute("state", "1");
                }
            }

            if (repeatWord !== "")
                this.onUserCodeKeyDown();
        },
        isAlphanumeric: function (character) {
            var alphanumericRegex = /^[0-9a-zA-Z]+$/;
            if (character.match(alphanumericRegex) !== null && character.match(alphanumericRegex) !== undefined)
                return true;
            return false;
        }
    };
};
const LexicalAnalysis = new LexicalAnalysisController();