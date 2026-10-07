var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/*
-----------------------------------------------------
Wizards.com:  navigation.js
Copyright (c) 2008 Wizards of the Coast
http: //www.wizards.com/
-----------------------------------------------------
*/

Event.observe(window, 'load', function () {
    $('navpreload').remove();
    // For each span tag within the left nav elements (only the top level elements
    // have these span tags), watch for the click event on the span tag and stop
    // the usual click behavior. If a span is clicked, go back to element's LI tag 
    // and toggle the "active" class in order to show or hide the submenu and swap 
    // the plus/minus symbols.
    $$('#leftColumn li span').each(function (s) {
        var element = Element.extend(s);
        element.observe('click', respondToClick);
    });

    function respondToClick(event) {
        Event.stop(event);
        var element = Event.element(event);
        var parents = element.ancestors();
        var p = parents[0];
        var actionType = p.hasClassName('active') ? "Close-" : "Expand-";
        if (p.id) {
            gaTrackEvent('Magic', 'MagicWeb-LeftNav', actionType + p.id.split("MagicLeftNavigation_").pop());
        }
        parents[0].toggleClassName('active');

        setLeftNavCookie(parents[0].id)
    };

    function showLeftNavTiers() {
        var url = window.location.pathname.toLowerCase();
        var activeState = "";

        if (url.indexOf("multiverse") > -1) {
            activeState = "multiverse";
        }
        else if (url.indexOf("tcg") > -1) {
            activeState = "tcg";
        }
        else if (url.indexOf("magazine") > -1) {
            activeState = "magazine";
        }
        else if ((url.indexOf("duelsoftheplaneswalkers") > -1) ||
                (url.indexOf("digital") > -1)) {
            activeState = "dg";
        }
        else if (url.indexOf("novels") > -1) {
            activeState = "novels";
        }
        else if (url.indexOf("merchandise") > -1) {
            activeState = "merchandise";
        }

        //multiverse left nav by default
        if (activeState == "")
            activeState = "multiverse";

        var cn = "tier1 " + activeState;

        if ($(activeState) != null)
            $(activeState).className = cn;

        var cname = "magicLeftNav";
        var c = readCookie(cname);

        if (c != null) {
            var split = c.split(',');

            for (var i = 0; i < split.length; i++) {
                if (split[i] != "") {
                    if ($(split[i]) != null)
                        $(split[i]).className = "parent active";
                }
            }
        }
    };


    function setLeftNavCookie(id) {
        var cname = "magicLeftNav";
        var c = readCookie(cname);

        var cValue = "";

        if ($(id).className.indexOf("active") > -1) {
            cValue += id + ",";
        };

        if (c != null) {
            var split = c.split(',');

            for (var i = 0; i < split.length; i++) {
                if (split[i] != "") {
                    if ($(split[i]).className.indexOf("active") > -1) {
                        cValue += split[i] + ",";
                    }
                }
            }

            createCookie(cname, cValue, 0);
        }
        else {
            createCookie(cname, cValue, 0);
        }
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // =======================================================

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // =======================================================

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    // add on-off handling to all buttons with 'hottrack' class
    // set the class 'static' for all elements that will be displayed when the mouse is not over the item
    // set the class 'active' for all elements that will be displayed when the mouse is over the item
    $$('a.hottrack').each(function (a) {
        a.observe('mouseover', function () {
            $(this).select('.static').each(function (i) {
                i.setStyle({ display: 'none' });
            });
            $(this).select('.active').each(function (i) {
                i.setStyle({ display: '' });
            });
        });
        a.observe('mouseout', function () {
            $(this).select('.static').each(function (i) {
                i.setStyle({ display: '' });
            });
            $(this).select('.active').each(function (i) {
                i.setStyle({ display: 'none' });
            });
        });
    });

    showLeftNavTiers();

});

}

/*
     FILE ARCHIVED ON 17:05:35 Feb 05, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:43:58 Oct 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.343
  load_resource: 136.543 (2)
  PetaboxLoader3.resolve: 81.549 (2)
  PetaboxLoader3.datanode: 30.833 (2)
*/