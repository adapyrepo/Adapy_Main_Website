# MHMDA consumer health data request SOP

**Owner:** The person assigned to monitor `support@adapy.com` is the Privacy Request Owner (PRO). The PRO owns the request until it is closed. The Sales Lead and Partnerships Lead must assist with lead and dealer verification; they do not close requests on their own.

**Scope:** This procedure applies to a Washington resident asking to access consumer health data, receive a list of recipients, withdraw consent, or delete consumer health data. It covers marketing-site leads that may contain `situation`, `adaptive_equipment`, or a Washington consent timestamp. It does not replace the incident-response or legal-hold process.

## Systems and records

| Record | Where it lives | Access |
| --- | --- | --- |
| Privacy-request ticket | The website's `privacy_requests` database table | PRO and authorized engineering support only |
| User and dealer lead records | Adapy-controlled external Supabase lead store used by the website lead proxy | PRO, Sales Lead, and authorized engineering support |
| Dealer handoff record | The matching lead record and the Sales/Partnerships handoff record | PRO, Sales Lead, Partnerships Lead |
| Request evidence | Restricted compliance case folder | PRO and legal counsel as needed |

Do not copy free-text health or mobility details into the ticket, email subject lines, application logs, or the compliance case folder. Use the ticket reference and the minimum contact details needed to locate the lead.

## Intake and deadlines

1. The website form creates a `privacy_requests` ticket with an opaque `MHMDA-…` reference and a 30-calendar-day due date. Email requests must be entered into the same table the day they arrive.
2. The PRO checks new tickets and the support mailbox every business day. Send an acknowledgement within two business days.
3. Use the authenticated admin privacy-request workflow to record the acknowledgement and confirm the requester's identity before disclosing, changing, or deleting data. Prefer a confirmation reply from the email address on the matching lead. If that is not enough, ask only for the minimum additional information needed to match the lead; do not ask for health details.
4. Set the ticket status to `identity_verified` once complete. If identity cannot be verified, document the reason in the restricted case folder and send a response explaining what is needed.
5. After verification, complete the applicable manual lead-store, follow-up, and dealer steps below. Then use the authenticated workflow's manual-fulfillment action to attest that they are complete. The workflow records a tamper-evident event and keeps the request open until the final response is confirmed.
6. Complete the request and send the final response within 30 calendar days of receipt. Escalate any request that cannot be completed by day 20 to the Privacy Lead and legal counsel.

## Finding the data and recipients

1. Search the external lead store by the verified email address, then the verified name and phone number if necessary. Check the `qualify-form` and `dealer` lead forms first; review `customquote` and `fleet` if the requester indicates they used those forms.
2. Capture the lead ID, form type, submission date, whether `situation`, `adaptive_equipment`, or `mhmda_consent_at` is present, and the dealer/partner handoff destination. Store this only in the restricted case folder.
3. For an access request, provide a secure response containing the matching consumer health data and the purposes for which it is processed.
4. For a recipient-list request, list Adapy's internal sales/partnerships team, the matched authorized dealer (if any), and applicable contracted form-processing or email service providers that received that lead's data. Do not guess: use the actual lead and handoff record.

## Withdrawal of consent

1. Locate every matching lead record and mark the Washington consumer-health-data consent as withdrawn, including the withdrawal timestamp and ticket reference.
2. Stop any pending sales or partnership follow-up that relies on the consumer health data. The Sales Lead confirms this in the case folder.
3. Notify any dealer that received the lead that consent is withdrawn and that it must stop the affected processing. Request a written acknowledgement and record it against the ticket.
4. Send the requester confirmation after the internal and dealer acknowledgements are received. Withdrawal does not undo processing completed before the request was received.

## Deletion

1. Confirm no legal hold, fraud investigation, or other documented retention obligation applies. Escalate exceptions to legal counsel.
2. Using authorized administrative access to the external lead store, delete or irreversibly de-identify the matching consumer health data. Do not use the public anonymous intake key or a website form API key. Do not delete the minimal compliance record needed to prove the request was handled; it must not retain free-text health or mobility details.
3. Identify every dealer partner that received the lead. Send each dealer a deletion instruction using the minimum necessary identifiers and ticket reference, request written acknowledgement, and store that acknowledgement in the restricted case folder.
4. Verify end-to-end deletion by searching the lead store again, checking that affected follow-up is stopped, and confirming every applicable dealer acknowledgement. Record only the dealer count and confirmation state in the authenticated workflow; do not enter health details.
5. Confirm that the final response was delivered through the authenticated workflow. Only then may the PRO update the ticket to `completed` and send the requester a confirmation stating what was deleted and any lawful retention exception.

## Manual fulfillment evidence

The website does not delete or change lead-store data automatically. The PRO or authorized engineering support performs the action using the lead store's normal restricted administrative access.

Before selecting **Confirm manual fulfillment**, the operator must:

1. Confirm the matching lead-store action and any required follow-up suppression are complete.
2. Count the dealers that received the lead.
3. For deletion and withdrawal requests, obtain written acknowledgement from every applicable dealer.
4. Store supporting screenshots or acknowledgements in the restricted compliance case folder under the opaque ticket reference.

The operator records only completion, dealer count, and acknowledgement state in the website. The keyed audit chain records who made the attestation and when. The final response remains a separate required confirmation, so fulfillment and case closure cannot be recorded in one click.

## Denials, appeals, and review

If a request is denied in whole or part, the PRO sends a written explanation and tells the requester they may appeal by replying to the response. The Privacy Lead reviews an appeal independently where possible and replies within the original 30-day service commitment. The response must also explain that the requester may complain to the Washington State Attorney General.

The Privacy Lead reviews open tickets weekly, checks for tickets due within 10 days, and performs a quarterly sample review of closed cases for identity-verification evidence, lead-store verification, and dealer acknowledgement where applicable.