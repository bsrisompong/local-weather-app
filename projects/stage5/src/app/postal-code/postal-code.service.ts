// src/app/postal-code/postal-code.service.ts
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { defaultIfEmpty, mergeMap } from 'rxjs/operators'

import { environment } from '../../environments/environment'
export interface IPostalCode {
  countryCode: string
  postalCode: string
  placeName: string
  lng: number
  lat: number
}
export interface IPostalCodeData {
  postalCodes: [IPostalCode]
}
export interface IPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IPostalCode | null>
}
@Injectable({
  providedIn: 'root',
})
export class PostalCodeService implements IPostalCodeService {
  constructor(private httpClient: HttpClient) {}

  resolvePostalCode(postalCode: string): Observable<IPostalCode | null> {
    const uriParams = new HttpParams()
      .set('maxRows', '1')
      .set('username', environment.username)
      .set('postalcode', postalCode)
    return this.httpClient
      .get<IPostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/
          postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        mergeMap((data) => data.postalCodes),
        defaultIfEmpty(null)
      )
  }
}
