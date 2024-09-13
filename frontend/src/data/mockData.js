import { tokens } from "../theme";

export const mockPatient = {
  type: 'patient',
  data: {
    name: 'John Doe',
    mail: 'john.doe@example.com',
    phone: '123-456-7890',
    photo: 'https://via.placeholder.com/150',
    gender: 'Male',
    dob: '1980-01-01',
    bloodGroup: 'O+',
    age: 44,
    weight: 70,
    height: 175,
    allergies: 'None',
    address: {
      street: '123 Main St',
      houseNumber: '4A',
      city: 'Colombo',
      zipCode: '12345'
    }
  }
};
export const mockDoctor  = {
  type: 'doctor',
  data: {
    name: 'Dr. Jane Smith',
    mail: 'jane.smith@example.com',
    phone: '987-654-3210',
    photo: 'https://via.placeholder.com/150',
    specialization: 'Cardiologist',
    assignedDate: '2015-03-15',
    address: {
      street: '456 Elm St',
      houseNumber: '12B',
      city: 'Colombo',
      zipCode: '67890'
    }
  }
};

export const mockDoctorIds = [
  "D001",
  "D002",
  "D003",
  "D004",
  "D005",
  "D006",
  "D007",
  "D008",
  "D009",
  "D010",
];
export const mockPatientIds = [
  "P001",
  "P002",
  "P003",
  "P004",
  "P005",
  "P006",
  "P007",
  "P008",
  "P009",
  "P010",
];
export const mockTreatmentIds = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]

export const mockPaymentIds = [
  "PAY1",
  "PAY2",
  "PAY3",
  "PAY4",
  "PAY5",
  "PAY6",
  "PAY7",
  "PAY8",
  "PAY9",
  "PAY0",
];

export const mockDataTreatments = [
  {
    "id": 1,
    "name": "Physical Therapy",
    "description": "A treatment to help improve movement and reduce pain.",
    "price": 100.00,
    "status": true,
    "doctorIds": [101, 102, 103]
  },
  {
    "id": 2,
    "name": "Chemotherapy",
    "description": "A treatment that uses drugs to kill cancer cells.",
    "price": 1500.00,
    "status": true,
    "doctorIds": [104, 105]
  },
  {
    "id": 3,
    "name": "Radiation Therapy",
    "description": "A treatment that uses high-energy rays to kill cancer cells.",
    "price": 2000.00,
    "status": false,
    "doctorIds": [106]
  },
  {
    "id": 4,
    "name": "Cardiac Rehabilitation",
    "description": "A treatment program designed to improve cardiovascular health.",
    "price": 750.00,
    "status": true,
    "doctorIds": [107, 108]
  },
  {
    "id": 5,
    "name": "Dialysis",
    "description": "A procedure to remove waste products and excess fluid from the blood.",
    "price": 500.00,
    "status": true,
    "doctorIds": [109, 110]
  },
  {
    "id": 6,
    "name": "Occupational Therapy",
    "description": "A treatment to help people participate in the things they want and need to do through therapeutic use of everyday activities.",
    "price": 120.00,
    "status": true,
    "doctorIds": [111]
  },
  {
    "id": 7,
    "name": "Speech Therapy",
    "description": "A treatment that helps with speech, language, and swallowing disorders.",
    "price": 80.00,
    "status": true,
    "doctorIds": [112, 113]
  },
  {
    "id": 8,
    "name": "Chiropractic Care",
    "description": "A treatment focusing on disorders of the musculoskeletal system and the nervous system.",
    "price": 90.00,
    "status": false,
    "doctorIds": [114, 115, 116]
  },
  {
    "id": 9,
    "name": "Acupuncture",
    "description": "A treatment involving the insertion of thin needles through the skin at specific points.",
    "price": 70.00,
    "status": true,
    "doctorIds": [117]
  },
  {
    "id": 10,
    "name": "Nutritional Therapy",
    "description": "A treatment focusing on improving health through a well-balanced diet.",
    "price": 60.00,
    "status": true,
    "doctorIds": [118, 119]
  }
];

export const mockDataPayments = [
  {
    "id": 1,
    "issueDate": "2024-01-15T09:30:00",
    "dueDate": "2024-01-30T23:59:59",
    "amount": 150.50,
    "method": "Credit Card",
    "status": "paid",
    "patientId": 1,
    "medicalRecordId": 101
  },
  {
    "id": 2,
    "issueDate": "2024-02-01T10:15:00",
    "dueDate": "2024-02-15T23:59:59",
    "amount": 200.75,
    "method": "PayPal",
    "status": "unpaid",
    "patientId": 2,
    "medicalRecordId": 102
  },
  {
    "id": 3,
    "issueDate": "2024-02-20T14:00:00",
    "dueDate": "2024-03-05T23:59:59",
    "amount": 320.00,
    "method": "Bank Transfer",
    "status": "failed",
    "patientId": 3,
    "medicalRecordId": 103
  },
  {
    "id": 4,
    "issueDate": "2024-03-10T11:00:00",
    "dueDate": "2024-03-25T23:59:59",
    "amount": 125.00,
    "method": "Cash",
    "status": "paid",
    "patientId": 4,
    "medicalRecordId": 104
  },
  {
    "id": 5,
    "issueDate": "2024-03-15T08:45:00",
    "dueDate": "2024-03-29T23:59:59",
    "amount": 275.00,
    "method": "Credit Card",
    "status": "reviewing",
    "patientId": 5,
    "medicalRecordId": 105
  },
  {
    "id": 6,
    "issueDate": "2024-04-01T15:30:00",
    "dueDate": "2024-04-15T23:59:59",
    "amount": 500.00,
    "method": "PayPal",
    "status": "unpaid",
    "patientId": 6,
    "medicalRecordId": 106
  },
  {
    "id": 7,
    "issueDate": "2024-04-10T13:00:00",
    "dueDate": "2024-04-24T23:59:59",
    "amount": 300.00,
    "method": "Bank Transfer",
    "status": "failed",
    "patientId": 7,
    "medicalRecordId": 107
  },
  {
    "id": 8,
    "issueDate": "2024-05-05T12:00:00",
    "dueDate": "2024-05-20T23:59:59",
    "amount": 350.00,
    "method": "Credit Card",
    "status": "paid",
    "patientId": 8,
    "medicalRecordId": 108
  },
  {
    "id": 9,
    "issueDate": "2024-05-10T09:30:00",
    "dueDate": "2024-05-24T23:59:59",
    "amount": 420.50,
    "method": "Cash",
    "status": "reviewing",
    "patientId": 9,
    "medicalRecordId": 109
  },
  {
    "id": 10,
    "issueDate": "2024-06-01T16:00:00",
    "dueDate": "2024-06-15T23:59:59",
    "amount": 225.00,
    "method": "PayPal",
    "status": "paid",
    "patientId": 10,
    "medicalRecordId": 110
  },
  {
    "id": 11,
    "issueDate": "2024-06-15T11:45:00",
    "dueDate": "2024-06-30T23:59:59",
    "amount": 275.75,
    "method": "Bank Transfer",
    "status": "unpaid",
    "patientId": 11,
    "medicalRecordId": 111
  },
  {
    "id": 12,
    "issueDate": "2024-07-01T10:00:00",
    "dueDate": "2024-07-15T23:59:59",
    "amount": 150.00,
    "method": "Cash",
    "status": "failed",
    "patientId": 12,
    "medicalRecordId": 112
  }
];

export const mockDataRecords = [
  {
    "id": 1,
    "diagnosis": "Hypertension",
    "prescription": "Amlodipine 5mg",
    "assignDate": "2024-08-30T10:15:30",
    "price": 250.00,
    "treatmentIds": [1, 2],
    "doctorId": 101,
    "patientId": 201,
    "paymentId": 301
  },
  {
    "id": 2,
    "diagnosis": "Type 2 Diabetes",
    "prescription": "Metformin 500mg",
    "assignDate": "2024-08-29T11:00:00",
    "price": 300.00,
    "treatmentIds": [3],
    "doctorId": 102,
    "patientId": 202,
    "paymentId": 302
  },
  {
    "id": 3,
    "diagnosis": "Asthma",
    "prescription": "Salbutamol Inhaler",
    "assignDate": "2024-08-28T09:45:00",
    "price": 150.00,
    "treatmentIds": [4],
    "doctorId": 103,
    "patientId": 203,
    "paymentId": 303
  },
  {
    "id": 4,
    "diagnosis": "Migraine",
    "prescription": "Sumatriptan 50mg",
    "assignDate": "2024-08-27T15:30:00",
    "price": 120.00,
    "treatmentIds": [5, 6],
    "doctorId": 104,
    "patientId": 204,
    "paymentId": 304
  },
  {
    "id": 5,
    "diagnosis": "Hypercholesterolemia",
    "prescription": "Atorvastatin 20mg",
    "assignDate": "2024-08-26T14:00:00",
    "price": 200.00,
    "treatmentIds": [7],
    "doctorId": 105,
    "patientId": 205,
    "paymentId": 305
  },
  {
    "id": 6,
    "diagnosis": "Arthritis",
    "prescription": "Ibuprofen 400mg",
    "assignDate": "2024-08-25T13:00:00",
    "price": 220.00,
    "treatmentIds": [8],
    "doctorId": 106,
    "patientId": 206,
    "paymentId": 306
  },
  {
    "id": 7,
    "diagnosis": "Bronchitis",
    "prescription": "Amoxicillin 500mg",
    "assignDate": "2024-08-24T12:00:00",
    "price": 180.00,
    "treatmentIds": [9, 10],
    "doctorId": 107,
    "patientId": 207,
    "paymentId": 307
  },
  {
    "id": 8,
    "diagnosis": "Gastritis",
    "prescription": "Omeprazole 20mg",
    "assignDate": "2024-08-23T11:15:00",
    "price": 160.00,
    "treatmentIds": [11],
    "doctorId": 108,
    "patientId": 208,
    "paymentId": 308
  },
  {
    "id": 9,
    "diagnosis": "Pneumonia",
    "prescription": "Azithromycin 500mg",
    "assignDate": "2024-08-22T10:30:00",
    "price": 280.00,
    "treatmentIds": [12],
    "doctorId": 109,
    "patientId": 209,
    "paymentId": 309
  },
  {
    "id": 10,
    "diagnosis": "Tonsillitis",
    "prescription": "Paracetamol 500mg",
    "assignDate": "2024-08-21T09:30:00",
    "price": 130.00,
    "treatmentIds": [13, 14],
    "doctorId": 110,
    "patientId": 210,
    "paymentId": 310
  },
  {
    "id": 11,
    "diagnosis": "Gout",
    "prescription": "Allopurinol 100mg",
    "assignDate": "2024-08-20T08:30:00",
    "price": 240.00,
    "treatmentIds": [15],
    "doctorId": 111,
    "patientId": 211,
    "paymentId": 311
  },
  {
    "id": 12,
    "diagnosis": "Anemia",
    "prescription": "Ferrous Sulfate 200mg",
    "assignDate": "2024-08-19T07:45:00",
    "price": 260.00,
    "treatmentIds": [16],
    "doctorId": 112,
    "patientId": 212,
    "paymentId": 312
  }
];

export const mockDataDoctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    mail: 'john.smith@example.com',
    phone: '123-456-7890',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-01-15T00:00:00',
    specialization: 'Cardiology',
    address: {
      street: 'Main St',
      houseNumber: '123',
      zipCode: '12345',
    },
    treatmentIds: ['T1', 'T2'],
  },
  {
    id: 2,
    name: 'Dr. Emily Johnson',
    mail: 'emily.johnson@example.com',
    phone: '987-654-3210',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-02-10T00:00:00',
    specialization: 'Neurology',
    address: {
      street: 'Elm St',
      houseNumber: '456',
      zipCode: '54321',
    },
    treatmentIds: ['T3', 'T4'],
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    mail: 'michael.brown@example.com',
    phone: '456-789-1234',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-03-05T00:00:00',
    specialization: 'Orthopedics',
    address: {
      street: 'Maple Ave',
      houseNumber: '789',
      zipCode: '67890',
    },
    treatmentIds: ['T2', 'T5'],
  },
  {
    id: 4,
    name: 'Dr. Sophia Williams',
    mail: 'sophia.williams@example.com',
    phone: '321-654-9870',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-04-12T00:00:00',
    specialization: 'Pediatrics',
    address: {
      street: 'Oak St',
      houseNumber: '321',
      zipCode: '98765',
    },
    treatmentIds: ['T1', 'T6'],
  },
  {
    id: 5,
    name: 'Dr. James Taylor',
    mail: 'james.taylor@example.com',
    phone: '789-123-4567',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-05-18T00:00:00',
    specialization: 'Dermatology',
    address: {
      street: 'Birch Ave',
      houseNumber: '654',
      zipCode: '76543',
    },
    treatmentIds: ['T7', 'T8'],
  },
  {
    id: 6,
    name: 'Dr. Olivia Martinez',
    mail: 'olivia.martinez@example.com',
    phone: '654-789-3210',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-06-07T00:00:00',
    specialization: 'Gynecology',
    address: {
      street: 'Cedar St',
      houseNumber: '987',
      zipCode: '23456',
    },
    treatmentIds: ['T9', 'T10'],
  },
  {
    id: 7,
    name: 'Dr. William Garcia',
    mail: 'william.garcia@example.com',
    phone: '432-123-9876',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-07-22T00:00:00',
    specialization: 'Ophthalmology',
    address: {
      street: 'Pine St',
      houseNumber: '789',
      zipCode: '34567',
    },
    treatmentIds: ['T5', 'T7'],
  },
  {
    id: 8,
    name: 'Dr. Isabella Rodriguez',
    mail: 'isabella.rodriguez@example.com',
    phone: '543-234-8765',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-08-14T00:00:00',
    specialization: 'Radiology',
    address: {
      street: 'Spruce St',
      houseNumber: '987',
      zipCode: '45678',
    },
    treatmentIds: ['T3', 'T9'],
  },
  {
    id: 9,
    name: 'Dr. Alexander Wilson',
    mail: 'alexander.wilson@example.com',
    phone: '876-543-2345',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-09-09T00:00:00',
    specialization: 'Oncology',
    address: {
      street: 'Fir St',
      houseNumber: '654',
      zipCode: '56789',
    },
    treatmentIds: ['T8', 'T10'],
  },
  {
    id: 10,
    name: 'Dr. Mia Lee',
    mail: 'mia.lee@example.com',
    phone: '654-987-4321',
    photo: 'https://via.placeholder.com/80',
    assignedDate: '2023-10-01T00:00:00',
    specialization: 'Psychiatry',
    address: {
      street: 'Willow St',
      houseNumber: '123',
      zipCode: '67890',
    },
    treatmentIds: ['T6', 'T4'],
  },
];

export const mockDataPatients =[
  {
    id: 1,
    uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Alice Johnson",
    mail: "alice.johnson@example.com",
    phone: "123-456-7890",
    photo: "https://via.placeholder.com/80",
    gender: "Female",
    dob: "1990-05-15T00:00:00",
    assignedDate: "2023-01-15T00:00:00",
    bloodGroup: "O+",
    age: 34,
    weight: 55.5,
    height: 165.0,
    allergies: "Peanuts",
    address: {
      street: "Main St",
      houseNumber: "101",
      city: "Springfield",
      zipCode: 12345
    },
    doctorIds: [1, 2],
    medicalRecordIds: [1, 2],
    appointmentIds: [1, 2],
    paymentIds: [1, 2]
  },
  {
    id: 2,
    uuid: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    name: "Bob Smith",
    mail: "bob.smith@example.com",
    phone: "234-567-8901",
    photo: "https://via.placeholder.com/80",
    gender: "Male",
    dob: "1985-03-22T00:00:00",
    assignedDate: "2023-02-20T00:00:00",
    bloodGroup: "A-",
    age: 39,
    weight: 80.0,
    height: 175.0,
    allergies: "Dust",
    address: {
      street: "Elm St",
      houseNumber: "202",
      city: "Metropolis",
      zipCode: 54321
    },
    doctorIds: [2, 3],
    medicalRecordIds: [3, 4],
    appointmentIds: [3, 4],
    paymentIds: [3, 4]
  },
  {
    id: 3,
    uuid: "c3d4e5f6-g7h8-9012-cdef-34567890123",
    name: "Charlie Brown",
    mail: "charlie.brown@example.com",
    phone: "345-678-9012",
    photo: "https://via.placeholder.com/80",
    gender: "Male",
    dob: "1978-07-10T00:00:00",
    assignedDate: "2023-03-10T00:00:00",
    bloodGroup: "B+",
    age: 46,
    weight: 70.0,
    height: 180.0,
    allergies: "Shellfish",
    address: {
      street: "Pine St",
      houseNumber: "303",
      city: "Gotham",
      zipCode: 67890
    },
    doctorIds: [3, 4],
    medicalRecordIds: [5, 6],
    appointmentIds: [5, 6],
    paymentIds: [5, 6]
  },
  {
    id: 4,
    uuid: "d4e5f6g7-h8i9-0123-def0-45678901234",
    name: "Diana Prince",
    mail: "diana.prince@example.com",
    phone: "456-789-0123",
    photo: "https://via.placeholder.com/80",
    gender: "Female",
    dob: "1988-09-30T00:00:00",
    assignedDate: "2023-04-12T00:00:00",
    bloodGroup: "AB-",
    age: 36,
    weight: 62.0,
    height: 170.0,
    allergies: "Gluten",
    address: {
      street: "Oak St",
      houseNumber: "404",
      city: "Star City",
      zipCode: 78901
    },
    doctorIds: [4, 5],
    medicalRecordIds: [7, 8],
    appointmentIds: [7, 8],
    paymentIds: [7, 8]
  },
  {
    id: 5,
    uuid: "e5f6g7h8-i9j0-1234-ef01-56789012345",
    name: "Edward Norton",
    mail: "edward.norton@example.com",
    phone: "567-890-1234",
    photo: "https://via.placeholder.com/80",
    gender: "Male",
    dob: "1995-11-22T00:00:00",
    assignedDate: "2023-05-15T00:00:00",
    bloodGroup: "O-",
    age: 28,
    weight: 85.0,
    height: 185.0,
    allergies: "None",
    address: {
      street: "Cedar St",
      houseNumber: "505",
      city: "Central City",
      zipCode: 89012
    },
    doctorIds: [5, 6],
    medicalRecordIds: [9, 10],
    appointmentIds: [9, 10],
    paymentIds: [9, 10]
  },
  {
    id: 6,
    uuid: "f6g7h8i9-j0k1-2345-fg12-67890123456",
    name: "Fiona Apple",
    mail: "fiona.apple@example.com",
    phone: "678-901-2345",
    photo: "https://via.placeholder.com/80",
    gender: "Female",
    dob: "1982-04-12T00:00:00",
    assignedDate: "2023-06-20T00:00:00",
    bloodGroup: "A+",
    age: 42,
    weight: 58.0,
    height: 160.0,
    allergies: "Pollen",
    address: {
      street: "Birch Ave",
      houseNumber: "606",
      city: "Metropolis",
      zipCode: 90123
    },
    doctorIds: [6, 7],
    medicalRecordIds: [11, 12],
    appointmentIds: [11, 12],
    paymentIds: [11, 12]
  },
  {
    id: 7,
    uuid: "g7h8i9j0-k1l2-3456-gh23-78901234567",
    name: "George Clooney",
    mail: "george.clooney@example.com",
    phone: "789-012-3456",
    photo: "https://via.placeholder.com/80",
    gender: "Male",
    dob: "1965-10-08T00:00:00",
    assignedDate: "2023-07-25T00:00:00",
    bloodGroup: "B-",
    age: 58,
    weight: 90.0,
    height: 175.0,
    allergies: "Latex",
    address: {
      street: "Maple Ave",
      houseNumber: "707",
      city: "Gotham",
      zipCode: 401234
    },
    doctorIds: [7, 8],
    medicalRecordIds: [13, 14],
    appointmentIds: [13, 14],
    paymentIds: [13, 14]
  },
  {
    id: 8,
    uuid: "h8i9j0k1-l2m3-4567-hi34-89012345678",
    name: "Hannah Montana",
    mail: "hannah.montana@example.com",
    phone: "890-123-4567",
    photo: "https://via.placeholder.com/80",
    gender: "Female",
    dob: "1998-02-18T00:00:00",
    assignedDate: "2023-08-30T00:00:00",
    bloodGroup: "AB+",
    age: 26,
    weight: 50.0,
    height: 155.0,
    allergies: "Milk",
    address: {
      street: "Spruce St",
      houseNumber: "808",
      city: "Star City",
      zipCode: 12367
    },
    doctorIds: [8, 9],
    medicalRecordIds: [15, 16],
    appointmentIds: [15, 16],
    paymentIds: [15, 16]
  },
  {
    id: 9,
    uuid: "i9j0k1l2-m3n4-5678-ij45-90123456789",
    name: "Ian Malcolm",
    mail: "ian.malcolm@example.com",
    phone: "901-234-5678",
    photo: "https://via.placeholder.com/80",
    gender: "Male",
    dob: "1972-06-20T00:00:00",
    assignedDate: "2023-09-12T00:00:00",
    bloodGroup: "O+",
    age: 52,
    weight: 75.0,
    height: 170.0,
    allergies: "Penicillin",
    address: {
      street: "Fir St",
      houseNumber: "909",
      city: "Central City",
      zipCode: 23456
    },
    doctorIds: [9, 10],
    medicalRecordIds: [17, 18],
    appointmentIds: [17, 18],
    paymentIds: [17, 18]
  },
  {
    id: 10,
    uuid: "j0k1l2m3-n4o5-6789-jk56-01234567890",
    name: "Jessica Jones",
    mail: "jessica.jones@example.com",
    phone: "012-345-6789",
    photo: "https://via.placeholder.com/80",
    gender: "Female",
    dob: "1984-11-14T00:00:00",
    assignedDate: "2023-10-05T00:00:00",
    bloodGroup: "B+",
    age: 39,
    weight: 68.0,
    height: 162.0,
    allergies: "Soy",
    address: {
      street: "Oak St",
      houseNumber: "1010",
      city: "Gotham",
      zipCode: 34567
    },
    doctorIds: [10, 1],
    medicalRecordIds: [19, 20],
    appointmentIds: [19, 20],
    paymentIds: [19, 20]
  },
  {
    id: 11,
    uuid: "k1l2m3n4-o5p6-7890-kl67-12345678901",
    name: "Kevin Hart",
    mail: "kevin.hart@example.com",
    phone: "123-456-7891",
    photo: "https://via.placeholder.com/80",
    gender: "Male",
    dob: "1989-07-11T00:00:00",
    assignedDate: "2023-11-02T00:00:00",
    bloodGroup: "A-",
    age: 35,
    weight: 80.0,
    height: 180.0,
    allergies: "Eggs",
    address: {
      street: "Cedar St",
      houseNumber: "1111",
      city: "Metropolis",
      zipCode: 45678
    },
    doctorIds: [1, 3],
    medicalRecordIds: [21, 22],
    appointmentIds: [21, 22],
    paymentIds: [21, 22]
  },
  {
    id: 12,
    uuid: "l2m3n4o5-p6q7-8901-mn78-23456789012",
    name: "Laura Croft",
    mail: "laura.croft@example.com",
    phone: "234-567-8902",
    photo: "https://via.placeholder.com/80",
    gender: "Female",
    dob: "1975-12-30T00:00:00",
    assignedDate: "2023-12-12T00:00:00",
    bloodGroup: "O-",
    age: 48,
    weight: 65.0,
    height: 168.0,
    allergies: "Shellfish",
    address: {
      street: "Maple Ave",
      houseNumber: "1212",
      city: "Star City",
      zipCode: 56789
    },
    doctorIds: [2, 4],
    medicalRecordIds: [23, 24],
    appointmentIds: [23, 24],
    paymentIds: [23, 24]
  },
  {
    id: 13,
    uuid: "m3n4o5p6-q7r8-9012-no89-34567890123",
    name: "Michael Jordan",
    mail: "michael.jordan@example.com",
    phone: "345-678-9013",
    photo: "https://via.placeholder.com/80",
    gender: "Male",
    dob: "1980-03-15T00:00:00",
    assignedDate: "2024-01-18T00:00:00",
    bloodGroup: "AB-",
    age: 44,
    weight: 85.0,
    height: 190.0,
    allergies: "None",
    address: {
      street: "Birch Ave",
      houseNumber: "1313",
      city: "Gotham",
      zipCode: 67890
    },
    doctorIds: [5, 6],
    medicalRecordIds: [25, 26],
    appointmentIds: [25, 26],
    paymentIds: [25, 26]
  },
  {
    id: 14,
    uuid: "n4o5p6q7-r8s9-0123-op90-45678901234",
    name: "Nina Simone",
    mail: "nina.simone@example.com",
    phone: "456-789-0124",
    photo: "https://via.placeholder.com/80",
    gender: "Female",
    dob: "1992-08-21T00:00:00",
    assignedDate: "2024-02-10T00:00:00",
    bloodGroup: "B+",
    age: 32,
    weight: 58.0,
    height: 160.0,
    allergies: "Latex",
    address: {
      street: "Pine St",
      houseNumber: "1414",
      city: "Central City",
      zipCode: 78901
    },
    doctorIds: [7, 8],
    medicalRecordIds: [27, 28],
    appointmentIds: [27, 28],
    paymentIds: [27, 28]
  },
  {
    id: 15,
    uuid: "o5p6q7r8-s9t0-1234-pq12-56789012345",
    name: "Oscar Wilde",
    mail: "oscar.wilde@example.com",
    phone: "567-890-1235",
    photo: "https://via.placeholder.com/80",
    gender: "Male",
    dob: "1960-05-09T00:00:00",
    assignedDate: "2024-03-01T00:00:00",
    bloodGroup: "A+",
    age: 64,
    weight: 95.0,
    height: 185.0,
    allergies: "None",
    address: {
      street: "Spruce St",
      houseNumber: "1515",
      city: "Star City",
      zipCode: 89012
    },
    doctorIds: [9, 10],
    medicalRecordIds: [29, 30],
    appointmentIds: [29, 30],
    paymentIds: [29, 30]
  }
]

export const mockDataNotifications =[
  { id: 1, message: "New message from Dr. Smith", createdDate: "2024-09-10T12:30:00Z" },
  { id: 2, message: "Payment for appointment due", createdDate: "2024-09-09T09:15:00Z" },
  { id: 3, message: "Your lab report is ready", createdDate: "2024-09-08T14:00:00Z" },
  { id: 4, message: "New treatment assigned", createdDate: "2024-09-07T16:20:00Z" },
  { id: 5, message: "Appointment reminder for tomorrow", createdDate: "2024-09-06T18:10:00Z" },
  { id: 6, message: "Your lab report is ready", createdDate: "2024-09-08T14:00:00Z" },
  { id: 7, message: "New treatment assigned", createdDate: "2024-09-07T16:20:00Z" },
  { id: 8, message: "Appointment reminder for tomorrow", createdDate: "2024-09-06T18:10:00Z" },
];




export const mockDataTeam = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "admin",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "user",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "manager",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    access: "user",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "user",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
];

export const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    zipCode: "13151",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    zipCode: "87281",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    zipCode: "51523",
    registrarId: 123512,
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 512315,
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    zipCode: "111234",
    registrarId: 928397,
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 533215,
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    zipCode: "1234",
    registrarId: 92197,
  },
];

export const mockDataInvoices = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    cost: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    cost: "11.24",
    phone: "(422)982-6739",
    date: "05/02/2022",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    cost: "80.55",
    phone: "(921)425-6742",
    date: "03/21/2022",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    cost: "1.24",
    phone: "(421)445-1189",
    date: "01/12/2021",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    cost: "63.12",
    phone: "(232)545-6483",
    date: "11/02/2022",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    cost: "52.42",
    phone: "(543)124-0123",
    date: "02/11/2022",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    cost: "21.24",
    phone: "(222)444-5555",
    date: "05/02/2021",
  },
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockBarData = [
  {
    country: "AD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 66,
    "hot dogColor": "hsl(208, 70%, 50%)",
    burger: 111,
    burgerColor: "hsl(334, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(182, 70%, 50%)",
    donut: 18,
    donutColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 80,
    "hot dogColor": "hsl(87, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(141, 70%, 50%)",
    kebab: 158,
    kebabColor: "hsl(224, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(274, 70%, 50%)",
  },
];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "plane",
        y: 101,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 216,
      },
      {
        x: "subway",
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "plane",
        y: 212,
      },
      {
        x: "helicopter",
        y: 190,
      },
      {
        x: "boat",
        y: 270,
      },
      {
        x: "train",
        y: 9,
      },
      {
        x: "subway",
        y: 75,
      },
      {
        x: "bus",
        y: 175,
      },
      {
        x: "car",
        y: 33,
      },
      {
        x: "moto",
        y: 189,
      },
      {
        x: "bicycle",
        y: 97,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];