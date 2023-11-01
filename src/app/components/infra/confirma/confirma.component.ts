import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { DialogData } from "src/app/models/dialog-data";

@Component({
	selector: "app-confirma",
	templateUrl: "./confirma.component.html",
	styleUrls: ["./confirma.component.css"],
})
export class ConfirmaComponent implements OnInit {
	constructor(
		private toastr: ToastrService,
		private dialogRef: MatDialogRef<ConfirmaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {}

	ngOnInit(): void {}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onYesClick(): void {
		this.data.service.delete(this.data.id).subscribe(
			() => {
				this.toastr.success("Registro deletado com sucesso!", "Delete");
        this.dialogRef.close();
			},
			(ex) => {
				if (ex.error && ex.error.erros) {
					ex.error.errors.array.forEach((element) => {
						this.toastr.error(element.message);
					});
				} else {
					this.toastr.error(ex.error.message);
				}
        this.dialogRef.close();
			}
		);
	}
}
