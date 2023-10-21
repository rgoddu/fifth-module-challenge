// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
savedTasks = {}
var saveButton = $(".saveBtn")

function saveContent() {

    var hourSection = $(this).parent()
    var taskHour = hourSection.attr("id")
    var taskDescription = hourSection.children().eq(1).val()

    savedTasks[taskHour] = taskDescription;
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks))

}
function loadPrevious(){
    var previousTasks = JSON.parse(localStorage.getItem("savedTasks"))
    if(previousTasks !== null){
        for(var x = 0; x<Object.keys(previousTasks).length; x++){
            var taskKey = Object.keys(previousTasks)[x]
            var writeArea = $("#"+taskKey)
            writeArea.children().eq(1).text(previousTasks[taskKey])
        }
    }

}
function setTime(){
    var timeDisplay = $("#currentDay")
    timeDisplay.text(dayjs().format("MMMM DD, YYYY HH:mm:ss"))
    setInterval(() => {
        timeDisplay.text(dayjs().format("MMMM DD, YYYY HH:mm:ss"))
    }, 1000);
}
function currentBlock(){
    for(var x = 9; x<=17; x++){
        var currentHour = dayjs().format("H")
        var timeBlock = $("#hour-"+x)

        if(x>currentHour){
            timeBlock.addClass("future")
            timeBlock.removeClass("present","past")
        }else if(x === currentHour){
            timeBlock.addClass("present")
            timeBlock.removeClass("future","past")
        }else{
            timeBlock.addClass("past")
            timeBlock.removeClass("future","present")
        }
    }
}
$(function init() {
    loadPrevious()
    setTime()
    currentBlock()
    //update block colors every 10 seconds
    setInterval(()=>{
        currentBlock()
    },10000)
    saveButton.on("click", saveContent)


    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
});
