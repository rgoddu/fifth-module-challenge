// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
savedTasks = {}
var saveButton = $(".saveBtn")

function saveContent() {
    var hourBlock = $(this).parent()
    var taskHour = hourBlock.attr("id")
    var taskDescription = hourBlock.children().eq(1).val()

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
    timeDisplay.text(dayjs().format("dddd: MMMM DD, YYYY HH:mm:ss"))
    setInterval(() => {
        timeDisplay.text(dayjs().format("dddd: MMMM DD, YYYY HH:mm:ss"))
    }, 1000);
}
function currentBlockColor(){
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
    currentBlockColor()
    //update block colors every 10 seconds
    setInterval(()=>{
        currentBlockColor()
    },10000)
    saveButton.on("click", saveContent)
});
