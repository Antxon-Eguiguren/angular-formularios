import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

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
      edad: new FormControl('', [
        Validators.required,
        this.edadValidator,
      ]),
      dni: new FormControl('', [
        Validators.required,
        this.dniValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/),
      ]),
      repite_password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/),
      ]),
    }, [this.passwordValidator]);
  }

  ngOnInit() {
    const controlEmail = this.formulario.controls.email;
    controlEmail.valueChanges.pipe(debounceTime(1000)).subscribe(valor => {
      // Validación en la BBDD
    });
  }

  onSubmit() {
    // Enviar formulario
  }

  edadValidator(control) {
    const edadValue = control.value;
    const maxValue = 65;
    const minValue = 18;
    if (edadValue >= minValue && edadValue <= maxValue) {
      return null;
    } else {
      return { edadvalidator: { max: maxValue, min: minValue } };
    }
  }

  dniValidator(control) {
    const dni = control.value;
    const expresionRegularDni = /^\d{8}[a-zA-Z]$/;

    if (expresionRegularDni.test(dni) === true) {
      let numero = dni.substring(0, dni.length - 1);
      const letr = dni.charAt(dni.length - 1);
      numero = numero % 23;
      let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
      letra = letra.substring(numero, numero + 1);

      if (letra !== letr.toUpperCase()) {
        return { dnivalidator: { msg: 'La letra es incorrecta.' } };
      } else {
        return null;
      }
    } else {
      return { dnivalidator: { msg: 'El formato no es válido.' } };
    }
  }

  passwordValidator(form) {
    const passwordValue = form.controls.password.value;
    const repitePasswordValue = form.controls.repite_password.value;

    if (passwordValue === repitePasswordValue) {
      return null;
    } else {
      return { passwordvalidator: true };
    }
  }

}
