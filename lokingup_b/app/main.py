import logging
import os
import requests
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import Base, engine, SessionLocal
from app.schemas import InquiryCreate, InquiryResponse, ProductInquiryRequest
from app.crud import create_inquiry
# from app.whatsapp import send_whatsapp_message  <-- Removed old import
from app.email import send_product_inquiry_email

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

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

# --- WHATSAPP SETUP ---
WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
WHATSAPP_PHONE_ID = os.getenv("WHATSAPP_PHONE_ID", "1322897914231528")

def send_whatsapp_template(customer_phone: str, customer_name: str):
    url = f"https://graph.facebook.com/v19.0/{WHATSAPP_PHONE_ID}/messages"
    
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }

    # Clean the phone number (ensure 91 prefix)
    formatted_phone = customer_phone.strip().replace("+", "").replace(" ", "")
    if len(formatted_phone) == 10:
        formatted_phone = f"91{formatted_phone}"

    payload = {
        "messaging_product": "whatsapp",
        "to": formatted_phone,
        "type": "template",
        "template": {
            "name": "catalogue_website",  # Your exact Meta template name
            "language": {
                "code": "en"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": customer_name  # Fills in the {{name}} variable
                        }
                    ]
                }
            ]
        }
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
    except Exception as e:
        print("WhatsApp Error:", e)
        return {"error": str(e)}

# --- ROUTES ---

@app.get("/")
def home():
    return {
        "message": "LookingUp Backend Running Successfully"
    }

# --> REAL FORM SUBMISSION ROUTE <--
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

    # ---> NEW WHATSAPP TRIGGER <---
    try:
        # Sends message using the exact fields from your frontend form
        send_whatsapp_template(
            customer_phone=inquiry.mobile_no,
            customer_name=inquiry.person_name
        )
    except Exception as e:
        print(f"Failed to send WhatsApp in route: {e}")
    # ------------------------------

    return db_inquiry


# --> UPDATED TEST ROUTE <--
@app.get("/test-whatsapp")
def test_whatsapp():
    # Call our new function with your phone number to test
    response = send_whatsapp_template(
        customer_phone="918928825254",  
        customer_name="Hrishi"          
    )

    if response and "messages" in response:
        return {"message": "WhatsApp template sent successfully!", "meta_response": response}

    return {"message": "WhatsApp failed to send", "meta_response": response}


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