# block-deployment
This action provide a way to cancel other actions if an open PR has a certain name in you repo

## Inputs

## `pr-name`

Word tha will be recognize in you PR to block the actions. Default `"cancel-build"`.

## `github-token`

**Required** Your github authentication token (`${{ secrets.GITHUB_TOKEN }}`)

## Outputs

## `cancel_build`

Return "true" if an open PR contain the pr-name input, and "false" if not

## Example usage

name: Continuous Integration

on:
  push:
    branches-ignore:
      - master
      - production

jobs:
  block_release_if_hot_fixing:
    runs-on: ubuntu-latest
    name: Cancel the staging build
    outputs:
      cancel_build: ${{ steps.cancelBuild.outputs.cancel_build }}
    steps:
      - name: Cancel workflow if PR is named cancel-build
        id: cancelBuild
        uses: yolanlepibrac/block-deployment@v2.1
        with:
          pr-name: 'cancel-build'
          github-token: ${{ secrets.GITHUB_TOKEN }}

  log_something:
    runs-on: ubuntu-latest
    needs: [block_release_if_hot_fixing]
    if: needs.block_release_if_hot_fixing.outputs.cancel_build == 'false'
    steps:
      - name: the rest jobs
        run: echo "run the rest jobs"