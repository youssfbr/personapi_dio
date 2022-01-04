<h2>Sistema de gerenciamento de pessoas</h2>

Sistema para o gerenciamento de pessoas através de uma API REST, usando Spring Boot como backend.

Nesse sistema é possível:
* cadastrar,
* listar,
* atualizar e
* excluir pessoas e seus respectivos telefones.

As tecnologias usadas foram:
* Spring Boot, JPA, H2, Security, lombok...
* Maven
* Git e GitHub
* Heroku...

NOTA: Para facilitar a instalação do sistema, foi usado o H2, que é Banco de Dados é em memória, ou seja, toda vez que reiniciar o sistema os dados serão perdidos.

Para executar o projeto você vai precisar ter instalado no seu computador:

* [Java 11](https://download.java.net/java/GA/jdk11/13/GPL/openjdk-11.0.1_windows-x64_bin.zip) ou versões superiores.
* [Maven](https://maven.apache.org/download.cgi) 3.6.3 ou versões superiores.
* [GIT](https://git-scm.com/) - Controle de versão instalado na sua máquina.
* [GitHub](http://github.com/)
* [Postman](https://www.postman.com/) pra fazer as requisições

Depois de tudo instalado e funcionando, para rodar o projeto no seu computador,
* Abra um terminal
* Crie ou entre dentro da pasta onde ficará o projeto
* e clone o projeto que está no GITHUB no endereço:
```shell script
https://github.com/youssfbr/personapi_dio
```

Entre dentro da pasta BACKEND e  digite o seguinte comando:

```shell script
mvn spring-boot:run 
```

Após executar o comando acima, basta apenas abrir o POSTMAN e fazer as requisições no seguinte endereço:

```
http://localhost:8080/api/v1/peoples
```