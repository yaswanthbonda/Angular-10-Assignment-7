import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  projectStatuses = ['Stable', 'Critical', 'Finished'];

  mySignupForm: FormGroup;

  ngOnInit(){
    this.mySignupForm = new FormGroup({
      'projectName' : new FormControl(null, [Validators.required, this.forbiddenProjectName], this.forbiddenProjectNameAsync),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus' : new FormControl('critical')
    });
  }

  onSubmit(){
    console.log("Testing submit button!");
    console.log(this.mySignupForm);
    this.mySignupForm.reset();
  }

  forbiddenProjectName(control: FormControl): {[s: string]: boolean}{
    if(control.value === 'Test2'){
      return {'projNameIsForbidden': true}
    }
    return null;
  }

  forbiddenProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new  Promise<any>( (resolve, reject)=> {
      setTimeout( ()=>
        {
          if(control.value === 'Test'){
            resolve({'projNameIsForbidden': true});
          }else {resolve(null);}
        }, 2000 
      );
    });
    return promise;
  }
}
