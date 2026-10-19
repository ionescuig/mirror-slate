---
name: tdd
description: >-
  Vertical red-green tests for mirror-slate behaviour. Use this skill from the
  slice skill when you add or change behaviour, or when the human asks for tests.
---

# Tests

A test tells what the glass does. Call the public function or the HTTP response. Do not call a private helper.

## Loop

Test one behaviour at a time. Do not write the full suite first.

1. Write one test. Run the test. The test fails because the behaviour is missing.
2. Write the smallest code that makes the test pass.
3. Run that test again. Then test the next behaviour.

Delete a test that fails only because a private name changed. The glass behaviour did not change. Write a test for the behaviour.

## What gets a test

- Map a Google Tasks payload to rows. Include an empty list.
- Map a calendar payload to rows. Include no events.
- A list control selects a different list.
- Weather shows today and the next five days. A failed weather request does not invent numbers.
- The glass HTML does not contain the token or the secret.

Do not test a CSS class name. Check the look in the browser against [`DESIGN.md`](../../../DESIGN.md).

## Runner

Run the command in [`quality-gates.md`](../../../docs/infrastructure/quality-gates.md). If that file has no command, add a `test` script in this slice. Write the command in that file before the first test.
