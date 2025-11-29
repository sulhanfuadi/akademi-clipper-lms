import prisma from "../utils/prisma";

export const userController = {
  // Get all users (Admin only)
  async getAllUsers(user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    if (user.role !== "ADMIN") {
      set.status = 403;
      return { error: "Forbidden: Admin access required" };
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            createdCourses: true,
            enrollments: true,
          },
        },
      },
    });

    return {
      message: "Users retrieved successfully",
      users,
    };
  },

  // Get user by ID
  async getUserById(params: any, user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      set.status = 400;
      return { error: "Invalid user ID" };
    }

    // Users can only view their own profile unless they're admin
    if (user.role !== "ADMIN" && user.id !== userId) {
      set.status = 403;
      return { error: "Forbidden: Access denied" };
    }

    const foundUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        createdCourses: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
        enrollments: {
          select: {
            id: true,
            enrolledAt: true,
            course: {
              select: {
                id: true,
                title: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!foundUser) {
      set.status = 404;
      return { error: "User not found" };
    }

    return {
      message: "User retrieved successfully",
      user: foundUser,
    };
  },

  // Update user
  async updateUser(params: any, body: any, user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      set.status = 400;
      return { error: "Invalid user ID" };
    }

    // Users can only update their own profile unless they're admin
    if (user.role !== "ADMIN" && user.id !== userId) {
      set.status = 403;
      return { error: "Forbidden: Access denied" };
    }

    const { name, email } = body;

    if (!name && !email) {
      set.status = 400;
      return { error: "At least one field (name or email) must be provided" };
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(name && { name }),
          ...(email && { email }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          updatedAt: true,
        },
      });

      return {
        message: "User updated successfully",
        user: updatedUser,
      };
    } catch (error: any) {
      if (error.code === "P2025") {
        set.status = 404;
        return { error: "User not found" };
      }
      if (error.code === "P2002") {
        set.status = 400;
        return { error: "Email already exists" };
      }
      set.status = 500;
      return { error: "Failed to update user" };
    }
  },

  // Delete user (Admin only)
  async deleteUser(params: any, user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    if (user.role !== "ADMIN") {
      set.status = 403;
      return { error: "Forbidden: Admin access required" };
    }

    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      set.status = 400;
      return { error: "Invalid user ID" };
    }

    // Prevent admin from deleting themselves
    if (user.id === userId) {
      set.status = 400;
      return { error: "Cannot delete your own account" };
    }

    try {
      await prisma.user.delete({
        where: { id: userId },
      });

      return {
        message: "User deleted successfully",
      };
    } catch (error: any) {
      if (error.code === "P2025") {
        set.status = 404;
        return { error: "User not found" };
      }
      set.status = 500;
      return { error: "Failed to delete user" };
    }
  },

  // Get user statistics
  async getUserStats(user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    const stats = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        _count: {
          select: {
            createdCourses: true,
            enrollments: true,
          },
        },
      },
    });

    if (!stats) {
      set.status = 404;
      return { error: "User not found" };
    }

    return {
      message: "User statistics retrieved successfully",
      stats,
    };
  },
};
