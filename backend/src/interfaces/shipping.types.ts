export interface ShippingZoneData {
    name: string;
    country: string;
    price: number;
}

export interface CityData {
name: string;
shippingZoneId: number;
}
  