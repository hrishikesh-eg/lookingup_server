from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String(200), nullable=False)
    person_name = Column(String(150), nullable=False)

    email = Column(String(150), nullable=False)

    mobile_no = Column(String(20), nullable=False)
    alternate_mobile_no = Column(String(20), nullable=True)

    company_address = Column(Text, nullable=False)

    product_inquiry = Column(Text, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )