import { Prisma } from '@prisma/client';
import prisma from '~/lib/db';

interface HostelDetails {
  hostel: {
    EntryID: number;
    HostelCode: string;
    HostelName: string;
    Gender: string;
    ManagerID: string;
    ManagerPhone: string;
    ManagerEmail: string;
    Location: string;
    InsertedBy: string;
    InsertedDate: Date;
    LastUpdatedBy: string;
    LastUpdatedDate: Date;
  }; // Assuming you have a Hostel type/interface defined
  availableRooms: number;
  availableBed: number;
  totalrooms: number;
  totalBed: number;
  underMaintenance: number;
  occupied: number;
  reserved: number;
}

interface Room {
  rooms: {
    EntryID: number;
    HostelID: number;
    FloorName: string;
    Wing: string;
    RoomNo: string;
    BedNo: string;
    OccupantID: string | null;
    Status: string;
  }[];
  EntryID: number;
  HostelID: number;
  RoomNo: string;
  FloorName: string;
  Wing: string;
  Capacity: string;
  Price: string;
  Status: string;
}
export const getHostels = async (gender: string) => {
  try {
    const hostels = await prisma.hostel.findMany({
      where: { Gender: gender },
    });

    const hostelDetails: HostelDetails[] = [];

    for (const hostel of hostels) {
      const hostelId = hostel.EntryID;

      const rooms = await prisma.hostel_room_bed.findMany({
        where: { HostelID: hostelId },
        distinct: ['RoomNo'],
      });

      let availableRooms = 0;
      let availableBed = 0;
      let totalrooms = 0;
      let totalBed = 0;
      let underMaintenance = 0;
      let occupied = 0;
      let reserved = 0;

      for (let room of rooms) {
        if (room.Status === 'Available') {
          availableRooms++;
          availableBed += parseInt(room.BedNo);
        }
        if (room.Status === 'Under Maintenance') underMaintenance++;
        if (room.Status === 'Occupied') occupied += 1;
        if (room.Status === 'Reserved') reserved += 1;

        totalBed += parseInt(room.BedNo);
        totalrooms++;
      }

      hostelDetails.push({
        hostel: hostel,
        availableRooms: availableRooms,
        availableBed: availableBed,
        totalrooms: totalrooms,
        totalBed: totalBed,
        underMaintenance: underMaintenance,
        occupied: occupied,
        reserved: reserved,
      });
    }

    return { data: hostelDetails, error: null };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { error: e.message, data: null };
    }
    return { error: 'error', data: null };
  }
};

export const getRooms = async (hostelId: string, gender: string) => {
  try {
    const roomDetails: Room[] = [];
    const genderTrue = await prisma.hostel.findUnique({
      where: {
        EntryID: parseInt(hostelId),
        Gender: gender,
      },
    });
    if (!genderTrue) {
      throw new Response('Not Found', { status: 404 });
    }
    const beds = await prisma.hotel_room.findMany({
      where: {
        HostelID: parseInt(hostelId),
        Status: 'room',
        FloorName: 'Ground Floor',
      },
    });
    const floor = await prisma.hostel_room_bed.findMany({
      distinct: ['FloorName'],
    });

    for (let i of beds) {
      const rooms = await prisma.hostel_room_bed.findMany({
        where: {
          RoomNo: i.RoomNo,
          HostelID: parseInt(hostelId),
          FloorName: 'Ground Floor',
        },
        orderBy: {
          BedNo: 'asc',
        },
      });
      roomDetails.push({
        rooms: rooms,
        EntryID: i.EntryID,
        HostelID: i.HostelID,
        RoomNo: i.RoomNo,
        FloorName: i.FloorName,
        Wing: i.Wing,
        Capacity: i.Capacity,
        Price: i.Price,
        Status: i.Status,
      });
    }
    return { data: roomDetails, error: null, floor };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { error: e.message, data: null };
    }
    return { error: 'error', data: null };
  }
};
export const getBeds = async (
  hostelId: string,
  floorName: string,
  roomName: string
) => {
  try {
    const beds = await prisma.hostel_room_bed.findMany({
      where: {
        HostelID: parseInt(hostelId),
        FloorName: floorName,
        RoomNo: roomName,
      },
      orderBy: {
        BedNo: 'asc',
      },
    });
    return { data: beds, error: null };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { error: e.message, data: null };
    }
    return { error: 'error', data: null };
  }
};

export const bookHostel = async ({
  hostelId,
  floorName,
  roomName,
  BedNo,
  studentId,
}: {
  hostelId: string;
  floorName: string;
  roomName: string;
  BedNo: string;
  studentId: string;
}) => {
  const beds = await prisma.hostel_room_bed.findFirst({
    where: {
      HostelID: parseInt(hostelId),
      FloorName: floorName,
      RoomNo: roomName,
      BedNo: BedNo,
    },
  });
  if (!beds) {
    throw new Response('Not Found from bed', { status: 404 });
  }
  const [reserved] = await prisma.$transaction([
    prisma.hostel_room_allocation.create({
      data: {
        HostelID: hostelId,
        InsertedBy: studentId,
        BedID: beds.EntryID,
        SchoolSemester: '23C',
        StudentID: studentId,
        RoomNo: roomName,
        BedNo: BedNo,
        Status: 'Reserved',
      },
    }),
    prisma.hostel_room_bed.update({
      where: {
        EntryID: beds.EntryID,
      },
      data: {
        Status: 'Reserved',
      },
    }),
  ]);

  return reserved;
};

export const getHostelAllocation = async (studentId: string) => {
  const room = await prisma.hostel_room_allocation.findMany({
    where: {
      StudentID: studentId,
    },
  });
  return room;
};
