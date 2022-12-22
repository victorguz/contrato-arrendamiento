import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CONTRATO } from './contrato';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup = this.formBuilder.group({});
  variables: string[] = [];
  valores: any;
  mostrarContrato: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.form.valueChanges.subscribe((values) => {
      localStorage.setItem('valores', JSON.stringify(values));
    });
  }

  get controls() {
    return this.form.controls;
  }

  get formBody() {
    return this.form.value;
  }

  onLoadVariables(variables: string[]) {
    console.log(variables);
    this.variables = variables;
    variables.forEach((variable) => {
      this.form.addControl(variable, new FormControl(''));
    });

    this.form.patchValue(this.valores);
  }

  cambiarValores() {
    this.mostrarContrato = false;
    setTimeout(() => {
      this.mostrarContrato = true;
      this.valores = this.formBody;
    }, 100);
  }
}
