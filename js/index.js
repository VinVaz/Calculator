    //get the three displayers of the calculator
     var mainDisplay = document.getElementById("displayScreen");
	 var headerDisplay = document.getElementById("screenHeader");
	 var resultDisplay = document.getElementById("screenResultDisplay");
	
	//flags
	 var isResultShown = false;
	 var isCalculatorOn = false;
	 
	//sets the memory that will store all the values passed
	var memory = {
		memoryCore: [],	
	    add: function(string){
			this.memoryCore.push(string);
		},
		deleteLast: function(){
			this.memoryCore.pop();
		},
        getStringContent: function(){
			return this.memoryCore.join("");
		},
        clear: function(){
			this.memoryCore = [];
		}		
	}
	function clearCalculator(){
		mainDisplay.innerHTML = "";
	    headerDisplay.innerHTML = "";
		resultDisplay.innerHTML = "";
		memory.clear();
	 }
    //starts the calculator
	document.getElementById("onButton").onclick = function(){
		clearCalculator();
		resultDisplay.innerHTML = "0";
		isCalculatorOn = true;
	};
	
	//global constantsthat will be used by the eval function
	 var pi = Math.PI;
     var e = Math.E;	
	//global functions that will be used by the eval function
	 function sin(x){return Math.sin(x);}
	 function cos(x){return Math.cos(x);}
	 function tan(x){return Math.sin(x);}
	 function acos(x){return Math.acos(x);}
	 function asin(x){return Math.asin(x);}
	 function atan(x){return Math.atan(x);}
	 function exp(x){return Math.exp(x);}
	 function log(x){return Math.log10(x);}
	 function ln(x){return Math.log(x);}
	 function pow(x, y){return Math.pow(x, y);}
	 function sqrt(x){return Math.sqrt(x);}
	 function fact(x){
		var last = 1;
		for(var i = 1; i <= x; i++){
		  last *= i;
		} 
	    return last;
	 }

	 //add some changes in the way some functions are presented
	 function filterBeforeEval(arg){
		var replaced = "";
		//replaces the power notation with pow() when the exponent is negative
		replaced = arg.replace(/(\d+[.]?\d*)(?:[\^][(][-])(\d+[.]?\d*)(?:[)])/g, `1/(pow($1, $2))`);
		//replaces the power notation to pow, so that eval() recognizes the operation
		replaced = replaced.replace(/(\d+[.]?\d*)(?:[\^][(])(\d+[.]?\d*)(?:[)])/g, `pow($1, $2)`);
		//replaces the factiorial notation with the fact() function 
		replaced = replaced.replace(/(\d+[.]?\d*)(?:[!])/g, `fact($1)`);
		return replaced;		
	 }
	 
	 function removesTraillingZeros(num){
		 var myRegex = /([.]\d*[1-9]+)[0]+(?!\d)/;
		 return Number(num.toString().replace(myRegex, '$1'));
	 }
	 function convertBigNumToExponential(num){
		 var newNum = 0;
		 var maxSize = 12;
		 var sizeOfExponential = 6;
		 if(num.toString().length > maxSize)newNum = num.toExponential(sizeOfExponential);
		 else newNum = num;
		 return newNum;
	 }
	 //controls the relation bettween the size of the integer
	 //and the decimal so that the total size is constant
	 function controlsSizeOfFloat(num){
		 var myRegex = /(\d+)(?:[.](\d+))?/;
         var decimalMaxLength = "";
		 var myArr = myRegex.exec(num.toString());
		 var integerOfNum = myArr[1];
		 var integerLength = integerOfNum.toString().length;
			if(integerLength <= 11) decimalMaxLength = 11 - integerLength;
			else decimalMaxLength = 0;
		return num.toFixed(decimalMaxLength);	
	 }
	 //limits the size of all the numbers format to 12 digits at most
	  function controlSizeOf(num){
		var result = 0;
		if(num%1 != 0){
			result = controlsSizeOfFloat(num);
            result = removesTraillingZeros(result);			
		}
		else result = num;
		result = convertBigNumToExponential(result);
		return result;
	  }

	 
	 //send a value to the memory and then it is shown on to the display
	  function sendValToMainDisplay(string){
		if(memory.getStringContent().length <= 9){
			memory.add(string);
		    mainDisplay.innerHTML = memory.getStringContent();
		}
		isResultShown = false;
	  }
	  function evaluatedMemory(){
		  var n = filterBeforeEval(memory.getStringContent());
		  return eval(n);
	  }
	 //takes the stored values in memory and show them on the result display
	  function showResult(){
		var result = controlSizeOf(evaluatedMemory());
		resultDisplay.innerHTML = result;
	  }
	  //sends screen memory to ANS to be stored for future calls
    var Ans = 0;	
	  function saveAnsMemory(){
		Ans = evaluatedMemory();
	    memory.clear();
	  }
	//deletes only the last element shown on screen
	  function deleteLastFromMainDisplay(){
		memory.deleteLast();
		mainDisplay.innerHTML = memory.getStringContent();
	  }
    //shows whether the shift button is active or not
	var shiftButton = {
		isShiftOn: false,
		turnOn: function(){
		    this.isShiftOn = true;
		    headerDisplay.innerHTML = "shift";
	  },
		turnOff: function(){
		    this.isShiftOn = false;
		    headerDisplay.innerHTML = "";
	  }
	};
	//sets the shift button's action when clicked
	  document.getElementById("shiftButton").onclick = function(){
		if(isCalculatorOn){
			if(shiftButton.isShiftOn) shiftButton.turnOff();
	        else shiftButton.turnOn();
		}
	  }; 
	  
	//simplify the process of evaluating the buttons with their correspondent string value
	  function valueBtn(id, val){
		document.getElementById(id).addEventListener("click", function(){
			if(isCalculatorOn){
			sendValToMainDisplay(val);
		    shiftButton.turnOff();
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
	function valueBtnAfterShift(id, valWhenShiftOff, valWhenShiftOn){
		document.getElementById(id).onclick = function(){
		  if(isCalculatorOn){
			if(shiftButton.isShiftOn) sendValToMainDisplay(valWhenShiftOn);
			else sendValToMainDisplay(valWhenShiftOff);
			shiftButton.turnOff();
		  }
	    };
	}
	// buttons that are triggered by the shift button
	  valueBtnAfterShift("expButton", "", "pi");
	  valueBtnAfterShift("sinButton", "sin(", "asin(");
	  valueBtnAfterShift("cosButton", "cos(", "accos(");
	  valueBtnAfterShift("tanButton", "tan(", "atan(");
	  valueBtnAfterShift("lnButton", "ln(", "exp(");
	  valueBtnAfterShift("invertButton", "^(-1)", "!");
	  valueBtnAfterShift("powerOfButton", "^(", "sqrt(");


	//ac button also shuts the calculator off
	document.getElementById("acButton").onclick = function(){
	  if(isCalculatorOn){
		clearCalculator();
		    if(shiftButton.isShiftOn){
				isCalculatorOn = false;
			}		
	  }
    };
	//deletes the last value to appear on screen
	document.getElementById("deleteButton").onclick = function(){
		if(isCalculatorOn){
         deleteLastFromMainDisplay();
		}
	};
	//provides the result on the screen
	document.getElementById("resultButton").onclick = function(){
	  if(isCalculatorOn){
		if(isResultShown==false){
			showResult();
		    saveAnsMemory();
		    mainDisplay.innerHTML = "";
		    shiftButton.turnOff();
		}
	    isResultShown = true;
      }		
	};

 
