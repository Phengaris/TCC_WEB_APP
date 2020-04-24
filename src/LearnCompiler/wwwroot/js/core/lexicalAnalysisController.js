var LexicalAnalysisController = function () {
  var diagramCoordinates = [
    {
      img_id: "spaces_diagram",
      coordinates: [
        {
          case_start: "1",
          case_end: "IGNORAR",
          width_start: [85],
          width_end: [280],
          height_start: [40],
          height_end: [310]
        }
      ]
    },
    {
      img_id: "number_diagram",
      coordinates: [
        {
          case_start: "1",
          case_end: "2",
          width_start: [20],
          width_end: [180],
          height_start: [80],
          height_end: [160]
        },
        {
          case_start: "2",
          case_end: "2",
          width_start: [180],
          width_end: [260],
          height_start: [30],
          height_end: [160]
        },
        {
          case_start: "2",
          case_end: "3",
          width_start: [180],
          width_end: [340],
          height_start: [80],
          height_end: [160]
        },
        {
          case_start: "2",
          case_end: "NUM_INT",
          width_start: [180, 190],
          width_end: [260, 450],
          height_start: [80, 160],
          height_end: [160, 280]
        },
        {
          case_start: "3",
          case_end: "3",
          width_start: [340],
          width_end: [420],
          height_start: [20],
          height_end: [160]
        },
        {
          case_start: "3",
          case_end: "NUM_REAL",
          width_start: [340],
          width_end: [630],
          height_start: [20],
          height_end: [160]
        }
      ]
    }
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
        default:
          break;
      }
    },
    analysisCase1: function (character) {
      if (character.length > 1)
        state.setAttribute("state", "FIM");
      if (" " === character || "\r" === character || "\n" === character || "\t" === character)
        state.setAttribute("state", "IGNORAR");
      else if (Number.isInteger(parseInt(character)))
        state.setAttribute("state", "2");
      else if ("'" === character)
        state.setAttribute("state", "4");
      else if ('"' === character)
        state.setAttribute("state", "6");
      else if ("+" === character)
        state.setAttribute("state", "7");
      else if ("-" === character)
        state.setAttribute("state", "8");
      else if ("*" === character)
        state.setAttribute("state", "9");
      else if ("/" === character)
        state.setAttribute("state", "10");
      else if (">" === character)
        state.setAttribute("state", "11");
      else if ("<" === character)
        state.setAttribute("state", "12");
      else if ("=" === character)
        state.setAttribute("state", "13");
      else if ("&" === character)
        state.setAttribute("state", "14");
      else if ("|" === character)
        state.setAttribute("state", "15");
      else if ("%" === character)
        state.setAttribute("state", "16");
      else if ("!" === character)
        state.setAttribute("state", "17");
      else if (":" === character)
        state.setAttribute("state", "OP_RESPOSTA");
      else if ("?" === character)
        state.setAttribute("state", "OP_PERGUNTA");
      else if ("." === character)
        state.setAttribute("state", "OP_PONTO");
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
      else if ("{" === character)
        state.setAttribute("state", "SIN_CHA_A");
      else if ("}" === character)
        state.setAttribute("state", "SIN_CHA_F");
      //else if (textoController.EhAlfabeto(character))
      //    state = 18;
      else if ("_" === character)
        state.setAttribute("state", "19");
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
        //erroController.ErroNumero(caracter);
        var error = "erro numero real";
      else {
        if (Number.isInteger(parseInt(character)))
          state.setAttribute("state", "3");
        else {
          repeatWord = character;
          state.setAttribute("state", "NUM_REAL");
        }
      }
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
      var h = 0, w = 0;

      while (coordinates.height_start.length > h || coordinates.width_start.length > w) {
        for (var y = coordinates.height_start[h]; y < coordinates.height_end[h]; y++) {
          for (var x = coordinates.width_start[w]; x < coordinates.width_end[w]; x++) {
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
        ++h, ++w;
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

      if (repeatWord !== "")
        this.onUserCodeKeyDown();
    }
  };
};
const LexicalAnalysis = new LexicalAnalysisController();