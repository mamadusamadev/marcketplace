import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { categorySchema } from '../validations/category.validation';

export class CategoryController {
  static async create(req: Request, res: Response): Promise<void> {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const category = await CategoryService.create(value);
    res.status(201).json(category);
  }

  static async list(req: Request, res: Response): Promise<void> {
    const categories = await CategoryService.list();
    res.json(categories);
  }

  static async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const updated = await CategoryService.update(id, value);
    res.json(updated);
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await CategoryService.delete(id);
    res.status(204).send();
  }
}
