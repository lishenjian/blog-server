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

const server = http.createServer((req,res)=>{
  if(req.method == 'POST') {
    console.log('content-type:', req.headers['content-type']);
    let postData = '';
    req.on('data', chunk=>{
      postData += chunk.toString();
    })
    req.on('end', ()=>{
      console.log('postData', postData);
      res.end(postData)
    })
  }
})


server.listen(8000)
console.log('ok');