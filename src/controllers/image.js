const path = require('path');
const ctrl =  {};
const {randomNumber} = require('../helpers/libs');
const fs = require ('fs-extra');
const { image } = require('../models/index');

ctrl.index = (req,res) =>{

};
ctrl.create =  (req,res) =>{ 
    const saveimage = async () =>{
        const imageURL = randomNumber();
        const images = await Image.find({filename: imageURL});
        if (images.length > 0){
            saveimage();
        } else{
            console.log(imageURL);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();  
            const targetPath = path.resolve(`src/public/upload/${imageURL}${ext}`)
            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
               await fs.rename(imageTempPath, targetPath);
             const newImg =  new image ({
                   title: req.body.title,
                   filename: imageURL + ext,
                   description: req.body.description
               });
               const imageSaved =  await newImg.save();
              // res.redirect('/images');
              res.send('works!');
            }
            else{
              await  fs.unlink(imageTempPath);
              res.status(500).json({error: 'Only images are allowed'});
            }
            res.send('works!');
        }
      
    };
    saveimage();
};

ctrl.like = (req,res) => {


};
ctrl.comment = (req,res) => {

};
ctrl.delete = (req,res) => {

};
module.exports = ctrl ;