import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageChangeComponent } from "./language-change/language-change.component";

@NgModule({
    imports: [CommonModule],
    exports: [LanguageChangeComponent],
    entryComponents: [LanguageChangeComponent],
    declarations: [LanguageChangeComponent],
})
export class LanguageChangeModule {}
