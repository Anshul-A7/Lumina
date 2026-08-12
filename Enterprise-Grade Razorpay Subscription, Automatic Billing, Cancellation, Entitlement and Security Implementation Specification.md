# Enterprise-Grade Razorpay Subscription and Entitlement System

You are modifying an already-existing production-oriented web platform.

The platform is already built. Its existing frontend, backend, authentication, database, UI, business logic, AI functionality, routing, and feature implementation already exist.

Do NOT redesign, rewrite, replace, or unnecessarily refactor unrelated parts of the application.

Your task is to inspect the existing repository first and then implement a production-grade, security-first Razorpay Subscription and entitlement system.

The project uses:

- Frontend: Next.js.
- Backend: Java.
- Existing authentication: inspect and integrate with it.
- Existing database: inspect and use its current database technology, ORM, repositories, migrations, and conventions.
- Existing pricing page and subscription UI: preserve the existing design where possible.
- Payment provider: Razorpay.
- Razorpay Test API credentials will be supplied separately.
- The supplied credentials are Test Mode credentials and must only be used for test/development environments.
- Never expose Razorpay Key Secret in the browser, Next.js client bundle, Git repository, logs, HTML, API responses, or public configuration.

The objective is to implement a complete subscription system with:

- Monthly subscriptions.
- Yearly subscriptions.
- Automatic recurring billing.
- Immediate access after authoritative successful subscription/payment confirmation.
- Secure cancellation directly from the user's account.
- Cancellation at the end of the current billing cycle by default.
- Automatic cessation of future charges after cancellation.
- Automatic entitlement downgrade to Free after the paid period ends.
- Upgrade handling.
- Safe downgrade handling.
- Failed-payment handling.
- Webhook reconciliation.
- Idempotency.
- Strong database consistency.
- Strict backend authorization.
- No browser-controlled entitlement.
- No normal customer-facing refund workflow.
- Complete security and test coverage.

Use current official Razorpay documentation to verify all API endpoints, request fields, webhook event names, payment methods, restrictions, and state transitions before implementing them.

Do not invent Razorpay API behavior.

---

# 1. BUSINESS MODEL

The platform has three plans.

## FREE

Price:

₹0.

Features:

- 5 PDF generations per day.
- 10 image generations per day.
- Attach up to 10 PDFs / 15 images daily.
- Standard response speed.
- No Collaboration Workspaces.

Free is the default state.

Free has no Razorpay Subscription.

---

# 2. PLUS

## PLUS MONTHLY

Price:

₹100/month.

Features:

- 25 PDF generations per day.
- 50 image generations per day.
- Unlimited PDF and image attachments.
- Faster response times.
- Up to 3 Workspaces.
- Maximum 5 members per Workspace.

Billing:

- Automatically renew every monthly billing cycle through Razorpay.
- Customer is charged automatically according to the Razorpay Subscription.
- Customer may cancel from inside the application.
- Cancellation should default to end-of-current-billing-cycle cancellation.
- No normal customer-facing refund mechanism is provided.

## PLUS YEARLY

Price:

₹960/year.

The pricing page currently represents this as ₹80/month equivalent billed annually.

Features:

- 25 PDF generations per day.
- 50 image generations per day.
- Unlimited PDF and image attachments.
- Faster response times.
- Up to 3 Workspaces.
- Maximum 5 members per Workspace.

Billing:

- Automatically renew annually through Razorpay.
- Customer may cancel from inside the application.
- Cancellation should default to end-of-current-billing-cycle cancellation.
- No normal customer-facing refund mechanism is provided.

---

# 3. PRO

## PRO MONTHLY

Price:

₹499/month.

Features:

- 100 PDF generations per day.
- 100 image generations per day.
- Unlimited PDF and image attachments.
- Fastest response times.
- Priority response processing.
- Early access to new features.
- Unlimited Workspaces.
- Unlimited Workspace members.

Billing:

- Automatically renew monthly through Razorpay.
- Customer may cancel from inside the application.
- Cancellation should default to end-of-current-billing-cycle cancellation.
- No normal customer-facing refund mechanism is provided.

## PRO YEARLY

Price:

₹4,788/year.

The pricing page currently represents this as ₹399/month equivalent billed annually.

Features:

- 100 PDF generations per day.
- 100 image generations per day.
- Unlimited PDF and image attachments.
- Fastest response times.
- Priority response processing.
- Early access to new features.
- Unlimited Workspaces.
- Unlimited Workspace members.

Billing:

- Automatically renew annually through Razorpay.
- Customer may cancel from inside the application.
- Cancellation should default to end-of-current-billing-cycle cancellation.
- No normal customer-facing refund mechanism is provided.

---

# 4. CRITICAL BILLING MODEL

This implementation intentionally uses the Razorpay Subscription product.

Razorpay Subscriptions are designed for automated recurring billing and automatically charge customers according to the configured billing cycle.

The system must therefore NOT implement recurring billing independently.

Do not create custom scheduled payment jobs that charge customers.

Do not create custom recurring card-debit logic.

Do not store card credentials.

Razorpay must be responsible for recurring payment execution.

Your application is responsible for:

- selecting the correct plan,
- creating the correct Razorpay Subscription,
- associating it with the correct authenticated user,
- verifying authoritative Razorpay events,
- maintaining entitlement state,
- enforcing access,
- handling cancellation,
- handling payment failures,
- reconciling webhooks,
- preventing duplicate state transitions.

---

# 5. AUTHORITATIVE PLAN CATALOG

The browser must never be allowed to determine:

- price,
- billing period,
- Razorpay plan ID,
- entitlement level,
- expiry,
- subscription state,
- user identity.

The browser may send a safe identifier such as:

PLUS_MONTHLY

PLUS_YEARLY

PRO_MONTHLY

PRO_YEARLY

The Java backend must map that identifier to an authoritative server-side catalog.

Example conceptual catalog:

PLUS_MONTHLY

- razorpayPlanId = server-configured plan ID.
- amount = ₹100.
- interval = monthly.
- entitlement = PLUS.
- feature limits = Plus.
- billing period = 1 month.

PLUS_YEARLY

- razorpayPlanId = server-configured plan ID.
- amount = ₹960.
- interval = yearly.
- entitlement = PLUS.
- feature limits = Plus.
- billing period = 1 year.

PRO_MONTHLY

- razorpayPlanId = server-configured plan ID.
- amount = ₹499.
- interval = monthly.
- entitlement = PRO.
- feature limits = Pro.
- billing period = 1 month.

PRO_YEARLY

- razorpayPlanId = server-configured plan ID.
- amount = ₹4788.
- interval = yearly.
- entitlement = PRO.
- feature limits = Pro.
- billing period = 1 year.

Never accept the amount from the client.

Never accept a Razorpay plan ID from the client without server-side mapping.

Never let the client select arbitrary Razorpay Plan IDs.

---

# 6. RAZORPAY PLAN CREATION

Inspect the current Razorpay Dashboard/API requirements before implementation.

The four billing products should correspond to the appropriate Razorpay Subscription Plans:

- Plus Monthly.
- Plus Yearly.
- Pro Monthly.
- Pro Yearly.

Do not create plans dynamically on every customer purchase.

Create stable Razorpay plan IDs once and store them securely in configuration/database.

Do not create duplicate Razorpay Plans because a user clicked Buy more than once.

Razorpay's current documentation states that plans cannot simply be modified/deleted after creation and that a new plan should be created for changed plan definitions. Account for this in the plan catalog design.

The internal catalog must version pricing so historical subscriptions are never rewritten when the business later changes pricing.

---

# 7. USER → RAZORPAY CUSTOMER

Inspect whether the current platform already has a stable customer identity.

Do not create duplicate users.

For each application user that subscribes:

- map internal user ID to Razorpay Customer ID where required,
- store the mapping securely,
- enforce uniqueness,
- prevent User A from using User B's Razorpay Customer ID.

Never trust a Customer ID supplied by the browser.

---

# 8. SUBSCRIPTION CREATION

Conceptual flow:

1. User authenticates.
2. User selects Plus Monthly, Plus Yearly, Pro Monthly, or Pro Yearly.
3. Next.js sends only the logical plan code.
4. Java backend validates authentication.
5. Backend loads authoritative catalog entry.
6. Backend inspects current entitlement/subscription.
7. Backend decides whether this is a new purchase, upgrade, downgrade, duplicate subscription request, or invalid operation.
8. Backend creates or prepares the appropriate Razorpay Subscription.
9. Backend records the internal purchase/subscription transaction.
10. Frontend opens Razorpay's supported subscription checkout/authorization flow.
11. Customer authenticates payment mandate/authorization.
12. Razorpay sends the authoritative subscription/payment events.
13. Backend verifies the event.
14. Backend activates entitlement only after the appropriate authoritative state.
15. Frontend refreshes entitlement state from backend.

Never grant paid access merely because the user clicked "Buy".

---

# 9. PAYMENT AUTHORIZATION

Subscription creation and payment authorization are not identical.

The system must correctly distinguish:

- Subscription created.
- Subscription authenticated.
- Subscription active.
- Payment charged.
- Payment failed.
- Subscription pending.
- Subscription halted.
- Subscription cancelled.
- Subscription completed.

Razorpay provides webhook events for these subscription lifecycle transitions, including:

- `subscription.authenticated`
- `subscription.activated`
- `subscription.charged`
- `subscription.pending`
- `subscription.halted`
- `subscription.cancelled`
- `subscription.completed`
- `subscription.updated`
- `subscription.paused`
- `subscription.resumed`.

Use the authoritative subscription/payment lifecycle rather than frontend status.

---

# 10. ENTITLEMENT ACTIVATION

The entitlement must not be granted merely because a Subscription entity was created.

The system must determine the correct authoritative activation event/state according to Razorpay's current documentation and the actual payment flow being used.

At minimum:

- successful initial payment/authorization,
- subscription activation,
- valid association to internal user,
- valid plan,
- valid Razorpay subscription ID,
- valid payment state.

Then activate the entitlement transactionally.

---

# 11. ENTITLEMENT MODEL

Separate:

1. Razorpay Subscription.
2. Payment transaction history.
3. Internal entitlement.

Do not use the Razorpay Subscription object itself as the only application authorization record.

Internal effective entitlement should look conceptually like:

FREE

PLUS

PRO

And must contain:

- user/account ID,
- current tier,
- source Razorpay subscription ID,
- source purchase/payment ID where applicable,
- start timestamp,
- current paid-through timestamp,
- subscription status,
- cancellation scheduled flag,
- cancellation effective timestamp,
- version,
- updated timestamp.

---

# 12. CURRENT PLAN

The user must have exactly one authoritative effective plan:

FREE.

PLUS.

or PRO.

Never allow:

PLUS + PRO simultaneously.

Payment history may contain multiple subscriptions or historical transactions.

Effective entitlement must remain deterministic.

---

# 13. FREE → PLUS MONTHLY

User starts with Free.

User selects Plus Monthly.

Backend creates correct Razorpay Subscription using the server-side Plus Monthly plan.

User authorizes the subscription.

Razorpay confirms the required payment/subscription event.

Backend verifies it.

Entitlement becomes:

PLUS.

The UI immediately reflects Plus after authoritative server confirmation.

The user is now entitled to Plus feature limits.

Future monthly charges are handled by Razorpay automatically.

---

# 14. FREE → PRO MONTHLY

Same architecture.

Effective entitlement becomes:

PRO.

Future monthly charges are handled automatically by Razorpay.

---

# 15. FREE → PLUS YEARLY

Effective entitlement becomes:

PLUS.

Razorpay recurring interval is yearly.

The application must never accidentally create a monthly subscription for an annual purchase.

---

# 16. FREE → PRO YEARLY

Effective entitlement becomes:

PRO.

Razorpay recurring interval is yearly.

---

# 17. AUTOMATIC RENEWAL

Automatic renewal is intentional.

Do not write your own recurring charging mechanism.

Razorpay should automatically charge the subscription according to its configured billing cycle.

The backend must listen for successful recurring payment events.

Every successful recurring charge must:

- resolve the correct subscription,
- resolve the correct internal user,
- verify plan identity,
- update paid-through/entitlement dates,
- preserve existing entitlement,
- record the payment,
- avoid duplicate processing.

Razorpay provides a `subscription.charged` webhook for successful recurring charges.

---

# 18. RECURRING PAYMENT SECURITY

Never grant an entitlement to a user based on:

- frontend notification,
- browser URL,
- React state,
- local storage,
- customer-supplied subscription ID,
- payment ID without server-side verification.

Resolve:

authenticated user

→ internal subscription

→ Razorpay subscription ID

→ authoritative Razorpay event/payment.

---

# 19. CANCELLATION POLICY

Cancellation must be available directly inside the user's account.

No customer-support request should be required.

The platform must provide an easily accessible:

"Cancel Subscription"

control.

The default cancellation action must be:

CANCEL AT END OF CURRENT BILLING CYCLE.

This means:

- the customer stops future renewal,
- the current paid period remains active,
- the customer retains the plan until the end of the current cycle,
- the next recurring charge does not happen,
- at cycle end the subscription becomes cancelled,
- the internal entitlement becomes Free.

Razorpay explicitly supports cancellation at the end of the current billing cycle using its subscription cancellation API.

---

# 20. CANCELLATION API

The backend should call the appropriate Razorpay Subscription cancellation API.

Razorpay's current endpoint is:

POST

`/v1/subscriptions/:id/cancel`

with:

`cancel_at_cycle_end: true`

for end-of-cycle cancellation.

Never expose Razorpay Key Secret to the client.

The frontend calls your Java backend.

The Java backend calls Razorpay.

Architecture:

Next.js

↓

Authenticated Java API

↓

Razorpay API

Never:

Next.js

↓

Razorpay using Key Secret.

---

# 21. CANCELLATION CONFIRMATION UX

Before cancellation, display:

- current plan,
- current billing period,
- current expiration/next billing date,
- explanation that cancellation stops future renewal,
- statement that access remains available until the current paid period ends,
- statement that no refund is issued through the normal cancellation flow.

Example concept:

"Your Pro subscription will remain active until 12 September 2026. Cancellation will stop the next automatic renewal. No further charge will be made after cancellation."

Do not say:

"Your Pro plan ends immediately."

unless an immediate-cancellation operation is explicitly selected.

---

# 22. CANCELLATION STATE

The internal database must represent:

ACTIVE.

CANCELLATION_SCHEDULED.

CANCELLED.

Do not immediately change:

ACTIVE → FREE

when the customer clicks Cancel.

Instead:

ACTIVE → CANCELLATION_SCHEDULED.

At the effective cycle end:

CANCELLATION_SCHEDULED → CANCELLED.

Then:

effective entitlement → FREE.

---

# 23. CANCELLED SUBSCRIPTION

Razorpay states that once a Subscription is cancelled, it cannot be renewed or reactivated.

Therefore, do not implement a fake "Reactivate" button that attempts to reactivate the same cancelled Razorpay subscription.

Instead, after cancellation has taken effect:

Show:

"Subscription cancelled."

and provide:

"Subscribe again"

which starts a new Razorpay Subscription.

---

# 24. CANCELATION WEBHOOK

Subscribe to and process:

`subscription.cancelled`

Razorpay documents this event specifically for when a subscription is cancelled and moved to the cancelled state.

When received:

- authenticate webhook signature,
- identify subscription,
- verify internal ownership,
- store event,
- process idempotently,
- update internal state,
- remove paid entitlement once cancellation is actually effective,
- preserve all historical payment records.

---

# 25. AUTOMATIC EXPIRATION

Even if the cancellation webhook is delayed, access logic must still be safe.

If:

now >= entitlement.expiresAt

the effective paid entitlement must not continue.

The scheduled job must not be the sole protection.

Authorization must be time-aware.

This is defense in depth.

---

# 26. PAYMENT FAILURE

Razorpay Subscription payments can fail.

Razorpay documents that failed recurring charges can move a subscription to `pending`, with retries, and eventually `halted` if retries are exhausted.

Implement the documented lifecycle.

Do NOT invent your own retry schedule.

Do NOT make additional direct charges from your application.

Listen to Razorpay events.

---

# 27. PENDING PAYMENT

When subscription becomes pending:

Do not immediately destroy the customer's paid access unless that is consistent with Razorpay's actual current subscription/payment state and your configured business policy.

Display a clear payment problem state.

Example:

"Your payment could not be completed. Razorpay will retry according to the subscription billing process."

The exact access behavior around a failed renewal must be configured intentionally.

Recommended conservative rule:

- Keep the entitlement active through the already-paid period.
- Do not grant a new paid period solely because a renewal attempt failed.
- If the subscription enters a permanently halted/cancelled state and the paid period ends, downgrade to Free.

---

# 28. HALTED SUBSCRIPTION

When Razorpay reports:

`subscription.halted`

do not:

- create a custom charge,
- repeatedly attempt charging,
- grant an additional term.

Record the state.

Notify the user through the application UI.

When the paid period ends and no active entitlement remains:

downgrade to Free.

Razorpay documents the halted state as occurring after retries are exhausted.

---

# 29. PLAN UPGRADE

Handle:

PLUS → PRO.

This is a legitimate upgrade.

Razorpay supports updating an active Subscription's linked plan, and its documentation explains that an immediate upgrade may require an additional charge depending on the remaining subscription value and new plan.

Do NOT blindly invent prorated calculations.

Use Razorpay's supported Subscription update functionality and documented behavior.

Before implementing the upgrade:

- inspect supported payment methods,
- inspect current subscription state,
- inspect whether the existing subscription can be updated,
- inspect whether the selected payment method supports the operation,
- inspect current Razorpay API behavior.

Razorpay's current documentation states that Subscription updates are not supported for some payment modes, including UPI/emandate in the relevant API flow.

Therefore, build a safe fallback:

If the existing subscription cannot safely be upgraded in place:

1. Do not partially mutate the old subscription.
2. Do not grant Pro prematurely.
3. Present a controlled purchase flow for the new Pro subscription.
4. Ensure the old subscription's future renewal is safely handled.
5. Ensure the customer is never unintentionally charged twice at the same moment.
6. Preserve the old subscription's history.

Do not make financial assumptions.

---

# 30. NO REFUND-BASED DOWNGRADE

Do NOT perform an immediate Plus downgrade from Pro if doing so could require Razorpay to refund the unused portion.

Razorpay's Subscription update documentation explicitly states that immediate downgrades can generate refund/credit adjustments.

Since this platform does not offer refunds as part of its plan policy:

A downgrade from Pro to Plus should normally be scheduled for the end of the current billing cycle.

At cycle end:

PRO → PLUS.

No mid-cycle refund.

No manual refund.

No automatic refund.

No loss of already-paid access before the paid period ends.

Razorpay supports updating a Subscription at the end of the billing cycle without amount adjustment.

---

# 31. DOWNGRADE FLOW

If current:

PRO_MONTHLY

and user chooses:

PLUS_MONTHLY.

Do not immediately change the plan if that would require refunding unused Pro time.

Instead:

- schedule Plus at cycle end,
- keep Pro active,
- show "Plus will start on [date]",
- let Razorpay update the subscription at cycle end if supported,
- otherwise safely cancel the old subscription at cycle end and create the new subscription only according to a secure, supported workflow.

Do not promise a refund.

---

# 32. SAME-PLAN SUBSCRIPTION

If user already has:

PLUS_MONTHLY

and clicks:

PLUS_MONTHLY.

Do not automatically create another subscription.

Prevent duplicate subscriptions.

Display:

"You already have Plus Monthly."

Show:

- current renewal date,
- cancellation state,
- current plan,
- management controls.

If the subscription is cancelled at cycle end and the customer wants to continue, allow a new subscription purchase according to the documented state.

---

# 33. PRO → PRO

Do not create a second concurrent Pro subscription for an already-active Pro customer.

Return the current subscription state.

---

# 34. YEARLY → MONTHLY

Do not immediately convert an annual plan to monthly if that would cause credit/refund complexities.

Default:

Schedule the change at cycle end.

The user retains the annual plan until the paid annual period ends.

Then monthly billing begins.

Use Razorpay's supported subscription update mechanism where possible.

---

# 35. MONTHLY → YEARLY

This is an upgrade in commitment/term.

Before applying it:

- inspect current subscription state,
- determine whether Razorpay supports changing the plan immediately,
- determine whether a prorated extra charge is required,
- do not calculate the prorated amount incorrectly yourself.

If the existing subscription cannot be safely modified:

Use a new subscription flow with explicit handling of the old subscription.

No duplicate active subscriptions.

---

# 36. NO CUSTOMER REFUND FEATURE

Do NOT add:

- Refund button.
- Refund request form.
- Refund ticket system.
- Customer refund API.
- Automatic refund policy.
- Refund calculations.
- "Request refund" customer flow.

The product's stated commercial policy does not include ordinary refunds.

However, the system must still be technically able to reconcile provider-side payment events or administrator actions relating to refunds, disputes, reversals, or other payment states.

Do not create a customer-facing refund mechanism.

---

# 37. RAZORPAY REFUNDS

Razorpay itself provides refund APIs and Dashboard refund capabilities. That does NOT mean your application needs to provide a refund feature.

If an administrator ever performs a refund directly through Razorpay Dashboard, the application must be capable of receiving relevant refund webhooks and updating its records accordingly.

Razorpay documents refund webhook events such as:

- `refund.created`
- `refund.processed`
- `refund.failed`
- `refund.speed_changed`.

Do not automatically recreate a refund feature in the SaaS UI.

---

# 38. PAYMENT REVERSAL

If a payment is refunded/reversed externally:

- record the event,
- associate it with the correct payment,
- update payment status,
- recalculate entitlement where appropriate,
- never leave paid access permanently active after a confirmed full reversal.

Do not blindly downgrade from any partial dispute event.

Understand the actual provider event and payment state.

---

# 39. CHARGEBACK / DISPUTE

The application must preserve:

- subscription ID,
- payment ID,
- user ID,
- purchase record,
- subscription period,
- entitlement period,
- relevant transaction history.

This creates evidence for reconciliation.

Do not create a fake refund workflow.

Do not automatically assume every dispute is fraudulent.

Process provider-authoritative events correctly.

---

# 40. FRONTEND CANCELLATION

The user's account page must contain:

Current Plan.

Billing Period.

Next Billing Date.

Subscription Status.

Cancellation Status.

"Cancel Subscription" button.

The button must call YOUR Java backend.

Example:

POST:

`/api/billing/subscription/cancel`

The backend:

1. Authenticates user.
2. Resolves the internal active subscription.
3. Confirms ownership.
4. Confirms subscription is cancellable.
5. Calls Razorpay.
6. Uses `cancel_at_cycle_end=true`.
7. Updates local state transactionally.
8. Returns authoritative result.

Never call Razorpay's secret-authenticated API directly from Next.js browser code.

---

# 41. CANCEL OWNERSHIP SECURITY

A customer must never be able to cancel another customer's subscription.

Never accept:

`userId`

as authority.

Use authenticated identity.

Resolve:

authenticated user → own active subscription.

If no active subscription:

return safe error.

If supplied subscription ID does not belong to authenticated user:

reject.

---

# 42. CONCURRENT CANCELLATION

If the user clicks Cancel multiple times:

Only one cancellation operation should occur.

Use backend idempotency/concurrency protection.

If already:

CANCELLATION_SCHEDULED

return the existing authoritative cancellation state.

Do not send multiple cancellation requests.

---

# 43. CANCELLATION RACE CONDITIONS

Handle:

User clicks Cancel.

At the same time a renewal event arrives.

At the same time a webhook arrives.

The final state must be deterministic.

Use database transactions, locks/versioning, and Razorpay state reconciliation.

Never let an older event overwrite a newer authoritative subscription state.

---

# 44. WEBHOOK ARCHITECTURE

Configure Razorpay webhook events relevant to:

- subscriptions,
- payments,
- refunds if required for reconciliation,
- disputes if the application requires them,
- other payment states required by the exact implementation.

Use Razorpay's current webhook documentation to choose the exact events. Razorpay explicitly provides subscription webhooks for subscription lifecycle events.

---

# 45. WEBHOOK SIGNATURE VERIFICATION

The Java backend must:

1. Receive the raw webhook body.
2. Read Razorpay webhook signature.
3. Verify against the webhook secret.
4. Reject invalid signatures.
5. Record the event only after appropriate validation.
6. Process idempotently.

Never parse and then reconstruct JSON for signature verification if Razorpay's current specification requires the raw request body.

Never expose webhook secret to Next.js.

---

# 46. WEBHOOK IDEMPOTENCY

Every event must have a unique identifier.

Add:

UNIQUE(razorpay_event_id)

If the same event arrives again:

- do not reapply it,
- do not renew twice,
- do not extend expiry twice,
- do not activate Pro twice,
- do not create duplicate records.

Razorpay's webhook architecture is asynchronous and requires robust event processing.

---

# 47. RECURRING CHARGE DUPLICATION

A recurring charge must create exactly one corresponding payment history record.

If:

`subscription.charged`

arrives twice:

only one payment record.

If a payment webhook and API reconciliation both detect the same payment:

only one payment record.

Use unique Razorpay payment IDs.

---

# 48. DATABASE DESIGN

Inspect existing schema before modification.

Create or adapt entities equivalent to:

## PLAN_CATALOG

Fields:

- id
- plan_code
- display_name
- tier
- billing_period
- amount_minor
- currency
- razorpay_plan_id
- feature configuration
- catalog version
- active
- created_at
- updated_at

## CUSTOMER_PAYMENT_PROFILE

Fields:

- internal user ID
- Razorpay customer ID
- created_at
- updated_at

Unique on internal user ID.

Unique on Razorpay customer ID where appropriate.

## SUBSCRIPTION

Fields:

- internal subscription ID
- user ID
- Razorpay subscription ID
- Razorpay customer ID
- Razorpay plan ID
- internal plan code
- tier
- billing period
- status
- start_at
- current_period_start
- current_period_end
- cancel_at_cycle_end
- cancellation_requested_at
- cancelled_at
- created_at
- updated_at
- version

Razorpay Subscription ID must be unique.

## PAYMENT

Fields:

- internal payment ID
- user ID
- internal subscription ID
- Razorpay payment ID
- Razorpay order/invoice/subscription reference as applicable
- amount
- currency
- status
- payment timestamp
- event source
- created_at
- updated_at

Razorpay payment ID must be unique.

## ENTITLEMENT

Fields:

- user ID
- effective tier
- source subscription ID
- status
- starts_at
- expires_at
- cancellation state
- version
- updated_at

## WEBHOOK_EVENT

Fields:

- Razorpay event ID
- event type
- signature verification state
- processing status
- received_at
- processed_at
- retry count
- error details
- payload hash

Unique on event ID.

---

# 49. PAYMENT HISTORY

Never overwrite old payment records merely because a new billing cycle occurs.

Every recurring charge must produce an auditable payment record.

A single subscription can therefore have:

Payment 1.

Payment 2.

Payment 3.

Payment 4.

etc.

The subscription remains the billing relationship.

The payments remain the financial history.

The entitlement remains the access state.

Keep these concepts separate.

---

# 50. ENTITLEMENT ACCESS

Backend authorization must derive access from the current effective entitlement.

Never trust:

- React state.
- localStorage.
- cookies that merely contain plan names.
- query parameters.
- hidden HTML fields.
- pricing page state.

If the database says:

FREE

the backend must enforce Free.

If:

PLUS

enforce Plus.

If:

PRO

enforce Pro.

---

# 51. FEATURE LIMITS

Create one authoritative entitlement policy.

FREE:

- 5 PDF/day.
- 10 image/day.
- 10 PDFs / 15 images attachment limit.
- standard response speed.
- zero collaboration workspaces.

PLUS:

- 25 PDF/day.
- 50 image/day.
- unlimited PDF/image attachments.
- faster response.
- 3 workspaces.
- 5 members per workspace.

PRO:

- 100 PDF/day.
- 100 image/day.
- unlimited attachments.
- fastest/priority responses.
- unlimited workspaces.
- unlimited members.
- early access.

Use backend authorization for each actual resource/action.

---

# 52. QUOTA ENFORCEMENT

The frontend may display limits.

The backend must enforce limits.

A malicious Free user must not be able to send:

`POST /api/pro/generate`

and receive a Pro feature.

A Plus user must not be able to create Workspace #4.

A Plus user must not add member #6 to a workspace.

A Free user must not exploit a stale frontend plan state.

---

# 53. WORKSPACE EXPIRATION BEHAVIOR

When Pro expires:

Do not delete existing Pro-created workspaces or members automatically.

Preserve data.

Restrict creation/usage according to the resulting Free or Plus entitlement.

Do not destroy customer data simply because billing status changed.

Use a non-destructive downgrade strategy.

---

# 54. AUTOMATIC BILLING FAILURE

When a renewal payment fails:

do not invent a custom billing processor.

Use Razorpay's documented subscription payment-retry/state mechanism.

Razorpay documents that failed subscription charges can lead to `pending`, retries, and eventually `halted`.

The application should display the appropriate billing problem state.

---

# 55. PAYMENT METHOD RESTRICTIONS

Before implementing plan changes:

verify Razorpay's current supported payment methods.

Razorpay's current documentation states that Subscription updates have restrictions depending on the payment mode, and specifically indicates that certain updates are not supported for UPI and Emandate subscriptions.

Do not claim that every upgrade/downgrade path works identically for every payment method.

Where a payment method cannot support the desired plan transition:

fail safely and present a new-subscription path rather than corrupting the active subscription.

---

# 56. PLAN UPGRADE SAFETY

For Plus → Pro:

Never grant Pro before the required Razorpay operation/payment is authoritative.

Never cancel Plus prematurely.

Never leave the user with zero entitlement because an upgrade operation failed midway.

The safe sequence should preserve current valid access until the new Pro entitlement is confirmed.

Only then transition effective entitlement.

---

# 57. PLAN DOWNGRADE SAFETY

For Pro → Plus:

Do not trigger an immediate refund-producing operation merely to change plans.

Prefer cycle-end scheduling.

Current Pro remains active.

New Plus starts when the current cycle finishes.

No refund.

No lost paid time.

---

# 58. CANCELLATION + UPGRADE INTERACTION

If a Plus customer has already scheduled cancellation:

They must see:

"Your Plus subscription is scheduled to cancel on [date]."

If they choose Upgrade to Pro:

the implementation must first reconcile the cancellation state.

Do not create:

Plus cancelling

plus Pro scheduled

plus duplicate future charges

without deterministic handling.

Choose one authoritative transition.

Recommended:

- cancel scheduled cancellation if technically supported before it becomes effective, or
- create a new intended subscription state and safely retire the old subscription without overlapping renewal.

Verify current Razorpay capabilities before implementation.

---

# 59. CANCELLATION + PAYMENT FAILURE

If the user scheduled cancellation and a renewal payment fails before cancellation becomes effective:

the system must follow Razorpay's actual payment/subscription state.

Do not assume cancellation guarantees a previously scheduled renewal payment can never occur if the provider reports another valid state transition.

Use webhook reconciliation.

---

# 60. NO REFUND DURING CANCELLATION

When user clicks Cancel:

Do not create refund.

Do not reduce access immediately.

Do not return money.

Do:

cancel future renewal.

retain current entitlement until paid period ends.

Then:

downgrade to Free.

This is the primary cancellation behavior.

---

# 61. ADMIN/RAZORPAY DASHBOARD RECONCILIATION

The internal platform should not assume that its local subscription state is always correct.

Build reconciliation based on:

- Razorpay subscription ID.
- Razorpay subscription status.
- Razorpay plan ID.
- payment history.
- webhook events.

An administrator can inspect discrepancies from the Razorpay Dashboard.

Do not create unnecessary customer-support functionality.

Administrative diagnostics are allowed and useful.

---

# 62. FRONTEND BILLING PAGE

The billing page should show:

Current plan.

Billing interval.

Current status.

Current billing cycle end.

Next charge date, if active and not scheduled for cancellation.

Cancellation status.

Upgrade option where valid.

Downgrade option where valid.

Cancel Subscription.

Subscribe Again if cancelled/expired.

Payment history.

Do not show confusing "renewal" language when cancellation is scheduled.

---

# 63. CANCELLATION UX TEXT

For a scheduled cancellation:

"Your subscription is cancelled for renewal. You will keep [Plan] access until [date]. You will not be charged again unless you start a new subscription."

This accurately describes the desired behavior.

---

# 64. SUBSCRIPTION REACTIVATION

Do not attempt to reactivate a Razorpay subscription after it reaches cancelled state.

Razorpay explicitly states that cancelled subscriptions cannot be renewed/reactivated.

Instead:

"Subscribe again"

creates a new Subscription.

---

# 65. NO CUSTOMER SUPPORT DEPENDENCY

Cancellation must require no support ticket.

No email request.

No support form.

No manual human action.

Customer:

Account → Billing → Cancel Subscription → Confirm.

Backend:

calls Razorpay.

Database:

records cancellation.

Webhook:

reconciles it.

Entitlement:

remains active until cycle end.

Then:

Free.

---

# 66. SECURITY REQUIREMENTS

Treat the browser as hostile.

Never trust browser claims for:

- plan,
- price,
- subscription ID,
- user ID,
- cancellation state,
- payment state,
- entitlement,
- expiry.

Use authenticated server identity.

Use database ownership checks.

Use server-side Razorpay calls.

---

# 67. SECRET MANAGEMENT

Required server-only variables should conceptually include:

RAZORPAY_KEY_ID

RAZORPAY_KEY_SECRET

RAZORPAY_WEBHOOK_SECRET

Never expose the secret as:

NEXT_PUBLIC_RAZORPAY_KEY_SECRET.

Never place it in frontend code.

The public Key ID may be sent to Checkout where Razorpay requires it.

The Key Secret must remain server-only.

---

# 68. ENVIRONMENT SEPARATION

Development:

Razorpay Test Mode.

Staging:

appropriate Test Mode or dedicated controlled environment.

Production:

Razorpay Live Mode.

Do not mix credentials.

The application should fail startup or disable billing safely if mandatory production credentials are missing.

---

# 69. WEBHOOK CONFIGURATION

Configure the Razorpay Dashboard for the required subscription webhook events.

At minimum investigate and configure the exact events required for:

- subscription authenticated,
- subscription activated,
- subscription charged,
- subscription pending,
- subscription halted,
- subscription cancelled,
- subscription updated,
- subscription completed.

Razorpay currently provides these subscription events.

Add payment/refund/dispute events only where they are actually needed for the final reconciliation system.

---

# 70. WEBHOOK RESPONSE

Webhook endpoint must respond quickly.

Do not run expensive AI tasks.

Do not perform slow external operations synchronously.

Validate signature and safely accept the event.

Queue/process asynchronously where the existing infrastructure supports it.

Razorpay's webhook documentation is explicitly designed around asynchronous server-to-server notifications.

---

# 71. WEBHOOK OUT-OF-ORDER DELIVERY

Do not assume events always arrive in perfect order.

Examples:

subscription.activated

subscription.charged

subscription.updated

may be received in an unexpected order depending on delivery timing.

Each event must be reconciled against current subscription state.

Never allow an old event to downgrade a newer valid state.

---

# 72. WEBHOOK RETRIES

Assume duplicate deliveries.

Use unique event IDs.

Process idempotently.

If an event processing transaction fails:

allow safe retry.

Do not mark it complete before the associated state transition is durable.

---

# 73. DATABASE CONCURRENCY

Use transactions and appropriate locking/versioning.

Test:

Two cancellation requests.

Two upgrade requests.

Two webhook workers.

Payment webhook + browser confirmation.

Renewal webhook + cancellation request.

Upgrade + cancellation request.

No duplicate subscription.

No duplicate entitlement.

No incorrect tier.

No missed payment.

No unauthorized access.

---

# 74. IDEMPOTENCY

Use idempotency at multiple layers:

Frontend:

prevent duplicate clicks.

Backend:

idempotent request handling.

Database:

unique constraints.

Razorpay:

use supported idempotency mechanisms where applicable.

Webhook:

unique event ID.

Payment:

unique Razorpay payment ID.

Subscription:

unique Razorpay subscription ID.

---

# 75. PAYMENT HISTORY INTEGRITY

Never delete old payments.

Never modify a historical payment amount simply because current pricing changed.

Never change an old plan from Plus to Pro after the customer upgraded.

Historical records must remain historical.

---

# 76. PLAN VERSIONING

If prices change later:

create a new catalog version / Razorpay Plan.

Do not rewrite existing subscription history.

Razorpay documentation states that existing Plans cannot simply be updated/deleted and recommends creating a new Plan when a plan definition changes.

---

# 77. FAILURE CLOSED

When payment state is uncertain:

do not grant new paid access.

When webhook signature is invalid:

reject.

When subscription ownership is wrong:

reject.

When payment plan does not match internal plan:

do not grant access.

When database state conflicts:

retain last known valid entitlement until safely reconciled rather than granting a higher tier blindly.

When a user manually modifies the frontend:

no authorization change.

---

# 78. TEST CASES

Perform all of the following.

## Initial Purchase

1. Free → Plus Monthly.
2. Free → Pro Monthly.
3. Free → Plus Yearly.
4. Free → Pro Yearly.

For each:

- successful authorization,
- successful activation,
- correct plan,
- correct entitlement,
- correct billing cycle,
- correct Razorpay plan,
- correct database mapping.

---

## Automatic Renewal

5. Plus Monthly successful renewal.

Expected:

- one new payment record,
- no duplicate entitlement,
- expiry extended exactly one cycle.

6. Pro Monthly successful renewal.

7. Plus Yearly renewal.

8. Pro Yearly renewal.

---

## Failed Renewal

9. Renewal payment fails.

Expected:

- subscription enters documented failure state,
- no false successful payment record,
- no duplicate charge,
- application reflects billing problem.

10. Renewal succeeds after retry.

Expected:

- state returns to correct active state,
- entitlement remains correct,
- exactly one successful payment recorded.

11. Subscription reaches halted.

Expected:

- no custom charge,
- no duplicate payment,
- no infinite retry loop,
- entitlement eventually expires according to policy.

---

## Cancellation

12. Active Plus Monthly → Cancel.

Expected:

- cancel request reaches backend,
- backend cancels at cycle end,
- subscription remains active until cycle end,
- no immediate refund,
- next automatic charge does not occur,
- after cycle end → Free.

13. Active Pro Monthly → Cancel.

14. Active Plus Yearly → Cancel.

15. Active Pro Yearly → Cancel.

16. User clicks Cancel twice.

Expected:

- one cancellation operation.

17. User refreshes page after cancellation.

Expected:

- cancellation state persists.

18. User logs in from another browser.

Expected:

- same cancellation state.

19. Cancellation webhook arrives.

Expected:

- idempotent processing.

20. Cancellation webhook arrives twice.

Expected:

- exactly one state transition.

---

## Upgrade

21. Plus Monthly → Pro Monthly.

22. Plus Monthly → Pro Yearly.

23. Plus Yearly → Pro Monthly.

24. Plus Yearly → Pro Yearly.

Expected:

- no duplicate active subscriptions,
- no premature Pro access,
- no accidental double charge,
- exact supported Razorpay behavior used.

---

## Downgrade

25. Pro Monthly → Plus Monthly.

Expected:

- schedule at cycle end,
- no immediate refund,
- Pro remains active until cycle end.

26. Pro Monthly → Plus Yearly.

27. Pro Yearly → Plus Monthly.

28. Pro Yearly → Plus Yearly.

Verify exact Razorpay support.

Do not invent proration.

Do not invent refunds.

---

## Duplicate Purchases

29. Free user double-clicks Buy.

30. Active Plus user clicks Plus again.

31. Active Pro user clicks Pro again.

Expected:

- no duplicate active subscriptions.

---

## Security

32. User modifies plan code.

33. User modifies amount.

34. User modifies Razorpay plan ID.

35. User submits another user's subscription ID.

36. User submits another user's payment ID.

37. User attempts direct Pro API access as Free.

38. User manipulates localStorage.

39. User manipulates React state.

40. User directly calls cancellation API for another user.

41. User replays successful webhook.

42. User sends invalid webhook signature.

43. User changes webhook payload after signature.

44. User submits duplicate cancellation request.

45. User submits stale subscription event.

46. User submits out-of-order events.

47. User tries to expose Key Secret through browser.

All must fail safely.

---

# 79. FRONTEND SECURITY TESTS

Verify browser bundles contain no:

- Razorpay Key Secret.
- Webhook Secret.
- Database credential.
- Internal server secret.

Check:

- production build,
- source maps,
- Network requests,
- browser DevTools,
- generated JavaScript,
- API responses.

---

# 80. AUTHORIZATION TESTS

Test every paid capability.

Free:

- 5 PDF/day.
- 10 images/day.
- restricted attachments.
- no workspaces.

Plus:

- 25 PDF/day.
- 50 images/day.
- unlimited attachments.
- max 3 workspaces.
- max 5 members/workspace.

Pro:

- 100 PDF/day.
- 100 images/day.
- unlimited attachments.
- unlimited workspaces.
- unlimited members.
- priority access.
- early access features.

The server must enforce each limit.

---

# 81. EXPIRATION TESTS

Test:

Plus expiration.

Pro expiration.

Cancelled subscription reaching cycle end.

Halted subscription reaching paid-period end.

Expired account manually calling paid endpoints.

Expected:

effective plan becomes Free.

---

# 82. CLOCK TESTING

Do not rely only on manually waiting a month.

Create testable clock/time abstractions.

Test:

- billing cycle end,
- cancellation effective date,
- plan switch date,
- leap-year dates,
- month-end dates,
- UTC handling.

Never trust browser local time for authorization.

---

# 83. PAYMENT RECONCILIATION

Create a reconciliation mechanism that can detect:

- Razorpay subscription active but local database inactive.
- Local subscription active but Razorpay cancelled.
- Razorpay payment succeeded but local payment missing.
- Local payment marked successful but Razorpay does not confirm it.
- Duplicate payment.
- Duplicate event.
- Orphaned subscription.
- Missing entitlement.

The reconciliation tool must not blindly grant access.

It must verify authoritative Razorpay state.

---

# 84. AUDIT LOG

Record:

- subscription created,
- subscription authenticated,
- subscription activated,
- renewal charged,
- renewal failed,
- subscription pending,
- subscription halted,
- cancellation requested,
- cancellation confirmed,
- plan upgraded,
- plan downgrade scheduled,
- plan downgrade completed,
- entitlement activated,
- entitlement expired,
- webhook received,
- webhook rejected,
- amount mismatch,
- ownership mismatch,
- unauthorized billing operation.

Never log:

- Key Secret,
- Webhook Secret,
- card number,
- CVV,
- private authentication tokens.

---

# 85. OBSERVABILITY

Track:

- active subscriptions,
- cancellations,
- renewal success rate,
- renewal failure rate,
- halted subscriptions,
- upgrade frequency,
- downgrade frequency,
- webhook failures,
- webhook duplicates,
- entitlement activation failures,
- reconciliation mismatches,
- unauthorized billing requests.

---

# 86. CUSTOMER BILLING PAGE

The account billing page should include:

Current plan.

Billing interval.

Current status.

Current billing cycle.

Next billing date.

Cancellation state.

Cancellation effective date.

Upgrade options.

Downgrade options.

Cancel button.

Payment history.

Subscribe again after cancellation.

Do not create a customer-support dependency.

---

# 87. PAYMENT RECEIPTS

Where Razorpay provides customer notifications/receipts, use the supported Razorpay functionality rather than building card/payment infrastructure yourself.

The application may also display its own invoice/payment history.

Do not claim payment success until authoritative confirmation.

---

# 88. REFUND POLICY IMPLEMENTATION

The application must not present refunds as a normal customer feature.

Do not:

- display "Request Refund",
- create refund forms,
- automatically refund cancellations,
- refund downgrades,
- refund unused subscription time,
- calculate prorated refunds in application code.

For standard cancellation:

No refund.

Cancellation means:

stop future renewal.

Keep benefits until the end of the current paid cycle.

Razorpay itself provides refund functionality for merchants where refunds are actually required, but this application's normal UX must not expose that functionality.

If a legally mandatory or provider-required refund/reversal occurs outside the normal UX, reconcile it through administrative/provider events.

---

# 89. NO AUTO-REFUND ON CANCELLATION

Calling:

Cancel Subscription

must never automatically call:

Refund Payment.

The correct operation is:

cancel_at_cycle_end = true.

Not:

refund = true.

---

# 90. NO IMMEDIATE PLAN LOSS ON NORMAL CANCELLATION

When the customer cancels:

Paid plan remains active until the billing cycle end.

Only future renewal is cancelled.

This minimizes refund-related complexity and preserves the value of the already-paid period.

---

# 91. RAZORPAY SUBSCRIPTION STATE AUTHORITY

The local state is an application projection.

Razorpay is authoritative for Razorpay Subscription/payment state.

The application is authoritative for:

- which internal user owns the subscription,
- feature entitlements,
- application authorization.

The system must continuously reconcile both.

---

# 92. PRODUCTION SECURITY

Before going live:

- Test keys removed from production.
- Live keys stored in secure secret storage.
- Webhook secret stored securely.
- HTTPS enforced.
- Authentication verified.
- Authorization verified.
- Rate limiting active.
- Database backups verified.
- Logs sanitized.
- Monitoring active.
- Webhook endpoint protected.
- Production domain configured.
- Razorpay live subscription plans verified.
- Correct live plan IDs configured.
- No automatic custom charging code exists outside Razorpay.
- No public secret exists in frontend.

---

# 93. TEST MODE

The supplied Test credentials must be used first.

Do NOT perform production billing during development.

Test:

- creation,
- authorization,
- first payment,
- recurring payment,
- cancellation,
- renewal failure,
- subscription states,
- webhooks,
- duplicate events,
- upgrade/downgrade behavior.

Use current Razorpay Test Mode capabilities and official test instructions.

---

# 94. LIVE MIGRATION

Do not copy Test subscription IDs into production.

Production must use:

- Live Razorpay Key ID.
- Live Razorpay Key Secret.
- Live Webhook Secret.
- Live Razorpay Plan IDs.

Test and Live objects must be separate.

---

# 95. SOURCE CONTROL

Before completion:

Scan entire repository for:

- `rzp_test_`
- `rzp_live_`
- Razorpay secrets.
- webhook secrets.
- `.env` files.
- credentials accidentally committed.

Remove credentials from tracked files.

Use secret management.

---

# 96. CODE REVIEW

After implementation:

Perform a payment-specific security review.

Look for:

- trust of client-side plan.
- trust of client-side price.
- trust of client-side subscription status.
- missing authorization.
- missing ownership verification.
- duplicate webhook handling.
- race conditions.
- stale-event handling.
- duplicate subscriptions.
- incorrect cancellation semantics.
- improper plan changes.
- refund side effects.
- frontend secret leakage.
- missing database constraints.
- missing transactions.

---

# 97. DO NOT CLAIM PERFECT SECURITY

Do not state:

"100% secure."

Instead:

Identify concrete threats.

Demonstrate which controls mitigate them.

Execute tests.

Report results honestly.

If something could not be tested because Razorpay Test Mode does not support a specific scenario:

state it explicitly.

Do not fabricate test results.

---

# 98. DO NOT MODIFY UNRELATED APPLICATION FUNCTIONALITY

Do not rewrite:

- authentication,
- AI system,
- existing UI,
- unrelated APIs,
- database architecture,
- unrelated business logic.

Only modify areas required to integrate subscription billing and authorization correctly.

Preserve backward compatibility.

---

# 99. FINAL ARCHITECTURE

The final architecture should conceptually be:

Customer

↓

Next.js Pricing Page

↓

Authenticated Java Billing API

↓

Server-Side Plan Catalog

↓

Razorpay Subscription API

↓

Razorpay Checkout / Authorization

↓

Razorpay Subscription

↓

Automatic Recurring Charge

↓

Razorpay Webhooks

↓

Java Webhook Processor

↓

Database Transaction

↓

Payment Record

↓

Subscription Record

↓

Entitlement Record

↓

Backend Authorization

↓

Next.js UI

Cancellation path:

Customer

↓

Billing Page

↓

Cancel Subscription

↓

Java Backend

↓

Razorpay:

`cancel_at_cycle_end = true`

↓

Cancellation Scheduled

↓

Current benefits remain active

↓

No next automatic renewal

↓

Cycle Ends

↓

Razorpay Subscription Cancelled

↓

Webhook

↓

Backend reconciliation

↓

Entitlement becomes FREE

↓

Customer may subscribe again manually

---

# 100. CRITICAL PAYMENT INVARIANTS

The final system must preserve all of these:

INVARIANT 1:

No verified successful subscription/payment → no paid entitlement.

INVARIANT 2:

One Razorpay subscription belongs to exactly one internal account.

INVARIANT 3:

One Razorpay subscription must never activate the wrong user.

INVARIANT 4:

Browser state cannot grant paid access.

INVARIANT 5:

Browser state cannot cancel another user's subscription.

INVARIANT 6:

One webhook event can produce at most one business transition.

INVARIANT 7:

One recurring payment can produce at most one payment record.

INVARIANT 8:

Cancelled subscriptions cannot continue generating application entitlements.

INVARIANT 9:

Cancellation stops future renewals.

INVARIANT 10:

Normal cancellation does not automatically refund the customer.

INVARIANT 11:

Paid access remains active until the paid period ends after normal cycle-end cancellation.

INVARIANT 12:

After the paid entitlement expires, paid API access is denied.

INVARIANT 13:

No accidental duplicate active subscriptions.

INVARIANT 14:

No automatic custom charges outside Razorpay.

INVARIANT 15:

Razorpay Key Secret never reaches the browser.

INVARIANT 16:

Webhook Secret never reaches the browser.

INVARIANT 17:

Historical payments remain auditable.

INVARIANT 18:

Older events cannot overwrite newer authoritative state.

INVARIANT 19:

Concurrent requests cannot create duplicate subscriptions or entitlements.

INVARIANT 20:

A downgrade must not accidentally create a refund because the application does not offer routine refunds.

---

# 101. DELIVERABLES

After implementation provide:

1. Complete list of modified files.
2. New files.
3. Database migrations.
4. New environment variables.
5. Razorpay Dashboard configuration.
6. Razorpay Plan IDs required.
7. Subscription webhook events configured.
8. API endpoints created.
9. Database constraints added.
10. State machines.
11. Cancellation behavior.
12. Upgrade behavior.
13. Downgrade behavior.
14. Automatic renewal behavior.
15. Payment failure behavior.
16. Security controls.
17. Test cases.
18. Test results.
19. Remaining risks.
20. Known limitations.
21. Production deployment checklist.
22. Live-key migration procedure.
23. Rollback procedure.

---

# 102. FINAL ACCEPTANCE CRITERIA

Do not report completion until all of the following are true:

A Free user can subscribe to Plus Monthly.

A Free user can subscribe to Plus Yearly.

A Free user can subscribe to Pro Monthly.

A Free user can subscribe to Pro Yearly.

The correct Razorpay plan is used for every case.

The initial payment is verified.

The correct entitlement is activated.

Recurring billing occurs through Razorpay.

A successful recurring payment extends the correct entitlement.

A failed recurring payment follows Razorpay's documented subscription lifecycle.

A customer can cancel directly inside the platform.

Cancellation stops future automatic renewal.

Cancellation does not automatically refund the customer.

The current paid period remains active after normal cycle-end cancellation.

The account becomes Free after paid access ends.

A cancelled subscription does not continue renewing.

A cancelled subscription can be replaced with a new subscription when the customer chooses to subscribe again.

Plus → Pro works safely.

Pro → Plus is handled without unintended refund.

Monthly → Yearly works safely.

Yearly → Monthly works safely.

Duplicate purchase attempts do not create uncontrolled duplicate subscriptions.

Duplicate webhook events do not duplicate payments or entitlement.

Frontend manipulation cannot grant Pro.

Frontend manipulation cannot change price.

Frontend manipulation cannot cancel another user's subscription.

Invalid webhook signatures are rejected.

Secrets never reach the browser.

Historical payment records remain intact.

Concurrency tests pass.

Security tests pass.

Reconciliation tests pass.

The existing application remains functional.

Never claim completion without actually running the relevant tests.