var ErrorController = function () {
    return {
        addError: function (errorText) {
            var divError = document.getElementById("generatedErrors");
            divError.removeAttribute("hidden");

            var buttonError = document.getElementById("errorButton");
            buttonError.removeAttribute("hidden");

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

            var buttonError = document.getElementById("errorButton");
            buttonError.setAttribute("hidden", "hidden");
        }
    }
};
const ErrorManager = new ErrorController();