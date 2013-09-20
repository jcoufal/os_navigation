$(function () {
    var open_dialog = null;

    // Hide dialogs when clicking outside of them
    $('body').click(function () {
        if (open_dialog) {
            open_dialog.hide();
            open_dialog = null;
        };
    });

    var activate = function (target) {
        target.siblings().hide();
        target.show();
    };

    // Dropdowns activated on click
    $('.dropdown:not(.dropdowns-hover) .dropdown_trigger').click(function () {
        var menu = $(this).next('.dropdown_menu');
        if (open_dialog) {
            open_dialog.hide();
            open_dialog = null;
        } else {
            open_dialog = menu.toggle();
        };
        return false;
    });

    // Handle active class in dropdowns
    $('.dropdown > ul > li').click(function () {
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
    $('#content > #content-overview').show();

    // The context selector
    $('#context .domains > ul > li').hover(function () {
        $(this).siblings().removeClass('hovered');
        $(this).addClass('hovered');
        $('#context .regions ul').hide();
        $('#context .regions ul li.active').parent().show();
        var target = $($(this).find('a').attr('href'));
        activate(target);
    });
    $('#context .projects > div > ul > li').hover(function () {
        $(this).siblings().removeClass('hovered');
        $(this).addClass('hovered');
        var target = $($(this).find('a').attr('href'));
        activate(target);
    });
    $('#context li a').click(function () {
        $('#context li.active').removeClass('active');
        var domain = $(this).data('domain');
        var project = $(this).data('project');
        var region = $(this).data('region');
        var domain_link = $('a[href="' + domain + '"]');
        var project_link = $('a[href="' + project + '"]');
        var region_link = $('a[href="' + region + '"]');
        domain_link.closest('li').addClass('active');
        project_link.closest('li').addClass('active');
        region_link.closest('li').addClass('active');
        $('#domain').html(domain_link.html());
        $('#project').html(project_link.html());
        $('#region').html(region_link.html());
        $('#context .dropdown_menu').hide();
        open_dialog = null;
        return false;
    });
    $('#context li.active').each(function () {
        var target = $($(this).find('a').attr('href'));
        activate(target);
    });
});
