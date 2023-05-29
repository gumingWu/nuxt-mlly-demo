import { pathToFileURL, fileURLToPath } from 'node:url'
import { resolve, resolvePath, createResolve, resolveImports } from 'mlly'

/**
 * Error: Cannot find module avite imported from
 * file:///D:/project/nuxt-mlly-demo/src/index.ts,
 * file:///D:/project/nuxt-mlly-demo/src/,
 * file:///D:/project/nuxt-mlly-demo/src/index.ts/_index.js,
 * file:///D:/project/nuxt-mlly-demo/src/node_modules
 */
(async () => {
  // async function loadKit() {
  //   const localKit = await resolvePath('@nuxt/kit', { url: import.meta.url })
  //   console.log({localKit}) // 尝试在本地寻找@nuxt/kit

  //   const rootURL = localKit ? import.meta.url : await resolvePath('nuxt', { url: import.meta.url })
  //   console.log({rootURL})  // 如果本地有，则以本地路径为基准，如果没有，则以nuxt路径为基准

  //   const finalKitPath = await resolvePath('@nuxt/kit', rootURL)
  //   console.log({finalKitPath}) // 最终确定的@nuxt/kit的路径

  //   return await import(pathToFileURL(finalKitPath).href) // 动态导入@nuxt/kit
  // }

  // const { loadNuxt } = await loadKit()
  // console.log(loadNuxt) // 这里就是动态导入了@nuxt/kit中的其中一个方法

  async function loadKitFromNuxt() {
    const nuxtPath = await resolvePath('nuxt', { url: import.meta.url })
    console.log({ nuxtPath }) // 确认nuxt路径

    const kitPath = await resolvePath('@nuxt/kit', { url: nuxtPath })
    console.log({ kitPath }) // 从nuxt中找出@nuxt/kit路径

    return await import(pathToFileURL(kitPath).href) // 动态导入@nuxt/kit
  }
  const { loadNuxt } = await loadKitFromNuxt()
  console.log(loadNuxt) // 这里就是动态导入了@nuxt/kit中的其中一个方法
})()
