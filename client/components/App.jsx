import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import List from './List'
import AddPost from './AddPost'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts:[
        {title: 'This is an amazing website!',
        message: 'I wish this site worked.',
        comments:[ ]
        }
      ],
    }
    this.addPost = this.addPost.bind(this)
    this.addComment = this.addComment.bind(this)
  }



addPost(post) {

  const newPosts = [].concat(this.state.posts)
  newPosts.push(post)
  this.setState({
    posts: newPosts
    })

  }

  addComment (title, comment) {
    let position



    for (let i = 0; i <this.state.posts.length; i++){
      if (this.state.posts[i].title === title){
        position = i
      }
    }
      const newPosts = [].concat(this.state.posts)
      newPosts[position].comments.push(comment)
      console.log(newPosts )
      this.setState({
        posts: newPosts
      })
  }



render() {
  return (
<Router>
  <div>
    <List list = {this.state.posts} addComment={this.addComment} />
    <AddPost addPost = {this.addPost} />

  </div>
   </Router>

    )
  }
}
export default App
