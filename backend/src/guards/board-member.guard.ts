import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { BoardsService } from "src/boards/boards.service";
import { User } from "src/users/users.entity";

@Injectable()
export class BoardMemberGuard implements CanActivate {
    constructor(
        private boardsService: BoardsService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        return this.boardsService.isMember(user.id, request.body.board_id);
    }
}