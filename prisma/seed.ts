import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Clear existing data
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleared existing data");

  // Create Admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@clipper.com",
      password: await Bun.password.hash("admin123"),
      name: "Admin Clipper",
      role: "ADMIN",
    },
  });

  console.log("Created admin:", admin.email);

  // Create Instructor users (Video Editing & Content Creation Experts)
  const instructors = await Promise.all([
    prisma.user.create({
      data: {
        email: "ridwan.hanif@clipper.com",
        password: await Bun.password.hash("password123"),
        name: "Ridwan Hanif",
        role: "INSTRUCTOR",
      },
    }),
    prisma.user.create({
      data: {
        email: "sarah.kusuma@clipper.com",
        password: await Bun.password.hash("password123"),
        name: "Sarah Kusuma",
        role: "INSTRUCTOR",
      },
    }),
    prisma.user.create({
      data: {
        email: "agung.pratama@clipper.com",
        password: await Bun.password.hash("password123"),
        name: "Agung Pratama",
        role: "INSTRUCTOR",
      },
    }),
    prisma.user.create({
      data: {
        email: "dinda.maharani@clipper.com",
        password: await Bun.password.hash("password123"),
        name: "Dinda Maharani",
        role: "INSTRUCTOR",
      },
    }),
    prisma.user.create({
      data: {
        email: "fajar.ramadhan@clipper.com",
        password: await Bun.password.hash("password123"),
        name: "Fajar Ramadhan",
        role: "INSTRUCTOR",
      },
    }),
  ]);

  console.log(`Created ${instructors.length} instructors`);

  // Create Student users (Aspiring Content Creators & Video Editors)
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: "andi.wijaya@student.com",
        password: await Bun.password.hash("password123"),
        name: "Andi Wijaya",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "bella.putri@student.com",
        password: await Bun.password.hash("password123"),
        name: "Bella Putri",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "charlie.santoso@student.com",
        password: await Bun.password.hash("password123"),
        name: "Charlie Santoso",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "diana.lestari@student.com",
        password: await Bun.password.hash("password123"),
        name: "Diana Lestari",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "eko.prasetyo@student.com",
        password: await Bun.password.hash("password123"),
        name: "Eko Prasetyo",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "fani.aulia@student.com",
        password: await Bun.password.hash("password123"),
        name: "Fani Aulia",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "galih.mahendra@student.com",
        password: await Bun.password.hash("password123"),
        name: "Galih Mahendra",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "hana.safira@student.com",
        password: await Bun.password.hash("password123"),
        name: "Hana Safira",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "irfan.hakim@student.com",
        password: await Bun.password.hash("password123"),
        name: "Irfan Hakim",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "jessica.tan@student.com",
        password: await Bun.password.hash("password123"),
        name: "Jessica Tan",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "kevin.anggara@student.com",
        password: await Bun.password.hash("password123"),
        name: "Kevin Anggara",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "luna.puspita@student.com",
        password: await Bun.password.hash("password123"),
        name: "Luna Puspita",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "marco.wijaya@student.com",
        password: await Bun.password.hash("password123"),
        name: "Marco Wijaya",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "nadia.kartika@student.com",
        password: await Bun.password.hash("password123"),
        name: "Nadia Kartika",
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "oscar.firmansyah@student.com",
        password: await Bun.password.hash("password123"),
        name: "Oscar Firmansyah",
        role: "STUDENT",
      },
    }),
  ]);

  console.log(`Created ${students.length} students`);

  // Create Courses focused on Video Editing, Clipping & Content Creation
  const courses = await Promise.all([
    // Ridwan Hanif's courses (Adobe Premiere Pro & Basic Editing)
    prisma.course.create({
      data: {
        title: "Adobe Premiere Pro untuk Pemula",
        description:
          "Pelajari dasar-dasar editing video dengan Adobe Premiere Pro. Mulai dari import footage, cutting, transitions, hingga export video berkualitas tinggi. Cocok untuk content creator pemula.",
        price: 299000,
        instructorId: instructors[0].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Teknik Cutting & Timing untuk Viral Clips",
        description:
          "Kuasai seni memotong video panjang menjadi clip pendek yang engaging. Pelajari teknik pacing, comedic timing, dan cara memilih momen terbaik untuk dimunculkan dalam short content.",
        price: 349000,
        instructorId: instructors[0].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Color Grading & Color Correction Mastery",
        description:
          "Buat video Anda lebih cinematic dengan color grading profesional. Pelajari teori warna, LUTs, dan teknik color correction untuk berbagai mood dan style video.",
        price: 449000,
        instructorId: instructors[0].id,
      },
    }),

    // Sarah Kusuma's courses (DaVinci Resolve & Advanced Editing)
    prisma.course.create({
      data: {
        title: "DaVinci Resolve Complete Course",
        description:
          "Master editing video dengan DaVinci Resolve - software gratis yang powerful. Dari basic cutting hingga advanced color grading dan audio mixing.",
        price: 399000,
        instructorId: instructors[1].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Motion Graphics untuk Video Editor",
        description:
          "Tambahkan elemen motion graphics yang menarik ke video Anda. Pelajari animasi teks, lower thirds, transitions kustom, dan visual effects sederhana tanpa After Effects.",
        price: 499000,
        instructorId: instructors[1].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Audio Mixing & Sound Design untuk Video",
        description:
          "Video yang bagus butuh audio yang sempurna. Pelajari cara mixing dialog, menambahkan sound effects, background music, dan mastering audio untuk berbagai platform.",
        price: 379000,
        instructorId: instructors[1].id,
      },
    }),

    // Agung Pratama's courses (Mobile Editing & Social Media Content)
    prisma.course.create({
      data: {
        title: "Mobile Video Editing dengan CapCut",
        description:
          "Edit video viral langsung dari smartphone! Pelajari CapCut dari nol - cutting, transitions, effects, trending templates, dan cara bikin content TikTok yang engaging.",
        price: 199000,
        instructorId: instructors[2].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Instagram Reels & TikTok Content Strategy",
        description:
          "Bukan hanya editing, tapi juga strategi! Pelajari cara riset trending sounds, hook yang menarik, optimal video length, dan algoritma platform untuk maksimalkan reach.",
        price: 279000,
        instructorId: instructors[2].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "YouTube Shorts Optimization",
        description:
          "Buat YouTube Shorts yang berpotensi viral. Pelajari format yang tepat, cara bikin thumbnail menarik, strategi posting, dan analytics untuk growth channel Anda.",
        price: 249000,
        instructorId: instructors[2].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Meme Editing & Comedy Content Creation",
        description:
          "Spesialisasi dalam membuat konten comedy dan meme yang viral. Pelajari timing, sound selection, visual gags, dan cara mengikuti trending formats.",
        price: 229000,
        instructorId: instructors[2].id,
      },
    }),

    // Dinda Maharani's courses (Gaming Content & Stream Highlights)
    prisma.course.create({
      data: {
        title: "Gaming Content Creator Bootcamp",
        description:
          "Dari gameplay mentah jadi highlight yang epic! Pelajari cara record, edit, dan publish gaming content untuk YouTube dan Twitch. Termasuk overlay design dan streaming setup.",
        price: 429000,
        instructorId: instructors[3].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Stream Highlights & Compilation Making",
        description:
          "Ubah stream 5 jam jadi compilation 10 menit yang entertaining. Teknik memilih funny moments, epic plays, dan cara packaging untuk maksimal engagement.",
        price: 349000,
        instructorId: instructors[3].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Subtitle & Captions untuk Video",
        description:
          "Buat subtitle yang menarik dan mudah dibaca. Pelajari styling, animation, auto-captions dengan AI, dan best practices untuk accessibility dan engagement.",
        price: 269000,
        instructorId: instructors[3].id,
      },
    }),

    // Fajar Ramadhan's courses (Advanced & Business)
    prisma.course.create({
      data: {
        title: "After Effects untuk Video Editor",
        description:
          "Level up editing skills dengan After Effects. Pelajari advanced motion graphics, visual effects, tracking, keying, dan cara mengintegrasikan dengan Premiere Pro.",
        price: 599000,
        instructorId: instructors[4].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Professional Video Editing Workflow",
        description:
          "Bekerja seperti editor profesional. Pelajari project organization, proxy workflow, collaboration tools, backup strategies, dan cara deliver project dengan efisien.",
        price: 449000,
        instructorId: instructors[4].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Monetisasi Skill Video Editing",
        description:
          "Jadikan skill editing Anda sebagai sumber penghasilan. Pelajari cara mencari klien, pricing, portfolio building, freelancing platforms, dan business management.",
        price: 379000,
        instructorId: instructors[4].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "Podcast Video Editing Masterclass",
        description:
          "Spesialisasi edit podcast video format. Multi-camera switching, dynamic captions, visual enhancements, dan cara membuat podcast lebih engaging secara visual.",
        price: 399000,
        instructorId: instructors[4].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "AI Tools untuk Video Editor Modern",
        description:
          "Maksimalkan produktivitas dengan AI tools terbaru. Auto-transcription, AI color grading, smart cuts, background removal, dan workflow automation dengan artificial intelligence.",
        price: 499000,
        instructorId: instructors[4].id,
      },
    }),
  ]);

  console.log(`Created ${courses.length} courses`);

  // Create Enrollments with realistic patterns for content creators
  const enrollments = await Promise.all([
    // Andi Wijaya (Beginner - starting with basics)
    prisma.enrollment.create({
      data: { userId: students[0].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[0].id, courseId: courses[1].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[0].id, courseId: courses[6].id },
    }),

    // Bella Putri (Social media focused - TikTok & Instagram)
    prisma.enrollment.create({
      data: { userId: students[1].id, courseId: courses[6].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[1].id, courseId: courses[7].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[1].id, courseId: courses[9].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[1].id, courseId: courses[12].id },
    }),

    // Charlie Santoso (YouTube content creator)
    prisma.enrollment.create({
      data: { userId: students[2].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[2].id, courseId: courses[2].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[2].id, courseId: courses[8].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[2].id, courseId: courses[15].id },
    }),

    // Diana Lestari (Advanced learner - professional path)
    prisma.enrollment.create({
      data: { userId: students[3].id, courseId: courses[3].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[3].id, courseId: courses[4].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[3].id, courseId: courses[13].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[3].id, courseId: courses[14].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[3].id, courseId: courses[16].id },
    }),

    // Eko Prasetyo (Gaming content creator)
    prisma.enrollment.create({
      data: { userId: students[4].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[4].id, courseId: courses[10].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[4].id, courseId: courses[11].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[4].id, courseId: courses[12].id },
    }),

    // Fani Aulia (Mobile editing enthusiast)
    prisma.enrollment.create({
      data: { userId: students[5].id, courseId: courses[6].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[5].id, courseId: courses[7].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[5].id, courseId: courses[9].id },
    }),

    // Galih Mahendra (Aspiring professional editor)
    prisma.enrollment.create({
      data: { userId: students[6].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[6].id, courseId: courses[3].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[6].id, courseId: courses[5].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[6].id, courseId: courses[13].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[6].id, courseId: courses[14].id },
    }),

    // Hana Safira (Color grading specialist)
    prisma.enrollment.create({
      data: { userId: students[7].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[7].id, courseId: courses[2].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[7].id, courseId: courses[3].id },
    }),

    // Irfan Hakim (Podcast video editor)
    prisma.enrollment.create({
      data: { userId: students[8].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[8].id, courseId: courses[5].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[8].id, courseId: courses[12].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[8].id, courseId: courses[15].id },
    }),

    // Jessica Tan (Motion graphics learner)
    prisma.enrollment.create({
      data: { userId: students[9].id, courseId: courses[4].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[9].id, courseId: courses[13].id },
    }),

    // Kevin Anggara (Freelance video editor)
    prisma.enrollment.create({
      data: { userId: students[10].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[10].id, courseId: courses[2].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[10].id, courseId: courses[14].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[10].id, courseId: courses[16].id },
    }),

    // Luna Puspita (Comedy content creator)
    prisma.enrollment.create({
      data: { userId: students[11].id, courseId: courses[6].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[11].id, courseId: courses[9].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[11].id, courseId: courses[1].id },
    }),

    // Marco Wijaya (Tech enthusiast - AI tools)
    prisma.enrollment.create({
      data: { userId: students[12].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[12].id, courseId: courses[16].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[12].id, courseId: courses[14].id },
    }),

    // Nadia Kartika (All-rounder content creator)
    prisma.enrollment.create({
      data: { userId: students[13].id, courseId: courses[0].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[13].id, courseId: courses[1].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[13].id, courseId: courses[6].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[13].id, courseId: courses[7].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[13].id, courseId: courses[8].id },
    }),

    // Oscar Firmansyah (Stream highlights specialist)
    prisma.enrollment.create({
      data: { userId: students[14].id, courseId: courses[10].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[14].id, courseId: courses[11].id },
    }),
    prisma.enrollment.create({
      data: { userId: students[14].id, courseId: courses[1].id },
    }),
  ]);

  console.log(`Created ${enrollments.length} enrollments`);

  console.log("\nDatabase seeding completed successfully!");
  console.log("\n" + "=".repeat(70));
  console.log("AKADEMI CLIPPER LMS - TEST CREDENTIALS");
  console.log("=".repeat(70));

  console.log("\nADMIN:");
  console.log("   Email: admin@clipper.com");
  console.log("   Password: admin123");

  console.log("\nINSTRUCTORS (Video Editing Experts):");
  console.log("   1. ridwan.hanif@clipper.com / password123");
  console.log("      (Adobe Premiere Pro & Basic Editing Specialist)");
  console.log("   2. sarah.kusuma@clipper.com / password123");
  console.log("      (DaVinci Resolve & Advanced Editing Expert)");
  console.log("   3. agung.pratama@clipper.com / password123");
  console.log("      (Mobile Editing & Social Media Content Master)");
  console.log("   4. dinda.maharani@clipper.com / password123");
  console.log("      (Gaming Content & Stream Highlights Specialist)");
  console.log("   5. fajar.ramadhan@clipper.com / password123");
  console.log("      (After Effects & Professional Workflow Expert)");

  console.log("\nSTUDENTS (Aspiring Content Creators):");
  console.log("   1. andi.wijaya@student.com / password123");
  console.log("      (Beginner - 3 courses | Focus: Basic Editing)");
  console.log("   2. bella.putri@student.com / password123");
  console.log("      (Social Media Creator - 4 courses | Focus: TikTok & IG)");
  console.log("   3. charlie.santoso@student.com / password123");
  console.log("      (YouTuber - 4 courses | Focus: Long-form Content)");
  console.log("   4. diana.lestari@student.com / password123");
  console.log("      (Pro Path - 5 courses | Focus: Career Development)");
  console.log("   5. eko.prasetyo@student.com / password123");
  console.log("      (Gamer - 4 courses | Focus: Gaming Content)");
  console.log("   6. fani.aulia@student.com / password123");
  console.log("      (Mobile Editor - 3 courses | Focus: Phone Editing)");
  console.log("   7. galih.mahendra@student.com / password123");
  console.log("      (Professional - 5 courses | Focus: Advanced Skills)");
  console.log("   8. hana.safira@student.com / password123");
  console.log("      (Colorist - 3 courses | Focus: Color Grading)");
  console.log("   9. irfan.hakim@student.com / password123");
  console.log("      (Podcaster - 4 courses | Focus: Podcast Editing)");
  console.log("   10. jessica.tan@student.com / password123");
  console.log("       (Motion Designer - 2 courses | Focus: Motion Graphics)");
  console.log("   11. kevin.anggara@student.com / password123");
  console.log("       (Freelancer - 4 courses | Focus: Business & Skills)");
  console.log("   12. luna.puspita@student.com / password123");
  console.log("       (Comedy Creator - 3 courses | Focus: Meme Content)");
  console.log("   13. marco.wijaya@student.com / password123");
  console.log("       (Tech Enthusiast - 3 courses | Focus: AI Tools)");
  console.log("   14. nadia.kartika@student.com / password123");
  console.log("       (All-rounder - 5 courses | Focus: Multiple Platforms)");
  console.log("   15. oscar.firmansyah@student.com / password123");
  console.log("       (Streamer - 3 courses | Focus: Highlight Editing)");

  console.log("\nSTATISTICS:");
  console.log(`   Total Users: ${1 + instructors.length + students.length}`);
  console.log(`   Total Admins: 1`);
  console.log(`   Total Instructors: ${instructors.length}`);
  console.log(`   Total Students: ${students.length}`);
  console.log(`   Total Courses: ${courses.length}`);
  console.log(`   Total Enrollments: ${enrollments.length}`);

  console.log("\nCOURSE CATEGORIES:");
  console.log("   • Adobe Premiere Pro & Basic Editing (3 courses)");
  console.log("   • DaVinci Resolve & Advanced Editing (3 courses)");
  console.log("   • Mobile Editing & Social Media (4 courses)");
  console.log("   • Gaming Content & Stream Highlights (3 courses)");
  console.log("   • Advanced Professional Skills (5 courses)");

  console.log("\nTIPS:");
  console.log("   • Run 'bun run dev' to start the server");
  console.log("   • Visit http://localhost:3000/swagger for API docs");
  console.log("   • Test login with any instructor/student credentials");
  console.log("   • Instructors can create courses, Students can enroll");

  console.log("=".repeat(70) + "\n");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
