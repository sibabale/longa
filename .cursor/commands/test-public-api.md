Write tests for this component using public API principles only.

Testing philosophy:

- Test only what a real user can see or interact with.
- Interact through rendered output (text, roles, labels, inputs, buttons).
- Never access internal state or private functions.
- Never test implementation details.
- Do not snapshot internal structure.

Stable testing attribute rule:

- Each interactive or important component MUST include a unique, stable testing attribute.
- Use `data-testid` (or `data-test` if already standardized in the codebase).
- This attribute must NEVER depend on styling, layout, or dynamic content.
- It must be semantic and stable (e.g. data-testid="login-submit-button").
- Do NOT use CSS classes for selection.
- Do NOT use DOM structure selectors.

Interaction rules:

- Use realistic user interactions (click, type, submit).
- Prefer accessibility queries first (getByRole, getByLabelText).
- Use the test attribute only when:
  - The element has no accessible role
  - The text is dynamic
  - The UI is duplicated
  - Precision is required

Focus on:

- Rendering correctness
- User interactions
- Accessibility roles
- Visible side effects
- Error states
- Loading states

If something cannot be tested through the public API, do not test it.
