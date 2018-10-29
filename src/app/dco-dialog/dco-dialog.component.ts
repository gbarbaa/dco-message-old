import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Dialog} from "../lib/service/data/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
    selector: 'dco-dialog',
    templateUrl: './dco-dialog.component.html',
    styleUrls: ['./dco-dialog.component.scss']
})
export class DcoDialogComponent implements OnInit {

    form: FormGroup;
    title:string;
    label:string;
    textvalue:string;
    urlvalue:string;
    isBold: Boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DcoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) {title, label, textvalue, urlvalue, isBold} ) {

        this.title = 'Please enter value for';
        this.label = label;
        this.textvalue = label;
        this.urlvalue = label;
        this.isBold = isBold;

        this.form = fb.group({
          title: [title],
          label: [label],
          textvalue: [textvalue, Validators.required],
          urlvalue: [urlvalue, Validators.required],
          category: [null],
          isBold: [isBold]
        });

    }

    ngOnInit() {

    }


    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}