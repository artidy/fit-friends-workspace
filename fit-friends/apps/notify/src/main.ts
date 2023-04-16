/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { bootstrap, startMicroservices } from '@fit-friends/core';

import { AppModule } from './app/app.module';

bootstrap(AppModule, 'Notify', startMicroservices);
