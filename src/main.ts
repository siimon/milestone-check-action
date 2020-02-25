import * as core from '@actions/core'
import * as github from '@actions/github'
import { WebhookPayload } from '@actions/github/lib/interfaces';

interface PullRequestWebhookPayload extends WebhookPayload {
  // eslint-disable-next-line camelcase
  pull_request?: {
    [key: string]: any;
    number: number;
    // eslint-disable-next-line camelcase
    html_url?: string;
    body?: string;

    milestone?: string;
    base: {
      ref: string;
    },
    head: {
      ref: string;
    },
  },
}

async function run(): Promise<void> {
  try {
    const pullRequest = (github.context.payload as PullRequestWebhookPayload).pull_request
    if(!pullRequest) {
      core.setFailed("Missing pull request data")
      return
    }

    if(!pullRequest.milestone) {
      core.setFailed("Missing milestone in the pull request")
      return
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
