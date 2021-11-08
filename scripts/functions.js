function preview_map() {

	var reg = /[\<]iframe((\s+[\S+]+)+)?[\>](\S.+)?[\<][\/]iframe[\>]/i;

	$('[name="gmaps"]').each(function() {

		if ($(this).val() != '') {
			if (reg.test($(this).val())) {
				$('#preview').attr('disabled', false);
				$('.card-reveal #iframe').html($(this).val());
				$(this).parents('.input-field').removeClass('error').find('.error').remove();
			} else {
				$(this).parents('.input-field').addClass('error').append('<div class="error">O mapa está incorreto</div>');
				$('#preview').attr('disabled', true);
				$('.card-reveal #iframe').empty().html('Não há um mapa para ser carregado.');
			}
		} else {
			$('#preview').attr('disabled', true);
			$(this).parents('.input-field').removeClass('error').find('.error').remove();
		}

		$(this).on('keyup', function(e) {

			if ($(this).val() != '') {

				if (reg.test($(this).val())) {

					$('#preview').attr('disabled', false);
					$('.card-reveal #iframe').html($(this).val());
					$(this).parents('.input-field').removeClass('error').find('.error').remove();

				} else {

					$(this).parents('.input-field').addClass('error').find('.error').remove()
					$(this).parents('.input-field.error').append('<div class="error">O mapa está incorreto</div>');
					$('#preview').attr('disabled', true);
					$('.card-reveal #iframe').html('Não há um mapa para ser carregado.');

				}

			} else {

				$('#preview').attr('disabled', true);
				$('.card-reveal #iframe').empty().html('Não há um mapa para ser carregado.');
				$(this).parents('.input-field').removeClass('error').find('.error').remove();

			}

		});

	});

}

function resizeble() {

	var index = $('#index');
	var height = $(window).outerHeight();

	index.css({
		'height': height + 'px',
	});

}

function resizeBody() {

	// var alturaBody = $('body').height();

	// var alturaTotal = alturaBody - 420;

	// setTimeout(() => {
	//     $('.dataTables_wrapper.no-footer .dataTables_scrollBody').css({
	//         'height': alturaTotal + 'px',
	//         'min-height': alturaTotal + 'px',
	//         'max-height': alturaTotal + 'px',
	//     });
	// }, 0);

}

function animate(component, animation, callback) {

	var object;
	var animations = ["animated", "bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello", "heartBeat", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flip", "flipInX", "flipInY", "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight↵	", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "hinge", "jackInTheBox", "rollIn", "rollOut"]

	$(component).removeClass(animations).addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass(animations);

		if (typeof callback === 'function')
			callback($(this));
	});

};

function editor() {

	// // Editor sem barra de ferramentas
	// $('.editor--hide_toolbar').each(function(e){

	//     tinymce.init({
	//         selector: '.' + $(this).attr('class').replace(/\s/g, '.'),
	//         height: typeof $(this).data('height') !== 'undefined' ? $(this).data('height') : 250,
	//         plugins: [],
	//         toolbar: false,
	//         menubar: false,
	//         inline: false,
	//         placeholder: typeof $(this).attr('placeholder') !== 'undefined' ? $(this).attr('placeholder') : null,
	//         content_css: typeof $(this).data('style') !== 'undefined' ? $(this).data('style') : BASE_PATH + 'styles/style.css',
	//     });

	// });

	// // // Editor básico
	// $('.basic--editor').each(function() {

	// 	var editor = new Quill(this, {
	// 		placeholder: typeof $(this).attr('placeholder') !== 'undefined' ? $(this).attr('placeholder') : null,
	// 		theme: 'snow'
	// 	});

	// });


	// Editor completo
	$('.full--editor').each(function() {
		tinymce.init({
			selector: '.' + $(this).attr('class').replace(/\s/g, '.'),
			relative_urls: false,
			remove_script_host: false,
			convert_urls: true,

			// images_upload_base_path: 'teste',
			images_upload_handler: function(blobInfo, success, failure) {

				var xhr, formData;
				var token = $('meta[name="csrf-token"]').attr('content');

				xhr = new XMLHttpRequest();
				xhr.withCredentials = false;
				xhr.open('POST', BASE_URL + 'api/tinymce');

				xhr.setRequestHeader("X-CSRF-Token", token);
				xhr.onload = function() {
					var json;
					if (xhr.status != 200) {
						failure('HTTP Error: ' + xhr.status);
						return;
					}
					json = JSON.parse(xhr.responseText);

					if (!json || typeof json.location != 'string') {
						failure('Invalid JSON: ' + xhr.responseText);
						return;
					}

					success(json.location);

				};

				formData = new FormData();
				formData.append('file', blobInfo.blob(), blobInfo.filename());

				xhr.send(formData);

			},
			file_picker_callback: function(cb, value, meta) {
				var input = document.createElement('input');
				input.setAttribute('type', 'file');
				input.setAttribute('accept', 'image/*');
				input.onchange = function() {
					var file = this.files[0];
					var id = 'blobid' + (new Date()).getTime();
					var blobCache = tinymce.activeEditor.editorUpload.blobCache;
					var blobInfo = blobCache.create(id, file);
					blobCache.add(blobInfo);
					cb(blobInfo.blobUri(), {
						title: file.name
					});
				};
				input.click();
			},
			height: typeof $(this).data('height') !== 'undefined' ? $(this).data('height') : 550,
			menubar: true,
			plugins: [
				'quickbars advlist autolink link image lists charmap print preview hr anchor pagebreak',
				'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
				'table emoticons template paste help'
			],
			toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
				'bullist numlist outdent indent | link | print preview media fullpage | ' +
				'forecolor backcolor emoticons | help | image',
			menu: {
				favs: {
					title: 'My Favorites',
					items: 'code visualaid | searchreplace | emoticons'
				}
			},
			menubar: 'favs file edit view insert format tools table help',
			content_css: typeof $(this).data('style') !== 'undefined' ? $(this).data('style') : BASE_PATH + 'styles/style.css',
			placeholder: typeof $(this).attr('placeholder') !== 'undefined' ? $(this).attr('placeholder') : null
		});
	});

}

$(window).on('resize', function(e) {

	resizeBody();

});


/**
 * Função para aplicar máscaras nos inputs do navegador.
 */
var App = {
	aplicarMascaras: function() {

		var is_num = $('.is_num');
		var is_cpf = $('.is_cpf');
		var is_date = $('.is_date');
		var is_cnpj = $('.is_cnpj');
		var is_cpf_cnpj = $('.is_cpf_cnpj');
		var is_phone = $('.is_phone');
		var is_celular = $('.is_celular');
		var is_decimal = $('.is_decimal');
		var is_time = $('.is_time');
		var is_cep = $('.is_cep');
		var is_interval_time = $('.is_interval_time');

		is_num.each(function() {
			var $class = typeof $(this).attr('data-align') !== 'undefined' && $(this).attr('data-align') != '' ? $(this).attr('data-align') : 'right';
			var $placeholder = typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') != '' ? $(this).attr('placeholder') : '0';
			var $maxlength = typeof $(this).attr('maxlength') !== 'undefined' && $(this).attr('maxlength') != '' ? $(this).attr('maxlength') : 9;

			var input = this;

			$(window).load(function(e) {
				MascaraUtils.mascara(input, MascaraUtils.NUMERICO);
			});

			$(this).keyup(function() {
				MascaraUtils.mascara(this, MascaraUtils.NUMERICO);
			}).on('keypress', function() {
				MascaraUtils.mascara(this, MascaraUtils.NUMERICO);
			}).attr('maxlength', $maxlength).attr('placeholder', $placeholder).addClass('text-' + $class);
			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.NUMERICO);
		});

		is_cnpj.each(function() {

			var input = this;

			MascaraUtils.mascara(input, MascaraUtils.CNPJ);

			$(this).keyup(function() {
				MascaraUtils.mascara(this, MascaraUtils.CNPJ);
			}).on('keypress', function() {
				MascaraUtils.mascara(this, MascaraUtils.CNPJ);
			}).attr('maxlength', 18);

			if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') != '')
				$(this).attr('placeholder', $(this).attr('placeholder'));
			else if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') == '')
				$(this).removeAttr('placeholder').parent('.input-field').find('label').removeClass('active')

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.CNPJ);
		});

		is_cpf.each(function() {

			var input = this;

			MascaraUtils.mascara(input, MascaraUtils.CPF);

			$(this).keyup(function() {
				MascaraUtils.mascara(this, MascaraUtils.CPF);
			}).on('keypress', function() {
				MascaraUtils.mascara(this, MascaraUtils.CPF);
			}).attr('maxlength', 14);

			if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') != '')
				$(this).attr('placeholder', $(this).attr('placeholder'));
			else if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') == '')
				$(this).removeAttr('placeholder').parent('.input-field').find('label').removeClass('active')

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.CPF);
		});

		is_cpf_cnpj.each(function() {

			var input = this;

			MascaraUtils.mascara(input, MascaraUtils.CPF_CNPJ);

			$(this).keyup(function() {
				MascaraUtils.mascara(this, MascaraUtils.CPF_CNPJ);
			}).on('keypress', function() {
				MascaraUtils.mascara(this, MascaraUtils.CPF_CNPJ);
			}).attr('maxlength', 18);

			if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') != '')
				$(this).attr('placeholder', $(this).attr('placeholder'));
			else if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') == '')
				$(this).removeAttr('placeholder').parent('.input-field').find('label').removeClass('active')

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.CPF_CNPJ);
		});

		is_phone.each(function() {

			var input = this;

			MascaraUtils.mascara(input, MascaraUtils.TELEFONE);

			var len = 13;
			$(this).keyup(function() {
				MascaraUtils.mascara(this, MascaraUtils.TELEFONE);
			}).on('keypress', function() {

				MascaraUtils.mascara(this, MascaraUtils.TELEFONE);

				$(this).val($(this).val().replace('(', '').replace(')', ''));

			}).attr('maxlength', len);


			if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') != '')
				$(this).attr('placeholder', $(this).attr('placeholder'));
			else if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') == '')
				$(this).removeAttr('placeholder').parent('.input-field').find('label').removeClass('active')

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.TELEFONE);
		});

		is_celular.each(function() {

			var input = this;

			MascaraUtils.mascara(input, MascaraUtils.CELULAR);

			$(this).keyup(function() {
				MascaraUtils.mascara(this, MascaraUtils.CELULAR);
			}).on('keypress', function() {
				MascaraUtils.mascara(this, MascaraUtils.CELULAR);
			}).attr('maxlength', 16);

			if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') != '')
				$(this).attr('placeholder', $(this).attr('placeholder'));
			else if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') == '')
				$(this).removeAttr('placeholder').parent('.input-field').find('label').removeClass('active')

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.CELULAR);

		});

		is_interval_time.each(function() {

			console.log(MascaraUtils.INTERVAL_TIME);
			var input = this;

			MascaraUtils.mascara(input, MascaraUtils.INTERVAL_TIME);
			$(this).keyup(function() {
				MascaraUtils.mascara(this, MascaraUtils.INTERVAL_TIME, 'patterns');
			}).on('keypress', function() {

			});

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.INTERVAL_TIME);

		});


		is_decimal.each(function() {

			var exp = /^0\,[0-9]{2}$/;
			var $val = typeof $(this).attr('data-value') !== 'undefined' && $(this).attr('data-value') != null ? $(this).attr('data-value') : '0,00';
			var $class = typeof $(this).attr('data-align') !== 'undefined' && $(this).attr('data-align') != '' ? $(this).attr('data-align') : 'right';

			$(this).val($val);

			var input = this;
			//
			//          $(window).load(function(e){
			MascaraUtils.mascara(input, MascaraUtils.DECIMAL);
			//          });

			$(this).on('keydown', function(e) {

				MascaraUtils.mascara(this, MascaraUtils.DECIMAL);

				if ($(this).val() == '' || $(this).val() == '0,00' || $(this).val() == '0') {

					if (e.keyCode == 8) {
						$(this).val('0,00');
						e.preventDefault();
						return false;
					}

				}

				if ($(this).val().length <= 2) {
					$(this).val('0' + ($(this).val()));
				}

				if (is_numeric(e.key)) {

					var valor = parseFloat($(this).val().replace(',', '.'));

					if (exp.test($(this).val())) {

						if (valor < 1) {
							$(this).val(($(this).val()).slice(-2));
						}

					}

				}


			}) // .on('keyup', function(e) {

			//	if ($(this).val() == '' || $(this).val() == '0,00' || $(this).val() == '0')
			//		if (e.keyCode == 8) {
			//			$(this).val('0,00');
			//			e.preventDefault();
			//			return false;
			//		}
			//
			//}).attr('maxlength', (typeof $(this).attr('maxlength') !== 'undefined' ? $(this).attr('maxlength') : 9)).attr('placeholder', '0,00').addClass('text-' + $class).focus(function() {
			// if ($(this).val().length == 0 || $(this).val() == 0)
			// $(this).val('0,00');
			//			}).on('blur', function() {
			//				if ($(this).val().length == 0 || $(this).val() == 0)
			//					$(this).val('0,00');
			//
			//			});

		});

		is_date.each(function() {

			var input = this;
			var placeholder = typeof $(this).attr('placeholder') !== 'undefined' ? $(this).attr('placeholder') : 'dd/mm/aaaa';

			// insere o placMascaraUtils.mascara(input, MascaraUtils.INTERVAL_TIME);
			$(this).keyup(function() {
				MascaraUtils.mascara(MascaraUtils.INTERVAL_TIME);
			}).on('keypress', function() {

			});

			if ($(this).val() !== '')
				Mas

			$(this).on('keyup', function() {
				MascaraUtils.mascara(this, MascaraUtils.DATA);
			}).on('keypress', function() {
				MascaraUtils.mascara(this, MascaraUtils.DATA);
			}).attr('maxlength', 10).datepicker({
				format: 'dd/mm/yyyy',
				startView: 2,
				autoClose: true,
				// todayHightlight : true,
				// endYear      : 'today',
				// language        : 'pt-BR',
				// assumeNearbyYear: true,
				// changeYear      : true,
				minDate: ($(this).data('start') !== 'undefined' ? $(this).data('start') : null),
				maxDate: ($(this).data('end') !== 'undefined' ? $(this).data('end') : null),
				// yearRange       : ($(this).attr('data-range') !== 'undefined' ? $(this).attr('data-range') : 'c-50:c+50' ),
				months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'], // Names of months for drop-down and formatting
				monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], // For formatting
				weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'], // For formatting
				weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'], // For formatting
				weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'], // Column headings for days starting at Sunday
			});

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.DATA);

		});

		is_time.each(function() {

			var mask = null;

			var input = this;

			if ($(this).hasClass('hora'))
				mask = MascaraUtils.HORA;
			else if ($(this).hasClass('minuto'))
				mask = MascaraUtils.MINUTO;
			else if ($(this).hasClass('segundo'))
				mask = MascaraUtils.SEGUNDO;
			else
				mask = MascaraUtils.TIME;

			//          $(window).load(function(e){
			MascaraUtils.mascara(input, mask);
			//          });

			$(this).on('focus', function() {

				if ($(this).val() == '')
					$('00' + $(this).val()).slice(-1);

				MascaraUtils.mascara(this, mask);

				$(this).parent().addClass('focus');

			}).on('blur', function() {
				$(this).parent().removeClass('focus');
			});

			$(this).on('keyup', function(e) {

				MascaraUtils.mascara(this, mask);

			}).on('keypress', function() {

				MascaraUtils.mascara(this, mask);

			}).attr('maxlength', 3).attr('placeholder', '00').css({
				'color': '#000'
			}).on('keydown', function(e) {
				if (e.keyCode == 13 && $(this).val() != '') {
					e.preventDefault();
					$(this).blur();
					$(this).next().next('input[type="text"]').focus();
				}
			});

			if ($(this).val() > $(this).attr('maxlength') || $(this).val() == '') {
				$(this).val('00');
				$('00' + $(this).val()).slice(-1);
			}

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, mask);

		});

		is_cep.each(function() {

			var input = this;

			//          $(window).load(function(e){
			MascaraUtils.mascara(input, MascaraUtils.CEP);
			//          });

			$(this).keyup(function() {
				MascaraUtils.mascara(this, MascaraUtils.CEP);
			}).on('keypress', function() {
				MascaraUtils.mascara(this, MascaraUtils.CEP);
			}).attr('maxlength', 9);

			if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') != '')
				$(this).attr('placeholder', $(this).attr('placeholder'));
			else if (typeof $(this).attr('placeholder') !== 'undefined' && $(this).attr('placeholder') == '')
				$(this).removeAttr('placeholder').parent('.input-field').find('label').removeClass('active')

			if ($(this).val() !== '')
				MascaraUtils.mascara(this, MascaraUtils.CEP);

		});

	}

};

var obj,
	fn;

var MascaraUtils = {
	NUMERICO: 1,
	CPF: 2,
	CNPJ: 3,
	CPF_CNPJ: 4,
	TELEFONE: 5,
	CELULAR: 6,
	DECIMAL: 7,
	DATA: 8,
	TIME: 9,
	HORA: 10,
	MINUTO: 11,
	SEGUNDO: 12,
	CEP: 13,
	INTERVAL_TIME: 14,
	fn: null,
	obj: null,
	mascara: function(o, f, p) {

		obj = o;

		switch (f) {
			case this.NUMERICO:
				fn = this.Numerico;
				break;
			case this.CPF:
				fn = this.Cpf;
				break;
			case this.CNPJ:
				fn = this.Cnpj;
				break;
			case this.CPF_CNPJ:
				fn = this.Cpf_cnpj;
				break;
			case this.TELEFONE:
				fn = this.Telefone;
				break;
			case this.CELULAR:
				fn = this.Celular;
				break;
			case this.DECIMAL:
				fn = this.Decimal;
				break;
			case this.DATA:
				fn = this.Data;
				break;
			case this.TIME:
				fn = this.Time;
				break;
			case this.HORA:
				fn = this.Hora;
				break;
			case this.MINUTO:
				fn = this.Minuto;
				break;
			case this.SEGUNDO:
				fn = this.Segundo;
				break;
			case this.CEP:
				fn = this.Cep;
				break;
			case this.INTERVAL_TIME:
				fn = this.IntervalTime;
				break;
		}
		setTimeout('MascaraUtils.exec()', 1);
	},
	exec: function() {
		obj.value = fn(obj.value, obj.pattern || null);
	},
	Numerico: function(v) {
		return v.replace(/\D/g, '');
	},

	Telefone: function(v) {
		v = v.replace(/\D/g, '');
		if (v.length < 11) {
			v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
			v = v.replace(/(\d{3,4})(\d)/, '$1.$2');
		} else {
			v = v.replace(/^(\d{4})(\d{3})(\d{4})/g, '$1 $2 $3');
		}
		return v;
	},
	Cpf: function(v) {
		v = v.replace(/\D/g, '');
		v = v.replace(/(\d{3})(\d)/, '$1.$2');
		v = v.replace(/(\d{3})(\d)/, '$1.$2');
		v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		return v;
	},
	Cpf_cnpj: function(v) {
		if (v.length <= 14) {
			v = v.replace(/\D/g, '');
			v = v.replace(/(\d{3})(\d)/, '$1.$2');
			v = v.replace(/(\d{3})(\d)/, '$1.$2');
			v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		} else if (v.length > 14 && v.length < 19) {
			v = v.replace(/\D/g, '');
			v = v.replace(/^(\d{2})(\d)/, '$1.$2');
			v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
			v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
			v = v.replace(/(\d{4})(\d)/, '$1-$2');
		}
		return v;
	},

	Decimal: function(v) {

		var splitText = v.split('');
		var revertText = splitText.reverse();
		var v2 = revertText.join('');
		var v2 = v2.replace(/\D/g, '')

		if (v2.length <= 2) {
			v2 = v2.replace(/(\d)(\d)/, '$1$2,0');
		} else {
			v2 = v2.replace(/(\d{2})(\d)/, '$1,$2');
		}

		if (v2.length > 6) {

			for (var i = 0; i < v2.length; i++) {
				v2 = v2.replace(/(\d{3})(\d)/, '$1.$2');
			}

		}

		v2 = v2.split('');
		revertText = v2.reverse();
		v2 = revertText.join('');

		return v2;

	},

	Data: function(v) {
		v = v.replace(/\D/g, '');
		v = v.replace(/(\d{2})(\d)/, '$1/$2');
		v = v.replace(/(\d{2})(\d)/, '$1/$2');
		return v;
	},
	Time: function(v) {
		v = v.replace(/\D/g, '');
		v = v.replace(/(\d{2})(\d)/, '$1:$2');
		v = v.replace(/(\d{2})(\d)/, '$1:$2');
		return v;
	},
	Hora: function(v) {
		var exp = /^([0-1][0-9])|([2][0-3])$/;
		var hora = true;
		if (v.length == 2) {
			if (!exp.test(v))
				return v = '00';
		}
		return ('00' + v).slice(-2);
	},
	Minuto: function(v) {
		var exp = /^([0-5][0-9])$/;
		var min = true;
		if (v.length == 2) {
			if (!exp.test(v))
				return v = '00';
		}
		return ('00' + v).slice(-2);

	},
	Segundo: function(v) {
		var exp = /^([0-5][0-9])$/;
		var sec = true;
		if (v.length == 2) {
			if (!exp.test(v))
				return v = '00';
		}
		return ('00' + v).slice(-2);
	},
	Cep: function(v) {
		v = v.replace(/\D/g, '');
		v = v.replace(/^(\d{5})(\d)/, '$1-$2');
		return v;
	},
	Cnpj: function(v) {
		v = v.replace(/\D/g, '');
		v = v.replace(/^(\d{2})(\d)/, '$1.$2');
		v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
		v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
		v = v.replace(/(\d{4})(\d)/, '$1-$2');
		return v;
	},
	Celular: function(v) {

		v = v.replace(/\D/g, '');
		v = v.replace(/^(\d{2})(\d)/, '($1) $2');

		if (v.length < 14) {
			v = v.replace(/(\d{4})(\d)/, '$1.$2');
		} else {
			v = v.replace(/(\d{5})(\d)/, '$1.$2');
			v = v.replace(/(\d{1})(\d{2})/, '$1 $2');
		}
		return v;
	},
	IntervalTime: function(v, p) {
		var pattern = p;
		v = v.replace(/\D/g, '');
		v = v.replace(/^(\d{2})(\d{2})/, p);
		console.log(v);
		return v;
		// console.log(v.attr('pattern'));
	},
};

var Events = {

	Evento: function(e) {

		$(document).keyup(function(e) {
			key_event.tecla(e.keyCode);
		});

	}

};

function checkLog() {

	$(this).removeClass('pause').addClass('play').find('i').html('play_arrow');

	Http.post(BASE_URL + 'api/log', {
		dataType: 'json'
	}, function(response) {

		if (response.log != null) {

			Storage.set('syncfiles', true);

			$('#log').css('display', 'block').find('#console').parent().animate({
				scrollTop: $('#console').height() * 100
			}, {
				duration: 200
			}).find('#console').append('' + response.log.replace(/\n/g, '<br>') + '');

			if ($('#shell_exec').find('i').hasClass('material-icons')) {

				var preloader_wrapper = $('<div>', {
						'class': 'preloader-wrapper small active'
					})
					.append(
						$('<div>', {
							'class': 'spinner-layer spinner-blue-only'
						})
						.append(
							$('<div>', {
								'class': 'circle-clipper left'
							})
							.append(
								$('<div>', {
									'class': 'circle'
								})
							)
						)
						.append(
							$('<div>', {
								'class': 'gap-patch'
							})
							.append(
								$('<div>', {
									'class': 'circle'
								})
							)
						)
						.append(
							$('<div>', {
								'class': 'circle-clipper right'
							})
							.append(
								$('<div>', {
									'class': 'circle'
								})
							)
						)
					)

				$('#shell_exec').attr('disabled', true).find('i').removeClass('material-icons').html(preloader_wrapper);

			}

		} else {

			clearInterval(checkLogs);

			$('form#import-files *').attr('disabled', false);
			$('form#import-files').find('button[type="submit"]').find('i').addClass('material-icons').text('send');
			$('#log').hide();

			if (Storage.has('syncfiles')) {
				Form.showMessage(response.message);
				Storage.del('syncfiles');
			}

		}

	});

}

function create_element(id) {

	$('.dropzone').each(function() {

		$(this).find('[type="file"]').on('change', function() {

			console.log($(this).val());
			var self = $(this);
			var $len = (self.parent().find('[type="file"]').length);

			if (typeof id === 'undefined')
				var id = $(this).attr('id');
			else
				var id = 'file' + id;

			if ($('#' + id).is(':visible')) {

				for (var i = 0; i < document.getElementById(id).files.length; i++) {

					console.log(id);
					src = window.URL.createObjectURL(document.querySelector('#' + id).files[i]);

					var div = $('<div/>', {
						'class': 'miniaturas',
					});

					var img = $('<img/>', {
						'src': src,
						'class': '',
					});

					$(this).parent().append(div.append(img));
					// $(img).materialbox();

				}

				$(this).parent().append($('<input/>', {
					'type': 'file',
					'name': 'file[]',
					'id': 'file' + ($len++),
					'multiple': 'multiple',
					'title': ''
				}));

				var new_file = 'file' + id;

				create_element(new_file);


			}

			self.hide();

		})

	});

}
