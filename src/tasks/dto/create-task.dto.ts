import { Label } from "src/labels/schema/label.schema";
import { User } from "src/users/schema/user.schema";

export class CreateTaskDto {
    readonly title:string;
    readonly description:string;
    readonly status:string;
    readonly importance:string;
    readonly endDate:Date;
    readonly files:string[];
    readonly user:User;
    readonly collaborators:User[];
    readonly label:Label;
}
