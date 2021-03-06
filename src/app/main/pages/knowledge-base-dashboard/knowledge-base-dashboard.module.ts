import { ArticlesHistoryComponent } from "./articles-history/articles-history.component";
import { ArticlesListComponent } from "./articles-list/articles-list.component";
import { ManageArticleComponent } from "./manage-article/manage-article.component";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { ChartsModule } from "ng2-charts";

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
} from "@angular/material";
import { ToastModule } from "primeng/toast";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TextMaskModule } from "angular2-text-mask";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { InputMaskModule } from "primeng/inputmask";
import { KnowledgeBaseDashboardComponent } from "./knowledge-base-dashboard/knowledge-base-dashboard.component";
import { AddArticleComponent } from "./add-article/add-article.component";
import { QuillEditorModule } from "app/shared/quill-editor/quill-editor.module";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddSectionComponent } from "./add-section/add-section.component";
import { ArrangeContentComponent } from "./arrange-content/arrange-content.component";

const routes: Routes = [
    {
        path: "",
        component: KnowledgeBaseDashboardComponent,
    },
    {
        path: "manage-articles",
        component: ManageArticleComponent,
    },
    {
        path: "manage-articles/list",
        component: ArticlesListComponent,
    },
    {
        path: "manage-articles/list:status",
        component: ArticlesListComponent,
    },
    {
        path: "manage-articles/create-article",
        component: AddArticleComponent,
    },
    {
        path: "manage-articles/history",
        component: ArticlesHistoryComponent,
    },
    {
        path: "arrange-content",
        component: ArrangeContentComponent,
    },
    {
        path: "arrange-content/add-category",
        component: AddCategoryComponent,
    },
    {
        path: "arrange-content/add-section",
        component: AddSectionComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [
        KnowledgeBaseDashboardComponent,
        ArticlesHistoryComponent,
        ArticlesListComponent,
        ManageArticleComponent,
        AddArticleComponent,
        AddCategoryComponent,
        AddSectionComponent,
        ArrangeContentComponent,
    ],
    imports: [
        FuseSharedModule,
        ChartsModule,
        RouterModule.forChild(routes),
        CommonModule,
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
        InternationalPhoneNumberModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        MatTooltipModule,
        TextMaskModule,
        BsDropdownModule.forRoot(),
        QuillEditorModule,
    ],
})
export class KnowledgeBaseDashboardModule {}
