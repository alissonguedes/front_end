'use strict';

var xhr;

var Http = {

    goTo: (url, params) => {

        Http.get(url);

        Request.refreshUrl(url);

        // Redirecionar url com parâmetro.
        if (typeof params !== 'undefined') {
            Form.showMessage(params.message, params.status);
        }

    },

    get: (url, params, callback) => {

        if (params && typeof params !== 'function') {

            var array = [];

            $.ajax({
                'async': true,
                'method': (params.method || 'get'),
                'url': url,
                'headers': {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                'dataType': (params.datatype || 'json'),
                'data': (params.data || null),
                'success': (response) => {

                    if (typeof callback === 'function')
                        return callback(response);
                    else
                        return callback = response;

                }

            });

            return callback;

        } else {

            Http.open('GET', url);

        }

    },

    post: (url, params, callback) => {

        console.log(params);

        if (params && typeof params !== 'function') {

            $.ajax({
                'async': true,
                'headers': {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                'method': (params.method || 'post'),
                'url': url,
                'dataType': (params.datatype || 'json'),
                'data': (params.data || null),
                'success': (response) => {

                    if (typeof callback === 'function')
                        return callback(response);
                    else
                        return callback = response;
                }

            });

            return callback;

        } else {

            Http.open('POST', url);
        }

    },

    open: (type, url) => {

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.open(type, url);
        Http.send(url);

        // movimenta a barra de rolagem para o topo da pÃ¡gina
        $('html,body').animate({
            scrollBottom: 0
        }, {
            duration: 200
        });

    },

    send: (url) => {

        xhr.onprogress = function(e) {

        }

        xhr.onreadystatechange = function(e) {

        }

        xhr.onloadstart = function(e) {

        }

        xhr.onloadend = function(e) {

            // console.log(xhr);

            if (xhr.readyState === 4) {
                Http.renderer(xhr.response, xhr.status);
            } else {

            }

            // Recarrega scripts e funções de JS
            core();

        }

        xhr.onload = function(e) {

        }

        xhr.onerror = function(e) {
            // console.error(e);
        }

        xhr.send(null);

    },

    renderer: (content, status) => {

        var parser = new DOMParser();
        var responseHtml = parser.parseFromString(content, 'text/html');

        if (status !== 403) {

            var title = responseHtml.querySelector('title');

            if (title)
                document.title = title.innerHTML;

            if ($(responseHtml).find('#body').length) {
                console.log(responseHtml)
                $('#body').html($(responseHtml).find('#body').html());
            } else {
                $('#main').html($(responseHtml).find('html').html());
            }

            // console.log(responseHtml);
        } else {

            Storage.removeSession('token');

        }

    },

}