const express = require('express');
const Mock  = require('mockjs')
const app = express();
const Random = Mock.Random


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 获取文章列表
app.get('/posts', (req, res) => {
    let posts_data = [];
    for(let i=0;i<100;i++){
        posts_data.push(
            Mock.mock({
                id: i+1,
                title: Random.cparagraph(1),
                content: Random.cparagraph(2,5),
                author: Random.cname(),
                time: Random.datetime('yyyy-MM-dd hh:mm:ss'),
                'like|1-1000': 1
            })
        )
    }

    // 获取当前页数  以及 每页展示的条数
    let perPageNumber = Number(req.query.perPageNumber ? req.query.perPageNumber : 10);
    let currentPage = Number(req.query.currentPage ? req.query.currentPage : 1);
    let totalPage = Math.ceil(posts_data.length/perPageNumber)

    // 模拟数据库操作 limit 截取数组中对应的数据
    let start = (currentPage-1)*perPageNumber
    let end = perPageNumber*(currentPage) <= posts_data.length ? perPageNumber*(currentPage): posts_data.length
    posts_data = posts_data.slice(start, end )

    res.json({ content: posts_data, currentPage, totalPage })

})

// 端口
app.listen(3001, () => {
    console.log('Server port : 3001')
})