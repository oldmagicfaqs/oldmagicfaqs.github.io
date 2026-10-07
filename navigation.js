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

Son of Suckerfish CSS based dropdown menus, 
For more information see:
http: //www.htmldog.com/articles/suckerfish/dropdowns/

Adds the sfhover class to elements in IE 5.5/IE 6 and other browsers
that do not support the CSS :hover pseudoclass.

See navigation.css for the code that actually controls the
hover state of the menus.

*/

sfHover = function() {
    if (!document.getElementById("mainNav")) return false;
	var sfEls = document.getElementById("mainNav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
    if (!document.getElementById("leftColumn")) return false;
	var sfEls = document.getElementById("leftColumn").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);
}

/*
     FILE ARCHIVED ON 17:05:34 Feb 05, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:43:57 Oct 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.32
  load_resource: 113.651 (2)
  PetaboxLoader3.resolve: 81.236 (2)
  PetaboxLoader3.datanode: 31.57 (2)
*/