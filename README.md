# OAuth2

## Papéis

**Resource Owner**: Quem é dono do recurso, geralmente é uma pessoa que é proprietária de informações que estão armazenadas no Resource Server. Exemplo: Nós usuários do facebook, que somos donos das nossas informações pessoais.

**Client**: A aplicação cliente que quer ter acesso, em nome de um Resource Owner, às informações que estão armazenadas no Resource Server. Exemplo o Spotify que quer ter acesso a nossas informações para realizar o cadastro.

**Authorization Server**: A aplicação responsável por prover uma página de autenticação e autorização e realizar a autenticação e autorização em si. Exemplo o servidor do Facebook que realiza a autenticação com uma página própria e a autorização mediante o “De Acordo” do Resource Owner.

**Resource Server**: O servidor protegido, onde contém as informações. Exemplo o servidor do Facebook onde contém as nossas informações pessoais.

## Tipos de Concessões

### 1. Implicit

![Implicit](/implicit.png)

Esse fluxo é utilizado em aplicações Client que não possuem um backend próprio, que seu código fonte pode ser facilmente exposto, e portanto não podem armazenar o client_secret com segurança, apesar de ser menos seguro. Geralmente essas aplicações são SPAs, construídas em JavaScript. 

Ao contrário do [Authorization Code Grant Flow](#authorization_code_grant_flow), onde após a autenticação e autorização no Authorization Server pelo Resource Owner, é obtido um Authorization Code único, nesse caso, o Authorization Server retorna imediatamente o Access Token.

### 2. Client Credentials

![Client Credentials Flow](/client_credentials.png)

Neste caso a aplicação Client é altamente confiável, bastando que a mesma seja cadastrada antecipadamente no Autorization Server onde será gerado o client_id e client_secret. Em posse dessas duas informações é possível solicitar um access token.

### 3. Resource Owner Password Credentials

![Resource Owner Credentials Flow](/resource_owner_password_credentials.png)

Neste caso a aplicação Client é altamente confiável, bastando que a mesma seja cadastrada antecipadamente no Autorization Server, onde será gerado o client_id e client_secret. Todavia, o recurso protegido será acessado com as credenciais de um usuário. Em posse dessas quatro informações client_id, client_secret, username, password é possível solicitar um access token.


## Tipos de Tokens

O OAuth2 somente provê dois tipos de tokens:

- Access Token
- Refresh Token

O **Access Token** é o que é preciso para ter acessos a recursos protegidos
O **Refresh Token** é o que é preciso para obter um novo Access Token.

É importante observar que o mesmo não oferece uma regra para obter dados de usuário nativamente.
