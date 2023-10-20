# 由于使用的是PNPM 需要支持PNPM的镜像
FROM gplane/pnpm:latest as builder

# 设置工作目录
WORKDIR /data/web

# 利用缓存安装依赖
COPY pnpm-lock.yaml .
COPY package.json .

# 安装依赖
RUN pnpm install

# 拷贝源码
COPY . .

# 构建
RUN pnpm run build

# 上面构建完成后，会在镜像生成dist文件夹
# 把打包出来的资源放到nginx部署

FROM nginx:alpine as nginx

#设置时区
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

# 设置工作目录
WORKDIR /data/web

# 在nginx创建目录
RUN mkdir -p /data/www

# 拷贝dist文件夹到nginx
COPY --from=builder /data/web/dist /data/web

# 暴露端口 443 支持https
EXPOSE 80
EXPOSE 443

# 如果镜像中存在nginx配置，先删除
RUN rm -rf /etc/nginx/conf.d/default.conf
# 把项目里的脚本赋值到/root
COPY ./nginx/config.sh /root

RUN chmod +x /root/config.sh

# 镜像启动的时候运行脚本
CMD ["/root/config.sh"]
