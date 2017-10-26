$(document).ready(function(){

    $("#populate").on("click", function(e){

        console.log("clicked populate");

        $.ajax({

            method:"GET",
            url:"/populate"

        }).done(function(counter){

            //console.log(counter);





            location.reload();

        })

    });

    $(document).on("click", ".saveButton" ,function(e){
        
        console.log("clicked save Button");

        console.log($(this).attr("data_value"));
        
        var id = $(this).attr("data_value");

        $.ajax({

            method: "POST",
            url: "/save/" + id,

        }).done(function(result){

            console.log("saved article");


        })
        
    });

    $(document).on("click", ".removeButton" ,function(e){
        
        console.log("clicked remove Button");

        console.log($(this).attr("data_value"));
        
        var id = $(this).attr("data_value");

        $.ajax({

            method: "POST",
            url: "/remove/" + id,

        }).done(function(result){

            console.log("removed article");

            location.reload();

        })
        
    });

    $(document).on("click", ".noteButton" ,function(e){
        
        console.log("clicked note Button");

        console.log($(this).attr("data_value"));
        
        var id = $(this).attr("data_value");

        $("#" + id).modal();

        $.ajax({
            
                        method: "GET",
                        url: "/note/" + id,
                        //data: { body: note},
            
                    }).done(function(result){
            
                        console.log("saved note");
            
                        var commentArray = result.comment;
            
                        console.log(result.comment);

                        var noteLocation = $("#" + id).find(".note");
                        noteLocation.html("");

                        console.log(noteLocation);
            
                        for (var i = 0; i < commentArray.length; i++) {
            
                            var note = commentArray[i].body;
                            var noteId = commentArray[i]._id;
                            console.log(note);
                            var outerDiv = $("<div>");
                            var delButton = $("<button>");
                            delButton.text("DEL");
                            delButton.attr("class", "delNote");
                            delButton.attr("data_value", noteId);
                            delButton.css("float", "left");
                            var h2 = $("<h2>");
                            h2.text(note);
                            outerDiv.append(delButton);
                            outerDiv.append(h2);
                            console.log(outerDiv);
                            noteLocation.append(outerDiv);
                            //console.log(h1);
            
                            //$("#note").append(h1)
            
                        }
            
                    })

    });

    $(document).on("click", ".closeNote" ,function(e){
        
        console.log("clicked close note Button");

        console.log($(this).attr("data_value"));
        
        var id = $(this).attr("data_value");

        $("#" + id).find("textarea").val("");

        //$("#" + id).modal("toggle");

    });

    $(document).on("click", ".submitNote" ,function(e){
        
        console.log("clicked submit note Button");

        console.log($(this).attr("data_value"));
        
        var id = $(this).attr("data_value");

        var note = $("#" + id).find("textarea").val();

        console.log($("#" + id).find("textarea").val());

        $("#" + id).find("textarea").val("");
        
        $("#" + id).modal('toggle');

        $.ajax({

            method: "POST",
            url: "/note/" + id,
            data: { body: note},

        }).done(function(result){
/*
            console.log("saved note");

            var commentArray = result.comment;

            console.log(result.comment);

            for (var i = 0; i < commentArray.length; i++) {

                var note = commentArray[i].body;
                console.log(note);

                $("#note").append($("h1").text(note))

            }
*/
        })

    });

    $(document).on("click", ".delNote" ,function(e){
        
        console.log("clicked del note Button");

        console.log($(this).attr("data_value"));
        console.log($(this).parent().parent().parent().find(".submitNote").attr("data_value"));

        var modalId = $(this).parent().parent().parent().find(".submitNote").attr("data_value");
        var id = $(this).attr("data_value");

        $.ajax({

            method: "DELETE",
            url: "/note/" + id,

        }).done(function(result){

            console.log("data deleted");
            $("#" + modalId).modal('toggle');

        })

    });

})