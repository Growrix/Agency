# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: commerce-admin.spec.ts >> admin login page renders
- Location: tests\e2e\commerce-admin.spec.ts:18:5

# Error details

```
Test timeout of 45000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - main [ref=e3]:
    - generic [ref=e6]:
      - paragraph [ref=e7]: Protected access
      - heading "Admin sign in" [level=1] [ref=e8]
      - paragraph [ref=e9]: Use the configured admin credentials from the environment to access inquiries, appointments, orders, and analytics.
      - generic [ref=e10]:
        - generic [ref=e11]:
          - text: Email
          - textbox "Email" [ref=e12]:
            - /placeholder: admin@company.com
        - generic [ref=e13]:
          - text: Password
          - textbox "Password" [ref=e14]:
            - /placeholder: ••••••••
        - button "Sign in" [ref=e15]
  - button "Open Next.js Dev Tools" [ref=e21] [cursor=pointer]:
    - img [ref=e22]
```