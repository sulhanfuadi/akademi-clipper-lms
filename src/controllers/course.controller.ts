import prisma from "../utils/prisma";

export const courseController = {
  // Get all courses
  async getAllCourses() {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      message: "Courses retrieved successfully",
      courses,
    };
  },

  // Get course by ID
  async getCourseById(params: any, set: any) {
    const courseId = parseInt(params.id);

    if (isNaN(courseId)) {
      set.status = 400;
      return { error: "Invalid course ID" };
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        enrollments: {
          select: {
            id: true,
            enrolledAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!course) {
      set.status = 404;
      return { error: "Course not found" };
    }

    return {
      message: "Course retrieved successfully",
      course,
    };
  },

  // Create course (Instructor only)
  async createCourse(body: any, user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    if (user.role !== "INSTRUCTOR") {
      set.status = 403;
      return { error: "Forbidden: Only instructors can create courses" };
    }

    const { title, description, price } = body;

    if (!title || price === undefined) {
      set.status = 400;
      return { error: "Title and price are required" };
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        instructorId: user.id,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      message: "Course created successfully",
      course,
    };
  },

  // Update course (Owner or Admin)
  async updateCourse(params: any, body: any, user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    const courseId = parseInt(params.id);

    if (isNaN(courseId)) {
      set.status = 400;
      return { error: "Invalid course ID" };
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      set.status = 404;
      return { error: "Course not found" };
    }

    // Check if user is the course owner or admin
    if (user.role !== "ADMIN" && course.instructorId !== user.id) {
      set.status = 403;
      return { error: "Forbidden: You can only update your own courses" };
    }

    const { title, description, price } = body;

    if (!title && !description && price === undefined) {
      set.status = 400;
      return { error: "At least one field must be provided" };
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      message: "Course updated successfully",
      course: updatedCourse,
    };
  },

  // Delete course (Owner or Admin)
  async deleteCourse(params: any, user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    const courseId = parseInt(params.id);

    if (isNaN(courseId)) {
      set.status = 400;
      return { error: "Invalid course ID" };
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      set.status = 404;
      return { error: "Course not found" };
    }

    // Check if user is the course owner or admin
    if (user.role !== "ADMIN" && course.instructorId !== user.id) {
      set.status = 403;
      return { error: "Forbidden: You can only delete your own courses" };
    }

    await prisma.course.delete({
      where: { id: courseId },
    });

    return {
      message: "Course deleted successfully",
    };
  },

  // Get instructor's courses
  async getInstructorCourses(user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    if (user.role !== "INSTRUCTOR") {
      set.status = 403;
      return { error: "Forbidden: Instructor access required" };
    }

    const courses = await prisma.course.findMany({
      where: { instructorId: user.id },
      include: {
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      message: "Instructor courses retrieved successfully",
      courses,
    };
  },
};
