import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { BoardsService } from "src/boards/boards.service";
import { User } from "src/users/users.entity";

@Injectable()
export class BoardMemberGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private boardsService: BoardsService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const type = this.reflector.get<string[]>('Type', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        if (!type) {
            return this.boardsService.isMember(user.id, request.body.board_id);
        }
        if (type[0] === "card" || type[0] === 'list-update') {
            return this.boardsService.isMemberByListId(user.id, request.body.list_id);
        }
        if (type[0] === 'card-update' || type[0] == 'tasklist') {
            return this.boardsService.isMemberByCardId(user.id, request.body.card_id);
        }
        if (type[0] === 'tasklist-update' || type[0] == 'task') {
            return this.boardsService.isMemberByTasklistId(user.id, request.body.tasklist_id);
        }
        if (type[0] === 'task-update') {
            return this.boardsService.isMemberByTaskId(user.id, request.body.task_id);
        }
    }
}