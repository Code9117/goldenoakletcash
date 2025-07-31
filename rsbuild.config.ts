/*
 * @Author: bobo 18077592212@163.com
 * @Date: 2025-07-25 21:49:44
 * @LastEditors: bobo 18077592212@163.com
 * @LastEditTime: 2025-07-27 15:49:05
 * @FilePath: /clothing-h5-project/rsbuild.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    favicon: './public/favicon.ico',
  },
});
