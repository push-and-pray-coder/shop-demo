# Development Guidelines

## 1. Development Methodology

- **Approach:** Agile development using Kanban.
- **Work breakdown:** Deliver functionality in small, independently testable vertical slices.
- **Work tracking:** Jira is the source of truth for work items and their statuses.
- **Version control:** Git and GitHub.

## 2. Kanban Workflow

Work items progress through the following statuses:

1. **Backlog** — Work identified but not yet prioritized.
2. **Ready** — Work prioritized and ready to begin.
3. **In Progress** — Work currently being implemented.
4. **Review/Test** — Work undergoing code review and testing.
5. **Done** — Work meets the Definition of Done.

Work should follow this sequence unless an appropriate exception applies.

## 3. Work Item Guidelines

- **Epics:** Group related functionality.
- **Stories:** Describe functionality from the user's perspective.
- **Tasks:** Track technical work.
- **Bugs:** Track defects requiring investigation or follow-up.
- **Subtasks:** Break work items into smaller implementation tasks.

Stories should include a description and acceptance criteria.

## 4. Development Workflow

1. Select a Ready work item in Jira.
2. Create a Git branch for the work.
3. Implement the functionality.
4. Test the changes against the acceptance criteria.
5. Review the code and open a pull request.
6. Merge approved changes into the main branch.
7. Update the Jira work item and move it to Done when completion requirements are met.

## 5. Definition of Done

A work item is Done when:

- All acceptance criteria are satisfied.
- Relevant tests pass.
- Code has been reviewed.
- No known blocking defects remain.
- Changes are merged into the main branch.
- Relevant documentation is updated.

For this solo project, code review is performed through self-review unless another reviewer is available.

## 6. Testing

- Test functionality as it is implemented.
- Verify frontend and backend communication when applicable.
- Test relevant error cases.
- Run the available automated tests before merging changes.
- Record defects requiring follow-up in Jira.

## 7. General Practices

- Keep changes focused on the selected work item.
- Use descriptive Git branch names and commit messages.
- Avoid including unrelated changes in a pull request.
- Update documentation when implementation or setup procedures change.
