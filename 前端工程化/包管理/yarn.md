# Yarn

## 为什么使用 Yarn

核心优点

> 快速、可靠、安全的依赖管理工具。

- 快速：缓存下载的包，再次使用时无需重新下载；并行下载，安装速度更快。
- 可靠：使用算法校验每个安装包的完整性。
- 可靠：使用详细、简洁的锁文件格式和明确安装算法，能保证在不同系统上无差异工作。

其他优势：

- 离线模式：已安装过的包再次安装时无需联网。
- 确实性：不管安装顺序如何，相同的依赖关系在每台机器以相同方式安装。
- 相同的软件包：？
- 网络弹性：重试机制确保单个请求失败不会导致整个安装失败。
- 扁平模式：将依赖包的不同版本归结为单个版本，避免创建多个副本。

## 命令

- yarn init 初始化 package.json
  
- yarn / yarn install 安装依赖
  
- yarn add 添加依赖
    - yarn add <package>
        安装依赖到 dependencies ，运行时代码依赖
    - yarn add <package> [--dev/-D]
        安装依赖到 devDependencies，开发环境工具，运行时代码不依赖
    - yarn add <package> [--peer/-P]
        安装依赖到 peerDependencies
    - yarn add <package> [--optional/-O]
        安装依赖到 optionalDependencies，可选依赖，安装失败时不会中断进程
    - yarn add <package> [--bundled/-B]
        安装依赖到 bundledDependencies，npm 注册表外的依赖
      
- yarn remove 删除依赖
