  
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const router = require("express").Router();

// Requiring our Workout and Index models

const db = require("../models");

// Routes
// =============================================================


// getLastWorkout() GET /api/workouts
router.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// addExercise() PUT /api/workouts/:id
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

// createWorkout() POST /api/workouts
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



// getWorkoutsInRange() /api/workouts/range
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