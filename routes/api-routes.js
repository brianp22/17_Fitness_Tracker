const router = require("express").Router();
const db = require("../models");

router.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/workouts/:id', (req, res) => {
  const exercise = req.body;
  db.Workout.findByIdAndUpdate(req.params.id,{
    $push: {
      exercises:exercise
    }
  })
    .then((results) => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        errors: err.errors,
      });
    });
});

router.post('/workouts', (req, res) => {
  const workout = req.body;
  db.Workout.create(workout)
    .then((results) => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        errors: err.errors,
      });
    });
});


router.get("/workouts/range", (req, res) => {
  db.Workout
  .find({})
  .sort({day: -1})  
  .limit(7)
  .exec(function(err,docs){
      console.log(docs)
      res.json(docs)
  })
});


module.exports = router;