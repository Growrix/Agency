# Contribution Guide

## Purpose

This document defines how contributors should work inside the Growrix OS repository.

## Contribution Principles

- Start from the docs.
- Keep changes scoped to the owning module.
- Preserve business invariants.
- Prefer small, reviewable pull requests.

## Expected Workflow

1. Read the relevant docs in `DOC/`.
2. Identify the owning module and affected entities.
3. Implement the smallest coherent vertical slice.
4. Add or update tests.
5. Update docs if behavior, data, or contracts changed.

## Pull Request Expectations

- clear summary of the change
- affected modules and roles
- test evidence
- notable risks or follow-up work
- documentation updates where applicable

## Review Expectations

- reviewers prioritize correctness over stylistic debate
- business rule, auth, and data-boundary issues are blocking
- unresolved ambiguity should be clarified in docs, not hidden in code comments