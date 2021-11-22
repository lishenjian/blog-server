const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const querystring = require('querystring');

const getPostData = (req) => {
  return new Promise((resolve, reject)=>{
    console.log(req.method);
    console.log(req);
    if(req.method !== 'POST') {
      resolve({});
      return ;
    }
    if(req.headers['content-type'] !== 'application/json') {
      resolve({})
      return ;
    }

    let postData = '';
    req.on('data', chunk=>{
      postData += chunk.toString()
    })

    req.on('end', ()=>{
      if(!postData) {
        resolve({})
        return ;
      }
      resolve(JSON.parse(postData))
    })

  })
}

const serverHandle = (req, res)=>{
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json');

  // 获取 path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query
  req.query = querystring.parse(url.split('?')[1]);

  getPostData(req).then(postData=>{
    console.log(postData)
    req.body = postData;

    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res);
    if(blogData) {
      return res.end(JSON.stringify(blogData))
    }

    //处理 user 路由
    const userData = handleUserRouter(req, res);
    console.log(blogData);
    if(userData) {
      return res.end(JSON.stringify(userData))
    }

    //未命中路由返回404
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 Not Found\n")
    res.end();

  })

  
}

module.exports = serverHandle