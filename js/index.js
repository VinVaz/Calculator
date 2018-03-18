//$(document).ready(function() {
	
     var display = document.getElementById("displayScreen");
	 var headerDisplay = document.getElementById("screenHeader");
	 var resultDisplay = document.getElementById("screenResultDisplay");
	 resultDisplay.innerHTML = "0";
	 
	 
	// this function save all the values pressed to show them together in the screen
	  var screenMemory = "";
	  var countInput = 0;
	  function sendToScreen(string){
        countInput++;
        if(countInput <= 10){		
		screenMemory += string;
		}
		display.innerHTML = screenMemory;
	  }
	  countInput = 0;
	//all the functions triggered by buttons
	  function screenDelete(){
		var lastPosition = screenMemory.length - 1;
		screenMemory = screenMemory.slice(0, lastPosition);
		display.innerHTML = screenMemory;
	  }    
	  function showResultOnScreen(){
		//reduce the size of the number so it can fit on the screen
		if(screenMemory.length>10) screenMemory.slice(0, 10);
		resultDisplay.innerHTML = eval(screenMemory);
	  }
	(function(){
	   pi = "3.1415";	
	})();
	
	function myPow(x, y){
		var result = 1;
		for(var i=0; i<y; i++){
			result *= x;
		}
	return result;	
	}
	//create a sin function 
	function sin(x){
		var signal = -1;
		var y = 0;
		var sumCount = 0;
		var factorialCount = 1;
		var factorial = 1;
		var sum = 0;
		var power = 0;
		
		for(var i=0; i<20; i++){
		   power = (2*i+1);
		   signal *= -1;
			for(var j=0; j<power; j++){
				factorial *= factorialCount;  
				factorialCount++;
			}
			y = myPow(x, power);
			sumCount = signal * y / factorial;
			sum += sumCount;
			var factorialCount = 1;
		    var factorial = 1;
		}
		 return sum;
	   }
	//end of the function   
	
    var Ans = 0;	
	function toAnsMemory(){
		Ans = eval(screenMemory);
		screenMemory = "";	
	}	
	
	
    //section intended to sinalize if the shift button is active or not
	  var shiftActive = false;
	  function turnShiftOn(){
		shiftActive = true;
		headerDisplay.innerHTML = "shift";
	  }
	  function turnShiftOff(){
		shiftActive = false;
		headerDisplay.innerHTML = "";
	  }
	  document.getElementById("shiftButton").onclick = function(){
		if(shiftActive==false) turnShiftOn();    
	    else if(shiftActive==true) turnShiftOff();
	  };
	  
	//function to simplify the process of evaluate the buttons with their correspondent string value
	  function valueBtn(id, val){
		document.getElementById(id).onclick = function(){
	    sendToScreen(val);
		turnShiftOff();
	  };
	}	
	//buttons that display their values on the screen when pressed
	//the function will receive as the first value the button's id
	//as the second value the string that represents that button
	  valueBtn("oneButton", "1");
	  valueBtn("twoButton", "2");
	  valueBtn("threeButton", "3");
	  valueBtn("fourButton", "4");
	  valueBtn("fiveButton", "5");
	  valueBtn("sixButton", "6");
	  valueBtn("sevenButton", "7");
	  valueBtn("eightButton", "8");
	  valueBtn("nineButton", "9");
	  valueBtn("zeroButton", "0");
	  valueBtn("pointButton", ".");
	  valueBtn("leftBracketButton", "(");
	  valueBtn("rightBracketButton", ")");
	  valueBtn("logButton", "log(");
	  valueBtn("additionButton", "+");
	  valueBtn("subtractionButton", "-");
	  valueBtn("divisionButton", "/");
	  valueBtn("multiplicationButton", "*");
	  valueBtn("ansButton", "Ans");
	  
	  //function to simplify the process of give the buttons their values triggered after the shift
	function valueBtnAfterShift(id, valShiftOff, valShiftOn){
		document.getElementById(id).onclick = function(){
			if(shiftActive==true) sendToScreen(valShiftOn);
			else if(shiftActive==false) sendToScreen(valShiftOff);
			turnShiftOff();
	    };
	}
	// buttons that are triggered by the shift button
	  valueBtnAfterShift("expButton", "", "pi");
	  valueBtnAfterShift("sinButton", "sin(", "arcsin(");
	  valueBtnAfterShift("cosButton", "cos(", "arccos(");
	  valueBtnAfterShift("tanButton", "tan(", "arctan(");
	  valueBtnAfterShift("lnButton", "ln(", "e^(");
	  valueBtnAfterShift("invertButton", "^(-1)", "!");
	  valueBtnAfterShift("powerOfButton", "^(", "SQR(");

	// buttons that do not represent characters set on the screen
	document.getElementById("acButton").onclick = function(){
		
		    if(shiftActive==true){
				display.innerHTML = "";
				headerDisplay.innerHTML = "";
				resultDisplay.innerHTML = "";
			}
			else if(shiftActive==false){
				display.innerHTML = "";
				screenMemory = "";
				resultDisplay.innerHTML = "0";
			}        
    };
	document.getElementById("deleteButton").onclick = function(){
	    screenDelete();
	};		
	document.getElementById("resultButton").onclick = function(){
		showResultOnScreen();
		toAnsMemory();
		display.innerHTML = "";
		turnShiftOff();
	};
	
	//}); 