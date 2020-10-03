const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const accountData = require("../models/accountSchema");
const stat = require('../models/statSchema')
var q = ''

router.get("/account",(req,res) =>{
    accountData.find({}).sort({update_at: -1}).then(accounts =>{
        res.json(accounts);
    }).catch(err =>{
        res.json(err);
    });
});  
//透過_id查詢
router.get("/account/:id", (req, res) => {
  accountData.findById(req.params.id)
    .then(accounts => {
      res.json(accounts);
    })
    .catch(err => {
      res.json(err);
    });
});
//透過id查詢
// router.get("/account/:id", (req, res) => {
//   accountData.findOne({
//     "id":req.params.id
//   })
//     .then(accounts => {
//       res.json(accounts);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });
//利用_ID刪除
router.delete("/account/:id", (req, res) => {
    accountData.findOneAndRemove({
      _id: req.params.id
      //mongodb.ObjectID():req.params.id     
    })
      .then(accounts => res.send(`${accounts.id}删除成功`))
      .catch(err => res.json(err));
  });
  // router.delete("/account/:id", (req, res) => {
  //   accountData.findOneAndDelete({
  //     id: new mongodb.ObjectID(req.params.id)
  //     //mongodb.ObjectID():req.params.id     
  //   })
  //     .then(accounts => res.send(`${accounts.id}删除成功`))
  //     .catch(err => res.json(err));
  // });
//新增

  router.post("/account", (req, res) => {
    console.log("新增了一位使用者")
    console.log(req.body);
    accountData.create(req.body, (err, accounts) => {
      if (err) {
        res.json(err);
      } else {
        res.json(accounts);
      }
    });
  });
//更新
router.put("/account/:id", (req, res) => {
  accountData.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        department: req.body.department,
        employeeNumber: req.body.employeeNumber,
        employeeLimit: req.body.employeeLimit,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        lastLoginDate: req.body.lastLoginDate,
        lastLoginTime: req.body.lastLoginTime,
        firstLogin:req.body.firstLogin,
        favorite:req.body.favorite
      }
    },
    {
      new: true
    }
  )
    .then(accounts => res.json(accounts))
    .catch(err => res.json(err));
});

//更新
// router.updateLogin("/account/:id", (req, res) => {
//   console.log(req.body);
//   accountData.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         lastLoginDate: req.body.lastLoginDate,
//         lastLoginTime: req.body.lastLoginTime
//       }
//     },
//     {
//       new: true
//     }
//   )
//     .then(accounts => res.json(accounts))
//     .catch(err => res.json(err));
// });


//comment


router.get('/statistic', (req, res) => {
  // {companyID: req.params.companyID}
  stat.find()
    .sort({update_at: -1})
    .then(statistic => {
      res.json(statistic)
    }).catch(err => {
      console.log(2)
      res.json(err)
    })
})

router.get('/statistic/:time', (req, res) => {
  // {companyID: req.params.companyID}
  statisticRank.find({time: req.params.time})
    .sort({update_at: -1})
    .then(statistic => {
      res.json(statistic)
    }).catch(err => {
      console.log(2)
      res.json(err)
    })
})
// router.get('/competitionCommentList/:companyID', (req, res) => {
//   commentData.find({companyID: req.params.companyID})
//     .sort({update_at: -1})
//     .then(companies => {
//       res.json(companies)
//     }).catch(err => {
//       console.log(2)
//       res.json(err)
//     })
// })


// router.get('/competition/:collection', (req, res) => {
//   q = require('../models/' + req.params.collection + 'Schema')
//   q.find({companyID: {$ne: req.params.companyID}})
//     .sort({update_at: -1})
//     .then(companies => {
//       res.json(companies)
//     }).catch(err => {
//       console.log(2)
//       res.json(err)
//     })
// })

// router.put('/competition/:companyID', (req, res) => {
//   // console.log(req.body.favorite)
//   company.findOneAndUpdate(
//     { companyID: req.params.companyID },
//     {
//       $set: {
//         favorite: req.body.favorite
//       }
//     },
//     {
//       new: true
//     }
//   ).then(companies => {
//     res.json(companies)
//   }).catch(err => {
//     res.json(err)
//   })
// })

router.get('/comment/:collection', (req, res) => {
  q = require('../models/' + req.params.collection + 'Schema')
  q.find({})
    .limit(10)
    .sort({update_at: -1})
    .then(commentDatas => {
      res.json(commentDatas)
    }).catch(err => {
      console.log(2)
      res.json(err)
    })
})

router.put('/comment/:collection/:_id', (req, res) => {
  q = require('../models/' + req.params.collection + 'Schema')
  q.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        labels:{
          pos_neg: req.body.labels.pos_neg,
          food_drink: req.body.labels.food_drink,
          transportation: req.body.labels.transportation,
          service: req.body.labels.service,
          room: req.body.labels.room,
          amenities: req.body.labels.amenities,
          price: req.body.labels.price,
          view: req.body.labels.view,
          appearance: req.body.labels.appearance,
          condition: req.body.labels.condition,
          reply: req.body.labels.reply
        }
      }
    },
    {
      new: true
    }
  ).then(commentData => {
    res.json(commentData)
  }).catch(err => {
    res.json(err)
  })
})

router.get('/commentDetails/:collection/:_id', (req, res) => {
  q = require('../models/' + req.params.collection + 'Schema')
  q.findOne({
    _id: req.params._id
  })
    .then(commentDatas => {
      res.json(commentDatas)
    }).catch(err => {
      console.log(err)
      res.json(err)
    })
})
router.get('/competition/:collection', (req,res) => {
  stat.findOne({})
    .sort({update_at: -1})
    .then(companies => {
      res.json(companies)
    }).catch(err => {
      console.log(2)
      res.json(err)
    })
})
// router.put('/comment/' +q + ':_id', (req, res) => {
//   q = require('../models/' + req.params.collection + 'Schema')
//   q.findOneAndUpdate(
//     { _id: req.params._id },
//     {
//       $set: {
//         companyID: req.body.companyID,
//         commentID: req.body.commentID,
//         title: req.body.title,
//         content: req.body.content,
//         relateDep: req.body.relateDep,
//         condition: req.body.condition,
//         score: req.body.score,
//         reply: req.body.reply,
//         resource: req.body.resource,
//         tags: req.body.tags,
//         time: req.body.time
//       }
//     },
//     {
//       new: true
//     }
//   ).then(commentDatas => {
//     res.json(commentDatas)
//   }).catch(err => {
//     res.json(err)
//   })
// })

// router.get('/comment/:condition', (req, res) => {
//   commentData.findOne({
//     'condition': req.params.condition
//   })
//     .then(accounts => {
//       res.json(accounts)
//     }).catch(err => {
//       console.log(2)
//       res.json(err)
//     })
// })


module.exports = router; 
