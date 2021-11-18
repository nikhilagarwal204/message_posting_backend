const express = require("express");
const router = express.Router();
var jwt_decode = require("jwt-decode");
const User = require("../model/Userschema");
const Message = require("../model/Message");
require("../db/conn");

router.post("/messages", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const { message } = req.body;
    if (!message || !token) {
      res.json({ error: "Message or Token is missing" });
    } else {
      var decoded = jwt_decode(token);
      const user_post = await User.findOne({ Email: decoded.Email });
      if (user_post.Role === true) {
        if (message.length > 255)
          res.status(400).json({
            error: "Sorry Cant Add a Message. Your message is too long",
          });
        else {
          const message_post = new Message({ message: message });
          await message_post.save();
          res.status(200).json({ success: "Successful Added Message" });
        }
      } else {
        res.status(400).json({ error: "Sorry Can't Add a Message. You Are not a Admin" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/messages", (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const startindex = (page - 1) * limit;
  var listmessages = [];
  if (page > 0) {
    Message.find()
      .limit(Number(limit))
      .skip(startindex)
      .then((foundone) => {
        foundone.map((messageobject) => {
          listmessages.push(messageobject.message);
        });
        res.json(listmessages);
      });
  } else {
    res.send("No Such Page Exists");
  }
});

router.put("/messages/:id", async (req, res) => {
  const token = req.headers["x-access-token"];
  const { id } = req.params;
  const { message } = req.body;
  try {
    if (!token) {
      res.status(400).send("Token Missing");
    }
    var decoded = jwt_decode(token);
    const edit_user = await User.findOne({ Email: decoded.Email });
    if (edit_user.Role === true) {
      if (!(await Message.findOne({ _id: id }))) {
        res.status(400).json({ error: "This Message Does Not Exist" });
      } else {
        Message.findOneAndUpdate(
          { _id: id },
          { message: message },
          { upsert: true },
          function (err, doc) {
            console.log(err,doc);
          }
        );
        res.status(200).json({ success: "Message got edited" });
      }
    } else {
      res.status(400).json({ error: "Sorry Can't Edit a Message. You Are not a Admin" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/messages/:id", async (req, res) => {
  const token = req.headers["x-access-token"];
  const { id } = req.params;
  try {
    if (!token) {
      res.status(400).send("Token Missing");
    } else {
      var decoded = jwt_decode(token);
      const user_post = await User.findOne({ Email: decoded.Email });
      if (user_post.Role === true) {
        await Message.deleteOne({ _id: id });
        res.status(200).json({ success: "Successful Deleted This Message" });
      } else {
        res.status(400).json({ error: "Sorry Can't Delete a Message. You Are not a Admin" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
