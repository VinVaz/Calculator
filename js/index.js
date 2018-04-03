
     var mainDisplay = document.getElementById("displayScreen");
	 var headerDisplay = document.getElementById("screenHeader");
	 var resultDisplay = document.getElementById("screenResultDisplay");
	 
	 var shiftIsOn = false;
	 var isResultShown = false;
	 var calculatorIsOn = false;
	 
	 
    //starts the calculator
	document.getElementById("onButton").onclick = function(){
		initialState();
		calculatorIsOn = true;
	};
	
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
 
 
	//store all the values passed
	var memory = {
		data: [],	
	    add: function(string){
			this.data.push(string);
		},
		deleteLast: function(){
			this.data.pop();
		},
        toString: function(){
			return this.data.join("");
		},
        clear: function(){
			this.data = [];
		}		
	}
	 function initialState(){
		mainDisplay.innerHTML = "";
	    headerDisplay.innerHTML = "";
		resultDisplay.innerHTML = "0";
		memory.clear();
	 }
	 
	  function sendToScreen(string){
		if(memory.toString().length<=9){
			memory.add(string);
		    mainDisplay.innerHTML = memory.toString();
		}
		isResultShown = false;
	  }
	 //takes the stored values in memory and show them on screen 
	  function showResult(){
		var result = eval(memory.toString());
		result = controlSizeOf(result);
		resultDisplay.innerHTML = result;
	  }
	  //sends screen memory to ANS to be stored
    var Ans = 0;	
	  function saveAnsMemory(){
		Ans = eval(memory.toString());
	    memory.clear();
	  }
	//deletes only the last element shown on the screen
	  function screenDelete(){
		memory.deleteLast();
		mainDisplay.innerHTML = memory.toString();
	  }


	  //limits the size of the output to 12 digits at most
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
    //indicates whether the shift button is active or not
	  function turnShiftOn(){
		shiftIsOn = true;
		headerDisplay.innerHTML = "shift";
	  }
	  function turnShiftOff(){
		shiftIsOn = false;
		headerDisplay.innerHTML = "";
	  }
	  document.getElementById("shiftButton").onclick = function(){
		if(calculatorIsOn){
			if(shiftIsOn) turnShiftOff();
	        else turnShiftOn();
		}
	  }; 
	  
	//simplify the process of evaluating the buttons with their correspondent string value
	  function valueBtn(id, val){
		document.getElementById(id).addEventListener("click", function(){
			if(calculatorIsOn){
			sendToScreen(val);
		    turnShiftOff();
			}
	    });
	  }
	//receives the button's id as the first paramether and the  
	//value that these buttons represent as the second paramether
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
  
	//simplify the process of giving to buttons their values after triggered by shift
	function valueBtnAfterShift(id, valShiftOff, valShiftOn){
		document.getElementById(id).onclick = function(){
		  if(calculatorIsOn){
			if(shiftIsOn==true) sendToScreen(valShiftOn);
			else if(shiftIsOn==false) sendToScreen(valShiftOff);
			turnShiftOff();
		  }
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


	//ac button also controls the OFF button
	document.getElementById("acButton").onclick = function(){
	  if(calculatorIsOn){
		initialState();
		    if(shiftIsOn){
				resultDisplay.innerHTML = "";
				calculatorIsOn = false;
			}		
	  }
    };
	//deletes all the numbers shown on the screen
	document.getElementById("deleteButton").onclick = function(){
		if(calculatorIsOn){
         screenDelete();
		}
	};
	//provides the result on the screen
	document.getElementById("resultButton").onclick = function(){
	  if(calculatorIsOn){
		if(isResultShown==false){
			showResult();
		    saveAnsMemory();
		    mainDisplay.innerHTML = "";
		    turnShiftOff();
		}
	    isResultShown = true;
      }		
	};

     
