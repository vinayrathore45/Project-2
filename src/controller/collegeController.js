const mongoose = require("mongoose");
const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");

const isValid = function (value) {
    if (typeof (value) === "undefined" || typeof (value) === null) return false;
    if (typeof (value) === "string" && value.trim().length === 0) return false;
    if (typeof (value) != "string") return false;
    return true
}



const createCollege = async function (req, res) {
    try {
        let data = req.body;
        const validlogolink = /(http|https(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/
        .test(data.logoLink)




       
        if (!isValid(data.name)) return res.status(400).send({ status: false, message: "name is required" })
        if (!data.name) return res.status(400).send({ status: false, message: "name is required" });
        const validateName = await CollegeModel.findOne({ name: data.name })
        if (validateName) return res.status(400).send({ status: false, message: "name must be unique" })


        if (!isValid(data.fullName)) return res.status(400).send({ status: false, message: "fullName is required" })
        if (!data.fullName) return res.status(400).send({ status: false, message: "fullname is required" });

        if (!data.logoLink) return res.status(400).send({ status: false, message: "logolink is required" });
        if (!validlogolink) return res.status(400).send({ status: false, message: "logolink is invalid" });

        const createCollegeData = await CollegeModel.create(data)
        res.status(201).send({ status: true, message: createCollegeData })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}


// GET /functionup/collegeDetails
// Returns the college details for the requested college (Expect a query parameter by the name collegeName. This is anabbreviated college name. For example iith)
// Returns the list of all interns who have applied for internship at this college.
// The response structure should look like this
// Testing
// To test these apis create a new collection in Postman named Project 2 Internship
// Each api should have a new request in this collection
// Each request in the collection should be rightly named. Eg Create college, Get college details etc
// Each member of each team should have their tests in running state



const getAllCollegessWithInterns = async function (req, res) {
    try {
        let data = req.query;
        let fullName = data.fullName;
        let collegeName = data.name
        const collegeData = await CollegeModel.findOne({name :collegeName, isDeleted : false})
      if  (!collegeData) return res.status(404).send({status: false, message : "no college found"})
        fullName = collegeData.fullName;
        const filterCollege = {
            name :collegeData.name,
            fullName:collegeData.fullName,
            logoLink:collegeData.logoLink
        }
        const collegeId = collegeData._id
       const getInterns = await InternModel.find()
       console.log(getInterns)
      
       if(getInterns.length!=0) {
        filterCollege.intrest = getInterns
        res.status(200).send({status : true , data: filterCollege})
       }
    //    console.log(getInterns)
       if(getInterns.length == 0) return res.status(400).send({status : false ,message :"no interns found."})
    }catch(err){
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createCollege = createCollege;
module.exports.getAllCollegessWithInterns = getAllCollegessWithInterns