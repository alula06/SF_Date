// current time info
var current = new Date();
var month = current.getMonth();
var day = current.getDay();
var date = current.getDate();
var year = current.getFullYear();

// array of month names 
var monthNames = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov", "Dec"];

function get_Month_Year(month, year) {
    return month + " " + year.toString();
}

function get_First_Day(month, year) {
    var first_Day = new Date(year, month, 1);
    return first_Day.getDay();
}

function get_Last_Day(month, year) {
    var last_Day = new Date(year, month + 1, 0);
    return last_Day.getDate();
}

function init_Calendar(){
    $("#month_year").text(get_Month_Year(monthNames[month], year));
    $("#body").empty();
    $("#eventbody").empty(); //Event feed reset

    //Calendar body
    $("#body").append($("<tr>"));

    //Event Feed body
    $("#eventbody").append("<div>");
    
    var first_Day = get_First_Day(month, year);
    //Create empty columns before first day of month
    for(var i = 0; i < first_Day; i++) {
        $("#body tr:last").append($("<td>" + "</td>"));
    }
    
    var date_Num = 1;
    //Start creating columns beginning with first day
    for (var i = 1; i <= 7 - first_Day; i++) {
        $("#body tr:last").append("<td data-day='" + i + "'>" + "<div class = 'datenum'>" + date_Num.toString() + "</div>" + "</td>");  
        //Highlight column if it the day current day   
        if (date_Num == date && month == current.getMonth() && year == current.getFullYear()) {
            $("#body td:last").css("cssText", "background-color: #eee");
        } 
        date_Num++;
    }
    
    //Create 3 more rows/weeks
    for (var i = 2; i <= 5; i++) {
        $("#body").append($("<tr>"));
        //Create 7 columns for each day of the week
        for (var j = 1; j <= 7; j++) {
            //Create empty columns if current day number is greater than last day of month
            if (date_Num > get_Last_Day(month, year)) {
                $("#body tr:last").append("<td>" + "</td>");
            } else {
                //If not assign day number to column
                $("#body tr:last").append("<td data-day='" + date_Num+ "'>" + "<div class = 'datenum'>" + date_Num.toString() + "</div>" + "</td><br>");
            }
            //Highlight column if it the day current day 
            if (date_Num == date && month == current.getMonth() && year == current.getFullYear()) {
                $("#body td:last").css("cssText", "background-color: #eee")
            } 
            date_Num++;
        }
    }

    //When you click on a column cell
    $("#body td").click(function(){
       var input = $("#description").val();
       var timer = $("#time option:selected").text();
       var cell = $(this).html();
       if(input.length > 0 && timer.length > 0 && cell.length > 0){
            var temp = cell + " " + input + " at " + timer;
            $(this).text(temp);
            $.post( "/events/create", { 'events':
                                            {"event":input,
                                            "time":timer,
                                            "day": $(this).data('day'),
                                            "month": month,
                                            "year": year }
                                        });
            $("#description").val(' ');
            $("#time").val(' ');
        }
        else if(cell.length > 0){
            var event = prompt("Please enter a description.");
            var time = prompt("Please enter a time.");
            if (event.length > 0 && time.length > 0) {
                var temp = cell + " " + event + " at " + time;
                $(this).text(temp);
                $.post( "/events/create", { 'apps':
                                            {"event":event,
                                            "day": $(this).data('day'),
                                            "time":time,
                                            "month": month,
                                            "year": year}
                                        });
            }
        }

    });

    

    
    $.get( "/events/index", { "month": month,"year": year },
                             function(data){
                                                
                                                $.each(data, function(key, value){
                                            
                                                    $("td[data-day='" + value.day + "']").append("<li>" + value.event + " at " + value.time +"</li>");
                                                     $("#eventbody div:last").append("<div class = 'eventpost'>").append(value.month + "-" + value.day + "-" + value.year + " " + value.event + " to start at " + value.time + " created on " + value.created_at );
                                                    

                                                     

                                                });
                                            });

   
    

// $.get( "/events/show_user", function(data){
                                                    // $(".eventpost div:last").append("posted by " + data.name);
                                                     //    });
    
   
}


$(document).ready(function(){
    
    init_Calendar();
    
    $("#next_Month").click(function(){
        if (month == 11) {
            month = 0;
            year = year + 1;
        } else {
            month = month + 1;
        }
        init_Calendar();
    });
    
    $("#last_Month").click(function(){
        if (month == 0) {
            month = 11;
            year = year - 1;
        } else {
            month = month - 1;
        }
        init_Calendar();
    });
    
    $("#next_Year").click(function(){
        year = year + 1;
        init_Calendar();
    });
    
    $("#last_Year").click(function(){
        year = year - 1;
        init_Calendar();
    });
});