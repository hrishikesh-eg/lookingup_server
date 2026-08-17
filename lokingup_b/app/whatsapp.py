import logging
import requests

from app.config import (
    WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_API_VERSION,
)

logger = logging.getLogger(__name__)


def send_whatsapp_message(
    to_number: str,
    customer_name: str,
    company_name: str,
):
    """
    Send a WhatsApp message using Meta Cloud API.
    Returns:
        True  -> Message sent successfully
        False -> Failed to send
    """

    url = (
        f"https://graph.facebook.com/"
        f"{WHATSAPP_API_VERSION}/"
        f"{WHATSAPP_PHONE_NUMBER_ID}/messages"
    )

    headers = {
        "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }

    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "template",
        "template": {
            "name": "hello_world",  # Meta's built-in pre-approved template - no approval needed, good for testing
            "language": {"code": "en_US"},
        },
    }

    try:
        response = requests.post(
            url=url,
            headers=headers,
            json=payload,
            timeout=20,
        )

        # Log Meta's raw response every time, not just on failure -
        # a 200 status can still contain an error object in the body.
        logger.info(
            "WhatsApp API raw response (%s): %s",
            response.status_code,
            response.text,
        )

        if response.status_code == 200:
            logger.info("WhatsApp message sent successfully to %s", to_number)
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