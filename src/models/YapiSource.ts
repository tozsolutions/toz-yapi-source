import mongoose, { Schema, Document, Types } from 'mongoose';
import { YapiSource } from '../types';

interface YapiSourceDocument extends Document, Omit<YapiSource, '_id' | 'createdBy'> {
  createdBy: Types.ObjectId;
}

const yapiSourceSchema = new Schema<YapiSourceDocument>(
  {
    name: {
      type: String,
      required: [true, 'Source name is required'],
      trim: true,
      minlength: [3, 'Source name must be at least 3 characters long'],
      maxlength: [100, 'Source name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    url: {
      type: String,
      required: [true, 'Source URL is required'],
      trim: true,
      validate: {
        validator: function (url: string) {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        },
        message: 'Please provide a valid URL',
      },
    },
    type: {
      type: String,
      enum: ['swagger', 'openapi', 'postman', 'insomnia'],
      required: [true, 'Source type is required'],
    },
    version: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.length <= 10;
        },
        message: 'Cannot have more than 10 tags',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    authConfig: {
      type: {
        type: String,
        enum: ['none', 'basic', 'bearer', 'apikey'],
        default: 'none',
      },
      credentials: {
        type: Schema.Types.Mixed,
        default: {},
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required'],
    },
    lastSyncAt: {
      type: Date,
    },
    syncStatus: {
      type: String,
      enum: ['pending', 'syncing', 'success', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
yapiSourceSchema.index({ name: 1 });
yapiSourceSchema.index({ type: 1 });
yapiSourceSchema.index({ isActive: 1 });
yapiSourceSchema.index({ createdBy: 1 });
yapiSourceSchema.index({ tags: 1 });
yapiSourceSchema.index({ createdAt: -1 });
yapiSourceSchema.index({ lastSyncAt: -1 });

// Compound indexes
yapiSourceSchema.index({ isActive: 1, type: 1 });
yapiSourceSchema.index({ createdBy: 1, isActive: 1 });

// Virtual for source ID
yapiSourceSchema.virtual('id').get(function () {
  return (this._id as any).toHexString();
});

export const YapiSourceModel = mongoose.model<YapiSourceDocument>('YapiSource', yapiSourceSchema);