import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare const MStepper;

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit, AfterViewInit {
  @Output() nextStepEmitter:EventEmitter<number> = new EventEmitter;
  @Input() steps: { label: string; route: string; }[];
  @Input() isVertical:boolean = true;
  @Input() stepperID: string;
  stepperInstace: any;

  constructor(){

  }

  ngAfterViewInit(): void {
    this.setStepper();
  }

  ngOnInit() {

  }

  public nextStep(){
    this.stepperInstace.nextStep();
    let currentStep = this.stepperInstace.getSteps().active;
    this.nextStepEmitter.next(currentStep.index+1)
  }

  public routeClick(currentStep){
    this.nextStepEmitter.next(currentStep)
  }

  private setStepper() {
    var stepper = document.querySelector(`#${this.stepperID}`);
    this.stepperInstace = new MStepper(stepper, {
      // Default active step.
      firstActive: 0,
      // Allow navigation by clicking on the next and previous steps on linear steppers.
      linearStepsNavigation: true,
      // Auto focus on first input of each step.
      autoFocusInput: true,
      // Set if a loading screen will appear while feedbacks functions are running.
      showFeedbackPreloader: true,
      // Auto generation of a form around the stepper.
      autoFormCreation: true,
      // Function to be called everytime a nextstep occurs. It receives 2 arguments, in this sequece: stepperForm, activeStepContent.
      // validationFunction: defaultValidationFunction, // more about this default functions below
      // Enable or disable navigation by clicking on step-titles
      stepTitleNavigation: true,
      // Preloader used when step is waiting for feedback function. If not defined, Materializecss spinner-blue-only will be used.
      feedbackPreloader: '<div class="spinner-layer spinner-blue-only">...</div>'
    });
  }
}
