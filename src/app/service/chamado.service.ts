import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Chamado } from "../models/chamado";

@Injectable({
	providedIn: "root",
})
export class ChamadoService extends AbstractService {
	constructor(private http: HttpClient) {
		super();
	}

	findById(id: any): Observable<Chamado> {
		return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`);
	}

	findAll(): Observable<Chamado[]> {
		return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
	}

	create(chamado: Chamado): Observable<Chamado> {
		return this.http.post<Chamado>(
			`${API_CONFIG.baseUrl}/chamados`,
			chamado
		);
	}

	update(chamado: Chamado): Observable<Chamado> {
		return this.http.put<Chamado>(
			`${API_CONFIG.baseUrl}/chamados/${chamado.id}`,
			chamado
		);
	}

	delete(id: any): Observable<any> {
		return this.http.delete<any>(`${API_CONFIG.baseUrl}/chamados/${id}`);
	}
}
