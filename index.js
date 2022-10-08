const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `credential` ans `pullRequestWords` inputs defined in action metadata file
  const credential = core.getInput('credential');
  const pullRequestWords = core.getInput('pullRequestWords');
  console.log(`Hello ${credential}!`);
  console.log(`Hello ${pullRequestWords}!`);
  
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}