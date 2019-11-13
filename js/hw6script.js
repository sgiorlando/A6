/*
    FILE: /~sgiorlan/Assignment6/css/hw6stylesheet.css
    91.61 GUI Programming I Assignment No.6: Creating An Interactive Dynamic Table
    Scott T. Giorlando, UMass Lowell Computer Science, scott_giorlando@student.uml.edu
    File Created on: 11/11/2019 3:30 PM.
        Updated by STG on 11/12/2019 1:30 PM

    File Description: This file is a script for my website which will give my website most of its functionality.

    This file did pass the validator required.
*/

/*
Function generateTable takes 4 parameters, a row beginning a row end a column start and a column end, this is the range of the 4 inputs for the user.
Once it gets the 4 numbers that the user submits, it then checks to see if any values are empty or not, then it checks to see if their first input is larger than their
second input and displays an error message if so.

If none of those issues are found then it will display a message about generating the table with their multiplier and multiplicand and the range of them.
Then generateTable will start making both the rows and columns to the specific range the user submitted.
*/
function generateTable(rowStart, rowEnd, colStart, colEnd) {
  document.getElementById("tOutput").innerHTML = "";

  if (colStart == "" || colEnd == "" || rowStart == "" || rowEnd == "") {
    document.getElementById("userSubmission").innerHTML = "<h2>Error: User cannot leave values empty!</h2>";
  }
  else if (Number(rowStart) > Number(rowEnd) || Number(colStart) > Number(colEnd)) {
    document.getElementById("userSubmission").innerHTML = "<h2>Error: User cannot have their starting number be greater than their ending number!</h2>";
  }
  else {
    rowStart = Number(rowStart);
    rowEnd = Number(rowEnd);
    colStart = Number(colStart);
    colEnd = Number(colEnd);
    document.getElementById("userSubmission").innerHTML = "<h4>Creating a multiplication table with values from: " + rowStart + '-' + rowEnd +
    " and multiplying them with values from " + colStart + "-" + colEnd + ".</h4>";
  }

/*
Here in the function I take the table output ID and start using loops to insert each cell with the numbers in the range that the user specified.
For example, if the user put 1-5 for their columns then my loop will start at 1 and go up to 5 and fill each cell with the specific number.  For each inner cell
the loop will take the rows and multiply it by the column, which is why it is a nested loop.
*/
  var table = document.getElementById("tOutput");
  for (var i = colStart; i <= colEnd; i++) {
    var row = table.insertRow(i - colStart);
    for (var j = rowStart; j <= rowEnd; j++) {
      var tableCell = row.insertCell(j - rowStart);
      tableCell.innerHTML = i * j;
    }
    var tableCell = row.insertCell(0);
    tableCell.innerHTML = i;
  }

  var row1 = table.insertRow(0);
  for (var k = rowStart; k <= rowEnd; k++) {
    var tableCell = row1.insertCell(k - rowStart);
    tableCell.innerHTML = k;
  }

/*
This is the top left corner of the table, I put a * to show that this is a multiplication table.
*/
  var tableCell = row1.insertCell(0);
  tableCell.innerHTML = "*";
}

/*
Function readForm will take each number the user input and store it into a variable so it can be used in the generateTable function.
*/
function readForm(formInput) {
  if (formInput.preventDefault) formInput.preventDefault();
  var firstMultiplier = document.getElementById('firstMultiplier').value;
  var lastMultiplier = document.getElementById('lastMultiplier').value;
  var firstMultiplicand = document.getElementById('firstMultiplicand').value;
  var lastMultiplicand = document.getElementById('lastMultiplicand').value;
  generateTable(firstMultiplier, lastMultiplier, firstMultiplicand, lastMultiplicand);
  return false;
}

/*
Here I use attachEvent to the submit button so the vents can be used in IE8 or lower.
addEventListener will add a function to the event's stack instead of overwriting it, I read about both of these online and it was mentioned to be used in practice.
*/
var form = document.getElementById('userForm');
if (form.attachEvent) {
  form.attachEvent("submit", readForm);
}
else {
  form.addEventListener("submit", readForm);
}
