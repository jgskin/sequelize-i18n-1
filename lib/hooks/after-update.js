module.exports = function() {
    
    var i18n = this;
    
    return function( instance , options ) {
        // Get Generated model
        var i18n_model = i18n.getI18nModel( this.name ) ;
        if( i18n_model == null ) return;
        
        // Get i18n properies
        var i18n_options = {};
        if( instance && instance.dataValues && i18n_model.model) {
            for( var prop in instance.dataValues ) {
                if( prop in i18n_model.model ) {
                    i18n_options[prop] = instance.dataValues[prop];
                }                    
            }
            i18n_options.language_id = i18n.default_language;
            if( "language_id" in options ) {
                i18n_options.language_id = options.language_id;
            }
            i18n_options.parent_id = instance.dataValues.id;
        }
        
        return i18n.sequelize.models[i18n_model.name]
            .upsert(i18n_options)
            .then(r => instance.reload());
    };
}