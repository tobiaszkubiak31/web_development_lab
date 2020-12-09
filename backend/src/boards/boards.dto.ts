export class BoardDto {
    readonly name!: string;
}

export class AddUserToBoardDto {
    readonly board_id!: number;
    readonly email!: string;
}