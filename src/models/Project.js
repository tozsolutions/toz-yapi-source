import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - location
 *         - owner
 *       properties:
 *         _id:
 *           type: string
 *           description: Project ID
 *         name:
 *           type: string
 *           description: Project name
 *           minLength: 3
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: Project description
 *           maxLength: 1000
 *         location:
 *           type: object
 *           required:
 *             - address
 *             - city
 *           properties:
 *             address:
 *               type: string
 *               description: Project address
 *             city:
 *               type: string
 *               description: Project city
 *             coordinates:
 *               type: object
 *               properties:
 *                 lat:
 *                   type: number
 *                   minimum: -90
 *                   maximum: 90
 *                   description: Latitude
 *                 lng:
 *                   type: number
 *                   minimum: -180
 *                   maximum: 180
 *                   description: Longitude
 *         status:
 *           type: string
 *           enum: [planning, active, completed, cancelled]
 *           default: planning
 *           description: Project status
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Project start date
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: Project expected end date
 *         budget:
 *           type: number
 *           minimum: 0
 *           description: Project budget
 *         owner:
 *           type: string
 *           description: Project owner (User ID)
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Project tags
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Project creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Project last update timestamp
 */

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [3, 'Project name must be at least 3 characters long'],
      maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    location: {
      address: {
        type: String,
        required: [true, 'Project address is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'Project city is required'],
        trim: true,
      },
      coordinates: {
        lat: {
          type: Number,
          min: [-90, 'Latitude must be between -90 and 90'],
          max: [90, 'Latitude must be between -90 and 90'],
        },
        lng: {
          type: Number,
          min: [-180, 'Longitude must be between -180 and 180'],
          max: [180, 'Longitude must be between -180 and 180'],
        },
      },
    },
    status: {
      type: String,
      enum: {
        values: ['planning', 'active', 'completed', 'cancelled'],
        message: 'Status must be planning, active, completed, or cancelled',
      },
      default: 'planning',
    },
    startDate: {
      type: Date,
      validate: {
        validator(value) {
          return !this.endDate || value <= this.endDate;
        },
        message: 'Start date must be before end date',
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator(value) {
          return !this.startDate || value >= this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
    budget: {
      type: Number,
      min: [0, 'Budget cannot be negative'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project owner is required'],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
projectSchema.index({ owner: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ 'location.city': 1 });
projectSchema.index({ tags: 1 });

// Compound index for filtering
projectSchema.index({ status: 1, owner: 1 });

// Virtual for project ID
projectSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Virtual for project duration
projectSchema.virtual('duration').get(function () {
  if (this.startDate && this.endDate) {
    const diffTime = Math.abs(this.endDate - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return null;
});

// Virtual for project age
projectSchema.virtual('age').get(function () {
  const diffTime = Math.abs(new Date() - this.createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Instance method to check if project is active
projectSchema.methods.isActive = function () {
  return this.status === 'active';
};

// Instance method to check if project is completed
projectSchema.methods.isCompleted = function () {
  return this.status === 'completed';
};

// Static method to find projects by status
projectSchema.statics.findByStatus = function (status) {
  return this.find({ status });
};

// Static method to find projects by city
projectSchema.statics.findByCity = function (city) {
  return this.find({ 'location.city': new RegExp(city, 'i') });
};

// Pre-save middleware to update tags
projectSchema.pre('save', function (next) {
  if (this.isModified('tags')) {
    this.tags = this.tags.map(tag => tag.toLowerCase().trim());
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
