const core = require('@actions/core');
const github = require('@actions/github');

async function main(){
    try {
        const token = core.getInput('github-token');
        const prName = core.getInput('pr-name');
        console.log(`Check if a PR exists with the word ${prName}`);
      
        // Get the JSON webhook payload for the event that triggered the workflow
        // const payload = JSON.stringify(github.context.payload)
      
        const octokit = github.getOctokit(token)
        const listPrResult = await octokit.rest.pulls.list({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          state: "open"
        })

        const buildNeedToBeCancelled = listPrResult.data.find((pr) => pr.title.includes(prName))
        const output = buildNeedToBeCancelled ? "true" : "false"
      
        core.setOutput("cancel_build", output);
        console.log(`Build need to be cancelled: "${output}"`);
      
      } catch (error) {
        core.setFailed(error.message);
      }
}

main();
