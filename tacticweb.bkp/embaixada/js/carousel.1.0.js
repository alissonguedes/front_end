/***
 * Carousel 1.0
 * Este é um projeto aberto você pode modifica-lo da maneira que desejar
 * Bibliotecas -> Jquery 2.x e API Jquery.ui requeridas https://jquery.com/
 * Icones usado -> Font Awesome http://fortawesome.github.io/Font-Awesome/
 * Everton J Paula 28/05/2015 http://www.epsoftware.com.br
 */
  /***
 * Os parametros podem ser passados tanto por atributos html5 'data-'
 * quanto por objeto js, porém a prioridade são dos atributos 'data-'
 */
 /*
 * Para mudanças nos seletores de slides li, utilizar uma classe CSS e adiciona-la na propriedade liClass
 * Para mudar position de seletores, utilizar funcão menu(objeto de dados css) exemplo {position: aboloute, top:'0px'}
 * O keypress precisa de revisão por funcionamento inadequado, por isso seu padrão esta como false
 *   O problema enfretado é saida de padrão dos slides ao apertar as duas teclas ao mesmo tempo
 */

//Usando função anônima para evitar conflitos,
(function(){
    //declarando o nome do plug-in criado, com função callback recebendo parametros de entrada
    $.fn.Carousel = function(parameters){

        //lista de opções da aplicação
        var defaults = {
            height: '100%', //Tamanho do Slider Altura, padrão 100%
            width: '50%', //Tamanho do Slider Largura, padrão 100%
            position: 'relative', //Posição da DIV, padrão relative
            margin: '0px auto', //Posição da DIV na tela, por padrão centralizado
            border: 'none', //Bordas do banner, por padrão sem bordas
            effect: 'slide',// Efeito usado para troca dos slides, padrão slide
            img_height: '100%', // Tamanho das imagens Altura, padrão 100%
            img_width: '100%', // Tamanho das imagens Altura, padrão 100%
            arrow_left: "<i class='fa-2x fa fa-chevron-left'></i>",//Seta para esquerda, por padrão font awesome
            arrow_right: "<i class='fa-2x fa fa-chevron-right'></i>",//Seta para direita, por padrão font awesome
            activeColor: "#00BFFF", //Cor do li ativos, por padrão um tom de azul
            btn_pause: "<i class='fa fa-pause'></i>", // Imagem botao pause, por padrão font awesome
            btn_play: "<i class='fa fa-play'></i>", // Imagem botao de play(continuar), por padrão font awesome
            has_selector: true, //Componente para veificar se pode existir os seletores individuais de slides, padrão true
            pause_able: false, // habilitado para pausar slides, por padrão false
            stop_on_hover: true, //habilitado para pausar o slides quando houver sobre imagens, por padrão true
            automatic: true, //habilitar passagem de tempo automatica de slides, padrao true
            key_navegation: false, //habiltar para fazer navegação pelas setas, por padrão false //Melhorar este procedimento
            time_to_change: 8000, // Tempo de troca de slides, por padrão 8 segundos
            list_img : [] ,//Lista de imagens
            menu: {}, //position dos seletor de slides, por padrão a esquerda e em baixo, usando um json como parametro
            icones_selector: "<i class='fa fa-circle'></i>", //icones dos seletores, por padrão fontAwesome
            liClass: "", //Classe para seletores li, por padrão sem classe
            color: "#000" //Cor da fonte, usando para fontAwesome, padrão petro #000
        };

        //Mesclando os parametros passados por atributes hmlt5  ou por js, dando prioridade para o atributes
        parameters = $.extend( {}, parameters, $(this).data());

        //Nesta Etapa estou incluindo as opção passadas por parametros
        var options = $.extend( {}, defaults, parameters);

        //usado para funcão de navegação pelo teclado
        var KEYBOARD = {
            left: 37,
            right: 39
        };

        //formatação das imagens
        var IMG = {
          "position" : "relative",
          "height": options.img_height,
          "width": options.img_width ,
          "margin" : "0px auto",
          "background-size": 'contain',
          "background-position": "center center",
          "background-repeat": 'no-repeat'
        };

        //formatação dos links
        var UL = menu_ul(options.menu);

        //formatação da div principal que contém as imagens
        var DIV = {
            "width": "250px",
            "height": "400px",
            "overflow": "hidden",
            "float": "left",
        };

        //Esta função retorna um objeto para UL, este formata a posição e orientação do menu ul
        function menu_ul(newargs){
            var args = {
                 position: 'absolute',
                 bottom: '1px',
                 left: '0%',
                 right: '0%',
                 display: 'flex',
                 'list-style': 'none' //este define se o menu permanece vertical ou horizontal
             };
            return $.extend( {}, args, newargs);
         };

        // funcao para armazenar id de todas as imagens
        function data_img(div){
            $(div).find('img').each(function(index){
                options.list_img['id', index] = index;
                options.list_img['visible', index] = true;
                $(this).prop('id', index);
                $(this).css(IMG);
                if(index !== 0){
                    $(this).hide();
                    options.list_img['visible', index] = false;
                }
            });
        };

        //retorna a img visible
        function getImgVisible(div){
            var img = null;
            $(div).find('img').each(function(){
                if($(this).is(":visible")){
                    img = $(this);
                }
            });
            return img;
        }

        // função para proxima imagem
        function next(div){
            var img = getImgVisible($(div));
            var id = parseInt($(img).attr('id'));

            if(id === options.list_img.length-1){
                options.list_img['visible', id] = false;
                options.list_img['visible', 0] = true;

                $(img).hide({
                    effect: options.effect,
                    duration: 650,
                    direction: 'rigth',
                    complete: function(){
                        $("img#0").show({
                            effect: options.effect,
                            duration: 650,
                            direction: 'left'
                        });
                    }
                });
                setActiveLi($(div), 0);
            }else{
                options.list_img['visible', id] = false;
                options.list_img['visible', id+1] = true;

                $(img).hide({
                    effect: options.effect,
                    duration: 650,
                    direction: 'rigth',
                    complete: function(){
                        $("img#"+(id+1)).show({
                            effect: options.effect,
                            duration: 650,
                            direction: 'left'
                        });
                    }
                });
                setActiveLi($(div), id+1);
            }

        };

        // função para imagen anaterior
        function back(div){
            var img = getImgVisible($(div));
            var id = parseInt($(img).attr('id'));
            var last = options.list_img.length-1;

            if(id === 0){
                options.list_img['visible', id] = false;
                options.list_img['visible', last] = true;

                $(img).hide({
                    effect: options.effect,
                    duration: 650,
                    direction: 'left',
                    complete: function(){
                        $("img#"+last).show({
                            effect: options.effect,
                            duration: 650,
                            direction: 'rigth'
                        });
                    }
                });
                setActiveLi($(div), last);
            }
            else{
                options.list_img['visible', id] = false;
                options.list_img['visible', id-1] = true;

                $(img).hide({
                    effect: options.effect,
                    duration: 650,
                    direction: 'left',
                    complete: function(){
                        $("img#"+(id-1)).show({
                            effect: options.effect,
                            duration: 650,
                            direction: 'rigth'
                        });
                    }
                    });
                setActiveLi($(div), id-1);
            }

        };

        //função para navegação por setas
        function setNavArrows(div){
            $('body').on('keyup', function (event) {
                if(event.which === KEYBOARD.left) {
                   back($(div));
                }else if (event.which === KEYBOARD.right) {
                   next($(div));
                }
            });
        }

        //função para abrir slide especifico
        function getSlide(div, id){
           var img = getImgVisible($(div));
           var old_id = parseInt($(img).attr('id'));

           if(old_id !== id){
                options.list_img['visible', old_id] = false;
                options.list_img['visible', id] = true;

                $(img).hide({
                    effect: options.effect,
                    duration: 650,
                    direction: 'left',
                    complete: function(){
                        $("img#"+id).show({
                            effect: options.effect,
                            duration: 650,
                            direction: 'rigth'
                        });
                    }
                });
                setActiveLi($(div), id);
            }
        }

        //função para setar os link active das imagens
        function setActiveLi(div, id){
            $(div).find('li.selector').each(function(){
                if($(this).val() === id){
                    $(this).css({'color': options.activeColor});
                }else{
                    $(this).css({'color': options.color});
                }
            });
        }

        // função para pausar os slides
        function pause(stop){
            if(options.automatic){
                clearInterval(stop);
                $('li.pause').hide(150);
                $('li.play').show(250);
            }
        };

        // função para play(continuar) os slides
        function play(div){
            var auto = null;
            if(options.automatic){
                $('li.play').hide(150);
                $('li.pause').show(250);
                auto = setInterval(next, options.time_to_change, $(div));
            }
            return auto;
        };

        //função para listar todos seletores de slides juntamente com seta
        function getSelector(){
           var seletores = "";
           if(options.has_selector){
                for(var i=0; i < options.list_img.length; i++){
                    if(options.icones_selector !== null && options.icones_selector !== ""){
                        seletores += "<li style='cursor: pointer;padding: 2px;' value='"+i+"' class='selector "+options.liClass+"'>"+options.icones_selector+"</li>";
                    }else{
                        seletores += "<li style='cursor: pointer;padding: 2px;' value='"+i+"' class='selector "+options.liClass+"'>"+(i+1)+"</li>";
                    }
                }
           }
           return seletores;
        }

        //função para disponibilizar os controles de pausa e play dos slides, caso seja possivel
        function getCrontrols(){
            var controls = "";
            if(options.pause_able){
                controls += "<li style='display: none;cursor: pointer;padding: 2px;' class='play "+options.liClass+"'>"+options.btn_play+"</li>";
                controls += "<li style='cursor: pointer;padding: 2px;' class='pause "+options.liClass+"'>"+options.btn_pause+"</li>";
            }
            return controls;
        }

        //Construtor
        //Tudo que esta a seguir é executado quando criamos o Carousel

        return this.each(function(){

            //Vamos formatar a div e seu tamanho
            $(this).css(DIV);

            //verificando algumas opções, se houver hover na imagem o pause fica desabilitado
            if(options.pause_able === true){
                options.stop_on_hover = false;
            }else if(options.stop_on_hover === false){
                options.pause_able = true;
            }else{
                options.pause_able = false;
                options.stop_on_hover = true;
            }
            //verificando algumas opções, se houver hover na imagem o pause fica desabilitado

            //Aqui carrega e inicia as imagens
            data_img($(this));

            //Aqui fazendo os seletores
            $(this).append(
                "<div >"
                    +"<ul class='menu_ul'>"
                    +getCrontrols()
                    +getSelector()
                    +"</ul>"
                +"</div>"
                +"<div style='list-style: none;position: absolute; top: 48%; right: -1%;', ><li style='cursor: pointer;' class='next "+options.liClass+"'>"+options.arrow_right+"</li></div>"
                +"<div style='list-style: none;position: absolute; top: 48%; left: -1%;', ><li style='cursor: pointer;' class='back "+options.liClass+"'>"+options.arrow_left+"</li></div>"
            );

            //inserindo formatação e posições aos links de seleção de banners
            $(this).find('ul.menu_ul').css(UL);

            //Chamando a função de proximo banner
            $("li.next").click(function(){
                var div = $(this).parents('div');
                next($(div));
            });

            //Chamando a função de banner anterior
            $("li.back").click(function(){
                var div = $(this).parents('div');
                back($(div));
            });

            //Chamando a função de pause dos slides
            $("li.pause").click(function(){
                pause(auto);
            });

            //Chamando a função de play(continuar) dos slides
            $("li.play").click(function(){
                auto = play($(this).parents('div'));
            });

            //função para abrir um link especifico
            $('li.selector').click(function(){
                getSlide($(this).parents('div'), parseInt($(this).val()));
            });

            //funções hover para pausar exibição com o mouse em cima das imagens
            if(options.stop_on_hover){
                $(this).hover(function(){
                    pause(auto);
                }, function(){
                    auto = play($(this));
                });
            }

            //função hover para os links li de controles
            $(this).find('li.play').hover(function(){
                $(this).css({'color': options.activeColor});
            }, function(){
                $(this).css({'color': options.color});
            });
            $(this).find('li.pause').hover(function(){
                $(this).css({'color': options.activeColor});
            }, function(){
                $(this).css({'color': options.color});
            });
            $(this).find('li.next').hover(function(){
                $(this).css({'color': options.activeColor});
            }, function(){
                $(this).css({'color': options.color});
            });
            $(this).find('li.back').hover(function(){
                $(this).css({'color': options.activeColor});
            }, function(){
                $(this).css({'color': options.color});
            });

            //Ativando a mudança automatica de slides
            if(options.automatic){
                var auto = setInterval(next, options.time_to_change, $(this));
            }

            //funcao para ativar as setas como navegador dos slides
            if(options.key_navegation){
                setNavArrows($(this));
            }

            //Setando o primeiro li (link) como ativo
            setActiveLi($(this), 0);
        });
    };
})(jQuery);
