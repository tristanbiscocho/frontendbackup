import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatIconModule, MatToolbarModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { LayoutModule } from 'app/layout/layout.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatStepperModule,
  MatOptionModule,
  MatSelectModule, MatRadioModule, MatDatepickerModule, MatCardModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { FormsModule } from '@angular/forms';
import { PartnerComponent } from './partner.component';
import { ManageProfileFormDialogComponent } from './partner-profile/partner-profile.component';
import { PartnerService } from './partner.service';
import {  ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { TextMaskModule } from 'angular2-text-mask';

const routes: Routes = [
  {
      path: "",
      component: PartnerComponent,
  },
  {
      path: "**",
      redirectTo: "login",
  },
];


@NgModule({
  declarations: [
    PartnerComponent,
    ManageProfileFormDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCardModule,
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTabsModule,
    TranslateModule.forRoot(),
    RouterModule,
    HttpClientModule,
    InternationalPhoneNumberModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputMaskModule,
    MatTooltipModule,
    TextMaskModule
  ],
  exports: [
    PartnerComponent,
  ],
  entryComponents: [
    ManageProfileFormDialogComponent
  ],
  providers: [
    PartnerService,
    MessageService
  ]
})
export class PartnerModule {
}
