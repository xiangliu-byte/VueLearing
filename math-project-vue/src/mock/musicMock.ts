// src/mock/musicMock.ts
import { MockMethod } from 'vite-plugin-mock' // 导入类型，支持 TS 提示
import Mock from 'mockjs'                     // 导入 Mock.js 生成假数据

export default [
  {
    url: '/api/music/ranking', // 虚拟接口地址（组件中请求该地址）
    method: 'get',             // 请求方法（GET）
    response: () => {
      // 用 Mock.js 生成假数据（模拟“礼堂金曲”列表）
      const musicList = Mock.mock({
        'data|5-8': [ // 生成 5 ~ 8 条数据
          {
            'id|+1': 1, // 排名（自增：1、2、3...）
            'logoText': 'YYDZ', // 固定标识文本
            'author': '珍珠-@cname', // 作者（格式：珍珠-随机中文名）
            'songName': '@pick(["《I got hevxi》", "《礼堂回忆》", "《青春序曲》"])', // 随机选歌曲名
            'date': '@date("yyyy-MM-dd")', // 随机日期（格式：年-月-日）
          }
        ],
        'code': 200, // 接口成功状态码
        'message': 'success', // 接口提示信息
      })
      return musicList // 返回假数据，模拟接口响应
    },
  },
] as MockMethod[]