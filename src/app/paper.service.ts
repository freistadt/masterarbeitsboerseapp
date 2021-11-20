import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paper} from "./paper";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

//Mirror of the backend functions to make them accesable in the frontend
export class PaperService {

  //change this URL if changed in the Backend + Change the import to enviroment.prod.ts when going on production
  private apiURL = environment.apiStandartUrl;
  //to allow http functions
  constructor(private http: HttpClient) { }

  public getPapers(): Observable<Paper[]> {
    //Javascript notation
    //match with the backend URl for the function that has to be called
    return this.http.get<Paper[]>(`${this.apiURL}/paper/findAll`)
  }

  public addPapers(paper: Paper): Observable<Paper> {
  //the paper after the colong is the payload
    return this.http.post<Paper>(`${this.apiURL}/paper/add`, paper)
  }

  public updatePapers(paper: Paper): Observable<Paper> {
    //the paper after the colong is the payload
    return this.http.put<Paper>(`${this.apiURL}/paper/update`, paper)
  }

  //returns only the httpSttus after the functions is called in the backend
  public deletePapers(paperId: number): Observable<void> {
    //payload is a single variable(number/id) so yoi can pass it with ${}
    return this.http.delete<void>(`${this.apiURL}/paper/delete/${paperId}`);
  }

}
