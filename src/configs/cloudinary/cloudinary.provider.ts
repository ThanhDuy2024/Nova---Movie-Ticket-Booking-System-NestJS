// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'ddv4cb3u5',
      api_key: '268716551999716',
      api_secret: 'LPthiy7GQBO1q50VRIPKV7L-0LA',
    });
  },
};
