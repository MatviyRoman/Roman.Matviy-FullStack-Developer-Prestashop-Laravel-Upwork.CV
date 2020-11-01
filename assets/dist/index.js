$(function () {
    $('.phoneShow').click(function () {
        $('.phoneShow').toggle();
        $('.phoneHide').toggle();
    });
    $('.phoneShow>a').click(function (event) {
        event.preventDefault();
    });
});