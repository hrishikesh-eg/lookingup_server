from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime


class InquiryCreate(BaseModel):
    company_name: str
    person_name: str
    email: EmailStr
    mobile_no: str
    alternate_mobile_no: Optional[str] = None
    company_address: str
    product_inquiry: str


class InquiryResponse(BaseModel):
    id: int
    company_name: str
    person_name: str
    email: EmailStr
    mobile_no: str
    alternate_mobile_no: Optional[str] = None
    company_address: str
    product_inquiry: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)



class ProductInquiryRequest(BaseModel):
    company_name: str
    company_email: EmailStr
    product_name: str

    customer_name: str
    customer_company: str
    customer_email: EmailStr
    customer_phone: str

    message: str