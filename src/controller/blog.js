const getList = (author, keyword)=>{
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      creatTime: 12345325,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      creatTime: 53524513252,
      author: 'lisi'
    }
  ]
}

const getDetail = (id)=>{
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    creatTime: 12345325,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3,
    title: '标题C',
    content: '内容C',
    creatTime: 23252522,
    author: 'lisi'
  }
}

const updataBlog = (id, blogData={})=>{

  return true
}

const delBlog = (id)=>{
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updataBlog,
  delBlog
}