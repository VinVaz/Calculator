//$(document).ready(function() {
	
     var display = document.getElementById("displayScreen");
	 var headerDisplay = document.getElementById("screenHeader");
	 var resultDisplay = document.getElementById("screenResultDisplay");
	 
	 var calculatorIsOn = false;
	 var screenMemory = "";
	 var shiftIsOn = false;
	 
	 function initialState(){
		display.innerHTML = "";
	    headerDisplay.innerHTML = "";
		resultDisplay.innerHTML = "0";
		screenMemory = "";
	 }
    //start the calculator	
	document.getElementById("onButton").onclick = function(){
		initialState();
		calculatorIsOn = true;
		if(calculatorIsOn) runCalculator();
	};
	
function runCalculator(){

	//constants
	 var pi = Math.PI;
     var e = Math.E;	
	//functions
	 function sin(x){return Math.sin(x);}
	 function cos(x){return Math.cos(x);}
	 function tan(x){return Math.sin(x);}
	 function acos(x){return Math.acos(x);}
	 function asin(x){return Math.asin(x);}
	 function atan(x){return Math.atan(x);}
	 function exp(x){return Math.exp(x);}
	 function log(x){return Math.log10(x);}
	 function ln(x){return Math.log(x);}
	 function pow(x){return Math.pow(x);}
	 function SQR(x){return Math.sqrt(x);}
	 //function factorial(x){return Math.cos(x);}

	// this function save all the values pressed and then show them together in the screen
	  function sendToScreen(string){
		if(screenMemory.length<=9){
			screenMemory += string;
		    display.innerHTML = screenMemory;
		}	
	  }

	//represent all the functions that are triggered by simple buttons
	  function screenDelete(){
		var lastPosition = screenMemory.length - 1;
		screenMemory = screenMemory.slice(0, lastPosition);
		display.innerHTML = screenMemory;
	  }
	  
	  //limits the size of the output to a number with no more than 12 digits
	  function controlSizeOf(result){
		var resultRegex = /(\d+)(?:[.](\d+))?/;
        var decimalMaxLength = "";
		
		if(result%1 != 0){
			var resultArr = resultRegex.exec(result.toString());
			var integerOfResult = resultArr[1];
			var integerLength = integerOfResult.toString().length;
			  //controls the relation bettween the size of the integer and the decimal
			  if(integerLength <= 11) decimalMaxLength = 11 - integerLength;
			  else decimalMaxLength = 0;
			result = result.toFixed(decimalMaxLength);
			//remove the trailling zeros:
        	result = Number(result.toString().replace(/([.]\d*[1-9]+)[0]+(?!\d)/, '$1'));
            if(integerLength>11) result = result.toExponential(6);			
		}
		else if(result.toString().length>11) result = result.toExponential(6);
		return result;
	  }
	  
      	  
	  function showResultOnScreen(){
		var result = eval(screenMemory);
		result = controlSizeOf(result);
		//show the result on the display:	
		resultDisplay.innerHTML = result;
	  }
	  

	//define Ans features
    var Ans = 0;	
	function toAnsMemory(){
		Ans = eval(screenMemory);
		screenMemory = "";	
	}	
    //section intended to sinalize if the shift button is active or not
	  function turnShiftOn(){
		shiftIsOn = true;
		headerDisplay.innerHTML = "shift";
	  }
	  function turnShiftOff(){
		shiftIsOn = false;
		headerDisplay.innerHTML = "";
	  }
	  document.getElementById("shiftButton").onclick = function(){
		if(shiftIsOn) turnShiftOff();
	    else turnShiftOn();
	  }; 
	//function to simplify the process of evaluate the buttons with their correspondent string value
	  function valueBtn(id, val){
		document.getElementById(id).onclick = function(){
	    sendToScreen(val);
		turnShiftOff();
		turnResultOff();
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
			if(shiftIsOn==true) sendToScreen(valShiftOn);
			else if(shiftIsOn==false) sendToScreen(valShiftOff);
			turnShiftOff();
			turnResultOff();
	    };
	}
	// buttons that are triggered by the shift button
	  valueBtnAfterShift("expButton", "", "pi");
	  valueBtnAfterShift("sinButton", "sin(", "asin(");
	  valueBtnAfterShift("cosButton", "cos(", "accos(");
	  valueBtnAfterShift("tanButton", "tan(", "atan(");
	  valueBtnAfterShift("lnButton", "ln(", "exp(");
	  //valueBtnAfterShift("invertButton", "^(-1)", "!");
	  //valueBtnAfterShift("powerOfButton", "^(", "SQR(");

	//buttons that do not represent characters set on the screen
	//ac button also controls the OFF button
	document.getElementById("acButton").onclick = function(){
	    initialState();
		turnResultOff();
		    if(shiftIsOn){
				resultDisplay.innerHTML = "";
				calculatorIsOn = false;
			}      
    };
	document.getElementById("deleteButton").onclick = function(){
         screenDelete();
	};
    var turnResultOff = function(){
		isResultOnScreen = false;
	}	
	//gives the result onto the screen
	var isResultOnScreen = false;
	document.getElementById("resultButton").onclick = function(){
		if(isResultOnScreen==false){
			showResultOnScreen();
		    toAnsMemory();
		    display.innerHTML = "";
		    turnShiftOff();
		}
	    isResultOnScreen = true;	
	};
	if(calculatorIsOn == false) return; 	
}
     
	//}); 