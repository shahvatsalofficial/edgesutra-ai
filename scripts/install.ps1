param([Parameter(Mandatory=$true)][string]$IDE,[Parameter(Mandatory=$true)][string]$Project)
node packages/cli/index.mjs install --ide $IDE --project $Project
