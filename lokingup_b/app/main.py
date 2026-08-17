import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
from fastapi import HTTPException
from app.schemas import ProductInquiryRequest
from app.email import send_product_inquiry_email
from fastapi import FastAPI, Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import Base, engine, SessionLocal
from app.schemas import InquiryCreate, InquiryResponse
from app.crud import create_inquiry
from app.whatsapp import send_whatsapp_message

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LookingUp Backend",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {
        "message": "LookingUp Backend Running Successfully"
    }


@app.post("/api/inquiry", response_model=InquiryResponse, status_code=201)
def create_new_inquiry(
    inquiry: InquiryCreate,
    db: Session = Depends(get_db),
):
    db_inquiry = create_inquiry(db, inquiry)

    if db_inquiry is None:
        raise HTTPException(
            status_code=409,
            detail="This mobile number has already submitted an inquiry."
        )

    return db_inquiry


@app.get("/test-whatsapp")
def test_whatsapp():

    success = send_whatsapp_message(
        to_number="918928825254",   # Your WhatsApp number
        customer_name="Hrishi",
        company_name="LookingUp"
    )

    if success:
        return {"message": "WhatsApp sent successfully"}

    return {"message": "WhatsApp failed"}


@app.post("/api/product-inquiry")
def product_inquiry(data: ProductInquiryRequest):

    success = send_product_inquiry_email(
        company_name=data.company_name,
        company_email=data.company_email,
        product_name=data.product_name,
        customer_name=data.customer_name,
        customer_company=data.customer_company,
        customer_email=data.customer_email,
        customer_phone=data.customer_phone,
        message=data.message,
    )

    if not success:
        raise HTTPException(
            status_code=500,
            detail="Failed to send inquiry email."
        )

    return {"message": "Inquiry email sent successfully."}

