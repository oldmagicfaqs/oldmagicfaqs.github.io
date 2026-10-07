var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
var globalSmartSearchObj = new GlobalSmartSearch();

Event.observe(window, 'load', globalSmartSearchObj.SubscribeToEvents);

function FocusSearchTextBox(event, control) 
{
    if (origionalGlobalSmartSearchTextBoxValue == null) 
    {
        origionalGlobalSmartSearchTextBoxValue = control.value;
    }

    if (control.value == origionalGlobalSmartSearchTextBoxValue) 
    {
        control.value = '';
        control.style.fontStyle = 'normal';
        control.style.color = '#000000';
    }
}

function UnfocusSearchTextBox(event, control) 
{
    if (control.value == '') 
    {
        control.value = origionalGlobalSmartSearchTextBoxValue;
        control.style.fontStyle = 'italic';
        control.style.color = '#666666';
    }
}

function GlobalSmartSearch()
{
    var inlineSearchPosition = -1;
    var inlineSearchElements = new Array();
    var searchedValue = null;
    var searchTimeout = null;
        
    this.SubscribeToEvents = SubscribeToEvents;    
   
    function SubscribeToEvents()
    {
        if(enableGlobalSmartSearch)
        {
            SubscribeToGlobalSmartSearchBoxEvents();
        
            Event.observe(window, 'click', WindowAutoCompleteClick);
        }
    }

    function SubscribeToGlobalSmartSearchBoxEvents()
    {
        var localSearchBoxes = $$('.globalSearchControlTextBox');
        
        for(var i = 0; i < localSearchBoxes.length; i++)
        {
            var localSearchBox = localSearchBoxes[i].select('input')[0];;
            
            if (localSearchBox.value == '' || localSearchBox.value == origionalGlobalSmartSearchTextBoxValue)
            {
                localSearchBox.style.fontStyle = 'italic';
            }
            
            if(localSearchBox != null)
            {
                Event.observe(localSearchBox, 'keyup', PerformSmartSearch);
                Event.observe(localSearchBox, 'keydown', UpdateSmartSearch);
            }
        }
    }
    
    function WindowAutoCompleteClick(event)
    {
        ToggleSearchControl('none', null);
    }
    
    function ToggleSearchControl(displayStyle, searchResultsAreaID)
    {
        if(searchResultsAreaID == null)
        {
            var searchResultsAreas = $$('.GlobalSmartSearchBox');
            
            for(var i = 0; i < searchResultsAreas.length; i++)
            {
                searchResultsAreas[i].style.display = displayStyle;
            }
        } 
        else 
        {
            $(searchResultsAreaID).style.display = displayStyle;
            
            inlineSearchPosition = -1;        
            inlineSearchElements = new Array();
        }
    }
    
    function HighlightSmartSearchElement(previousPos, newPos, items)
    {
        if(previousPos >= 0 && previousPos < inlineSearchElements.length)
        {
            var oldItem = items[previousPos];
            
            if(oldItem != null)
            {
                oldItem.className = 'GlobalSmartSearchItem';
            }
        }
        
        if(newPos >= 0 && newPos < inlineSearchElements.length)
        {
            var newItem = items[newPos];
            
            if(newItem != null)
            {
                newItem.className = 'GlobalSmartSearchItem Selected';
            }
        }
    }
    
    function UpdateSmartSearch(event)
    {
        var control = Event.element(event);
        var keyCode = event.keyCode ? event.keyCode : event.which;  
            
        if(keyCode == Event.KEY_DOWN)
        {
            var searchItems = $$('.GlobalSmartSearchItem');
        
            if(inlineSearchPosition < inlineSearchElements.length - 1)
            {                
                if(inlineSearchPosition < searchItems.length - 1)
                {
                    inlineSearchPosition++;
                
                    HighlightSmartSearchElement(inlineSearchPosition - 1, inlineSearchPosition, searchItems);
                }
            }            
        }
        else if(keyCode == Event.KEY_UP)
        {
            if(inlineSearchPosition > 0)
            {
                var searchItems = $$('.GlobalSmartSearchItem');
                
                inlineSearchPosition--;
            
                HighlightSmartSearchElement(inlineSearchPosition + 1, inlineSearchPosition, searchItems);
            }
            
            Event.stop(event);
        }
        else if(keyCode == Event.KEY_RETURN)
        {
            if(inlineSearchPosition + 1 >= 0 && inlineSearchPosition + 1 < inlineSearchElements.length)
            {            
                var searchItems = $$('.GlobalSmartSearchItem');
                
                for(var i = 0; i < searchItems.length; i++)
                {
                    if(searchItems[i].className == 'GlobalSmartSearchItem Selected')
                    {
                        var link = searchItems[i];
                        
                        if(link.href != null )
                        {
                            window.location = link.href;
                        }
                        
                        break;
                    }
                }
            }                
            
            Event.stop(event);
        }
        else if(keyCode == Event.KEY_ESC)
        {
            ToggleSearchControl('none', null);
        }
    }
    
    function GetAndUpdateSearchResults(searchType, searchString, smartSearchAreaID)
    {
        var searchGroupArea = $('GlobalSearchSection' + searchType + smartSearchAreaID);
        
        searchGroupArea.update(new Element('div', { 'class': 'GlobalSearchLoading'}).addClassName('GlobalSearchLoading').update('Loading'));

        new Ajax.Request(GlobalSmartSearchService, {
            method: 'get',
            parameters: { SearchType: searchType, SearchString: searchString, cacheBust: new Date().getTime() },
            onSuccess: function(transport)
            {
                if (transport.responseText != null && transport.responseText != '')
                {
                    var results = eval("(" + transport.responseText + ")");

                    if (results != null && results.SearchCharacters == searchString && results.SearchCharacters == searchedValue)
                    {
                        searchGroupArea.update();

                        if (results.Results.length == 0)
                        {
                            var item = new Element('div', { 'class': 'GlobalSmartSearchItem' }).addClassName('GlobalSmartSearchItem').update('No results available.');

                            searchGroupArea.insert(item);

                            inlineSearchElements.push(item);
                        }

                        for (var i = 0; i < results.Results.length; i++)
                        {
                            var info = results.Results[i];
                            var item = new Element('a', { 'class': 'GlobalSmartSearchItem' }).addClassName('GlobalSmartSearchItem');

                            item.href = info.Link;
                            item.update(info.Title);
                            item.searchType = results.SearchType;

                            Event.observe(item, 'click', function() {
                                window.location = item.href;
                            });

                            searchGroupArea.insert(item);

                            inlineSearchElements.push(item);
                        }

                        var allResultsLabel = $('GlobalSearchLabel' + searchType + smartSearchAreaID);

                        if (allResultsLabel != null && results.CompleteResults != null)
                        {
                            allResultsLabel.update(new Element('a', { 'href': results.CompleteResults }).update('Complete Results'));
                        }
                    }
                }
            }
        });     
    }
    
    function PerformSmartSearch(event)
    {
        var control = Event.element(event);
        var keyCode = event.keyCode ? event.keyCode : event.which;  
        var letter = keyCode != Event.KEY_DOWN && keyCode != Event.KEY_UP && keyCode != Event.KEY_RETURN && keyCode != Event.KEY_ESC;       
        var smartSearchAreaID = control.id.replace(/SearchBox/, '') + 'SearchResults';
        var smartSearchResultsAreaID = control.id.replace(/SearchBox/, '');

        if(letter && control.value.length > 0)
        {
            if(control.value != '' && control.value.length >= 3 && control.value != searchedValue)
            {
                searchedValue = control.value;
            
                ToggleSearchControl('block', smartSearchAreaID);
            
                clearTimeout(searchTimeout);
                
                searchTimeout = setTimeout(function() { 
                                                    inlineSearchElements = new Array();
                                               
                                                    GetAndUpdateSearchResults('Web', control.value, smartSearchResultsAreaID);
                                                    GetAndUpdateSearchResults('Shortcuts', control.value, smartSearchResultsAreaID);
                                                    
                                                    if(searchGatherer)
                                                    {
                                                        GetAndUpdateSearchResults('Gatherer', control.value, smartSearchResultsAreaID);
                                                    }
                                                }, 500);
            }
        }
        else if(control.value.length == 0)
        {
            ToggleSearchControl('none', smartSearchAreaID);
        }
    }
}
}

/*
     FILE ARCHIVED ON 17:05:36 Feb 05, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:44:00 Oct 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 1.351
  load_resource: 967.648 (2)
  PetaboxLoader3.resolve: 930.103 (2)
  PetaboxLoader3.datanode: 36.134 (2)
*/