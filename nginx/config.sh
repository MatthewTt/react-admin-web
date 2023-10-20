#!/bin/sh -e

cat >> /etc/nginx/conf.d/default.conf <<EOF

server {
  listen 80;
  # gzip 压缩，减少带宽
  gzip on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_comp_level 2;
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_vary off;
  gzip_disable "MSIE [1-6]\.";

  # 代理超时时间 10分钟
  proxy_read_timeout 600;

  location / {
    # 允许跨域访问
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
    # 如果是 html 文件，不缓存
    if (\$request_filename ~* .*\.(?:htm|html)$) {
      add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    }
    root /data/www/;
    index index.html;
  }
}

EOF

echo "starting web server"
# 希望在开发或调试环境查看nginx日志，可使用这个命令
nginx -g "daemon off;"
