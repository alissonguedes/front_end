-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 01-Fev-2021 às 12:45
-- Versão do servidor: 10.3.25-MariaDB-0ubuntu0.20.04.1
-- versão do PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `alissong_embaixada`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl_grupo`
--

CREATE TABLE `tb_acl_grupo` (
  `id` int(11) UNSIGNED NOT NULL,
  `grupo` varchar(25) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `permissao` smallint(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela para cadastro de grupos de usuários.';

--
-- Extraindo dados da tabela `tb_acl_grupo`
--

INSERT INTO `tb_acl_grupo` (`id`, `grupo`, `descricao`, `permissao`, `status`) VALUES
(1, 'Super Administrador', 'Tem permissão total no sistema.', 1111, '1'),
(2, 'Administrador', 'Há restrições para permissão exclusão de dados', 0100, '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl_menu`
--

CREATE TABLE `tb_acl_menu` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_secao` int(11) UNSIGNED NOT NULL,
  `id_parent` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `label` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `target` varchar(20) DEFAULT NULL,
  `ordem` int(11) NOT NULL DEFAULT 0,
  `permissao` smallint(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela para cadastro de menus';

--
-- Extraindo dados da tabela `tb_acl_menu`
--

INSERT INTO `tb_acl_menu` (`id`, `id_secao`, `id_parent`, `label`, `link`, `icon`, `target`, `ordem`, `permissao`, `status`) VALUES
(1, 1, 0, '__DASHBOARD__', 'dashboard', 'dashboard', NULL, 0, 0100, '1'),
(2, 1, 0, '__HOME_PAGE__', 'pagina-inicial', 'home', NULL, 1, 0100, '1'),
(3, 1, 0, '__SETTINGS__', 'configuracoes', 'build', NULL, 4, 0100, '1'),
(4, 1, 3, '__USERS__', 'usuarios', NULL, NULL, 3, 0100, '1'),
(5, 1, 3, '__SITE__', 'site', NULL, NULL, 3, 0100, '1'),
(6, 1, 3, '__COMPANIES__', 'empresas', NULL, NULL, 3, 0100, '1'),
(7, 1, 0, '__PROFILE__', 'perfil', 'portrait', NULL, 2, 0100, '1'),
(8, 1, 0, '__EMAIL__', 'email', 'mail', NULL, 3, 0100, '1'),
(9, 1, 3, '__GLOBALS__', 'configuracoes', NULL, NULL, 2, 0100, '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl_menu_grupo`
--

CREATE TABLE `tb_acl_menu_grupo` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_grupo` int(11) UNSIGNED NOT NULL,
  `id_menu` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela para atribuições de menus a grupos de usuários.';

--
-- Extraindo dados da tabela `tb_acl_menu_grupo`
--

INSERT INTO `tb_acl_menu_grupo` (`id`, `id_grupo`, `id_menu`) VALUES
(1, 1, 1),
(10, 2, 1),
(2, 1, 2),
(11, 2, 2),
(3, 1, 3),
(12, 2, 3),
(4, 1, 4),
(16, 2, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(15, 2, 7),
(8, 1, 8),
(14, 2, 8),
(9, 1, 9);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl_menu_secao`
--

CREATE TABLE `tb_acl_menu_secao` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_modulo` int(11) UNSIGNED NOT NULL,
  `secao` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela para cadastro de seções de menus. Seções correspondem ao local onde o menu se localizará: sidebar, header, footer, etc...';

--
-- Extraindo dados da tabela `tb_acl_menu_secao`
--

INSERT INTO `tb_acl_menu_secao` (`id`, `id_modulo`, `secao`, `slug`, `descricao`, `status`) VALUES
(1, 1, 'Menu Principal', 'sidebar', 'Menu principal da área administrativa', '1'),
(2, 2, 'Main Principal', 'main-menu', 'Menu principal da área pública', '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl_modulo`
--

CREATE TABLE `tb_acl_modulo` (
  `id` int(11) UNSIGNED NOT NULL,
  `modulo` varchar(50) NOT NULL,
  `diretorio` varchar(50) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela para cadastro de módulos. Módulos correspondem aos diretórios da aplicação: main, admin, etc...';

--
-- Extraindo dados da tabela `tb_acl_modulo`
--

INSERT INTO `tb_acl_modulo` (`id`, `modulo`, `diretorio`, `descricao`, `status`) VALUES
(1, 'área administrativa', 'admin', 'Área administrativa do site', '1'),
(2, 'área pública', 'main', 'Área pública do site', '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl_rotas`
--

CREATE TABLE `tb_acl_rotas` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_menu` int(11) UNSIGNED NOT NULL,
  `type` enum('add','get','post','put','head','options','delete','patch','match','resource','map','group') NOT NULL DEFAULT 'add',
  `route` varchar(255) NOT NULL,
  `controller` varchar(255) NOT NULL,
  `filter` longtext DEFAULT NULL,
  `permissao` smallint(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela para cadastro de rotas de menus.';

--
-- Extraindo dados da tabela `tb_acl_rotas`
--

INSERT INTO `tb_acl_rotas` (`id`, `id_menu`, `type`, `route`, `controller`, `filter`, `permissao`, `status`) VALUES
(1, 1, 'add', '/admin', 'Home::index', NULL, 0000, '1'),
(2, 1, 'add', '/admin/api/token', 'Api::token', NULL, 0100, '1'),
(3, 1, 'add', '/admin/dashboard', 'Home::index', NULL, 0100, '1'),
(4, 9, 'add', '/admin/configuracoes', 'Configuracoes::globais', NULL, 0110, '1'),
(5, 1, 'add', '/admin/logout', 'Login::logout', NULL, 0000, '1'),
(6, 1, 'add', '/admin/home', 'Home::index', NULL, 0100, '1'),
(7, 2, 'add', '/admin/pagina-inicial', 'Home::index', NULL, 0000, '1'),
(8, 3, 'post', '/admin/usuarios', 'Usuarios::insert', NULL, 0110, '1'),
(9, 4, 'put', '/admin/usuarios', 'Usuarios::update', NULL, 0110, '1'),
(10, 4, 'delete', '/admin/usuarios', 'Usuarios::delete', NULL, 0111, '1'),
(11, 4, 'add', '/admin/usuarios', 'Usuarios::index', NULL, 0110, '1'),
(12, 4, 'get', '/admin/usuarios/(:num)', 'Usuarios::form/$1', NULL, 0110, '1'),
(13, 4, 'patch', '/admin/usuarios/(:segment)', 'Usuarios::replace/$1', NULL, 0110, '1'),
(14, 4, 'delete', '/admin/usuarios/(:segment)', 'Usuarios::delete/$1', NULL, 0111, '1'),
(15, 4, 'get', '/admin/usuarios/(:segment)/perfil', 'Usuarios::perfil/$1', NULL, 0110, '1'),
(16, 4, 'get', '/admin/usuarios/form', 'Usuarios::form/$1', NULL, 0110, '1'),
(20, 6, 'add', '/admin/empresas', 'Empresas::index', NULL, 0110, '1'),
(21, 6, 'add', '/admin/empresas/form', 'Empresas::form', NULL, 0110, '1'),
(22, 6, 'get', '/admin/empresas/(:segment)', 'Empresas::form/$1', NULL, 0110, '1'),
(23, 6, 'get', '/admin/empresas/(:segment)/details', 'Empresas::show/$1', NULL, 0110, '1'),
(24, 6, 'post', '/admin/empresas', 'Empresas::insert', NULL, 0110, '1'),
(25, 6, 'put', '/admin/empresas', 'Empresas::update', NULL, 0110, '1'),
(26, 6, 'patch', '/admin/empresas', 'Empresas::replace/$1', NULL, 0110, '1'),
(27, 6, 'delete', '/admin/empresas', 'Empresas::delete', NULL, 0111, '1'),
(28, 6, 'delete', '/admin/empresas/(:segment)', 'Empresas::delete', NULL, 0111, '1'),
(29, 3, 'add', '/admin/site', 'Site::index', NULL, 0000, '1'),
(31, 3, 'add', '/admin/site/form', 'Site::form', NULL, 0110, '1'),
(32, 5, 'get', '/admin/site/(:segment)', 'Site::form/$1', NULL, 0110, '1'),
(33, 5, 'get', '/admin/site/(:segment)/details', 'Site::show/$1', NULL, 0100, '1'),
(34, 5, 'post', '/admin/site', 'Site::insert', NULL, 0100, '1'),
(35, 5, 'put', '/admin/site', 'Site::update', NULL, 0110, '1'),
(36, 5, 'patch', '/admin/site/(:segment)', 'Site::update/$1', NULL, 0110, '1'),
(37, 5, 'delete', '/admin/site', 'Site::delete', NULL, 0110, '1'),
(38, 5, 'delete', '/admin/site/(:segment)', 'Site::delete/$1', NULL, 0110, '1'),
(39, 7, 'get', '/admin/perfil', 'Perfil::perfil/$1', NULL, 0100, '1'),
(40, 8, 'get', '/admin/email', 'Email::index/$1', NULL, 0110, '1'),
(41, 9, 'put', '/admin/configuracoes', 'Configuracoes::update/$1', NULL, 0110, '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl_usuario`
--

CREATE TABLE `tb_acl_usuario` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_grupo` int(11) UNSIGNED NOT NULL,
  `id_gestor` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `ultimo_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `permissao` smallint(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela para cadastro de usuários';

--
-- Extraindo dados da tabela `tb_acl_usuario`
--

INSERT INTO `tb_acl_usuario` (`id`, `id_grupo`, `id_gestor`, `nome`, `email`, `login`, `senha`, `salt`, `ultimo_login`, `permissao`, `status`) VALUES
(1, 1, 0, 'Alisson', 'alisson', 'alissonguedes87@gmail.com', 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3', NULL, '2021-02-01 00:46:27', 0110, '1'),
(2, 2, 0, 'Edvan', 'edvan', 'edvan', 'b35e390f53a72c7ff2d52d99e210cf2a086920f52ab7583f20', NULL, '2020-10-24 00:47:33', 0000, '1'),
(3, 1, 0, 'Alisson', 'alisson@email.com', 'alisson2', '3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e', NULL, '0000-00-00 00:00:00', 0000, '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_acl_usuario_imagem`
--

CREATE TABLE `tb_acl_usuario_imagem` (
  `id_imagem` int(11) UNSIGNED NOT NULL,
  `id_usuario` int(11) UNSIGNED NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `privada` enum('0','1') NOT NULL,
  `data_add` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_banner`
--

CREATE TABLE `tb_banner` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Numero sequencial',
  `titulo` varchar(255) DEFAULT NULL COMMENT 'Título principal do banner.',
  `alias` varchar(255) DEFAULT NULL COMMENT 'Título sem caracteres especiais para identificar o banner.',
  `descricao` text DEFAULT NULL COMMENT 'Texto descritivo do banner',
  `clicks` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Quantidade de clicks/visualizações do banner',
  `url` varchar(255) DEFAULT NULL COMMENT 'Link para artigo',
  `imagem` varchar(255) NOT NULL COMMENT 'Caminho ou nome da imagem do banner',
  `original_name` varchar(255) NOT NULL,
  `imgsize` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Tamanho da imagem do banner',
  `dataadd` timestamp NULL DEFAULT current_timestamp() COMMENT 'Data de criação do banner',
  `autor` varchar(50) NOT NULL COMMENT 'Autor de criação do banner',
  `ordem` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Ordem para listagem do banner',
  `publish_up` date NOT NULL COMMENT 'Data para exibição do banner',
  `publish_down` date NOT NULL COMMENT 'Data para parar exibição do banner',
  `tags` varchar(200) DEFAULT NULL COMMENT 'Tags de pesquisa do banner',
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT 'Situação de exibição do banner. 0 - Não exibir; 1 - Exibir.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `id` int(11) UNSIGNED NOT NULL,
  `nome` varchar(100) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(3) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente_email`
--

CREATE TABLE `tb_cliente_email` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_cliente` int(11) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente_telefone`
--

CREATE TABLE `tb_cliente_telefone` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_cliente` int(11) UNSIGNED NOT NULL,
  `telefone` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_distribuidor`
--

CREATE TABLE `tb_distribuidor` (
  `id` int(11) UNSIGNED NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(3) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_distribuidor_email`
--

CREATE TABLE `tb_distribuidor_email` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_distribuidor` int(11) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_distribuidor_telefone`
--

CREATE TABLE `tb_distribuidor_telefone` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_distribuidor` int(11) UNSIGNED NOT NULL,
  `telefone` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_email`
--

CREATE TABLE `tb_email` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_reply` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(16) NOT NULL,
  `assunto` varchar(100) NOT NULL,
  `mensagem` text NOT NULL,
  `datahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_empresa`
--

CREATE TABLE `tb_empresa` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Chave primária da tabela.',
  `cnpj` varchar(18) NOT NULL COMMENT 'CNPJ da empresa.',
  `inscricao_estadual` varchar(14) NOT NULL COMMENT 'Inscrição Estadual da empresa',
  `inscricao_municipal` varchar(20) NOT NULL COMMENT 'Inscrição Municipal da empresa.',
  `razao_social` varchar(200) NOT NULL COMMENT 'Razão Social da empresa',
  `nome_fantasia` varchar(200) NOT NULL COMMENT 'Nome Fantasia da empresa.',
  `cep` varchar(9) NOT NULL COMMENT 'CEP do endereço da empresa',
  `endereco` varchar(200) NOT NULL COMMENT 'Endereço da empresa',
  `numero` varchar(11) NOT NULL COMMENT 'Número do endereço da empresa',
  `bairro` varchar(200) NOT NULL COMMENT 'Bairro do endereço da empresa',
  `complemento` varchar(200) DEFAULT NULL COMMENT 'Complemento do endereço da empresa',
  `cidade` varchar(200) NOT NULL COMMENT 'Cidade',
  `estado` varchar(3) NOT NULL COMMENT 'Estado',
  `quem_somos` text DEFAULT NULL COMMENT 'Descrição da empresa',
  `quem_somos_imagem` varchar(255) DEFAULT NULL,
  `distribuidor_imagem` varchar(255) DEFAULT NULL,
  `contato_imagem` varchar(255) DEFAULT NULL,
  `telefone` varchar(16) NOT NULL COMMENT 'Número do telefone da empresa',
  `celular` varchar(16) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL COMMENT 'E-mail da empresa',
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `gplus` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `gmaps` varchar(255) DEFAULT NULL,
  `aliquota_imposto` decimal(10,3) UNSIGNED NOT NULL DEFAULT 0.000 COMMENT 'Alíquota de imposto da empresa',
  `tributacao` enum('SIMPLES NACIONAL','SN - EXCESSO DE SUB-LIMITE DA RECEITA','REGIME NORMAL') NOT NULL DEFAULT 'SIMPLES NACIONAL' COMMENT 'Tipo de tributação',
  `certificado` blob DEFAULT NULL COMMENT 'Localização do arquivo de certificado digital para emissão de notas fiscais',
  `senha_certificado` varchar(255) NOT NULL COMMENT 'Senha do certificado digital',
  `ambiente` enum('0','1') NOT NULL DEFAULT '0' COMMENT 'Tipo do ambiente de emissão de notas fiscais. 0 - Homologação; 1 - Produção',
  `sequence_nfe` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Número da última nota fiscal eletrônica emitida.',
  `sequence_nfce` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Número da última nota fiscal de consumidor emitida.',
  `serie_nfe` int(2) UNSIGNED ZEROFILL NOT NULL DEFAULT 00 COMMENT 'Série da nota fiscal eletrônica.',
  `serie_nfce` int(2) UNSIGNED ZEROFILL NOT NULL DEFAULT 00 COMMENT 'Série da nota fiscal de consumidor.',
  `tokencsc` varchar(6) DEFAULT NULL COMMENT 'Token CSC',
  `csc` varchar(36) DEFAULT NULL COMMENT 'CSC',
  `matriz` enum('S','N') NOT NULL DEFAULT 'N' COMMENT 'Identifica como loja Matriz ou Filial',
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela de cadastro de lojas/empresas';

--
-- Extraindo dados da tabela `tb_empresa`
--

INSERT INTO `tb_empresa` (`id`, `cnpj`, `inscricao_estadual`, `inscricao_municipal`, `razao_social`, `nome_fantasia`, `cep`, `endereco`, `numero`, `bairro`, `complemento`, `cidade`, `estado`, `quem_somos`, `quem_somos_imagem`, `distribuidor_imagem`, `contato_imagem`, `telefone`, `celular`, `email`, `facebook`, `instagram`, `gplus`, `linkedin`, `github`, `gmaps`, `aliquota_imposto`, `tributacao`, `certificado`, `senha_certificado`, `ambiente`, `sequence_nfe`, `sequence_nfce`, `serie_nfe`, `serie_nfce`, `tokencsc`, `csc`, `matriz`, `status`) VALUES
(1, '', '', '', '', '', '', '', '', '', NULL, '', '', '<p><br></p>', NULL, NULL, '/embaixada_cod/public_html/assets/embaixada/img/quem_somos/1610941873_d36a8dfdb8b8262fcb0d.png', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.000', 'SIMPLES NACIONAL', NULL, '', '0', 0, 0, 00, 00, NULL, NULL, 'N', '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_foto`
--

CREATE TABLE `tb_foto` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Numero sequencial',
  `titulo` varchar(255) DEFAULT NULL COMMENT 'Título principal do banner.',
  `alias` varchar(255) DEFAULT NULL COMMENT 'Título sem caracteres especiais para identificar o banner.',
  `descricao` text DEFAULT NULL COMMENT 'Texto descritivo do banner',
  `clicks` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Quantidade de clicks/visualizações do banner',
  `url` varchar(255) DEFAULT NULL COMMENT 'Link para artigo',
  `imagem` varchar(255) NOT NULL COMMENT 'Caminho ou nome da imagem do banner',
  `original_name` varchar(255) NOT NULL,
  `imgsize` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Tamanho da imagem do banner',
  `dataadd` timestamp NULL DEFAULT current_timestamp() COMMENT 'Data de criação do banner',
  `autor` varchar(50) NOT NULL COMMENT 'Autor de criação do banner',
  `ordem` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Ordem para listagem do banner',
  `publish_up` date NOT NULL COMMENT 'Data para exibição do banner',
  `publish_down` date NOT NULL COMMENT 'Data para parar exibição do banner',
  `tags` varchar(200) DEFAULT NULL COMMENT 'Tags de pesquisa do banner',
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT 'Situação de exibição do banner. 0 - Não exibir; 1 - Exibir.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_lead`
--

CREATE TABLE `tb_lead` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_produto` int(11) UNSIGNED NOT NULL,
  `id_cliente` int(11) UNSIGNED NOT NULL,
  `datahora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_noticia`
--

CREATE TABLE `tb_noticia` (
  `id` int(11) UNSIGNED NOT NULL,
  `titulo` varchar(500) NOT NULL,
  `subtitulo` varchar(500) DEFAULT NULL,
  `titulo_slug` varchar(255) NOT NULL,
  `texto` text DEFAULT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `imagem` varchar(255) DEFAULT NULL,
  `lang` varchar(5) NOT NULL COMMENT 'Idioma padrão da postagem',
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_noticia_traducao`
--

CREATE TABLE `tb_noticia_traducao` (
  `id` int(11) NOT NULL,
  `id_noticia` int(11) UNSIGNED NOT NULL,
  `titulo` varchar(500) DEFAULT NULL,
  `subtitulo` varchar(500) DEFAULT NULL,
  `lang` varchar(5) DEFAULT NULL,
  `texto` text DEFAULT NULL,
  `date_time` datetime DEFAULT current_timestamp(),
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pagina`
--

CREATE TABLE `tb_pagina` (
  `id` int(11) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `subtitulo` varchar(500) DEFAULT NULL,
  `titulo_slug` varchar(255) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `imagem` varchar(255) DEFAULT NULL,
  `lang` varchar(5) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_pagina`
--

INSERT INTO `tb_pagina` (`id`, `titulo`, `subtitulo`, `titulo_slug`, `date_time`, `imagem`, `lang`, `status`) VALUES
(46, 'Embaixada', NULL, 'embaixada', '2021-02-01 09:31:03', NULL, 'pt-br', '1'),
(47, 'Sector Consular', NULL, 'sector-consular', '2021-02-01 10:22:19', NULL, 'pt-br', '1'),
(49, 'angola', NULL, 'angola', '2021-02-01 10:33:15', NULL, 'pt-br', '1'),
(50, 'Relações bilaterais', NULL, 'relacoes-bilaterais', '2021-02-01 14:02:40', NULL, 'en', '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pagina_traducao`
--

CREATE TABLE `tb_pagina_traducao` (
  `id` int(11) NOT NULL,
  `id_pagina` int(11) UNSIGNED NOT NULL,
  `titulo` varchar(500) DEFAULT NULL,
  `subtitulo` varchar(500) DEFAULT NULL,
  `lang` varchar(5) DEFAULT NULL,
  `texto` text DEFAULT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_pagina_traducao`
--

INSERT INTO `tb_pagina_traducao` (`id`, `id_pagina`, `titulo`, `subtitulo`, `lang`, `texto`, `date_time`, `status`) VALUES
(154, 46, 'EMBAIXADA DA REPÚBLICA DE ANGOLA NA HUNGRIA', NULL, 'en', '<p>Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês</p><p><br></p><p>Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês</p><p><br></p><p>Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês vTexto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês</p><p>Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês</p><p><br></p><p>Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês Texto em inglês</p>', '2021-02-01 06:30:30', '1'),
(156, 47, 'teste', NULL, 'en', '<p>Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês Setor Consular em inglês</p>', '2021-02-01 07:26:25', '1'),
(157, 49, 'angola', NULL, 'en', '<p>Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola</p><p><br></p><p>Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola</p><p><br></p><p>Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola Texto angola</p>', '2021-02-01 07:33:15', '1'),
(158, 50, 'Relações bilateraisa', NULL, 'en', '<p>Texto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilateraisTexto em inglês Relações bilaterais</p>', '2021-02-01 07:35:27', '1'),
(159, 50, 'teste1', 'teste1', 'es', '<p>teste1</p>', '2021-02-01 08:29:43', '1'),
(160, 50, 'Idioma Portugês', 'Português', 'pt-br', '<p>Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português </p><p><br></p><p>Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português </p><p>Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português </p><p><br></p><p>Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português </p>', '2021-02-01 10:33:03', '1'),
(161, 47, 'Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português ', NULL, 'pt-br', '<p>Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português Português</p>', '2021-02-01 11:04:55', '1'),
(162, 47, NULL, NULL, 'hr', '<p><br></p>', '2021-02-01 11:06:35', '0'),
(163, 47, NULL, NULL, 'es', '<p>Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol Espanhol </p>', '2021-02-01 11:06:35', '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_produto`
--

CREATE TABLE `tb_produto` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_distribuidor` int(11) UNSIGNED NOT NULL,
  `id_categoria` int(11) UNSIGNED NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `modo_uso` text NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `valor` decimal(10,3) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_produto_categoria`
--

CREATE TABLE `tb_produto_categoria` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_parent` int(11) UNSIGNED NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_config`
--

CREATE TABLE `tb_sys_config` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `title` varchar(70) NOT NULL DEFAULT 'My New Site',
  `description` varchar(160) DEFAULT NULL,
  `quem_somos` longtext DEFAULT NULL,
  `keywords` varchar(200) DEFAULT NULL,
  `custodian` varchar(100) DEFAULT NULL,
  `expires` varchar(60) DEFAULT NULL,
  `revisit_after` varchar(20) DEFAULT NULL,
  `rating` varchar(60) NOT NULL DEFAULT 'general',
  `robots` varchar(16) NOT NULL DEFAULT 'index,follow',
  `theme_color` varchar(26) DEFAULT NULL,
  `logomarca` varchar(255) DEFAULT NULL,
  `language` varchar(5) NOT NULL DEFAULT 'pt-BR',
  `msg_manutencao` longtext DEFAULT NULL,
  `msg_suspensao` longtext DEFAULT NULL,
  `manutencao` enum('1','0') NOT NULL DEFAULT '0',
  `bloqueado` enum('1','0') NOT NULL DEFAULT '0',
  `force_www` enum('1','0') NOT NULL DEFAULT '0',
  `force_https` enum('1','0') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_sys_config`
--

INSERT INTO `tb_sys_config` (`id`, `url`, `path`, `title`, `description`, `quem_somos`, `keywords`, `custodian`, `expires`, `revisit_after`, `rating`, `robots`, `theme_color`, `logomarca`, `language`, `msg_manutencao`, `msg_suspensao`, `manutencao`, `bloqueado`, `force_www`, `force_https`) VALUES
(1, 'localhost', '/embaixada', 'Embaixada da República de Angola na Hungria', '', NULL, NULL, 'Guedes, Alisson', NULL, NULL, 'general', '', NULL, NULL, 'pt-br', NULL, NULL, '0', '0', '0', '0');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_config_keywords`
--

CREATE TABLE `tb_sys_config_keywords` (
  `id` int(11) NOT NULL,
  `id_site` int(11) NOT NULL,
  `tag` int(200) NOT NULL,
  `image` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_linguagem`
--

CREATE TABLE `tb_sys_linguagem` (
  `id` int(11) UNSIGNED NOT NULL,
  `lang` varchar(100) DEFAULT NULL,
  `lang_abr` varchar(5) DEFAULT NULL,
  `bandeira` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_sys_linguagem`
--

INSERT INTO `tb_sys_linguagem` (`id`, `lang`, `lang_abr`, `bandeira`) VALUES
(1, 'Português do Brasil', 'pt-br', NULL),
(2, 'Inglês', 'en', NULL),
(6, 'Húngaro', 'hr', NULL),
(7, 'Espanhol', 'es', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_linguagem_traducao`
--

CREATE TABLE `tb_sys_linguagem_traducao` (
  `id` int(11) NOT NULL,
  `lang_abr` varchar(5) NOT NULL,
  `label` varchar(100) NOT NULL,
  `traducao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_sys_linguagem_traducao`
--

INSERT INTO `tb_sys_linguagem_traducao` (`id`, `lang_abr`, `label`, `traducao`) VALUES
(1, 'pt-br', '__IDIOMA_INDISPONIVEL__', 'Tradução não disponível neste idioma'),
(2, 'pt-br', '__ADMIN_AREA__', 'Área Administrativa'),
(3, 'pt-br', '__NAME__', 'Nome'),
(4, 'pt-br', '__PASSWORD__', 'Senha'),
(5, 'pt-br', '__FILTERS__', 'Filtros'),
(6, 'pt-br', '__RETRIEVE_LOGIN__', 'Esqueci meu login'),
(7, 'pt-br', '__RETRIEVE_PASSWORD__', 'Esqueci minha senha'),
(8, 'pt-br', '__NEXT__', 'Próximo'),
(9, 'pt-br', '__LOGIN__', 'Entrar'),
(10, 'pt-br', '__SITE__', 'Site'),
(11, 'pt-br', '__SYSTEM__', 'Sistema'),
(12, 'pt-br', '__SERVER__', 'Servidor'),
(13, 'pt-br', '__MENUS__', 'Menus'),
(14, 'pt-br', '__PERMISSIONS__', 'Permissões'),
(15, 'pt-br', '__DATE_OF_BIRTH__', 'Data de Nascimento'),
(16, 'pt-br', '__NATURALNESS__', 'Naturalidade'),
(17, 'pt-br', '__CURRENT_ADDRESS__', 'Endereço Atual'),
(18, 'pt-br', '__TELEPHONE__', 'Telefone'),
(19, 'pt-br', '__CELLPHONE__', 'Celular'),
(20, 'pt-br', '__SOCIAL_NETWORKS__', 'Redes Sociais'),
(21, 'pt-br', '__STYLES_AND_PREFERENCES__', 'Estilos e Perferências'),
(22, 'pt-br', '__SAVE__', 'Salvar'),
(23, 'pt-br', '__SAVE_CHANGES__', 'Salvar alterações'),
(24, 'pt-br', '__USER__', 'Usuário'),
(25, 'pt-br', '__USERS__', 'Usuários'),
(26, 'pt-br', '__GROUP__', 'Grupo'),
(27, 'pt-br', '__GROUPS__', 'Grupos'),
(28, 'pt-br', '__EMAIL__', 'E-mail'),
(29, 'pt-br', '__DASHBOARD__', 'Início'),
(30, 'pt-br', '__HOME_PAGE__', 'início'),
(31, 'pt-br', '__PROFILE__', 'Perfil'),
(32, 'pt-br', '__SETTINGS__', 'Configurações'),
(33, 'pt-br', '__GLOBALS__', 'Globais'),
(34, 'pt-br', '__COMPANIES__', 'Empresas'),
(35, 'pt-br', '__SITE_UNDER_MAINTENANCE__', 'Em manutenção'),
(36, 'pt-br', '__SITE_BLOCKED__', 'Suspender'),
(37, 'pt-br', '__WITH_HTTPS__', 'Utilizar HTTPS'),
(38, 'pt-br', '__REDIRECT_WWW__', 'Redirecionar WWW'),
(39, 'pt-br', '__SELECT_GROUP__', 'Selecione o grupo'),
(40, 'pt-br', '__USERNAME__', 'Usuário'),
(41, 'pt-br', '__EDIT__', 'Editar'),
(42, 'pt-br', '__NEW_USER__', 'Novo Usuário'),
(43, 'pt-br', '__PERSONAL_DATA__', 'Dados pessoais'),
(44, 'pt-br', '__ACCOUNT__', 'Conta'),
(45, 'pt-br', '__POSTS__', 'Postagens'),
(46, 'pt-br', '__PAGES__', 'Páginas'),
(47, 'pt-br', '__STATE_REGISTRATION__', 'Inscrição estadual'),
(48, 'pt-br', '__CNPJ__', 'CNPJ'),
(49, 'pt-br', '__MUNICIPAL_REGISTRATION__', 'Inscrição municipal'),
(50, 'pt-br', '__COMPANY_NAME__', 'Nome da empresa'),
(51, 'pt-br', '__FANTASY_NAME__', 'Nome fantasia'),
(52, 'pt-br', '__SITE_NAME__', 'Título do site'),
(53, 'pt-br', '__SITE_URL__', 'URL do site'),
(54, 'pt-br', '__SITE_DESCRIPTION__', 'Descrição do site'),
(55, 'pt-br', '__SITE_TAGS__', 'Tags do site'),
(56, 'pt-br', '__CHANGE_IMAGE__', 'Alterar imagem'),
(57, 'pt-br', '__RESET__', 'Redefinir'),
(58, 'pt-br', '__SEO__', 'SEO'),
(59, 'pt-br', '__SECURITY__', 'Segurança'),
(60, 'pt-br', '__LABEL_CONFIG_HTTPS_DESCRIPTION__', 'Esta opção requer um certificado SSL habilitado para seu site.'),
(61, 'pt-br', '__LABEL_CONFIG_WWW_DESCRIPTION__', 'Esta opção forçará o URL com WWW.'),
(62, 'pt-br', '__LABEL_CONFIG_MAINTENANCE_DESCRIPTION__', 'Esta opção bloqueará o site temporariamente com mensagem de manutenção.'),
(63, 'pt-br', '__LABEL_CONFIG_BLOCKED_DESCRIPTION__', 'Esta opção bloqueará o site permanentemente com mensagem de suspensão.'),
(64, 'pt-br', '__MESSAGES__', 'Mensagens'),
(65, 'pt-br', '__SITE_MESSAGES__', 'Mensagens do site'),
(66, 'pt-br', '__INFORMATIONS__', 'Informações'),
(67, 'pt-br', '__SEARCH_ROBOTS__', 'Robôs de busca'),
(69, 'pt-br', '__DEVELOPER__', 'Desenvolvedor'),
(71, 'pt-br', '__DEVELOPER_WEBSITE__', 'Site do desenvolvedor'),
(72, 'pt-br', '__INVALID_USER__', 'Usuário inativo ou inexistente.'),
(73, 'pt-br', '__INVALID_PASSWORD__', 'Senha Incorreta'),
(75, 'pt-br', 'quero_obter_um_visto', 'Quero obter um visto'),
(76, 'pt-br', 'selecionar_idioma', 'Selecione o idioma'),
(77, 'pt-br', 'procuro_servicos_para_cidadaos_angolanos', 'Procuro serviços para cidadãos angolanos'),
(78, 'pt-br', 'quero_estudar_na_hungria', 'Quero estudar na Hungria'),
(79, 'pt-br', 'procuro_oportunidade_de_negocios', 'Procuro oportunidades de negócios'),
(80, 'pt-br', 'quero_visitar_a_hungria', 'Quero visitar a Hungria'),
(81, 'pt-br', 'procuro_informacoes_sobre_politica_hungara', 'Procuro Informações sobre política Hungara'),
(82, 'pt-br', 'embaixada_da_republica', 'EMBAIXADA DA REPÚBLICA'),
(83, 'pt-br', 'de_angola_na_hungria', 'DE ANGOLA NA HUNGRIA'),
(84, 'pt-br', 'home_page', 'INÍCIO'),
(85, 'pt-br', 'embaixada', 'EMBAIXADA'),
(86, 'pt-br', 'sector_consular', 'SECTOR CONSULAR'),
(87, 'pt-br', 'angola', 'ANGOLA'),
(88, 'pt-br', 'relacoes_bilaterais', 'RELAÇÕES BILATERAIS'),
(89, 'pt-br', 'novidades', 'novidades'),
(90, 'pt-br', 'fotos', 'FOTOS'),
(91, 'pt-br', 'pesquisar', 'pesquisar'),
(92, 'en', 'de_angola_na_hungria', 'OF ANGOLA IN HUNGARY'),
(93, 'en', 'embaixada_da_republica', 'EMBASSY OF THE REPUBLIC'),
(94, 'en', 'pesquisar', 'Search'),
(95, 'en', 'fotos', 'PHOTOS'),
(96, 'en', 'novidades', 'news'),
(97, 'en', 'relacoes_bilaterais', 'BILATERAL RELATIONS'),
(98, 'en', 'angola', 'ANGOLA'),
(99, 'en', 'sector_consular', 'CONSULAR SECTOR'),
(100, 'en', 'embaixada', 'EMBASSY'),
(101, 'en', 'home_page', 'HOME'),
(102, 'en', 'procuro_informacoes_sobre_politica_hungara', 'Looking for Hungarian Policy Information'),
(103, 'en', 'quero_visitar_a_hungria', 'I want to visit Hungary'),
(104, 'en', 'procuro_oportunidade_de_negocios', 'Looking for business opportunities'),
(105, 'en', 'quero_estudar_na_hungria', 'I want to study in Hungary'),
(106, 'en', 'procuro_servicos_para_cidadaos_angolanos', 'I am looking for services for Angolan citizens'),
(107, 'en', 'selecionar_idioma', 'Select the language'),
(108, 'en', 'quero_obter_um_visto', 'I want to get a visa'),
(109, 'en', 'ver_todas_as_atualidades', 'View all news'),
(110, 'pt-br', 'ver_todas_as_atualidades', 'Ver todas as notícias'),
(111, 'pt-br', 'nao_exitem_noticias_publicadas_no_momento', 'Não existem notícias publicadas no momento.'),
(112, 'en', 'nao_exitem_noticias_publicadas_no_momento', 'There are currently no news published.'),
(113, 'pt-br', 'conheca_mais_a_hungria', 'Conheça Mais a Hungria'),
(114, 'en', 'conheca_mais_a_hungria', 'Learn more about Hungary'),
(115, 'en', '__IDIOMA_INDISPONIVEL__', 'Translation not available in this language'),
(116, 'hr', '__IDIOMA_INDISPONIVEL__', 'A fordítás nem érhető el ezen a nyelven'),
(117, 'es', '__IDIOMA_INDISPONIVEL__', 'Traducción no disponible en este idioma'),
(120, 'pt-br', '__NOTICIAS_IDIOMA_INDISPONIVEL__', 'Notícia não disponível neste idioma'),
(121, 'es', '__NOTICIAS_IDIOMA_INDISPONIVEL__', 'Noticias no disponibles en este idioma'),
(122, 'hr', '__NOTICIAS_IDIOMA_INDISPONIVEL__', 'A hírek nem érhetők el ezen a nyelven'),
(123, 'en', '__NOTICIAS_IDIOMA_INDISPONIVEL__', 'News not available in this language'),
(124, 'en', '__NOTICIAS__', 'News'),
(125, 'pt-br', '__NOTICIAS__', 'Notícias'),
(128, 'pt-br', '__PAGE_TITLE__', 'Embaixada da República de Angola na Hungria'),
(129, 'en', '__PAGE_TITLE__', 'Embassy of the Republic of Angola in Hungary');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_site`
--

CREATE TABLE `tb_sys_site` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Número sequencial da tabela.',
  `id_site` int(11) UNSIGNED NOT NULL,
  `config` varchar(255) NOT NULL,
  `value` longtext DEFAULT NULL COMMENT 'Endereço do website',
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT '1 - Ativa ou 0 Inativa permanete ou temporariamente o site'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela de configurações do site';

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_site_config_antigo`
--

CREATE TABLE `tb_sys_site_config_antigo` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Número sequencial da tabela.',
  `id_site` int(11) UNSIGNED NOT NULL,
  `config` varchar(255) NOT NULL,
  `value` longtext DEFAULT NULL COMMENT 'Endereço do website',
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT '1 - Ativa ou 0 Inativa permanete ou temporariamente o site'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela de configurações do site';

--
-- Extraindo dados da tabela `tb_sys_site_config_antigo`
--

INSERT INTO `tb_sys_site_config_antigo` (`id`, `id_site`, `config`, `value`, `status`) VALUES
(1, 1, 'force_https', '0', '1'),
(2, 1, 'developer_website', 'https://www.alissonguedes.com.br', '1'),
(3, 1, 'author', 'Alisson Guedes', '1'),
(4, 1, 'creator_address', NULL, '1'),
(5, 1, 'version', NULL, '1'),
(6, 1, 'logomarca_nf', NULL, '1'),
(7, 1, 'texto_apresentacao', NULL, '1'),
(8, 1, 'facebook', NULL, '1'),
(9, 1, 'instagram', NULL, '1'),
(10, 1, 'twitter', NULL, '1'),
(11, 1, 'youtube', NULL, '1'),
(12, 1, 'linkedin', NULL, '1'),
(13, 1, 'gplus', NULL, '1'),
(14, 1, 'email', NULL, '1'),
(15, 1, 'telefone', NULL, '1'),
(16, 1, 'celular', NULL, '1'),
(17, 1, 'manutencao', NULL, '1'),
(18, 1, 'bloqueado', '0', '1'),
(19, 1, 'force_www', '0', '1'),
(20, 1, 'website_developer', NULL, '1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_site_telefone`
--

CREATE TABLE `tb_sys_site_telefone` (
  `id` int(11) NOT NULL,
  `id_site` int(11) NOT NULL,
  `telefone` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_acl_grupo`
--
ALTER TABLE `tb_acl_grupo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grupo` (`grupo`);

--
-- Índices para tabela `tb_acl_menu`
--
ALTER TABLE `tb_acl_menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_acl_menu_id_secao` (`id_secao`);

--
-- Índices para tabela `tb_acl_menu_grupo`
--
ALTER TABLE `tb_acl_menu_grupo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_menu` (`id_menu`,`id_grupo`),
  ADD KEY `fk_tb_acl_menu_grupo_id_grupo` (`id_grupo`);

--
-- Índices para tabela `tb_acl_menu_secao`
--
ALTER TABLE `tb_acl_menu_secao`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_modulo` (`id_modulo`,`secao`,`slug`);

--
-- Índices para tabela `tb_acl_modulo`
--
ALTER TABLE `tb_acl_modulo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `modulo` (`modulo`),
  ADD UNIQUE KEY `diretorio` (`diretorio`);

--
-- Índices para tabela `tb_acl_rotas`
--
ALTER TABLE `tb_acl_rotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_acl_rotas_id_menu` (`id_menu`);

--
-- Índices para tabela `tb_acl_usuario`
--
ALTER TABLE `tb_acl_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `fk_tb_acl_usuario_id_grupo` (`id_grupo`);

--
-- Índices para tabela `tb_acl_usuario_imagem`
--
ALTER TABLE `tb_acl_usuario_imagem`
  ADD PRIMARY KEY (`id_imagem`),
  ADD KEY `tb_acl_usuario_imagem_id_usuario` (`id_usuario`);

--
-- Índices para tabela `tb_banner`
--
ALTER TABLE `tb_banner`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_cliente_email`
--
ALTER TABLE `tb_cliente_email`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tb_cliente_email_id_cliente` (`id_cliente`);

--
-- Índices para tabela `tb_cliente_telefone`
--
ALTER TABLE `tb_cliente_telefone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tb_cliente_telefone_id_cliente` (`id_cliente`);

--
-- Índices para tabela `tb_distribuidor`
--
ALTER TABLE `tb_distribuidor`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_distribuidor_email`
--
ALTER TABLE `tb_distribuidor_email`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_distribuidor_email_id_distribuidor` (`id_distribuidor`);

--
-- Índices para tabela `tb_distribuidor_telefone`
--
ALTER TABLE `tb_distribuidor_telefone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_distribuidor_telefone_id_distribuidor` (`id_distribuidor`);

--
-- Índices para tabela `tb_email`
--
ALTER TABLE `tb_email`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cnpj` (`cnpj`);

--
-- Índices para tabela `tb_foto`
--
ALTER TABLE `tb_foto`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_lead`
--
ALTER TABLE `tb_lead`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tb_lead_id_cliente` (`id_cliente`),
  ADD KEY `tb_lead_id_produto` (`id_produto`);

--
-- Índices para tabela `tb_noticia`
--
ALTER TABLE `tb_noticia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_noticia_lang` (`lang`);

--
-- Índices para tabela `tb_noticia_traducao`
--
ALTER TABLE `tb_noticia_traducao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_post_lang` (`lang`),
  ADD KEY `fk_tb_post_id_pagina` (`id_noticia`) USING BTREE;

--
-- Índices para tabela `tb_pagina`
--
ALTER TABLE `tb_pagina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_pagina_lang` (`lang`);

--
-- Índices para tabela `tb_pagina_traducao`
--
ALTER TABLE `tb_pagina_traducao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_post_lang` (`lang`),
  ADD KEY `fk_tb_post_id_pagina` (`id_pagina`) USING BTREE;

--
-- Índices para tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tb_produto_id_categoria` (`id_categoria`);

--
-- Índices para tabela `tb_produto_categoria`
--
ALTER TABLE `tb_produto_categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_sys_config`
--
ALTER TABLE `tb_sys_config`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`url`);

--
-- Índices para tabela `tb_sys_config_keywords`
--
ALTER TABLE `tb_sys_config_keywords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tb_sys_config_keywords_id_site` (`id_site`);

--
-- Índices para tabela `tb_sys_linguagem`
--
ALTER TABLE `tb_sys_linguagem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lang_abr` (`lang_abr`);

--
-- Índices para tabela `tb_sys_linguagem_traducao`
--
ALTER TABLE `tb_sys_linguagem_traducao`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lang_abr_2` (`lang_abr`,`label`);

--
-- Índices para tabela `tb_sys_site`
--
ALTER TABLE `tb_sys_site`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`id_site`);

--
-- Índices para tabela `tb_sys_site_config_antigo`
--
ALTER TABLE `tb_sys_site_config_antigo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`id_site`);

--
-- Índices para tabela `tb_sys_site_telefone`
--
ALTER TABLE `tb_sys_site_telefone`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telefone` (`telefone`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_acl_grupo`
--
ALTER TABLE `tb_acl_grupo`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_acl_menu`
--
ALTER TABLE `tb_acl_menu`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tb_acl_menu_grupo`
--
ALTER TABLE `tb_acl_menu_grupo`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `tb_acl_menu_secao`
--
ALTER TABLE `tb_acl_menu_secao`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_acl_modulo`
--
ALTER TABLE `tb_acl_modulo`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_acl_rotas`
--
ALTER TABLE `tb_acl_rotas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de tabela `tb_acl_usuario`
--
ALTER TABLE `tb_acl_usuario`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_acl_usuario_imagem`
--
ALTER TABLE `tb_acl_usuario_imagem`
  MODIFY `id_imagem` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_banner`
--
ALTER TABLE `tb_banner`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Numero sequencial', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_cliente_email`
--
ALTER TABLE `tb_cliente_email`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_cliente_telefone`
--
ALTER TABLE `tb_cliente_telefone`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_distribuidor`
--
ALTER TABLE `tb_distribuidor`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_distribuidor_email`
--
ALTER TABLE `tb_distribuidor_email`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_distribuidor_telefone`
--
ALTER TABLE `tb_distribuidor_telefone`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_email`
--
ALTER TABLE `tb_email`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_empresa`
--
ALTER TABLE `tb_empresa`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Chave primária da tabela.', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_foto`
--
ALTER TABLE `tb_foto`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Numero sequencial', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_lead`
--
ALTER TABLE `tb_lead`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_noticia`
--
ALTER TABLE `tb_noticia`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT de tabela `tb_noticia_traducao`
--
ALTER TABLE `tb_noticia_traducao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT de tabela `tb_pagina`
--
ALTER TABLE `tb_pagina`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de tabela `tb_pagina_traducao`
--
ALTER TABLE `tb_pagina_traducao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT de tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_produto_categoria`
--
ALTER TABLE `tb_produto_categoria`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_sys_config`
--
ALTER TABLE `tb_sys_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_sys_config_keywords`
--
ALTER TABLE `tb_sys_config_keywords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_sys_linguagem`
--
ALTER TABLE `tb_sys_linguagem`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de tabela `tb_sys_linguagem_traducao`
--
ALTER TABLE `tb_sys_linguagem_traducao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de tabela `tb_sys_site`
--
ALTER TABLE `tb_sys_site`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Número sequencial da tabela.', AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `tb_sys_site_config_antigo`
--
ALTER TABLE `tb_sys_site_config_antigo`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Número sequencial da tabela.', AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `tb_sys_site_telefone`
--
ALTER TABLE `tb_sys_site_telefone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb_acl_menu`
--
ALTER TABLE `tb_acl_menu`
  ADD CONSTRAINT `fk_tb_acl_menu_id_secao` FOREIGN KEY (`id_secao`) REFERENCES `tb_acl_menu_secao` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_acl_menu_grupo`
--
ALTER TABLE `tb_acl_menu_grupo`
  ADD CONSTRAINT `fk_tb_acl_menu_grupo_id_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `tb_acl_grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tb_acl_menu_grupo_id_menu` FOREIGN KEY (`id_menu`) REFERENCES `tb_acl_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_acl_menu_secao`
--
ALTER TABLE `tb_acl_menu_secao`
  ADD CONSTRAINT `fk_tb_acl_menu_secao_id_modulo` FOREIGN KEY (`id_modulo`) REFERENCES `tb_acl_modulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_acl_rotas`
--
ALTER TABLE `tb_acl_rotas`
  ADD CONSTRAINT `fk_tb_acl_rotas_id_menu` FOREIGN KEY (`id_menu`) REFERENCES `tb_acl_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_acl_usuario`
--
ALTER TABLE `tb_acl_usuario`
  ADD CONSTRAINT `fk_tb_acl_usuario_id_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `tb_acl_grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_acl_usuario_imagem`
--
ALTER TABLE `tb_acl_usuario_imagem`
  ADD CONSTRAINT `tb_acl_usuario_imagem_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tb_acl_usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_cliente_email`
--
ALTER TABLE `tb_cliente_email`
  ADD CONSTRAINT `tb_cliente_email_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tb_cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_cliente_telefone`
--
ALTER TABLE `tb_cliente_telefone`
  ADD CONSTRAINT `tb_cliente_telefone_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tb_cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_distribuidor_email`
--
ALTER TABLE `tb_distribuidor_email`
  ADD CONSTRAINT `fk_tb_distribuidor_email_id_distribuidor` FOREIGN KEY (`id_distribuidor`) REFERENCES `tb_distribuidor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_distribuidor_telefone`
--
ALTER TABLE `tb_distribuidor_telefone`
  ADD CONSTRAINT `fk_tb_distribuidor_telefone_id_distribuidor` FOREIGN KEY (`id_distribuidor`) REFERENCES `tb_distribuidor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_lead`
--
ALTER TABLE `tb_lead`
  ADD CONSTRAINT `tb_lead_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tb_cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_lead_id_produto` FOREIGN KEY (`id_produto`) REFERENCES `tb_produto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_noticia`
--
ALTER TABLE `tb_noticia`
  ADD CONSTRAINT `fk_tb_noticia_lang` FOREIGN KEY (`lang`) REFERENCES `tb_sys_linguagem` (`lang_abr`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_noticia_traducao`
--
ALTER TABLE `tb_noticia_traducao`
  ADD CONSTRAINT `fk_tb_noticia_traducao_id_noticia` FOREIGN KEY (`id_noticia`) REFERENCES `tb_noticia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_pagina`
--
ALTER TABLE `tb_pagina`
  ADD CONSTRAINT `fk_tb_pagina_lang` FOREIGN KEY (`lang`) REFERENCES `tb_sys_linguagem` (`lang_abr`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_pagina_traducao`
--
ALTER TABLE `tb_pagina_traducao`
  ADD CONSTRAINT `fk_tb_post_id_pagina` FOREIGN KEY (`id_pagina`) REFERENCES `tb_pagina` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tb_post_lang` FOREIGN KEY (`lang`) REFERENCES `tb_sys_linguagem` (`lang_abr`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD CONSTRAINT `tb_produto_id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `tb_produto_categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_sys_config_keywords`
--
ALTER TABLE `tb_sys_config_keywords`
  ADD CONSTRAINT `tb_sys_config_keywords_id_site` FOREIGN KEY (`id_site`) REFERENCES `tb_sys_config` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_sys_linguagem_traducao`
--
ALTER TABLE `tb_sys_linguagem_traducao`
  ADD CONSTRAINT `fk_tb_linguagem_traducao_lang_abr` FOREIGN KEY (`lang_abr`) REFERENCES `tb_sys_linguagem` (`lang_abr`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
