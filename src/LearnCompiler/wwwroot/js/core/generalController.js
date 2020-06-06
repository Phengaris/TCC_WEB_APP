var GeneralController = function () {
    var slideIndex = 1;
    return {
        openTab: function (tabName, e, color) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabContent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tabLink");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].style.backgroundColor = "";
            }
            document.getElementById(tabName).style.display = "block";
            e.style.backgroundColor = color;
        },
        plusHistoryAnalexSlides: function (n) {
            this.showHistoryAnalexSlides(slideIndex += n);
        },
        showHistoryAnalexSlides: function (n) {
            var i;
            var slides = document.getElementsByClassName("historyAnalex");
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
           
            slides[slideIndex - 1].style.display = "block";
        }
    }
};
const General = new GeneralController();