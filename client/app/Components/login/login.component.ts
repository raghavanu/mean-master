import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Users } from '../../Models/user.model';
// import { UserValidator } from '../../Validators/user.validator';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    errormessage: string;
    user: Users;
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
        this.loginForm = fb.group({
            userName: ['',
                Validators.compose([Validators.required,
                                    Validators.pattern('^[0-9]*$'),
                                    Validators.minLength(5),
                                    Validators.maxLength(5)])],
            password: ['',
                       Validators.compose([Validators.required,
                                           Validators.minLength(6),
                                           Validators.maxLength(10)])]
        });
    }
    ngOnInit() {
        this.user = {
            UserName: '',
            Password: ''
        };
     }


    get username(){
        return this.loginForm.get('userName');
    }

    get password(){
        return this.loginForm.get('password');
    }



    LoginCheck() {
        if (!this.user) { return; }
        this.loginService
            .GetUserDetails(this.user)
            .subscribe(response => {
                this.router.navigate(['profile']);
            },
            error => this.errormessage = <any>error,
            () => console.log('Get all Items complete'));
    }
}
