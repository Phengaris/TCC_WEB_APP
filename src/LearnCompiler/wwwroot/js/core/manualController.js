var Manual = function () {
    return {
        showButton: function (collapseNumber, button) {
            var collapse = document.getElementById('collapse' + collapseNumber);

            if (!collapse.className.includes('show'))
                document.getElementById('button' + collapseNumber).click();

            document.getElementById(button).click();
        }
    }
};
const ManualController = new Manual();