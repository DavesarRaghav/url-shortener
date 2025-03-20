const express=require("express");
const {handleGenerateNewShortURL}= require("../cantrollers/url");

const router =express.Router();

router.post("/",handleGenerateNewShortURL);

module.exports = router;