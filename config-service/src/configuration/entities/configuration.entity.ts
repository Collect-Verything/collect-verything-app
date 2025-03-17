import { Configuration } from '@prisma/client';

export class ConfigurationEntity implements Configuration {
  id: number;
  subscriptionId: number;
  url: string;
  brand_name: string;
  admin_email: string;
  website_type: string;
}
