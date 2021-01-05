import { EnergyTypeService } from "./../../energy-type/energy-type.service";
import { PaymentMethodService } from "./../../payment-method/payment-method.service";
import { EnergySupplierService } from "./../../energy-supplier/energy-supplier.service";
import { PlanService } from "./../plan.service";
import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";
import * as _ from "lodash";
import { LoaderService } from "app/main/services/loader.service";
import { PlanClass } from "../plan-classes";
import { TariffTypeService } from "../../tariff-type/tariff-type.service";
@Component({
    selector: "edit-profile-form-dialog",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ManageProfileFormDialogComponent implements OnInit {
    dialogTitle: string;
    type: any;
    planForm: FormGroup;
    planFormErrors: any;
    planDetail: any;
    isRanked = false;
    showLoader: any;

    constructor(
        public dialogRef: MatDialogRef<ManageProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        public planService: PlanService,
        public tariffTypeService: TariffTypeService,
        public energySupplierService: EnergySupplierService,
        public paymentMethodService: PaymentMethodService,
        public energyTypeService: EnergyTypeService,
        public _loaderService: LoaderService
    ) {
        this.planDetail = data.data;
        this.planFormErrors = {
            Name: {},
            TypeOfEnergy: {},
            EnergySupplier: {},
            TariffType: {},
            PaymentMethod: {},
            UnitRate: {},
            StandingCharge: {},
            TariffEnd: {},
            PriceEnd: {},
            ExitFees: {},
            Discounts: {},
            AdditionCharges: {},
            Status: {},
        };
    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.planForm = this.formBuilder.group({
            Name: ["", Validators.required],
            TypeOfEnergy: ["", Validators.required],
            EnergySupplier: ["", Validators.required],
            TariffType: ["", Validators.required],
            PaymentMethod: ["", Validators.required],
            UnitRate: ["", Validators.required],
            StandingCharge: ["", Validators.required],
            TariffEnd: ["", Validators.required],
            PriceEnd: ["", Validators.required],
            ExitFees: ["", Validators.required],
            Status: [1, Validators.required],
            Discounts: ["", Validators.required],
            AdditionCharges: ["", Validators.required],
            Id: [""],
        });
        if (this.planDetail) {
            this.planForm.patchValue(this.planDetail);
        }
        this.getPaymentMethod();
        this.getEnergyType();
        this.getTariffType();
        this.getEnergySupplier();
    }

    tariffType;
    getTariffType() {
        this.tariffTypeService.getTariffType().subscribe(async (res) => {
            await res;
            this.tariffType = res;
        });
    }

    typeofEnergy;
    getEnergyType() {
        this.energyTypeService.getEnergyType().subscribe(async (res) => {
            await res;
            this.typeofEnergy = res;
        });
    }

    energySuppliery;
    getEnergySupplier() {
        this.energySupplierService
            .getEnergySupplier()
            .subscribe(async (res) => {
                await res;
                this.energySuppliery = res;
            });
    }

    paymentMethod;
    getPaymentMethod(): any {
        let result = this.paymentMethodService
            .getPaymentMethod()
            .subscribe(async (res) => {
                await res;
                this.paymentMethod = res;
            });
    }

    savePlan(): any {
        const plan = new PlanClass();
        Object.assign(plan, this.planForm.value);
        const data = _.omit(plan, ["Id"]);
        this.planService.addPlan(data).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in adding Plan.",
                });
            }
        );
    }

    editPlan(): any {
        const plan = new PlanClass();
        Object.assign(plan, this.planForm.value);
        this.planService.editPlan(plan).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in Updating Plan.",
                });
            }
        );
    }
}
