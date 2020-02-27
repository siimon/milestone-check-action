<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Milestone check action

This action makes sure a milestone is added to a pull request. If there isn't any, the check fails. However it is a shame that there isn't a `milestoned` event for pull requests so there is not good way to hook this event up.

A best effort config file would look something like this, 

```
name: 'Milestone check'
on: 
  pull_request:
    types: [opened, synchronize, reopened, edited, ready_for_review]
  pull_request_review:
    types: [submitted]
  pull_request_review_comment:
    types: [created]
  push:

jobs:
  check-milestone:
    runs-on: ubuntu-latest
    steps:
      - uses: siimon/milestone-check-action@releases/v2
```

