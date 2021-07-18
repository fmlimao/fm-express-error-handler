const FmJsonResponse = require('fm-json-response');

const FmExpressErrorHandler = function (err, ret) {
    if (err instanceof FmJsonResponse) {
        return err;
    }

    if (process.env && process.env.APP_DEBUG && process.env.APP_DEBUG == 1) console.log(`[API ERRO INTERNO]: ${err}`);

    if (ret.getCode() === 200) {
        ret = new FmJsonResponse();

        ret.setError(true);
        ret.setCode(500);
        ret.addMessage('Erro interno. Por favor, tente novamente.');

        if (process.env && process.env.APP_DEBUG && process.env.APP_DEBUG == 1) ret.addMessage(err.message);
    } else {
        ret.setError(true);
        if (err.message) {
            ret.addMessage(err.message);
        }
    }

    return ret;
};

module.exports = FmExpressErrorHandler;
