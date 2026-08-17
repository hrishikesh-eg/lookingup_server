/**
 * EMAILJS CONFIGURATION
 * ---------------------------------------------------------
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an Email Service (e.g. Gmail) -> copy the Service ID
 * 3. Create an Email Template with these variables:
 *      {{company_name}}   - the client company the inquiry is about
 *      {{product_name}}   - the product being inquired about
 *      {{from_name}}      - inquirer's name
 *      {{from_company}}   - inquirer's company name
 *      {{from_email}}     - inquirer's email
 *      {{from_phone}}     - inquirer's phone number
 *      {{message}}        - inquirer's message
 *   Copy the Template ID.
 * 4. Account > General > copy your Public Key.
 * 5. Paste all three values below.
 */

export const EMAILJS_CONFIG = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
};
