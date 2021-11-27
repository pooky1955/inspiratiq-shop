/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//const validateCartItems = require("use-shopping-cart/src/serverUtil")
  //.validateCartItems;

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
//const inventory = require("./data/products.json");

const codes = ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"]
exports.handler = async (event) => {
  try {
    const productJSON = JSON.parse(event.body);

    //const line_items = validateCartItems(inventory, productJSON);
    const rawLineItems = productJSON
    const URL = process.env.URL
    const paymentDescription = rawLineItems.map(product => `${product.quantity}x ${product.metadata.displayName}`).join(", ")
    console.log(`Payment description: ${paymentDescription}`)
    const line_items = rawLineItems.map(item => {
      const {metadata,...rest} = item
      return rest
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode : "payment",
      billing_address_collection: "auto",
      shipping_options : [
        {
          shipping_rate : "shr_1ImSucKyXfa4PBtt9iWTN7Be",
        },
        {
          shipping_rate : "shr_1K0ESJKyXfa4PBttCcBY7wue"
        }
      ],
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: codes
      },
      success_url: `${URL}/Success`,
      cancel_url: URL,
      line_items: line_items,
      payment_intent_data : {
        description : paymentDescription
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode : 500,
      body : error.toString()
    }
  }
};
