import {Role} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class RoleEntity implements Role{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    // @ApiProperty({ required: false, type: UserEntity })
    // author?: UserEntity;
    //
    // constructor({ author, ...data }: Partial<ArticleEntity>) {
    //     Object.assign(this, data);
    //
    //     if (author) {
    //         this.author = new UserEntity(author);
    //     }
    // }

}
