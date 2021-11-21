const http = require('http');
const querystring = require('querystring');

// const server = http.createServer((req, res)=>{
//   //浏览器直接访问可以发起GET请求
//   console.log('method',req.method);
//   const url = req.url;
//   console.log('url', url);

//   req.query = querystring.parse(url.split('?')[1])
//   console.log('query', req.query);
//   res.end(JSON.stringify(req.query))
// })

// const server = http.createServer((req,res)=>{
//   if(req.method == 'POST') {
//     console.log('content-type:', req.headers['content-type']);
//     let postData = '';
//     req.on('data', chunk=>{
//       postData += chunk.toString();
//     })
//     req.on('end', ()=>{
//       console.log('postData', postData);
//       res.end(postData)
//     })
//   }
// })

const server = http.createServer((req,res)=>{
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);
  
  //设置返回格式
  res.setHeader('Content-type', 'application/json');
  const resData = {
    method,
    url,
    path,
    query
  }
  if(method == 'GET') {
    res.end(JSON.stringify(resData));
  }
  if(method == 'POST') {
    let reqData = '0';
    req.on('data', chunk=>{
      reqData += chunk.toString();
      resData.reqData = reqData;
    })

    req.on('end', ()=>{
      res.end(JSON.stringify(resData));
    })
  }
})


server.listen(8000)
console.log('ok');