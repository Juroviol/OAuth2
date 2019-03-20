const Provider = require('oidc-provider')
const express = require('express')
const keystore = {
    keys:
        [{
            kty: "RSA",
            kid: "CQNq5oDM0BNTICD2XlQM8qyMpyTBjbXhyQi_bXhxWvI",
            use: "sig",
            alg: 'RS256',
            e: 'AQAB',
            n:
                '2ZuRnADCy18xiZdyUcac8WBdf5HiDuAiOE96Dlc4A9I6_nY93moMcA2Jf1HtqOTVdc6scuOj4PGF5vEiV_thIVM8Mmu0d0nL5PKah7nVjDWrCGlieO4ZtPk9GrA2NxPr7bnXIExR-XtEyE6KMeAetCzzp5vqQhFgeC1TxUKtfORM5o04WPxVmr4z7EbRIQWLXHrjPjIAlHtZz2-K9HQBDfp5EDBaazn8_7YjQQLxxFxu8CCNrnOm00oF4qUouyi3nHNCc-oXs-Jr2bLUjKPktJ7tbhyAN06q-83zxGUScbE8i7rimD9fQoGl8-fpjIVSzVEpjIYaIy_9XG-sUIVqRw',
            d:
                'YodoFMTbbo45td0W7CQL59cEPsDlJGsj029ZCqk_Oau0_oa3WL-Xxhy7ByUngPOsG11rA9JC35U8VecU79Vok1hGx2WxHtoRMicPBSmFoaijOnnNFohop2K64hyrT6D7kHY3C-7Cpz3DVRcKx658-IPqBxg3p5aKoZ-UcJrSRtual76rTOH6wCPbQhSBrUguU_JvIhz8OWboN-NHkQHH250qXQ00ZbaJH23bep8llUySLSGdz02sPwjzzRK7BN7B5M97LJB_izm1z_nZBy6I9a1bbpqFEfNoAC7d5bG6R5o50SsalUMCTxtZWCpeGLnCEnx9B3pauK0xnzrhzFmK8Q',
            p:
                '8HA1yrNi5TcN5SvSSNoeFA1xYMGCmycBmaZFtdKhpqhiQUALUkkpOfM3LIJYv9qqiVNs9BqY4Jjr-yjf1-2DbbV_oW-UX7jn90THfuHHw5BrQxxVnQjCdtl67gVvb79sd-tQkmeu4tCIB0MpaGRL7KLN76UtwEZVl3w0Rd_DICM',
            q:
                '57EUv8w81s8gCJRj3e2vInOgbCw18PVtuk4FyxZ08ulfgPgF0uD5h9U0hYTSzzuDR9whMLLmN7ytfXczGmMaZ0FVmSYNY2ciROBtKd4S8diOjPhvbcw2S6wbyorE10r2rkU8gW4PzutKwycTYB-L76UmfT8506I5ZZQ0slkgXY0',
            dp:
                'R5aRXZYFtwuqVnayuMBAvmW2QUG8mmeFwXLRRK6_NLjj8FuaQ1jHLprs7ZKtzAnWRucRBKk6pXzCnlhwNYFhZXPp2W44dju-zU-sOmoNKXxBg4zXLNdj1zEvudjichpDuHzW05CNcLj4F3l2xb8_H-jlehnrQlluuJjhk4BpP5M',
            dq:
                'tJ4VgNek7giV_lo_6DhseT0OaIWmn2uU2NIOLh4ZmWxY6V9wms6LeFq7EQNUm_zXAOQYc7BjTDwoO1D7Y6yyXqBOLI-_jChQTMVwFF1tA2BA8KCTrVKvWRqYp7K6dOOZno2W94dnh3Vh2PTTY_Hz0yQ59xWc7ODgQdHhqs9ULdk',
            qi:
                'Ji5337u86r4RN3U_4AYkwZxdf8ACYIe72_dUtiOGBp02o7bx8yxbd0VLpArPHdoLjyGqntomivbU4-kPnQ7B6B-GHyLO5n4oSzSZXqPbwwhWO2T2FGTsMscn6LdLT2GtBwsPVToDr55kmcQnGa-B3UOm5qmnJTig0peFndfB9Pc'
        }]
}

const clients = [{
    client_id: 'swissre',
    client_secret: 'abcd',
    grant_types: ['authorization_code'],
    response_type: ['id_token'],
    redirect_uris: ['http://localhost:3000/openid-signin']
}]

const app = express()
const oidc = new Provider('http://localhost:4000', {
    async findById(ctx, id) {
        return {
            accountId: id,
            async claims() {
                return { sub: id }
            }
        }
    }
})

oidc.initialize({clients,keystore}).then(() => {
    app.use('/', oidc.callback)
    app.listen(4000)
})
