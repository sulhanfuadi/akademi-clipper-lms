import prisma from "../utils/prisma";

export const enrollmentController = {
  // Enroll in course (Student only)
  async enrollCourse(params: any, user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    if (user.role !== "STUDENT") {
      set.status = 403;
      return { error: "Forbidden: Only students can enroll in courses" };
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

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    if (existingEnrollment) {
      set.status = 400;
      return { error: "Already enrolled in this course" };
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            instructor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      message: "Successfully enrolled in course",
      enrollment,
    };
  },

  // Get my enrollments (Student)
  async getMyEnrollments(user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    if (user.role !== "STUDENT") {
      set.status = 403;
      return { error: "Forbidden: Student access required" };
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            instructor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: "desc",
      },
    });

    return {
      message: "Enrollments retrieved successfully",
      enrollments,
    };
  },

  // Unenroll from course (Student)
  async unenrollCourse(params: any, user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    if (user.role !== "STUDENT") {
      set.status = 403;
      return { error: "Forbidden: Student access required" };
    }

    const courseId = parseInt(params.id);

    if (isNaN(courseId)) {
      set.status = 400;
      return { error: "Invalid course ID" };
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    if (!enrollment) {
      set.status = 404;
      return { error: "Enrollment not found" };
    }

    await prisma.enrollment.delete({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    return {
      message: "Successfully unenrolled from course",
    };
  },

  // Get all enrollments (Admin or Instructor for their courses)
  async getAllEnrollments(user: any, set: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Authentication required" };
    }

    if (user.role === "STUDENT") {
      set.status = 403;
      return { error: "Forbidden: Access denied" };
    }

    let enrollments;

    if (user.role === "ADMIN") {
      enrollments = await prisma.enrollment.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
              instructor: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          enrolledAt: "desc",
        },
      });
    } else {
      // Instructor can only see enrollments for their courses
      enrollments = await prisma.enrollment.findMany({
        where: {
          course: {
            instructorId: user.id,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          enrolledAt: "desc",
        },
      });
    }

    return {
      message: "Enrollments retrieved successfully",
      enrollments,
    };
  },

  // Get course enrollments (Instructor for their courses, Admin for all)
  async getCourseEnrollments(params: any, user: any, set: any) {
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

    // Check permissions
    if (user.role !== "ADMIN" && course.instructorId !== user.id) {
      set.status = 403;
      return {
        error: "Forbidden: You can only view enrollments for your own courses",
      };
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { courseId: courseId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        enrolledAt: "desc",
      },
    });

    return {
      message: "Course enrollments retrieved successfully",
      enrollments,
      count: enrollments.length,
    };
  },
};
