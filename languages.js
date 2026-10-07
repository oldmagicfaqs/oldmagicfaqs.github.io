var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
function SaveLanguagePreference(event, control)
{    
    $(ClientIDs.status).style.display = 'none';
    
    var result = false;
    
    control.disabled = true;
    
    var language = GetSelectedLanguage();
    var region = $(ClientIDs.regionSelect).value;
    
    new Ajax.Request('/Magic/Languages.aspx', {
      method: 'post',
      parameters: { action: 'save', language: language, region: region },
      onSuccess: function(transport) {
        control.value = $(ClientIDs.status).innerHTML;
        control.disabled = false;
        
        if(languageSelectFrom != 'none')
        {
            window.location = languageSelectFrom;
        }
      },
      onFailure: function(transport) {
        result = true;
        
        control.disabled = false;
      }
    });
    
    return result;
}

function GetSelectedLanguage()
{
    var result = null;
    
    var radios = $$('.regionRadio');
    
    if(radios != null)
    {
        for(var i = 0; i < radios.length; i++)
        {
            var control = radios[i];
            
            if(control.checked)
            {
                result = control.value;
                break;
            }
        }
    }
    
    return result;
}
}

/*
     FILE ARCHIVED ON 17:05:36 Feb 05, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:43:58 Oct 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.406
  load_resource: 97.648 (2)
  PetaboxLoader3.resolve: 56.699
  PetaboxLoader3.datanode: 39.965 (2)
*/