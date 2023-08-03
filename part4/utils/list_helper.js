const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.reduce((likesAccumulator, blog) => likesAccumulator + blog.likes, 0)
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'none'
  } else if (blogs.length === 1) {
    return [{
      _id: blogs[0]._id,
      title: blogs[0].title,
      author: blogs[0].author,
      url: blogs[0].url,
      likes: blogs[0].likes,
      __v: blogs[0].__v,
    }]
  } else {
    const maxLikesBlog = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
    return {
      title: maxLikesBlog.title,
      author: maxLikesBlog.author,
      likes: maxLikesBlog.likes
    }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
