#git workflow

### 1. make sure local is up to date
`git pull remote-name master`
* `remote-name` is probably `origin`, or else whatever you want to name it

### 2. creating a new branch:
`git checkout -b branch-name`
* `branch-name` should be something semantic.  at the very least, your name
* run `git branch` to make sure youre on the right branch now

### 3. work like normal, we'll figure out merges later
* make sure you're pushing to `git push remote-name branch-name`
* or I'll straight up murder you.
	