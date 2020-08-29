var ErrorController = function () {
    return {
        addError: function (errorText, word) {
            var divError = document.getElementById("generatedErrors");
            divError.removeAttribute("hidden");

            document.getElementById("generatedErrorsButton").removeAttribute("hidden");

            var tagError = document.createElement("p");
            tagError.textContent = errorText;
            divError.appendChild(tagError);
        },
        clearErrors: function () {
            var divError = document.getElementById("generatedErrors");
            divError.setAttribute("hidden", "hidden");

            for (var i = 0; i < divError.childElementCount; i++) {
                divError.children[i].remove();
            }

            document.getElementById("generatedErrorsButton").setAttribute("hidden", "hidden");
        }
    }
};
const ErrorManager = new ErrorController();