const ignore = () => {
  const extensions = ['.css', '.scss', '.less', '.png', '.jpg', '.gif']; // 服务端渲染不加载的文件类型
  for (let i = 0, len = extensions.length; i < len; i++) {
    require.extensions[extensions[i]] = () => {
      return false;
    };
  }
};
module.exports = ignore;
