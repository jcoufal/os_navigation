$(function () {
    var activate = function (target) {
        target.siblings().hide();
        target.show();
    };

    // Dropdowns activated on click
    $('.dropdown:not(.dropdowns-hover) .dropdown_trigger').click(function () {
        $(this).next('.dropdown_menu').toggle();
    });

    // Handle active class in dropdowns
    $('.dropdown > ul > li').click(function () {
        $(this).closest('.dropdown_menu').hide();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    // Hide all elements that are not selected in a dropdown
    $('.dropdown > ul > li.active').each(function () {
        var target = $($(this).find('a').attr('href'));
        activate(target);
    });

    // Handle active status of navigation tabs
    $('.nav_bar li').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    // Hide all elements that are not selected in a navigation
    $('.nav_bar li.active').each(function () {
        var target = $($(this).find('a').attr('href'));
        activate(target);
    });

    // Handle links to elements
    $('a[href!="#"]').click(function () {
        var target = $($(this).attr('href'));
        activate(target);
    });

    // Start with empty content
    $('#content > *').hide();

    // The context selector
    $('#context .domains > ul > li').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#domain').html($(this).find('a').html());
        $('#project').html('?');
        $('#region').html('?');
        $('.projects > div > ul > li.active').removeClass('active');
        $('.regions > ul').hide();
    });
    $('#context .projects > div > ul > li').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#project').html($(this).find('a').html());
        $('#region').html('?');
        $('.regions > ul > li.active').removeClass('active');
    });
    $('#context .regions > ul > li').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#region').html($(this).find('a').html());
    });
    $('#context li.active').each(function () {
        var target = $($(this).find('a').attr('href'));
        activate(target);
    });
});
