from sqlalchemy.orm import Session

from app.models import Inquiry
from app.schemas import InquiryCreate
from app.whatsapp import send_whatsapp_message


def create_inquiry(db: Session, inquiry: InquiryCreate):

    # Check duplicate mobile number
    existing_inquiry = (
        db.query(Inquiry)
        .filter(Inquiry.mobile_no == inquiry.mobile_no)
        .first()
    )

    if existing_inquiry:
        return None

    # Create new inquiry
    db_inquiry = Inquiry(
        company_name=inquiry.company_name,
        person_name=inquiry.person_name,
        email=inquiry.email,
        mobile_no=inquiry.mobile_no,
        alternate_mobile_no=inquiry.alternate_mobile_no,
        company_address=inquiry.company_address,
        product_inquiry=inquiry.product_inquiry,
    )

    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)

    # Send WhatsApp
    send_whatsapp_message(
        to_number=inquiry.mobile_no,
        customer_name=inquiry.person_name,
        company_name=inquiry.company_name,
    )

    return db_inquiry

