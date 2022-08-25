import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from './services/user.service'
import { UserGuard } from './guards/user.guard'

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserGuard,
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
