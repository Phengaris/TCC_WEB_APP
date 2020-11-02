var ErrorController = function () {
    return {
        addError: function (errorText, lexeme) {
            document.getElementById("generatedErrors").removeAttribute("hidden");

            var divError = document.getElementById("generatedErrorsContent");

            document.getElementById("generatedErrorsButton").className = document.getElementById("generatedErrorsButton").className.replace("invisible", "visible");

            var tagError = document.createElement("p");
            tagError.textContent = errorText;
            tagError.setAttribute("lexeme", lexeme);
            divError.appendChild(tagError);
        },
        clearError: function (lexeme) {
            var divError = document.getElementById("generatedErrorsContent");
            if (divError.childElementCount === 0)
                return;
            var errorArray = Array.from(divError.children);
            var index = errorArray.reverse().findIndex(f => f.getAttribute("lexeme") === lexeme);
            var count = errorArray.length - 1
            var lastIndex = index >= 0 ? count - index : index;
            if(lastIndex > -1)
                divError.children[lastIndex].remove();
            if (divError.childElementCount === 0) {
                this.hideErrorTab();
            }
        },
        clearErrors: function () {
            var divError = document.getElementById("generatedErrorsContent");

            for (var i = divError.childElementCount - 1; i >= 0 ; --i) {
                divError.children[i].remove();
            }
            this.hideErrorTab();
            
        },
        hideErrorTab: function () {
            document.getElementById("generatedErrors").setAttribute("hidden", "hidden");
            if (!document.getElementById("generatedErrorsButton").className.includes("invisible"))
                document.getElementById("generatedErrorsButton").className = document.getElementById("generatedErrorsButton").className.replace("visible", "invisible");
            if (document.getElementById("generatedErrorsButton").style.backgroundColor === "crimson")
                document.getElementById("defaultOpen").click();
        }
    }
};
const ErrorManager = new ErrorController();