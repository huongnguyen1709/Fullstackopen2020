var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.likes
    }, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => {
        return blog.likes
    })

    const mostLikes = likes.reduce((previousLikes, currentLikes) => {
        return currentLikes > previousLikes ? currentLikes : previousLikes
    }, 0)

    const favoriteBlog = blogs.find(blog => blog.likes === mostLikes)
    const blog = {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }

    return blog
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => { return blog.author })   
    let writtenAuthor = _.countBy(authors);

    const authorsNum = Object.entries(writtenAuthor);
    const mostBlogs = authorsNum.reduce((previousLikes, currentLikes) => {
        return currentLikes[1] > previousLikes ? currentLikes[1] : previousLikes
    }, 0)  

    const author = authorsNum.find(author => author[1] === mostBlogs) 
    const topAuthor = {
        author: author[0],
        blogs: author[1]
    }
    
    return topAuthor
}

const mostLikes = (blogs) => {
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}