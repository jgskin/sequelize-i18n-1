/**
 * Sequelize instance hook
 * Define hasMany Association between original models and created i18n models
 */

module.exports = function() {
    var i18n = this;

    this.sequelize.afterDefine('afterDefine_i18n', function( model ) {
        // Loop throught i18n_models
        var i18n_model_name = i18n.getI18nModel( model.name );
        // console.log(i18n_model_name);
        if( i18n_model_name ) {
            i18n.setInstanceMethods(model);

            i18n.sequelize.models[model.name].hasMany(
                i18n.sequelize.models[i18n_model_name.name], 
                { as : i18n_model_name.name, foreignKey: 'parent_id', unique: 'i18n_unicity_constraint' }
            );
        }
    });
}