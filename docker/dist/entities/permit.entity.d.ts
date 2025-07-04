import { Relation } from "typeorm";
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Payment } from './payment.entity';
import { Student } from './student.entity';
export declare class Permit extends BaseEntity {
    studentId: number;
    transactionId: number;
    reference: string;
    titleId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    maidenName: string;
    email: string;
    phone: string;
    permitNo: string;
    oldPermitNo: string;
    requestType: string;
    permitClassId: number;
    years: number;
    dateOfBirth: string;
    genderId: number;
    nationalityId: number;
    stateId: number;
    lgaId: number;
    address: string;
    stationId: number;
    serialNumber: string;
    printStatus: number;
    issuedById: number;
    issuedAt: Date;
    expiryAt: Date;
    replacementReason: string;
    isActive: number;
    student: Relation<Student>;
    transaction: Payment;
    createdBy: User;
}
