const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  type: {
    type: String,
    required: [true, 'Project type is required'],
    enum: ['residential', 'commercial', 'industrial', 'infrastructure', 'renovation'],
    default: 'residential',
  },
  status: {
    type: String,
    enum: ['planning', 'design', 'approved', 'construction', 'completed', 'cancelled'],
    default: 'planning',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  location: {
    address: {
      type: String,
      required: [true, 'Project address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    district: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  budget: {
    estimated: {
      type: Number,
      required: [true, 'Estimated budget is required'],
      min: [0, 'Budget cannot be negative'],
    },
    actual: {
      type: Number,
      default: 0,
      min: [0, 'Actual budget cannot be negative'],
    },
    currency: {
      type: String,
      default: 'TRY',
      enum: ['TRY', 'USD', 'EUR'],
    },
  },
  timeline: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    actualStartDate: Date,
    actualEndDate: Date,
  },
  team: {
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project manager is required'],
    },
    architect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    engineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    members: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['architect', 'engineer', 'contractor', 'supervisor', 'worker'],
      },
      assignedDate: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  specifications: {
    area: {
      total: Number,
      built: Number,
      garden: Number,
    },
    floors: Number,
    rooms: Number,
    bathrooms: Number,
    parking: Number,
    materials: [String],
    features: [String],
  },
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['plan', 'permit', 'contract', 'report', 'photo', 'other'],
    },
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  progress: {
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    milestones: [{
      name: String,
      description: String,
      dueDate: Date,
      completedDate: Date,
      status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'overdue'],
        default: 'pending',
      },
    }],
    lastUpdate: {
      type: Date,
      default: Date.now,
    },
  },
  client: {
    name: {
      type: String,
      required: [true, 'Client name is required'],
    },
    email: String,
    phone: String,
    company: String,
  },
  notes: [{
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for better performance
projectSchema.index({ status: 1, priority: 1 });
projectSchema.index({ 'location.city': 1 });
projectSchema.index({ 'team.projectManager': 1 });
projectSchema.index({ createdAt: -1 });

// Virtual for project duration
projectSchema.virtual('duration').get(function () {
  if (this.timeline.startDate && this.timeline.endDate) {
    return Math.ceil((this.timeline.endDate - this.timeline.startDate) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);
