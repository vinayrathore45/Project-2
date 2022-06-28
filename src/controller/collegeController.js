const  mongoose  = require("mongoose");
const CollegeModel = require("../models/collegeModel");




const createCollege = async function(req,res){
    const validlogolink = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(data.logoLink)



let data = req.body;
if(! data.name)return res.status(400).send({status: false ,message:"name is required"});

if(! data.fullName)return res.status(400).send({status: false ,message:"fullname is required"});
if(! data.logoLink)return res.status(400).send({status: false ,message:"logolink is required"});
if(!validlogolink)return res.status(400).send({status: false ,message:"logolink is invalid"});

const createCollegeData = await CollegeModel.create(data)
res.status(201).send({status: true , message:createCollegeData})

}



module.exports.createCollege = createCollege