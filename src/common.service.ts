import { plainToClass } from "class-transformer"
import { validateOrReject } from 'class-validator'

export type Constructor<T> = {
  new (...args: any[]): T;
}

export async function plainToResponse<T> (cls: Constructor<T>, plain: Partial<T>): Promise<T> {
  const res = plainToClass(cls, plain, { excludeExtraneousValues: true })
  await validateOrReject(res)

  return res
}