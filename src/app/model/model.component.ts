import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/),
      ]),
      edad: new FormControl(),
      dni: new FormControl(),
      password: new FormControl('', [
        Validators.required,
        // Password must be between 4 and 8 digits long and include at least one numeric digit.
        Validators.pattern(/^(?=.*\d).{4,8}$/),
      ]),
      repite_password: new FormControl(),
    });
  }

  ngOnInit() {
  }

  manejarSubmit() {
    console.log(this.formulario.value);
  }

}
