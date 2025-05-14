import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { productSchema } from '../validations/product.validation';
import { productUpdateSchema } from '../validations/productUpdate.validation';
import { ProductCondition } from '@prisma/client';

export class ProductController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      
  
      // Validação com conversão automática (Joi converte string para number, etc)
      const { error, value } = productSchema.validate(req.body, { convert: true });
  
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
  
      const userId = req.user!.userId;
      const files = req.files as Express.Multer.File[];
  
      const product = await ProductService.create(userId, value, files);
      res.status(201).json({
        ...product, price: Number(product.price)
      });
      
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar produto:', err });
    }
  }

  static async list(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const products = await ProductService.listBySeller(userId);
    res.json(products);
  }

  static async listAll(req: Request, res: Response): Promise<void> {
    try {
      console.log('🔍 Recebendo filtros:', req.query);
  
      // Conversão e validação de preço
      const minPrice = parseFloat(req.query.minPrice as string);
      const maxPrice = parseFloat(req.query.maxPrice as string);
      const priceFilter = {
        min: isNaN(minPrice) ? 0 : minPrice,
        max: isNaN(maxPrice) ? 100000 : maxPrice,
      };
  
      // Localização
      const location = (req.query.location as string)?.trim() || undefined;
      const category = (req.query.category as string)?.trim() || undefined;

  
      // Condição do produto
      const conditionRaw = req.query.condition as string | undefined;

      let conditionFilter: ProductCondition | undefined = undefined;
      if (
        conditionRaw &&
        Object.values(ProductCondition).includes(conditionRaw.toUpperCase() as ProductCondition)
      ) {
        conditionFilter = conditionRaw.toUpperCase() as ProductCondition;
      }

  
      // Ordenação
      const validOrderOptions = ['latest', 'price_asc', 'price_desc'];
      const orderByRaw = (req.query.orderBy as string)?.trim();
      const orderBy = validOrderOptions.includes(orderByRaw) ? orderByRaw : 'latest';
  
      
      const filters = {
        minPrice: priceFilter.min,
        maxPrice: priceFilter.max,
        location,
        category,
        condition: conditionFilter,
        orderBy,
      };
  
      const products = await ProductService.filterProducts(filters);
      res.json(products);
    } catch (err) {
      console.error('❌ Erro ao listar produtos:', err);
      res.status(500).json({ message: 'Erro ao listar produtos' });
    }
  }
  

  static async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const product = await ProductService.getById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const userId = req.user!.userId;
  
      const { error, value } = productUpdateSchema.validate(req.body, { convert: true });
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
  
      const files = req.files as Express.Multer.File[] || [];
  
      const updated = await ProductService.update(id, userId, value, files);
      res.json(updated);
    } catch (err) {
      console.error('❌ Erro ao atualizar produto:', err);
      res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
  }
  

  static async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userId = req.user!.userId;
    await ProductService.delete(id, userId);
    res.status(204).send();
  }
}
