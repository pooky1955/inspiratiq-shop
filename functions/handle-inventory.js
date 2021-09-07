const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
exports.handler = async event => {
    const data = JSON.parse(event.body)
    const sig = event.headers["stripe-signature"]
    let event;
    try {
        event = stripe.webhooks.constructEvent(event.body,sig,endpointSecret)
    } catch (err) {
        return {
            statusCode : 400,
            body : `Webhook Error : ${err.message}`
        }
    }
    switch (data.type) {
        case 'payment_intent.suceeded':
            const paymentIntent = data.data.object
            console.log("Payment Intent was Successful") 
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }
    /*
    { [priceId] : quantityBought}
    ....
    and more
    */
    return {
        statusCode: 200,
    }
}
