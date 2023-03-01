const express = require('express');
const ExpressError = require('./expressError')

const app = express();






app.get("/mean", (req, res, next) => {

    let nums = req.query.nums;
    let numsArrayString = nums.split(',');
    let numsArray = checkArray(numsArrayString);
       
    let numValue = 0;

    try {

        if (!nums || !numsArray) {
            throw new ExpressError("invalid set of numbers", 401)
        }else {

               
            numValue = mean(numsArray);
            return res.json({ operation: "mean", value : numValue });

        }
      
    } catch (e) {
        
      next(e)
    }
  
  })


  app.get("/median", (req, res, next) => {

    let nums = req.query.nums;
    let numsArrayString = nums.split(',');
    let numsArray = checkArray(numsArrayString);
       
    let numValue = 0;

    try {

        if (!nums || !numsArray) {
            throw new ExpressError("invalid set of numbers", 401)
        }else {

               
            numValue = median(numsArray);
            return res.json({ operation: "median", value : numValue });

        }
      
    } catch (e) {
      next(e)
    }
  
  })


  app.get("/mode", (req, res, next) => {

    let nums = req.query.nums;
    let numsArrayString = nums.split(',');
    let numsArray = checkArray(numsArrayString);
       
    let numValue = 0;

    try {

        if (!nums || !numsArray) {
            throw new ExpressError("invalid set of numbers", 401)
        }else {

               
            numValue = mode(numsArray);
            return res.json({ operation: "mode", value : numValue });

        }
      
    } catch (e) {
      next(e)
    }
  
  })


  app.get("/all", (req, res, next) => {

    let nums = req.query.nums;
    let numsArrayString = nums.split(',');
    let numsArray = checkArray(numsArrayString);
       
    let numValueMean = 0;
    let numValueMedian = 0;
    let numValueMode = 0;

    try {

        if (!nums || !numsArray) {
            throw new ExpressError("invalid set of numbers", 401)
        }else {

               
            numValueMean = mean(numsArray);
            numValueMedian = median(numsArray);
            numValueMode = mode(numsArray);
            return res.json(
                { operation: "all", 
                mean : numValueMean,
                median : numValueMedian,
                mode : numValueMode}
            )

        }
      
    } catch (e) {
      next(e)
    }
  
  })










  function checkArray(arr){

    let numsArray = [];

    for (let num of arr){

       
        
        if(Number.isInteger(parseInt(num))){
            numsArray.push(parseInt(num));
           
        }else{
            return false;
            break;
        }

    }


    return numsArray;



  }


  function mean(arr){

    let numTotal = 0;
    let numMean = 0;
                
                
    for (let nums of arr){
        
        numTotal += nums;
        
    }


    numMean = numTotal / arr.length;

    return numMean



  }



  function median(arr) {
    if (arr.length == 0) {
      return; // 0.
    }
    arr.sort((a, b) => a - b); // 1.
    const midpoint = Math.floor(arr.length / 2); // 2.
    const median = arr.length % 2 === 1 ?
      arr[midpoint] : // 3.1. If odd length, just take midpoint
      (arr[midpoint - 1] + arr[midpoint]) / 2; // 3.2. If even length, take median of midpoints
    return median;
  }


  function mode(arr){
    if (arr.length == 0) {
        return; // 0.
      }
    arr.sort((a, b) => a - b);

    let streak = 1;
    let element = arr[0];
    
    let currentStreak = 1;
    let currentElement = arr[0];


    for (let i = 1; i < arr.length ; i++)
    {
        if (arr[i-1] !== arr[i]){

            if (currentStreak > streak){
                streak = currentStreak;
                element = currentElement;
            }

            currentElement = arr[i];
            currentStreak = 0;


        }

        currentStreak++;
    }

    if (streak > currentStreak){

        return element;
    }else{

        return currentElement;
    }

  }



// If no other route matches, respond with a 404
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
  })
  
  
  // Error handler
  app.use(function (err, req, res, next) { //Note the 4 parameters!
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;
  
    // set the status and alert the user
    return res.status(status).json({
      error: { message, status }
    });
  });
  
  app.listen(3000, () => {
    console.log("Server running on port 3000")
  });
  
  