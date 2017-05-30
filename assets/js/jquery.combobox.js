(function ( $ ) {
    var methods = {
        init : function(settings) {
            return this.each(function(){
                $(this).on('value-changed', function(event, oldValue, newValue) {
                    if (oldValue !== newValue) {
                        return settings.onValueChanged(oldValue, newValue);
                    }
                })
                var $this = $(this),
                    selectedValue = settings.value;
                for (var i = 0; i < settings.options.length; i++) {
                    var option = settings.options[i];
                    $this.append('<option>'+option+'</option>');
                }
                if (settings.value) {
                    $this.find('option').val(
                        function(index, x){
                            if(parseInt(x) === settings.value) {
                                $(this).attr('selected', 'selected');  
                            }
                            return x;
                        }
                    );
                }
                if (!data) {
                    $this.data('combobox', {
                        target : $this[0],
                        selectedValue: selectedValue
                    });
                }     
                var data = $this.data('combobox');
                console.log('data', data);
                console.log('settings', settings);
                console.log('val', settings.value);
                
                var optionElems = $this.find('option');
                optionElems.click(function(event) {
                    var optionValue = parseInt($(this).val());
                    $this.trigger('value-changed', [ data.selectedValue, optionValue ]);
                    if (!$(this).prop('selected')) {
                        optionElems.removeAttr('selected');
                        $(this).attr('selected', 'selected');  
                        data.selectedValue = optionValue;
                    }
                    console.log(data.selectedValue);
                });
            });
        },
        getValue : function() {
            var $this = $(this),
                data = $this.data('combobox');
            return data.selectedValue;
        },
        setValue : function(value) {
            return this.each(function(){
                var $this = $(this),
                    data = $this.data('combobox'),
                    options = $this.find('option'),
                    valueExist = false;
                options.val(
                    function(index, x){
                        if(parseInt(x) === value) {
                            valueExist = true;
                            options.removeAttr('selected');
                            $(this).attr('selected', 'selected');  
                        }
                        return x;
                    }
                );
                if (valueExist) {
                    $this.trigger('value-changed', [ data.selectedValue, value ]);
                    data.selectedValue = value;
                }
                else {
                    console.log('incorrect value');
                }
                console.log(data.selectedValue);
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

