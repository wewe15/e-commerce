const dotenv = require('dotenv')

dotenv.config()
const stripe = require('stripe')(process.env.SECRET_KEY);

const createToken = async (card_data) => {
    let token = {};
    try {
        token = await stripe.tokens.create({
            card: {
                number: card_data.cardNumber,
                exp_month: card_data.month,
                exp_year: card_data.year,
                cvc: card_data.cvv
            }
        });
    } catch (error) {
        switch (error.type) {
            case 'StripeCardError':
                token.error = error.message;
                break;
            default:
                token.error = error.message;
                break;
        }
    }
    return token;
}

const createCharge = async (token_id, amount, name) => {
    let charge = {};
    try {
        charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            source: token_id,
            description: name
        });
    } catch (error) {
        charge.error = error.message;
    }
    return charge;
}

module.exports = {
    createToken,
    createCharge
}