$(document).ready(function() {
    // range slider setup
    $('input[type="range"]').rangeslider({
        // Feature detection the default is `true`.
        // Set this to `false` if you want to use
        // the polyfill also in Browsers which support
        // the native <input type="range"> element.
        polyfill: false,

        // Default CSS classes
        rangeClass: 'rangeslider',
        disabledClass: 'rangeslider--disabled',
        horizontalClass: 'rangeslider--horizontal',
        verticalClass: 'rangeslider--vertical',
        fillClass: 'rangeslider__fill',
        handleClass: 'rangeslider__handle',

        // Callback function
        onInit: function() {},

        // Callback function
        onSlide: function(position, value) {
            sliderChange(value);
        },

        // Callback function
        onSlideEnd: function(position, value) {}
    });

    function sliderChange(value) {
        // var currentInput = $(".rangeslider--active").parent().children(".fr-calculator__input");
        var currentInput = $(".rangeslider--active").parent().children(".fr-calculator__input");
        currentInput.val(value);
        console.log(currentInput.val());
        console.log(value);
    }
});