-- CreateTable
CREATE TABLE "smstudentinformation" (
    "StudentID" VARCHAR(255) NOT NULL,
    "FirstName" VARCHAR(255) NOT NULL,
    "MiddleName" VARCHAR(255) NOT NULL,
    "Surname" VARCHAR(255) NOT NULL,
    "Gender" VARCHAR(255) NOT NULL,
    "EmailAddress" VARCHAR(255) NOT NULL,
    "PhoneNumber" VARCHAR(255) NOT NULL,
    "Address" VARCHAR(250) NOT NULL,
    "StateOfOrigin" VARCHAR(255) NOT NULL,
    "Nationality" VARCHAR(255) NOT NULL,
    "DateOfBirth" VARCHAR(255) NOT NULL,
    "CourseID" VARCHAR(255) NOT NULL,
    "CourseName" VARCHAR(255) NOT NULL,
    "ApplicantID" VARCHAR(255) NOT NULL,
    "ModeOfEntry" VARCHAR(255) NOT NULL,
    "YearOfAdmission" VARCHAR(255) NOT NULL,
    "ISJAMBAdmission" VARCHAR(255) NOT NULL,
    "JAReason" VARCHAR(255) NOT NULL,
    "IsBazeAdmission" VARCHAR(255) NOT NULL,
    "BAReason" VARCHAR(255) NOT NULL,
    "EvidenceOfPayment" VARCHAR(255) NOT NULL,
    "EvedenceType" VARCHAR(255) NOT NULL,
    "Testimonial" VARCHAR(255) NOT NULL,
    "TestimonialReason" VARCHAR(255) NOT NULL,
    "Transcript" VARCHAR(255) NOT NULL,
    "ApplicationForTransfer" VARCHAR(255) NOT NULL,
    "MedicalCertificateOfFitness" VARCHAR(255) NOT NULL,
    "FitnessCerttificationReason" VARCHAR(255) NOT NULL,
    "GuarantorLetter" VARCHAR(255) NOT NULL,
    "GuarantorLetterReson" VARCHAR(255) NOT NULL,
    "CompletePassport" VARCHAR(255) NOT NULL,
    "CompletePassportReason" VARCHAR(255) NOT NULL,
    "OLevelsResult" VARCHAR(255) NOT NULL,
    "OLevelsReason" VARCHAR(255) NOT NULL,
    "JAMBUTMEResultPrintOut" VARCHAR(255) NOT NULL,
    "ResultPrintOutReason" VARCHAR(255) NOT NULL,
    "StudentRepresentativeCouncilDue" VARCHAR(255) NOT NULL,
    "OlevelsDeficiency" VARCHAR(255) NOT NULL,
    "OlevelDeficiencySubject" VARCHAR(255) NOT NULL,
    "StudentLevel" VARCHAR(255) NOT NULL,
    "Semester" VARCHAR(255) NOT NULL,
    "IsActive" VARCHAR(255) NOT NULL,
    "IsActiveReason" VARCHAR(255) NOT NULL,
    "GroupID" VARCHAR(255) NOT NULL,
    "GroupCode" VARCHAR(255) NOT NULL,
    "GroupName" VARCHAR(255) NOT NULL,
    "Status" VARCHAR(255) NOT NULL,
    "CohortIDString" VARCHAR(255) NOT NULL,
    "CohortCode" VARCHAR(255) NOT NULL,
    "CohortDescription" VARCHAR(255) NOT NULL,
    "InsertDate" VARCHAR(255) NOT NULL,
    "InsertUserName" VARCHAR(255) NOT NULL,
    "UpdateDate" VARCHAR(255) NOT NULL,
    "UpdateUserName" VARCHAR(255) NOT NULL,
    "Enrolled" VARCHAR(255) NOT NULL,
    "ParentName" VARCHAR(255) NOT NULL,
    "ParentPhoneNumber" VARCHAR(255) NOT NULL,
    "ParentAddress" VARCHAR(250) NOT NULL,
    "ParentEmailAddress" VARCHAR(255) NOT NULL,
    "ISENROLLED" VARCHAR(255) NOT NULL,
    "ISTRANSFERED" VARCHAR(255) NOT NULL,
    "IsHostelRequired" VARCHAR(45) NOT NULL,

    CONSTRAINT "smstudentinformation_pkey" PRIMARY KEY ("StudentID")
);

-- CreateTable
CREATE TABLE "hostel" (
    "EntryID" SERIAL NOT NULL,
    "HostelCode" VARCHAR(45) NOT NULL,
    "HostelName" VARCHAR(245) NOT NULL,
    "Gender" VARCHAR(45) NOT NULL,
    "ManagerID" VARCHAR(45) NOT NULL,
    "ManagerPhone" VARCHAR(45) NOT NULL,
    "ManagerEmail" VARCHAR(45) NOT NULL,
    "Location" VARCHAR(245) NOT NULL,
    "InsertedBy" VARCHAR(45) NOT NULL,
    "InsertedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LastUpdatedBy" VARCHAR(45) NOT NULL,
    "LastUpdatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hostel_pkey" PRIMARY KEY ("EntryID")
);

-- CreateTable
CREATE TABLE "hostel_allocation_tracker" (
    "EntryID" SERIAL NOT NULL,
    "ApplicationID" INTEGER NOT NULL,
    "Action" VARCHAR(45) NOT NULL,
    "ActionBy" VARCHAR(45) NOT NULL,
    "ActionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hostel_allocation_tracker_pkey" PRIMARY KEY ("EntryID")
);

-- CreateTable
CREATE TABLE "hostel_finance_clearance" (
    "EntryID" SERIAL NOT NULL,
    "StudentID" VARCHAR(45) NOT NULL,
    "SchoolSemester" VARCHAR(45) NOT NULL,
    "AmountPaid" VARCHAR(45) NOT NULL,
    "Balance" VARCHAR(45) NOT NULL,
    "Status" INTEGER NOT NULL,
    "InsertedBy" VARCHAR(45) NOT NULL,
    "InseredDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hostel_finance_clearance_pkey" PRIMARY KEY ("EntryID")
);

-- CreateTable
CREATE TABLE "hotel_room" (
    "EntryID" SERIAL NOT NULL,
    "HostelID" INTEGER NOT NULL,
    "RoomNo" VARCHAR(45) NOT NULL,
    "FloorName" VARCHAR(45) NOT NULL,
    "Wing" VARCHAR(45) NOT NULL,
    "Capacity" VARCHAR(45) NOT NULL,
    "Price" VARCHAR(45) NOT NULL,
    "Status" VARCHAR(45) NOT NULL,

    CONSTRAINT "hotel_room_pkey" PRIMARY KEY ("EntryID")
);

-- CreateTable
CREATE TABLE "hostel_room_allocation" (
    "EntryID" SERIAL NOT NULL,
    "StudentID" VARCHAR(45) NOT NULL,
    "SchoolSemester" VARCHAR(45) NOT NULL,
    "HostelID" VARCHAR(45) NOT NULL,
    "BedID" INTEGER NOT NULL,
    "RoomNo" VARCHAR(45) NOT NULL,
    "BedNo" VARCHAR(45) NOT NULL,
    "Status" VARCHAR(45) NOT NULL,
    "InsertedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "InsertedBy" VARCHAR(45) NOT NULL,

    CONSTRAINT "hostel_room_allocation_pkey" PRIMARY KEY ("EntryID")
);

-- CreateTable
CREATE TABLE "hostel_room_bed" (
    "EntryID" SERIAL NOT NULL,
    "HostelID" INTEGER NOT NULL,
    "FloorName" VARCHAR(45) NOT NULL,
    "Wing" VARCHAR(45) NOT NULL,
    "RoomNo" VARCHAR(45) NOT NULL,
    "BedNo" VARCHAR(45) NOT NULL,
    "OccupantID" VARCHAR(45),
    "Status" VARCHAR(45) NOT NULL,

    CONSTRAINT "hostel_room_bed_pkey" PRIMARY KEY ("EntryID")
);

-- CreateTable
CREATE TABLE "fmstudentpaymentdetail" (
    "EntryID" SERIAL NOT NULL,
    "Description" VARCHAR(200) NOT NULL,
    "PaymentID" VARCHAR(200) NOT NULL,
    "StudentID" VARCHAR(200) NOT NULL,
    "FirstName" VARCHAR(200) NOT NULL,
    "MiddleName" VARCHAR(200) NOT NULL,
    "Surname" VARCHAR(200) NOT NULL,
    "Amount" VARCHAR(200) NOT NULL,
    "SchoolTrimester" VARCHAR(200) NOT NULL,
    "StudentSemester" VARCHAR(200) NOT NULL,
    "StudentLevel" VARCHAR(200) NOT NULL,
    "InsertDate" VARCHAR(200) NOT NULL,
    "InsertUserName" VARCHAR(200) NOT NULL,
    "UpdateDate" VARCHAR(200) NOT NULL,
    "UpdateUserName" VARCHAR(200) NOT NULL,
    "IsPaidLastSemester" VARCHAR(200) NOT NULL,
    "TransDescrp" VARCHAR(200) NOT NULL,

    CONSTRAINT "fmstudentpaymentdetail_pkey" PRIMARY KEY ("EntryID")
);
