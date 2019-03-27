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

### 1. Authorization Code <a href="authorization_code"></a>

![Authorization Code](/authorization_code.png)

Esse fluxo é o mais seguro e recomendado na utilização do OAuth2. Recomendado para aplicações Client que possuem servidor web. Dessa forma o client_secret não é exposto, pois o mesmo será enviado ao Authorization Server junto do Autorization Code para obter um Access Token a partir do servidor web, onde o código fonte da aplicação não é exposto.

### 2. Implicit

![Implicit](/implicit_grant_flow.png)

Esse fluxo é utilizado em aplicações Client que não possuem um backend próprio, que seu código fonte pode ser facilmente exposto, e portanto não podem armazenar o client_secret com segurança, apesar de ser menos seguro. Geralmente essas aplicações são SPAs, construídas em JavaScript. 

Ao contrário do [Authorization Code Grant Flow](#authorization_code), onde após a autenticação e autorização no Authorization Server pelo Resource Owner, é obtido um Authorization Code único, nesse caso, o Authorization Server retorna imediatamente o Access Token.

### 3. Client Credentials

![Client Credentials Flow](/client_credentials.png)

Neste caso a aplicação Client é altamente confiável, bastando que a mesma seja cadastrada antecipadamente no Autorization Server onde será gerado o client_id e client_secret. Em posse dessas duas informações é possível solicitar um access token.

### 4. Resource Owner Password Credentials

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

o OpenID Connect é uma extensão ao OAuth2 o qual especifica regras que possa fornecer dados do usuário autenticado e autorizado, através do ID TOKEN, o qual o OAuth2 por si só não provê, pois o mesmo só prevê a disponibilização dos tokens ACCESS TOKEN E REFRESH TOKEN.

O OpenID Connect diferencia cliente e provedor com as nomenclaturas:

- OIDC client
- ODIC provider

**OIDC client** é quem delega a autenticação para outro, no caso um OIDC provider.
**OIDC provider** é o que pode autenticar e prover informações do usuário autenticado ao cliente.

Exemplos reais são o Spotify e o Facebook.  

O __Spotify é o OIDC client__, pois o mesmo além de delegar a autenticação e autorização a utilização dos recursos para o Facebook, ele também necessita das informações básicas do usuário autenticado e autorizado.
O __Facebook é o OIDC provider__, pois é quem autentica e solicita ao usuário permissão para acesso de informações e também provê as informações pessoais do usuário autenticado.

### OAuth2 e OpenID Connect

Objetivamente, o OAuth2 estabelece os passos e regras para se emitir um Acess Token, o OpenID Connect para se emitir um ID Token.

**ID Token**: Tecnicamente é um JSON Web Token (JWT) que contém atributos de perfil de um usuário. O ID Token é utilizado pela aplicação Client para obter informações do usuário, como nome, e-mail, e etc, tipicamente utilizado para exibir em tela.

**Access Token**: é uma credencial que pode ser utilizado para acessar recursos protegidos.

### Endpoints

A [especificação](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata) do OAuth2 + OpenID Connect prevê os seguintes endpoints que devem ser disponibilizados pelo OIDC Provider. Abaixo a abordadem dos principais

|  Endpoint | Descrição   |
|---|---|
| Metadata  | |
| Authorize | |
| Token     | |
| JWKS      | |
| User Info | |

## FAQ 

***1. Como Google, Facebook sabem que já foi autenticado uma vez para não mostrar a tela de autenticação?***  
R: Cookies. Sim, os famosos cookies. Após a autenticação os Authorization Servers eles guardam um ou mais Cookies associados ao domínio do Authorization Server com dados de autenticação do usuário, para que o Authorization Server consiga gerar authorization codes ou tokens de acesso dependendo do fluxo OAuth2 que o cliente solicitou.

***2. Mas se eu pegar os Cookies de um outro usuário e colocar no meu navegador, eu vou acessar a conta dele?***  
R. No fluxo **Implicit**, sim, você irá acessar. Porém o protocolo HTTPS criptografa todo o tráfego de troca de informações entre o navegador e o servidor, portanto mesmo que tenha alguém que consiga ver toda a troca de tráfego, os dados estarão criptografados e não será possível visualizar o conteúdo do Cookie. A única forma é o "hacker" obter os Cookies direto do seu browser, mas para isso ele terá que ter acesso ao seu dispositivo, mas aí o cliente já perdeu.

Já no fluxo **Authorization Code**, que é o recomendado a se utilizar, mesmo em posse do Cookie, a única coisa que o "hacker" vai obter é o Authorization Code, o qual ainda não é um token de acesso ou identificação (no caso do OpenID). O "hacker" vai precisar ainda enviar junto do Authorization Code o CLIENT SECRET cadastrado e fornecido quando o cliente se registrou no Authorization Server. Dessa forma o "hacker" não terá como obter os tokens pois não tem acesso ao CLIENT SECRET. Lembrando que o CLIENT SECRET é uma informação super confidencial que sua aplicação tem que guardar com 100% de sigilo. É por isso que o fluxo Authorization Code do OAuth2 especifica que o envio do CLIENT SECRET junto do Authorization Code seja enviado de forma "Server to Server", ou em outras palavras, sua aplicação deve realizar essa troca no back-end da sua aplicação, onde o código fonte não é exposto na internet como aplicações SPA em JavaScript.
