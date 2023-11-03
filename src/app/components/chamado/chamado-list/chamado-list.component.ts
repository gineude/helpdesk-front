import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Chamado } from "src/app/models/chamado";
import { ChamadoService } from "src/app/service/chamado.service";
import { ConfirmaComponent } from "../../infra/confirma/confirma.component";
import { ChamadoReadComponent } from "../chamado-read/chamado-read.component";

@Component({
	selector: "app-chamado-list",
	templateUrl: "./chamado-list.component.html",
	styleUrls: ["./chamado-list.component.css"],
})
export class ChamadoListComponent implements OnInit {
	chamadoList: Chamado[] = [];

	configPaginator: MatPaginatorIntl;
	displayedColumns: string[] = [
		"id",
		"titulo",
		"nomeCliente",
		"nomeTecnico",
		"dataAbertura",
		"prioridade",
		"status",
		"acoes",
	];
	dataSource = new MatTableDataSource<Chamado>(this.chamadoList);

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private dialog: MatDialog, private service: ChamadoService) {}

	ngOnInit() {
		this.findAll();
	}

	findAll() {
		this.service.findAll().subscribe((response) => {
			this.chamadoList = response;
			this.setDataSourceTable(response);
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	setConfigPaginator(): void {
		this.configPaginator = new MatPaginatorIntl();
		this.configPaginator.firstPageLabel = "";
	}

	showViewChamado(id: any): void {
		this.dialog.open(ChamadoReadComponent, {
			height: "80%",
			width: "90%",
			data: { id: id },
		});
	}

	orderByPrioridade(status: string): void {
		if (status === "-1") {
			this.setDataSourceTable(this.chamadoList);
		}
		let listFiltered: Chamado[] = [];
		this.chamadoList.forEach((chamado) => {
			if (chamado.status == status) {
				listFiltered.push(chamado);
			}
		});
		if (listFiltered.length > 0) {
			this.dataSource = new MatTableDataSource<Chamado>(listFiltered);
			this.dataSource.paginator = this.paginator;
		}
	}

	private setDataSourceTable(list: Chamado[]): void {
		this.dataSource = new MatTableDataSource<Chamado>(list);
		this.dataSource.paginator = this.paginator;
	}
}
