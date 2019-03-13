# OAuth2

O OAuth2 especifica as regras, passos e formas de interação que diferentes atores em um processo de autorização devem realizar para construir um fluxo de autorização mais seguro possível.

Graças a essa especificação é possível ser autorizado em nome próprio ou em nome de outro proprietário a acessar recursos protegidos. Muito útil em aplicações distribuídas que compartilham uma mesma API/recurso, ou no caso da disponibilização de uma API para terceiros, garantindo todo o controle do quanto de informações será acessado e até quando.

O OAuth2 em si não é uma ferramenta que você baixa, instala e configura em um servidor. São apenas regras que provedores desse protocolo devem implementar. Portanto é preciso implementar por si só, ou utilizar provedores já construídos e disponíveis no mercado.

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

O **Access Token** é o que é preciso para ter acessos a recursos protegidos.  
O **Refresh Token** é o que é preciso para obter um novo Access Token.

É importante observar que o mesmo não oferece uma regra para obter dados de usuário nativamente. O protocolo **OpenID Connect** especifica como obter os dados do usuário autenticado.

## OpenID Connect

o OpenID Connect é uma extensão ao OAuth2 o qual especifica regras que possa fornecer dados do usuário autenticado e autorizado, através do ID TOKEN, o qual o OAuth2 por si só não provê, pois o mesmo só prevê a disponibilização dos tokens  somente o ACCESS E REFRESH TOKEN.

Existem dois tipos de atores:

- OIDC client
- ODIC provider

**OIDC client** é quem delega a autenticação para outro, no caso um OIDC provider.
**OIDC provider** é o que pode autenticar e prover informações do usuário autenticado ao cliente.

Exemplos reais são o Spotify e o Facebook.  

O Spotify é o OIDC client, pois o mesmo além de delegar a autenticação e autorização a utilização dos recursos para o Facebook, ele também necessita das informações básicas do usuário autenticado e autorizado.
O Facebook é o OIDC provider, pois é quem autentica e solicita ao usuário permissão para acesso de informações e também provê as informações pessoais do usuário autenticado.
