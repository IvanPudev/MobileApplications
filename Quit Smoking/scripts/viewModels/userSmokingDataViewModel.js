var app = app || {};

(function(a){
    var viewModel = kendo.observable({
        userData: {},
        change:onCategoryChanged
    });
    
    function init(e){
        kendo.bind(e.view.element, viewModel);
        
        
    };
    
    a.userData = {
        init:init          
    };
}(app))