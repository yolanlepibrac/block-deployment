# block-deployment
This action provide a way to cancel an other action if an open PR has a certain name in you repo

## Inputs

## `pr-name`

**Required** Word tha will be recognize in you PR to block the actions. Default `"cancel-build"`.

## Outputs

## `todo`

Todo

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
  block-deployment: 'Mona the Octocat'