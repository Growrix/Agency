# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: commerce-admin.spec.ts >> admin login page renders
- Location: tests\e2e\commerce-admin.spec.ts:18:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://127.0.0.1:5000/admin/login", waiting until "load"

```

```
Error: browserContext.close: Test ended.
Browser logs:

<launching> C:\Users\User\AppData\Local\ms-playwright\webkit-2272\Playwright.exe --inspector-pipe --disable-accelerated-compositing --headless --no-startup-window
<launched> pid=15796
[pid=15796] <gracefully close start>
```