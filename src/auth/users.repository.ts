import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcript from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto

        const salt = await bcript.genSalt()
        const hashedPassword = await bcript.hash(password, salt)
        console.log('salt', salt)
        console.log('hash', hashedPassword)

        const user = this.create({ username, password: hashedPassword })
        // await this.save(user)

        try {
            await this.save(user)
        } catch (error) {
            console.log(error.code)
            if (error.code === '23505') {
                throw new ConflictException('username already exist')
            } else {
                throw new InternalServerErrorException()
            }
            console.log(error.code)
        }
    }
}