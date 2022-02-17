import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreController } from './store/store.controller';
import { StoreService } from './store/store.service';
import { StoreModule } from './store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [AppController, StoreController],
  providers: [AppService, StoreService],
})
export class AppModule {}
