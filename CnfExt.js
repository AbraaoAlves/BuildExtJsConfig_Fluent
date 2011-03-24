/// <reference path="ext-all-debug-w-comments.js" />

///alguns controles do Ext com outra forma de acesso
//ex:
//var test = Ext.ux.Cnf.numberfield("juros", "Juros")
//    .disallowDecimals()
//    .disallowNegative()
//    .disallowBlank()
//    .setWidth(80)
//    .addListener('change', function(){
//        //implements function
//    });

(function(){

Ext.ns('Ext.ux.Cnf'); 

var Cnf = {};

Cnf.widGet = function (xtype, name) {
    return {
        xtype      : xtype,
        id         : name,
        name       : name,
        listeners  : {},
        setWidth   : function(width){
            ///<summary>
            /// 
            ///</summary>

            this.width = width;
            return this;
        },
        addListener: function(event, yourFunction){
            ///<summary>
            ///Adiciona uma função que será lançada no evento expecificado.
            ///obs: O metodo irá sobrescrever a funcção do evento se ele já existir
            ///</summary>
        
            this.listeners[event] = yourFunction;            
            return this;
        },
        setAttr : function (key, value) {
            ///<summary>
            ///Essa funcção serve como escape caso exista alguma propriedade não mapeada pelo Ext.ux.Cnf
            ///</summary>
        
            this[key] = value;
            return this;
        }
    };
};

Cnf.fieldSet = function (title) {
    var that = Cnf.widGet('fieldset', '');

    that.items = [];
    that.header = true;
    that.title = title;
    that.disallowHeader = function () {
        that.header = false;
        return that;
    };
    that.addItem = function (item) {
        that.items.push(item);
        return that;
    };

    return that;
}; 

Cnf.inputWidget = function(xtype, name, label){
    var that = Cnf.widGet(xtype, name);
    
    if(label)
        that.fieldLabel = label;

     that.disallowBlank = function(){
        that.allowBlank = false;
        return that;
    };

    return that;
};

Cnf.textField = function(name, label){
    
    return Cnf.inputWidget('textfield', name, label);
};

Cnf.label = function (name) {
    
    return Cnf.widGet('label', name);
};

Cnf.compositeFields = function (name, label) {
      
    var that = Cnf.inputWidget('compositefield', name, label);
    //inicializando os items
    that.items = [];

    that.addItem = function (item) {
        that.items.push(item);
        return that;
    };

    return that;
};

Cnf.numberfield = function (name, label) {
    
    var that = Cnf.inputWidget('numberfield', name, label);

    that.disallowDecimals = function (){
        that.allowDecimals = false;
        return that;
    };
    that.disallowNegative = function () {
        that.allowNegative = false;
        return that;
    };
    
    return that;
};

Cnf.comboBoxConfig = function (name ) {
    ///<summary>
    /// Use para passar como parametro para o construtor do new Ext.form.ComboBox(comboBoxConfigs)
    ///</summary>

    var that = Cnf.inputWidget('', name,'');
    
    that.allowTypeAhead = function () {
        that.typeAhead = true;
        return that;
    };
    that.setTriggerAction = function (val) {
        that.triggerAction = val;
        return that;
    };
    that.disallowEditable = function () {
        that.editable = false;
        return that;
    };
    that.setMode = function (val) {
        that.mode = val;
        return that;
    };
    that.allowForceSelection = function () {
        that.forceSelection = true;
        return that;
    };
    that.setDataToStore = function ( idStore, data ) {
        that.store = new Ext.data.ArrayStore({
            id     : idStore,
            fields : ['codigo', 'descricao'],
            data   : data 
        });
        that.valueField   = 'codigo';
        that.displayField = 'descricao';

        return that;
    };

    return that;
};

Ext.ux.Cnf = Cnf;

})();
