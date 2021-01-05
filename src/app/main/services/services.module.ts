import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppUrlsService } from './app-urls.service';
import { AuthService } from './auth';
import { CoreHttpService } from './core-http.service';
import { AppHttpClient } from './http-client.service';
import { LoaderService } from './loader.service';

@NgModule({
  imports: [
    FuseSharedModule,
   
  ],
  declarations: [
  
  ],
  providers: [CoreHttpService, LoaderService, AuthService,AppUrlsService,AppHttpClient]
})
export class ServicesModule {
}
