/* ================= MODAL SYSTEM ================= */

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

function openModal(content) {

    modalContent.innerHTML = content;
    modal.style.display = "grid";

}

function closeModal() {

    modal.style.display = "none";

}

window.onclick = function(event) {

    if (event.target === modal) {
        closeModal();
    }

};


/* ================= PROFILE ================= */

function openProfile() {

    openModal(`

        <span class="eyebrow">INDUSTRIAL PROFILE</span>

        <h2>Applicant Profile</h2>

        <p style="color:#667085;margin-top:10px;">
            Tell INDUSTRIA about your proposed project.
            The rules engine uses this profile to generate
            the approval dependency map.
        </p>

        <div style="margin-top:25px;">

            <label>Industry Type</label>

            <select id="industryType"
                style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;">

                <option>Manufacturing</option>
                <option>Food Processing</option>
                <option>Textile</option>
                <option>Pharmaceutical</option>
                <option>IT / ITES</option>

            </select>


            <label>Project Location</label>

            <input
                id="projectLocation"
                value="Maharashtra"
                style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;"
            >


            <label>Investment Category</label>

            <select
                style="width:100%;padding:12px;margin:8px 0 20px;border:1px solid #ddd;border-radius:8px;">

                <option>Below ₹1 Crore</option>
                <option>₹1 Crore – ₹10 Crore</option>
                <option>₹10 Crore – ₹50 Crore</option>
                <option>Above ₹50 Crore</option>

            </select>

            <button
                class="primary-btn"
                onclick="createProfile()">

                Build Approval Map →

            </button>

        </div>

    `);

}


function createProfile() {

    closeModal();

    generateApprovals();

    document.getElementById("approvals")
        .scrollIntoView({behavior:"smooth"});

}


/* ================= APPLICATION ================= */

function startApplication() {

    openProfile();

}


function showDemo() {

    document.getElementById("dashboard")
        .scrollIntoView({behavior:"smooth"});

}


/* ================= APPROVAL MAPPER ================= */

function openApprovalMapper() {

    document.getElementById("approvals")
        .scrollIntoView({behavior:"smooth"});

}


function generateApprovals() {

    openModal(`

        <span class="eyebrow">RULES ENGINE</span>

        <h2>Approval Map Generated</h2>

        <p style="color:#667085;margin:10px 0 25px;">
            Based on the sample manufacturing profile in
            Maharashtra, the engine identified the following
            approval categories.
        </p>

        <div class="check success-check">
            <span>✓</span>
            <div>
                <strong>Business Registration</strong>
                <small>Dependency: Base profile</small>
            </div>
        </div>

        <div class="check success-check">
            <span>✓</span>
            <div>
                <strong>Building / Land Approval</strong>
                <small>Dependency: Location details</small>
            </div>
        </div>

        <div class="check warning-check">
            <span>!</span>
            <div>
                <strong>Environmental Consent</strong>
                <small>Dependency: Project & pollution information</small>
            </div>
        </div>

        <div class="check warning-check">
            <span>!</span>
            <div>
                <strong>Factory / Labour Compliance</strong>
                <small>Dependency: Operational readiness</small>
            </div>
        </div>

        <button
            class="primary-btn"
            style="margin-top:20px;"
            onclick="closeModal()">

            Continue →

        </button>

    `);

}


/* ================= DOCUMENT VALIDATOR ================= */

function openDocumentValidator() {

    document.getElementById("documents")
        .scrollIntoView({behavior:"smooth"});

}


function validateFiles() {

    const input = document.getElementById("documentInput");

    if (input.files.length === 0) return;

    const readiness = document.getElementById("readiness");

    readiness.innerText = "86%";

    openModal(`

        <span class="eyebrow">DOCUMENT SCAN</span>

        <h2>${input.files.length} Document(s) Received</h2>

        <p style="color:#667085;margin-top:10px;">
            Prototype OCR/validation pipeline detected the
            uploaded documents successfully.
        </p>

        <div class="check success-check" style="margin-top:20px;">
            <span>✓</span>
            <div>
                <strong>File format</strong>
                <small>Supported document type</small>
            </div>
        </div>

        <div class="check success-check">
            <span>✓</span>
            <div>
                <strong>Document metadata</strong>
                <small>Captured for application record</small>
            </div>
        </div>

        <div class="check warning-check">
            <span>!</span>
            <div>
                <strong>Deep OCR validation</strong>
                <small>Connect FastAPI OCR service for production</small>
            </div>
        </div>

        <button
            class="primary-btn"
            style="margin-top:20px;"
            onclick="closeModal()">

            Continue Validation

        </button>

    `);

}


function runValidation() {

    document.getElementById("readiness")
        .innerText = "91%";

    alert(
        "Validation complete. 16 documents verified. 1 document requires attention."
    );

}


/* ================= COPILOT ================= */

function openCopilot() {

    document.getElementById("compliance")
        .scrollIntoView({behavior:"smooth"});

}


function handleChat(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

}


function sendMessage() {

    const input = document.getElementById("chatInput");

    const message = input.value.trim();

    if (!message) return;

    const chat = document.getElementById("chatArea");

    chat.innerHTML += `

        <div class="user-message">
            ${escapeHTML(message)}
        </div>

    `;

    const response = getAIResponse(message);

    setTimeout(() => {

        chat.innerHTML += `

            <div class="bot-message">
                ${response}
            </div>

        `;

        chat.scrollTop = chat.scrollHeight;

    }, 500);

    input.value = "";

}


function getAIResponse(message) {

    const text = message.toLowerCase();


    if (
        text.includes("approval") ||
        text.includes("permission")
    ) {

        return `
            Your approval map currently contains 11 mapped
            requirements. The active dependency is Environmental
            Consent, after which the factory/labour compliance
            workflow can proceed.
        `;

    }


    if (
        text.includes("document") ||
        text.includes("certificate")
    ) {

        return `
            The document validator currently identifies one
            missing Fire Safety Certificate in the sample
            application. Upload the required document before
            submission.
        `;

    }


    if (
        text.includes("sla") ||
        text.includes("delay")
    ) {

        return `
            One SLA risk is currently flagged. The department
            review stage should be monitored. In a production
            implementation, the SLA engine can automatically
            trigger escalation notifications.
        `;

    }


    if (
        text.includes("incentive") ||
        text.includes("scheme")
    ) {

        return `
            The incentive engine has identified three potential
            support categories. Eligibility should be verified
            against the current official scheme rules before
            application.
        `;

    }


    return `
        I can help with approval mapping, documents, compliance,
        SLA monitoring and incentive discovery. Try asking:
        "Which approvals are pending?"
    `;

}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.innerText = text;

    return div.innerHTML;

}


/* ================= INCENTIVES ================= */

function viewScheme(name) {

    openModal(`

        <span class="eyebrow">INCENTIVE DISCOVERY</span>

        <h2>${name}</h2>

        <p style="color:#667085;margin:12px 0 25px;">
            This prototype has identified this program as a
            potential match based on the sample industrial profile.
        </p>

        <div class="check success-check">
            <span>✓</span>
            <div>
                <strong>Profile Match</strong>
                <small>Industry category matches</small>
            </div>
        </div>

        <div class="check warning-check">
            <span>!</span>
            <div>
                <strong>Eligibility Verification</strong>
                <small>
                    Final eligibility must be checked against
                    the current official scheme notification.
                </small>
            </div>
        </div>

        <button
            class="primary-btn"
            style="margin-top:20px;"
            onclick="closeModal()">

            Back to Dashboard

        </button>

    `);

}
