const { createKeyStore } = require('oidc-provider');
const keystore = createKeyStore();
keystore.generate('RSA', 2048, {
    alg: 'RS256',
    use: 'sig',
}).then(function () {
    console.log('this is the full private JWKS:\n', keystore.toJSON(true));
});