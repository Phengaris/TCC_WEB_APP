var ErrorController = function () {
    return {
        addError: function (errorText) {
            document.getElementById("generatedErrors").removeAttribute("hidden");

            var divError = document.getElementById("generatedErrorsContent");

            document.getElementById("generatedErrorsButton").className = document.getElementById("generatedErrorsButton").className.replace("invisible", "visible");

            var tagError = document.createElement("p");
            tagError.textContent = errorText;
            divError.appendChild(tagError);
        },
        clearErrors: function () {
            document.getElementById("generatedErrors").setAttribute("hidden", "hidden");
            var divError = document.getElementById("generatedErrorsContent");

            for (var i = divError.childElementCount - 1; i >= 0 ; --i) {
                divError.children[i].remove();
            }

            document.getElementById("generatedErrorsButton").className = document.getElementById("generatedErrorsButton").className.replace("visible", "invisible");
        }
    }
};
const ErrorManager = new ErrorController();