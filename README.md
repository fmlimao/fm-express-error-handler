# fm-express-error-handler

Um manipulador de erros para Express.

Este módulo usa os pacotes [fm-validator](https://www.npmjs.com/package/fm-validator).

## Instalação

```bash
npm i fm-express-error-handler --save
```

## Como usar

```javascript
const express = require('express');
const FmJsonResponse = require('fm-json-response');
const FmValidator = require('fm-validator');
const FmExpressErrorHandler = require('fm-express-error-handler');

const app = express();

app.get('/', (req, res) => {
    let ret = new FmJsonResponse;

    try {
        ret.addFields(['name', 'email', 'password']);

        FmValidator(ret, {
            name: 'A',
            email: 'email@email',
            password: '123',
        }, {
            name: 'required|string|min:3|max:128',
            email: 'required|string|email|max:128',
            password: 'required|string|min:6|max:32',
        });

        if (ret.error) {
            ret.setError(true);
            ret.setCode(400);
            ret.addMessage('Verifique todos os campos.');
            throw ret;
        }

        ret.addMessage('Login válido =)');

        res.status(ret.getCode()).json(ret.generate());
    } catch (err) {
        ret = FmExpressErrorHandler(err, ret);
        res.status(ret.getCode()).json(ret.generate());
    }
});

app.listen(3001, () => {
    console.log(`Servidor rodando na porta 3001`);
});
```
