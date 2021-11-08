'use strict';

var _element;
var _duration = 500;
var _timeRemaining = 10,
	_displayLength = 5000;
if (typeof SHOW_DEFAULTS_MESSAGES === 'undefined')
	var SHOW_DEFAULTS_MESSAGES = true;


var Form = {

	init: () => {

		$('body').find('form').each(function() {

			_element = $(this);

			$(this).on('submit', function(e) {

				e.preventDefault();

				Form.textarea();

				setTimeout(function() {
					Form.send();
				}, 100);

			});

			$(this).find('#btn-back').on('click', function() {

				Form.clearErrors();
				var url = $(this).data('link');
				Http.goTo(url);

			});

			_element.find('[autofocus]').focus();

			// Acender botões se valores dos checkboxes forem verdadeiros
			// Ex.: botões de bloqueio
			Form.toggleButtons();

		});

		// Exibir formulários nas páginas e omitir as dataTables
		$('.add-button').on('click', function() {
			var url = $(this).data('link');
			Http.goTo(url);
		});

		Form.image_upload();

	},

	reset: () => {

		_element.find('[type=reset]').click();
		_element.find('.ql-container').find('.ql-editor').empty().parents('.ql-container').parent().find('[type=hidden]').val('');
		_element.find('.files').find('.redefinir').click().hide();
		_element.find('.files').find('.btn_add_new_image').show();
		_element.find('[autofocus]').focus();

		// Form.image_upload();

		_element.resetForm();

		_element.find('.dropzone').find('[type="file"]').each(function(e, ind) {

			$(this).parent().find('.miniaturas').remove();
			// $('#file' + e).remove();

		});

	},

	send: () => {

		var success = Boolean;
		var label = _element.find(':button:submit').find('i').html();
		var method = _element.attr('method');
		var action = _element.attr('action');

		$(_element).ajaxSubmit({

			method: method, // method
			action: action, // url
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			beforeSend: (e) => {

				Form.__button__(label, true);

				$('.editor').each(function() {

					var id = $(this).attr('id');
					var input = $(this).parent().find('input[name="' + id + '"]');

					console.log(input.next('[type=hidden]').val(input.val()));

				})

			},

			success: (response) => {

				Form.clearErrors();

				try {

					var $response = typeof response === 'string' ? JSON.parse(response) : response;

					if (_element.attr('id') === 'frm-login') {

						Form.login($response, label);

					} else {

						if ($response.status === 'success') {

							if ($response.message) {
								Form.showMessage($response.message, null, 'Ok');
							}

							if (_element.find('[name=_method]').val() === 'post') {
								Form.reset();
							}

							Form.refreshPage($response);

						} else {

							if (typeof $response.fields !== 'undefined')
								Form.showErrors($response.fields);
							else
								Form.showMessage($response.message);

							success = false;

						}

					}

					Form.__button__(label, false);

				} catch (error) {

					if (Storage.checkSession()) {

						if (window.location.href.split('/').pop() == 'login') {
							Http.goTo('dashboard');
						}

					} else {
						M.toast({
							html: error
						});
					}

					Form.__button__(label, false);

				}

			},

			error: (error) => {

				Form.clearErrors();

				Form.showErrors(error.responseJSON, error.status)
				Form.__button__(label, false);
			}

		});

	},

	textarea: () => {

		var items = ['.editor', '.editor--full', '.editor--basic'];

		$(items.toString()).each(function() {

			$(this).parent('.input-field').find('input[type="hidden"]').val($(this).find('.ql-editor').html());

		})

	},

	login: (response, label) => {

		if (response.status === 200) {

			var $titulo_inicial = $('#boas-vindas').find('h5').text();
			var $titulo = 'Olá, ' + response.data.user + ', seja bem-vindo!'

			Form.__avancar__($titulo);

			_element.find(':button:submit').removeClass('next');

			setTimeout(function() {
				document.getElementById('senha').focus();
				Form.__button__(label, false);
				Form.__voltar__($titulo_inicial);
			}, 270);

		} else {

			if (response.status === 'success') {

				if (response.message) {
					Form.showMessage(response.message, null, 'Ok');
					Form.reset();
				}

				// CRIAR FUNÇÃO PARA EXECUTAR ATUALIZAÇÃO NA PÁGINA DE ACORDO COM A REQUISIÇÃO
				setTimeout(function() {

					if (response.type === 'reload') {

						location.href = response.url;

					} else {

						// Criar um banco de dados local para armazenar as credenciais de acesso
						Storage.set('token', response.data.token);
						Http.goTo(response.url);

					}

				}, _duration);

			} else {

				Form.showErrors(response, response.status)
				Form.__button__(label, false);

			}

		}

	},

	refreshPage: (type) => {

		if (type.type === 'back') {

			// Form.reset();
			Http.goTo(type.url)

		}

		_element.find('.files').find('.redefinir').hide();
		_element.find('.files').find('.btn_add_new_image').show();

	},

	fill: (obj) => {

		Object.keys(obj).map((key) => {

			if ($('body').find('[name="' + key + '"]').length) {
				var input = document.querySelector('[name="' + key + '"]');
				Form.serialize(input, obj[key]);
			}

			if (typeof obj[key] === 'object' && obj[key]) {

				for (var rule in obj[key]) {

					if ($('body').find('[name="' + key + '.' + rule + '"]').length) {
						var input = document.querySelector('[name="' + key + '.' + rule + '"]');
						Form.serialize(input, obj[key][rule]);
					}

				}

			}

		});

		// Acender botões se valores dos checkboxes forem verdadeiros
		// Ex.: botões de bloqueio
		Form.toggleButtons();

	},

	show: (method, id) => {

		if (Storage.checkSession()) {

			_element.parent('#form').show().find('.panel').addClass('loading');
			$('#list').hide();

			_element.find('[name="_method"]').val(method);

			var form_tab = M.Tabs.getInstance($('.form-tabs'));
			form_tab.select('account');

			if (id) {

				var url = window.location.href + '/' + id;

				Http.get(url, 'json', (response) => {

					Form.fill(response);
					_element.find('[autofocus]').focus();
					_element.find('.panel').removeClass('loading');

				});

			} else {
				_element.find('[autofocus]').focus();
				_element.parent('#form').find('.panel').removeClass('loading');
			}

		} else {

			Http.goTo('login');

		}

	},

	toggleButtons: () => {

		// Resetar valores dos campos de textos
		_element.find('input,textarea').each(function() {
			if ($(this).val() != '')
				$(this).parents('.input-field').find('label').addClass('active');
		})

	},

	image_upload: () => {

		$(_element).find('.files').each(function() {

			var placeholder = '';
			var img;

			// Input alterar imagem/arquivo
			placeholder = $(this).find('[data-placeholder]');

			// utilizar o texto que está no placeholder da div
			placeholder.html(placeholder.data('placeholder'));

			// Exibir a imagem em uploads de imagens
			$(this).find('.image_alt').on('click', function(e) {

				img = $(this).parents('.files').find('img');

				$(this).parents('.files').find(':input:file').click();

			});

			// Redefinir foto do perfil de usuário
			$(this).find('.redefinir').on('click', function() {

				$(this).parents('.files').find('.original').show();
				$(this).parents('.files').find('.temp').parent().remove();
				$(this).parents('.files').find('.redefinir').hide();
				$(this).parents('.files').find('.btn_add_new_image').show();
				$(this).parents('.files').find('[data-placeholder]').html(placeholder.data('placeholder'));
				$('.image_view').parents().find(':input:file').val('');

			});

			// Alterar imagem ao selecionar uma no upload de arquivos
			$(this).find('.image_alt').each(function() {

				$(this).parents('.files').find(':input:file').on('change', function() {

					var classes = $(this).parents('.image_alt').attr('class');
					var self = $(this).attr('id');

					$(this).parents('.files').find('.original').hide();
					$(this).parents('.files').find('.temp').parent().remove();

					if ($(this).val()) {

						var file = document.querySelector('#' + self).files;
						var len = file.length;

						for (var i = 0; i <= len; i++) {

							var src = window.URL.createObjectURL(file[i]);
							var img = $('<img/>', {
								'src': src,
								'class': 'materialboxed temp',
							});

							$(this).parents('.files').find('[data-placeholder]').html(file[i].name + (len > 1 ? ' +' + (len - 1) + ((len - 1) > 1 ? ' arquivos' : ' arquivo') : ''));

							$(this).parents('.files').find('.image_view').append(img);
							$(this).parents('.files').find('.redefinir').show();
							$(this).parents('.files').find('.btn_add_new_image').hide();
							$(img).materialbox();

						}

					}

				});

			});

		});

	},

	serialize: (input, value) => {

		var nodeName = input.nodeName;
		var type = input.type;

		switch (nodeName) {

			case 'INPUT':
				switch (type) {
					case 'text':
					case 'hidden':
					case 'password':
					case 'email':
					case 'url':

						$(input).val(value);

						break;

					case 'checkbox':
					case 'radio':

						if ($('[name="' + input.name + '"]').val() === value || value === true) {
							$(input).attr('checked', true);
						} else {
							$(input).attr('checked', false);
						}

						break;

					case 'file':
						break;

				}
				break;

			case 'TEXTAREA':

				$(input).val(value);

				break;

			case 'SELECT':
				switch (type) {
					case 'select-one':

						if ($('select[name="' + input.name + '"]').find('option[value="' + value + '"]').length) {
							$('select[name="' + input.name + '"]')
								.find('option[selected]').removeAttr('selected');
							$('option[value="' + value + '"]').attr('selected', true);
							$('select[name="' + input.name + '"]').formSelect()
						}

						break;
					case 'select-multiple':
						for (j = form._elements[i].options.length - 1; j >= 0; j = j - 1) {
							if (form._elements[i].options[j].selected) {
								q.push(form._elements[i].name + '=' + encodeURIComponent(form._elements[i].options[j].value))
							}
						}
						break
				}
				break;

		}

	},

	showMessage: ($text, $status, $title = '') => {

		if (!SHOW_DEFAULTS_MESSAGES) return false;

		$('#toast-container').children().animate({
			marginLeft: '0.3in',
			opacity: 0,
		}, {
			duration: 200,
			complete: () => {
				$('#toast-container').children().css('margin', 0);
			}
		});

		if (typeof $text !== 'object') {

			var classes = 'z-depth-2';

			$('.toast-action').on('click', function(e) {
				e.preventDefault();
				M.Toast.dismissAll();
			});

			setTimeout(function() {

				M.toast({
					classes: classes + ' ' + (typeof $status !== null ? $status : ''),
					html: $text + '<button class="btn btn-floating btn-small transparent toast-action waves-effect waves-light"><i class="material-icons">close</i></button>',
					timeRemaining: _timeRemaining,
					displayLength: _displayLength,
					panning: false,
				});

			}, 200);

		}

	},

	showErrors: (error, status) => {

		if (SHOW_DEFAULTS_MESSAGES && typeof error.message !== 'undefined') {
			M.toast({
				html: 'Erro [' + status + ']: ' + error.message + '<button class="btn btn-floating btn-small transparent toast-action waves-effect waves-light"><i class="material-icons">close</i></button>',
				timeRemaining: _timeRemaining,
				displayLength: _displayLength,
			});

			$('.toast-action').on('click', function(e) {
				e.preventDefault();
				M.Toast.dismissAll();
			});
		}

		$('.input-field').removeClass('error').find('.error').remove();

		if (typeof error.errors !== 'undefined') {

			var $field = error.errors;

			Object.keys($field).forEach((item) => {

				var label = $('[name="' + item + '"]');
				var div = $('<div/>', {
					'class': 'error'
				});
				var icon = $('<i/>', {
					class: 'material-icons sufix'
				}).html('error');

				$(label).parents('.input-field').addClass('error')
					.find('.error').remove();

				$(label).parents('.input-field').addClass('error')
					.append(div.append(icon, $field[item]));

			})

			$(':valid').focus();

		}

		Form.__button__(null, false);

	},

	clearErrors: () => {

		M.Toast.dismissAll();

		_element.find('.input-field').find('input').each(function() {
			if ($(this).val() != '') {
				$(this).parent().removeClass('error').find('.error').remove();
			}
		});

		_element.find('.input-field').find('.select-wrapper,select').each(function() {
			if ($(this).val() != '') {
				$(this).parents('.input-field').removeClass('error').find('.error').remove();
			}
		});

	},

	__button__: (label, block) => {

		var spinner = '<div class="preloader-wrapper small active"><div class="spinner-layer spinner-green-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';

		if (block) {
			_element.find(':button:submit').attr('disabled', true)
				.find('i').removeClass('material-icons').html(spinner);
		} else {
			_element.find(':button:submit').attr('disabled', false)
				.find('i').addClass('material-icons').html(label);
		}

	},

	__avancar__: ($titulo) => {

		$('#boas-vindas')
			.removeClass('animated faster fadeOutLeft fadeInLeft fadeInRight fadeOutRight')
			.find('h5')
			.html($titulo);

		$('#boas-vindas')
			.addClass('animated faster fadeOutLeft')
			.removeClass('animated faster fadeOutLeft')
			.addClass('animated faster fadeInLeft')

		$('#input-login')
			.removeClass('animated faster fadeOutLeft fadeInLeft fadeInRight fadeOutRight')
			.addClass('animated faster fadeOutLeft')
			.find('[name="login"]')
			.attr('disabled', true);

		$('#input-pass')
			.removeClass('animated fast fadeOutLeft fadeInLeft fadeInRight fadeOutRight')
			.addClass('animated faster fadeInRight')
			.show()
			.find('[name="senha"]')
			.attr('disabled', false);

		$('#relembrar_login')
			.hide();

		$('#btn-back,#relembrar_senha')
			.css('display', 'flex')
			.attr('disabled', false);

	},

	__voltar__: ($titulo) => {

		$('#btn-back').on('click', function() {

			$('#boas-vindas')
				.removeClass('animated faster fadeOutLeft fadeInLeft fadeInRight fadeOutRight')
				.find('h5')
				.html($titulo);

			$('#boas-vindas')
				.addClass('animated faster fadeOutRight')
				.removeClass('animated faster fadeOutRight')
				.addClass('animated faster fadeInRight')

			$('#input-pass')
				.removeClass('animated faster fadeOutLeft fadeInLeft fadeInRight fadeOutRight')
				.addClass('animated faster fadeOutRight')
				.find('[name="senha"]')
				.val('')
				.attr('disabled', true);

			$('#btn-back,#relembrar_senha')
				.css('display', 'flex')
				.attr('disabled', true)
				.hide();

			$('#input-login')
				.removeClass('animated faster fadeOutLeft fadeInLeft fadeInRight fadeOutRight')
				.addClass('animated faster fadeInLeft')
				.show()
				.find('[name="login"]')
				.attr('disabled', false);

			$('#relembrar_login').show();

			document.getElementById('login').focus();

		})

	},

}
