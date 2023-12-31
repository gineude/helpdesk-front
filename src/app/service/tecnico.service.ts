import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { Tecnico } from "../models/tecnico";
import { AbstractService } from "./abstract.service";

@Injectable({
	providedIn: "root",
})
export class TecnicoService extends AbstractService {
	constructor(private http: HttpClient) {
		super();
	}

	findById(id: any): Observable<Tecnico> {
		return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
	}

	findAll(): Observable<Tecnico[]> {
		return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
	}

	create(tecnico: Tecnico): Observable<Tecnico> {
		return this.http.post<Tecnico>(
			`${API_CONFIG.baseUrl}/tecnicos`,
			tecnico
		);
	}

	update(tecnico: Tecnico): Observable<Tecnico> {
		return this.http.put<Tecnico>(
			`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`,
			tecnico
		);
	}

	delete(id: any): Observable<any> {
		return this.http.delete<any>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
	}
}
