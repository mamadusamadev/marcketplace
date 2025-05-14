import { Request, Response } from 'express';
import { SellerService } from '../services/seller.service';
import { sellerApplicationSchema ,
    verifySellerSchema
} from '../validations/seller.validation';
import { uploadFileToS3 } from '../utils/s3Uploader';




export class SellerController {
    static async apply(req: Request, res: Response): Promise<void> {
      try {
        const { error, value } = sellerApplicationSchema.validate(req.body);
        if (error) {
          res.status(400).json({ message: error.details[0].message });
          return;
        }
  
        if (!req.file) {
          res.status(400).json({ message: 'Document file is required' });
          return;
        }
  
        const userId = req.user!.userId;
        const documentUrl = await uploadFileToS3(req.file);
  
        const seller = await SellerService.submitSellerApplication(userId, value, documentUrl);
  
        res.status(201).json({ message: 'Seller application submitted successfully', seller });
      } catch (err: any) {
        res.status(400).json({ message: err.message || 'Failed to submit seller application' });
      }
    }


    // Listar vendedores pendente controller
    static async listPending(req: Request, res: Response): Promise<void> {
        try {
          const sellers = await SellerService.listPendingSellers();
          res.json(sellers);
        } catch (err) {
          res.status(500).json({ message: 'Failed to fetch sellers' });
        }
      }

     // Verificar vendedores controller
      static async verify(req: Request, res: Response): Promise<void> {
        try {
          const { error, value } = verifySellerSchema.validate(req.body);
          if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
          }
    
          const sellerId = Number(req.params.id);
          const updated = await SellerService.verifySeller(sellerId, value);
    
          res.json({ message: 'Seller verification updated', seller: updated });
        } catch (err) {
          res.status(400).json({ message: 'Failed to update seller' });
        }
      }

      // Listar vendedores 
      static async listAdmin(req: Request, res: Response): Promise<void> {
        try {
          const sellers = await SellerService.listAdminSellers();
          res.json(sellers);
        } catch (err) {
          res.status(500).json({ message: 'Failed to fetch admin seller list' });
        }
      }


      static async getBySlug(req: Request, res: Response): Promise<void> {
        try {
          const { slug } = req.params;
          const profile = await SellerService.getPublicProfile(slug);
    
          if (!profile) {
            res.status(404).json({ message: 'Seller not found or not verified' });
            return;
          }
    
          res.json(profile);
        } catch (err) {
          res.status(500).json({ message: 'Failed to load seller profile' });
        }
      }
      


  }
