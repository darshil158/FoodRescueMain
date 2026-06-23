const NgoService = require('./ngo.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');
const { generateUploadUrl, getObjectBytes, deleteObject } = require('../../config/r2');

class NgoController {
  static async getUploadUrl(req, res) {
    try {
      const { filename, mimeType } = req.body;
      if (!filename || !mimeType) {
        return errorResponse(res, 400, 'filename and mimeType are required');
      }

      const result = await generateUploadUrl(filename, mimeType);
      return successResponse(res, 200, 'Upload URL generated', result);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async confirmUpload(req, res) {
    try {
      const { key } = req.body;
      if (!key) return errorResponse(res, 400, 'Object key is required');

      // Fetch first 4100 bytes from R2
      const buffer = await getObjectBytes(key, 4100);

      // Dynamically import file-type
      const { fileTypeFromBuffer } = await import('file-type');
      const type = await fileTypeFromBuffer(buffer);

      if (!type) {
        await deleteObject(key);
        return errorResponse(res, 400, 'Unknown or invalid file type. Upload rejected.');
      }

      const validMimes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validMimes.includes(type.mime)) {
        await deleteObject(key);
        return errorResponse(res, 400, `Invalid file type: ${type.mime}. Only PDF, JPEG, and PNG are allowed.`);
      }

      // If valid, just confirm
      return successResponse(res, 200, 'File validated successfully', { key, valid: true });
    } catch (error) {
      if (req.body.key) await deleteObject(req.body.key).catch(() => {});
      return errorResponse(res, 400, error.message);
    }
  }
  static async updateProfile(req, res) {
    try {
      const result = await NgoService.updateProfile(req.user.uid, req.body);
      return successResponse(res, 200, 'Profile updated', result);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async getProfile(req, res) {
    try {
      const data = await NgoService.getProfile(req.user.uid);
      return successResponse(res, 200, 'Profile fetched', data);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async getDashboard(req, res) {
    try {
      const data = await NgoService.getDashboardStats(req.user.uid);
      return successResponse(res, 200, 'Dashboard fetched', data);
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}
module.exports = NgoController;
