/*
Vamos criar um ptojeto para um sistema de livraria. Nele teremos 3 bancos 
de dados  com suas respectivas tabelas . A seguir :
- Banco de dados 
- Usuarios;
- livros 
- Carrinho
- Descrição dos bancos com sua tabela 
______________________________________________________________________________________
- SaraivaUsuarioDB
- Usuario
	- idusuario nomeusuario; senha;foto;dataalteracao.
-DADOS PESSOAIS:
	-iddadospessoais; nomecompleto;cpf;telefone;email;endereco
-OBSERVADORACESSO:
	-idobservacao; idusuario;acesso;tentativaLogin;paginaacessada;observacao;
____________________________________________________________________________________
-SaraivaLivrosDB															        
- CATEGORIA:
	-idcatecoria; nomecategoria;datacadastro
- TITULO:
	idtitulo; nometitulo;autortitulo;sinopse;datacadastro;idpreco;idfoto
- PRECO:
	-idpreco;precodesconto;dataalteracao;
- FOTO:
	-idfoto;foto1;foto2;foto3;foto4;
- ESTOQUE:
	-idestoque;idttitulo;quantidadeatual;
____________________________________________________________________________________
- SaraivaCarrinhoDB:
- CARRINHO
	-idcarrinho;idproduto;ideusuari;quantidade;total;
- PEDIDOS:
	-idpedido;idusuario;valortotal;datapedido
- DETALHEPEDIDO
	-iddetalhepedido;idpedido;idproduto;quantidade;subtotal
- PAGAMENTO:
	- idpagamento;idpedido;parcela;valorparcela;formapagamento;observaca

create database saraivausuariodb;
use saraivausuariodb;
create table usuario(
idusuario bigint auto_increment primary key,
nomeusuario varchar(30) not null unique,
senha varchar(255) not null,
foto varchar (200) not null,
dataalteracao timestamp default current_timestamp()
);
create table dadospessoais(
iddadospessoais bigint auto_increment primary key,
nomecompleto varchar(100) not null,
cpf varchar(15)not null unique,
telefone varchar(20) not null,
email varchar(100) not null unique,
endereco varchar(100) not null
);
create table observadoracesso(
idobservadoracesso bigint auto_increment primary key,
idusuario bigint not null,
acesso datetime not null,
tentativalogin varchar(20),
paginaacessada varchar (255) not null,
observacao text
);
*/
create database saraivalivrodb;
use saraivalivrodb;
create table categoria(
idcategoria int auto_increment primary key,
nomecategora varchar(50) not null,
datacadastro timestamp default current_timestamp()
);
create table titulo(
idtitulo bigint auto_increment primary key,
nometitulo varchar(100) not null,
autor varchar(200) not null,
sinopse text not null,
datacadastro timestamp default current_timestamp(),
idpreco int not null,
idfoto int not null
);
CREATE TABLE preco(
idpreco int auto_increment primary key,
precoatual  decimal(8,2) not null,
precodesconto decimal(8,2)not null,
dataalteracao datetime not null
);
CREATE TABLE fotos(
idfotos int auto_increment primary key,
foto1 varchar(200) not null,
foto2 varchar(200) not null,
foto3 varchar(200) not null,
foto4 varchar(200) not null
);
create table estoque(
idestoque bigint auto_increment primary key,
idtitulo bigint not null,
quantidadeatual int not null
);

















   
