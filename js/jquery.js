var playing = false;
var score;
var trialsLeft;
var fruits = ["apple","banana","cherries","grapes","mango","orange","peach","pear","watermelon"];
var bad = ["bomb","brick"];
var step,step2;
var action,action2; // used for setinterval
var badThingSpeed = 5;
var fruitSpeed = 3;
$(document).ready(function(){
   
    
    // click on start reset button
    $("#startreset").click(function(){

    // are we playing
    if(playing == true){

        // reload page
        location.reload();
    }else{

        // we are not playing
        playing = true; // game initiated
        score = 0; // set score to 0
        $("#scoreValue").html(score);

        // show trials left
        $("#trialsLeft").show();
        trialsLeft =3;
        addHearts();

        // hide game over box
        $("#gameover").hide();

         // change button text to reset game
        $("#startreset").html("Reset Game");

        // start sending fruits
        startAction();
        
    
        // start sending bad things
        startAction2();
    }
});
 // IF YOU HIT ANY FRUIT
    $("#fruit1").mouseover(function(){
        score++;
        switch(score){
            case 10: fruitSpeed = 5;
            break;  
            case 15: badThingSpeed = 7;
            break;    
        }
        $("#scoreValue").html(score); // update score
//        document.getElementById("slicesound").play();
        $("#slicesound")[0].play(); // play sound
        
        // stop fruit 
       clearInterval(action);
        
       // hide fruit with animation
        $("#fruit1").hide("explode",500); // slice fruit
        
        // send new fruit
        setTimeout(startAction,500);
    });
    
// IF YOU HIT BAD THING     
    $("#bad").mouseover(function(){
        // is it a brick?
        if($("#bad").attr("src") =="images/brick.png"){
        score--;
        $("#scoreValue").html(score); // update score
        $("#bricksound")[0].play(); // play sound
         // stop bad things 
       clearInterval(action2);
       clearInterval(action);
        
       // hide bad thing with animation
        $("#bad").hide("explode",250); // slice brick
        
        // send new bad things
        setTimeout(startAction2,500);   
        setTimeout(startAction,500);   
            
        }else{  // if not will be a bomb
         $("#bad").css({
             "height" : "100px",
             "width" : "100px"
         });
         $("#bad").attr("src","images/bomb_explosion.gif");
         $("#bombsound")[0].play(); // play sound       
         score--;
         $("#scoreValue").html(score); // update score    
        
            
     // check if we have trials left
             if(trialsLeft > 1){
        // reduce trials by one
                trialsLeft--; 
        // populate trialsLeft box
                addHearts(); 
        
            
           // stop bomb action 
       clearInterval(action2);  
       clearInterval(action);  
        setTimeout(startAction2,200);  
        setTimeout(startAction,200);  
                 
             }else{  // game over
                    playing = false; // we are not playing anymore
                   $("#startreset").html("Start Game"); // change button to Start Game
                   $("#gameover").show().html("<p>game over!</br>your score is " + score + ".</p>");
                   $("#trialsLeft").hide();
                   stopAction();   
                   stopAction2();
                 }
        }
    });
// FUNCTIONS:
function addHearts(){
    // empty trials heart box content before adding
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
                $("#trialsLeft").append('<img src="images/heart.png " class="life">');
            }
}

// start sending fruits
function startAction(){
    // generate fruit, choose a random fruit,random position, generate a random step
    generateFruitStepRand();
    
    // Move fruit down by one step every 10ms 
    action = setInterval(function(){
        
        // move fruit by one step
        $("#fruit1").css('top',$("#fruit1").position().top + step);
        
        // check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
                // check if we have trials left
             if(trialsLeft > 1){
                // generate fruit, choose a random fruit,random position, generate a random step
                generateFruitStepRand();
                
                // reduce trials by one
                trialsLeft--; 
                 
                // populate trialsLeft box
                addHearts(); 
              }else{  // game over
                    playing = false; // we are not playing anymore
                   $("#startreset").html("Start Game"); // change button to Start Game
                   $("#gameover").show().html("<p>game over!</br>your score is " + score + ".</p>");
                   $("#trialsLeft").hide();
                   stopAction();    
                   stopAction2();
                 }
            
                               }
    }, 10); 
}

// this action everything about bad thing
function startAction2(){
    // generate bad thing, choose a random bad thing,random position, generate a random step
    generateBadThingStepRand();
    
    
    // Move Bad thing down
    
    action2 = setInterval(function(){
        // move bad thing by one step
        $("#bad").css('top',$("#bad").position().top + step2);
        if($("#bad").position().top > $("#fruitsContainer").height()){   
        generateBadThingStepRand();
    }
    },12);
}    

// generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src','images/' + fruits[
        Math.round(8*Math.random())
    ] + '.png');
}

// choose a random bad thing
function chooseBadThing(){
    $("#bad").attr('src','images/' + bad[
        Math.round(1*Math.random())
    ] + '.png');
}    
function generateFruitStepRand(){
    // generate fruit
    $("#fruit1").show();
    chooseFruit(); // choose a random fruit
    // random position
    $("#fruit1").css({
        'left' : Math.round(550 * Math.random()),
        'top' : -50
    });
    
    // generate a random step
    step = 1 + Math.round(fruitSpeed * Math.random()); // change step
}
    
function generateBadThingStepRand(){
    // generate fruit
    $("#bad").show();
    chooseBadThing(); // choose a random bad thing
    // random position
    $("#bad").css({
        'left' : Math.round(550 * Math.random()),
        'top' : -50
    });
    
    // generate a random step
    step2 = 1 + Math.round(badThingSpeed* Math.random()); // change step
}
// Stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
// Stop dropping bad things
function stopAction2(){
    clearInterval(action2);
    $("#bad").hide();
}    
});