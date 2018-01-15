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

    // 
    function sliderChange(value) {
        var currentInput = $(".rangeslider--active").parent().children(".fr-calculator__input");
        currentInput.val(value);
    }

    // return event.charCode >= 48 && event.charCode <= 57;
    $(".fr-calculator__input").on("keypress", function(event) {
        // check if numeral input
        var filterNumerals = event.charCode >= 48 && event.charCode <= 57;

        var minVal = parseInt($(this).parent().children(".fr-calculator__range").prop("min"));
        var maxVal = parseInt($(this).parent().children(".fr-calculator__range").prop("max"));
        // check if inside value bounds
        var filterBounds = $(this).val() >= minVal && $(this).val() <= maxVal;
        console.log(filterBounds);

        // return filterNumerals && filterBounds;
        if (!(filterNumerals && filterBounds)) {
            event.preventDefault();
        };
    });
});