export class LoginCommand {
  email!: string;
  password!: string;

  public static fromObject(data: LoginCommand): LoginCommand {
    const c = new LoginCommand();
    c.email = data.email;
    c.password = data.password;
    return c;
  }
}
