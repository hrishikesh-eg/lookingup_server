import logging
import requests

# Hardcoded for 100% safety before the exhibition!
WHATSAPP_ACCESS_TOKEN = "EAAOqepRsHp0BSQSFyaLJS2i8BbDGmZA8MF4KvB0xCkeaqGAN91J11D7aTy1ZCiYXGMuJ4LDu4O6vZAEhEzBMhjyvZAkZCgcasQKtsMy0b9QA2QMW70ortZBNP4F7ZArIKI5lWzpqba37k0ms6eJZCXgkkWTMvLeQzvO2L6phbMz5c10qZChxwY3NN6CGwBMccgRK1MgZDZD"
WHATSAPP_PHONE_NUMBER_ID = "1322897914231528"
WHATSAPP_API_VERSION = "v19.0"

logger = logging.getLogger(__name__)

def send_whatsapp_message(to_number: str, customer_name: str):
    """
    Send a WhatsApp template message using Meta Cloud API.
    """
    
    # 1. Format the phone number (adds 91 if missing)
    formatted_phone = to_number.strip().replace("+", "").replace(" ", "")
    if len(formatted_phone) == 10:
        formatted_phone = f"91{formatted_phone}"

    url = f"https://graph.facebook.com/{WHATSAPP_API_VERSION}/{WHATSAPP_PHONE_NUMBER_ID}/messages"

    headers = {
        "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }

    # 2. Use your real catalogue template and insert the customer's name
    payload = {
        "messaging_product": "whatsapp",
        "to": formatted_phone,
        "type": "template",
        "template": {
            "name": "catalogue_website",  
            "language": {"code": "en"},
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": customer_name
                        }
                    ]
                }
            ]
        },
    }

    try:
        response = requests.post(
            url=url,
            headers=headers,
            json=payload,
            timeout=20,
        )

        logger.info(
            "WhatsApp API raw response (%s): %s",
            response.status_code,
            response.text,
        )

        if response.status_code == 200:
            logger.info("WhatsApp message sent successfully to %s", formatted_phone)
            return True

        logger.error(
            "WhatsApp API Error (%s): %s",
            response.status_code,
            response.text,
        )
        return False

    except requests.exceptions.Timeout:
        logger.error("WhatsApp request timed out.")
        return False

    except requests.exceptions.RequestException as e:
        logger.exception("WhatsApp Request Exception: %s", e)
        return False

    except Exception as e:
        logger.exception("Unexpected WhatsApp Error: %s", e)
        return False