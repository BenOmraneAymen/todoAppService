export class CreateNoteDto {
    readonly title:string;
    readonly content:string;
    readonly collaborators:string[];
    readonly label:string;
}
