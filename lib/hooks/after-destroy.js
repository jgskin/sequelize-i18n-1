module.exports = function() {
    var i18n = this;
    
    return function( instance, options ) {
        // Get Generated model
        var i18n_model = i18n.getI18nModel( this.name );
        if( i18n_model == null ) return;
        
        i18n.sequelize.models[i18n_model.name].destroy({
            where : {
                parent_id : instance.id
            }
        });
    };
}