'use strict';

var links = '[href], [data-href], .link';

var Request = {

    addEvent: (link) => {

        var ln = typeof link === 'undefined' ? links : link;

        $('body').find(ln).on('click', function(e) {

            var link = $(this).data('href') || $(this).attr('href');
            var target = $(this).attr('target') || false;

            e.preventDefault();

            if (Request.isLink(link) && !target) {

                if (window.location.origin + link !== window.location.href) {
                    Http.goTo(link);
                }

            } else {

                if (target && target != '_self') {
                    window.open(link, target);
                } else
                if (target && target == '_self') {
                    window.location.href = link;
                }

            }

        });

    },

    refreshUrl: (url) => {

        if (BASE_URL + url !== window.location.href)
            window.history.pushState('', '', url);

    },

    isLink: (href) => {

        var URL = typeof href.split(BASE_URL)[1] === 'undefined' ? href : href.split(BASE_URL)[1];
        var isAnchor = /^[jJ]ava[sS]cript(\:[a-z]+)?|#([a-z]?)+$/i.test(URL);

        return href !== '' && !isAnchor && typeof URL !== 'undefined';

    },

    // Alterado para expandir o menu a partir de qualquer link no sistema.
    menu: () => {

        $('#slide-out').removeClass('active').find('.active').removeClass('active');

        if ($('aside').hasClass('nav-expanded')) {
            var url = [];
            var link = window.location.href.split(BASE_URL).splice(1)[0].split('/');
            for (var i in link) {
                url.push(link[i]);
                if ($('#slide-out li').find('a[href="' + BASE_URL + url.join('/') + '"').length == 1) {
                    $('#slide-out li').find('a[href="' + BASE_URL + url.join('/') + '"').addClass('active').parents().addClass('active').show();
                    break;
                }
            }
        }

    }

}