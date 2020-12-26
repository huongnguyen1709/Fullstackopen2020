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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}