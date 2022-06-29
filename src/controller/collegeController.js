const mongoose = require("mongoose");
const CollegeModel = require("../models/collegeModel");

const isValid = function (value) {
    if (typeof (value) === "undefined" || typeof (value) === null) return false;
    if (typeof (value) === "string" && value.trim().length === 0) return false;
    if (typeof (value) != "string") return false;
    return true
}



const createCollege = async function (req, res) {
    try {
        let data = req.body;
        const validlogolink = /(http|https(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
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



module.exports.createCollege = createCollege