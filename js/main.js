/*global $, console*/
    
/*
Open ready() method */
$(document).ready(function () {
    /* 
    State here that you are using strict JavaScript */
    "use strict";
    /* 
    Declare following variables: 

    nm - this variable stores the name of user
    (entered in HTML form)

    em - this variable stores the email of user
    (entered in HTML form) 

    sb - this variable stores the subject user
    entered in HTML form 

    ms - this variable stores the message user
    entered in HTML form

    dt - this object collects (stores) name, 
    email, subject and message from HTML form
    (all in one place)

    errors - this array stores error-messages 
    during the process of form-validation

    collect - this variable stores error-messages 
    parsed into HTML structure - this means looping 
    through array errors and parsing the values of 
    errors array to unordered list, and finally 
    saving the result in collect variable.

    i - this variable is used as index-pointer
    in loops. */
    var nm, em, sb, ms, collect, i;
    var dt = {};
    var error = [];
      
    /* 
    Assign {} to dt. It means this object is also 
    initially empty. */
    /* 
    Assign [] to errors. It means this array is
    initially empty. */
    /* 
    Use jQuery load() method to load the home page 
    content by default (on page load). HTML element 
    for loading content is div "box":
    <div class="bg-main">
      <div class="box"></div>
    </div> */
      // load the home page on page load:
    $(".box").load("./partials/home.html");
    
    
    
    /*
    ------------------------------
    HANDLING HTML FORM - SEND DATA 
    TO SERVER USING $.ajax({})
    ------------------------------ */

    /* 
    What happens if user is on contact page and 
    submits the form? 
    Handle the success response of form handling 
    ajax object - define function handleResponse.
    This function has a parameter - rsp
    for example. rsp contains server's 
    response to the request of web browser. */  
    function handleResponse(rsp) {
       /* 
       Pass the response to HTML element
       with class "feedback" placed below the 
       form element (in HTML document) */    
       $(".feedback").html(rsp);
       /* 
       Use val() jQuery method to clear the form 
       fields name, email, subject and message */
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
    /* 
    End function handleResponse */
    }
    

    /* 
    Handle the error response of form handling 
    ajax object - define function handleErrors
    with 3 parameters: jqXHR, textStatus, errorThrown */  
    function handleErrors(jqXHR, textStatus, errorThrown){
       /* 
       Print the error in JavaScript console */ 
       console.log("textStatus = " + textStatus + "\n" + "errorThrown = " + errorThrown);
    /* 
    End function handleErrors */
    }
    
    /* 
    Define validateForm function The form will be handled 
    on submit event so you need event object parameter */
    function validateForm(ev) {
        console.log("in form");
       /* 
       Prevent default behaviour of form element */
        ev.preventDefault();
       /* 
       Access all form elements (name, email, subject and 
       message) and pass the outputs to variables declared 
       for that purpose */
        nm = $("#name").val();
        em = $("#email").val();
        sb = $("#subject").val();
        ms = $("#message").val();
        
    
console.log("before validation");
       /* 
       VALIDATE NAME FIELD: */
       /* 
       if nm is empty string: */
        if (nm === "") {
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
          error.push("<p>Did you forget to fill in your name?</p>");
       /* 
       end if 
       else: */ 
       } else {
          /* 
          Pass nm to object dt as a new 
          property of that object. */
          dt.name = nm;
       /* 
       end else */
       }

        
       /* 
       EVALUATE EMAIL FIELD: */
       /* 
       if em is empty string: */
        if(em === ""){
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
          error.push("<p>Did you forget to fill in your email?</p>");
       /* 
       end if 
       else: */       
        }else{
          /* 
          Pass em to object dt as a new 
          property of that object. */
       /* 
       end else */
            dt.email = em;
        }

        
       /* 
       EVALUATE SUBJECT FIELD: */
       /* 
       if sb is empty string: */
        if(sb === ""){
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
          error.push("<p>Did you forget to fill in the subject of your message?</p>");
       /* 
       end if 
       else: */ 
        }else{
          /* 
          Pass sb to object dt as a new 
          property of that object. */
            dt.subject = sb;
       /* 
       end else */
        }
        
  
       /* 
       EVALUATE MESSAGE FIELD: */
       /* 
       if ms is empty string: */
        if(ms === ""){
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
        error.push("<p>Did you forget to fill in your message?</p>");
       /* 
       end if 
       else: */ 
        }else{
          /* 
          Pass ms to object dt as a new 
          property of that object. */
            dt.message = ms;
       /* 
       end else */
        }

console.log("before finally");
       /* 
       FINALLY, IF THERE IS NO ERRORS SEND
       DATA TO SERVER, OTHERWISE PRINT ERRORS */
       /* 
       if errors array is empty: */  
        if (error.length === 0) {
          /* 
          Use $.ajax({}) to send dt 
          to server. Chain done() and fail() 
          methods to ajax object. Method done()
          calls handleResponse function if request 
          is successful otherwise fail() method
          calls handleErrors. */  
            $.ajax({
                type: "POST",
                url: "./web-service/web-service.php",
                data: dt,
                dataType: "html"
            }).done(handleResponse).fail(handleErrors);
       /* 
       end if
       otherwise: */
        }else{
            console.log("else");
          /* 
          Assign collect variable with initial message:
          "Please fix the following errors:" */
            collect = "Please fix the following errors:";
            collect += "<ul>";
          /* 
          Loop through array errors and parse the values of 
          errors array to unordered list - for each loop iteration
          append (save) the result in collect variable. */
            for (i = 0; i < error.length; i++ ) {
                collect += "<li>" + error[i] + "</li>";
            }
            collect += "</ul>";
          /* 
          Pass collect to HTML element
          with class "feedback" placed below the 
          form element (in HTML document) */
            $(".feedback").html(collect);
          /* 
          Empty errors array */
            error = [];
          /* 
          Assign collect with empty string */
            collect = "";
       /* 
       end else */
        }
    /* 
    End function validateForm */
    }
    
    

    /*
    ---------------------
    LOADING HTML PARTIALS
    --------------------- */
    /* 
    HANDLE NAV-BAR CLICK */
    /* 
    Use nav-bar link element as selector and 
    on() method for click-event. This event 
    handler needs to use event object to prevent 
    default behaviour of link element. */
        $(".nav-bar a").on("click", function (event) {
       /* 
       Prevent default behaviour of link element */
       event.preventDefault();
       /* 
       Use if-statement to check if $(this).text()
       is equal to "Home" - if so, load home.html 
       partial, otherwise load contact.html partial.
       
       If contact.html is loaded, make sure that
       load() method also contains call-back function.
       Inside this call-back function, you will register 
       validateForm function for submit event of contact-form. */	
       if ($(this).text() === "Home") {
            
            $(".box").load("./partials/home.html");
            
        } else {
            $(".box").load("./partials/contact.html", function () {
                $("form").on("submit", validateForm);
            });
        }
    }); 
    /* 
    End on() method */ 


/* 
End ready() method */
});