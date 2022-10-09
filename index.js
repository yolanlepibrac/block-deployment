const core = require('@actions/core');
const github = require('@actions/github');

async function main(){
    try {
        // `credential` ans `pullRequestWords` inputs defined in action metadata file
        const token = core.getInput('github-token');
        const prName = core.getInput('pr-name');
        console.log(`Check if a PR exists with the word ${prName}`);
      
        const buildNeedToBeCancelled = "true";
        core.setOutput("cancel_build", buildNeedToBeCancelled);
        console.log(`Build need to be cancelled ${buildNeedToBeCancelled}`);
      
      
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
      
        const octokit = github.getOctokit(token)
        const result = await octokit.rest.pulls.list({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          state: "open"
        })
      
        console.log(result)
      
      } catch (error) {
        core.setFailed(error.message);
      }
}

main();
