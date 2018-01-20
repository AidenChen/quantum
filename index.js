const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

function start (options) {
  // 环境变量声明
  process.env.QUANTUM_BASE_DIR = options.baseDir

  const app = new Koa()
  app.use(bodyParser())

  // 加载配置
  exports.config = require('./lib/load_config')

  // 加载数据库连接
  require('./lib/load_connection').load(exports)

  // 加载模型
  require('./lib/load_model').load()

  // 加载中间件
  require('./lib/load_middleware').load(exports, app)

  // 加载控制器
  require('./lib/load_controller').load(app)

  // 开启服务
  app.listen(3000, function () {
    console.log('Listening: ' + 3000)
  })
}

module.exports.Database = require('mongoose')

module.exports.Router = require('./lib/base/router')

module.exports.Error = require('./lib/base/error')

module.exports.start = start
