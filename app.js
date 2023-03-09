//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; // Where we store the new composed posts, aka the data.

// when a browser is making a get request to the home route, which is localhost:3000 or ("/")
app.get("/", function (req, res) {
  // the function here is a callback function, which has a request and response
  // we will use the render() express method and send to the user the /views/home.ejs page
  res.render("home", { homeStartingContent: homeStartingContent, posts: posts });
  // the { homeStartingContent(key): homeStartingContent(value) } comes from line 8 and line 3 in home.ejs
  // the key has to match with the varName in the home.ejs, because that is the variable that we want to pass over
  // the value has to match with the varName from this file, line 7
});
// same as above
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});
// same as above
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});
// same as above
app.get("/compose", function (req, res) {
  res.render("compose");
});
// the input in the compose.ejs file has a name of composeText. The input is wrapped in a form that has a method of POST, and action /compose
// when a user is typing something and clicks submit button, we can catch the info with req.body.postTitle
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,/* we take it from the compose.ejs */
    content: req.body.postBody,/* we take it from the compose.ejs */
  };
  posts.push(post); /*We add the new post to the posts array */
  res.redirect("/"); /* once the publish button is clicked when the user composed new post, he will be redirected to the home route which is "/" */
})


app.get("/posts/:postName", function (req, res) { /*when the user types in the URL /posts/NameOfThePost */
  const requestedTitle = _.lowerCase(req.params.postName); /* We saved the inserted in the URL postName in a variable */

  posts.forEach(function (post) { /* Where posts is the name of the array // and post is the name of each object */
    const storedTitle = _.lowerCase(post.title); /* we store the key name title of each object in a variable */

    if (requestedTitle === storedTitle) {
      res.render("post", { title: post.title, content: post.content });
    }
  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
