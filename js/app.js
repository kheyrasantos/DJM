$(document).foundation();

/*============================================================================
 Fade in on scroll animation
==============================================================================*/
new WOW().init();


/*============================================================================
Signup Slick Carousel
==============================================================================*/
$('.signup-carousel').slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    nextArrow: '.signup-carousel .next',
    prevArrow: '.signup-carousel .prev',
    swipeToSlide: false,
    swipe: false,
    touchMove: false
});


/*============================================================================
Our Platforms Clout
==============================================================================*/
window.setInterval(function(){
    $.each($(".clout"),function(i,elem) {
        var $elem=$(elem);
        var count=parseInt($elem.html().replace(/,/g,''));
        var random=Math.floor(Math.random()*10);
        count=count+random;
        $elem.html(formatNumber(count));
    });
},1000);

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,");
}


/*============================================================================
Smooth Scrolling
==============================================================================*/
$('a.page-scroll').bind('click touchstart',function(event){
    var $anchor=$(this);

    $('html, body').stop().animate({
        scrollTop:($($anchor.attr('href')).offset().top-0)
    },1250,'easeInOutExpo');

    event.preventDefault();

});


/*============================================================================
Animated Label
==============================================================================*/
$(".signup-carousel input").focus(function() {
    $(this).prev("label.input-label").css('opacity', '1'); //show label of clicked item
}).blur(function() {
    $(this).prev("label.input-label").css('opacity', '0');
});

$(".signup-carousel input#email").focus(function() {
    $(this).parent().parent().find("label.input-label").css('opacity', '1'); //show label of clicked item
}).blur(function() {
    $(this).parent().parent().find("label.input-label").css('opacity', '0');
});


/*============================================================================
Form Validation
==============================================================================*/
var email = $("#email");
var emailFilter = /^.+\@.+$/;
var submitForm = 0;

function showEmailError(value, $elem) {
    if (value) {
        $elem.parent().parent().find("label").removeClass('input-error');
        $elem.parent().parent().find("label").addClass('input-label');
        submitForm = 1;
        return submitForm;
    } else {
        $elem.parent().parent().find("label").removeClass('input-label');
        $elem.parent().parent().find("label").addClass('input-error');
        return submitForm;
    }
};

function showError(value, $elem) {
    if (value) {
        $elem.prev().removeClass('input-error');
        $elem.prev().addClass('input-label');
        submitForm = 1;
        return submitForm;
    } else {
        $elem.prev().addClass('input-error');
        $elem.prev().removeClass('input-label');
        return submitForm;
    }
};

function isEmailValid() {
  var value = emailFilter.test(email.val());
  var $elem = email;
  return showEmailError(value, $elem);
};

function isInputValid($elem) {
    var $elem = $(this);
  var value = $(this).val();
  return showError(value, $elem);
};

/*============================================================================
Forms Submit, Trigger Carousel
==============================================================================*/
$('#email-form').on( 'submit', function( e ) {
    $self = $(this);
    e.preventDefault();

    isEmailValid();

    if ( isEmailValid() ) {

        var email = $("#email").val();

        $.ajax({
            url:"//apps.bitmotive.com/rogueshops/emails.php",
            type:"POST",
            data: $self.serialize(),
            success:function(data, textStatus, jqXHR){
                if ( data == "success" ) {
                    fbq('track', 'Lead');
                    $('.signup-carousel.slick-slider').slick('slickNext');
                    $('#email-form').prop('disabled');
                };
            }
        });

    } else {
        $('#email-form').prop('disabled');
        return false;
    };
});

$('#company-form').on( 'submit', function( e ) {
    $self = $(this);
    e.preventDefault();

    var company_name = $("#company_name").val();
    var current_site = $("#current_site").val();
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var email_hidden = $('#email_hidden').val(email);


    showError( company_name, $('#company_name') );
    showError( current_site, $('#current_site') );
    showError( first_name, $('#first_name') );
    showError( last_name, $('#last_name') );
    showError( phone, $('#phone') );



    if (  ( company_name != "" ) && ( current_site != "" ) && ( first_name != "" ) && ( last_name != "" ) && ( phone != "" ) ) {
        $.ajax({
            url:"//apps.bitmotive.com/rogueshops/customers.php",
            type:"POST",
            data: $self.serialize(),
            success:function(data, textStatus, jqXHR){
                if ( data == "success" ) {
                    fbq('track', 'CompleteRegistration');
                    $('.signup-carousel.slick-slider').slick('slickNext');
                    $('#company-form').prop('disabled');
                };
            }
        });

    } else {
        $('#company-form').prop('disabled');
        return false;
    };
});
