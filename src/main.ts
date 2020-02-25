import * as core from '@actions/core'
import * as github from '@actions/github'
import {WebhookPayload} from '@actions/github/lib/interfaces'

interface PullRequestWebhookPayload extends WebhookPayload {
  pull_request?: {
    number: number
    html_url?: string
    body?: string

    milestone?: string
    base: {
      ref: string
    }
    head: {
      ref: string
    }
  }
}

async function run(): Promise<void> {
  try {
    const pullRequest = (github.context.payload as PullRequestWebhookPayload)
      .pull_request
    if (!pullRequest) {
      return
    }

    if (!pullRequest.milestone) {
      core.setFailed('Missing milestone in the pull request')
      return
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
