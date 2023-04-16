/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { bootstrap, checkAuth } from '@fit-friends/core';

import { AppModule } from './app/app.module';

bootstrap(AppModule, 'Gym', checkAuth);
