myApp.service('TemplateService', function () {

    this.title = "Inspire";

    var d = new Date();
    this.year = d.getFullYear();

    this.basket = "views/modals/basket.html";
    this.outcome = "views/modals/outcome.html";

    this.home = { // templates for home.html
        vertical: "views/content/layout/home-vertical.html",
        horizontal: "views/content/layout/home-horizontal.html",
        mobileGrid: "views/content/layout/insp-grid-mobile.html",
        desktopGrid: "views/content/layout/insp-grid-desktop.html"
    };

    this.error = { // templates for error page
        header: "views/error-pages/header.html",
        footer: "views/error-pages/footer.html"
    };

    this.regex = { // global regex 
        name: /^[a-zA-Z]+([\\s\-]?[a-zA-Z]+)?$/,
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    };

    this.init = function () {
        this.header = "views/templates/header.html";
        this.footer = "views/templates/footer.html";
        this.content = "views/error-pages/content/404.html";
    };

    this.getHTML = function (page) {
        this.init();
        var data = this;
        data.content = "views/" + page;
        return data;
    };

    this.init();

});