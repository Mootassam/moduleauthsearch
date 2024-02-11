import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
import TenantUserSchema from './schemas/tenantUserSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('audit');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const AuditSchema = new Schema(
    {
      email: {
        type: String,
        maxlength: 255,
      },
      userId: {
        type: String,
      },
      login: {
        type: Date,
      },
      logout: {
        type: Date,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  AuditSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  AuditSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AuditSchema.set('toJSON', {
    getters: true,
  });

  AuditSchema.set('toObject', {
    getters: true,
  });

  return database.model('audit', AuditSchema);
};
