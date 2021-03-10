var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')


var comments = [
  {
    name: '张三',
    message: '你好',
    date: '2020.02.02'
  },
  {
    name: '张三2',
    message: '你好',
    date: '2020.02.02'
  },
  {
    name: '张三3',
    message: '你好',
    date: '2020.02.02'
  },
  {
    name: '张三4',
    message: '你好',
    date: '2020.02.02'
  },
  {
    name: '张三5',
    message: '你好',
    date: '2020.02.02'
  }
]
/*
* HTML 文件放到 views中
* 静态资源存放在 public 中
* */

http.createServer((req,res) => {
  //true： query 转为对象，方便操作
  var parseObj = url.parse(req.url,true)
  var pathname = parseObj.pathname
  if (pathname === '/') {
    fs.readFile('./views/index.html',(err,data) => {
      if (err) {
        return res.end('404 Not Found.');
      }
      var htmlStr = template.render(data.toString(),{
        comments: comments
      })
      res.end(htmlStr)
    })
  }else if (pathname === '/post') {
    fs.readFile('./views/post.html',(err,data) => {
      if (err) {
        return res.end('404 Not Found.');
      }
      res.end(data)
    })
  }else if (pathname === '/pinglun') {
    //获取 query 对象，添加时间属性，插入到 comments 数组中
    var comment = parseObj.query
    comment.date = '2020.08.08'
    comments.unshift(comment)
    //服务端重定向
    /*
    * 状态码设置为 302 临时重定向
    *  statusCode
    * 在响应头中通过 Location 告诉客户端往哪重定向
    *   SetHeader
    * 最后需要结束响应
    * */
    res.statusCode = 302
    res.setHeader('Location','/')
    res.end()
  }else if (pathname.indexOf('/public') !== -1) {
    fs.readFile('.' + pathname,(err,data) => {
      if (err) {
        return res.end('404 Not Found.');
      }
      res.end(data)
    })
  }else {
    fs.readFile('./views/404.html',(err,data) => {
      if (err) {
        return res.end('404 Not Found.');
      }
      res.end(data)
    })
  }

}).listen(3000,() => {
  console.log('running...');
})