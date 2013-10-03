$(function () {
    var open_dialog = null;
    var context_timer = null;

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
        target.find('> .active a').each(function () {
            activate($($(this).attr('href')));
        });
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

    // Dashboard selector
    $('#dashboard_selector a').click(function () {
        $('#dashboard_selector .dropdown_trigger').html($(this).html());
    });
    activate($($('#dashboard_selector li.active a').attr('href')));

    // Start with empty content
    $('#content > *').hide();
    $('#content > #content-overview').show();

    // The context selector
    $('#context .domains > ul > li').click(function () {
        var $that = $(this);
        $('#context li.hovered').removeClass('hovered');
        $that.addClass('hovered');
        $('#context .regions ul').hide();
        $('#context .regions ul li.active').parent().show();
        var target = $($that.find('a').attr('href'));
        activate(target);
        return false;
    });
    $('#context .projects > div > ul > li').click(function () {
        var $that = $(this);
        $that.siblings().removeClass('hovered');
        $that.addClass('hovered');
        var domain = $that.find('a').data('domain');
        $('a[href="' + domain + '"]').closest('li').addClass('hovered');
        var target = $($that.find('a').attr('href'));
        activate(target);
        return false;
    });
    $('#context .regions > ul > li').click(function () {
        $('#context li.hovered').removeClass('hovered');
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

    // Hover menu
    $('.dropdown-hover .dropdown_menu').hide();
    $('.dropdown-hover').hover(function () {
        $(this).find('.dropdown_menu').show();
    }, function () {
        $(this).find('.dropdown_menu').hide();
    }).click(function () {
        $(this).find('.dropdown_menu').hide();
    });

});
