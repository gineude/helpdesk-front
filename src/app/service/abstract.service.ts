import { Observable } from "rxjs";

export abstract class AbstractService {

    abstract delete(id: any): Observable<any>
}