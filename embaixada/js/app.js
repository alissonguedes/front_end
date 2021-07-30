// require('./bootstrap');

/**
 * Função para criar cookies no site
 */
function setCookie(name, value, duration) {

    var d = new Date();
    d.setTime(d.getTime() + (duration * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var cookie = name + '=' + escape(value) + ((expires) ? '; duration=' + d.toUTCString() + ';path=/' : '');

    document.cookie = cookie;

}

/**
 * Função para verificar o cookie
 */
function getCookie(name) {

    var cookies = document.cookie;
    var prefix = name + '=';
    var begin = cookies.indexOf('; ' + prefix);

    if (begin == -1) {

        begin = cookies.indexOf(prefix);

        if (begin != 0) {
            return null;
        }

    } else {
        begin += 2;
    }

    var end = cookies.indexOf(';', begin);

    if (end == -1) {
        end = cookies.length;
    }

    return unescape(cookies.substring(begin + prefix.length, end));

}

/**
 * Função para deletar um cookie
 */
function deleteCookie(name) {

    if (getCookie(name)) {
        document.cookie = name + '=' + '; expires=Thu, 01-Jan-70 00:00:01 GMT';
    }

}

function translate(url, idioma) {

    // $('[data-translate]').html('');

    var idioma = typeof idioma !== 'undefined' ? idioma : $('html').attr('lang');

    console.log(idioma);
    $.ajax({
        url: url,
        type: 'get',
        success: ($response) => {

            var $field = JSON.parse($response);

            if ($field.idioma != $('html').attr('lang'))
                location.reload();

        }

    });


}

$(function() {

    $('.languages').each(function() {

        $(this).on('click', function(e) {

            e.preventDefault();
            var idioma = $(this).attr('id');

            setCookie('idioma', idioma, 365);
            translate($(this).attr('href'), idioma);

        });

    });

});

window.onload = () => {

    translate($('[data-url-lang]').data('url-lang'));

}