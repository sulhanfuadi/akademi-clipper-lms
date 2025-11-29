import prisma from "../utils/prisma";

export const authController = {
  // Register new user
  async register(body: any, set: any) {
    const { email, password, name, role } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      set.status = 400;
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await Bun.password.hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "STUDENT",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      message: "User registered successfully",
      user,
    };
  },

  // Login user
  async login(body: any, set: any, jwt: any) {
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      set.status = 401;
      return { error: "Invalid email or password" };
    }

    const isPasswordValid = await Bun.password.verify(password, user.password);

    if (!isPasswordValid) {
      set.status = 401;
      return { error: "Invalid email or password" };
    }

    const token = await jwt.sign({
      id: user.id,
      role: user.role,
      name: user.name,
    });

    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },
};
