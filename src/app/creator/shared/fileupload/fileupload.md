Fileupload

Implements ControlValueAccessor

@Input() accept:string: optional accept config;
@Input() path:string: if filled uploads to Firebase Storage and sets the url to 
the control value, if empty sets the file Base64;

CSS Class: ol-fileupload