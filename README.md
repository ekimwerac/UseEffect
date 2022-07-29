# LogRocket Blog

<https://blog.logrocket.com/guide-to-react-useeffect-hook/>

To clone all branches, git clone --mirror <URL>
  then need to convert a bare repository to a working repository. ...

To convert a --bare repository to a non-bare:

Make a .git folder in the top-level of your repository.
Move the repository management things (HEAD branches config description hooks info objects refs etc.) into the .git you just created.
Run git config --local --bool core.bare false to convert the local git-repository to non-bare.
(via comment by Tamás Pap) After step #3 you will see that you are on branch master (or whichever your main branch is) and all your files are deleted and the deletion is staged. That's normal. Just manually checkout master, or do a git reset --hard, and you are done.
(to resolve issue reported by Royi) Edit .git/config file adding line fetch = +refs/heads/*:refs/remotes/origin/* after url = <...> in [remote "origin"] section. Otherwise git fetch will not see origin/master and other origin's branches.
