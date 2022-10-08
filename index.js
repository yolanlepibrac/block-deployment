const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `credential` ans `pullRequestWords` inputs defined in action metadata file
  const prName = core.getInput('pr-name');
  console.log(`Check if a PR exists with the word ${prName}`);

  const buildNeedToBeCancelled = "true";
  core.setOutput(" cancel-build", buildNeedToBeCancelled);
  console.log(`Build need to be cancelled ${buildNeedToBeCancelled}`);


  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}