import { SetMetadata } from "@nestjs/common";

export const HasType = (...HasType: string[]) => SetMetadata('Type', HasType);