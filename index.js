const express = require("express");

const{ connectToMongoDB }=require ("./connect");
const urlRoute =require("./routers/url");
 const URL = require("./models/url");
const app=express();
const PORT =8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("Mongodb connected"));

app.use(express.json());

app.use("/url",urlRoute);

app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    
    // Fix: Store the result of findOneAndUpdate in entry
    const entry = await URL.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});

  

app.listen(PORT, () =>console.log(`Server Started at PORT:${PORT}`));