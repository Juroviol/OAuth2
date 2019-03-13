# OAuth2

## Tipos de Concessões

### 1. Implicit

![Implicit](/implicit.png)

Esse fluxo é utilizado em aplicações que não possuem um backend próprio, que seu código fonte pode ser facilmente exposto, e portanto não podem armazenar o client_secret com segurança. Geralmente essas aplicações são SPAs, construídas em JavaScript. Ao contrário do [Autorization Code Grant Flow](#autorization_code_grant_flow), onde após a atorização do Resource Owner é obtido um Autorization Code, nesse caso o Authorization Server retorna imediatamente o Access Token.

### 2. Client Credentials

![Client Credentials Flow](/client_credentials.png)

Neste caso a aplicação Client é altamente confiável, bastando que a mesma seja cadastrada antecipadamente no Autorization Server onde será gerado o client_id e client_secret. Em posse dessas duas informações é possível solicitar um access token.

### 3. Resource Owner Password Credentials

![Resource Owner Credentials Flow](/resource_owner_password_credentials.png)

Neste caso a aplicação Client é altamente confiável, bastando que a mesma seja cadastrada antecipadamente no Autorization Server, onde será gerado o client_id e client_secret. Todavia, o recurso protegido será acessado com as credenciais de um usuário. Em posse dessas quatro informações client_id, client_secret, username, password é possível solicitar um access token.
