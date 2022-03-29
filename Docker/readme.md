# Docker 文档

## docker 实例
### docker 安装 nginx

##### 运行容器

```shell
docker run -d -p 80:80  \
              -p 443:443  \
 --name nginx-name \
 -v /opt/docker/nginx/html:/usr/share/nginx/html \
 -v /opt/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
 -v /opt/docker/nginx/conf/conf.d:/etc/nginx/conf.d \
 -v /opt/docker/nginx/logs:/var/log/nginx \
 -v /opt/docker/nginx/cert:/etc/nginx/cert \
 nginx 
```
