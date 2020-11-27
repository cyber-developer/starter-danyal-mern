const express = require('express');
const router = express.Router();
const {check,validationResult} =require('express-validator')
const auth=require('../../middleware/auth');
const Post =require('../../models/Post');
const User =require('../../models/User');
const Profile=require('../../models/Profile');

// post api/post create a post private

router.post('/',[auth,[
  check('text','Text is required')
  .not().
  isEmpty()
]],async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    })

    const post = await newPost.save();
    res.json(post);
    

    } catch (error) {
        console.log(error.message);
        req.status(500).send('server error');
    }
    
});

// get api/posts get all post private

  router.get('/',auth,async(req,res) => {
      try {
          const posts = await Post.find().sort({date:-1});
          res.json(posts);
      } catch (error) {
          console.log(error.message);
          res.status(500).send('server error');
      }
  });

  //get api/posts/:id get post by id
   router.get('/:id',auth,async(req,res) => {
       try {
           const post = await Post.findById(req.params.id);
            
           if(!post){
               return res.status(404).json({msg:'post not found'});
           }
        res.json(post);

       } catch (error) {
         if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'post not found'});
         }
         console.log(error.message);
         res.status(500).send('server error');
       }
   });

   //delete api/post/:id delete post private

   router.delete('/:id',auth,async (req,res) => {
       try {
        const post = await Post.findById(req.params.id);
        
        //check post
        if(!post){
            return res.status(404).json({msg:'post not found'})
        }

        //check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg:'user not authorized'})
        }
        
        await post.remove();

        res.json({msg:'post removed'})

       } catch (error) {
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:'post not found'});}
        console.log(error.message);
        res.status(500).send('server error');
       }
   });

   // put api/post/likes/:id like a post private

   router.put('/like/:id',auth,async (req,res)=>{
       try {
           const post =await Post.findById(req.params.id);

           //check if post alraedy like

           if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
               return res.status(400).json({msg:'post already liked'})
           }

           post.likes.unshift({user:req.user.id});

           await post.save();

           res.json(post.likes);
       } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
       
       }
   });

   // put api/post/unlikes/:id like a post private

   router.put('/unlike/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if post alraedy like

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:'post not yet liked'})
        }

        //get remove index

        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex,1);

        await post.save();

        res.json(post.likes);
    } catch (error) {
     console.log(error.message);
     res.status(500).send('server error');
    
    }
});

// post api/post create a comment private

router.post('/comment/:id',[auth,[
  check('text','Text is required')
  .not().
  isEmpty()
]],async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post= await Post.findById(req.params.id);

        const newComment = {
          text:req.body.text,
          name:user.name,
          avatar:user.avatar,
          user:req.user.id
    }
    
    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
    

    } catch (error) {
        console.log(error.message);
        req.status(500).send('server error');
    }
    
});

//delete api/posts/comments/:id/comment_id delete comment

 router.delete('/comment/:id/:comment_id',auth,async (req,res)=>{
     try {
         const post = await Post.findById(req.params.id);

         //pull comment
         const comment = post.comments.find(comment => comment.id === req.params.comment_id);

         // comment exist

         if(!comment){
             return res.status(404).send({msg:"comment not exist"})
         }

         // check user 
         if(comment.user.toString() !== req.user.id){
            return res.status(401).send({msg:"user not authorized"})
         }
         
         //get remove index

        const removeIndex=post.comments.map(comments=>comments.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex,1);

        await post.save();

        res.json(post.comments);

     } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
     }
 })



module.exports=router;