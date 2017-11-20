myApp.service('TemplateService', function () {

    this.title = "TUI AngularJS";

    var d = new Date();
    this.year = d.getFullYear();

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