import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss'],
})
export class ContratoComponent implements AfterViewInit, OnChanges {
  @Output() onLoadVariables = new EventEmitter<string[]>();
  @Input() valores: any;

  variablesConCorchetes: string[] = [];
  variablesSinCorchetes: string[] = [];
  article!: HTMLElement;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valores'] && this.valores) {

      const interval = setInterval(() => {
        if (this.article != null && this.article != undefined) {
          this.variablesConCorchetes.forEach((variable, idx) => {
            if (this.valores[this.variablesSinCorchetes[idx]]) {
              console.log(
                this.variablesSinCorchetes[idx],
                this.valores[this.variablesSinCorchetes[idx]]
              );

              this.article.innerHTML = this.article.innerHTML.replaceAll(
                variable,
                this.valores[this.variablesSinCorchetes[idx]].toUpperCase() ||
                  variable
              );
            }
          });

          clearInterval(interval);
        }
      }, 100);
    }
  }

  ngAfterViewInit(): void {
    this.article = document.querySelector('.row-contrato')!;
    const regex = /\[\[(\w+)\]\]/g;
    this.article.innerHTML.replace(
      regex,
      (variableConCorchetes, variableSinCorchetes) => {
        if (!this.variablesSinCorchetes.includes(variableSinCorchetes)) {
          console.log(variableConCorchetes, variableSinCorchetes);
          this.variablesSinCorchetes.push(variableSinCorchetes);
          this.variablesConCorchetes.push(variableConCorchetes);
        }
        return variableConCorchetes;
      }
    );
    setTimeout(() => {
      this.onLoadVariables.emit(this.variablesSinCorchetes);
    }, 100);
  }
}
