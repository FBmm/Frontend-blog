# Git项目管理操作


## Git如何将老仓库的分支同步到另一个仓库

在项目迁移的过程，可能会有将老仓库的分支同步到新分支的情况，下面来介绍流程

- 首先，我们在本地仓库同时关联老仓库与新仓库的远端仓库
  - git add remote <repo_name> <repo_url>
  - 此时要注意最好是在关联新仓库的本地仓库都添加老的远端仓库
  - 测试命令：git add remote origin_old git@github.com:FBmm/Frontend-blog.git
- 将老仓库的更新记录拉取到本地
  - git fetch origin_old
- 在本地创建要同步的分支
  - git checkout -b <branch_name>
  - 测试命令：git checkout -b test
- 合并老仓库的test分支至本都
  - git pull origin_old test --allow-unrelated-histories
  - 这里合并的时候可能会报错，需要加 --allow-unrelated-histories 命令允许不同仓库分支的合并
- 合并老仓库分支到本地后解决冲突
- 最后通过push命令提交记录到新仓库
  - git push origin test