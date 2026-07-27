# Task Template

## Task Title
- Objective:
- Subtasks:
  -
  -

## Dependencies
-

## Notes
-

Input: Design documents from /specs/[###-feature-name]/
Prerequisites: plan.md, research.md, data-model.md, contracts/

## Execution Flow (main)
```text
1. Load plan.md from the feature directory.
   -> If not found: ERROR "No implementation plan found"
   -> Extract tech stack, libraries, and structure.
2. Load optional design documents.
   -> data-model.md: extract entities into model tasks.
   -> contracts/: map each file to a contract test task.
   -> research.md: extract setup-impacting decisions.
3. Generate tasks by category.
   -> Setup
   -> Tests
   -> Core implementation
   -> Integration
   -> Polish
4. Apply task rules.
   -> Different files = parallel.
   -> Same file = sequential.
   -> Tests before implementation.
5. Number tasks sequentially.
6. Generate dependency graph.
7. Create parallel execution examples.
8. Validate completeness.
9. Return SUCCESS.
```

## Format: [ID] [P?] Description
- [P] means the task can run in parallel.
- Include exact file paths in descriptions.

## Path Conventions
- Single project: src/, tests/
- Web app: backend/src/, frontend/src/
- Mobile: api/src/, ios/src/, android/src/

## Phase 3.1: Setup
- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize project with required dependencies
- [ ] T003 [P] Configure linting and formatting tools

## Phase 3.2: Tests First (TDD)
- [ ] T004 [P] Contract test for first endpoint
- [ ] T005 [P] Contract test for second endpoint
- [ ] T006 [P] Integration test for primary user journey
- [ ] T007 [P] Integration test for auth or access flow

## Phase 3.3: Core Implementation
- [ ] T008 [P] Primary model implementation
- [ ] T009 [P] Primary service implementation
- [ ] T010 [P] CLI or handler implementation
- [ ] T011 Primary endpoint implementation
- [ ] T012 Secondary endpoint implementation
- [ ] T013 Input validation
- [ ] T014 Error handling and logging

## Phase 3.4: Integration
- [ ] T015 Connect service layer to storage
- [ ] T016 Auth or policy middleware
- [ ] T017 Request and response logging
- [ ] T018 Security hardening

## Phase 3.5: Polish
- [ ] T019 [P] Unit tests for validation logic
- [ ] T020 Performance tests
- [ ] T021 [P] Documentation updates
- [ ] T022 Remove duplication
- [ ] T023 Run manual validation flow

## Dependencies
- Tests before implementation.
- Model tasks before dependent service tasks.
- Middleware before security layering.
- Implementation before polish.

## Parallel Example
```text
Task: Contract test for endpoint A
Task: Contract test for endpoint B
Task: Integration test for primary journey
Task: Integration test for auth flow
```

## Task Generation Rules
1. Each contract file creates a contract test task and an implementation task.
2. Each entity creates a model task and possibly a service-layer task.
3. Each user story creates an integration test task.
4. Order tasks as setup, tests, models, services, endpoints, then polish.

## Validation Checklist
- [ ] All contracts have corresponding tests.
- [ ] All entities have model tasks.
- [ ] All tests come before implementation.
- [ ] Parallel tasks are independent.
- [ ] Each task specifies an exact file path.
- [ ] No parallel tasks modify the same file.