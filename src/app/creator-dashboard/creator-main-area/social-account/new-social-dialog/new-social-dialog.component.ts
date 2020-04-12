import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-new-social-dialog",
  templateUrl: "./new-social-dialog.component.html",
  styleUrls: ["./new-social-dialog.component.css"],
})
export class NewSocialDialogComponent implements OnInit {
  form: FormGroup;
  username: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewSocialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.username = data.username;
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [this.username, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
