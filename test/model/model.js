module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('model', {
        id : {
            type 			: DataTypes.BIGINT,
            primaryKey 		: true,
            autoIncrement 	: true
        },
        name : {
            type 			: DataTypes.STRING,
            i18n		 	: true,
        },
        reference : {
            type 			: DataTypes.STRING,
        }
    }, { freezeTableName : true });

    return Model;
};
