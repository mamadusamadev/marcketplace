import { Request, Response } from 'express';
import { ShippingService } from '../services/shipping.service';
import { shippingZoneSchema,citySchema } from '../validations/shipping.validation';

export class ShippingController {
  static async create(req: Request, res: Response): Promise<void>  {
    const { error, value } = shippingZoneSchema.validate(req.body);

    if (error) {
        res.status(400).json({ message: error.details[0].message })
    };
    const zone = await ShippingService.create(value);
    res.status(201).json(zone);
  }

  static async list(req: Request, res: Response): Promise<void> {
    const zones = await ShippingService.list();
    res.json(zones);
  }

  static async get(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const zone = await ShippingService.getById(id);
    if (!zone) { 
        res.status(404).json({ message: 'Not found' })
    };
    res.json(zone);
  }

  static async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { error, value } = shippingZoneSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    };
    const updated = await ShippingService.update(id, value);
    res.json(updated);
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await ShippingService.delete(id);
    res.status(204).send();
  }


   // CITIES
   static async createCity(req: Request, res: Response): Promise<void> {
    const { error, value } = citySchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    };
    const city = await ShippingService.createCity(value);
    res.status(201).json(city);
  }

  static async deleteCity(req: Request, res: Response) {
    const id = Number(req.params.id);
    await ShippingService.deleteCity(id);
    res.status(204).send();
  }
}
