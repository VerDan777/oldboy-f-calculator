$(document).ready(function() {
    ////////////////////////
    // range slider setup //
    ////////////////////////

    // swapping all input[type="range"] with polyfills
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

    // slider change handler
    function sliderChange(value) {
        var currentInput = $(".rangeslider--active").parent().children(".fr-calculator__input");
        currentInput.val(value);
        calcProfit();
    }

    // return event.charCode >= 48 && event.charCode <= 57;
    // fields input handler
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

    ////////////////////////
    // profit calculation //
    ////////////////////////

    // caching fields
    var $rent           = $("#fc-rent");
    var $avgCheck       = $("#fc-average-check");
    var $adsCost        = $("#fc-ads-cost");
    var $barberShare    = $("#fc-barber-share");
    var $clientsNum     = $("#fc-clients-num");
    var $expenses       = $("#fc-expenses");
    var $reception      = $("#fc-receptionist");
    var $royalty        = $("#fc-royalty");
    
    function calcProfit() {
        // getting field values
        var rent = parseInt($rent.val());
        var avgCheck = parseInt($avgCheck.val());
        var adsCost = parseInt($adsCost.val());
        var barberShare = parseInt($barberShare.val());
        var clientsNum = parseInt($clientsNum.val());
        var expenses = parseInt($expenses.val());
        var reception = parseInt($reception.val());

        // counting profit
        var VISITS_PER_MONTH = 1;
        // var CLEANUP_N_OTHER = 10000;
        // var RECEPTIONIST_SALARY = 45000;
        var income = clientsNum * avgCheck * VISITS_PER_MONTH;
        var barbersSalary = barberShare * income / 100;
        var shavingCosts = 30 * clientsNum * VISITS_PER_MONTH;
        
        var royalty = calcRoyalty(income);

        var profit = income - rent - expenses - reception - adsCost - shavingCosts - barbersSalary;
        setProfit(profit);
    }

    // calculating royalty
    function calcRoyalty(income) {
        var royalty = Math.min(30000, parseInt(income * 0.05));
        $royalty.val(Math.max(royalty, 0));

        return royalty;
    }

    // setting profit field
    function setProfit(profit) {
        $("#fc-profit").html(parseInt(profit) + " <span>рублей</span>");
    }

    calcProfit();
});