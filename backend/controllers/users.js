import { createError } from "../utils/error.js";
import User from "../models/Users.js";
import Video from "../models/Video.js"

export const update = async (req, res , next) =>{
    if(req.params.id === req.user.id){
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new : true});
            res.status(200).json(updateUser);
        }catch(err){
            return next(createError(403 , "couldnt update"));
        }
        
    }else{
        return next(createError(403, "you can update only your account"));
    }
} 


export const deleteUser = async (req, res , next) =>{
    if(req.params.id === req.user.id){
        try{
            const deleteUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user has been deleted");
        }catch(err){
            return next(createError(403 , "couldnt delete"));
        }
        
    }else{
        return next(createError(403, "you can delete only your account"));
    }
} 

export const getUser = async(req, res , next) =>{
    try{
        const user = await User.findById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            return next(createError(404 , "user not found"));
        }
    }catch(err){
        return next(createError(err));
    }
    
}


export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  // console.log("req.user:", req.user);
  // console.log("params:", req.params);
  const id = req.user.id;
  const videoId = req.params.videoId;
  
  try {
    const video = await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
   
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};