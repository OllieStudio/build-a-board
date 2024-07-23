Stepper-nav


Based on materialize-stepper


@Output() nextStepEmitter: emits index of next route;

@Input() steps: { label: string; route: string; }[] : Array of labels, route objects;

@Input() isVertical:boolean: vertical/horizontal layout;

CSS Class: ol-stepper