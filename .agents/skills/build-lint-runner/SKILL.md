---
name: angular-build-lint-runner
version: 1.1.0
description: Automates Angular build and lint checks within the development environment, returning parsed results for agentic evaluation.
author: User/System
tags: [angular, build, lint, validation, vscode, agent-skill]
capabilities: [terminal-execution, workspace-read]
---

# Angular Build & Lint Automation Skill

## Description
This skill executes Angular `build` or `lint` commands directly within the Visual Studio Code integrated terminal or background task runner. It is designed for agentic workflows, providing immediate feedback on code quality, structural integrity, and compilation errors. Instead of simply dumping raw logs, it parses the output to give the agent structured data on warnings and errors.

## Inputs

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `type` | String | **Yes** | `null` | The specific check to run. Valid options are `"build"` or `"lint"`. |
| `flags` | String | No | `""` | Additional CLI arguments (e.g., `--configuration production`, `--fix`). |
| `cwd` | String | No | `"./"` | The relative path to the Angular workspace root if not at the top level. |

## Outputs

| Field | Type | Description |
| :--- | :--- | :--- |
| `status` | String | `"success"` if the command exits with code 0, `"failure"` otherwise. |
| `errorCount` | Integer | The total number of compilation errors or linting violations found. |
| `warningCount`| Integer | The total number of warnings generated during execution. |
| `parsedIssues`| Array | A structured list of the top issues found (File path, Line number, Message). |
| `rawOutput` | String | The complete, unedited standard output (stdout/stderr) from the terminal execution. |

## Execution Logic
1. **Validation:** Verify that the `type` is either `"build"` or `"lint"`.
2. **Path Resolution:** Navigate to the specified `cwd` (defaults to workspace root) and verify the presence of `angular.json` and `package.json`.
3. **Command Construction:** Compose the execution string: `npm run <type> -- <flags>`. 
4. **Execution:** Run the command headlessly or via the VS Code terminal API.
5. **Output Parsing:** - Capture the exit code.
   - Scan the `stdout`/`stderr` using regex patterns specific to Angular compiler (`NG\d+`) and ESLint outputs to count errors and warnings.
6. **Response Generation:** Package the parsed metrics, status, and raw logs into the standardized output JSON.

## Prerequisites
- **System:** `npm` (or `yarn`/`pnpm`) and the Angular CLI (`@angular/cli`) must be installed and accessible in the system PATH.
- **Project:** The target directory must be a valid Angular workspace.
- **Scripts:** `build` and `lint` must be defined within the project's `package.json` scripts block.

## Example Usage

### Input
```json
{
  "type": "lint",
  "flags": "--fix",
  "cwd": "./frontend"
}