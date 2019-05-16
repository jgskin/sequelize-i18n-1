/**
 * Sequelize instance hook
 * Inspect each manually define models and create the corresponding i18n model
 */
var _ = require('lodash');
var utils = require('../utils');

module.exports = function() {
    
    var i18n = this;
    
    this.sequelize.beforeDefine('beforeDefine_i18n', function( model , options ) {
        var schema = null;
        var _options = {
            indexes : []
        };
        
        // Check if current model has i18n property        
        var pk = utils.getModelUniqueKey( model );

        for( var prop in model ) {
            if( model.hasOwnProperty( prop ) ){
                
                if( 'i18n' in model[prop] && (model[prop].i18n === true) ) {
                    if( !pk ) throw new Error('No primary or unique key found for ' + options.modelName + ' model' );
                    schema = schema || {
                        'language_id' : {
                            type 			: i18n.language_type,
                            unique:         'i18n_unicity_constraint'
                        },
                        'parent_id' : {
                            type 			: pk.type,
                            unique:         'i18n_unicity_constraint'
                        }
                    };
                    if ('unique' in model[prop] && (model[prop].unique === true)) {
                        _options.indexes.push({
                            unique: true,
                            fields: ['language_id' , prop]
                        });
                    }
                    schema[prop] = {
                        type : model[prop].type
                    }
                    model[prop].type = i18n.sequelize.Sequelize.VIRTUAL;
                }
            }
        }
        
        if( schema ) {

            var name = i18n.getI18nName( options.modelName );
            var created_model = i18n.createI18nModel( i18n.getI18nName( options.modelName ) , schema , _options , options.modelName );
            
            // Save created model 
            i18n.i18n_models.push(created_model);
            
            if( i18n.i18n_default_scope ) {
                options.defaultScope = options.defaultScope || {};
                i18n.setDefaultScope( options.defaultScope , name );
            }
            if( i18n.add_i18n_scope ) {
                options.scopes = options.scopes || {};
                i18n.addI18nScope( options.scopes , name );
            }
            if( i18n.inject_i18n_scope ) {
                options.scopes = options.scopes || {};
                i18n.injectI18nScope( options.scopes , name );
            }

            // Add hooks to model
            options.hooks = options.hooks || {};
            options.hooks.beforeFind = i18n.beforeFind();
            options.hooks.afterCreate = i18n.afterCreate();
            options.hooks.afterUpdate = i18n.afterUpdate();
            options.hooks.afterDestroy = i18n.afterDestroy();
        }
    });
}