$(function(){

    var list_template = null;
    var search_result_template = null;
    var search_template = null;
    var SEARCH_KEY = "search=";

    function init(){
        var source_list = $("#entries-template").html();
        var source_search_result = $("#search-result-template").html();
        var source_search_form = $("#search-form-template").html();

        list_template = Handlebars.compile(source_list);
        search_result_template = Handlebars.compile(source_search_result);
        search_template = Handlebars.compile(source_search_form);
    }

    function loadList(searchPattern){

        var entries = [
            {title: "The Pragmatic Programmer", author: "Dave Hunt, Andy Thomas"},
            {title: "Clean Code", author: "Bob Martin"},
            {title: "Secrets of the JavaScript Ninja", author: "John Resig, Bear Bibeaut"},
            {title: "JavaScript the good parts", author: "Doug Crockford"}
        ]

        return _.filter(entries, function(param){
            return s.include(param.title.toLowerCase(), searchPattern.toLowerCase());
        });
    }

    function render(entries, criteria){
        var html = list_template({entries: entries});
        $('#list').html(html);

        var search = search_template({criteria: criteria});
        $('#search-form').html(search);
        $("form").submit(triggerUpdate);

        var title = search_result_template({criteria: criteria});
        $('#search-message').html(title);
        $("#reset").click(clearResults);
    }

    function pushUrl(searchPattern){
        
        var hash;

        if(searchPattern){
            hash = SEARCH_KEY + searchPattern; 
        } else {
            hash = ""; 
        }

        document.location.hash = hash;
    }

    function getSearchPattern(){
        var hash = document.location.hash;

        if(s.include(hash, SEARCH_KEY)){
            return s.replaceAll(hash, "#" + SEARCH_KEY, "");
        } else{
            return "";
        }
    }

    function triggerUpdate(e){
        var searchPattern = $("#criteria").val();
        render(loadList(searchPattern), searchPattern);
        pushUrl(searchPattern);
        
        if(e){
            e.preventDefault();
        }
    }

    function clearResults(){
        $("#criteria").val("");
        triggerUpdate();
    }

    init();
    var searchPattern = getSearchPattern();
    render(loadList(searchPattern), searchPattern);
});