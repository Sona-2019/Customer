import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Customer_registerService } from './customer_register.service';
import Passwordvalidation from './passwordvalidation';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  customerForm!: FormGroup;
  submitted:boolean = false;
  phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$"
  returnedData: { ReturnedResult: any; } | undefined;
  constructor(private formbuilder:FormBuilder,public restApi: Customer_registerService,private router: Router) {}
  ngOnInit():void { this.createForm();}
  createForm(){
  this.customerForm = this.formbuilder.group({ firstName: [
    null,[
    
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^[ a-zA-Z][a-zA-Z ]*$/)
    ]
  ],
 lastName: [
    null,
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^[ a-zA-Z][a-zA-Z ]*$/)
    ]
  ],
   
  email: [
   null,
    [
      Validators.required,
      Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
    ],
      phone:[null,[Validators.required,Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]
     ],
      userName: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20) 
        ]
      ], 
      address:[null, [Validators.required]],
        city: [null, [Validators.required]],
        country: [null, [Validators.required]],
        zip: [null, [Validators.required]],
      
      password : [null, [Validators.required, Validators.minLength(8)]
    ],
      confirmpassword : [null, [Validators.required]
    ],
  },
     {validators: [Passwordvalidation.match('password', 'confirmpassword')]
    
    }
    
   
   );
}
​
get form(): { [key: string]: AbstractControl; }
{
    return this.customerForm.controls;
}
Register(){
 this.submitted=true;
  var formData:any;
  formData = {
    
    'firstName':this.customerForm.controls['firstName'].value,
    'lastName':this.customerForm.controls['lastName'].value,
    'phoneNumber':this.customerForm.controls['phone'].value,
    'emailID':this.customerForm.controls['email'].value,
    'address':this.customerForm.controls['address'].value+this.customerForm.controls['city'].value+this.customerForm.controls['country'].value+this.customerForm.controls['zip'].value,
    'userName':this.customerForm.controls['userName'].value,
    'password':this.customerForm.controls['password'].value,
  };

    alert(JSON.stringify(formData));
    Swal.fire({  
      title: 'Are you sure want to continue ?',  
      //text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes,register it!',  
      cancelButtonText: 'Cancel'  
    }).then((result) => {  
      if (result.value) { 
        
        this.restApi.RegisterCustomerDetails(formData).subscribe((data:any) => { 
          debugger
          if(data.status==0){Swal.fire('Success', 'Successfully registered!', 'success'); }
          else if(data.status==1){Swal.fire('Failed', 'Customer already exists!', 'success')}
          else if(data.status==2){Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Server error!'  
          });
        }
        else if(data.status==2){Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Something went wrong!'  
          });
        }
            }
            );
          }
          
        });
        this.onReset();     
          
}
onReset(): void {
  this.submitted = false;
  this.customerForm.reset();
}
}
