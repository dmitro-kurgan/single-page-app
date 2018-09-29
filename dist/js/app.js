'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('first-screen', 'first-screen.html', true),
            new Route('page-1', 'page-1.html'),
            new Route('page-form', 'page-form.html')
        ]);
    }
    init();
}());
