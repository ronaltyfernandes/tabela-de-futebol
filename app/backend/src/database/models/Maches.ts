import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class Matches extends Model<InferAttributes<Matches>,
InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}
Matches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      field: 'username,',
    },
    homeTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.NUMBER,
      references: {
        model: 'teams',
        key: 'id',
      },
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);
TeamsModel.hasMany(Matches, {
  foreignKey: 'home_team_id',
  as: 'homeTeamId',
});
Matches.belongsTo(TeamsModel, {
  foreignKey: 'home_team_id',
  as: 'homeTeamId',
});
TeamsModel.hasMany(Matches, {
  foreignKey: 'away_team_id',
  as: 'awayTeamId',
});
Matches.belongsTo(TeamsModel, {
  foreignKey: 'away_team_id',
  as: 'awayTeamId',
});

export default Matches;
