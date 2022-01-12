<h2>Sistema de gerenciamento de pessoas</h2>

Sistema para o gerenciamento de pessoas através de uma API REST, usando Spring Boot no backend e Angular no frontend.

Nesse sistema é possível:
* cadastrar,
* listar,
* atualizar e
* excluir pessoas e seus respectivos telefones.

As tecnologias usadas foram:
* Spring Boot, JPA, H2, Security, lombok...
* Maven
* Angular
* Git e GitHub
* Heroku
* Netlify...

Para ver o projeto, clique no endereço abaixo:

https://person-alisson-youssf.netlify.app

Para testar a API, o endereço é:
```
http://localhost:8080/api/v1/peoples
```

Exemplo de inserção
```
{    
    "firstName": "Alisson",
    "lastName": "Youssf",
    "cpf": "369.333.878-79",
    "birthDate": 10/10/2000,    
    "note": "teste",
    "phones": [
        { 
            "type": "CELULAR",
            "number": "85 9999999"
        },
        {         
            "type": "CELULAR",
            "number": "85 5245245"
        }
    ]
}
```