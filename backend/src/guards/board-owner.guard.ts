import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { BoardsService } from "src/boards/boards.service";
import { User } from "src/users/users.entity";

@Injectable()
export class BoardOwnerGuard implements CanActivate {
    constructor(
        private boardsService: BoardsService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        return this.boardsService.isOwner(user.id, request.body.name);
    }
}