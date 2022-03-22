import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AppConstants from 'src/app/UI/AppConstants';
@Injectable({
  providedIn: 'root'
})
export class Customer_registerService {
registerCustomerAPI: any;

constructor(private http: HttpClient) { }
baseUrl : any = AppConstants.BaseServiceURL;
RegisterCustomerDetails(formData: any) {
  debugger
  let headers = new HttpHeaders();
  headers.append("Content-Type", "application/json");
  var config = "application/json";

  this.registerCustomerAPI  = this.baseUrl + AppConstants.CustomerRegistrationApiURL;

  const value = this.http.post( this.registerCustomerAPI,formData, {
    // headers: headers
  
  });
  return value;
}
}
