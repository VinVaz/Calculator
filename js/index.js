
var calculator = {
  isOn: false,
  turnOn: function(){
	this.isOn = true;
	this.clear();
	resultDisplay.write("0");
  },
  turnOff: function(){
    this.clear();
	this.isOn = false;
  },
  clear: function(){
    mainDisplay.clear();
    headerDisplay.clear();
    resultDisplay.clear();
    memory.clear();
  }
};

//sets memory with a protected core array that store its values 
function Memory(){
  var _memoryCore = [];	
  this.add = function(string){
    _memoryCore.push(string);
  };
  this.deleteLast = function(){
    _memoryCore.pop();
  };
  this.getContent = function(){
    return _memoryCore.join("");
  };
  this.clear = function(){
    _memoryCore = [];
  };		
}

//creates displayer component of the calculator
function Display(id){
  this.id = id;
  this.isOn = false;
  this.clear = function(){
    document.getElementById(this.id).innerHTML = "";
  }
  this.write = function(text){
    document.getElementById(this.id).innerHTML = text;
  }	
}

var memory = new Memory();

//create three displays to show information about the calculator
var mainDisplay = new Display("displayScreen");
var headerDisplay =  new Display("screenHeader");
var resultDisplay =  new Display("screenResultDisplay");

//shows whether the shift button is active or not
var shiftButton = {
  isShiftOn: false,
  turnOn: function(){
	this.isShiftOn = true;
	headerDisplay.write("shift");
  },
  turnOff: function(){
    this.isShiftOn = false;
    headerDisplay.clear();
  }
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

//starts the calculator
document.getElementById("onButton").onclick = function(){
  calculator.turnOn();
};

//sets the shift button's action when clicked
document.getElementById("shiftButton").onclick = function(){
  if(calculator.isOn){
    if(shiftButton.isShiftOn){
	  shiftButton.turnOff();
	} 
    else shiftButton.turnOn();
  }
};
  
//ac button also shuts the calculator off
document.getElementById("acButton").onclick = function(){
  if(calculator.isOn){
    calculator.clear();
	resultDisplay.write("0");
	if(shiftButton.isShiftOn){
	  calculator.turnOff();
	}		
  }
};

//deletes the last value to appear on screen
document.getElementById("deleteButton").onclick = function(){
  if(calculator.isOn){
    memory.deleteLast();
    mainDisplay.write(memory.getContent());
  }
};

document.getElementById("resultButton").onclick = function(){
  if(calculator.isOn){
	if(resultDisplay.isOn==false){
	  showResult();
	  saveAnsMemory();
	  mainDisplay.clear();
	  shiftButton.turnOff();
	}
	resultDisplay.isOn = true;
  }		
};

//simplify the process of evaluating the buttons with their correspondent string value
function valueBtn(id, val){
  document.getElementById(id).addEventListener("click", function(){
    if(calculator.isOn){
      sendValToMainDisplay(val);
      shiftButton.turnOff();
    }
  });
}
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

//simplify the process of giving to the buttons their values after triggered by shift
function valueBtnAfterShift(id, valWhenShiftOff, valWhenShiftOn){
  document.getElementById(id).onclick = function(){
	if(calculator.isOn){
	  if(shiftButton.isShiftOn) sendValToMainDisplay(valWhenShiftOn);
	  else sendValToMainDisplay(valWhenShiftOff);
	  shiftButton.turnOff();
    }
  };
}
valueBtnAfterShift("expButton", "", "pi");
valueBtnAfterShift("sinButton", "sin(", "asin(");
valueBtnAfterShift("cosButton", "cos(", "accos(");
valueBtnAfterShift("tanButton", "tan(", "atan(");
valueBtnAfterShift("lnButton", "ln(", "exp(");
valueBtnAfterShift("invertButton", "^(-1)", "!");
valueBtnAfterShift("powerOfButton", "^(", "sqrt(");
  
//send a value to the memory and then it is shown on to the display
function sendValToMainDisplay(string){
  if(memory.getContent().length <= 9){
    memory.add(string);
    mainDisplay.write(memory.getContent());
  }
  resultDisplay.isOn = false;
}

//takes the stored values in memory and show them on the result display
function showResult(){
  try{	
    var result = controlSizeOf(evaluatedMemory());
    resultDisplay.write(result);
  }catch(err){
	  resultDisplay.write(err.name);
  }
}

//sends screen memory to ANS to be stored for future calls
var Ans = 0;	
function saveAnsMemory(){
  Ans = evaluatedMemory();
  memory.clear();
}

function evaluatedMemory(){
	try{	
	  var n = filterBeforeEval(memory.getContent());
      return eval(n);
	}catch(err){
	  resultDisplay.write(err.name);
	}
}

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

//limits the size of a number so that it can fit in the screen
function controlSizeOf(num){
  var result = 0;
  if(num%1 != 0){
    result = makeSizeOfDecimalsConstant(num);
    result = removesTraillingZeros(result);			
  }
  else result = num;
  result = convertBigNumToExponential(result);
  return result;
}

function removesTraillingZeros(num){
  var myRegex = /([.]\d*[1-9]+)[0]+(?!\d)/;
  return Number(num.toString().replace(myRegex, '$1'));
}

function convertBigNumToExponential(num){
  var maxSize = 12;
  var sizeOfExponential = 6;
  if(num.toString().length > maxSize){
    return num.toExponential(sizeOfExponential);  
  } 
  else return num;
}

//controls the relation bettween the size of the integer
//and the fractional part of a decimal number so that its 
//total size is constant
function makeSizeOfDecimalsConstant(num){
  var myRegex = /(\d+)(?:[.](\d+))?/;
  var decimalMaxLength = "";
  var myArr = myRegex.exec(num.toString());
  var integerOfNum = myArr[1];
  var integerLength = integerOfNum.length;
  
  if(integerLength <= 11){
    decimalMaxLength = 11 - integerLength; 
  } 
  else decimalMaxLength = 0;
  
  return num.toFixed(decimalMaxLength);	
}	 




