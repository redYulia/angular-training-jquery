(function ( $ ) {
    $(document).on('data-changed', function(event, oldData, newData) {
        if (oldData !== newData) {
            console.log('changed)');
        }
    });
    var methods = {
        init : function(options) {
            
            return this.each(function(){
                var $this = $(this),
                    selectedValue = null,
                    selectedIndex = 0,
                    options = $this.find('option');
                if ( ! data ) {
                    $(this).data('combobox', {
                        target : $this[0],
                        selectedValue: selectedValue,
                        selectedIndex: selectedIndex
                    });
                }
                var data = $this.data('combobox');
                console.log(data);
                //console.log(options);
                var currTarget = data.target;
                options.click(function(event) {
                    var optionIndex = options.index(this);
                    $(document).trigger('data-changed', [ data.selectedIndex, optionIndex ]);
                    data.selectedIndex = optionIndex;
                    //$this.selectedIndex = optionIndex;
                    options.removeAttr('selected');
                    $(this).attr('selected', 'selected');
                    /*for (var i = 0; i < options.length; i++) {
                        console.log(options[i].selected, options);
                    }  */    
                    console.log($this.data('combobox').selectedIndex);
                    //console.log($this.find('option:selected'));
                });
            });
        },
        getValue : function() {
            var $this = $(this),
                data = $this.data('combobox');
            //console.log("YYYY", data);
            return data.selectedIndex;
        },
        setValue : function(index) {
            return this.each(function(){
                var $this = $(this),
                    data = $this.data('combobox'),
                    options = $this.find('option');
                $(document).trigger('data-changed', [ data.selectedIndex, index]);
                //data.target.selectedIndex = num;
                options.removeAttr('selected');
                $(options[index]).attr('selected', 'selected');
                data.selectedIndex = index;
                //$this.selectedIndex = index;
                console.log(data.selectedIndex);
            });
        },
    };
    
    $.fn.combobox = function( methodOrOptions ) {
        
        if ( methods[methodOrOptions] ) {
            //methods.init.apply( this, arguments );
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist' );
        }   
    };
 
}( jQuery ));

$('not-select.combobox').combobox();