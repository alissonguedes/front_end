"use strict";

/*----  Functions  ----*/

jQuery.fn.dsvy_is_bound = function(type) {
	if( this.data('events') !== undefined ){
		if (this.data('events')[type] === undefined || this.data('events')[type].length === 0) {
			return false;
		}
		return (-1 !== $.inArray(fn, this.data('events')[type]));
	} else {
		return false;
	}
};

var dsvy_sticky_header = function() {
	if( jQuery('.dsvy-header-sticky-yes').length > 0 ){
		var offset_px = 0;
		if( jQuery('#wpadminbar').length>0 && (self===top) ){
			offset_px = jQuery('#wpadminbar').height();
		}
		jQuery('.dsvy-header-menu-area.dsvy-header-sticky-yes').parent().css('height', jQuery('.dsvy-header-menu-area.dsvy-header-sticky-yes').height() );
		if( jQuery(document).width()>dsvy_js_variables.responsive ){
			jQuery( '.dsvy-header-sticky-yes' ).stick_in_parent({ 'parent':'body', 'spacer':false, 'offset_top':offset_px, 'sticky_class':'dsvy-sticky-on'}).addClass('dsvy-sticky-applied');
		} else {
			if( jQuery( '.dsvy-header-sticky-yes' ).hasClass('dsvy-sticky-applied') ){
				jQuery( '.dsvy-header-sticky-yes' ).trigger("sticky_kit:detach").removeClass('dsvy-sticky-applied');
			}
		}
	}
}

var dsvy_toggleSidebar = function() {
	jQuery(".dsvy-navbar > div").toggleClass("active");
	if( jQuery('.dsvy-navbar > div > .closepanel').length==0 ){
		jQuery('.dsvy-navbar > div').append("<span class='closepanel'><i class='dsvy-base-icon-cancel'></i></span>");
		jQuery('.dsvy-navbar > div > .closepanel').on('click', function(){	    		
			jQuery('.nav-menu-toggle').trigger('click');	    		
		});
	}
}

var dsvy_sorting = function() {
	jQuery('.dsvy-sortable-yes').each(function(){
		var boxes	= jQuery('.dsvy-element-posts-wrapper', this );
		var links	= jQuery('.dsvy-sortable-list a', this );			
		boxes.isotope({
			animationEngine : 'best-available'
		});
		links.on('click', function(e){
			var selector = jQuery(this).data('sortby');
			if( selector != '*' ){
				var selector = '.' + selector;
			}
			boxes.isotope({
				filter			: selector,
				itemSelector	: '.dsvy-ele',
				layoutMode		: 'fitRows'
			});
			links.removeClass('dsvy-selected');
			jQuery(this).addClass('dsvy-selected');
			e.preventDefault();
		});
	});
}

var dsvy_back_to_top = function() {
	// scroll-to-top
	var btn = jQuery('.scroll-to-top');
	jQuery(window).scroll(function() {
	if (jQuery(window).scrollTop() > 300) {
		btn.addClass('show');
	} else {
		btn.removeClass('show');
	}
	});
	btn.on('click', function(e) {
	e.preventDefault();
	jQuery('html, body').animate({scrollTop:0}, '300');
	});
}

var dsvy_navbar = function() {
	if( !jQuery('ul#dsvy-top-menu > li > a[href="#"]').dsvy_is_bound('click') ) {
		jQuery('ul#dsvy-top-menu > li > a[href="#"]').click(function(){ return false; });
	}
	jQuery('.dsvy-navbar > div > ul li:has(ul)').append("<span class='sub-menu-toggle'><i class='dsvy-base-icon-down-open-big'></i></span>");
	jQuery('.dsvy-navbar li').on('hover', function() {
		if(jQuery(this).children("ul").length == 1) {
			var parent		= jQuery(this);
			var child_menu	= jQuery(this).children("ul");
			if( jQuery(parent).offset().left + jQuery(parent).width() + jQuery(child_menu).width() > jQuery(window).width() ){
				jQuery(child_menu).addClass('dsvy-nav-left');
			} else {
				jQuery(child_menu).removeClass('dsvy-nav-left');
			}
		}
	});
	jQuery(".nav-menu-toggle").on("click tap", function() {
		dsvy_toggleSidebar();
	});
	jQuery('.sub-menu-toggle').on( 'click', function() {
		if(jQuery(this).siblings('.sub-menu, .children').hasClass('show')){
			jQuery(this).siblings('.sub-menu, .children').removeClass('show');
			jQuery( 'i', jQuery(this) ).removeClass('dsvy-base-icon-up-open-big').addClass('dsvy-base-icon-down-open-big');
		} else {
			jQuery(this).siblings('.sub-menu, .children').addClass('show');
			jQuery( 'i', jQuery(this) ).removeClass('dsvy-base-icon-down-open-big').addClass('dsvy-base-icon-up-open-big');
		}
		return false;
	});
	jQuery('.nav-menu-toggle').on( 'click', function(){
		jQuery('.dsvy-navbar ul.menu > li > a').on( 'click', function() {
			if( jQuery(this).attr('href')=='#' && jQuery(this).siblings('ul.sub-menu, ul.children').length>0 ){
				jQuery(this).siblings('.sub-menu-toggle').trigger('click');
				return false;
			}
		});
	})
}

var dsvy_lightbox = function() {
	var i_type = 'image';
	jQuery('a.dsvy-lightbox, a.dsvy-lightbox-video, .dsvy-lightbox-video a, .dsvy-lightbox a').each(function(){
		if( jQuery(this).hasClass('dsvy-lightbox-video') || jQuery(this).closest('.elementor-element').hasClass('dsvy-lightbox-video') ){
			i_type = 'iframe';
		} else {
			i_type = 'image';
		}
		jQuery(this).magnificPopup({type:i_type});
	});
}

var dsvy_video_popup = function() {
	jQuery('.dsvy-popup').on('click', function(event) {
		event.preventDefault();
		var href  = jQuery(this).attr('href');
		var title = jQuery(this).attr('title');
		window.open( href , title, "width=600,height=500");
	});
}

var dsvy_testimonial = function() {
	jQuery('.dsvy-testimonial-active').each(function(){
		var ele_parent = jQuery(this).closest('.dsvy-element-posts-wrapper');
		jQuery('.designervily-ele.designervily-ele-testimonial', ele_parent ).on('mouseover', function() {
			jQuery('.designervily-ele.designervily-ele-testimonial', ele_parent ).removeClass('dsvy-testimonial-active');
			jQuery(this).addClass('dsvy-testimonial-active');
		});
	});
}

var dsvy_search_btn = function(){
	jQuery(function() {
		jQuery('.dsvy-header-search-btn').on("click", function(event) {
			event.preventDefault();
			jQuery(".dsvy-header-search-form-wrapper").addClass("open");
			jQuery('.dsvy-header-search-form-wrapper input[type="search"]').focus();
		});
		jQuery(".dsvy-search-close").on("click keyup", function(event) {
			jQuery(".dsvy-header-search-form-wrapper").removeClass("open");
		});
	});
}

var dsvy_gallery = function(){
	jQuery("div.dsvy-gallery").each(function(){
		jQuery( this ).lightSlider({ item: 1, auto: true, loop: true, controls: false, speed: 1500, pause: 5500 }); 
	});
}

var dsvy_center_logo_header_class = function() {
	if( jQuery('#masthead.dsvy-header-style-5 ul#dsvy-top-menu').length > 0 ){
		var has_class = jQuery('#masthead.dsvy-header-style-5 ul#dsvy-top-menu > li').hasClass('dsvy-logo-append');
		if( has_class==false ){
			var total_li = jQuery('#masthead.dsvy-header-style-5 ul#dsvy-top-menu > li').length;
			var li = Math.floor( total_li / 2 );
			jQuery('#masthead.dsvy-header-style-5 ul#dsvy-top-menu > li:nth-child('+li+')').addClass('dsvy-logo-append');
		}
	}
}

var dsvy_selectwrap = function(){
	jQuery("select:not(#rating)").each(function(){
		jQuery( this ).wrap( "<div class='dsvy-select'></div>" );
	});
}

/* ====================================== */
/* Circle Progress bar
/* ====================================== */
var dsvy_circle_progressbar = function() {

	jQuery('.dsvy-circle-outer').each(function(){

		var this_circle = jQuery(this);

		// Circle settings
		var emptyFill_val = "rgba(0, 0, 0, 0)";
		var thickness_val = 10;
		var fill_val      = this_circle.data('fill');

		if( typeof this_circle.data('emptyfill') !== 'undefined' && this_circle.data('emptyfill')!='' ){
			emptyFill_val = this_circle.data('emptyfill');
		}
		if( typeof this_circle.data('thickness') !== 'undefined' && this_circle.data('thickness')!='' ){
			thickness_val = this_circle.data('thickness');
		}
		if( typeof this_circle.data('filltype') !== 'undefined' && this_circle.data('filltype')=='gradient' ){
			fill_val = {gradient: [ this_circle.data('gradient1') , this_circle.data('gradient2') ], gradientAngle: Math.PI / 4 };
		}

		if( typeof jQuery.fn.circleProgress == "function" ){
			var digit   = this_circle.data('digit');
			var before  = this_circle.data('before');
			var after   = this_circle.data('after');
			var c_width  = this_circle.data('width');
			var digit       = Number( digit );
			var short_digit = ( digit/100 ); 

			jQuery('.dsvy-circle', this_circle ).circleProgress({
				value		: 0,
				size		: c_width,
				startAngle	: -Math.PI / 4 * 2,
				thickness	: thickness_val,
				emptyFill	: emptyFill_val,
				fill		: fill_val
			}).on('circle-animation-progress', function(event, progress, stepValue) { // Rotate number when animating
				this_circle.find('.dsvy-circle-number').html( before + Math.round( stepValue*100 ) + after );
			});
		}

		this_circle.waypoint(function(direction) {
			if( !this_circle.hasClass('completed') ){
				// Re draw when view
				if( typeof jQuery.fn.circleProgress == "function" ){
					jQuery('.dsvy-circle', this_circle ).circleProgress( { value: short_digit } );
				};
				this_circle.addClass('completed');
			}
		}, { offset:'85%' });

	});
}

/* ====================================== */
/* Carousel
/* ====================================== */
var dsvy_carousel = function() {

	jQuery(".designervily-element-viewtype-carousel").each(function() {

		var carouselElement = jQuery( this );

		jQuery('.dsvy-ele' , carouselElement).removeClass( function (index, className) {
			return (className.match (/(^|\s)col-md-\S+/g) || []).join(' ');
		}).removeClass( function (index, className) {
			return (className.match (/(^|\s)col-lg-\S+/g) || []).join(' ');
		});

		var columns = jQuery( this ).data('columns');
		var loop = jQuery( this ).data('loop');

		if( columns == '1' ){
			var responsive_items = [ /* 1199 : */ '1', /* 991 : */ '1', /* 767 : */ '1', /* 575 : */ '1', /* 0 : */ '1' ];
		} else if( columns == '2' ){
			var responsive_items = [ /* 1199 : */ '2', /* 991 : */ '2', /* 767 : */ '2', /* 575 : */ '2', /* 0 : */ '1' ];
		} else if( columns == '3' ){
			var responsive_items = [ /* 1199 : */ '3', /* 991 : */ '2', /* 767 : */ '2', /* 575 : */ '2', /* 0 : */ '1' ];
		} else if( columns == '4' ){
			var responsive_items = [ /* 1199 : */ '4', /* 991 : */ '4', /* 767 : */ '3', /* 575 : */ '2', /* 0 : */ '1' ];
		} else if( columns == '5' ){
			var responsive_items = [ /* 1199 : */ '5', /* 991 : */ '4', /* 767 : */ '3', /* 575 : */ '2', /* 0 : */ '1' ];
		} else if( columns == '6' ){
			var responsive_items = [ /* 1199 : */ '6', /* 991 : */ '4', /* 767 : */ '3', /* 575 : */ '2', /* 0 : */ '1' ];
		} else {
			var responsive_items = [ /* 1199 : */ '3', /* 991 : */ '3', /* 767 : */ '3', /* 575 : */ '2', /* 0 : */ '1' ];
		}

		var margin_val = 30;
		if( jQuery(carouselElement).data('margin')!='' ){
			margin_val = jQuery(carouselElement).data('margin');
		}

		var posts_wrapper_class = '.dsvy-element-posts-wrapper';

		var val_nav = jQuery(carouselElement).data('nav');
		if( val_nav=='above' ){
			val_nav = false;
		}

		var car_options = {
			loop			: jQuery(carouselElement).data('loop'),
			autoplay		: jQuery(carouselElement).data('autoplay'),
			center			: jQuery(carouselElement).data('center'),
			nav				: val_nav,
			dots			: jQuery(carouselElement).data('dots'),
			autoplaySpeed	: jQuery(carouselElement).data('autoplayspeed'),
			autoplayTimeout	: jQuery(carouselElement).data('autoplayspeed') + 5000,
			navSpeed		: jQuery(carouselElement).data('autoplayspeed'),
			dotsSpeed		: jQuery(carouselElement).data('autoplayspeed'),
			dragEndSpeed	: jQuery(carouselElement).data('autoplayspeed'),
			margin			: 30,
			items			: columns,
			responsiveClass	: true,
			responsive		: {
				1199 : {
					items	: responsive_items[0],
				},
				991	 : {
					items	: responsive_items[1],
				},
				767	 : {
					items	: responsive_items[2],
				},
				575	 : {
					items	: responsive_items[3],
				},
				0	 : {
					items	: responsive_items[4],
				}
			}
		};

		// gap - margin
		if( typeof margin_val == "string" && margin_val!='' ){
			margin_val = margin_val.replace( 'px', '');
			margin_val = parseInt(margin_val);
			car_options['margin'] = margin_val;
		}

		// apply carousel effect with options
		var dsvy_owl = jQuery( posts_wrapper_class, carouselElement).removeClass('row multi-columns-row').addClass('owl-carousel').owlCarousel( car_options );

		jQuery('.dsvy-carousel-prev', carouselElement).click(function(event) {
			event.preventDefault();
			dsvy_owl.trigger('prev.owl.carousel', [jQuery(carouselElement).data('autoplayspeed')]);

		});
		jQuery('.dsvy-carousel-next', carouselElement).click(function(event) {
			event.preventDefault();
			dsvy_owl.trigger('next.owl.carousel', [jQuery(carouselElement).data('autoplayspeed')]);
		});

	});
};

/* ====================================== */
/* Menu item count
/* ====================================== */
var dsvy_menu_count = function() {
	if( jQuery('ul#dsvy-top-menu > li').length>0 || jQuery('div#dsvy-top-menu > ul > li').length>0 ){
		if( jQuery('ul#dsvy-top-menu > li').length>0 ){
			var total_li = jQuery( 'ul#dsvy-top-menu > li' ).length;
		}
		if( jQuery('div#dsvy-top-menu > ul > li').length>0 ){
			var total_li = jQuery( 'div#dsvy-top-menu > ul > li' ).length;
		}
		if( total_li > 6 ){
			jQuery('#site-navigation').addClass('dsvy-bigger-menu');
		}
	}
}

/* ============================================== */
/* BG Image yes class in each Section and Column
/* ============================================== */
var dsvy_bgimage_class = function() {
	jQuery('.elementor-section').each(function() {
		if( jQuery(this).css('background-image')!='' && jQuery(this).css('background-image')!='none' ){
			jQuery(this).addClass('dsvy-bgimage-yes' ).removeClass('dsvy-bgimage-no' );
		} else {
			jQuery(this).addClass('dsvy-bgimage-no' ).removeClass('dsvy-bgimage-yes' );
		}
	});
	jQuery('.elementor-column').each(function() {
		if( jQuery(this).children('.elementor-widget-wrap').children('.dsvy-stretched-div').length ){
			if( jQuery(this).children('.elementor-widget-wrap').children('.dsvy-stretched-div').css('background-image')!='' && jQuery(this).children('.elementor-widget-wrap').children('.dsvy-stretched-div').css('background-image')!='none' ){
				jQuery(this).addClass('dsvy-bgimage-yes' ).removeClass('dsvy-bgimage-no' );
			} else {
				jQuery(this).addClass('dsvy-bgimage-no' ).removeClass('dsvy-bgimage-yes' );
			}
		} else {
			if( jQuery(this).children('.elementor-widget-wrap').css('background-image')!='' && jQuery(this).children('.elementor-widget-wrap').css('background-image')!='none' ){
				jQuery(this).addClass('dsvy-bgimage-yes' ).removeClass('dsvy-bgimage-no' );
			} else {
				jQuery(this).addClass('dsvy-bgimage-no' ).removeClass('dsvy-bgimage-yes' );
			}
		}
	});
};

/* ============================================== */
/* BG Color yes class in each Section and Column
/* ============================================== */
var dsvy_bgcolor_class = function() {
	jQuery('.elementor-section').each(function() {
		if( jQuery(this).css('background-color')!='' && jQuery(this).css('background-color')!='transparent' ){
			jQuery(this).addClass('dsvy-bgcolor-yes');
		}
	});
	jQuery('.elementor-column').each(function() {
		if( jQuery(this).children('.dsvy-stretched-div').length ){
			if( jQuery(this).children('.dsvy-stretched-div').css('background-color')!='' && jQuery(this).children('.dsvy-stretched-div').css('background-color')!='transparent' ){
				jQuery(this).addClass('dsvy-bgcolor-yes' ).removeClass('dsvy-bgcolor-no' );
			} else {
				jQuery(this).addClass('dsvy-bgcolor-no' ).removeClass('dsvy-bgcolor-yes' );
			}
		} else {
			if( jQuery(this).children('.elementor-widget-wrap').css('background-color')!='' && jQuery(this).children('.elementor-widget-wrap').css('background-color')!='transparent' ){
				jQuery(this).addClass('dsvy-bgcolor-yes' ).removeClass('dsvy-bgcolor-no' );
			} else {
				jQuery(this).addClass('dsvy-bgcolor-no' ).removeClass('dsvy-bgcolor-yes' );
			}
		}
	});
};

/* ====================================== */
/* Reset and rearrange Stretched Column
/* ====================================== */
var dsvy_rearrange_stretched_col = function( model_id ) {
	if( jQuery('body').hasClass('elementor-editor-active') ){
		jQuery( '*[data-id="'+model_id+'"]' ).each(function(){
			jQuery('.dsvy-stretched-div', this).remove();
			jQuery('.elementor-widget-wrap', this).removeAttr('style');
			setTimeout(function(){ dsvy_stretched_col(); }, 50);
		});	
	}
}

/* ====================================== */
/* Stretched Column
/* ====================================== */
var dsvy_stretched_col = function() {

	jQuery('.elementor-section-wrap > .elementor-section').each(function(){
		if( jQuery(this).hasClass('dsvy-col-stretched-left') || jQuery(this).hasClass('dsvy-col-stretched-right') || jQuery(this).hasClass('dsvy-col-stretched-both') ){
			jQuery(this).addClass('dsvy-col-stretched-yes').removeClass('dsvy-col-stretched-no');
		} else {
			jQuery(this).addClass('dsvy-col-stretched-no').removeClass('dsvy-col-stretched-yes');
		}
	});

	// remove all stretched related changes in each column
	jQuery('.elementor-section-wrap > .elementor-section').each(function(){
		var ThisSection = jQuery(this);
		var ThisColumn	= '';
		jQuery( '.elementor-column:not(.elementor-inner-column)', ThisSection ).each(function(){
			ThisColumn	= jQuery(this);
			jQuery( '.dsvy-stretched-div', ThisColumn ).remove();
			ThisColumn.removeClass('dsvy-col-stretched-yes dsvy-col-stretched-left dsvy-col-stretched-right dsvy-col-stretched-content-yes');
		});
	});

	jQuery('.elementor-section-wrap > .elementor-section.dsvy-col-stretched-yes').each(function(){

		var ThisSection		= jQuery(this);
		var ThisColumn		= '';
		var ColWrapper		= '';
		var StretchedEle	= '';

		if( ThisSection.hasClass('dsvy-col-stretched-left') || ThisSection.hasClass('dsvy-col-stretched-both') ){
			ThisColumn = jQuery( '.elementor-column:not(.elementor-inner-column):first-child', ThisSection );
			
			if( jQuery('.dsvy-stretched-div', ThisColumn).length==0 ){
				ColWrapper = ThisColumn.children('.elementor-widget-wrap');
				ColWrapper.prepend( '<div class="dsvy-stretched-div"></div>' );

				// Stretched Element
				StretchedEle = ColWrapper.children('.dsvy-stretched-div');

				StretchedEle.addClass( 'dsvy-stretched-left' );
				ThisColumn.addClass('dsvy-col-stretched-yes dsvy-col-stretched-left');

				if( ThisSection.hasClass('dsvy-left-col-stretched-content-yes') ){
					ThisColumn.addClass('dsvy-col-stretched-content-yes');
				} else {
					ThisColumn.removeClass('dsvy-col-stretched-content-yes');
				}

				// background move to stretched div
				ColWrapper.css('background-image', '');
				var bgImage =  ColWrapper.css('background-image');
				if( bgImage!='none' && bgImage!='' ){
					StretchedEle.css('background-image', bgImage );
					ColWrapper.css('background-image', 'none');
				}

				// border radious
				ColWrapper.css('border-top-left-radius', '');
				ColWrapper.css('border-top-right-radius', '');
				ColWrapper.css('border-bottom-left-radius', '');
				ColWrapper.css('border-bottom-right-radius', '');
				var radius_t_left  =  ColWrapper.css('border-top-left-radius');
				var radius_t_right =  ColWrapper.css('border-top-right-radius');
				var radius_b_left  =  ColWrapper.css('border-bottom-left-radius');
				var radius_b_right =  ColWrapper.css('border-bottom-right-radius');
				if( radius_t_left!='0' && radius_t_left!='' ){
					StretchedEle.css('border-top-left-radius', radius_t_left );
					ColWrapper.css('border-top-left-radius', '0');
				}
				if( radius_t_right!='0' && radius_t_right!='' ){
					StretchedEle.css('border-top-right-radius', radius_t_right );
					ColWrapper.css('border-top-right-radius', '0');
				}
				if( radius_b_left!='0' && radius_b_left!='' ){
					StretchedEle.css('border-bottom-left-radius', radius_b_left );
					ColWrapper.css('border-bottom-left-radius', '0');
				}
				if( radius_b_right!='0' && radius_b_right!='' ){
					StretchedEle.css('border-bottom-right-radius', radius_b_right );
					ColWrapper.css('border-bottom-right-radius', '0');
				}

				// Background Color
				var bgColor = ColWrapper.css('background-color');
				if( bgColor!='' ){
					StretchedEle.css('background-color', bgColor );
					ColWrapper.css('background-color', 'transparent');
				}

				// Background Position
				var bgPosition = ColWrapper.css('background-position');
				if( bgPosition!='' ){
					StretchedEle.css('background-position', bgPosition );
				}

				// Background Repeat
				var bgRepeat = ColWrapper.css('background-repeat');
				if( bgRepeat!='' ){
					StretchedEle.css('background-repeat', bgRepeat );
				}

				// Background Size
				var bgSize = ColWrapper.css('background-size');
				if( bgSize!='' ){
					StretchedEle.css('background-size', bgSize );
				}

				dsvy_stretched_col_calc();

			}

		}

		if( ThisSection.hasClass('dsvy-col-stretched-right') || ThisSection.hasClass('dsvy-col-stretched-both') ){
			ThisColumn = jQuery( '.elementor-column:not(.elementor-inner-column):last-child', ThisSection );

			if( jQuery('.dsvy-stretched-div', ThisColumn).length==0 ){
				ColWrapper = ThisColumn.children('.elementor-widget-wrap');
				ColWrapper.prepend( '<div class="dsvy-stretched-div"></div>' );

				// Stretched Element
				StretchedEle = ColWrapper.children('.dsvy-stretched-div');

				StretchedEle.addClass( 'dsvy-stretched-right' );
				ThisColumn.addClass('dsvy-col-stretched-yes dsvy-col-stretched-right');

				if( ThisSection.hasClass('dsvy-right-col-stretched-content-yes') ){
					ThisColumn.addClass('dsvy-col-stretched-content-yes');
				} else {
					ThisColumn.removeClass('dsvy-col-stretched-content-yes');
				}

				// background move to stretched div
				ColWrapper.css('background-image', '');
				var bgImage = ColWrapper.css('background-image');
				if( bgImage!='none' && bgImage!='' ){
					StretchedEle.css('background-image', bgImage );
					ColWrapper.css('background-image', 'none');
				}


				// border radious
				ColWrapper.css('border-top-left-radius', '');
				ColWrapper.css('border-top-right-radius', '');
				ColWrapper.css('border-bottom-left-radius', '');
				ColWrapper.css('border-bottom-right-radius', '');
				var radius_t_left  =  ColWrapper.css('border-top-left-radius');
				var radius_t_right =  ColWrapper.css('border-top-right-radius');
				var radius_b_left  =  ColWrapper.css('border-bottom-left-radius');
				var radius_b_right =  ColWrapper.css('border-bottom-right-radius');
				if( radius_t_left!='0' && radius_t_left!='' ){
					StretchedEle.css('border-top-left-radius', radius_t_left );
					ColWrapper.css('border-top-left-radius', '0');
				}
				if( radius_t_right!='0' && radius_t_right!='' ){
					StretchedEle.css('border-top-right-radius', radius_t_right );
					ColWrapper.css('border-top-right-radius', '0');
				}
				if( radius_b_left!='0' && radius_b_left!='' ){
					StretchedEle.css('border-bottom-left-radius', radius_b_left );
					ColWrapper.css('border-bottom-left-radius', '0');
				}
				if( radius_b_right!='0' && radius_b_right!='' ){
					StretchedEle.css('border-bottom-right-radius', radius_b_right );
					ColWrapper.css('border-bottom-right-radius', '0');
				}

				// Background Color
				var bgColor = ColWrapper.css('background-color');
				if( bgColor!='' ){
					StretchedEle.css('background-color', bgColor );
					ColWrapper.css('background-color', 'transparent');
				}

				// Background Position
				var bgPosition = ColWrapper.css('background-position');
				if( bgPosition!='' ){
					StretchedEle.css('background-position', bgPosition );
				}

				// Background Repeat
				var bgRepeat = ColWrapper.css('background-repeat');
				if( bgRepeat!='' ){
					StretchedEle.css('background-repeat', bgRepeat );
				}

				// Background Size
				var bgSize = ColWrapper.css('background-size');
				if( bgSize!='' ){
					StretchedEle.css('background-size', bgSize );
				}

				dsvy_stretched_col_calc();

			}
		}

	});

};

var dsvy_stretched_col_calc = function() {

	// padding left or right
	if( jQuery('.elementor-section-wrap > .elementor-section > .elementor-container > .elementor-column.dsvy-col-stretched-yes').length>0 ){

		// Returns width of browser viewport
		var window_width = jQuery( window ).width();

		// Returns width of HTML document
		var document_width = jQuery( document ).width();

		jQuery('.elementor-section-wrap > .elementor-section > .elementor-container > .elementor-column.dsvy-col-stretched-yes').each(function(){

			var this_ele    = jQuery(this);
			var curr_width  = jQuery(this).closest('.elementor-section').width();
			var extra_width = ((window_width - curr_width)/2);
			var parent_width = '';

			var position = 'left';
			if( jQuery(this).hasClass('dsvy-col-stretched-right') ){
				position = 'right';
			}


			// set width to 100% if parent is 100%
			parent_width = jQuery('.elementor-widget-wrap', jQuery(this)).parent().width();
			console.log(parent_width);
			if( parent_width == '100%' ){
				jQuery('.elementor-widget-wrap', jQuery(this)).css('width','100%');
			} else {
				jQuery('.elementor-widget-wrap', jQuery(this)).css('width','');
			}


			jQuery('.dsvy-stretched-div', jQuery(this)).css( 'margin-'+position,'-'+extra_width+'px' );

			// stretched column content too
			if( jQuery(this).hasClass('dsvy-col-stretched-content-yes') ){
				var stretched_width = jQuery('.dsvy-stretched-div', jQuery(this) ).width();
				jQuery(this).children('.elementor-widget-wrap').css( 'margin-'+position,'-'+extra_width+'px' );
				jQuery(this).children('.elementor-widget-wrap').css( 'width', stretched_width+'px' );
			} else {
				jQuery(this).children('.elementor-widget-wrap').css( 'margin-'+position,'' );
				jQuery(this).children('.elementor-widget-wrap').css( 'width', '' );
			}
		});
	}

}

/* ====================================== */
/* Animate on scroll : Number rotator
/* ====================================== */
var dsvy_number_rotate = function() {
	jQuery(".dsvy-number-rotate").each(function() {
		var self      = jQuery(this);
		var delay     = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);
		var animation = self.data("appear-animation");

		if( jQuery(window).width() > 959 ) {
			self.html('0');
			self.waypoint(function(direction) {
				if( !self.hasClass('completed') ){
					var from     = self.data('from');
					var to       = self.data('to');
					var interval = self.data('interval');
					self.numinate({
						format: '%counter%',
						from: from,
						to: to,
						runningInterval: 2000,
						stepUnit: interval,
						onComplete: function(elem) {
							self.addClass('completed');
						}
					});
				}
			}, { offset:'85%' });
		} else {
			if( animation == 'animateWidth' ) {
				self.css('width', self.data("width"));
			}
		}
	});
};

/* ====================================== */
/* Image size correction
/* ====================================== */
var dsvy_img_size_correction = function() {
	setTimeout(function(){
		jQuery("img").each(function() {
			var thisimg = jQuery( this );
			var p_width = jQuery( this ).parent().width();
			var width   = jQuery( this ).attr('width');
			var height  = jQuery( this ).attr('height');
			if( (typeof width !== typeof undefined && width !== false) && (typeof height !== typeof undefined && height !== false) ){
				var ratio  = height/width;
				jQuery( this ).data('dsvy-ratio', ratio);
				var real_width = jQuery( this ).width();
				var new_height = Math.round(real_width * ratio);
			}
		});
	}, 100);
};

/*----  Events  ----*/

// On resize
jQuery(window).resize(function(){
	setTimeout(function() {
		dsvy_sticky_header();
		dsvy_stretched_col_calc();
	}, 100);

	/* Image size correction */
	dsvy_img_size_correction();

});

// on ready
jQuery(document).ready(function(){
	dsvy_stretched_col();
	dsvy_sorting();
	dsvy_stretched_col_calc();
	dsvy_back_to_top();
	dsvy_sticky_header();
	dsvy_navbar();
	dsvy_lightbox();
	dsvy_video_popup();
	dsvy_testimonial();
	dsvy_search_btn();
	dsvy_center_logo_header_class();
	dsvy_selectwrap();
	dsvy_menu_count();
	setTimeout(function(){ dsvy_carousel(); }, 100);
	dsvy_img_size_correction();
	dsvy_number_rotate();
	dsvy_bgimage_class();
	dsvy_bgcolor_class();
});	

// on load
jQuery(window).load(function(){
	dsvy_sorting();
	dsvy_gallery();
	dsvy_sticky_header();
	dsvy_circle_progressbar();
	dsvy_stretched_col_calc();
});
