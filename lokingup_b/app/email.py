import logging
import smtplib
from email.message import EmailMessage

from app import config

logger = logging.getLogger(__name__)


def send_product_inquiry_email(
    company_name: str,
    company_email: str,
    product_name: str,
    customer_name: str,
    customer_company: str,
    customer_email: str,
    customer_phone: str,
    message: str,
) -> bool:
    """
    Sends a product inquiry email to:
    1. Client company
    2. ErfolgGanar (copy)
    """

    try:
        email = EmailMessage()

        email["Subject"] = f"New Product Inquiry - {product_name}"
        email["From"] = config.SMTP_USERNAME

        # Send to client + your company
        email["To"] = company_email
        email["Cc"] = config.ADMIN_EMAIL

        email.set_content(
            f"""
New Product Inquiry

------------------------------------

Client Company:
{company_name}

Product:
{product_name}

------------------------------------

Customer Details

Name:
{customer_name}

Company:
{customer_company}

Email:
{customer_email}

Phone:
{customer_phone}

------------------------------------

Message

{message}

------------------------------------

This email was generated automatically from the website.
"""
        )

        with smtplib.SMTP(config.SMTP_HOST, config.SMTP_PORT) as smtp:
            smtp.starttls()

            smtp.login(
                config.SMTP_USERNAME,
                config.SMTP_PASSWORD,
            )

            smtp.send_message(email)

        logger.info(
            "Inquiry email sent successfully to %s",
            company_email,
        )

        return True

    except Exception:
        logger.exception("Failed to send inquiry email")
        return False