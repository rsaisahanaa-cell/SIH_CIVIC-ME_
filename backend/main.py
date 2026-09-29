from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI(
    title="INDUSTRIA API",
    description="SIH26130 Smart Industrial Approval & Compliance Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# DATA MODELS
# =====================================================

class IndustryProfile(BaseModel):

    industry_type: str
    location: str
    investment_category: str
    employment_count: int = 0


class ChatRequest(BaseModel):

    message: str


class ApprovalRequest(BaseModel):

    industry_type: str
    location: str


# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/")
def home():

    return {
        "application": "INDUSTRIA",
        "problem_statement": "SIH26130",
        "status": "running",
        "timestamp": datetime.now()
    }


# =====================================================
# SMART APPROVAL MAPPER
# =====================================================

@app.post("/api/approvals/map")
def generate_approval_map(profile: ApprovalRequest):

    approvals = [

        {
            "id": 1,
            "name": "Business Registration",
            "department": "Business / Industry Department",
            "status": "completed",
            "dependency": []
        },

        {
            "id": 2,
            "name": "Land / Building Approval",
            "department": "Local Authority",
            "status": "completed",
            "dependency": ["Business Registration"]
        },

        {
            "id": 3,
            "name": "Environmental Consent",
            "department": "Pollution Control Authority",
            "status": "in_progress",
            "dependency": [
                "Project Information",
                "Land / Building Approval"
            ]
        },

        {
            "id": 4,
            "name": "Factory / Labour Compliance",
            "department": "Labour Department",
            "status": "pending",
            "dependency": [
                "Environmental Consent"
            ]
        },

        {
            "id": 5,
            "name": "Fire Safety Approval",
            "department": "Fire Department",
            "status": "pending",
            "dependency": [
                "Building Information"
            ]
        }

    ]

    return {
        "profile": profile,
        "approval_count": len(approvals),
        "approvals": approvals
    }


# =====================================================
# DOCUMENT VALIDATOR
# =====================================================

@app.post("/api/documents/validate")
async def validate_document(
    file: UploadFile = File(...)
):

    filename = file.filename

    contents = await file.read()

    file_size = len(contents)

    return {

        "filename": filename,

        "file_size": file_size,

        "format_valid": True,

        "ocr_status": "prototype_ready",

        "metadata": {
            "uploaded_at": datetime.now().isoformat(),
            "content_type": file.content_type
        },

        "validation": {

            "document_readable": True,

            "required_fields_detected": True,

            "expiry_check": "pending",

            "cross_document_match": "pending"

        }

    }


# =====================================================
# COMPLIANCE ENGINE
# =====================================================

@app.get("/api/compliance")
def compliance_dashboard():

    return {

        "total_tasks": 7,

        "completed": 2,

        "in_progress": 3,

        "pending": 2,

        "sla_risks": 1,

        "tasks": [

            {
                "name": "Application Submission",
                "status": "completed"
            },

            {
                "name": "Document Verification",
                "status": "completed"
            },

            {
                "name": "Department Review",
                "status": "in_progress"
            },

            {
                "name": "Inspection",
                "status": "pending"
            }

        ]

    }


# =====================================================
# SLA ENGINE
# =====================================================

@app.get("/api/sla")
def sla_monitor():

    return {

        "application_id": "IND-2026-001",

        "current_stage": "Department Review",

        "sla_days": 7,

        "elapsed_days": 6,

        "risk": "HIGH",

        "action": "Monitor and escalate if no response"

    }


# =====================================================
# INCENTIVE DISCOVERY
# =====================================================

@app.post("/api/incentives/discover")
def discover_incentives(profile: IndustryProfile):

    schemes = [

        {
            "name": "Industrial Investment Support",
            "category": "Manufacturing",
            "match": 89,
            "reason": "Industry and location profile match"
        },

        {
            "name": "Employment-linked Incentive",
            "category": "Employment",
            "match": 76,
            "reason": "Employment generation criteria"
        },

        {
            "name": "MSME Support Programs",
            "category": "MSME",
            "match": 72,
            "reason": "Enterprise category match"
        }

    ]

    return {

        "profile": profile,

        "potential_matches": schemes

    }


# =====================================================
# COMPLIANCE COPILOT
# =====================================================

@app.post("/api/copilot")
def copilot(request: ChatRequest):

    message = request.message.lower()

    if "approval" in message:

        answer = (
            "The current application has 11 mapped approval "
            "requirements. Environmental Consent is the active "
            "dependency."
        )

    elif "document" in message:

        answer = (
            "The document validation stage identifies missing "
            "or inconsistent documents before submission."
        )

    elif "sla" in message or "delay" in message:

        answer = (
            "One SLA risk is currently detected at the "
            "department review stage."
        )

    elif "incentive" in message or "scheme" in message:

        answer = (
            "Three potential government-support categories "
            "have been identified for the sample profile."
        )

    else:

        answer = (
            "I can assist with approvals, documents, compliance, "
            "SLA monitoring and incentives."
        )

    return {

        "query": request.message,

        "answer": answer,

        "source": "INDUSTRIA Rules & Knowledge Engine",

        "explainable": True

    }
