import { Request, Response } from 'express';
import { YapiSourceModel } from '../models/YapiSource';
import { sendSuccess, sendError } from '../utils/response';
import { CreateYapiSourceData, UpdateYapiSourceData } from '../types';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role?: string;
  };
}

class YapiController {
  async getSources(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = 1,
        limit = 10,
        type,
        isActive,
        search,
        tags,
      } = req.query;
      
      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);
      const skip = (pageNum - 1) * limitNum;
      
      // Build filter
      const filter: Record<string, unknown> = {};
      
      if (type) {
        filter.type = type;
      }
      
      if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
      }
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }
      
      if (tags) {
        const tagArray = Array.isArray(tags) ? tags : [tags];
        filter.tags = { $in: tagArray };
      }
      
      // Get sources with pagination
      const [sources, total] = await Promise.all([
        YapiSourceModel.find(filter)
          .populate('createdBy', 'name email')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum),
        YapiSourceModel.countDocuments(filter),
      ]);
      
      const totalPages = Math.ceil(total / limitNum);
      
      sendSuccess(res, 'Sources retrieved successfully', {
        sources,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1,
        },
      });
    } catch (error) {
      sendError(res, 'Failed to retrieve sources', (error as Error).message);
    }
  }
  
  async getSourceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const source = await YapiSourceModel.findById(id)
        .populate('createdBy', 'name email');
      
      if (!source) {
        sendError(res, 'Source not found', undefined, 404);
        return;
      }
      
      sendSuccess(res, 'Source retrieved successfully', source);
    } catch (error) {
      sendError(res, 'Failed to retrieve source', (error as Error).message);
    }
  }
  
  async createSource(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const sourceData: CreateYapiSourceData = req.body;
      
      if (!authReq.user) {
        sendError(res, 'Authentication required', undefined, 401);
        return;
      }
      
      // Check if source with same name and URL exists
      const existingSource = await YapiSourceModel.findOne({
        $or: [
          { name: sourceData.name },
          { url: sourceData.url },
        ],
      });
      
      if (existingSource) {
        sendError(res, 'Source with this name or URL already exists', undefined, 409);
        return;
      }
      
      const source = await YapiSourceModel.create({
        ...sourceData,
        createdBy: authReq.user.userId,
      });
      
      const populatedSource = await YapiSourceModel.findById(source._id)
        .populate('createdBy', 'name email');
      
      sendSuccess(res, 'Source created successfully', populatedSource, 201);
    } catch (error) {
      sendError(res, 'Failed to create source', (error as Error).message);
    }
  }
  
  async updateSource(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const { id } = req.params;
      const updateData: UpdateYapiSourceData = req.body;
      
      if (!authReq.user) {
        sendError(res, 'Authentication required', undefined, 401);
        return;
      }
      
      const source = await YapiSourceModel.findById(id);
      
      if (!source) {
        sendError(res, 'Source not found', undefined, 404);
        return;
      }
      
      // Check ownership or admin role
      if (source.createdBy.toString() !== authReq.user.userId && authReq.user.role !== 'admin') {
        sendError(res, 'Not authorized to update this source', undefined, 403);
        return;
      }
      
      // Check for duplicate name/URL if being updated
      if (updateData.name || updateData.url) {
        const duplicateFilter: Record<string, unknown> = {
          _id: { $ne: id },
        };
        
        if (updateData.name || updateData.url) {
          duplicateFilter.$or = [];
          if (updateData.name) {
            (duplicateFilter.$or as any[]).push({ name: updateData.name });
          }
          if (updateData.url) {
            (duplicateFilter.$or as any[]).push({ url: updateData.url });
          }
        }
        
        const existingSource = await YapiSourceModel.findOne(duplicateFilter);
        if (existingSource) {
          sendError(res, 'Source with this name or URL already exists', undefined, 409);
          return;
        }
      }
      
      const updatedSource = await YapiSourceModel.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).populate('createdBy', 'name email');
      
      sendSuccess(res, 'Source updated successfully', updatedSource);
    } catch (error) {
      sendError(res, 'Failed to update source', (error as Error).message);
    }
  }
  
  async deleteSource(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const { id } = req.params;
      
      if (!authReq.user) {
        sendError(res, 'Authentication required', undefined, 401);
        return;
      }
      
      const source = await YapiSourceModel.findById(id);
      
      if (!source) {
        sendError(res, 'Source not found', undefined, 404);
        return;
      }
      
      // Check ownership or admin role
      if (source.createdBy.toString() !== authReq.user.userId && authReq.user.role !== 'admin') {
        sendError(res, 'Not authorized to delete this source', undefined, 403);
        return;
      }
      
      await YapiSourceModel.findByIdAndDelete(id);
      
      sendSuccess(res, 'Source deleted successfully');
    } catch (error) {
      sendError(res, 'Failed to delete source', (error as Error).message);
    }
  }
}

export const yapiController = new YapiController();